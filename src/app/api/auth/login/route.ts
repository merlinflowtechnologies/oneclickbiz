import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { comparePassword, signToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, isAdminLogin } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const isSuperAdminEmail = cleanEmail === 'admin@oneclickbiz.in';

    // -------------------------------------------------------------
    // SCENARIO 1: ATTEMPTING LOGIN FROM ADMIN PORTAL (/admin/login)
    // -------------------------------------------------------------
    if (isAdminLogin) {
      // 1. Hardcoded / master Super Admin credentials
      if (isSuperAdminEmail && password === 'oneclickbiz2026@') {
        const token = signToken({
          userId: 'admin_master_001',
          email: 'admin@oneclickbiz.in',
          role: 'SUPER_ADMIN'
        });

        const response = NextResponse.json({
          success: true,
          user: {
            id: 'admin_master_001',
            name: 'Platform Super Admin',
            email: 'admin@oneclickbiz.in',
            role: 'SUPER_ADMIN'
          }
        });

        return setAuthCookie(response, token);
      }

      // 2. Check DB for any user with SUPER_ADMIN role
      const adminUser = await prisma.user.findUnique({
        where: { email: cleanEmail }
      });

      // If user exists in DB but is a regular business entity, strictly reject access to Admin portal
      if (adminUser && adminUser.role !== 'SUPER_ADMIN') {
        return NextResponse.json({ 
          error: 'Access Denied: Business accounts cannot access the Super Admin Console. Please sign in via the Business Portal at /login.' 
        }, { status: 403 });
      }

      if (adminUser && adminUser.role === 'SUPER_ADMIN' && adminUser.passwordHash) {
        const passwordMatch = await comparePassword(password, adminUser.passwordHash);
        if (passwordMatch) {
          const token = signToken({
            userId: adminUser.id,
            email: adminUser.email,
            role: 'SUPER_ADMIN'
          });

          const response = NextResponse.json({
            success: true,
            user: {
              id: adminUser.id,
              name: adminUser.name,
              email: adminUser.email,
              role: 'SUPER_ADMIN'
            }
          });

          return setAuthCookie(response, token);
        }
      }

      return NextResponse.json({ 
        error: 'Invalid Super Admin credentials. Only authorized platform administrators can access this portal.' 
      }, { status: 401 });
    }

    // -------------------------------------------------------------
    // SCENARIO 2: ATTEMPTING LOGIN FROM BUSINESS PORTAL (/login)
    // -------------------------------------------------------------
    // Strictly block Super Admin from logging into the Business User Portal
    if (isSuperAdminEmail) {
      return NextResponse.json({ 
        error: 'Access Restricted: Platform Super Admin accounts cannot sign in through the Business User Portal. Please use the Super Admin Portal at /admin/login.' 
      }, { status: 403 });
    }

    // Normal User Database Login with offline/dev fallback
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: cleanEmail },
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
      console.warn('[Login API] Prisma lookup failed or DB offline:', dbErr);
    }

    if (user && user.role === 'SUPER_ADMIN') {
      return NextResponse.json({ 
        error: 'Access Restricted: Platform Super Admin accounts cannot sign in through the Business User Portal. Please use the Super Admin Portal at /admin/login.' 
      }, { status: 403 });
    }

    // If user exists in DB, verify password hash
    if (user && user.passwordHash) {
      const passwordMatch = await comparePassword(password, user.passwordHash);
      if (!passwordMatch) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }
    } else if (!user) {
      // In development only, allow unseeded dev accounts; in production return 401
      if (process.env.NODE_ENV === 'development') {
        const devUserId = `user_${cleanEmail.replace(/[^a-z0-9]/g, '_')}`;
        const devOrgId = `org_${cleanEmail.replace(/[^a-z0-9]/g, '_')}`;
        const devSlug = cleanEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');

        const token = signToken({
          userId: devUserId,
          email: cleanEmail,
          role: 'USER',
          organizationId: devOrgId
        });

        const response = NextResponse.json({
          success: true,
          hasActivePaidPlan: true,
          subscriptionStatus: 'ACTIVE',
          planTier: 'ADVANCED',
          user: {
            id: devUserId,
            name: cleanEmail.split('@')[0],
            email: cleanEmail,
            role: 'USER',
            organizationId: devOrgId,
            businessName: `${cleanEmail.split('@')[0]}'s Business`,
            slug: devSlug,
            template: 're-builders',
            category: 'Real Estate',
            subscriptionStatus: 'ACTIVE',
            hasActivePaidPlan: true,
            planTier: 'ADVANCED'
          }
        });

        return setAuthCookie(response, token);
      } else {
        return NextResponse.json({ error: 'No account found with this email. Please check your credentials or register.' }, { status: 401 });
      }
    } else {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    let defaultOrg: any = user.memberships[0]?.organization || null;
    let defaultProfile: any = defaultOrg?.profiles?.[0] || null;

    // If defaultProfile is not found via memberships, find directly by user email or user ID
    if (!defaultProfile) {
      defaultProfile = await prisma.profile.findFirst({
        where: {
          OR: [
            { email: cleanEmail },
            { organization: { members: { some: { userId: user.id } } } }
          ]
        },
        include: { organization: true },
        orderBy: { createdAt: 'desc' }
      });
      if (defaultProfile?.organization && !defaultOrg) {
        defaultOrg = defaultProfile.organization;
      }
    }

    // If user has an account but still has NO profile in DB, create one for their account
    if (!defaultProfile) {
      let userOrg = defaultOrg;
      if (!userOrg) {
        const cleanSlugBase = user.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/^-+|-+$/g, '') || 'business';
        userOrg = await prisma.organization.create({
          data: {
            name: `${user.name}'s Business`,
            slug: `${cleanSlugBase}-${Date.now().toString(36)}`,
            subscriptionStatus: 'ACTIVE',
            members: {
              create: {
                userId: user.id,
                role: 'ORG_OWNER'
              }
            }
          }
        });
        defaultOrg = userOrg;
      }

      let newSlug = user.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/^-+|-+$/g, '') || 'card';
      let count = 1;
      while (await prisma.profile.findUnique({ where: { slug: newSlug } })) {
        newSlug = `${user.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${count}`;
        count++;
      }

      defaultProfile = await prisma.profile.create({
        data: {
          organizationId: userOrg.id,
          slug: newSlug,
          name: user.name,
          email: cleanEmail,
          company: userOrg.name,
          designation: 'Managing Director & Builder',
          bio: `${userOrg.name} - Smart digital business identity.`,
          theme: 'modern-indigo',
          isPublished: true
        }
      });
    }

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
    let hasActivePaidPlan = true;
    let subscriptionStatus = 'ACTIVE';
    let planTier = (defaultOrg?.planId || 'ADVANCED').toUpperCase();

    try {
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

      if (paidInvoice) {
        hasActivePaidPlan = Date.now() - paidInvoice.createdAt.getTime() < ONE_YEAR_MS;
        planTier = (paidInvoice.planTier || 'ADVANCED').toUpperCase();
        subscriptionStatus = hasActivePaidPlan ? 'ACTIVE' : 'UNPAID';
      }
    } catch (invErr) {
      hasActivePaidPlan = true;
      subscriptionStatus = 'ACTIVE';
      planTier = 'ADVANCED';
    }

    const isCancelled = defaultOrg?.subscriptionStatus === 'CANCELLED' || defaultOrg?.subscriptionStatus === 'SUSPENDED';
    if (isCancelled && defaultOrg?.subscriptionStatus) {
      subscriptionStatus = defaultOrg.subscriptionStatus;
    }
    if (!planTier) {
      planTier = (defaultOrg?.planId || 'BASIC').toUpperCase();
    }

    // STRICT: If unpaid or expired, ensure profile is unpublished in DB
    if (!hasActivePaidPlan && defaultProfile?.isPublished) {
      await prisma.profile.update({
        where: { id: defaultProfile.id },
        data: { isPublished: false }
      }).catch(() => {});
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId: defaultOrg?.id
    });

    const response = NextResponse.json({
      success: true,
      hasActivePaidPlan,
      subscriptionStatus,
      planTier,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: defaultOrg?.id,
        businessName: defaultOrg?.name,
        slug: defaultProfile?.slug || 'profile',
        template: userTemplateId,
        category: userCategory,
        subscriptionStatus,
        hasActivePaidPlan,
        planTier
      }
    });

    return setAuthCookie(response, token);
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
