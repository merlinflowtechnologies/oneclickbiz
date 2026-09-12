import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers & Open Positions | OneClickBiz by Merlinflow Technologies',
  description: 'Join the engineering and product team building India\'s next-generation digital smart identity and conversational commerce SaaS platform.',
  keywords: [
    'oneclickbiz careers',
    'merlinflow technologies jobs',
    'software engineering jobs hyderabad',
    'full stack developer careers'
  ],
  alternates: {
    canonical: 'https://oneclickbiz.in/careers',
  },
  openGraph: {
    title: 'Careers at OneClickBiz',
    description: 'Explore open engineering, design, and growth positions at Merlinflow Technologies.',
    url: 'https://oneclickbiz.in/careers',
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
