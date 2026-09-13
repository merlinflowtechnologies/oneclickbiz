import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { credential, accessToken } = body;

    let email = '';
    let name = '';
    let picture = '';

    if (credential) {
      try {
        const parts = credential.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
          email = payload.email?.toLowerCase().trim();
          name = payload.name || payload.given_name || email.split('@')[0];
          picture = payload.picture || '';
        }
      } catch (e) {
        console.error('Failed to parse Google JWT payload:', e);
      }
    }

    if (!email && credential) {
      const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
      if (res.ok) {
        const info = await res.json();
        email = info.email?.toLowerCase().trim();
        name = info.name || email.split('@')[0];
        picture = info.picture || '';
      }
    } else if (!email && accessToken) {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const info = await res.json();
        email = info.email?.toLowerCase().trim();
        name = info.name || email.split('@')[0];
        picture = info.picture || '';
      }
    }

    if (!email) {
      return NextResponse.json({ error: 'Failed to verify Google account' }, { status: 400 });
    }

    if (email === 'admin@oneclickbiz.in') {
      return NextResponse.json({ 
        error: 'Access Restricted: Platform Super Admin accounts cannot sign in through Google on the Business User Portal. Please use the Super Admin Portal at /admin/login.' 
      }, { status: 403 });
    }

    // Find or create user in database
    let existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        memberships: {
          include: {
            organization: {
              include: {
                profiles: true,
              },
            },
          },
        },
      },
    });

    let activeUser = existingUser;

    if (!activeUser) {
      const baseSlug = (name || email.split('@')[0])
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 25) || 'card';

      let uniqueSlug = baseSlug;
      let counter = 1;
      while (await prisma.profile.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      activeUser = await prisma.user.create({
        data: {
          email,
          name: name || email.split('@')[0],
          avatarUrl: picture,
          role: 'USER',
          memberships: {
            create: {
              role: 'ORG_OWNER',
              organization: {
                create: {
                  name: `${name || 'My'} Business`,
                  slug: uniqueSlug,
                  subscriptionStatus: 'UNPAID',
                  profiles: {
                    create: {
                      name: name || 'Business Professional',
                      slug: uniqueSlug,
                      designation: 'Founder / Managing Director',
                      company: `${name || 'My'} Business`,
                      bio: 'Connect with me seamlessly via my interactive smart business identity card.',
                      email,
                      avatarUrl: picture,
                      theme: 'emerald-dark',
                      isPublished: false,
                    },
                  },
                },
              },
            },
          },
        },
        include: {
          memberships: {
            include: {
              organization: {
                include: {
                  profiles: true,
                },
              },
            },
          },
        },
      });
    }

    const defaultOrg = activeUser.memberships[0]?.organization;
    const defaultProfile = defaultOrg?.profiles[0];

    // Check if the user has an active PAID invoice within 365 days
    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const paidInvoice = await prisma.invoice.findFirst({
      where: {
        OR: [
          { userId: activeUser.id },
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

    // STRICT: If user has not paid or subscription has expired, ensure profile is unpublished in DB
    if (!hasActivePaidPlan && defaultProfile?.isPublished) {
      await prisma.profile.update({
        where: { id: defaultProfile.id },
        data: { isPublished: false }
      }).catch(() => {});
    }

    const token = signToken({
      userId: activeUser.id,
      email: activeUser.email,
      role: activeUser.role,
      organizationId: defaultOrg?.id,
    });

    const response = NextResponse.json({
      success: true,
      hasActivePaidPlan,
      subscriptionStatus,
      planTier,
      isNewUser: !existingUser,
      user: {
        id: activeUser.id,
        name: activeUser.name,
        email: activeUser.email,
        role: activeUser.role,
        organizationId: defaultOrg?.id,
        businessName: defaultOrg?.name,
        slug: defaultProfile?.slug || 'profile',
        subscriptionStatus,
        hasActivePaidPlan,
        planTier
      },
    });

    return setAuthCookie(response, token);
  } catch (error: any) {
    console.error('Google Auth Route Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error during Google Sign-In' },
      { status: 500 }
    );
  }
}
