import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Instant Delivery Policy | OneClickBiz',
  description: 'Instant cloud delivery and provisioning timelines for OneClickBiz digital business identity services.',
  alternates: {
    canonical: 'https://oneclickbiz.in/shipping',
  },
  openGraph: {
    title: 'Shipping & Delivery Policy | OneClickBiz',
    description: 'Instant cloud SaaS provisioning policy.',
    url: 'https://oneclickbiz.in/shipping',
  },
};

export default function ShippingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
