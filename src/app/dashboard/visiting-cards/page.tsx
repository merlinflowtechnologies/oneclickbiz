import VisitingCardStudio from '@/components/cards/VisitingCardStudio';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Visiting Card Studio | OneClickBiz',
  description: 'Design, customize, preview 3D front & back, and export print-ready visiting cards with luxury templates and QR codes.',
};

export default function VisitingCardsPage() {
  return <VisitingCardStudio />;
}
