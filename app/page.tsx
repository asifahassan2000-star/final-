'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the main application with SSR disabled for browser-specific APIs (GSAP, Lenis, Swiper)
const App = dynamic(() => import('../src/App'), { ssr: false });

export default function HomePage() {
  return (
    <main className="w-full min-h-screen">
      <App />
    </main>
  );
}
