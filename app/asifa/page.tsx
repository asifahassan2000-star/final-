'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const AsifaSecretPage = dynamic(
  () => import('../../src/components/AsifaSecretPage').then((mod) => mod.AsifaSecretPage),
  { ssr: false }
);

export default function AsifaSecretRoute() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      <AsifaSecretPage onBackToHome={() => router.push('/')} />
    </div>
  );
}
