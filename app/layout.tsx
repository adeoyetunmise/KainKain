import Footer from "@/components/Footer";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Big_Shoulders } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const bigShouldersDisplay = Big_Shoulders({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'KainKain - Handmade Art & Print Collections',
    template: '%s | KainKain'
  },
  description: 'Discover unique handmade art pieces and premium print collections. KainKain offers carefully curated artworks and handcrafted products for art enthusiasts and collectors.',
  keywords: ['handmade art', 'print art', 'art collections', 'handcrafted products', 'unique artwork', 'art gallery', 'KainKain'],
  authors: [{ name: 'KainKain' }],
  creator: 'KainKain',
  publisher: 'KainKain',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kainkainbytosinjosh.com',
    siteName: 'KainKain',
    title: 'KainKain - Handmade Art & Print Collections',
    description: 'Discover unique handmade art pieces and premium print collections. Shop carefully curated artworks and handcrafted products.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KainKain Art Collections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KainKain - Handmade Art & Print Collections',
    description: 'Discover unique handmade art pieces and premium print collections.',
    images: ['/images/og-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ece8e5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-[#ece8e5] ${bigShouldersDisplay.className}`}
        suppressContentEditableWarning={true}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}