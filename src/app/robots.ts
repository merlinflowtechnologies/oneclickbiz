import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://oneclickbiz.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/v/*',
          '/vcard-templates',
          '/scan',
          '/contact',
          '/careers',
          '/privacy',
          '/terms',
          '/refund',
          '/shipping',
          '/cookies',
          '/logo.png',
          '/favicon.png',
        ],
        disallow: [
          '/admin/*',
          '/dashboard/*',
          '/api/*',
          '/login',
          '/signup',
          '/nfc/*',
          '/q/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/*',
          '/dashboard/*',
          '/api/*',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
