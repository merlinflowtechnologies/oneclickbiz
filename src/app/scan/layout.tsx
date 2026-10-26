import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instant QR Scanner & Website Reader | OneClickBiz',
  description: 'Scan business QR codes and dynamic links instantly using your device camera without installing any third-party app.',
  keywords: [
    'business qr scanner',
    'qr code reader',
    'scan business website',
    'instant qr scanner'
  ],
  alternates: {
    canonical: 'https://oneclickbiz.in/scan',
  },
  openGraph: {
    title: 'Instant QR Scanner | OneClickBiz',
    description: 'Scan and open commercial business mini-websites with your mobile camera.',
    url: 'https://oneclickbiz.in/scan',
  },
};

export default function ScanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
