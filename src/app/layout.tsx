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
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://oneclickbiz.in'),
  title: {
    default: 'OneClickBiz | Commercial Business Mini-Websites, WhatsApp Store & Blog Studio',
    template: '%s | OneClickBiz'
  },
  description: 'Create high-converting commercial business mini-websites with 1-click contact saving, interactive WhatsApp mini-store, appointment scheduling, dynamic QR codes, brochure maker, and blog publishing studio.',
  keywords: [
    'commercial mini-website',
    'business mini-website',
    'commercial website builder',
    'contact saving',
    'whatsapp store',
    'whatsapp mini store',
    'appointment booking system',
    'visiting card maker',
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
      { url: '/favicon-32x32.png?v=4', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=4', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png?v=4', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png?v=4', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico?v=4', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-icon-180x180.png?v=4', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon.png?v=4' }
    ],
    shortcut: ['/favicon-32x32.png?v=4']
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'OneClickBiz - Smart Digital Identity & Commerce SaaS',
    description: 'Grow your business with commercial business mini-websites, WhatsApp mini-stores, booking calendars, and dynamic QR systems.',
    url: 'https://oneclickbiz.in',
    siteName: 'OneClickBiz',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-cover.png',
        width: 1024,
        height: 1024,
        alt: 'OneClickBiz - Commercial Business Mini-Websites & WhatsApp Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneClickBiz - Commercial Business Mini-Websites & WhatsApp Store',
    description: 'Grow your business with commercial business mini-websites, WhatsApp stores, and dynamic QR systems in under 2 minutes.',
    images: ['/og-cover.png'],
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
    description: 'Smart Digital Business Profiles, Dynamic QR Solutions, WhatsApp Mini-Store & Blog Publishing Studio.',
    founder: {
      '@type': 'Person',
      name: 'Merlinflow Technologies Team',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-6304989071',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Telugu'],
    },
    sameAs: [
      'https://twitter.com/oneclickbiz',
      'https://linkedin.com/company/oneclickbiz',
      'https://instagram.com/oneclickbiz.in',
    ],
  };

  const jsonLdSoftwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OneClickBiz Digital Business Card & WhatsApp Commerce Suite',
    operatingSystem: 'All (Web, iOS, Android)',
    applicationCategory: 'BusinessApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '520',
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
          description: '1 Dynamic Digital Business Card with 1-click contact save and lead capture.',
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
    <html lang="en" className={`${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=4" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=4" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png?v=4" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png?v=4" />
        <link rel="shortcut icon" href="/favicon-32x32.png?v=4" />
        <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="lazyOnload" id="cashfree-sdk" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
        />
        <Script
          id="chunk-error-handler"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                var msg = (e && (e.message || (e.error && e.error.message))) || '';
                if (
                  msg.indexOf('Loading chunk') !== -1 ||
                  msg.indexOf('ChunkLoadError') !== -1 ||
                  msg.indexOf('Failed to fetch dynamically imported module') !== -1
                ) {
                  if (!window.sessionStorage.getItem('chunk_reload_lock')) {
                    window.sessionStorage.setItem('chunk_reload_lock', '1');
                    window.location.reload();
                  }
                }
              });
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
