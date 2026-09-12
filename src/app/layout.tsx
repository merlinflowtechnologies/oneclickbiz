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
  title: 'OneClickBiz | Digital Business Cards, WhatsApp Store & Blog Studio',
  description: 'Create your digital business card with 1-click VCF contact saving, WhatsApp mini-store, appointment booking, dynamic QR codes, and blog publishing studio.',
  keywords: ['digital business card', 'vcard', 'smart business card', 'whatsapp store', 'booking system', 'lead generation', 'blog studio', 'brochure maker'],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'OneClickBiz - Smart Identity & Commerce SaaS',
    description: 'Replace paper business cards with interactive digital vCards, WhatsApp mini-stores, and dynamic QR systems.',
    siteName: 'OneClickBiz',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 408,
        alt: 'OneClickBiz - Business Made Simpler',
      },
    ],
    type: 'website',
  },
};

import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased dark`}>
      <head>
        <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="lazyOnload" id="cashfree-sdk" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
