import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

/**
 * GET /api/analytics
 * Returns real live analytics, leads, and bookings for the authenticated user's mini-website
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        memberships: {
          include: {
            organization: {
              include: {
                profiles: {
                  orderBy: { createdAt: 'asc' }
                }
              }
            }
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const defaultOrg = user.memberships[0]?.organization;
    const profile = defaultOrg?.profiles[0];

    if (!profile) {
      return NextResponse.json({
        success: true,
        userName: user.name,
        businessName: defaultOrg?.name || user.name,
        slug: 'profile',
        stats: {
          views: 0,
          qrScans: 0,
          nfcTaps: 0,
          whatsappClicks: 0,
          callClicks: 0,
          vcfDownloads: 0
        },
        leads: [],
        bookings: []
      });
    }

    // Aggregate real analytics events for this user's profile
    const eventCounts = await prisma.analyticsEvent.groupBy({
      by: ['eventType'],
      where: { profileId: profile.id },
      _count: { eventType: true }
    });

    const counts: Record<string, number> = {};
    for (const item of eventCounts) {
      counts[item.eventType] = item._count.eventType;
    }

    // Fetch real leads for this user's organization
    const leads = defaultOrg ? await prisma.lead.findMany({
      where: { organizationId: defaultOrg.id },
      orderBy: { createdAt: 'desc' },
      take: 6
    }) : [];

    // Fetch real bookings for this user's organization
    const bookings = defaultOrg ? await prisma.booking.findMany({
      where: { organizationId: defaultOrg.id },
      include: { service: { select: { title: true } } },
      orderBy: { bookingDate: 'desc' },
      take: 6
    }) : [];

    const stats = {
      views: Math.max(profile.viewCount || 0, counts['profile_view'] || 0),
      qrScans: counts['qr_scan'] || 0,
      nfcTaps: counts['nfc_scan'] || 0,
      whatsappClicks: counts['whatsapp_click'] || 0,
      callClicks: counts['phone_click'] || 0,
      vcfDownloads: counts['contact_download'] || 0
    };

    return NextResponse.json({
      success: true,
      userName: user.name,
      businessName: defaultOrg?.name || profile.company || user.name,
      slug: profile.slug,
      stats,
      leads,
      bookings
    });
  } catch (error: any) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/analytics
 * Public endpoint to track interactions on live digital business cards (/v/[slug])
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, eventType } = body;

    if (!slug || !eventType) {
      return NextResponse.json({ error: 'Slug and eventType are required' }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().trim();
    const profile = await prisma.profile.findUnique({
      where: { slug: cleanSlug }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const referrer = req.headers.get('referer') || undefined;
    const userAgent = req.headers.get('user-agent') || undefined;

    // Save real interaction event to database
    await prisma.analyticsEvent.create({
      data: {
        profileId: profile.id,
        eventType,
        referrer,
        userAgent
      }
    });

    // If it is an impression or scan, increment the overall profile view count
    if (['profile_view', 'qr_scan', 'nfc_scan'].includes(eventType)) {
      await prisma.profile.update({
        where: { id: profile.id },
        data: { viewCount: { increment: 1 } }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ error: error.message || 'Tracking error' }, { status: 500 });
  }
}
