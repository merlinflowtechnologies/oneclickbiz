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

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: defaultOrg?.id,
        businessName: defaultOrg?.name,
        planTier: defaultOrg?.subscriptionStatus || 'Basic',
        slug: defaultProfile?.slug || 'profile'
      }
    });
  } catch (error: any) {
    console.error('Session check error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
