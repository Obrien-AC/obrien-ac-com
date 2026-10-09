import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = 'https://obrien-ac.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'O’Brien Air Conditioning | Fort Lauderdale', template: '%s | O’Brien Air Conditioning' },
  description: 'Commercial and residential air conditioning service, maintenance, diagnostics, and replacement planning in South Florida.',
  alternates: { canonical: '/' },
  openGraph: { title: 'O’Brien Air Conditioning', description: 'Commercial and residential HVAC service built around clear diagnostics and careful execution.', url: siteUrl, siteName: 'O’Brien Air Conditioning', type: 'website', images: [{ url: '/assets/obrien-rtu-hero.png', width: 1774, height: 887, alt: 'O’Brien Air Conditioning commercial rooftop HVAC equipment' }] },
  twitter: { card: 'summary_large_image', title: 'O’Brien Air Conditioning', description: 'Commercial and residential HVAC service in South Florida.', images: ['/assets/obrien-rtu-hero.png'] },
  icons: { icon: '/icon.png', apple: '/apple-icon.png' },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#030604' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
