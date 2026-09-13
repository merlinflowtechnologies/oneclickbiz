import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, signToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, businessName, slug } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanSlug = (slug || name.toLowerCase().replace(/[^a-z0-9]/g, '-')).trim();

    if (cleanEmail === 'admin@oneclickbiz.in') {
      return NextResponse.json({ 
        error: 'Access Restricted: This email address is reserved for Platform Super Administration. Please sign in via /admin/login.' 
      }, { status: 403 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    // Create User, Organization, and Default Profile in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email: cleanEmail,
          passwordHash,
          role: 'USER',
        }
      });

      const organization = await tx.organization.create({
        data: {
          name: businessName || `${name}'s Business`,
          slug: `${cleanSlug}-${Date.now().toString(36)}`,
          subscriptionStatus: 'UNPAID',
          members: {
            create: {
              userId: user.id,
              role: 'ORG_OWNER'
            }
          }
        }
      });

      const profile = await tx.profile.create({
        data: {
          organizationId: organization.id,
          slug: cleanSlug,
          name,
          company: businessName || `${name}'s Business`,
          email: cleanEmail,
          theme: 'modern-indigo',
          isPublished: false,
        }
      });

      return { user, organization, profile };
    });

    const token = signToken({
      userId: result.user.id,
      email: result.user.email,
      role: result.user.role,
      organizationId: result.organization.id,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        slug: result.profile.slug,
        organizationId: result.organization.id,
      }
    }, { status: 201 });

    return setAuthCookie(response, token);
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
