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

    // Normal User Database Login
    const user = await prisma.user.findUnique({
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

    if (user && user.role === 'SUPER_ADMIN') {
      return NextResponse.json({ 
        error: 'Access Restricted: Platform Super Admin accounts cannot sign in through the Business User Portal. Please use the Super Admin Portal at /admin/login.' 
      }, { status: 403 });
    }

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const passwordMatch = await comparePassword(password, user.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const defaultOrg = user.memberships[0]?.organization;
    const defaultProfile = defaultOrg?.profiles[0];

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId: defaultOrg?.id
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: defaultOrg?.id,
        slug: defaultProfile?.slug || 'profile'
      }
    });

    return setAuthCookie(response, token);
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
