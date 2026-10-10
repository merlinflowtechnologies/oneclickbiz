import React from 'react';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { getProfileBySlug } from '@/lib/data-store';
import ProfileCardView from '@/components/templates/ProfileCardView';
import { DigitalProfile } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function fetchProfileData(slug: string): Promise<DigitalProfile> {
  const cleanSlug = (slug || '').toLowerCase().trim();
  if (process.env.DATABASE_URL) {
    try {
      const dbProfile = await prisma.profile.findUnique({
        where: { slug: cleanSlug },
        include: {
          sections: { orderBy: { order: 'asc' } },
          socialLinks: { orderBy: { order: 'asc' } },
          products: { where: { isAvailable: true }, orderBy: { order: 'asc' } },
          services: { where: { isAvailable: true } },
          organization: true
        }
      });

      if (dbProfile) {
        const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
        const paidInvoice = await prisma.invoice.findFirst({
          where: {
            organizationId: dbProfile.organizationId,
            status: 'PAID'
          },
          orderBy: { createdAt: 'desc' }
        });
        const hasActivePaidPlan = Boolean(
          paidInvoice && (Date.now() - paidInvoice.createdAt.getTime() < ONE_YEAR_MS)
        );
        const orgStatus = dbProfile.organization?.subscriptionStatus;
        const isCancelled = orgStatus === 'CANCELLED' || orgStatus === 'SUSPENDED';
        const subscriptionStatus: 'CANCELLED' | 'ACTIVE' | 'UNPAID' | 'EXPIRED' = isCancelled 
          ? 'CANCELLED' 
          : (hasActivePaidPlan ? 'ACTIVE' : 'UNPAID');
        const isExpired = !hasActivePaidPlan || subscriptionStatus !== 'ACTIVE';
        const isPublished = Boolean(dbProfile.isPublished && hasActivePaidPlan);

        const fallback = getProfileBySlug(cleanSlug);

        let reconstructedSectionData = { ...(fallback.sectionData || {}) };
        let reconstructedSections = fallback.sections;

        if (dbProfile.sections && dbProfile.sections.length > 0) {
          reconstructedSections = dbProfile.sections.map(s => ({
            id: s.id,
            type: s.type as any,
            title: s.title,
            isVisible: s.isVisible,
            order: s.order
          }));

          dbProfile.sections.forEach(s => {
            if (s.config && typeof s.config === 'object' && Object.keys(s.config).length > 0) {
              (reconstructedSectionData as any)[s.type] = s.config;
            }
          });
        }

        const cleanPhone = dbProfile.phone || fallback.phone;
        const rawWa = dbProfile.whatsapp || dbProfile.phone || fallback.whatsapp;
        const cleanWaDigits = (rawWa || '').replace(/\D/g, '');
        const cleanWa = cleanWaDigits.length === 10 ? `91${cleanWaDigits}` : cleanWaDigits;

        if (reconstructedSectionData?.socials?.items) {
          reconstructedSectionData.socials.items = reconstructedSectionData.socials.items.map((soc: any) => {
            const isWa = soc.platform === 'whatsapp' || soc.url?.includes('wa.me') || soc.url?.includes('whatsapp');
            const isPh = soc.platform === 'phone' || soc.url?.startsWith('tel:');
            if (isWa && cleanWa) {
              return { ...soc, url: `https://wa.me/${cleanWa}` };
            }
            if (isPh && cleanPhone) {
              return { ...soc, url: `tel:${cleanPhone.replace(/[^\d+]/g, '')}` };
            }
            return soc;
          });
        }

        // Use DB bio if it exists (even empty string means user cleared it intentionally)
        // Only fall back to preset if DB has never set a bio (null/undefined)
        const resolvedBio = dbProfile.bio != null ? dbProfile.bio : fallback.bio;

        // Ensure sectionData.about.content always mirrors the resolved bio
        if (resolvedBio != null) {
          reconstructedSectionData = {
            ...reconstructedSectionData,
            about: {
              ...(reconstructedSectionData.about || {}),
              content: resolvedBio
            }
          };
        }

        // Extract templateId, category, realEstate, and interior from hero or section configs
        const heroConfig = (reconstructedSectionData as any).hero || {};
        const resolvedTemplateId = heroConfig.templateId || fallback.templateId || (cleanSlug.startsWith('re-') ? 're-builders' : cleanSlug.startsWith('interior') || cleanSlug.startsWith('home-interior') ? 'home-interior' : undefined);
        const resolvedCategory = heroConfig.category || fallback.category || (cleanSlug.startsWith('re-') ? 'Real Estate' : cleanSlug.startsWith('interior') || cleanSlug.startsWith('home-interior') ? 'Interior Design' : undefined);

        if (heroConfig.realEstate && !reconstructedSectionData.realEstate) {
          reconstructedSectionData.realEstate = heroConfig.realEstate;
        }
        if (heroConfig.interior && !reconstructedSectionData.interior) {
          reconstructedSectionData.interior = heroConfig.interior;
        }

        return {
          ...fallback,
          id: dbProfile.id,
          slug: dbProfile.slug,
          templateId: resolvedTemplateId,
          category: resolvedCategory,
          name: dbProfile.name ?? fallback.name,
          designation: dbProfile.designation ?? fallback.designation,
          company: dbProfile.company ?? fallback.company,
          bio: resolvedBio,
          email: dbProfile.email ?? fallback.email,
          phone: dbProfile.phone ?? fallback.phone,
          whatsapp: dbProfile.whatsapp ?? fallback.whatsapp,
          website: dbProfile.website ?? fallback.website,
          address: dbProfile.address ?? fallback.address,
          theme: (dbProfile.theme as any) ?? fallback.theme,
          avatarUrl: ['kishore', 'kishore-patel'].includes(cleanSlug)
            ? '/kishore-profile-v2.png'
            : (dbProfile.avatarUrl ?? fallback.avatarUrl),
          coverUrl: dbProfile.coverUrl ?? fallback.coverUrl,
          sections: reconstructedSections,
          sectionData: reconstructedSectionData,
          isPublished,
          isExpired,
          subscriptionStatus
        };
      }
    } catch (err) {
      console.warn('Database profile lookup fallback note:', err);
    }
  }

  const fallback = getProfileBySlug(cleanSlug);
  return {
    ...fallback,
    isPublished: true,
    isExpired: false,
    subscriptionStatus: 'ACTIVE'
  };
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const profile = await fetchProfileData(resolvedParams.slug);
  const profileUrl = `https://oneclickbiz.in/v/${profile.slug}`;

  return {
    title: `${profile.name} - ${profile.designation} at ${profile.company || 'OneClickBiz'}`,
    description: profile.bio || `Connect with ${profile.name} seamlessly. Save contact directly to your phone, view WhatsApp catalog, and book appointments.`,
    keywords: [
      profile.name,
      profile.designation,
      profile.company,
      'digital business card',
      'vcard',
      'smart business identity',
      'oneclickbiz'
    ].filter(Boolean),
    alternates: {
      canonical: profileUrl,
    },
    openGraph: {
      title: `${profile.name} | ${profile.designation}`,
      description: profile.bio || `Connect with ${profile.name} on OneClickBiz`,
      url: profileUrl,
      images: [
        {
          url: profile.avatarUrl || 'https://oneclickbiz.in/logo.png',
          width: 600,
          height: 600,
          alt: profile.name,
        },
      ],
      type: 'profile',
      siteName: 'OneClickBiz',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.name} - ${profile.designation}`,
      description: profile.bio || `Connect with ${profile.name} on OneClickBiz`,
      images: [profile.avatarUrl || 'https://oneclickbiz.in/logo.png'],
    },
  };
}

export default async function PublicProfilePage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ src?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedQuery = searchParams ? await searchParams : {};
  const profile = await fetchProfileData(resolvedParams.slug);

  // Real Analytics Tracking: increment viewCount and log event in DB only if card is active
  try {
    if (process.env.DATABASE_URL && profile.id && profile.isPublished && !profile.isExpired) {
      const eventType = resolvedQuery.src === 'qr' 
        ? 'qr_scan' 
        : resolvedQuery.src === 'nfc' 
        ? 'nfc_scan' 
        : 'profile_view';

      await prisma.profile.update({
        where: { slug: profile.slug },
        data: { viewCount: { increment: 1 } }
      }).catch(() => {});

      const dbProfile = await prisma.profile.findUnique({
        where: { slug: profile.slug },
        select: { id: true }
      });

      if (dbProfile) {
        await prisma.analyticsEvent.create({
          data: {
            profileId: dbProfile.id,
            eventType
          }
        }).catch(() => {});
      }
    }
  } catch (err) {
    console.warn('Analytics tracking warning:', err);
  }

  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.designation,
      worksFor: {
        '@type': 'Organization',
        name: profile.company || `${profile.name}'s Business`,
      },
      description: profile.bio,
      image: profile.avatarUrl,
      email: profile.email,
      telephone: profile.phone,
      url: `https://oneclickbiz.in/v/${profile.slug}`,
      sameAs: [
        profile.website,
        ...(profile.sectionData?.socials?.items?.map((s) => s.url) || [])
      ].filter(Boolean),
    },
  };

  // DEFINITIVE FIX: Force sectionData.about.content = profile.bio right before rendering.
  // profile.bio is already proven correct (it appears correctly in metadata above).
  // This bypasses any sectionData reconstruction issues in fetchProfileData.
  const displayProfile = profile.bio ? {
    ...profile,
    sectionData: {
      ...(profile.sectionData || {}),
      about: {
        ...((profile.sectionData?.about as any) || {}),
        content: profile.bio
      }
    }
  } : profile;

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#111111] font-sans relative w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <div className="w-full relative z-10">
        <ProfileCardView profile={displayProfile} isMockup={false} initialViewMode="website" showViewToggle={true} />
      </div>
    </main>
  );
}


