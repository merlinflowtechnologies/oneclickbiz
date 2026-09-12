import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Platform Terms of Service | OneClickBiz',
  description: 'Review the terms of service governing account usage, annual subscriptions, digital profile publishing, and commercial compliance on OneClickBiz.',
  alternates: {
    canonical: 'https://oneclickbiz.in/terms',
  },
  openGraph: {
    title: 'Terms & Conditions | OneClickBiz',
    description: 'Official Terms of Service for OneClickBiz platform.',
    url: 'https://oneclickbiz.in/terms',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
