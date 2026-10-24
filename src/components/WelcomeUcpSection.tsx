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

  // Mobile horizontal swipe carousel state and handlers
  const [activeWelcomeMobileIndex, setActiveWelcomeMobileIndex] = useState(0);
  const welcomeCarouselRef = useRef<HTMLDivElement>(null);
  const activeWelcomeIndexRef = useRef(0);
  const isWelcomeInteractingRef = useRef(false);
  const welcomeTouchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isWelcomeSectionInView, setIsWelcomeSectionInView] = useState(false);

  const welcomeLeaders = [
    {
      id: 'mian-amer-mahmood',
      name: 'Mian Amer Mahmood',
      title: 'Chairman, UCP · Founder, PGC & UCP · Hilal-e-Imtiaz',
      image: 'https://ik.imagekit.io/Muffins/image%20-%202026-10-23T213740.120.png',
      bio: 'We are truly humbled by the trust of millions and take pride in uplifting our social fabric by educating the youth and mentoring them for a better future. Our journey of over 38 years is a reflection of our commitment towards creating a better tomorrow for our society through continuously improving education standards across Pakistan.',
      onOpenModal: () => setIsChairmanProfileOpen(true),
    },
    {
      id: 'prof-sohail-afzal',
      name: 'Prof. Sohail Afzal',
      title: 'Executive Director, PGC · Academic Excellence Awardee',
      image: 'https://ik.imagekit.io/Muffins/image%20-%202026-10-24T140135.933.png',
      bio: 'At UCP we are not just means to education but a family that cares, grooms and helps unlock the true potential of our students. We are in a constant relentless pursuit to help provide a better future to our youth and build a society that is wise, intelligent and educated so that every student can shine in every aspect of life.',
      onOpenModal: () => setIsSohailProfileOpen(true),
    },
  ];

  useEffect(() => {
    activeWelcomeIndexRef.current = activeWelcomeMobileIndex;
  }, [activeWelcomeMobileIndex]);

  const scrollToWelcomeCard = (idx: number) => {
    if (!welcomeCarouselRef.current) return;
    const el = welcomeCarouselRef.current;
    const cardEl = el.children[idx] as HTMLElement | undefined;
    if (cardEl) {
      const scrollPosition = cardEl.offsetLeft - (el.offsetWidth - cardEl.offsetWidth) / 2;
      el.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth',
      });
    } else {
      const cardWidth = el.offsetWidth * 0.85;
      el.scrollTo({
        left: idx * (cardWidth + 16),
        behavior: 'smooth',
      });
    }
    setActiveWelcomeMobileIndex(idx);
    activeWelcomeIndexRef.current = idx;
  };

  const handleWelcomeMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.offsetWidth * 0.85;
    const newIdx = Math.round(scrollLeft / (cardWidth + 16));
    const clamped = Math.min(Math.max(newIdx, 0), welcomeLeaders.length - 1);
    setActiveWelcomeMobileIndex(clamped);
    activeWelcomeIndexRef.current = clamped;
  };

  // Visibility detection: only activate auto-change when user scrolls into the section
  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsWelcomeSectionInView(entry.isIntersecting);
        if (!entry.isIntersecting) {
          // Keep Mian Amer Mahmood on top when not in view
          scrollToWelcomeCard(0);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, []);

  // 5-second alternating rotation: side card comes to front after 5s, then first card after 5s
  useEffect(() => {
    if (!isWelcomeSectionInView) return;

    const interval = setInterval(() => {
      if (isWelcomeInteractingRef.current) return;

      // Only run when mobile carousel is active in viewport
      if (welcomeCarouselRef.current && welcomeCarouselRef.current.offsetParent === null) {
        return;
      }

      const nextIdx = (activeWelcomeIndexRef.current + 1) % welcomeLeaders.length;
      scrollToWelcomeCard(nextIdx);
    }, 5000);

    return () => {
      clearInterval(interval);
      if (welcomeTouchTimeoutRef.current) {
        clearTimeout(welcomeTouchTimeoutRef.current);
      }
    };
  }, [isWelcomeSectionInView]);

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
    <div ref={rootRef} className="relative w-full overflow-hidden select-none bg-white dark:bg-[#080f1d] transition-colors duration-200">
      {/* =======================================================================
          TOP LEADERSHIP SECTION: OUR GUIDING FORCE
          Clean White / Midnight Dark background, grand prestigious portraits,
          with authentic building blueprint watermark linework behind both leaders.
      ======================================================================= */}
      <section
        ref={sectionRef}
        id="welcome-ucp-section"
        className="relative w-full py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#080f1d] text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-white/10 scroll-mt-20 transition-colors duration-200"
        aria-labelledby="guiding-force-heading"
      >
        {/* Alias anchors for legacy welcome-section links */}
        <div id="our-guiding-force" className="absolute -top-12" aria-hidden="true" />
        <div id="guiding-force" className="absolute -top-12" aria-hidden="true" />

        {/* -------------------------------------------------------------------
            TOP CENTER HEADING — "Our Guiding Force" (with smooth text animation)
            ------------------------------------------------------------------- */}
        <div ref={headerRef} className="relative z-10 max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 text-center mb-14 sm:mb-18">
          <h2
            id="guiding-force-heading"
            className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-[30px] sm:text-[36px] lg:text-[42px] font-bold tracking-tight leading-tight text-[#0B1A3A] dark:text-white"
          >
            <span className="inline-flex items-center justify-center flex-wrap gap-x-2 sm:gap-x-3">
              <span
                className="inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-[#0B1A3A] dark:text-white hover:text-[#C8102E] dark:hover:text-[#F3D368] animate-guiding-word-1 transition-colors cursor-default"
                style={{
                  opacity: 1,
                  transform: isHeaderVisible ? 'translateY(0)' : 'translateY(8px)',
                }}
              >
                Our
              </span>
              <span
                className="inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-[#C8102E] dark:text-[#F3D368] font-extrabold animate-guiding-word-2 transition-colors cursor-default"
                style={{
                  opacity: 1,
                  transform: isHeaderVisible ? 'translateY(0)' : 'translateY(8px)',
                  transitionDelay: '90ms',
                }}
              >
                Guiding
              </span>
              <span
                className="inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-[#0B1A3A] dark:text-white hover:text-[#C8102E] dark:hover:text-[#F3D368] animate-guiding-word-3 transition-colors cursor-default"
                style={{
                  opacity: 1,
                  transform: isHeaderVisible ? 'translateY(0)' : 'translateY(8px)',
                  transitionDelay: '180ms',
                }}
              >
                Force
              </span>
            </span>
          </h2>
          
          {/* Gold Underline 60px #D4AF37 */}
          <div 
            className="w-[64px] h-[3.5px] mx-auto mt-3.5 mb-5 rounded-full transition-all duration-700 ease-out origin-center bg-[#D4AF37] dark:bg-[#E5C158] shadow-sm"
            style={{ 
              transform: isHeaderVisible ? 'scaleX(1)' : 'scaleX(0.2)',
              opacity: isHeaderVisible ? 1 : 0.4,
              transitionDelay: '260ms'
            }}
            aria-hidden="true"
          />

          {/* Sub-heading SEO optimized Paragraph: Prominent, dark, high contrast, desktop-optimized */}
          <p 
            className="text-[#0B1A3A] dark:text-slate-100 text-lg sm:text-xl lg:text-[23px] xl:text-[25px] font-sans font-medium leading-relaxed sm:leading-[1.65] max-w-4xl xl:max-w-5xl mx-auto transition-all duration-700 ease-out text-center tracking-normal sm:tracking-tight"
            style={{
              opacity: isHeaderVisible ? 1 : 0,
              transform: isHeaderVisible ? 'translateY(0)' : 'translateY(10px)',
              transitionDelay: '340ms',
            }}
          >
            The vision and leadership behind UCP&apos;s journey is led by our esteemed Chairman Mian Amer Mahmood and Executive Director Prof. Sohail Afzal. Under their dynamic leadership, the University of Central Punjab Bahawalpur Campus is committed to academic excellence, innovation, and holistic development. Their strategic guidance and unwavering commitment to quality education continue to inspire students, faculty, and the entire UCP community to achieve greater heights and shape future leaders of Pakistan.
          </p>
        </div>

        {/* -------------------------------------------------------------------
            DESKTOP VIEW (>= 768px): Kept EXACTLY as is
            ------------------------------------------------------------------- */}
        <div className="hidden md:grid relative z-10 grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-stretch">
          
          {/* =================================================================
              COLUMN 1 (LEFT): MIAN AMER MAHMOOD
              ================================================================= */}
          <div className="flex flex-col justify-between h-full space-y-6">
            <div>
              {/* Portrait Container with Authentic Building Blueprint Behind */}
              <div className="relative flex flex-col items-center justify-center min-h-[300px] sm:min-h-[340px] lg:min-h-[380px]">
                {/* Building Blueprint Watermark Linework Directly Behind Portrait */}
                <div
                  ref={mianBlueprintRef}
                  className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center"
                  aria-hidden="true"
                >
                  <img
                    src="/assets/welcome/ucp_blueprint_lines_clean.png"
                    alt=""
                    className="w-full h-full max-w-[480px] max-h-[480px] object-contain opacity-[0.25] dark:opacity-[0.14] mix-blend-multiply dark:mix-blend-screen"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/assets/welcome/ucp_building_blueprint_lines.png';
                    }}
                  />
                  {/* Gentle gradient fade */}
                  <div className="absolute inset-0 bg-radial from-transparent via-white/30 to-white dark:via-[#080f1d]/40 dark:to-[#080f1d]" />
                </div>

                {/* Big Circle Portrait — Enlarged Size */}
                <div 
                  onClick={() => setIsChairmanProfileOpen(true)}
                  className="relative z-10 p-3 sm:p-3.5 lg:p-4 rounded-full border border-slate-200/90 dark:border-white/15 bg-white/90 dark:bg-[#0e1d38]/90 shadow-xl backdrop-blur-[2px] cursor-pointer group hover:scale-[1.03] transition-all duration-300"
                  title="Click to view biographical profile of Mian Amer Mahmood"
                >
                  <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-[3px] border-[#D4AF37] dark:border-[#D4AF37] shadow-2xl bg-[#0B1A3A] ring-4 ring-white dark:ring-[#080f1d] relative">
                    <img
                      src="https://ik.imagekit.io/Muffins/image%20-%202026-10-23T213740.120.png"
                      alt="Mian Amer Mahmood, Chairman UCP"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://ik.imagekit.io/Muffins/image%20-%202026-10-23T213740.120.png';
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 py-3 bg-gradient-to-t from-[#0B1A3A]/95 via-[#0B1A3A]/70 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[11px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-sans">
                        View Profile ↗
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity & Tag (with text animation) */}
              <div className="text-center mt-5 sm:mt-6 flex flex-col items-center">
                <span 
                  className="inline-block px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] rounded-none mb-1.5 font-sans transition-all duration-600 ease-out bg-[#0B1A3A] dark:bg-[#0e2248] text-[#D4AF37] dark:text-[#F3D368] border border-[#0B1A3A] dark:border-[#D4AF37]/30"
                  style={{ 
                    opacity: isHeaderVisible ? 1 : 0,
                    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: '380ms',
                  }}
                >
                  Chairman, UCP
                </span>
                <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-[#0B1A3A] dark:text-white tracking-tight uppercase">
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
                  className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-[0.14em] uppercase font-sans mt-0.5 transition-all duration-600 ease-out"
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
                  className="font-serif text-4xl sm:text-5xl leading-none select-none float-left mr-2.5 -mt-1 text-[#D4AF37] dark:text-[#E5C158]"
                  aria-hidden="true"
                >
                  “
                </span>
                <p className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-[17px] text-[#1E293B] dark:text-slate-200 leading-[1.78] italic text-justify">
                  We are truly humbled by the trust of millions and take pride in uplifting our social fabric by educating the youth and mentoring them for a better future. Our journey of over 38 years is a reflection of our commitment towards creating a better tomorrow for our society through continuously improving education standards across Pakistan.
                </p>
              </div>
            </div>

            {/* Bottom Action Link */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-center text-xs font-sans max-w-xl mx-auto w-full">
              <button
                type="button"
                onClick={() => setIsChairmanProfileOpen(true)}
                className="inline-flex items-center gap-1.5 font-bold text-[#0B1A3A] dark:text-slate-200 hover:text-[#C8102E] dark:hover:text-[#D4AF37] transition-colors cursor-pointer group py-1"
                aria-label="View Full Profile & Credentials of Chairman Mian Amer Mahmood"
              >
                <span className="underline decoration-slate-300 dark:decoration-slate-600 underline-offset-4 group-hover:decoration-[#C8102E] dark:group-hover:decoration-[#D4AF37]">
                  View Profile &amp; Credentials
                </span>
                <ArrowUpRight size={14} className="text-[#C8102E] dark:text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* =================================================================
              COLUMN 2 (RIGHT): PROF. SOHAIL AFZAL
              ================================================================= */}
          <div className="flex flex-col justify-between h-full space-y-6">
            <div>
              {/* Portrait Container with Authentic Building Blueprint Behind */}
              <div className="relative flex flex-col items-center justify-center min-h-[300px] sm:min-h-[340px] lg:min-h-[380px]">
                {/* Building Blueprint Watermark Linework Directly Behind Portrait */}
                <div
                  ref={sohailBlueprintRef}
                  className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center"
                  aria-hidden="true"
                >
                  <img
                    src="/assets/welcome/ucp_blueprint_lines_clean.png"
                    alt=""
                    className="w-full h-full max-w-[480px] max-h-[480px] object-contain opacity-[0.25] dark:opacity-[0.14] mix-blend-multiply dark:mix-blend-screen"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/assets/welcome/ucp_building_blueprint_lines.png';
                    }}
                  />
                  {/* Gentle gradient fade */}
                  <div className="absolute inset-0 bg-radial from-transparent via-white/30 to-white dark:via-[#080f1d]/40 dark:to-[#080f1d]" />
                </div>

                {/* Big Circle Portrait — Enlarged Size */}
                <div 
                  onClick={() => setIsSohailProfileOpen(true)}
                  className="relative z-10 p-3 sm:p-3.5 lg:p-4 rounded-full border border-slate-200/90 dark:border-white/15 bg-white/90 dark:bg-[#0e1d38]/90 shadow-xl backdrop-blur-[2px] cursor-pointer group hover:scale-[1.03] transition-all duration-300"
                  title="Click to view biographical profile of Prof. Sohail Afzal"
                >
                  <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-[3px] border-[#D4AF37] dark:border-[#D4AF37] shadow-2xl bg-[#0B1A3A] ring-4 ring-white dark:ring-[#080f1d] relative">
                    <img
                      src="https://ik.imagekit.io/Muffins/image%20-%202026-10-24T140135.933.png"
                      alt="Prof. Sohail Afzal, Executive Director PGC"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://ik.imagekit.io/Muffins/image%20-%202026-10-24T140135.933.png';
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 py-3 bg-gradient-to-t from-[#0B1A3A]/95 via-[#0B1A3A]/70 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[11px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-sans">
                        View Profile ↗
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity & Tag (with text animation) */}
              <div className="text-center mt-5 sm:mt-6 flex flex-col items-center">
                <span 
                  className="inline-block px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] rounded-none mb-1.5 font-sans transition-all duration-600 ease-out bg-[#0B1A3A] dark:bg-[#0e2248] text-[#D4AF37] dark:text-[#F3D368] border border-[#0B1A3A] dark:border-[#D4AF37]/30"
                  style={{ 
                    opacity: isHeaderVisible ? 1 : 0,
                    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: '460ms',
                  }}
                >
                  Executive Director, PGC
                </span>
                <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-[#0B1A3A] dark:text-white tracking-tight uppercase">
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
                  className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-[0.14em] uppercase font-sans mt-0.5 transition-all duration-600 ease-out"
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
                  className="font-serif text-4xl sm:text-5xl leading-none select-none float-left mr-2.5 -mt-1 text-[#D4AF37] dark:text-[#E5C158]"
                  aria-hidden="true"
                >
                  “
                </span>
                <p className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-[17px] text-[#1E293B] dark:text-slate-200 leading-[1.78] italic text-justify">
                  At UCP we are not just means to education but a family that cares, grooms and helps unlock the true potential of our students. We are in a constant relentless pursuit to help provide a better future to our youth and build a society that is wise, intelligent and educated so that every student can shine in every aspect of life.
                </p>
              </div>
            </div>

            {/* Bottom Action Link */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-center text-xs font-sans max-w-xl mx-auto w-full">
              <button
                type="button"
                onClick={() => setIsSohailProfileOpen(true)}
                className="inline-flex items-center gap-1.5 font-bold text-[#0B1A3A] dark:text-slate-200 hover:text-[#C8102E] dark:hover:text-[#D4AF37] transition-colors cursor-pointer group py-1"
                aria-label="View Full Profile & Credentials of Prof. Sohail Afzal"
              >
                <span className="underline decoration-slate-300 dark:decoration-slate-600 underline-offset-4 group-hover:decoration-[#C8102E] dark:group-hover:decoration-[#D4AF37]">
                  View Profile &amp; Credentials
                </span>
                <ArrowUpRight size={14} className="text-[#C8102E] dark:text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>
        {/* ===================================================================
            MOBILE HORIZONTAL SWIPE CAROUSEL (< 768px)
            Native momentum scroll, snap-center, 85% card width with 1.15 peek,
            96x96 circular portraits with gold border, clamped bio, and navy pill button
            =================================================================== */}
        <div className="block md:hidden relative z-10 w-full overflow-hidden select-none">
          <div
            ref={welcomeCarouselRef}
            onScroll={handleWelcomeMobileScroll}
            onTouchStart={() => {
              isWelcomeInteractingRef.current = true;
              if (welcomeTouchTimeoutRef.current) clearTimeout(welcomeTouchTimeoutRef.current);
            }}
            onTouchEnd={() => {
              if (welcomeTouchTimeoutRef.current) clearTimeout(welcomeTouchTimeoutRef.current);
              welcomeTouchTimeoutRef.current = setTimeout(() => {
                isWelcomeInteractingRef.current = false;
              }, 2000);
            }}
            onPointerDown={() => {
              isWelcomeInteractingRef.current = true;
              if (welcomeTouchTimeoutRef.current) clearTimeout(welcomeTouchTimeoutRef.current);
            }}
            onPointerUp={() => {
              if (welcomeTouchTimeoutRef.current) clearTimeout(welcomeTouchTimeoutRef.current);
              welcomeTouchTimeoutRef.current = setTimeout(() => {
                isWelcomeInteractingRef.current = false;
              }, 2000);
            }}
            className="flex overflow-x-auto gap-4 px-6 pb-4 pt-2 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [scroll-snap-stop:always]"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
            }}
          >
            {welcomeLeaders.map((leader) => (
              <div
                key={leader.id}
                className="bg-white dark:bg-[#0e1d38] rounded-2xl shadow-xl p-5 min-h-[460px] flex flex-col justify-between border border-slate-100 dark:border-white/10 w-[88vw] max-w-[360px] shrink-0 snap-center transition-all duration-300 ease-in-out relative overflow-hidden"
                style={{
                  transform: 'translate3d(0,0,0)',
                  willChange: 'transform',
                }}
              >
                <div>
                  {/* Portrait Container with Authentic Building Blueprint Behind (Matching Desktop Prestige) */}
                  <div className="relative flex flex-col items-center justify-center pt-2 pb-2 overflow-hidden min-h-[220px]">
                    {/* Building Blueprint Watermark Linework Directly Behind Portrait */}
                    <div
                      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <img
                        src="/assets/welcome/ucp_blueprint_lines_clean.png"
                        alt=""
                        className="w-full h-full max-w-[290px] max-h-[290px] object-contain opacity-[0.38] dark:opacity-[0.22] mix-blend-multiply dark:mix-blend-screen scale-110"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            '/assets/welcome/ucp_building_blueprint_lines.png';
                        }}
                      />
                      {/* Gentle radial gradient blend */}
                      <div className="absolute inset-0 bg-radial from-transparent via-white/20 to-white dark:via-[#0e1d38]/30 dark:to-[#0e1d38]" />
                    </div>

                    {/* Big Circular Portrait with Gold Border & Rings (Enlarged Luxury Size) */}
                    <div 
                      onClick={leader.onOpenModal}
                      className="relative z-10 p-2.5 rounded-full border border-slate-200/90 dark:border-white/15 bg-white/95 dark:bg-[#0e1d38]/95 shadow-xl backdrop-blur-[2px] cursor-pointer group active:scale-98 transition-all duration-300"
                      title={`Click to view biographical profile of ${leader.name}`}
                    >
                      <div className="w-48 h-48 xs:w-52 xs:h-52 rounded-full overflow-hidden border-[3px] border-[#D4AF37] dark:border-[#D4AF37] shadow-2xl bg-[#0B1A3A] ring-4 ring-white dark:ring-[#080f1d] relative">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500"
                          loading="eager"
                          onError={(e) => {
                            if (leader.id === 'mian-amer-mahmood') {
                              (e.currentTarget as HTMLImageElement).src = '/assets/welcome/mian-amer-mahmood.png';
                            }
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-[#0B1A3A]/95 via-[#0B1A3A]/70 to-transparent flex items-center justify-center">
                          <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider font-sans">
                            View Profile ↗
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Name: font-bold 16px uppercase, center aligned */}
                  <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] font-bold text-[17px] text-center text-[#0B1A3A] dark:text-white mt-3 uppercase tracking-tight">
                    {leader.name}
                  </h3>

                  {/* Title Badge: uppercase, gold on navy, center aligned */}
                  <div className="flex justify-center mt-1.5 px-1">
                    <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#D4AF37] dark:text-[#F3D368] bg-[#0B1A3A] dark:bg-[#0e2248] px-2.5 py-0.5 border border-[#0B1A3A] dark:border-[#D4AF37]/30 text-center line-clamp-2">
                      {leader.title}
                    </span>
                  </div>

                  {/* Bio: 12.5px with quotation mark, line-clamp-3 - show "Read more" to expand in modal */}
                  <div className="mt-3 text-center px-1">
                    <p className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-[13px] text-gray-700 dark:text-slate-300 line-clamp-3 leading-relaxed italic text-justify">
                      “{leader.bio}”
                    </p>
                    <button
                      type="button"
                      onClick={leader.onOpenModal}
                      className="text-[11.5px] font-semibold text-[#C8102E] dark:text-[#D4AF37] hover:underline mt-1.5 inline-block cursor-pointer font-sans"
                    >
                      Read full message &amp; credentials →
                    </button>
                  </div>
                </div>

                {/* Button: "View Profile & Credentials" pill button, dark navy #0A1931 */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 w-full">
                  <button
                    type="button"
                    onClick={leader.onOpenModal}
                    className="w-full py-2.5 px-4 rounded-full bg-[#0A1931] hover:bg-[#0B1A3A] text-white text-[12px] font-semibold tracking-wide font-sans shadow-md transition-all duration-200 active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Profile &amp; Credentials</span>
                    <ArrowUpRight size={13} className="text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Dots indicator below to show active card */}
          <div className="flex items-center justify-center gap-2 mt-4" aria-label="Slide indicators">
            {welcomeLeaders.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => scrollToWelcomeCard(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === activeWelcomeMobileIndex
                    ? 'w-6 bg-[#0A1931] dark:bg-[#D4AF37]'
                    : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
              />
            ))}
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
            className="relative w-full max-w-4xl bg-white dark:bg-[#0c1a30] border-2 border-[#0A1931] dark:border-[#D4AF37]/40 shadow-2xl rounded-none my-auto max-h-[92vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
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
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
                <div className="w-32 sm:w-36 aspect-square shrink-0 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-[#0A1931] shadow-md ring-4 ring-slate-100 dark:ring-slate-800">
                  <img
                    src="https://ik.imagekit.io/Muffins/image%20-%202026-10-23T213740.120.png"
                    alt="Mian Amer Mahmood"
                    className="w-full h-full object-cover object-[center_top]"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://ik.imagekit.io/Muffins/image%20-%202026-10-23T213740.120.png';
                    }}
                  />
                </div>

                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8102E] dark:text-[#E5C158] font-sans block">
                    FOUNDER &amp; CHAIRMAN · PUNJAB GROUP &amp; UCP
                  </span>

                  <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-[#0A1931] dark:text-white tracking-tight">
                    Mian Amer Mahmood (Hilal-e-Imtiaz)
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-medium">
                    Chairman, Board of Governors, University of Central Punjab (UCP) &amp; Punjab Group of Colleges (PGC)
                  </p>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                    Former City District Nazim (Mayor) of Lahore (2001–2009) · Founder, Dunya Media Group
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 text-[11px] font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                      <Award size={13} className="text-[#C8102E] dark:text-amber-400" />
                      Hilal-e-Imtiaz Conferred (2012)
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <GraduationCap size={13} className="text-[#0A1931] dark:text-slate-200" />
                      MBA, IBA Punjab University (1981)
                    </span>
                  </div>
                </div>
              </div>

              {/* Motto Box */}
              <div className="bg-[#0A1931]/5 dark:bg-white/5 border-l-4 border-[#D4AF37] p-4 sm:p-5 rounded-none space-y-2">
                <div className="text-xs font-mono font-bold tracking-widest text-[#0A1931] dark:text-[#E5C158] uppercase">
                  EMPOWERING PAKISTAN THROUGH ACCESSIBLE, MERIT-DRIVEN EDUCATION
                </div>
                <blockquote className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg italic text-[#0A1931] dark:text-slate-100 font-semibold leading-relaxed">
                  “Education is the greatest catalyst for national empowerment. When you empower a young mind with quality education, you uplift an entire generation. Our journey of over 38 years is a reflection of our commitment towards creating a better tomorrow for our society.”
                </blockquote>
              </div>

              {/* Executive Profile */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#0A1931] dark:text-[#D4AF37]" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931] dark:text-white">
                    Executive Profile
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-white/5 p-4 rounded-none border border-slate-200 dark:border-white/10 font-sans">
                  Mian Amer Mahmood is a celebrated Pakistani educationist, philanthropist, and former City District Nazim (Mayor) of Lahore. Holding an MBA from the Institute of Business Administration (IBA), University of the Punjab, he established the Punjab College of Commerce in 1985 on Muslim Town Canal, Lahore. Through vision, institutional rigor, and dedication, he expanded PGC into Pakistan&apos;s largest academic conglomerate, encompassing over 400 college campuses across 100+ cities, chartered universities in Lahore, Bahawalpur, Islamabad, and Karachi, and an alumni network exceeding 2 million professionals.
                </p>
              </div>

              {/* Universities & Networks */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <GraduationCap size={16} className="text-[#0A1931] dark:text-[#D4AF37]" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931] dark:text-white">
                    Chartered Universities &amp; National Education Network
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-none space-y-1">
                    <strong className="text-[#0A1931] dark:text-white block font-bold">University of Central Punjab (UCP)</strong>
                    <p className="text-slate-600 dark:text-slate-300">
                      Chartered in 2002 via Punjab Assembly Act, establishing premier faculties in Computing, Business, Sciences, Engineering, and Arts with constituent presence in Bahawalpur.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-none space-y-1">
                    <strong className="text-[#0A1931] dark:text-white block font-bold">CUST Islamabad &amp; MAJU Karachi</strong>
                    <p className="text-slate-600 dark:text-slate-300">
                      Federal chartered universities providing advanced technical, bio-engineering, computing, and management education aligned with global research standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 dark:bg-[#081220] px-5 sm:px-7 py-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                Official Executive Record · University of Central Punjab
              </span>
              <button
                type="button"
                onClick={() => setIsChairmanProfileOpen(false)}
                className="px-4 py-1.5 text-xs font-semibold bg-[#0A1931] dark:bg-[#D4AF37] text-white dark:text-[#0A1931] hover:bg-[#C8102E] dark:hover:bg-[#E5C158] transition-colors rounded-none font-sans cursor-pointer"
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
            className="relative w-full max-w-4xl bg-white dark:bg-[#0c1a30] border-2 border-[#0A1931] dark:border-[#D4AF37]/40 shadow-2xl rounded-none my-auto max-h-[92vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
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
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
                <div className="w-32 sm:w-36 aspect-square shrink-0 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-[#0A1931] shadow-md ring-4 ring-slate-100 dark:ring-slate-800">
                  <img
                    src="https://ik.imagekit.io/Muffins/image%20-%202026-10-24T140135.933.png"
                    alt="Prof. Sohail Afzal"
                    className="w-full h-full object-cover object-[center_top]"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://ik.imagekit.io/Muffins/image%20-%202026-10-24T140135.933.png';
                    }}
                  />
                </div>

                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8102E] dark:text-[#E5C158] font-sans block">
                    EXECUTIVE DIRECTOR PGC · MEMBER BOARD OF GOVERNORS, UCP &amp; MAJU
                  </span>

                  <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-[#0A1931] dark:text-white tracking-tight">
                    Prof. Sohail Afzal
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-medium">
                    Executive Director, Punjab Group of Colleges · Member Board of Governors, UCP &amp; MAJU
                  </p>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                    Executive Director, Educational Excellence Limited · Recipient of APSUP Academic Excellence Award
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 text-[11px] font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                      <Award size={13} className="text-[#C8102E] dark:text-amber-400" />
                      Academic Excellence Award (APSUF / APSUP)
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <ShieldCheck size={13} className="text-[#0A1931] dark:text-slate-200" />
                      Leading 3,000+ Educators in 100+ Cities
                    </span>
                  </div>
                </div>
              </div>

              {/* Motto Box */}
              <div className="bg-[#0A1931]/5 dark:bg-white/5 border-l-4 border-[#D4AF37] p-4 sm:p-5 rounded-none space-y-2">
                <div className="text-xs font-mono font-bold tracking-widest text-[#0A1931] dark:text-[#E5C158] uppercase">
                  CARE · GROOMING · UNLOCKING STUDENT POTENTIAL
                </div>
                <blockquote className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg italic text-[#0A1931] dark:text-slate-100 font-semibold leading-relaxed">
                  “At UCP we are not just means to education but a family that cares, grooms and helps unlock the true potential of our students. We are in a constant relentless pursuit to help provide a better future to our youth and build a society that is wise, intelligent and educated.”
                </blockquote>
              </div>

              {/* Executive Summary */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#0A1931] dark:text-[#D4AF37]" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931] dark:text-white">
                    Executive Profile &amp; Nationwide Academic Leadership
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-white/5 p-4 rounded-none border border-slate-200 dark:border-white/10 font-sans">
                  Prof. Sohail Afzal is a highly accomplished academic executive with a diverse background in higher education, institutional pedagogy, technology, and community empowerment. Currently serving as Executive Director of the Punjab Group, he oversees educational operations spanning over 100 cities nationwide and leads an academic team of more than 3,000 teachers. In addition, he serves as a Member of the Board of Governors at the University of Central Punjab (UCP) and Mohammad Ali Jinnah University (MAJU), as well as Executive Director of Educational Excellence Limited.
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931] dark:text-white">
                    Key Governance &amp; Institutional Contributions
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-none text-slate-700 dark:text-slate-300">
                    <strong className="text-[#0A1931] dark:text-white block sm:inline mr-1">APSUF Academic Excellence Award:</strong> Conferred for outstanding achievements and lasting contributions to Pakistani academia and enhancing educational standards at UCP.
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-none text-slate-700 dark:text-slate-300">
                    <strong className="text-[#0A1931] dark:text-white block sm:inline mr-1">National Educational Reach:</strong> Directing standardized curriculum quality and faculty development across 100+ cities in Pakistan.
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-none text-slate-700 dark:text-slate-300">
                    <strong className="text-[#0A1931] dark:text-white block sm:inline mr-1">Board of Governors Governance:</strong> Active governance member at UCP, MAJU, and CUST, guiding multidisciplinary degree accreditations.
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-none text-slate-700 dark:text-slate-300">
                    <strong className="text-[#0A1931] dark:text-white block sm:inline mr-1">Educational Innovation:</strong> Pioneering student learning systems, faculty mentoring protocols, and digitized examination tracking.
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 dark:bg-[#081220] px-5 sm:px-7 py-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                Official Executive Record · University of Central Punjab
              </span>
              <button
                type="button"
                onClick={() => setIsSohailProfileOpen(false)}
                className="px-4 py-1.5 text-xs font-semibold bg-[#0A1931] dark:bg-[#D4AF37] text-white dark:text-[#0A1931] hover:bg-[#C8102E] dark:hover:bg-[#E5C158] transition-colors rounded-none font-sans cursor-pointer"
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
