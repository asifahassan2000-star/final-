import React from 'react';
import { ArrowRight, Building2, BookOpen, Cpu, Microscope, ShieldCheck } from 'lucide-react';

interface CampusFacilitiesPreviewProps {
  onOpenFacilitiesPage: () => void;
  onOpenFacultyPage?: () => void;
  onScrollTo?: (sectionId: string) => void;
}

export const CampusFacilitiesPreview: React.FC<CampusFacilitiesPreviewProps> = ({
  onOpenFacilitiesPage,
  onOpenFacultyPage,
  onScrollTo,
}) => {
  const handleFacultyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onScrollTo) {
      onScrollTo('faculty-section');
    } else {
      const elem = document.getElementById('faculty-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else if (onOpenFacultyPage) {
        onOpenFacultyPage();
      }
    }
  };

  return (
    <section 
      id="facilities-section"
      className="py-[60px] px-4 sm:px-10 lg:px-[80px] bg-white dark:bg-[#080f1d] border-b border-slate-200/80 dark:border-white/10 transition-colors duration-200"
      aria-labelledby="facilities-preview-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (60% text): Heading, description, tags, faculty link, and button */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Institutional Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0F2C61] dark:bg-amber-400" />
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#0F2C61] dark:text-amber-400">
                Campus Infrastructure
              </span>
            </div>

            {/* Heading */}
            <h2
              id="facilities-preview-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-tight"
            >
              Campus Facilities
            </h2>

            {/* 2-line Description */}
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl">
              Discover our purpose-built campus with modern architecture, central library, and state-of-the-art labs.
            </p>

            {/* Quick Pillars Checklist */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans">
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#f8fafc] dark:bg-[#0d1e38] border border-slate-200/80 dark:border-white/10">
                <Building2 size={16} className="text-[#0F2C61] dark:text-amber-400 shrink-0" />
                <span className="font-medium truncate">Campus Architecture</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#f8fafc] dark:bg-[#0d1e38] border border-slate-200/80 dark:border-white/10">
                <BookOpen size={16} className="text-[#0F2C61] dark:text-amber-400 shrink-0" />
                <span className="font-medium truncate">Central Library</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#f8fafc] dark:bg-[#0d1e38] border border-slate-200/80 dark:border-white/10">
                <Cpu size={16} className="text-[#0F2C61] dark:text-amber-400 shrink-0" />
                <span className="font-medium truncate">Computer Labs</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#f8fafc] dark:bg-[#0d1e38] border border-slate-200/80 dark:border-white/10">
                <Microscope size={16} className="text-[#0F2C61] dark:text-amber-400 shrink-0" />
                <span className="font-medium truncate">Science Labs</span>
              </div>
            </div>

            {/* Connected Experienced Faculty Link */}
            <div className="mt-5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans">
              <span>Modern laboratories and research facilities guided by experienced faculty.</span>
              <button
                id="facilities-to-faculty-btn"
                type="button"
                onClick={handleFacultyClick}
                className="text-[#0F2C61] dark:text-sky-400 hover:text-[#C8102E] dark:hover:text-amber-300 font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors group underline-offset-2 hover:underline"
                aria-label="Connect to experienced faculty portion"
              >
                <span>Meet Experienced Faculty</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Neat Descent Blue Button with Arrow */}
            <div className="mt-6 flex items-center">
              <button
                id="home-explore-campus-facilities-btn"
                type="button"
                onClick={onOpenFacilitiesPage}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0F2C61] hover:bg-[#0A1931] dark:bg-[#0F2C61] dark:hover:bg-[#153a7a] text-white text-sm sm:text-base font-semibold tracking-wide rounded-none shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group font-sans border-0"
                aria-label="Explore Campus Facilities"
              >
                <span>Explore Campus Facilities</span>
                <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1.5 text-white" />
              </button>
            </div>
          </div>

          {/* Right Column (40% image): Campus Image */}
          <div className="lg:col-span-5 flex items-center justify-center w-full p-0 m-0">
            <div className="relative w-full h-[320px] sm:h-[350px] lg:h-[380px] rounded-2xl overflow-hidden border-0 bg-transparent p-0 m-0 shadow-none">
              <img
                src="https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.46.10%20AM.jpeg?updatedAt=1792916356622"
                alt="University of Central Punjab Bahawalpur Campus Facilities"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center block border-0 p-0 m-0"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
