import { NextRequest, NextResponse } from 'next/server';
import dns from 'dns';
import { promisify } from 'util';
import prisma, { isDatabaseConfigured } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { normalizePlanTier, PLAN_LIMITS } from '@/lib/plan-guards';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const resolveCname = promisify(dns.resolveCname);
const resolve4 = promisify(dns.resolve4);

// The canonical CNAME target businesses should point their custom domains to
const EXPECTED_CNAME_TARGETS = [
  'cname.oneclickbiz.in',
  'oneclickbiz.in',
  'www.oneclickbiz.in'
];

// Server IP for A-record fallback
const EXPECTED_SERVER_IPS = [
  '82.112.226.104'
];

interface DnsCheckResult {
  isConfigured: boolean;
  status: 'VERIFIED_ACTIVE' | 'PENDING_DNS' | 'MISCONFIGURED' | 'LOCAL_DEMO';
  detectedCname?: string[];
  detectedIp?: string[];
  message: string;
}

/**
 * Checks live DNS for a given hostname to verify CNAME or A-record configuration
 */
async function verifyDns(domain: string): Promise<DnsCheckResult> {
  const clean = domain.trim().toLowerCase();

  // If local testing
  if (clean.includes('localhost') || clean.endsWith('.local') || clean.endsWith('.test')) {
    return {
      isConfigured: true,
      status: 'LOCAL_DEMO',
      message: 'Local development / simulation domain'
    };
  }

  let cnames: string[] = [];
  let ips: string[] = [];

  // 1. Try CNAME lookup
  try {
    const res = await resolveCname(clean);
    cnames = (res || []).map(c => c.toLowerCase().replace(/\.$/, ''));
  } catch {
    // Domain might not have CNAME or is an apex/root domain using A record
  }

  // 2. Try A-record lookup
  try {
    const aRes = await resolve4(clean);
    ips = aRes || [];
  } catch {
    // DNS resolution failed or not propagated
  }

  // Check CNAME match
  const matchesCname = cnames.some(c =>
    EXPECTED_CNAME_TARGETS.some(target => c === target || c.endsWith('.oneclickbiz.in'))
  );

  // Check IP match
  const matchesIp = ips.some(ip => EXPECTED_SERVER_IPS.includes(ip));

  if (matchesCname || matchesIp) {
    return {
      isConfigured: true,
      status: 'VERIFIED_ACTIVE',
      detectedCname: cnames,
      detectedIp: ips,
      message: 'DNS verified! CNAME correctly points to OneClickBiz edge network.'
    };
  }

  if (cnames.length > 0 || ips.length > 0) {
    return {
      isConfigured: false,
      status: 'MISCONFIGURED',
      detectedCname: cnames,
      detectedIp: ips,
      message: `DNS records found but pointing elsewhere (${cnames.join(', ') || ips.join(', ')}). Expected CNAME: cname.oneclickbiz.in`
    };
  }

  return {
    isConfigured: false,
    status: 'PENDING_DNS',
    message: 'No DNS records detected yet. DNS changes usually take 5–15 minutes to propagate worldwide.'
  };
}

/**
 * Clean & validate hostname format
 */
