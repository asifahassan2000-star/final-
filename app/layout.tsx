import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import React from 'react';
import { ThemeProvider } from '../src/context/ThemeContext';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'UCP Bahawalpur Campus Life | University of Central Punjab',
  description:
    'Explore Campus Life at the University of Central Punjab (UCP) Bahawalpur Campus. Discover 22+ vibrant student events, environmental stewardship initiatives, student societies, state-of-the-art facilities, and undergraduate academic excellence.',
  keywords: [
    'UCP',
    'UCP Bahawalpur',
    'UCP Campus Life',
    'University of Central Punjab Bahawalpur',
    'UCP Admissions',
    'UCP Programs',
    'Environmental Stewardship',
    'UCP Fee Structure',
    'UCP Scholarships',
  ],
  authors: [{ name: 'University of Central Punjab Bahawalpur Campus' }],
  metadataBase: new URL('https://asifahassan2000-star.github.io/final'),
  alternates: {
    canonical: 'https://asifahassan2000-star.github.io/final',
  },
  openGraph: {
    title: 'UCP Bahawalpur Campus Life | University of Central Punjab',
    description:
      'Explore Campus Life at the University of Central Punjab (UCP) Bahawalpur Campus. Discover 22+ vibrant student events, environmental stewardship initiatives, student societies, state-of-the-art facilities, and undergraduate academic excellence.',
    url: 'https://asifahassan2000-star.github.io/final',
    siteName: 'UCP Bahawalpur Campus Life',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/assets/campus/hero_campus_night_flagship.webp',
        width: 1200,
        height: 630,
        alt: 'University of Central Punjab UCP Bahawalpur Campus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UCP Bahawalpur Campus Life | University of Central Punjab',
    description:
      'Explore Campus Life at the University of Central Punjab (UCP) Bahawalpur Campus. Discover 22+ vibrant student events, environmental stewardship initiatives, student societies, state-of-the-art facilities, and undergraduate academic excellence.',
    images: ['/assets/campus/hero_campus_night_flagship.webp'],
  },
  icons: {
    icon: '/assets/ucp-official-logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A1931',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let nonce: string | undefined;
  try {
    const headersList = await headers();
    nonce = headersList.get('x-nonce') ?? undefined;
  } catch {
    // Fallback for static environments
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900 antialiased selection:bg-[#0A1931] selection:text-white min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
