import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const viewport: Viewport = {
  themeColor: '#020617',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://oneclickbiz.in'),
  title: {
    default: 'OneClickBiz | Digital Business Cards, WhatsApp Store & Blog Studio',
    template: '%s | OneClickBiz'
  },
  description: 'Create high-converting digital business cards with 1-click VCF contact saving, interactive WhatsApp mini-store, appointment scheduling, dynamic QR codes, brochure maker, and blog publishing studio.',
  keywords: [
    'digital business card',
    'smart business card',
    'vcard',
    'vcf contact saving',
    'whatsapp store',
    'whatsapp mini store',
    'appointment booking system',
    'digital visiting card',
    'brochure maker',
    'blog studio',
    'lead generation tool',
    'dynamic qr code generator',
    'oneclickbiz',
    'merlinflow technologies'
  ],
  authors: [{ name: 'Merlinflow Technologies Pvt Ltd', url: 'https://oneclickbiz.in' }],
  creator: 'Merlinflow Technologies Pvt Ltd',
  publisher: 'OneClickBiz',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://oneclickbiz.in',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/logo.png', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon.png' },
      { url: '/logo.png' }
    ],
    shortcut: ['/favicon.ico']
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'OneClickBiz - Smart Digital Identity & Commerce SaaS',
    description: 'Replace paper business cards with interactive digital vCards, WhatsApp mini-stores, booking calendars, and dynamic QR systems.',
    url: 'https://oneclickbiz.in',
    siteName: 'OneClickBiz',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 408,
        alt: 'OneClickBiz - Business Made Simpler',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneClickBiz - Smart Digital Identity & WhatsApp Mini-Store',
    description: 'Replace paper business cards with interactive digital vCards, WhatsApp mini-stores, and dynamic QR systems in under 2 minutes.',
    images: ['/logo.png'],
    creator: '@oneclickbiz',
    site: '@oneclickbiz',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Business & SaaS',
};

import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OneClickBiz',
    legalName: 'Merlinflow Technologies Pvt Ltd',
    url: 'https://oneclickbiz.in',
    logo: 'https://oneclickbiz.in/logo.png',
    description: 'Next-Generation Digital Identity, WhatsApp Mini-Stores, Booking Calendars & Cloud SaaS Platform.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nagole, Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-6304989071',
      contactType: 'customer service',
      email: 'support@oneclickbiz.in',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Telugu'],
    },
    sameAs: [
      'https://oneclickbiz.in',
      'https://twitter.com/oneclickbiz',
      'https://linkedin.com/company/oneclickbiz'
    ],
  };

  const jsonLdSoftwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OneClickBiz Smart Identity Platform',
    operatingSystem: 'All (iOS, Android, Web, Desktop)',
    applicationCategory: 'BusinessApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1420',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: '999',
      highPrice: '2199',
      offerCount: '3',
      offers: [
        {
          '@type': 'Offer',
          name: 'Basic Plan',
          price: '999',
          priceCurrency: 'INR',
          description: '1 Dynamic Digital vCard with 1-click contact save and lead capture.',
        },
        {
          '@type': 'Offer',
          name: 'Pro Plan',
          price: '1599',
          priceCurrency: 'INR',
          description: 'WhatsApp Mini-Store, Booking Engine, Brochure Studio, Custom Domain.',
        },
        {
          '@type': 'Offer',
          name: 'Advanced Plan',
          price: '2199',
          priceCurrency: 'INR',
          description: 'Full Studio Publishing, Blog Studio, 5 Custom Domains, VIP 24/7 Support.',
        },
      ],
    },
  };

  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased dark`}>
      <head>
        <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="lazyOnload" id="cashfree-sdk" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
