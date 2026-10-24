import React, { useEffect } from 'react';
import { ArrowLeft, Building2, BookOpen, Cpu, Microscope } from 'lucide-react';
import { FacilitiesSection } from './FacilitiesSection';

interface CampusFacilitiesPageProps {
  onBackToHome: () => void;
  onOpenApply?: () => void;
  onOpenCampusLifePage?: () => void;
  onOpenFacultyPage?: () => void;
}

export const CampusFacilitiesPage: React.FC<CampusFacilitiesPageProps> = ({
  onBackToHome,
  onOpenApply,
  onOpenCampusLifePage,
  onOpenFacultyPage,
}) => {
  // Ensure view starts at the absolute top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#080f1d] text-[#1E293B] dark:text-[#f8fafc] font-sans transition-colors duration-200">
      
      {/* 1. Official Top Institutional Breadcrumb Strip */}
      <div className="bg-white dark:bg-[#0a1526] border-b border-slate-200 dark:border-white/10 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono">
            <button 
              onClick={onBackToHome}
              className="hover:text-[#0A1931] dark:hover:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portal Home</span>
            </button>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-600 dark:text-slate-300">About UCP</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-[#0A1931] dark:text-amber-400 font-semibold">Campus Facilities</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <span className="hidden sm:inline">Purpose-Built Infrastructure</span>
            <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">|</span>
            <span className="font-mono text-[11px] text-[#A51C30] dark:text-amber-400 font-semibold bg-[#A51C30]/5 dark:bg-amber-400/10 px-2 py-0.5 border border-[#A51C30]/20 dark:border-amber-400/30">
              CAMPUS &amp; LABS
            </span>
          </div>
        </div>
      </div>

      {/* 2. Entire 'Learning Environment, Library and Laboratories' Section (100% as-is) */}
      <main>
        <FacilitiesSection 
          onOpenApply={onOpenApply}
          onOpenCampusLifePage={onOpenCampusLifePage}
          onOpenFacultyPage={onOpenFacultyPage}
          isStandalone={true}
        />
      </main>

    </div>
  );
};
