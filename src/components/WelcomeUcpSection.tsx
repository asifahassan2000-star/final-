import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  X, ShieldCheck, Award, GraduationCap, CheckCircle2, 
  ArrowUpRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WelcomeUcpSectionProps {
  onOpenLegacyPage?: () => void;
  onOpenProgrammesPage?: () => void;
  onOpenAboutUsPage?: () => void;
  onScrollTo?: (sectionId: string) => void;
}

export const WelcomeUcpSection: React.FC<WelcomeUcpSectionProps> = ({
  onOpenLegacyPage,
  onOpenProgrammesPage,
  onOpenAboutUsPage,
  onScrollTo,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mianBlueprintRef = useRef<HTMLDivElement>(null);
  const sohailBlueprintRef = useRef<HTMLDivElement>(null);

  const [isChairmanProfileOpen, setIsChairmanProfileOpen] = useState(false);
  const [isSohailProfileOpen, setIsSohailProfileOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsHeaderVisible(true), 150);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '60px' }
    );
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Lock body scroll and handle ESC key for modals
  useEffect(() => {
    if (!isChairmanProfileOpen && !isSohailProfileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsChairmanProfileOpen(false);
        setIsSohailProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isChairmanProfileOpen, isSohailProfileOpen]);

  // Subtle GSAP scroll parallax for blueprint watermarks behind portraits
  useEffect(() => {
    const root = rootRef.current;
    const section = sectionRef.current;
    if (!root || !section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        [mianBlueprintRef.current, sohailBlueprintRef.current].forEach((bp) => {
          if (!bp) return;
          gsap.fromTo(
            bp,
            { y: -12, scale: 0.98 },
            {
              y: 18,
              scale: 1.02,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                end: 'bottom 15%',
                scrub: 1.6,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden select-none bg-white">
      {/* =======================================================================
          TOP LEADERSHIP SECTION: OUR GUIDING FORCE
          Clean White background, not extra boxed, big portrait circles,
          with authentic building blueprint watermark linework behind both leaders.
      ======================================================================= */}
      <section
        ref={sectionRef}
        id="welcome-ucp-section"
        className="relative w-full py-16 sm:py-20 lg:py-24 bg-white text-slate-900 border-b border-slate-200 scroll-mt-20"
        aria-labelledby="guiding-force-heading"
      >
        {/* Alias anchors for legacy welcome-section links */}
        <div id="our-guiding-force" className="absolute -top-12" aria-hidden="true" />
        <div id="guiding-force" className="absolute -top-12" aria-hidden="true" />

        {/* -------------------------------------------------------------------
            TOP CENTER HEADING — "Our Guiding Force" (with smooth text animation)
            ------------------------------------------------------------------- */}
        <div ref={headerRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center mb-14 sm:mb-18">
          <h2
            id="guiding-force-heading"
            className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-[28px] sm:text-[32px] lg:text-[34px] font-bold text-[#0B1A3A] tracking-tight leading-tight"
          >
            {['Our', 'Guiding', 'Force'].map((word, idx) => (
              <span
                key={idx}
                className="inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mr-[0.28em] last:mr-0 text-[#0B1A3A]"
                style={{
                  opacity: isHeaderVisible ? 1 : 0,
                  transform: isHeaderVisible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${idx * 90}ms`,
                }}
              >
                {word}
              </span>
            ))}
          </h2>
          
          {/* Gold Underline 60px #D4AF37 */}
          <div 
            className="w-[60px] h-[3px] mx-auto mt-3 mb-3.5 rounded-full transition-all duration-700 ease-out origin-center"
            style={{ 
              backgroundColor: '#D4AF37',
              transform: isHeaderVisible ? 'scaleX(1)' : 'scaleX(0.2)',
              opacity: isHeaderVisible ? 1 : 0.4,
              transitionDelay: '260ms'
            }}
            aria-hidden="true"
          />

          {/* Sub-heading */}
          <p 
            className="text-slate-600 text-sm sm:text-base font-sans font-normal leading-relaxed max-w-2xl mx-auto transition-all duration-700 ease-out"
            style={{
              opacity: isHeaderVisible ? 1 : 0,
              transform: isHeaderVisible ? 'translateY(0)' : 'translateY(10px)',
              transitionDelay: '340ms',
            }}
          >
            The Vision and Leadership Behind UCP&apos;s Journey
          </p>
        </div>

        {/* -------------------------------------------------------------------
            2 COLUMNS GRID — Mian Amer Mahmood & Prof. Sohail Afzal
            Unboxed, open, prestigious university design on white background.
            Big circular portraits with authentic building blueprint behind each.
            ------------------------------------------------------------------- */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-stretch">
          
          {/* =================================================================
              COLUMN 1 (LEFT): MIAN AMER MAHMOOD
              ================================================================= */}
          <div className="flex flex-col justify-between h-full space-y-6">
            <div>
              {/* Portrait Container with Authentic Building Blueprint Behind */}
              <div className="relative flex flex-col items-center justify-center min-h-[260px] sm:min-h-[300px] lg:min-h-[330px]">
                {/* Building Blueprint Watermark Linework Directly Behind Portrait */}
                <div
                  ref={mianBlueprintRef}
                  className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center"
                  aria-hidden="true"
                >
                  <img
                    src="/assets/welcome/ucp_blueprint_lines_clean.png"
                    alt=""
                    className="w-full h-full max-w-[440px] max-h-[440px] object-contain opacity-[0.25] mix-blend-multiply"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/assets/welcome/ucp_building_blueprint_lines.png';
                    }}
                  />
                  {/* Gentle gradient fade */}
                  <div className="absolute inset-0 bg-radial from-transparent via-white/30 to-white" />
                </div>

                {/* Big Circle Portrait — Same Big Size As Before */}
                <div 
                  onClick={() => setIsChairmanProfileOpen(true)}
                  className="relative z-10 p-2.5 sm:p-3 rounded-full border border-slate-200/90 bg-white/80 shadow-md backdrop-blur-[2px] cursor-pointer group hover:scale-103 transition-transform duration-300"
                  title="Click to view biographical profile of Mian Amer Mahmood"
                >
                  <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-[#0B1A3A] shadow-2xl bg-[#0B1A3A] ring-4 ring-white relative">
                    <img
                      src="/assets/welcome/mian-amer-mahmood.png"
                      alt="Mian Amer Mahmood, Chairman UCP"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/99s2Cmqj_mian-ameer.png';
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 py-2.5 bg-gradient-to-t from-[#0B1A3A]/95 via-[#0B1A3A]/70 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest font-sans">
                        View Profile ↗
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity & Tag (with text animation) */}
              <div className="text-center mt-5 sm:mt-6 flex flex-col items-center">
                <span 
                  className="inline-block px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] rounded-none mb-1.5 font-sans transition-all duration-600 ease-out"
                  style={{ 
                    backgroundColor: '#0B1A3A', 
                    color: '#D4AF37',
                    opacity: isHeaderVisible ? 1 : 0,
                    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: '380ms',
                  }}
                >
                  Chairman, UCP
                </span>
                <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-[#0B1A3A] tracking-tight uppercase">
                  {['Mian', 'Amer', 'Mahmood'].map((word, idx) => (
                    <span
                      key={idx}
                      className="inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mr-[0.25em] last:mr-0"
                      style={{
                        opacity: isHeaderVisible ? 1 : 0,
                        transform: isHeaderVisible ? 'translateY(0)' : 'translateY(14px)',
                        transitionDelay: `${420 + idx * 80}ms`,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </h3>
                <p 
                  className="text-xs sm:text-sm font-semibold text-slate-500 tracking-[0.14em] uppercase font-sans mt-0.5 transition-all duration-600 ease-out"
                  style={{
                    opacity: isHeaderVisible ? 1 : 0,
                    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(8px)',
                    transitionDelay: '640ms',
                  }}
                >
                  Founder, Punjab Group of Colleges &amp; UCP · Hilal-e-Imtiaz
                </p>
              </div>

              {/* Welcome Message (Shortened to 4 Lines inside clean unboxed layout) */}
              <div className="relative mt-6 max-w-xl mx-auto">
                <span 
                  className="font-serif text-4xl sm:text-5xl leading-none select-none float-left mr-2.5 -mt-1"
                  style={{ color: '#D4AF37' }}
                  aria-hidden="true"
                >
                  “
                </span>
                <p className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-[17px] text-[#1E293B] leading-[1.78] italic text-justify">
                  We are truly humbled by the trust of millions and take pride in uplifting our social fabric by educating the youth and mentoring them for a better future. Our journey of over 38 years is a reflection of our commitment towards creating a better tomorrow for our society through continuously improving education standards across Pakistan.
                </p>
              </div>
            </div>

            {/* Bottom Action Link */}
            <div className="pt-4 border-t border-slate-200/80 flex items-center justify-center text-xs font-sans max-w-xl mx-auto w-full">
              <button
                type="button"
                onClick={() => setIsChairmanProfileOpen(true)}
                className="inline-flex items-center gap-1.5 font-bold text-[#0B1A3A] hover:text-[#C8102E] transition-colors cursor-pointer group py-1"
                aria-label="View Full Profile & Credentials of Chairman Mian Amer Mahmood"
              >
                <span className="underline decoration-slate-300 underline-offset-4 group-hover:decoration-[#C8102E]">
                  View Profile &amp; Credentials
                </span>
                <ArrowUpRight size={14} className="text-[#C8102E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* =================================================================
              COLUMN 2 (RIGHT): PROF. SOHAIL AFZAL
              ================================================================= */}
          <div className="flex flex-col justify-between h-full space-y-6">
            <div>
              {/* Portrait Container with Authentic Building Blueprint Behind */}
              <div className="relative flex flex-col items-center justify-center min-h-[260px] sm:min-h-[300px] lg:min-h-[330px]">
                {/* Building Blueprint Watermark Linework Directly Behind Portrait */}
                <div
                  ref={sohailBlueprintRef}
                  className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center"
                  aria-hidden="true"
                >
                  <img
                    src="/assets/welcome/ucp_blueprint_lines_clean.png"
                    alt=""
                    className="w-full h-full max-w-[440px] max-h-[440px] object-contain opacity-[0.25] mix-blend-multiply"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/assets/welcome/ucp_building_blueprint_lines.png';
                    }}
                  />
                  {/* Gentle gradient fade */}
                  <div className="absolute inset-0 bg-radial from-transparent via-white/30 to-white" />
                </div>

                {/* Big Circle Portrait — Exact Same Big Size as Mian Amer */}
                <div 
                  onClick={() => setIsSohailProfileOpen(true)}
                  className="relative z-10 p-2.5 sm:p-3 rounded-full border border-slate-200/90 bg-white/80 shadow-md backdrop-blur-[2px] cursor-pointer group hover:scale-103 transition-transform duration-300"
                  title="Click to view biographical profile of Prof. Sohail Afzal"
                >
                  <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-[#0B1A3A] shadow-2xl bg-[#0B1A3A] ring-4 ring-white relative">
                    <img
                      src="/assets/leadership/sohail_afzal_user_selected_3_4.jpg"
                      alt="Prof. Sohail Afzal, Executive Director PGC"
                      className="w-full h-full object-cover object-[center_12%] scale-105 group-hover:scale-110 transition-transform duration-500"
                      loading="eager"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/HffRMp9g_Whats-App-Image-2026-10-20-at-2-07-37-AM.jpg';
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 py-2.5 bg-gradient-to-t from-[#0B1A3A]/95 via-[#0B1A3A]/70 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest font-sans">
                        View Profile ↗
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity & Tag (with text animation) */}
              <div className="text-center mt-5 sm:mt-6 flex flex-col items-center">
                <span 
                  className="inline-block px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] rounded-none mb-1.5 font-sans transition-all duration-600 ease-out"
                  style={{ 
                    backgroundColor: '#0B1A3A', 
                    color: '#D4AF37',
                    opacity: isHeaderVisible ? 1 : 0,
                    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: '460ms',
                  }}
                >
                  Executive Director, PGC
                </span>
                <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-[#0B1A3A] tracking-tight uppercase">
                  {['Prof.', 'Sohail', 'Afzal'].map((word, idx) => (
                    <span
                      key={idx}
                      className="inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mr-[0.25em] last:mr-0"
                      style={{
                        opacity: isHeaderVisible ? 1 : 0,
                        transform: isHeaderVisible ? 'translateY(0)' : 'translateY(14px)',
                        transitionDelay: `${500 + idx * 80}ms`,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </h3>
                <p 
                  className="text-xs sm:text-sm font-semibold text-slate-500 tracking-[0.14em] uppercase font-sans mt-0.5 transition-all duration-600 ease-out"
                  style={{
                    opacity: isHeaderVisible ? 1 : 0,
                    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(8px)',
                    transitionDelay: '720ms',
                  }}
                >
                  Executive Director, PGC · Academic Excellence Awardee
                </p>
              </div>

              {/* Message (Shortened to 4 Lines inside clean unboxed layout) */}
              <div className="relative mt-6 max-w-xl mx-auto">
                <span 
                  className="font-serif text-4xl sm:text-5xl leading-none select-none float-left mr-2.5 -mt-1"
                  style={{ color: '#D4AF37' }}
                  aria-hidden="true"
                >
                  “
                </span>
                <p className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-[17px] text-[#1E293B] leading-[1.78] italic text-justify">
                  At UCP we are not just means to education but a family that cares, grooms and helps unlock the true potential of our students. We are in a constant relentless pursuit to help provide a better future to our youth and build a society that is wise, intelligent and educated so that every student can shine in every aspect of life.
                </p>
              </div>
            </div>

            {/* Bottom Action Link */}
            <div className="pt-4 border-t border-slate-200/80 flex items-center justify-center text-xs font-sans max-w-xl mx-auto w-full">
              <button
                type="button"
                onClick={() => setIsSohailProfileOpen(true)}
                className="inline-flex items-center gap-1.5 font-bold text-[#0B1A3A] hover:text-[#C8102E] transition-colors cursor-pointer group py-1"
                aria-label="View Full Profile & Credentials of Prof. Sohail Afzal"
              >
                <span className="underline decoration-slate-300 underline-offset-4 group-hover:decoration-[#C8102E]">
                  View Profile &amp; Credentials
                </span>
                <ArrowUpRight size={14} className="text-[#C8102E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =======================================================================
          MODAL 1: MIAN AMER MAHMOOD BIOGRAPHICAL PROFILE
          ======================================================================= */}
      {isChairmanProfileOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chairman-profile-title"
          onClick={() => setIsChairmanProfileOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-white border-2 border-[#0A1931] shadow-2xl rounded-none my-auto max-h-[92vh] flex flex-col overflow-hidden text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0A1931] text-white px-5 sm:px-7 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-[#D4AF37] shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] font-sans block">
                    Institutional Founder &amp; Chairman
                  </span>
                  <h3 id="chairman-profile-title" className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg font-bold text-white tracking-wide">
                    Mian Amer Mahmood · Biographical Profile
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsChairmanProfileOpen(false)}
                className="text-slate-300 hover:text-white p-1.5 hover:bg-white/10 transition-colors rounded-none cursor-pointer"
                aria-label="Close Profile Modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-5 sm:p-8 space-y-6 font-sans">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200">
                <div className="w-32 sm:w-36 aspect-square shrink-0 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-[#0A1931] shadow-md ring-4 ring-slate-100">
                  <img
                    src="/assets/welcome/mian-amer-mahmood.png"
                    alt="Mian Amer Mahmood"
                    className="w-full h-full object-cover object-[center_top]"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/99s2Cmqj_mian-ameer.png';
                    }}
                  />
                </div>

                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8102E] font-sans block">
                    FOUNDER &amp; CHAIRMAN · PUNJAB GROUP &amp; UCP
                  </span>

                  <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-[#0A1931] tracking-tight">
                    Mian Amer Mahmood (Hilal-e-Imtiaz)
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 font-sans font-medium">
                    Chairman, Board of Governors, University of Central Punjab (UCP) &amp; Punjab Group of Colleges (PGC)
                  </p>
                  
                  <p className="text-xs text-slate-500 font-sans">
                    Former City District Nazim (Mayor) of Lahore (2001–2009) · Founder, Dunya Media Group
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-300 text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                      <Award size={13} className="text-[#C8102E]" />
                      Hilal-e-Imtiaz Conferred (2012)
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-300 text-[11px] font-semibold text-slate-700">
                      <GraduationCap size={13} className="text-[#0A1931]" />
                      MBA, IBA Punjab University (1981)
                    </span>
                  </div>
                </div>
              </div>

              {/* Motto Box */}
              <div className="bg-[#0A1931]/5 border-l-4 border-[#D4AF37] p-4 sm:p-5 rounded-none space-y-2">
                <div className="text-xs font-mono font-bold tracking-widest text-[#0A1931] uppercase">
                  EMPOWERING PAKISTAN THROUGH ACCESSIBLE, MERIT-DRIVEN EDUCATION
                </div>
                <blockquote className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg italic text-[#0A1931] font-semibold leading-relaxed">
                  “Education is the greatest catalyst for national empowerment. When you empower a young mind with quality education, you uplift an entire generation. Our journey of over 38 years is a reflection of our commitment towards creating a better tomorrow for our society.”
                </blockquote>
              </div>

              {/* Executive Profile */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#0A1931]" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931]">
                    Executive Profile
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 bg-slate-50 p-4 rounded-none border border-slate-200 font-sans">
                  Mian Amer Mahmood is a celebrated Pakistani educationist, philanthropist, and former City District Nazim (Mayor) of Lahore. Holding an MBA from the Institute of Business Administration (IBA), University of the Punjab, he established the Punjab College of Commerce in 1985 on Muslim Town Canal, Lahore. Through vision, institutional rigor, and dedication, he expanded PGC into Pakistan&apos;s largest academic conglomerate, encompassing over 400 college campuses across 100+ cities, chartered universities in Lahore, Bahawalpur, Islamabad, and Karachi, and an alumni network exceeding 2 million professionals.
                </p>
              </div>

              {/* Universities & Networks */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <GraduationCap size={16} className="text-[#0A1931]" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931]">
                    Chartered Universities &amp; National Education Network
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-none space-y-1">
                    <strong className="text-[#0A1931] block font-bold">University of Central Punjab (UCP)</strong>
                    <p className="text-slate-600">
                      Chartered in 2002 via Punjab Assembly Act, establishing premier faculties in Computing, Business, Sciences, Engineering, and Arts with constituent presence in Bahawalpur.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-none space-y-1">
                    <strong className="text-[#0A1931] block font-bold">CUST Islamabad &amp; MAJU Karachi</strong>
                    <p className="text-slate-600">
                      Federal chartered universities providing advanced technical, bio-engineering, computing, and management education aligned with global research standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 px-5 sm:px-7 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-500 font-sans">
                Official Executive Record · University of Central Punjab
              </span>
              <button
                type="button"
                onClick={() => setIsChairmanProfileOpen(false)}
                className="px-4 py-1.5 text-xs font-semibold bg-[#0A1931] text-white hover:bg-[#C8102E] transition-colors rounded-none font-sans cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          MODAL 2: PROF. SOHAIL AFZAL BIOGRAPHICAL PROFILE
          ======================================================================= */}
      {isSohailProfileOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sohail-profile-title"
          onClick={() => setIsSohailProfileOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-white border-2 border-[#0A1931] shadow-2xl rounded-none my-auto max-h-[92vh] flex flex-col overflow-hidden text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0A1931] text-white px-5 sm:px-7 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-[#D4AF37] shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] font-sans block">
                    Institutional Governance · Executive Director PGC
                  </span>
                  <h3 id="sohail-profile-title" className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg font-bold text-white tracking-wide">
                    Prof. Sohail Afzal · Biographical Profile
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSohailProfileOpen(false)}
                className="text-slate-300 hover:text-white p-1.5 hover:bg-white/10 transition-colors rounded-none cursor-pointer"
                aria-label="Close Profile Modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-5 sm:p-8 space-y-6 font-sans">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200">
                <div className="w-32 sm:w-36 aspect-square shrink-0 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-[#0A1931] shadow-md ring-4 ring-slate-100">
                  <img
                    src="/assets/leadership/sohail_afzal_user_selected_3_4.jpg"
                    alt="Prof. Sohail Afzal"
                    className="w-full h-full object-cover object-[center_12%] scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/HffRMp9g_Whats-App-Image-2026-10-20-at-2-07-37-AM.jpg';
                    }}
                  />
                </div>

                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8102E] font-sans block">
                    EXECUTIVE DIRECTOR PGC · MEMBER BOARD OF GOVERNORS, UCP &amp; MAJU
                  </span>

                  <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-[#0A1931] tracking-tight">
                    Prof. Sohail Afzal
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 font-sans font-medium">
                    Executive Director, Punjab Group of Colleges · Member Board of Governors, UCP &amp; MAJU
                  </p>
                  
                  <p className="text-xs text-slate-500 font-sans">
                    Executive Director, Educational Excellence Limited · Recipient of APSUP Academic Excellence Award
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-300 text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                      <Award size={13} className="text-[#C8102E]" />
                      Academic Excellence Award (APSUF / APSUP)
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-300 text-[11px] font-semibold text-slate-700">
                      <ShieldCheck size={13} className="text-[#0A1931]" />
                      Leading 3,000+ Educators in 100+ Cities
                    </span>
                  </div>
                </div>
              </div>

              {/* Motto Box */}
              <div className="bg-[#0A1931]/5 border-l-4 border-[#D4AF37] p-4 sm:p-5 rounded-none space-y-2">
                <div className="text-xs font-mono font-bold tracking-widest text-[#0A1931] uppercase">
                  CARE · GROOMING · UNLOCKING STUDENT POTENTIAL
                </div>
                <blockquote className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg italic text-[#0A1931] font-semibold leading-relaxed">
                  “At UCP we are not just means to education but a family that cares, grooms and helps unlock the true potential of our students. We are in a constant relentless pursuit to help provide a better future to our youth and build a society that is wise, intelligent and educated.”
                </blockquote>
              </div>

              {/* Executive Summary */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#0A1931]" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931]">
                    Executive Profile &amp; Nationwide Academic Leadership
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 bg-slate-50 p-4 rounded-none border border-slate-200 font-sans">
                  Prof. Sohail Afzal is a highly accomplished academic executive with a diverse background in higher education, institutional pedagogy, technology, and community empowerment. Currently serving as Executive Director of the Punjab Group, he oversees educational operations spanning over 100 cities nationwide and leads an academic team of more than 3,000 teachers. In addition, he serves as a Member of the Board of Governors at the University of Central Punjab (UCP) and Mohammad Ali Jinnah University (MAJU), as well as Executive Director of Educational Excellence Limited.
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931]">
                    Key Governance &amp; Institutional Contributions
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-none">
                    <strong>APSUP Academic Excellence Award:</strong> Conferred for outstanding achievements and lasting contributions to Pakistani academia and enhancing educational standards at UCP.
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-none">
                    <strong>National Educational Reach:</strong> Directing standardized curriculum quality and faculty development across 100+ cities in Pakistan.
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-none">
                    <strong>Board of Governors Governance:</strong> Active governance member at UCP, MAJU, and CUST, guiding multidisciplinary degree accreditations.
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-none">
                    <strong>Educational Innovation:</strong> Pioneering student learning systems, faculty mentoring protocols, and digitized examination tracking.
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 px-5 sm:px-7 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-500 font-sans">
                Official Executive Record · University of Central Punjab
              </span>
              <button
                type="button"
                onClick={() => setIsSohailProfileOpen(false)}
                className="px-4 py-1.5 text-xs font-semibold bg-[#0A1931] text-white hover:bg-[#C8102E] transition-colors rounded-none font-sans cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeUcpSection;
