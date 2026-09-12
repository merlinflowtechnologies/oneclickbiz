import BrochureStudio from '@/components/brochure/BrochureStudio';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketing Brochure & Catalog Studio | OneClickBiz',
  description: 'Design luxury tri-fold, bi-fold, and promo flyer brochures with print-ready 300 DPI export, custom logos, service pricing, and dynamic QR codes.',
};

export default function BrochuresPage() {
  return <BrochureStudio />;
}
