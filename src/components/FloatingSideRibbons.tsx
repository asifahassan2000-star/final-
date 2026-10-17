import React, { useState } from 'react';
import { MessageCircle, Mail, FileText, Send, Globe, Sparkles } from 'lucide-react';
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
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);

  const handleWhatsAppClick = () => {
    // Open WhatsApp helpline
    const whatsappUrl = `https://wa.me/923000800827?text=${encodeURIComponent(
      'Hello University of Central Punjab Admissions Office! I would like to inquire regarding admissions.'
    )}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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
          className="group relative bg-[#a30f16] hover:bg-[#860c12] active:bg-[#860c12] text-white border-l border-t border-b border-rose-900/60 rounded-l-[4px] transition-all duration-200 hover:pr-1 shadow-md focus:outline-none block cursor-pointer"
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

      {/* Floating WhatsApp Action Button on Bottom-Right (Positioned above UCP Bot) */}
      <div className="fixed bottom-22 sm:bottom-24 right-5 sm:right-6 z-40 flex items-center">
        {showWhatsAppTooltip && (
          <div className="hidden sm:block mr-2.5 bg-white text-slate-800 text-xs px-3 py-1.5 rounded-xl shadow-xl border border-slate-200 font-semibold animate-in fade-in slide-in-from-right-2">
            Chat with UCP Admissions Helpdesk
          </div>
        )}
        <button
          id="ucp-whatsapp-floating-btn"
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setShowWhatsAppTooltip(true)}
          onMouseLeave={() => setShowWhatsAppTooltip(false)}
          className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl hover:scale-108 active:scale-95 transition-all duration-200 group focus:outline-none relative"
          aria-label="Chat on WhatsApp with UCP"
          title="Chat on WhatsApp (+92-800-00827)"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:animate-ping" />
          
          {/* WhatsApp SVG Icon */}
          <svg 
            className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10" 
            viewBox="0 0 24 24"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.183 1.572 5.932l-1.572 5.744 5.922-1.554c1.704.939 3.659 1.478 5.741 1.478 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
          </svg>
        </button>
      </div>
    </>
  );
};
