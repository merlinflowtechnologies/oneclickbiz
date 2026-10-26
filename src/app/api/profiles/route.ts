import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

// GET all profiles belonging to user's organization
export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profiles = await prisma.profile.findMany({
      where: { organizationId: session.organizationId },
      include: {
        sections: { orderBy: { order: 'asc' } },
        socialLinks: { orderBy: { order: 'asc' } },
        products: { orderBy: { order: 'asc' } },
        services: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, profiles });
  } catch (error: any) {
    console.error('Fetch profiles error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// POST create new profile
export async function POST(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const org = await prisma.organization.findUnique({
      where: { id: session.organizationId },
      include: {
        profiles: { select: { id: true } }
      }
    });

    const planTier = (org?.subscriptionStatus || 'Basic').toUpperCase();
    const maxCards = planTier === 'ADVANCED' ? 5 : planTier === 'PRO' ? 3 : 1;
    const currentCardCount = org?.profiles.length || 0;

    if (currentCardCount >= maxCards) {
      return NextResponse.json({
        error: `Card limit reached (${currentCardCount}/${maxCards} cards). Upgrade your plan to create more cards.`,
        limitReached: true,
        planTier,
        maxCards
      }, { status: 403 });
    }

    const body = await req.json();
    const { name, slug, designation, company, bio, phone, email, whatsapp, website, address, theme, avatarUrl, coverUrl } = body;

    const cleanSlug = (slug || name.toLowerCase().replace(/[^a-z0-9]/g, '-')).trim();

    // Check slug uniqueness
    const existing = await prisma.profile.findUnique({
      where: { slug: cleanSlug }
    });

    if (existing) {
      return NextResponse.json({ error: 'This profile slug is already in use' }, { status: 409 });
    }

    const profile = await prisma.profile.create({
      data: {
        organizationId: session.organizationId,
        slug: cleanSlug,
        name: name || 'New Commercial Mini-Website',
        designation,
        company,
        bio,
        phone,
        email,
        whatsapp,
        website,
        address,
        theme: theme || 'modern-indigo',
        avatarUrl,
        coverUrl,
        isPublished: true
      }
    });

    return NextResponse.json({ success: true, profile }, { status: 201 });
  } catch (error: any) {
    console.error('Create profile error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
