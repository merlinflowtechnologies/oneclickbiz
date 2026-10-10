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

    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const paidInvoice = await prisma.invoice.findFirst({
      where: {
        status: 'PAID',
        organizationId: profile.organizationId
      },
      orderBy: { createdAt: 'desc' }
    });

    const isPaidActive = paidInvoice && (Date.now() - paidInvoice.createdAt.getTime() < ONE_YEAR_MS);
    const isCancelled = profile.organization?.subscriptionStatus === 'CANCELLED';
    const subscriptionStatus = isCancelled ? 'CANCELLED' : (isPaidActive ? 'ACTIVE' : 'EXPIRED');
    const isExpired = subscriptionStatus !== 'ACTIVE';

    // Reconstruct sections & sectionData from ProfileSection configs
    const sectionData: Record<string, any> = {};
    let resolvedTemplateId: string | undefined = undefined;
    let resolvedCategory: string | undefined = undefined;

    const sections = (profile.sections || []).map(s => {
      if (s.config && typeof s.config === 'object' && Object.keys(s.config).length > 0) {
        sectionData[s.type] = s.config;
        if (s.type === 'hero') {
          const cfg = s.config as any;
          if (cfg.templateId) resolvedTemplateId = cfg.templateId;
          if (cfg.category) resolvedCategory = cfg.category;
        }
      }
      return {
        id: s.id,
        type: s.type,
        title: s.title,
        isVisible: s.isVisible,
        order: s.order
      };
    });

    if (cleanSlug.startsWith('re-') || resolvedCategory === 'Real Estate') {
      if (!resolvedTemplateId) resolvedTemplateId = 're-builders';
      if (!resolvedCategory) resolvedCategory = 'Real Estate';
    }

    // Increment views asynchronously
    prisma.profile.update({
      where: { id: profile.id },
      data: { viewCount: { increment: 1 } }
    }).catch(err => console.error('Failed to increment view count:', err));

    return NextResponse.json({ 
      success: true, 
      profile: {
        ...profile,
        templateId: resolvedTemplateId || (cleanSlug.startsWith('re-') ? 're-builders' : undefined),
        category: resolvedCategory || (cleanSlug.startsWith('re-') ? 'Real Estate' : undefined),
        sections: sections.length > 0 ? sections : undefined,
        sectionData: Object.keys(sectionData).length > 0 ? sectionData : undefined,
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
    const { slug } = await context.params;
    const cleanSlug = (slug || '').toLowerCase().trim();
    const body = await req.json();

    let targetProfile = await prisma.profile.findUnique({
      where: { slug: cleanSlug }
    });

    const session = await getSessionUser(req);

    if (!targetProfile) {
      let orgId = session?.organizationId;
      if (!orgId) {
        const firstOrg = await prisma.organization.findFirst();
        orgId = firstOrg?.id;
      }

      if (orgId) {
        targetProfile = await prisma.profile.create({
          data: {
            organizationId: orgId,
            slug: cleanSlug,
            name: body.name || 'Digital Card',
            designation: body.designation,
            company: body.company,
            bio: body.bio,
            phone: body.phone,
            email: body.email,
            whatsapp: body.whatsapp,
            website: body.website,
            address: body.address,
            theme: body.theme || 'modern-indigo',
            avatarUrl: body.avatarUrl,
            coverUrl: body.coverUrl,
            isPublished: true
          }
        });
      } else {
        return NextResponse.json({ success: true, profile: body, note: 'Saved locally' });
      }
    } else {
      // If profile exists, allow update if super admin, owner, or if profile is unassigned
      if (session && session.role !== 'SUPER_ADMIN' && targetProfile.organizationId && session.organizationId && targetProfile.organizationId !== session.organizationId) {
        // If target profile belonged to a template/placeholder org, adopt it
        const isPlaceholderOrg = targetProfile.organizationId.startsWith('org_') || targetProfile.organizationId === 'default';
        if (isPlaceholderOrg && session.organizationId) {
          await prisma.profile.update({
            where: { id: targetProfile.id },
            data: { organizationId: session.organizationId }
          }).catch(() => {});
        }
      }
    }

    const updated = await prisma.profile.update({
      where: { id: targetProfile.id },
      data: {
        name: body.name !== undefined ? body.name : targetProfile.name,
        designation: body.designation !== undefined ? body.designation : targetProfile.designation,
        company: body.company !== undefined ? body.company : targetProfile.company,
        bio: body.bio !== undefined ? body.bio : targetProfile.bio,
        email: body.email !== undefined ? body.email : targetProfile.email,
        phone: body.phone !== undefined ? body.phone : targetProfile.phone,
        whatsapp: body.whatsapp !== undefined ? body.whatsapp : targetProfile.whatsapp,
        website: body.website !== undefined ? body.website : targetProfile.website,
        address: body.address !== undefined ? body.address : targetProfile.address,
        theme: body.theme !== undefined ? body.theme : targetProfile.theme,
        avatarUrl: body.avatarUrl !== undefined ? body.avatarUrl : targetProfile.avatarUrl,
        coverUrl: body.coverUrl !== undefined ? body.coverUrl : targetProfile.coverUrl,
        isPublished: body.isPublished !== undefined ? body.isPublished : targetProfile.isPublished,
      }
    });

    // Persist sections and full sectionData (Gallery, Videos, Services, Products, etc.)
    if (body.sections && Array.isArray(body.sections)) {
      try {
        await prisma.profileSection.deleteMany({
          where: { profileId: targetProfile.id }
        });

        for (let i = 0; i < body.sections.length; i++) {
          const sec = body.sections[i];
          const secType = sec.type;
          const configData = secType === 'hero' 
            ? { 
                ...(body.sectionData?.[secType] || {}), 
                templateId: body.templateId || (body.category === 'Real Estate' || cleanSlug.startsWith('re-') ? 're-builders' : undefined),
                category: body.category || (cleanSlug.startsWith('re-') ? 'Real Estate' : undefined),
                realEstate: body.sectionData?.realEstate
              }
            : (body.sectionData?.[secType] || {});

          await prisma.profileSection.create({
            data: {
              profileId: targetProfile.id,
              type: secType,
              title: sec.title || secType,
              isVisible: sec.isVisible !== false,
              order: sec.order !== undefined ? sec.order : i + 1,
              config: configData
            }
          });
        }

        // Dedicated realEstate section if applicable
        if (body.sectionData?.realEstate) {
          await prisma.profileSection.create({
            data: {
              profileId: targetProfile.id,
              type: 'realEstate',
              title: 'RERA & Track Record',
              isVisible: true,
              order: 11,
              config: body.sectionData.realEstate
            }
          }).catch(() => {});
        }
      } catch (secErr) {
        console.error('Error updating profile sections:', secErr);
      }
    }

    return NextResponse.json({ 
      success: true, 
      profile: { 
        ...updated, 
        templateId: body.templateId || (body.category === 'Real Estate' || cleanSlug.startsWith('re-') ? 're-builders' : undefined),
        category: body.category || (cleanSlug.startsWith('re-') ? 'Real Estate' : undefined),
        sections: body.sections, 
        sectionData: body.sectionData 
      } 
    });
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
