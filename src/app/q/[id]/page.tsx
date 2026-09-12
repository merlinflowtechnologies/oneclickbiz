import { redirect } from 'next/navigation';
import { INITIAL_QR_CODES } from '@/lib/data-store';

interface QrRedirectProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QrRedirectPage({ params }: QrRedirectProps) {
  const resolvedParams = await params;
  const qr = INITIAL_QR_CODES.find(q => q.code.toLowerCase() === resolvedParams.id.toLowerCase() || q.id.toLowerCase() === resolvedParams.id.toLowerCase());

  const targetSlug = qr ? qr.targetSlug : 'alex';
  redirect(`/v/${targetSlug}?ref=qr_${resolvedParams.id}`);
}
