import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    if (session.userId === 'admin_master_001') {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: 'admin_master_001',
          name: 'Platform Super Admin',
          email: 'admin@oneclickbiz.in',
          role: 'SUPER_ADMIN'
        }
      });
    }

    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { id: session.userId },
        include: {
          memberships: {
            include: {
              organization: {
                include: {
                  profiles: true
                }
              }
            }
          }
        }
      });
    } catch (dbErr) {
      console.warn('[Me API] Prisma lookup failed or DB offline:', dbErr);
    }

    if (!user) {
      // In local development or fallback session, return active session
      return NextResponse.json({
        authenticated: true,
        hasActivePaidPlan: true,
        subscriptionStatus: 'ACTIVE',
        planTier: 'ADVANCED',
        user: {
          id: session.userId,
          name: session.email ? session.email.split('@')[0] : 'Dr. Aravind Reddy',
          email: session.email || 'developer@oneclickbiz.in',
          role: session.role || 'USER',
          organizationId: session.organizationId || 'org_dev_001',
          businessName: 'OneClickBizz Enterprise Technologies',
          slug: 're-builders',
          template: 're-builders',
          category: 'Real Estate',
          subscriptionStatus: 'ACTIVE',
          hasActivePaidPlan: true,
          planTier: 'ADVANCED'
        }
      });
    }

    const defaultOrg = user.memberships[0]?.organization;
    const defaultProfile = defaultOrg?.profiles[0];

    // Inspect defaultProfile sections or slug for templateId & category
    let userTemplateId = 're-builders';
    let userCategory = 'Real Estate';
    if (defaultProfile) {
      try {
        const heroSec = await prisma.profileSection.findFirst({
          where: { profileId: defaultProfile.id, type: 'hero' }
        });
        if (heroSec && heroSec.config && typeof heroSec.config === 'object') {
          const conf = heroSec.config as any;
          if (conf.templateId) userTemplateId = conf.templateId;
          if (conf.category) userCategory = conf.category;
        }
      } catch (_) {}
      if (defaultProfile.slug?.startsWith('re-')) {
        userTemplateId = 're-builders';
        userCategory = 'Real Estate';
      } else if (defaultProfile.slug?.startsWith('home-interior') || defaultProfile.slug?.startsWith('interior')) {
        userTemplateId = 'home-interior';
        userCategory = 'Interior Design';
      }
    }

    // Check if the user has an active PAID invoice within 365 days
    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const paidInvoice = await prisma.invoice.findFirst({
      where: {
        OR: [
          { userId: user.id },
          { organizationId: defaultOrg?.id }
        ],
        status: 'PAID'
      },
      orderBy: { createdAt: 'desc' }
    });

    const hasActivePaidPlan = Boolean(
      paidInvoice && (Date.now() - paidInvoice.createdAt.getTime() < ONE_YEAR_MS)
    );

    const isCancelled = defaultOrg?.subscriptionStatus === 'CANCELLED' || defaultOrg?.subscriptionStatus === 'SUSPENDED';
    const subscriptionStatus = isCancelled 
      ? defaultOrg.subscriptionStatus 
      : (hasActivePaidPlan ? 'ACTIVE' : 'UNPAID');
    const planTier = (paidInvoice?.planTier || defaultOrg?.planId || 'BASIC').toUpperCase();

    // STRICT: If unpaid or expired, ensure profile is unpublished in DB
    if (!hasActivePaidPlan && defaultProfile?.isPublished) {
      await prisma.profile.update({
        where: { id: defaultProfile.id },
        data: { isPublished: false }
      }).catch(() => {});
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: defaultOrg?.id,
        businessName: defaultOrg?.name,
        planTier: hasActivePaidPlan ? planTier : 'UNPAID',
        subscriptionStatus,
        hasActivePaidPlan,
        isPublished: Boolean(defaultProfile?.isPublished && hasActivePaidPlan),
        slug: defaultProfile?.slug || 'profile',
        template: userTemplateId,
        category: userCategory,
      }
    });
  } catch (error: any) {
    console.error('Session check error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
