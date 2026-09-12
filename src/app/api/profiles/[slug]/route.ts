import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

// GET public profile by slug
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const cleanSlug = (slug || '').toLowerCase().trim();

    const profile = await prisma.profile.findUnique({
      where: { slug: cleanSlug },
      include: {
        sections: { orderBy: { order: 'asc' } },
        socialLinks: { orderBy: { order: 'asc' } },
        products: { where: { isAvailable: true }, orderBy: { order: 'asc' } },
        services: { where: { isAvailable: true } },
        organization: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            subscriptionStatus: true
          }
        }
      }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const paidInvoice = await prisma.invoice.findFirst({
      where: {
        status: 'PAID',
        organizationId: profile.organizationId
      }
    });

    const isCancelled = profile.organization?.subscriptionStatus === 'CANCELLED';
    const isPaid = !!paidInvoice;
    const subscriptionStatus = isCancelled ? 'CANCELLED' : (isPaid ? 'ACTIVE' : 'EXPIRED');
    const isExpired = subscriptionStatus !== 'ACTIVE';

    // Increment views asynchronously
    prisma.profile.update({
      where: { id: profile.id },
      data: { viewCount: { increment: 1 } }
    }).catch(err => console.error('Failed to increment view count:', err));

    return NextResponse.json({ 
      success: true, 
      profile: {
        ...profile,
        subscriptionStatus,
        isExpired
      } 
    });
  } catch (error: any) {
    console.error('Fetch profile by slug error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// PUT update profile by slug
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await context.params;
    const body = await req.json();

    const profile = await prisma.profile.findUnique({
      where: { slug }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Verify ownership (unless Super Admin)
    if (session.role !== 'SUPER_ADMIN' && profile.organizationId !== session.organizationId) {
      return NextResponse.json({ error: 'Forbidden: You do not own this profile' }, { status: 403 });
    }

    const updated = await prisma.profile.update({
      where: { id: profile.id },
      data: {
        name: body.name !== undefined ? body.name : profile.name,
        designation: body.designation !== undefined ? body.designation : profile.designation,
        company: body.company !== undefined ? body.company : profile.company,
        bio: body.bio !== undefined ? body.bio : profile.bio,
        email: body.email !== undefined ? body.email : profile.email,
        phone: body.phone !== undefined ? body.phone : profile.phone,
        whatsapp: body.whatsapp !== undefined ? body.whatsapp : profile.whatsapp,
        website: body.website !== undefined ? body.website : profile.website,
        address: body.address !== undefined ? body.address : profile.address,
        theme: body.theme !== undefined ? body.theme : profile.theme,
        avatarUrl: body.avatarUrl !== undefined ? body.avatarUrl : profile.avatarUrl,
        coverUrl: body.coverUrl !== undefined ? body.coverUrl : profile.coverUrl,
        isPublished: body.isPublished !== undefined ? body.isPublished : profile.isPublished,
      }
    });

    return NextResponse.json({ success: true, profile: updated });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// DELETE profile
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await context.params;

    const profile = await prisma.profile.findUnique({
      where: { slug }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    if (session.role !== 'SUPER_ADMIN' && profile.organizationId !== session.organizationId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.profile.delete({
      where: { id: profile.id }
    });

    return NextResponse.json({ success: true, message: 'Profile deleted successfully' });
  } catch (error: any) {
    console.error('Delete profile error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
