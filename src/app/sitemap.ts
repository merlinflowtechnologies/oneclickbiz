import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { INITIAL_PROFILES } from '@/lib/data-store';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://oneclickbiz.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // 1. Core Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/vcard-templates`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/scan`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/refund`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/shipping`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 2. Dynamic Published vCard Profiles from Database
  let dynamicProfiles: MetadataRoute.Sitemap = [];
  if (process.env.DATABASE_URL) {
    try {
      const dbProfiles = await prisma.profile.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
        take: 1000,
      });

      dynamicProfiles = dbProfiles.map((p) => ({
        url: `${BASE_URL}/v/${p.slug}`,
        lastModified: p.updatedAt || currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    } catch (error) {
      // Graceful fallback to initial profiles if DB is offline during build
    }
  }

  // 3. Include Fallback Demo Profiles if DB is unseeded
  const existingSlugs = new Set(dynamicProfiles.map((p) => p.url));
  const fallbackProfiles: MetadataRoute.Sitemap = INITIAL_PROFILES
    .filter((p) => !existingSlugs.has(`${BASE_URL}/v/${p.slug}`))
    .map((p) => ({
      url: `${BASE_URL}/v/${p.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  // 4. Blog listing page
  const blogStaticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // 5. Dynamic Blog Post Pages
  let dynamicBlogPosts: MetadataRoute.Sitemap = [];
  if (process.env.DATABASE_URL) {
    try {
      const posts = await prisma.blogPost.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
        orderBy: { publishedAt: 'desc' },
        take: 500,
      });

      dynamicBlogPosts = posts.map((p) => ({
        url: `${BASE_URL}/blog/${p.slug}`,
        lastModified: p.updatedAt || currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    } catch (error) {
      // Graceful fallback if DB is offline during build
    }
  }

  return [...staticPages, ...blogStaticPages, ...dynamicProfiles, ...fallbackProfiles, ...dynamicBlogPosts];
}
