import React, { useState } from 'react';
import { Phone, PhoneCall, X } from 'lucide-react';
import { InfoModalType } from './UcpInfoModal';

interface FloatingSideRibbonsProps {
  onOpenApply: () => void;
  onOpenInfo: (type: InfoModalType) => void;
  onOpenLegacyPage?: () => void;
  onOpenCampusLifePage?: () => void;
  onOpenProgrammesPage?: () => void;
  onOpenScholarshipsPage?: () => void;
  onOpenFeeStructurePage?: () => void;
}

export const FloatingSideRibbons: React.FC<FloatingSideRibbonsProps> = ({
  onOpenApply,
  onOpenInfo,
  onOpenLegacyPage,
  onOpenCampusLifePage,
  onOpenProgrammesPage,
  onOpenScholarshipsPage,
  onOpenFeeStructurePage,
}) => {
  const [showCallTooltip, setShowCallTooltip] = useState(false);
  const [isCallMenuOpen, setIsCallMenuOpen] = useState(false);

  const handleContactClick = () => {
    setIsCallMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Right Edge Vertical Sticky Tabs */}
      <aside 
        aria-label="Quick Navigation Ribbons" 
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end shadow-xl select-none"
      >
        {/* Tab 1: Campus Life (Replaces Our Newsletter as requested) */}
        <button
          id="ribbon-newsletter"
          onClick={() => {
            if (onOpenCampusLifePage) {
              onOpenCampusLifePage();
            } else {
              onOpenInfo('newsletter');
            }
          }}
          className="group relative bg-[#0b2341] hover:bg-[#a30f16] active:bg-[#a30f16] text-white border-l border-t border-b border-slate-700/60 rounded-l-[4px] transition-all duration-200 hover:pr-1 focus:outline-none cursor-pointer"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          title="Campus Life - Life Beyond the Classroom"
        >
          <span className="inline-block py-2 sm:py-2.5 md:py-3 px-1 sm:px-1.2 md:px-1.5 text-[9.5px] sm:text-[11px] md:text-xs font-semibold tracking-tight sm:tracking-normal md:tracking-wider whitespace-nowrap leading-none">
            Campus Life
          </span>
        </button>

        {/* Tab 2: Apply Online (Crimson Red) */}
        <a
          id="ribbon-apply"
          href="https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative bg-[#a30f16] hover:bg-[#860c12] active:bg-[#860c12] text-white border-l border-t border-b border-rose-900/60 rounded-l-[4px] transition-all duration-200 hover:pr-1 shadow-md focus:outline-none hidden sm:block cursor-pointer"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          title="Apply Online for Fall 2026 Admissions"
        >
          <span className="inline-block py-2 sm:py-2.5 md:py-3 px-1 sm:px-1.2 md:px-1.5 text-[9.5px] sm:text-[11px] md:text-xs font-bold tracking-tight sm:tracking-normal md:tracking-wider whitespace-nowrap leading-none">
            Apply Online
          </span>
        </a>

        {/* Tab 3: Programs (Dark Navy) */}
        <button
          id="ribbon-programs"
          onClick={() => {
            if (onOpenProgrammesPage) {
              onOpenProgrammesPage();
            } else {
              onOpenInfo('merit-list');
            }
          }}
          className="group relative bg-[#0b2341] hover:bg-[#07172b] active:bg-[#07172b] text-white border-l border-t border-b border-slate-700/60 rounded-l-[4px] transition-all duration-200 hover:pr-1 focus:outline-none cursor-pointer"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          title="Explore All Academic Programs"
        >
          <span className="inline-block py-2 sm:py-2.5 md:py-3 px-1 sm:px-1.2 md:px-1.5 text-[9.5px] sm:text-[11px] md:text-xs font-semibold tracking-tight sm:tracking-normal md:tracking-wider whitespace-nowrap leading-none">
            Programs
          </span>
        </button>

        {/* Tab 4: Scholarships & Concessions (Crimson Red) */}
        <button
          id="ribbon-scholarships"
          onClick={() => {
            if (onOpenScholarshipsPage) {
              onOpenScholarshipsPage();
            } else if (onOpenLegacyPage) {
              onOpenLegacyPage();
            }
          }}
          className="group relative bg-[#a30f16] hover:bg-[#860c12] active:bg-[#860c12] text-white border-l border-t border-b border-rose-900/60 rounded-l-[4px] transition-all duration-200 hover:pr-1 shadow-md focus:outline-none cursor-pointer"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          title="Scholarships & Concessions — Up to 50% Tuition Fee Concessions"
        >
          <span className="inline-block py-2 sm:py-2.5 md:py-3 px-1 sm:px-1.2 md:px-1.5 text-[9.5px] sm:text-[11px] md:text-xs font-bold tracking-tight sm:tracking-normal md:tracking-wider whitespace-nowrap leading-none">
            Scholarships
          </span>
        </button>

        {/* Tab 5: Fee Structure (Dark Navy) */}
        <button
          id="ribbon-fee-structure"
          onClick={() => {
            if (onOpenFeeStructurePage) {
              onOpenFeeStructurePage();
            }
          }}
          className="group relative bg-[#0b2341] hover:bg-[#07172b] active:bg-[#07172b] text-white border-l border-t border-b border-slate-700/60 rounded-l-[4px] transition-all duration-200 hover:pr-1 focus:outline-none cursor-pointer"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          title="Official Fee Structure & Tuition Schedules"
        >
          <span className="inline-block py-2 sm:py-2.5 md:py-3 px-1 sm:px-1.2 md:px-1.5 text-[9.5px] sm:text-[11px] md:text-xs font-semibold tracking-tight sm:tracking-normal md:tracking-wider whitespace-nowrap leading-none">
            Fee Structure
          </span>
        </button>
      </aside>

      {/* Floating Official Campus Contact Call Button on Bottom-Right */}
      <div className="fixed bottom-[108px] sm:bottom-[122px] lg:bottom-[128px] right-5 sm:right-6 z-40 flex items-center">
        {showCallTooltip && !isCallMenuOpen && (
          <div className="hidden sm:block mr-2.5 bg-white text-slate-800 text-xs px-3 py-1.5 rounded-xl shadow-xl border border-slate-200 font-semibold animate-in fade-in slide-in-from-right-2">
            Call Campus: 062-2202030 / 062-2202050
          </div>
        )}

        {/* Quick Call Popover Menu */}
        {isCallMenuOpen && (
          <div className="absolute bottom-16 right-0 w-64 bg-white rounded-xl shadow-[0_16px_40px_rgba(10,25,49,0.22)] border border-slate-200 p-3.5 animate-in fade-in slide-in-from-bottom-2 z-50 text-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
              <div className="flex items-center gap-1.5 font-bold text-xs text-[#0A1931]">
                <PhoneCall size={14} className="text-[#C8102E]" />
                <span>Call UCP Bahawalpur</span>
              </div>
              <button 
                type="button"
                onClick={() => setIsCallMenuOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer transition-colors"
                aria-label="Close call options"
              >
                <X size={14} />
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mb-2.5 font-sans leading-tight">
              Select an official campus phone number to call directly:
            </p>
            <div className="space-y-2">
              <a
                href="tel:0622202030"
                className="flex items-center justify-between px-3 py-2 bg-[#0A1931] hover:bg-[#C8102E] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                title="Call 062-2202030"
              >
                <span className="flex items-center gap-2">
                  <Phone size={13} className="text-amber-400" />
                  <span>062-2202030</span>
                </span>
                <span className="text-[10px] text-slate-300 font-normal">Line 1 ↗</span>
              </a>
              <a
                href="tel:0622202050"
                className="flex items-center justify-between px-3 py-2 bg-slate-100 hover:bg-[#0A1931] text-slate-800 hover:text-white rounded-lg text-xs font-semibold transition-colors border border-slate-200"
                title="Call 062-2202050"
              >
                <span className="flex items-center gap-2">
                  <Phone size={13} className="text-[#C8102E]" />
                  <span>062-2202050</span>
                </span>
                <span className="text-[10px] text-slate-500 hover:text-slate-300 font-normal">Line 2 ↗</span>
              </a>
            </div>
          </div>
        )}

        <button
          id="ucp-contact-floating-btn"
          type="button"
          onClick={handleContactClick}
          onMouseEnter={() => setShowCallTooltip(true)}
          onMouseLeave={() => setShowCallTooltip(false)}
          className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#0A1931] hover:bg-[#C8102E] text-white flex items-center justify-center shadow-xl hover:scale-108 active:scale-95 transition-all duration-200 group focus:outline-none relative border-2 border-slate-600/70 cursor-pointer"
          aria-label="Official Campus Contacts: 062-2202030 / 062-2202050"
          title="Official Campus Contacts: 062-2202030 / 062-2202050"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-[#C8102E] opacity-30 group-hover:animate-ping" />
          
          {/* Phone Call Icon */}
          <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10 transition-transform group-hover:rotate-12" />
        </button>
      </div>
    </>
  );
};
