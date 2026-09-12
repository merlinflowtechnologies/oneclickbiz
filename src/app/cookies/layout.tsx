import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Essential Authentication Cookies | OneClickBiz',
  description: 'Understand how OneClickBiz uses essential session and security cookies to provide safe authentication and account persistence.',
  alternates: {
    canonical: 'https://oneclickbiz.in/cookies',
  },
  openGraph: {
    title: 'Cookie Policy | OneClickBiz',
    description: 'Cookie policy and privacy compliance.',
    url: 'https://oneclickbiz.in/cookies',
  },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
