import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Globe2, ShieldCheck, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import prisma, { isDatabaseConfigured } from '@/lib/prisma';
import ProfileCardView from '@/components/templates/ProfileCardView';
import SharePreviewFloatingBar from '@/components/common/SharePreviewFloatingBar';
import { getProfileBySlug } from '@/lib/data-store';
import { DigitalProfile } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface CustomDomainPageProps {
  params: Promise<{
    domain: string;
  }>;
}

/**
 * Fetch profile data associated with a custom domain
 */
async function fetchProfileByDomain(domain: string): Promise<DigitalProfile | null> {
  const cleanDomain = (domain || '').toLowerCase().trim();

  if (!isDatabaseConfigured) {
    return null;
  }

  try {
    const dbProfile = await prisma.profile.findFirst({
      where: {
        customDomain: cleanDomain
      },
      include: {
        sections: { orderBy: { order: 'asc' } },
        socialLinks: { orderBy: { order: 'asc' } },
        products: { where: { isAvailable: true }, orderBy: { order: 'asc' } },
        services: { where: { isAvailable: true } },
        organization: true
      }
    });

    if (!dbProfile) {
      return null;
    }

    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const paidInvoice = await prisma.invoice.findFirst({
      where: {
        organizationId: dbProfile.organizationId,
        status: 'PAID'
      },
      orderBy: { createdAt: 'desc' }
    });

    const hasActivePaidPlan = Boolean(
      paidInvoice && (Date.now() - paidInvoice.createdAt.getTime() < ONE_YEAR_MS)
    );
    const orgStatus = dbProfile.organization?.subscriptionStatus;
    const isCancelled = orgStatus === 'CANCELLED' || orgStatus === 'SUSPENDED';
    const subscriptionStatus: 'CANCELLED' | 'ACTIVE' | 'UNPAID' | 'EXPIRED' = isCancelled
      ? 'CANCELLED'
      : (hasActivePaidPlan ? 'ACTIVE' : 'UNPAID');
    const isExpired = !hasActivePaidPlan || subscriptionStatus !== 'ACTIVE';
    const isPublished = Boolean(dbProfile.isPublished && hasActivePaidPlan);

    const fallback = getProfileBySlug(dbProfile.slug);

    let reconstructedSectionData: Record<string, any> = {};
    let reconstructedSections = fallback.sections;

    if (dbProfile.sections && dbProfile.sections.length > 0) {
      reconstructedSections = dbProfile.sections.map(s => ({
        id: s.id,
        type: s.type as any,
        title: s.title,
        isVisible: s.isVisible,
        order: s.order
      }));

      dbProfile.sections.forEach(s => {
        if (s.config && typeof s.config === 'object' && Object.keys(s.config).length > 0) {
          reconstructedSectionData[s.type] = s.config;
        }
      });
    } else {
      reconstructedSectionData = { ...(fallback.sectionData || {}) };
    }

    const resolvedBio = dbProfile.bio != null ? dbProfile.bio : fallback.bio;
    if (resolvedBio != null) {
      reconstructedSectionData = {
        ...reconstructedSectionData,
        about: {
          ...(reconstructedSectionData.about || {}),
          content: resolvedBio
        }
      };
    }

    const heroConfig = (reconstructedSectionData as any).hero || {};
    const resolvedTemplateId = heroConfig.templateId || fallback.templateId;
    const resolvedCategory = heroConfig.category || fallback.category;

    return {
      ...fallback,
      id: dbProfile.id,
      slug: dbProfile.slug,
      templateId: resolvedTemplateId,
      category: resolvedCategory,
      name: dbProfile.name ?? fallback.name,
      designation: dbProfile.designation ?? fallback.designation,
      company: dbProfile.company ?? fallback.company,
      bio: resolvedBio,
      email: dbProfile.email ?? fallback.email,
      phone: dbProfile.phone ?? fallback.phone,
      whatsapp: dbProfile.whatsapp ?? fallback.whatsapp,
      website: dbProfile.website || `https://${cleanDomain}`,
      address: dbProfile.address ?? fallback.address,
      theme: (dbProfile.theme as any) ?? fallback.theme,
      avatarUrl: dbProfile.avatarUrl ?? fallback.avatarUrl,
      coverUrl: dbProfile.coverUrl ?? fallback.coverUrl,
      customDomain: dbProfile.customDomain || undefined,
      sections: reconstructedSections,
      sectionData: reconstructedSectionData,
      isPublished,
      isExpired,
      subscriptionStatus
    };
  } catch (err) {
    console.error('Error fetching profile by domain:', err);
    return null;
  }
}

export async function generateMetadata(props: CustomDomainPageProps): Promise<Metadata> {
  const { domain } = await props.params;
  const cleanDomain = (domain || '').toLowerCase().trim();
  const profile = await fetchProfileByDomain(cleanDomain);

  if (!profile) {
    return {
      title: `Connected Domain | OneClickBiz`,
      description: `Domain ${cleanDomain} is connected to the OneClickBiz high-speed cloud edge network.`
    };
  }

  const title = `${profile.name} | ${profile.company || profile.designation || 'Official Business Website'}`;
  const description = profile.bio || `Welcome to ${profile.name}'s official digital card and store at ${cleanDomain}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${cleanDomain}`,
      images: profile.avatarUrl ? [{ url: profile.avatarUrl }] : undefined
    }
  };
}

export default async function CustomDomainPage(props: CustomDomainPageProps) {
  const { domain } = await props.params;
  const cleanDomain = (domain || '').toLowerCase().trim();
  const profile = await fetchProfileByDomain(cleanDomain);

  // If domain is connected in DNS but not yet linked to an active profile
  if (!profile) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#0B1028] via-[#10183F] to-[#0A0E27] text-white flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="max-w-lg w-full bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
            <Globe2 className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DNS Edge Connected</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {cleanDomain}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
              This custom domain is routed to the OneClickBiz high-speed cloud edge network with SSL protection.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-left space-y-2.5 text-xs text-slate-300">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Next Step: Link to Your Smart Card</span>
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-400 pl-1">
              <li>Log in to your OneClickBiz business dashboard.</li>
              <li>Go to <strong>Settings &gt; Custom Domain</strong>.</li>
              <li>Enter <code className="text-blue-300 font-mono">{cleanDomain}</code> and click <strong>Verify &amp; Connect</strong>.</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
            <Link
              href="https://oneclickbiz.in/login"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#174BFF] to-blue-600 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
            >
              <span>Go to OneClickBiz Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="https://oneclickbiz.in"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Learn More</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Profile JSON-LD metadata for search engines
  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.designation,
      worksFor: {
        '@type': 'Organization',
        name: profile.company || `${profile.name}'s Business`,
      },
      description: profile.bio,
      image: profile.avatarUrl,
      email: profile.email,
      telephone: profile.phone,
      url: `https://${cleanDomain}`,
      sameAs: [
        profile.website,
        ...(profile.sectionData?.socials?.items?.map((s) => s.url) || [])
      ].filter(Boolean),
    },
  };

  const displayProfile = profile.bio ? {
    ...profile,
    sectionData: {
      ...(profile.sectionData || {}),
      about: {
        ...((profile.sectionData?.about as any) || {}),
        content: profile.bio
      }
    }
  } : profile;

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#111111] font-sans relative w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <div className="w-full relative z-10">
        <ProfileCardView profile={displayProfile} isMockup={false} initialViewMode="website" showViewToggle={true} />
      </div>

      <SharePreviewFloatingBar profile={displayProfile} />
    </main>
  );
}
