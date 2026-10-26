import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Business Mini-Website Gallery | 93+ Designer Templates',
  description: 'Explore 93+ professional commercial business mini-website templates designed for doctors, lawyers, agencies, real estate agents, tech founders, and freelancers.',
  keywords: [
    'business templates',
    'commercial website templates',
    'business mini-website designs',
    'modern visiting card templates',
    'oneclickbiz templates'
  ],
  alternates: {
    canonical: 'https://oneclickbiz.in/vcard-templates',
  },
  openGraph: {
    title: 'Business Templates Gallery | OneClickBiz',
    description: 'Explore 93+ industry-specific business templates with instant 1-click contact save.',
    url: 'https://oneclickbiz.in/vcard-templates',
  },
};

export default function VCardTemplatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
