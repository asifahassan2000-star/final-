import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Compass, ShieldCheck, Award } from 'lucide-react';

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
        // 1. Subtle upward movement for the Welcome heading and message
        if (leftCol) {
          gsap.fromTo(
            leftCol,
            { y: 25 },
            {
              y: -25,
              ease: 'none',
              scrollTrigger: {
                trigger: welcomeSection,
                start: 'top 85%',
                end: 'bottom 15%',
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        // 2. Blueprint moves at a slower rate than the portrait (optical depth)
        if (blueprint) {
          gsap.fromTo(
            blueprint,
            { y: -10, scale: 0.98 },
            {
              y: 25,
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

        // 3. Director portrait moves at an independent, restrained parallax rate
        if (portraitCircle) {
          gsap.fromTo(
            portraitCircle,
            { y: 35 },
            {
              y: -35,
              ease: 'none',
              scrollTrigger: {
                trigger: welcomeSection,
                start: 'top 85%',
                end: 'bottom 15%',
                scrub: 1.1,
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
    <div ref={rootRef} className="relative w-full overflow-hidden bg-white selection:bg-[#0A1931] selection:text-white">
      {/* =======================================================================
          SECTION 1: A WARM WELCOME TO UCPIANS
          Clean editorial presentation inspired by Oxford, Harvard, and NUST.
      ======================================================================= */}
      <section
        ref={welcomeSectionRef}
        id="welcome-ucp-section"
        className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center justify-center py-16 sm:py-20 lg:py-24 bg-white"
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
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#0A1931] font-sans">
                WELCOME TO UCP BAHAWALPUR
              </span>
              <div className="h-[2px] w-10 sm:w-14 bg-[#C8102E]" aria-hidden="true" />
            </div>

            {/* Main Heading: A Warm Welcome to UCPians */}
            <h2 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-3xl sm:text-4xl lg:text-[45px] font-bold text-[#0A1931] tracking-tight leading-[1.18] mb-6 sm:mb-8 text-balance">
              A Warm Welcome to <span className="text-[#0A1931]">UCPians</span>
            </h2>

            {/* Welcome Message: Styled as an elegant editorial quotation */}
            <div className="relative mb-8 max-w-2xl">
              {/* Sophisticated oversized opening quotation mark */}
              <span 
                className="font-serif text-5xl sm:text-6xl text-[#C8102E]/80 leading-none select-none float-left mr-3 -mt-1"
                aria-hidden="true"
              >
                “
              </span>
              <p className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg lg:text-[20px] font-normal text-[#1E293B] leading-[1.78] italic">
                Welcome to UCP Bahawalpur, where we are committed to academic excellence, 
                personal growth, and preparing our students for a rapidly changing world. 
                As Campus Director, I am proud to lead our mission of empowering student potential through 
                industry-aligned degree programs, cutting-edge laboratories, and world-class faculty. 
                At UCP Bahawalpur, your ambition meets boundless opportunity.
              </p>
            </div>

            {/* Learn More → text link: opens Vision & Mission section on click */}
            <div className="pt-1 mb-8">
              <a
                href="#vision-mission-section"
                onClick={handleLearnMoreClick}
                className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#0A1931] hover:text-[#C8102E] transition-colors py-1 cursor-pointer font-sans"
                aria-label={isVisionMissionOpen ? "Hide Vision, Mission, and Core Values" : "Learn More about Our Vision, Mission, and Core Values"}
                aria-expanded={isVisionMissionOpen}
                aria-controls="vision-mission-section"
              >
                <span className="relative pb-0.5">
                  {isVisionMissionOpen ? 'Hide Vision & Mission' : 'Learn More'}
                  <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#C8102E] transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="text-[#C8102E] font-bold transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true">
                  {isVisionMissionOpen ? '↑' : '→'}
                </span>
              </a>
            </div>

            {/* Subdued institutional trust markers (Clean unboxed metadata) */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-5 border-t border-slate-200/80 text-xs sm:text-sm text-slate-600 font-sans">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8102E]" />
                <span className="font-semibold text-slate-800">HEC Recognized</span>
                <span className="text-slate-400">·</span>
                <span>W4 Highest Category</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C8102E]" />
                <span className="font-semibold text-slate-800">Punjab Group Legacy</span>
                <span className="text-slate-400">·</span>
                <span>40+ Years of Excellence</span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              RIGHT COLUMN — DIRECTOR PORTRAIT & ARCHITECTURAL BLUEPRINT
              ------------------------------------------------------------------- */}
          <div
            ref={portraitColRef}
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
                  className="w-full h-full object-contain opacity-[0.22] mix-blend-multiply"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      '/assets/welcome/ucp_building_blueprint_lines.png';
                  }}
                />

                {/* Gentle fade gradient toward the left text column */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/70" />
              </div>
            </div>

            {/* Director Portrait Container */}
            <div
              ref={portraitCircleRef}
              className="relative z-10 flex flex-col items-center will-change-transform"
            >
              {/* Delicate concentric framing: thin secondary border + crisp navy outline */}
              <div className="relative p-2.5 sm:p-3 rounded-full border border-slate-200/90 bg-white/70 shadow-sm backdrop-blur-[2px]">
                <div className="w-56 h-56 sm:w-68 sm:h-68 lg:w-76 lg:h-76 rounded-full overflow-hidden border-2 border-[#0A1931] shadow-2xl bg-[#0A1931] ring-4 ring-white">
                  <img
                    src="/assets/welcome/director-welcome.jpg"
                    alt="Prof. Dr. Hamid Iqbal, Director UCP Bahawalpur Campus"
                    className="w-full h-full object-cover object-[center_top] select-none block"
                    loading="eager"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://i.ibb.co/5hzSMywr/IMG-3544.png';
                    }}
                  />
                </div>
              </div>

              {/* Name and Designation underneath in elegant typography */}
              <div className="text-center mt-5 sm:mt-6">
                <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-xl sm:text-2xl font-bold text-[#0A1931] tracking-tight">
                  Prof. Dr. Hamid Iqbal
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 tracking-[0.14em] uppercase font-sans mt-1">
                  Director, UCP Bahawalpur Campus
                </p>
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
    </div>
  );
};
