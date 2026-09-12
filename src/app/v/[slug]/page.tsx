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

  return {
    title: `${profile.name} - ${profile.designation} | OneClickBiz`,
    description: profile.bio || `Connect with ${profile.name} on OneClickBiz`,
    openGraph: {
      title: `${profile.name} - ${profile.designation}`,
      description: profile.bio,
      images: [
        {
          url: profile.avatarUrl,
          width: 600,
          height: 600,
          alt: profile.name,
        },
      ],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: profile.name,
      description: profile.bio,
      images: [profile.avatarUrl],
    },
  };
}

export default async function PublicProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params;
  const profile = await fetchProfileData(resolvedParams.slug);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-0 sm:py-8 font-sans">
      <div className="w-full max-w-md">
        <ProfileCardView profile={profile} isMockup={false} />
      </div>
    </main>
  );
}

