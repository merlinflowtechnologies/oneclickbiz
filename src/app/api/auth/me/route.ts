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

    const user = await prisma.user.findUnique({
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

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const defaultOrg = user.memberships[0]?.organization;
    const defaultProfile = defaultOrg?.profiles[0];

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
        slug: defaultProfile?.slug || 'profile'
      }
    });
  } catch (error: any) {
    console.error('Session check error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
