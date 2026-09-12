import { redirect } from 'next/navigation';
import { INITIAL_NFC_CARDS } from '@/lib/data-store';

interface NfcRedirectProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NfcRedirectPage({ params }: NfcRedirectProps) {
  const resolvedParams = await params;
  const card = INITIAL_NFC_CARDS.find(c => c.cardCode.toLowerCase() === resolvedParams.id.toLowerCase() || c.id.toLowerCase() === resolvedParams.id.toLowerCase());

  const targetSlug = card ? card.profileSlug : 'alex';
  redirect(`/v/${targetSlug}?ref=nfc_${resolvedParams.id}`);
}
