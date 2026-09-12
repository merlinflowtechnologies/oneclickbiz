import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

// GET all leads for user's organization
export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      where: { organizationId: session.organizationId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    console.error('Fetch leads error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// POST public lead inquiry capture from visiting card
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profileSlug, name, email, phone, message } = body;

    if (!name || !email || !profileSlug) {
      return NextResponse.json({ error: 'Name, email, and card profile are required' }, { status: 400 });
    }

    const profile = await prisma.profile.findUnique({
      where: { slug: profileSlug }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Associated smart card profile not found' }, { status: 404 });
    }

    const lead = await prisma.lead.create({
      data: {
        organizationId: profile.organizationId,
        profileId: profile.id,
        name,
        email,
        phone,
        message: message || '',
        status: 'NEW'
      }
    });

    return NextResponse.json({ success: true, message: 'Inquiry sent successfully', leadId: lead.id }, { status: 201 });
  } catch (error: any) {
    console.error('Submit lead error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// PATCH update lead status (NEW, CONTACTED, QUALIFIED, CONVERTED, LOST)
export async function PATCH(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Lead ID and new status are required' }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id }
    });

    if (!lead || lead.organizationId !== session.organizationId) {
      return NextResponse.json({ error: 'Lead not found or unauthorized' }, { status: 404 });
    }

    const updated = await prisma.lead.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    console.error('Update lead status error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
