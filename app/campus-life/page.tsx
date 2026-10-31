'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { LeadershipImpactSection } from '../../src/components/LeadershipImpactSection';

// Dynamically import CampusLifePage component with client-side animation support
const CampusLifePage = dynamic(() => import('../../src/components/CampusLifePage').then(mod => mod.CampusLifePage), {
  ssr: false,
});

export default function CampusLifeRoute() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-[#080f1d] text-slate-900 dark:text-white transition-colors duration-200">
      {/* 22 Campus Events Showcase */}
      <CampusLifePage
        onBackToHome={() => router.push('/')}
        onOpenApply={() => router.push('/#apply')}
        onOpenProgrammesPage={() => router.push('/#academics')}
        onOpenFee={() => router.push('/#fee')}
      />

      {/* Environmental Stewardship & Faculty Leadership Section */}
      <div className="border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1528] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadershipImpactSection />
        </div>
      </div>
    </div>
  );
}