function sanitizeDomain(raw: string): string | null {
  if (!raw) return null;
  let d = raw.trim().toLowerCase();
  d = d.replace(/^https?:\/\//i, '');
  d = d.replace(/\/.*$/, '');
  d = d.replace(/:\d+$/, '');
  d = d.trim();

  // Basic RFC 1123 domain regex
  const domainRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/;
  if (!domainRegex.test(d)) return null;

  // Prevent claiming OneClickBiz system domains
  if (d === 'oneclickbiz.in' || d.endsWith('.oneclickbiz.in')) {
    return null;
  }

  return d;
}

// =========================================================================
// GET: Fetch custom domain status for user's organization
// =========================================================================
export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isDatabaseConfigured) {
      return NextResponse.json({
        success: true,
        plan: 'PRO',
        maxDomains: 1,
        canAccessCustomDomain: true,
        domains: []
      });
    }

    const org = await prisma.organization.findUnique({
      where: { id: session.organizationId },
      include: {
        profiles: {
          select: {
            id: true,
            name: true,
            slug: true,
            customDomain: true,
            isPublished: true
          }
        }
      }
    });

    if (!org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    const planTier = normalizePlanTier(org.subscriptionStatus);
    const planLimits = PLAN_LIMITS[planTier];

    // For every profile that has a custom domain, check DNS live
    const domainsWithDns = await Promise.all(
      org.profiles
        .filter(p => Boolean(p.customDomain))
        .map(async (p) => {
          const domain = p.customDomain!;
          const dnsStatus = await verifyDns(domain);
          return {
            profileId: p.id,
            profileName: p.name,
            profileSlug: p.slug,
            customDomain: domain,
            isPublished: p.isPublished,
            expectedCname: 'cname.oneclickbiz.in',
            dnsStatus
          };
        })
    );

    return NextResponse.json({
      success: true,
      plan: planTier,
      maxDomains: planLimits.maxCustomDomains,
      canAccessCustomDomain: planLimits.canAccessCustomDomain,
      profiles: org.profiles.map(p => ({ id: p.id, name: p.name, slug: p.slug, customDomain: p.customDomain })),
      domains: domainsWithDns
    });
  } catch (error: any) {
    console.error('Fetch custom domain error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// =========================================================================
// POST: Save or update custom domain for a profile
// =========================================================================
export async function POST(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isDatabaseConfigured) {
      return NextResponse.json({ error: 'Database is not configured' }, { status: 500 });
    }

    const org = await prisma.organization.findUnique({
      where: { id: session.organizationId },
      include: {
        profiles: true
      }
    });

    if (!org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // 1. Verify Plan Tier allows Custom Domain
    const planTier = normalizePlanTier(org.subscriptionStatus);
    const planLimits = PLAN_LIMITS[planTier];

    if (!planLimits.canAccessCustomDomain || planLimits.maxCustomDomains <= 0) {
      return NextResponse.json({
        error: 'Custom domain is only available on Pro (1 domain) and Advance (5 domains) plans. Please upgrade your plan to unlock this feature.',
        upgradeRequired: true
      }, { status: 403 });
    }

    const body = await req.json();
    const { profileId, domain } = body;

    if (!profileId || !domain) {
      return NextResponse.json({ error: 'Profile ID and domain name are required' }, { status: 400 });
    }

    // 2. Validate Profile ownership
    const targetProfile = org.profiles.find(p => p.id === profileId);
    if (!targetProfile) {
      return NextResponse.json({ error: 'Profile not found in your organization' }, { status: 404 });
    }

    // 3. Sanitize and validate domain
    const cleanDomain = sanitizeDomain(domain);
    if (!cleanDomain) {
      return NextResponse.json({
        error: 'Invalid domain format. Enter a valid domain name like "cards.yourcompany.com" or "yourbusiness.in"'
      }, { status: 400 });
    }

    // 4. Check if max custom domains limit reached for org
    const existingMappedProfiles = org.profiles.filter(p => p.customDomain && p.id !== profileId);
    if (existingMappedProfiles.length >= planLimits.maxCustomDomains) {
      return NextResponse.json({
        error: `Your ${planLimits.name} allows a maximum of ${planLimits.maxCustomDomains} custom domain(s). Upgrade to Advance to connect up to 5 domains.`,
        limitReached: true
      }, { status: 403 });
    }

    // 5. Check uniqueness across platform
    const existingClaim = await prisma.profile.findFirst({
      where: {
        customDomain: cleanDomain,
        id: { not: profileId }
      }
    });

    if (existingClaim) {
      return NextResponse.json({
        error: `The domain "${cleanDomain}" is already connected to another profile. If you own this domain, contact support@oneclickbiz.in.`
      }, { status: 409 });
    }

    // 6. Update Profile in database
    const updated = await prisma.profile.update({
      where: { id: profileId },
      data: { customDomain: cleanDomain }
    });

    // 7. Perform instant live DNS verification
    const dnsStatus = await verifyDns(cleanDomain);

    return NextResponse.json({
      success: true,
      message: `Domain "${cleanDomain}" linked to ${updated.name} successfully.`,
      profileId: updated.id,
      customDomain: cleanDomain,
      expectedCname: 'cname.oneclickbiz.in',
      dnsStatus
    });
  } catch (error: any) {
    console.error('Save custom domain error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// =========================================================================
// DELETE: Disconnect custom domain from a profile
// =========================================================================
export async function DELETE(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get('profileId');

    if (!profileId) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    const profile = await prisma.profile.findUnique({
      where: { id: profileId }
    });

    if (!profile || profile.organizationId !== session.organizationId) {
      return NextResponse.json({ error: 'Profile not found or unauthorized' }, { status: 404 });
    }

    await prisma.profile.update({
      where: { id: profileId },
      data: { customDomain: null }
    });

    return NextResponse.json({
      success: true,
      message: 'Custom domain removed successfully.'
    });
  } catch (error: any) {
    console.error('Remove custom domain error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
