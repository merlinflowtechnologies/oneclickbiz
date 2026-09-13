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
  try {
    const dbProfile = await prisma.profile.findUnique({
      where: { slug: cleanSlug },
      include: {
        sections: { orderBy: { order: 'asc' } },
        socialLinks: { orderBy: { order: 'asc' } },
        products: { where: { isAvailable: true }, orderBy: { order: 'asc' } },
        services: { where: { isAvailable: true } },
      }
    });

    if (dbProfile) {
      const fallback = getProfileBySlug(cleanSlug);
      return {
        ...fallback,
        id: dbProfile.id,
        slug: dbProfile.slug,
        name: dbProfile.name || fallback.name,
        designation: dbProfile.designation || fallback.designation,
        company: dbProfile.company || fallback.company,
        bio: dbProfile.bio || fallback.bio,
        email: dbProfile.email || fallback.email,
        phone: dbProfile.phone || fallback.phone,
        whatsapp: dbProfile.whatsapp || fallback.whatsapp,
        website: dbProfile.website || fallback.website,
        address: dbProfile.address || fallback.address,
        theme: (dbProfile.theme as any) || fallback.theme,
        avatarUrl: dbProfile.avatarUrl || fallback.avatarUrl,
        coverUrl: dbProfile.coverUrl || fallback.coverUrl,
        isPublished: dbProfile.isPublished
      };
    }
  } catch (err) {
    console.error('Database profile lookup error:', err);
  }
  return getProfileBySlug(cleanSlug);
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

  // Real Analytics Tracking: increment viewCount and log event in DB
  try {
    if (profile.id) {
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

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-0 sm:py-8 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <div className="w-full max-w-md">
        <ProfileCardView profile={profile} isMockup={false} />
      </div>
    </main>
  );
}

