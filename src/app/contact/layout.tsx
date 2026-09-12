import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Support & Enterprise Sales | OneClickBiz',
  description: 'Get in touch with the OneClickBiz engineering and support team in Hyderabad, Telangana. 24/7 technical helpdesk, enterprise onboarding, and billing support.',
  keywords: [
    'contact oneclickbiz',
    'oneclickbiz support',
    'digital business card customer service',
    'merlinflow technologies contact'
  ],
  alternates: {
    canonical: 'https://oneclickbiz.in/contact',
  },
  openGraph: {
    title: 'Contact OneClickBiz Support & Sales',
    description: 'Reach out to our customer care and engineering team via WhatsApp or email.',
    url: 'https://oneclickbiz.in/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
