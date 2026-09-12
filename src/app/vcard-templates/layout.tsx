import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Business Card Templates Gallery | 100+ Designer vCards',
  description: 'Explore 100+ professional digital business card templates designed for doctors, lawyers, agencies, real estate agents, tech founders, and freelancers.',
  keywords: [
    'vcard templates',
    'digital business card templates',
    'smart card designs',
    'modern visiting card templates',
    'oneclickbiz templates'
  ],
  alternates: {
    canonical: 'https://oneclickbiz.in/vcard-templates',
  },
  openGraph: {
    title: 'Digital Business Card Templates Gallery | OneClickBiz',
    description: 'Explore 100+ industry-specific digital vCard templates with instant 1-click contact save.',
    url: 'https://oneclickbiz.in/vcard-templates',
  },
};

export default function VCardTemplatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
