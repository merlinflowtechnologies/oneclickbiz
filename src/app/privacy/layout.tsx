import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Data Protection & Zero-Ads Guarantee | OneClickBiz',
  description: 'Learn how OneClickBiz and Merlinflow Technologies protect your business data with 256-bit SSL encryption, zero third-party data broker selling, and strict GDPR/DPDP compliance.',
  alternates: {
    canonical: 'https://oneclickbiz.in/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | OneClickBiz',
    description: 'Enterprise data privacy and protection policy.',
    url: 'https://oneclickbiz.in/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
