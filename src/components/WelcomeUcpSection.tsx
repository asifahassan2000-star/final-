import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Compass, ShieldCheck, Award, X, CheckCircle2, Building2, GraduationCap, MapPin, UserCheck, Sparkles, Globe, Mail, ExternalLink, Tag, BookOpen, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WelcomeUcpSectionProps {
  onOpenLegacyPage?: () => void;
  onOpenProgrammesPage?: () => void;
  onScrollTo?: (sectionId: string) => void;
}

export const WelcomeUcpSection: React.FC<WelcomeUcpSectionProps> = ({
  onOpenLegacyPage,
  onOpenProgrammesPage,
  onScrollTo,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const welcomeSectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const portraitColRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<HTMLDivElement>(null);
  const portraitCircleRef = useRef<HTMLDivElement>(null);
  const visionMissionSectionRef = useRef<HTMLDivElement>(null);
  const visionBgIllustrationRef = useRef<HTMLDivElement>(null);

  // Vision & Mission visibility state: Hidden by default on mobile & desktop until Learn More is clicked
  const [isVisionMissionOpen, setIsVisionMissionOpen] = useState(false);
  const [isChairmanProfileOpen, setIsChairmanProfileOpen] = useState(false);

  // Lock body scroll and handle ESC key for Chairman Profile modal
  useEffect(() => {
    if (!isChairmanProfileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsChairmanProfileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isChairmanProfileOpen]);

  // Smooth scroll handler for "Learn More →"
  const handleLearnMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isVisionMissionOpen) {
      setIsVisionMissionOpen(true);
      // Wait for DOM layout paint, then scroll smoothly to the revealed section
      requestAnimationFrame(() => {
        setTimeout(() => {
          const elem = document.getElementById('vision-mission-section');
          if (elem) {
            const headerOffset = 84;
            const elementPosition = elem.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
          ScrollTrigger.refresh();
        }, 50);
      });
    } else {
      // If already open, toggle closed or smooth scroll
      setIsVisionMissionOpen(false);
      const welcomeElem = document.getElementById('welcome-ucp-section');
      if (welcomeElem) {
        const headerOffset = 84;
        const elemPos = welcomeElem.getBoundingClientRect().top;
        const offsetPos = elemPos + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPos,
          behavior: 'smooth',
        });
      }
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    }
  };

  const handleCloseVisionMission = () => {
    setIsVisionMissionOpen(false);
    const welcomeElem = document.getElementById('welcome-ucp-section');
    if (welcomeElem) {
      const headerOffset = 84;
      const elemPos = welcomeElem.getBoundingClientRect().top;
      const offsetPos = elemPos + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPos,
        behavior: 'smooth',
      });
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);
  };

  // Refresh GSAP ScrollTrigger whenever vision section expands or collapses
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [isVisionMissionOpen]);

  const handleProgramsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenProgrammesPage) {
      onOpenProgrammesPage();
    } else if (onScrollTo) {
      onScrollTo('finder-section');
    }
  };

  const handleLegacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenLegacyPage) {
      onOpenLegacyPage();
    } else if (onScrollTo) {
      onScrollTo('heritage-section');
    }
  };

  // =========================================================================
  // GSAP SCROLL-LINKED PARALLAX (Subtle, Layered, Respects Reduced-Motion)
  // Continuous, natural scrolling with zero wheel hijacking or forced pinning.
  // =========================================================================
  useEffect(() => {
    const root = rootRef.current;
    const welcomeSection = welcomeSectionRef.current;
    const leftCol = leftColRef.current;
    const portraitCircle = portraitCircleRef.current;
    const blueprint = blueprintRef.current;
    const visionMission = visionMissionSectionRef.current;
    const visionBgIllustration = visionBgIllustrationRef.current;

    if (!root || !welcomeSection) return;

    // Check user accessibility preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet (768px+)
      mm.add('(min-width: 768px)', () => {
        // Welcome section reveals with clean entrance; background blueprint retains subtle depth
        if (blueprint) {
          gsap.fromTo(
            blueprint,
            { y: -10, scale: 0.98 },
            {
              y: 20,
              scale: 1.02,
              ease: 'none',
              scrollTrigger: {
                trigger: welcomeSection,
                start: 'top 85%',
                end: 'bottom 15%',
                scrub: 1.6,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        // 4. Vision, Mission & Core Values architectural background parallax
        if (visionBgIllustration && visionMission) {
          gsap.fromTo(
            visionBgIllustration,
            { y: -50, scale: 1.04 },
            {
              y: 50,
              scale: 1.04,
              ease: 'none',
              scrollTrigger: {
                trigger: visionMission,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.4,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      // Mobile (<768px): Substantially reduced movement to ensure 60fps performance
      mm.add('(max-width: 767px)', () => {
        if (visionBgIllustration && visionMission) {
          gsap.fromTo(
            visionBgIllustration,
            { y: -15 },
            {
              y: 15,
              ease: 'none',
              scrollTrigger: {
                trigger: visionMission,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden bg-white dark:bg-[#080f1d] selection:bg-[#0A1931] selection:text-white transition-colors duration-200">
      {/* =======================================================================
          SECTION 1: A WARM WELCOME TO UCPIANS
          Clean editorial presentation inspired by Oxford, Harvard, and NUST.
      ======================================================================= */}
      <section
        ref={welcomeSectionRef}
        id="welcome-ucp-section"
        className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center justify-center py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#080f1d] transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* -------------------------------------------------------------------
              LEFT COLUMN — EDITORIAL MESSAGE & INSTITUTIONAL VALUES
              ------------------------------------------------------------------- */}
          <div
            ref={leftColRef}
            className="lg:col-span-7 flex flex-col justify-center will-change-transform z-10"
          >
            {/* Small uppercase category label with restrained red bar */}
            <div 
              data-reveal="label"
              data-reveal-delay="0"
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#0A1931] dark:text-amber-400 font-sans">
                WELCOME TO UCP BAHAWALPUR
              </span>
              <div className="h-[2px] w-10 sm:w-14 bg-[#C8102E]" aria-hidden="true" />
            </div>

            {/* Main Heading: A Warm Welcome to UCPians */}
            <div className="mask-reveal-wrap">
              <h2 
                data-reveal="heading"
                data-reveal-delay="120"
                className="mask-reveal-child font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-3xl sm:text-4xl lg:text-[45px] font-bold text-[#0A1931] dark:text-white tracking-tight leading-[1.18] mb-6 sm:mb-8 text-balance"
              >
                A Warm Welcome to <span className="text-[#0A1931] dark:text-amber-400">UCPians</span>
              </h2>
            </div>

            {/* Welcome Message: Styled as an elegant editorial quotation (Single unit) */}
            <div 
              data-reveal="paragraph"
              data-reveal-delay="240"
              className="relative mb-6 max-w-2xl"
            >
              {/* Sophisticated oversized opening quotation mark */}
              <span 
                className="font-serif text-5xl sm:text-6xl text-[#C8102E]/80 dark:text-[#F87171]/80 leading-none select-none float-left mr-3 -mt-1"
                aria-hidden="true"
              >
                “
              </span>
              <p className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg lg:text-[19px] font-normal text-[#1E293B] dark:text-slate-200 leading-[1.78] italic">
                We are truly humbled by the trust of millions and take pride in uplifting our social fabric by educating the youth and mentoring them for a better future. Our journey of over 38 years is nothing but a reflection of our commitment and passion towards creating a better tomorrow for our society. With our wide network of schools, colleges and universities, we believe in continuously improving the standards and quality of education in Pakistan.
              </p>

              {/* Attribution By the Chairman UCP/PGC */}
              <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-sans border-t border-slate-200/60 dark:border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                  <span className="font-bold text-[#C8102E] dark:text-amber-400 uppercase tracking-wider text-[11px] sm:text-xs">
                    By the Chairman UCP/PGC
                  </span>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-600">·</span>
                  <span className="font-serif font-bold text-[#0A1931] dark:text-white uppercase tracking-wider">
                    MIAN AMER MAHMOOD
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsChairmanProfileOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A1931] dark:text-amber-400 hover:text-[#C8102E] transition-colors cursor-pointer group"
                  aria-label="View Full Profile of Mian Amer Mahmood"
                >
                  <span className="underline decoration-slate-300 dark:decoration-amber-400/40 underline-offset-4 group-hover:decoration-[#C8102E]">
                    View Full Profile
                  </span>
                  <span className="text-[#C8102E] dark:text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>

            {/* Learn More → text link: opens Vision & Mission section on click */}
            <div 
              data-reveal="paragraph"
              data-reveal-delay="360"
              className="pt-1 mb-8"
            >
              <a
                href="#vision-mission-section"
                onClick={handleLearnMoreClick}
                className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#0A1931] dark:text-amber-400 hover:text-[#C8102E] dark:hover:text-amber-300 transition-colors py-1 cursor-pointer font-sans"
                aria-label={isVisionMissionOpen ? "Hide Vision, Mission, and Core Values" : "Learn More about Our Vision, Mission, and Core Values"}
                aria-expanded={isVisionMissionOpen}
                aria-controls="vision-mission-section"
              >
                <span className="relative pb-0.5">
                  {isVisionMissionOpen ? 'Hide Vision & Mission' : 'Learn More'}
                  <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#C8102E] dark:bg-amber-400 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="text-[#C8102E] dark:text-amber-400 font-bold transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true">
                  {isVisionMissionOpen ? '↑' : '→'}
                </span>
              </a>
            </div>

            {/* Subdued institutional trust markers (Clean unboxed metadata) */}
            <div 
              data-reveal="card"
              data-reveal-delay="480"
              className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-5 border-t border-slate-200/80 dark:border-white/10 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8102E] dark:text-amber-400" />
                <span className="font-semibold text-slate-800 dark:text-white">HEC Recognized</span>
                <span className="text-slate-400">·</span>
                <span>W4 Highest Category</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C8102E] dark:text-amber-400" />
                <span className="font-semibold text-slate-800 dark:text-white">Punjab Group Legacy</span>
                <span className="text-slate-400">·</span>
                <span>38+ Years of Excellence</span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              RIGHT COLUMN — CHAIRMAN PORTRAIT & ARCHITECTURAL BLUEPRINT
              ------------------------------------------------------------------- */}
          <div
            ref={portraitColRef}
            data-reveal="card"
            data-reveal-delay="200"
            className="lg:col-span-5 relative flex flex-col items-center justify-center will-change-transform z-10"
          >
            {/* Subtle Architectural Blueprint Background Effect */}
            <div
              ref={blueprintRef}
              className="absolute -inset-6 sm:-inset-10 lg:-right-16 pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center"
              aria-hidden="true"
            >
              {/* Authentic architectural elevation linework of UCP Bahawalpur campus */}
              <div className="relative w-full h-full max-w-[540px] max-h-[540px]">
                <img
                  src="/assets/welcome/ucp_blueprint_lines_clean.png"
                  alt=""
                  className="w-full h-full object-contain opacity-[0.22] dark:opacity-[0.10] mix-blend-multiply dark:invert"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      '/assets/welcome/ucp_building_blueprint_lines.png';
                  }}
                />

                {/* Gentle fade gradient toward the left text column */}
                <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#080f1d] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 dark:from-[#080f1d]/70 via-transparent to-white/70 dark:to-[#080f1d]/70" />
              </div>
            </div>

            {/* Chairman Portrait Container */}
            <div
              ref={portraitCircleRef}
              className="relative z-10 flex flex-col items-center will-change-transform"
            >
              {/* Delicate concentric framing: thin secondary border + crisp navy outline + Click to open profile */}
              <div 
                onClick={() => setIsChairmanProfileOpen(true)}
                className="relative p-2.5 sm:p-3 rounded-full border border-slate-200/90 dark:border-white/10 bg-white/70 dark:bg-[#0d1e38]/70 shadow-sm backdrop-blur-[2px] cursor-pointer group"
                title="Click to view full biographical profile of Chairman Mian Amer Mahmood"
              >
                <div className="w-56 h-56 sm:w-68 sm:h-68 lg:w-76 lg:h-76 rounded-full overflow-hidden border-2 border-[#0A1931] dark:border-amber-400 shadow-2xl bg-[#0A1931] ring-4 ring-white dark:ring-[#14284c] relative">
                  <img
                    src="/assets/welcome/mian-amer-mahmood.png"
                    alt="Mian Amer Mahmood, Chairman UCP / PGC"
                    className="w-full h-full object-cover object-[center_top] select-none block group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/images/99s2Cmqj_mian-ameer.png';
                    }}
                  />
                  {/* Subtle Profile Indicator on Hover */}
                  <div className="absolute inset-x-0 bottom-0 py-3 bg-gradient-to-t from-[#0A1931]/95 via-[#0A1931]/70 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1 font-sans">
                      View Profile ↗
                    </span>
                  </div>
                </div>
              </div>

              {/* Name, Designation and Minimal Profile Option underneath in elegant typography */}
              <div className="text-center mt-5 sm:mt-6 flex flex-col items-center">
                <p className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#C8102E] dark:text-amber-400 font-sans mb-1">
                  By the Chairman UCP/PGC
                </p>
                <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-xl sm:text-2xl font-bold text-[#0A1931] dark:text-white tracking-tight uppercase">
                  MIAN AMER MAHMOOD
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 tracking-[0.14em] uppercase font-sans mt-1">
                  Chairman, Punjab Group of Colleges & UCP
                </p>

                {/* Minimal Profile Option Near His Pic */}
                <button
                  type="button"
                  onClick={() => setIsChairmanProfileOpen(true)}
                  className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-[#0A1931] hover:bg-[#0A1931] hover:text-white dark:hover:bg-amber-400 dark:hover:text-[#0A1931] text-[#0A1931] dark:text-amber-400 border border-slate-300 dark:border-amber-400/50 text-xs font-semibold tracking-wide transition-all shadow-2xs hover:shadow-sm cursor-pointer rounded-none font-sans group"
                  aria-label="View Full Biographical Profile & Credentials of Chairman Mian Amer Mahmood"
                >
                  <span className="font-sans">View Profile &amp; Credentials</span>
                  <span className="text-[#C8102E] dark:text-amber-400 group-hover:text-white dark:group-hover:text-[#0A1931] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =======================================================================
          SECTION 2: OUR VISION, MISSION & CORE VALUES
          Featuring official UCP Navy Background (#0A1931) + Authentic Building
          Blueprint Illustration with Smooth Scroll-Linked Parallax Animation.
      ======================================================================= */}
      <section
        ref={visionMissionSectionRef}
        id="vision-mission-section"
        className={`relative w-full bg-[#0A1931] text-white py-16 sm:py-20 lg:py-26 overflow-hidden border-t border-[#0A1931] scroll-mt-24 transition-all duration-300 ${
          isVisionMissionOpen ? 'block' : 'hidden'
        }`}
        style={{ display: isVisionMissionOpen ? 'block' : 'none' }}
        aria-hidden={!isVisionMissionOpen}
      >
        {/* PARALLAX ARCHITECTURAL BACKGROUND: Authentic UCP Bahawalpur Building Illustration */}
        <div
          ref={visionBgIllustrationRef}
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden will-change-transform"
          aria-hidden="true"
        >
          {/* Subtle architectural grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />

          {/* Authentic Campus Architectural Illustration */}
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center opacity-[0.16] mix-blend-screen scale-110">
            <img
              src="/assets/welcome/ucp_blueprint_lines_clean.png"
              alt=""
              className="w-full h-full object-cover object-bottom filter invert brightness-125"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  '/assets/welcome/ucp_building_blueprint_lines.png';
              }}
            />
          </div>

          {/* Carefully tuned vignettes to preserve 100% text contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1931] via-[#0A1931]/82 to-[#0A1931]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1931]/90 via-transparent to-[#0A1931]/90" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Close Button */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-12 sm:mb-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#93C5FD] font-sans">
                  INSTITUTIONAL PURPOSE & GUIDING PRINCIPLES
                </span>
                <div className="h-[2px] w-10 sm:w-14 bg-[#C8102E]" aria-hidden="true" />
              </div>
              <h2 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.2]">
                Our Vision & <span className="text-[#F87171]">Mission</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-3 font-sans leading-relaxed">
                Fostering academic rigor, ethical leadership, and continuous innovation across Southern Punjab.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseVisionMission}
              className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none border border-white/20 hover:border-white/50 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer bg-white/5 hover:bg-white/10 shrink-0 font-sans"
              aria-label="Hide Vision and Mission section"
            >
              <span>Hide Section</span>
              <span className="text-xs font-bold text-[#F87171]">↑</span>
            </button>
          </div>

          {/* Dual Column: Vision & Mission Rectangular Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Our Vision */}
            <div className="bg-[#0D2347]/85 rounded-none sm:rounded-sm p-6 sm:p-8 border border-white/12 shadow-sm relative overflow-hidden group hover:border-[#C8102E]/60 transition-colors backdrop-blur-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                  <Compass className="w-5 h-5 text-[#F87171]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[1.8px] text-[#F87171] font-sans block">
                    THE HORIZON
                  </span>
                  <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-xl sm:text-2xl font-bold text-white">
                    Our Vision
                  </h3>
                </div>
              </div>
              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed">
                To be recognized as a premier institution that inspires transformative learning, 
                technological innovation, and ethical leadership to serve the nation and global society.
              </p>
            </div>

            {/* Our Mission */}
            <div className="bg-[#0D2347]/85 rounded-none sm:rounded-sm p-6 sm:p-8 border border-white/12 shadow-sm relative overflow-hidden group hover:border-[#C8102E]/60 transition-colors backdrop-blur-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                  <Award className="w-5 h-5 text-[#F87171]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[1.8px] text-[#F87171] font-sans block">
                    THE COMMITMENT
                  </span>
                  <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-xl sm:text-2xl font-bold text-white">
                    Our Mission
                  </h3>
                </div>
              </div>
              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed">
                Empowering students through academic rigor, industry linkages, state-of-the-art facilities, 
                and holistic character building to produce agile, ethical leaders of tomorrow.
              </p>
            </div>
          </div>

          {/* Core Values Sub-Section */}
          <div className="pt-8 border-t border-white/15">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[1.8px] text-[#F87171] font-sans block mb-1">
                  CAMPUS ETHOS
                </span>
                <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-white">
                  Core Values
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-slate-300 font-sans">
                <a
                  href="#programs-section"
                  onClick={handleProgramsClick}
                  className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors cursor-pointer py-1"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F87171]" />
                </a>
                <span className="text-white/20">·</span>
                <a
                  href="#legacy-section"
                  onClick={handleLegacyClick}
                  className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors cursor-pointer py-1"
                >
                  <span>About Our Legacy</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F87171]" />
                </a>
              </div>
            </div>

            {/* 6 Core Values in Academic 3-Column Clean Rectangular Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* 1. Integrity */}
              <div className="bg-[#0D2347]/75 p-5 sm:p-6 rounded-none sm:rounded-sm border border-white/10 border-l-3 border-l-[#C8102E] shadow-2xs hover:border-white/20 transition-colors">
                <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-lg font-bold text-white mb-1.5">
                  Integrity
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We put honesty and ethical responsibility at the core of everything we do.
                </p>
              </div>

              {/* 2. Respect */}
              <div className="bg-[#0D2347]/75 p-5 sm:p-6 rounded-none sm:rounded-sm border border-white/10 border-l-3 border-l-[#C8102E] shadow-2xs hover:border-white/20 transition-colors">
                <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-lg font-bold text-white mb-1.5">
                  Respect
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We treat everyone with dignity and value the wisdom and expertise that surrounds us.
                </p>
              </div>

              {/* 3. Tolerance */}
              <div className="bg-[#0D2347]/75 p-5 sm:p-6 rounded-none sm:rounded-sm border border-white/10 border-l-3 border-l-[#C8102E] shadow-2xs hover:border-white/20 transition-colors">
                <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-lg font-bold text-white mb-1.5">
                  Tolerance
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We accept diverse views, ideas, and people even when perspectives differ.
                </p>
              </div>

              {/* 4. Commitment */}
              <div className="bg-[#0D2347]/75 p-5 sm:p-6 rounded-none sm:rounded-sm border border-white/10 border-l-3 border-l-[#C8102E] shadow-2xs hover:border-white/20 transition-colors">
                <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-lg font-bold text-white mb-1.5">
                  Commitment
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We are passionate and dedicated to rigorous work in order to achieve our goals.
                </p>
              </div>

              {/* 5. Service */}
              <div className="bg-[#0D2347]/75 p-5 sm:p-6 rounded-none sm:rounded-sm border border-white/10 border-l-3 border-l-[#C8102E] shadow-2xs hover:border-white/20 transition-colors">
                <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-lg font-bold text-white mb-1.5">
                  Service
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We believe in helping our community and working together to empower each other.
                </p>
              </div>

              {/* 6. Creativity */}
              <div className="bg-[#0D2347]/75 p-5 sm:p-6 rounded-none sm:rounded-sm border border-white/10 border-l-3 border-l-[#C8102E] shadow-2xs hover:border-white/20 transition-colors">
                <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-lg font-bold text-white mb-1.5">
                  Creativity
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We celebrate innovation, critical thinking, and bold new approaches to complex challenges.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Collapse Button */}
          <div className="mt-12 text-center border-t border-white/10 pt-8">
            <button
              type="button"
              onClick={handleCloseVisionMission}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none border border-white/20 hover:border-white/50 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all cursor-pointer bg-white/5 hover:bg-white/10 font-sans"
              aria-label="Hide Vision, Mission & Core Values"
            >
              <span>Hide Vision & Mission</span>
              <span className="text-sm font-bold text-[#F87171]">↑</span>
            </button>
          </div>

        </div>
      </section>

      {/* =======================================================================
          MIAN AMER MAHMOOD — AUTHENTIC BIOGRAPHICAL PROFILE MODAL
          Comprehensive, verified historical, academic, and civic record.
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
            className="relative w-full max-w-4xl bg-white dark:bg-[#081528] border-2 border-[#0A1931] dark:border-amber-400/40 shadow-2xl rounded-none my-auto max-h-[92vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with Academic Navy */}
            <div className="bg-[#0A1931] text-white px-5 sm:px-7 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-[#C8102E] shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-amber-400 font-sans block">
                    Institutional Founder & Leadership
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
              
              {/* Profile Hero Section — Organized exactly like other leaders */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
                <div className="w-32 sm:w-40 aspect-[3/4] shrink-0 border-2 border-slate-300 dark:border-amber-400/50 rounded-none overflow-hidden bg-[#0A1931] shadow-xs relative">
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
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8102E] dark:text-amber-400 font-sans block">
                    FOUNDER &amp; CHAIRMAN · PUNJAB GROUP &amp; UCP
                  </span>

                  <h3
                    id="modal-leader-name"
                    className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-[#0A1931] dark:text-white tracking-tight"
                  >
                    Mian Amer Mahmood (Hilal-e-Imtiaz)
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-medium">
                    Chairman, Board of Governors, University of Central Punjab (UCP) &amp; Punjab Group of Colleges (PGC)
                  </p>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                    Former City District Nazim (Mayor) of Lahore (2001–2009) · Founder, Dunya Media Group
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 text-[11px] font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                      <Award size={13} className="text-[#C8102E]" />
                      Hilal-e-Imtiaz Conferred (2012)
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                      <GraduationCap size={13} className="text-[#0A1931] dark:text-amber-400" />
                      MBA, IBA Punjab University (1981)
                    </span>
                  </div>
                </div>
              </div>

              {/* Official Contact Info & Verified Executive Portfolio */}
              <div className="bg-slate-50 dark:bg-[#0c1f3c] border border-slate-300 dark:border-white/10 p-4 sm:p-5 rounded-none space-y-3.5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#C8102E] dark:text-amber-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A1931] dark:text-white">
                      Institutional Record &amp; Official Portals
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    Verified Executive Record
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white dark:bg-[#081528] p-3 border border-slate-200 dark:border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 block">
                      University Portal
                    </span>
                    <a
                      href="https://ucp.edu.pk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A1931] dark:text-amber-400 hover:text-[#C8102E] transition-colors"
                    >
                      <Globe size={14} className="text-[#0A1931] dark:text-amber-400 shrink-0" />
                      <span>ucp.edu.pk</span>
                      <ExternalLink size={12} className="text-slate-400 ml-auto" />
                    </a>
                  </div>

                  <div className="bg-white dark:bg-[#081528] p-3 border border-slate-200 dark:border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 block">
                      Punjab Group Portal
                    </span>
                    <a
                      href="https://pgc.edu.pk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A1931] dark:text-amber-400 hover:text-[#C8102E] transition-colors"
                    >
                      <Globe size={14} className="text-[#0A1931] dark:text-amber-400 shrink-0" />
                      <span>pgc.edu.pk</span>
                      <ExternalLink size={12} className="text-slate-400 ml-auto" />
                    </a>
                  </div>

                  <div className="bg-white dark:bg-[#081528] p-3 border border-slate-200 dark:border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 block">
                      Wikipedia Reference
                    </span>
                    <a
                      href="https://en.wikipedia.org/wiki/Mian_Amer_Mahmood"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A1931] dark:text-amber-400 hover:text-[#C8102E] transition-colors"
                    >
                      <BookOpen size={14} className="text-[#C8102E] shrink-0" />
                      <span>Wikipedia Biography</span>
                      <ExternalLink size={12} className="text-slate-400 ml-auto" />
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-white/10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Categories &amp; Strategic Roles
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Educationist',
                      'Philanthropist',
                      'Founder PGC (1985)',
                      'Chairman BoG, UCP',
                      '3rd Mayor of Lahore (2001–2009)',
                      'Chairman, Dunya Media Group',
                      'Hilal-e-Imtiaz Conferred',
                    ].map((role, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-[#081528] border border-slate-300 dark:border-white/10 text-xs font-semibold text-[#0A1931] dark:text-slate-200 tracking-wide"
                      >
                        <Tag size={11} className="text-[#C8102E]" />
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strategic Vision & Motto */}
              <div className="bg-[#0A1931]/5 dark:bg-[#0A1931]/40 border-l-3 border-[#C8102E] p-4 sm:p-5 rounded-none space-y-2">
                <div className="text-xs font-mono font-bold tracking-widest text-[#C8102E] dark:text-amber-400 uppercase">
                  EMPOWERING PAKISTAN THROUGH ACCESSIBLE, MERIT-DRIVEN EDUCATION
                </div>
                <blockquote className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg italic text-[#0A1931] dark:text-white font-semibold leading-relaxed">
                  “Education is the greatest catalyst for national empowerment. When you empower a young mind with quality education, you uplift an entire generation. Our journey of over 38 years is a reflection of our commitment towards creating a better tomorrow for our society.”
                </blockquote>
              </div>

              {/* Executive Profile Statement */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#C8102E] dark:text-amber-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931] dark:text-white">
                    Executive Profile
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-[#0c1e38] p-4 rounded-none border border-slate-200 dark:border-white/10 font-sans">
                  Mian Amer Mahmood is a celebrated Pakistani educationist, philanthropist, and former City District Nazim (Mayor) of Lahore. Holding an MBA from the Institute of Business Administration (IBA), University of the Punjab, he established the Punjab College of Commerce in 1985 on Muslim Town Canal, Lahore. Through vision, institutional rigor, and dedication, he expanded PGC into Pakistan's largest academic conglomerate, encompassing over 400 college campuses across 100+ cities, chartered universities in Lahore, Bahawalpur, Islamabad, and Karachi, and an alumni network exceeding 2 million professionals.
                </p>
              </div>

              {/* Key Academic & Civic Milestones */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <GraduationCap size={16} className="text-[#C8102E] dark:text-amber-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931] dark:text-white">
                    Chartered Universities &amp; National Education Network
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 bg-slate-50 dark:bg-[#0b1b36] border border-slate-200 dark:border-white/10 space-y-1">
                    <strong className="text-[#0A1931] dark:text-amber-300 block font-bold">University of Central Punjab (UCP)</strong>
                    <p className="text-slate-600 dark:text-slate-300">
                      Chartered in 2002 via Punjab Assembly Act, establishing premier faculties in Engineering, Computing, Business, Sciences, and Arts across Lahore and the constituent campus in Bahawalpur.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-[#0b1b36] border border-slate-200 dark:border-white/10 space-y-1">
                    <strong className="text-[#0A1931] dark:text-amber-300 block font-bold">CUST Islamabad &amp; MAJU Karachi</strong>
                    <p className="text-slate-600 dark:text-slate-300">
                      Federal chartered universities providing advanced technical, bio-engineering, computing, and management education aligned with global research standards.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-[#0b1b36] border border-slate-200 dark:border-white/10 space-y-1">
                    <strong className="text-[#0A1931] dark:text-amber-300 block font-bold">Allied Schools &amp; Resource Academia</strong>
                    <p className="text-slate-600 dark:text-slate-300">
                      Over 1,400 school campuses providing standardized, holistic foundational education to more than 250,000 children across Pakistan.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-[#0b1b36] border border-slate-200 dark:border-white/10 space-y-1">
                    <strong className="text-[#0A1931] dark:text-amber-300 block font-bold">STEP (Student Excellence Program)</strong>
                    <p className="text-slate-600 dark:text-slate-300">
                      Pakistan's leading entrance preparation network, training tens of thousands of intermediate candidates annually for MDCAT, ECAT, and top engineering tests.
                    </p>
                  </div>
                </div>
              </div>

              {/* Historic Mayorship of Lahore (2001–2009) */}
              <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-1.5">
                  <Building2 size={16} className="text-[#C8102E] dark:text-amber-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931] dark:text-white">
                    Historic Urban Transformation as Mayor of Lahore (2001–2009)
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  Elected as Lahore's first City District Nazim (Mayor) under the local government system in 2001, and re-elected by overwhelming mandate for a second term in 2005. His tenure modernized Lahore's civic infrastructure:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-start gap-2 bg-slate-50 dark:bg-[#0b1b36] p-3 border border-slate-200 dark:border-white/10">
                    <CheckCircle2 size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
                    <span><strong>Lahore Ring Road:</strong> Conceptualized, planned, and initiated construction on the transformative multi-lane Ring Road orbital expressway.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-50 dark:bg-[#0b1b36] p-3 border border-slate-200 dark:border-white/10">
                    <CheckCircle2 size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
                    <span><strong>Signal-Free Canal Corridor:</strong> Engineered the comprehensive series of underpasses along the Lahore Canal, eliminating perpetual gridlocks.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-50 dark:bg-[#0b1b36] p-3 border border-slate-200 dark:border-white/10">
                    <CheckCircle2 size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
                    <span><strong>Clean Water Initiative:</strong> Commissioned over 1,000 public reverse-osmosis filtration plants delivering safe drinking water to citizens.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-50 dark:bg-[#0b1b36] p-3 border border-slate-200 dark:border-white/10">
                    <CheckCircle2 size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
                    <span><strong>Green Urban Renewal:</strong> Planted millions of trees, developed civic parks, and modernized emergency medical and rescue infrastructure.</span>
                  </div>
                </div>
              </div>

              {/* Dunya Media Group & Civic Discourse */}
              <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-1.5">
                  <Quote size={15} className="text-[#C8102E] dark:text-amber-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931] dark:text-white">
                    Civic Discourse &amp; Dunya Media Group
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3 bg-slate-50 dark:bg-[#0b1b36] border border-slate-200 dark:border-white/10">
                    <strong className="text-[#0A1931] dark:text-white block mb-1">Dunya News (Launched 2008)</strong>
                    Pioneered analytical, non-partisan broadcast television journalism, informing citizens with balanced national current affairs and educational talk shows.
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-[#0b1b36] border border-slate-200 dark:border-white/10">
                    <strong className="text-[#0A1931] dark:text-white block mb-1">Daily Roznama Dunya (Launched 2012)</strong>
                    Fastest-growing national Urdu daily newspaper in Pakistan, published simultaneously across all provincial capitals with verified investigative standards.
                  </div>
                </div>
              </div>

              {/* National Honor (Hilal-e-Imtiaz) & Philanthropy */}
              <div className="p-4 bg-amber-50/70 dark:bg-[#0e213d] border border-amber-300 dark:border-amber-700/60 rounded-none space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="text-[#C8102E] dark:text-amber-400 w-5 h-5 shrink-0" />
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#0A1931] dark:text-amber-300">
                    Hilal-e-Imtiaz Presidential Award &amp; Over Rs. 1.3 Billion in Student Scholarships
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                  In recognition of his revolutionary contributions to education and exemplary public service, Mian Amer Mahmood was conferred the <strong>Hilal-e-Imtiaz (Crescent of Excellence)</strong> in 2012 by the President of Pakistan. Under his leadership, Punjab Group and UCP have disbursed over <strong>Rs. 1.3 Billion</strong> in merit scholarships and tuition concessions, ensuring that financial limitations never obstruct a deserving student's pursuit of a world-class university degree.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 dark:bg-[#0a182e] px-5 sm:px-7 py-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
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
    </div>
  );
};
