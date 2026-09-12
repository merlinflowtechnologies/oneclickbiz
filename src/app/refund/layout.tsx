import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Strict SaaS Policy | OneClickBiz',
  description: 'Official refund and cancellation policy for digital SaaS annual subscriptions on the OneClickBiz platform.',
  alternates: {
    canonical: 'https://oneclickbiz.in/refund',
  },
  openGraph: {
    title: 'Refund & Cancellation Policy | OneClickBiz',
    description: 'Strict SaaS subscription refund terms.',
    url: 'https://oneclickbiz.in/refund',
  },
};

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
