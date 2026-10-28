import type { Metadata, Viewport } from 'next';
import React from 'react';
import '../src/index.css';
import { ThemeProvider } from 'next-themes';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'UCP Bahawalpur Campus Life | University of Central Punjab',
  description: 'Explore Campus Life at the University of Central Punjab (UCP) Bahawalpur Campus.',
  metadataBase: new URL('https://ucp-bahawalpur-campus.vercel.app'),
  alternates: { canonical: 'https://ucp-bahawalpur-campus.vercel.app' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A1931',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-slate-900 antialiased selection:bg-[#0A1931] selection:text-white min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
