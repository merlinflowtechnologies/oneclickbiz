import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

// GET bookings for current user's organization
export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: { organizationId: session.organizationId },
      include: {
        service: true,
        profile: { select: { name: true, slug: true } }
      },
      orderBy: { bookingDate: 'desc' }
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// POST public booking creation
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profileSlug, serviceId, customerName, customerEmail, customerPhone, date, time, notes } = body;

    if (!customerName || !customerEmail || !customerPhone || !date || !time) {
      return NextResponse.json({ error: 'Customer name, email, phone, date, and time are required' }, { status: 400 });
    }

    let organizationId: string | undefined;
    let profileId: string | undefined;

    if (profileSlug) {
      const profile = await prisma.profile.findUnique({
        where: { slug: profileSlug }
      });
      if (profile) {
        organizationId = profile.organizationId;
        profileId = profile.id;
      }
    }

    if (!organizationId) {
      // Fallback to first organization if available
      const firstOrg = await prisma.organization.findFirst();
      organizationId = firstOrg?.id;
    }

    if (!organizationId) {
      return NextResponse.json({ error: 'Organization not found for booking' }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        organizationId,
        profileId,
        serviceId: serviceId || null,
        customerName,
        customerEmail,
        customerPhone,
        bookingDate: new Date(date),
        startTime: time,
        endTime: time,
        notes: notes || '',
        status: 'PENDING'
      }
    });

    return NextResponse.json({ success: true, message: 'Appointment requested successfully', booking }, { status: 201 });
  } catch (error: any) {
    console.error('Create booking error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// PATCH update booking status (CONFIRMED, CANCELLED, COMPLETED)
export async function PATCH(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Booking ID and status are required' }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id }
    });

    if (!booking || booking.organizationId !== session.organizationId) {
      return NextResponse.json({ error: 'Booking not found or unauthorized' }, { status: 404 });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({ success: true, booking: updated });
  } catch (error: any) {
    console.error('Update booking status error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
