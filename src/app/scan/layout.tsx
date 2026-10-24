import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instant QR Scanner & Smart Card Reader | OneClickBiz',
  description: 'Scan digital business cards and dynamic QR codes instantly using your device camera without installing any third-party app.',
  keywords: [
    'smart card qr scanner',
    'qr code reader',
    'scan digital business card',
    'instant card scanner'
  ],
  alternates: {
    canonical: 'https://oneclickbiz.in/scan',
  },
  openGraph: {
    title: 'Instant QR Scanner | OneClickBiz',
    description: 'Scan and open digital smart cards with your mobile camera.',
    url: 'https://oneclickbiz.in/scan',
  },
};

export default function ScanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
