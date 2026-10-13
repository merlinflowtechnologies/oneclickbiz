import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, signToken, setAuthCookie } from '@/lib/auth';
import { getTemplateProfile } from '@/data/templatePresets';
import { normalizeCategory, isTemplateAllowedForCategory, VCARD_TEMPLATES_CATALOG } from '@/data/vcardTemplates';

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

    // Check if user already exists with offline/dev resilience
    let existingUser = null;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email: cleanEmail }
      });
    } catch (dbErr) {
      console.warn('[Register API] Database offline or unreachable:', dbErr);
    }

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    // Resolve template and industry preset universally for any business entity
    const effectiveCategory = normalizeCategory(body.category || null, body.templateId || cleanSlug);
    const isRestaurantCategory = effectiveCategory === 'Food Business';
    let effectiveTemplateId = body.templateId;
    if (!effectiveTemplateId || !isTemplateAllowedForCategory(effectiveTemplateId, effectiveCategory)) {
      const allowedTemplates = VCARD_TEMPLATES_CATALOG.filter(t => isTemplateAllowedForCategory(t.id, effectiveCategory));
      effectiveTemplateId = allowedTemplates[0]?.id || (effectiveCategory === 'Real Estate' ? 're-builders' : 'vcard39');
    }
    const templatePreset = getTemplateProfile(effectiveTemplateId);

    // Create User, Organization, and Default Profile in a transaction (with fallback)
    let result: any = null;
    try {
      result = await prisma.$transaction(async (tx) => {
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

        const rawPhone = body.phone ? String(body.phone).trim() : null;
        const cleanWaDigits = rawPhone ? rawPhone.replace(/\D/g, '') : null;
        const formattedWa = cleanWaDigits ? (cleanWaDigits.length === 10 ? `91${cleanWaDigits}` : cleanWaDigits) : null;

        // Guarantee unique slug for profile
        let baseSlug = (cleanSlug || name.toLowerCase().replace(/[^a-z0-9]/g, '-')).replace(/^-+|-+$/g, '') || 'card';
        let uniqueSlug = baseSlug;
        let slugCounter = 1;
        while (await tx.profile.findUnique({ where: { slug: uniqueSlug } })) {
          uniqueSlug = `${baseSlug}-${slugCounter}`;
          slugCounter++;
        }

        const profile = await tx.profile.create({
          data: {
            organizationId: organization.id,
            slug: uniqueSlug,
            name,
            company: businessName || `${name}'s Business`,
            designation: templatePreset.designation || (isRestaurantCategory ? 'Smart Digital Dining & Instant WhatsApp Ordering' : effectiveCategory === 'Interior Design' ? 'Principal Architect & Founder' : (effectiveCategory === 'Real Estate' ? 'Managing Director & Builder' : 'Founder / Managing Director')),
            bio: templatePreset.bio || `${businessName || name} - Smart digital business identity.`,
            email: cleanEmail,
            phone: rawPhone,
            whatsapp: formattedWa,
            theme: templatePreset.theme || (isRestaurantCategory ? 'brahmin-food' : 'modern-indigo'),
            avatarUrl: templatePreset.avatarUrl,
            coverUrl: templatePreset.coverUrl,
            isPublished: false,
          }
        });

        // Seed initial sections & config from template preset
        if (templatePreset.sections && Array.isArray(templatePreset.sections)) {
          for (let i = 0; i < templatePreset.sections.length; i++) {
            const sec = templatePreset.sections[i];
            const secConfig = templatePreset.sectionData?.[sec.type as keyof typeof templatePreset.sectionData] || {};
            const configWithMeta = sec.type === 'hero' 
              ? { 
                  ...secConfig, 
                  templateId: effectiveTemplateId, 
                  category: effectiveCategory,
                  restaurant: templatePreset.sectionData?.restaurant,
                  realEstate: templatePreset.sectionData?.realEstate,
                  interior: templatePreset.sectionData?.interior 
                } 
              : secConfig;

            await tx.profileSection.create({
              data: {
                profileId: profile.id,
                type: sec.type,
                title: sec.title,
                isVisible: sec.isVisible,
                order: sec.order,
                config: configWithMeta as any
              }
            }).catch(() => {});
          }
        }

        // Seed dedicated realEstate section if applicable
        if (templatePreset.sectionData?.realEstate) {
          await tx.profileSection.create({
            data: {
              profileId: profile.id,
              type: 'realEstate',
              title: 'RERA & Track Record',
              isVisible: true,
              order: 11,
              config: templatePreset.sectionData.realEstate as any
            }
          }).catch(() => {});
        }

        // Seed dedicated interior section if applicable
        if (templatePreset.sectionData?.interior) {
          await tx.profileSection.create({
            data: {
              profileId: profile.id,
              type: 'interior',
              title: 'IIID & Studio Credentials',
              isVisible: true,
              order: 12,
              config: templatePreset.sectionData.interior as any
            }
          }).catch(() => {});
        }

        // Seed dedicated restaurant section if applicable
        if (templatePreset.sectionData?.restaurant || isRestaurantCategory) {
          await tx.profileSection.create({
            data: {
              profileId: profile.id,
              type: 'restaurant',
              title: 'Kitchen & Operations',
              isVisible: true,
              order: 10,
              config: (templatePreset.sectionData?.restaurant || {
                cuisineType: 'Fine Dining & Takeaway',
                operatingHours: '11:30 AM – 11:30 PM (Daily)',
                avgPrepTime: '15–20 Mins',
                dietaryType: 'Pure Veg & Halal Non-Veg'
              }) as any
            }
          }).catch(() => {});
        }

        return { user, organization, profile };
      });
    } catch (txErr: any) {
      console.error('[Register API] Database write failed:', txErr);
      if (process.env.NODE_ENV !== 'production') {
        const devUserId = `user_${cleanEmail.replace(/[^a-z0-9]/g, '_')}`;
        const devOrgId = `org_${cleanEmail.replace(/[^a-z0-9]/g, '_')}`;
        result = {
          user: { id: devUserId, email: cleanEmail, name, role: 'USER' },
          organization: { id: devOrgId, name: businessName || `${name}'s Business`, slug: cleanSlug },
          profile: { slug: cleanSlug, templateId: effectiveTemplateId, category: effectiveCategory }
        };
      } else {
        return NextResponse.json({ 
          error: txErr?.message || 'Database registration failed. Please try again with valid business details.' 
        }, { status: 500 });
      }
    }

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
        template: effectiveTemplateId,
        category: effectiveCategory,
      }
    }, { status: 201 });

    return setAuthCookie(response, token);
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
