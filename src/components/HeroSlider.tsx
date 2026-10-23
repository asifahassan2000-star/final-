import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, ArrowRight, Search, User
} from 'lucide-react';
import { HERO_SLIDES } from '../data/ucpData';
import ucpBwpBuilding5Local from '../assets/images/ucp_bwp_building_5.jpg';
import heroCampusHighlightImg from '../assets/images/hero_campus_highlight.jpg';
import ucpBuildingBlueprintImg from '../assets/images/ucp_building_blueprint.jpg';

interface HeroSliderProps {
  onOpenApply: () => void;
  onOpenFee: () => void;
  onScrollTo: (sectionId: string) => void;
  onSelectFaculty: (facultyId: string) => void;
  onOpenProgrammesPage?: () => void;
  onOpenLegacyPage?: () => void;
  onOpenCampusLifePage?: () => void;
  onOpenPortal?: () => void;
}

// 3.6 seconds per slide (reduced by 1 second from 4.6s for faster, dynamic transitions)
const SLIDE_DURATION = 3600;

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onOpenApply,
  onOpenFee,
  onScrollTo,
  onSelectFaculty,
  onOpenProgrammesPage,
  onOpenLegacyPage,
  onOpenCampusLifePage,
  onOpenPortal,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visitedSlides, setVisitedSlides] = useState<Set<number>>(() => new Set([0]));

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  // On-demand slide loading: add current slide and the upcoming slide to visited set
  useEffect(() => {
    setVisitedSlides((prev) => {
      const next = new Set(prev);
      next.add(currentSlide);
      next.add((currentSlide + 1) % totalSlides);
      return next;
    });
  }, [currentSlide, totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-advance timer (transitions 1 second earlier than before)
  useEffect(() => {
    if (isHovered) return;

    const timer = window.setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Resolve slide image (handling local asset references)
  const getSlideImage = (slide: typeof HERO_SLIDES[0]) => {
    if (slide.image) {
      return slide.image;
    }
    if (slide.id === 'bahawalpur-excellence') {
      return slide.image || '/assets/campus/hero_campus_night_flagship.webp';
    }
    if (slide.id === 'campus-tomorrow') {
      return ucpBuildingBlueprintImg;
    }
    if (slide.id === 'discover-future') {
      return '/assets/facilities/comp-lab-1.jpg';
    }
    if (slide.id === 'next-generation') {
      return slide.image || '/assets/hero/hero-journey-community.jpg';
    }
    return slide.image;
  };

  const handleAction = (actionKey: string) => {
    if (actionKey === 'apply') onOpenApply();
    else if (actionKey === 'programs') {
      if (onOpenProgrammesPage) {
        onOpenProgrammesPage();
      } else {
        window.open('https://ucpcolleges.pgc.edu/campus-network/', '_blank', 'noopener,noreferrer');
      }
    }
    else if (actionKey === 'legacy') {
      if (onOpenLegacyPage) {
        onOpenLegacyPage();
      } else {
        onScrollTo('heritage-section');
      }
    }
    else if (actionKey === 'fee') {
      onOpenFee();
    }
    else if (actionKey === 'tour' || actionKey === 'campus-life') {
      if (onOpenCampusLifePage) {
        onOpenCampusLifePage();
      } else {
        onScrollTo('campus-section');
      }
    }
    else if (actionKey === 'fmmc') {
      onSelectFaculty('fmmc');
    }
    else {
      onScrollTo(actionKey);
    }
  };

  return (
    <div 
      id="hero-slider-section" 
      className="hero-section relative w-full bg-[#07192f] overflow-hidden select-none z-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="University of Central Punjab Bahawalpur Campus Hero Showcase"
    >
      {/* =========================================================================
          1. FULL-VIEWPORT CINEMATIC BACKGROUND SLIDES (KEN BURNS EFFECT)
          ========================================================================= */}
      <div className="relative w-full h-[88vh] sm:h-[90vh] lg:h-[92vh] min-h-[580px] sm:min-h-[640px] max-h-[960px] overflow-hidden">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          const imageSrc = getSlideImage(slide);

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* Background Image Container with Cinematic Ken Burns Zoom (1 to 1.08 over 10s) & High Clarity */}
              <div className="absolute inset-0 overflow-hidden bg-slate-900">
                {visitedSlides.has(index) ? (
                  <img
                    src={imageSrc}
                    alt={slide.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index === 0 ? "high" : "low"}
                    sizes="(max-width: 768px) 100vw, 100vw"
                    referrerPolicy="no-referrer"
                    style={{
                      transform: 'none',
                    }}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (slide.fallbackImage && target.src !== slide.fallbackImage) {
                        target.src = slide.fallbackImage;
                      } else if (target.src.endsWith('.webp')) {
                        target.src = target.src.replace('.webp', '.jpg');
                      } else if (slide.id === 'bahawalpur-excellence') {
                        target.src = '/images/wmw3sjb_UCP-Bahawalpur-Campus-at-Night.png';
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900" />
                )}

                {/* Subtle, Luminous Non-Dark Scrim (Preserving Full Image Brilliance) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
              </div>

              {/* Slide Content: Elegant International University Typography & Layout */}
              <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-28 sm:pb-36 lg:pb-36">
                <div className="max-w-3xl text-left space-y-3 sm:space-y-4 lg:space-y-5 px-4 sm:px-0 -translate-y-5 sm:-translate-y-8 lg:-translate-y-10">
                  
                  {/* World-Class Editorial Serif Heading with Clip-Path Reveal */}
                  <div className="overflow-hidden py-1">
                    <h1 
                      style={{
                        clipPath: isActive 
                          ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                          : 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                        transform: isActive ? 'translateY(0)' : 'translateY(36px)',
                        transition: 'clip-path 1100ms cubic-bezier(0.16, 1, 0.3, 1), transform 1100ms cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: isActive ? '200ms' : '0ms',
                      }}
                      className="font-['Playfair_Display',serif] text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-lg text-balance max-w-2xl"
                    >
                      {slide.title}
                    </h1>
                  </div>

                  {/* Clean, Modern Sans-Serif Body (Inter): Staggered supporting text */}
                  <p 
                    className={`text-xs sm:text-base lg:text-lg text-slate-100 font-sans font-normal leading-relaxed max-w-xl drop-shadow transition-all duration-700 ease-out line-clamp-2 sm:line-clamp-none ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: isActive ? '380ms' : '0ms' }}
                  >
                    {slide.subtitle}
                  </p>

                  {/* Clean Non-Distracting Text with Arrow (Unobtrusive to image view) */}
                  <div 
                    className={`flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-3 transition-all duration-600 ease-out ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: isActive ? '460ms' : '0ms' }}
                  >
                    {/* Primary Text with Arrow */}
                    <button
                      id={`hero-cta-primary-${slide.id}`}
                      onClick={() => handleAction(slide.primaryCta.action)}
                      className="group inline-flex items-center gap-2 text-white hover:text-amber-300 font-semibold text-xs sm:text-base tracking-wide transition-all duration-200 cursor-pointer drop-shadow-md bg-transparent border-none p-0 focus:outline-none"
                    >
                      <span className="border-b border-white/60 group-hover:border-amber-300 pb-0.5 transition-colors">
                        {slide.primaryCta.label}
                      </span>
                      <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1.5 text-amber-400 group-hover:text-amber-300 shrink-0" />
                    </button>

                    {/* Secondary Text with Arrow (Subtle, non-distracting) */}
                    {slide.secondaryCta && (
                      <button
                        id={`hero-cta-secondary-${slide.id}`}
                        onClick={() => handleAction(slide.secondaryCta!.action)}
                        className="group inline-flex items-center gap-1.5 text-slate-200 hover:text-white font-medium text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer drop-shadow-sm bg-transparent border-none p-0 focus:outline-none opacity-90 hover:opacity-100"
                      >
                        <span className="border-b border-transparent group-hover:border-white/60 pb-0.5 transition-colors">
                          {slide.secondaryCta.label}
                        </span>
                        <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1 text-slate-300 group-hover:text-white shrink-0" />
                      </button>
                    )}
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* =========================================================================
            2. EDITORIAL PREV / NEXT LATERAL ARROWS (FROSTED GLASS)
            ========================================================================= */}
        <div className="flex absolute z-30 inset-y-0 left-2 sm:left-4 lg:left-8 items-center pointer-events-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/40 hover:bg-[#a30f16] text-white border border-white/20 hover:border-transparent backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="flex absolute z-30 inset-y-0 right-2 sm:right-4 lg:right-8 items-center pointer-events-none">
          <button
            onClick={nextSlide}
            className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/40 hover:bg-[#a30f16] text-white border border-white/20 hover:border-transparent backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
            aria-label="Next Slide"
          >
            <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* =========================================================================
            3. SLIDE INDICATOR PILLS (Bottom Left Navigation)
            ========================================================================= */}
        <div className="absolute z-25 bottom-16 sm:bottom-16 lg:bottom-[30px] left-4 sm:left-8 lg:left-[50px] flex items-center gap-1.5 sm:gap-2">
          {HERO_SLIDES.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentSlide(dotIdx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                dotIdx === currentSlide
                  ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-[#a30f16] shadow-lg ring-1 ring-white/50'
                  : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* =========================================================================
          4. TRUST BAR — MOBILE BOTTOM BAR (lg:hidden) & DESKTOP (hidden lg:block)
          ========================================================================= */}
      {/* Mobile Bottom Bar: Target <1024px only */}
      <div 
        aria-label="Why Choose UCP Bahawalpur"
        className="lg:hidden absolute bottom-0 left-0 right-0 bg-black/45 backdrop-blur-md px-4 py-3 z-30 select-none border-t border-white/10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div 
            onClick={() => onOpenProgrammesPage ? onOpenProgrammesPage() : onScrollTo('what-we-offer')}
            className="cursor-pointer active:opacity-80 flex flex-col justify-center"
          >
            <p className="text-sm md:text-base font-bold text-white leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              Career-Focused Education
            </p>
            <p className="text-xs text-white/75 mt-0.5 leading-tight truncate">
              Industry Linkages &amp; Scholarships
            </p>
          </div>

          <div 
            onClick={() => onScrollTo('campus-section')}
            className="cursor-pointer active:opacity-80 flex flex-col justify-center"
          >
            <p className="text-sm md:text-base font-bold text-white leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              Purpose-Built Campus
            </p>
            <p className="text-xs text-white/75 mt-0.5 leading-tight truncate">
              Modern Labs &amp; Smart Facilities
            </p>
          </div>

          <div 
            onClick={() => onOpenProgrammesPage ? onOpenProgrammesPage() : onScrollTo('faculties-section')}
            className="cursor-pointer active:opacity-80 flex flex-col justify-center"
          >
            <p className="text-sm md:text-base font-bold text-white leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              HEC Recognized Degrees
            </p>
            <p className="text-xs text-white/75 mt-0.5 leading-tight truncate">
              25 Accredited Programs
            </p>
          </div>

          <div 
            onClick={() => onOpenLegacyPage ? onOpenLegacyPage() : onScrollTo('heritage-section')}
            className="cursor-pointer active:opacity-80 flex flex-col justify-center"
          >
            <p className="text-sm md:text-base font-bold text-white leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              Punjab Group Legacy
            </p>
            <p className="text-xs text-white/75 mt-0.5 leading-tight truncate">
              40 Years of Educational Excellence
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Code: Existing as is with hidden lg:block - DO NOT CHANGE */}
      <section 
        aria-label="Why Choose UCP Bahawalpur - Institutional Highlights"
        className="hidden lg:block trust-bar-no-bg absolute z-25 lg:right-[50px] lg:bottom-[30px] left-auto select-none pointer-events-auto"
        style={{ background: 'none' }}
      >
        <div 
          className="flex flex-nowrap items-center gap-[30px]"
          style={{ background: 'none' }}
        >
          {/* Career-Focused Education */}
          <div 
            onClick={() => onOpenProgrammesPage ? onOpenProgrammesPage() : onScrollTo('what-we-offer')}
            className="item group cursor-pointer flex flex-col text-left transition-opacity duration-200 hover:opacity-90 shrink-0"
            style={{ background: 'none' }}
          >
            <h4 
              className="font-['Poppins',sans-serif] text-[14px] font-bold text-white leading-[1.2] mb-[3px] tracking-normal transition-colors group-hover:text-amber-200 whitespace-nowrap"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
            >
              Career-Focused Education
            </h4>
            <p 
              className="font-['Inter',sans-serif] text-[10px] font-normal text-white/85 leading-[1.2] whitespace-nowrap"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
            >
              Industry Linkages & Scholarships
            </p>
          </div>

          {/* Purpose-Built Campus */}
          <div 
            onClick={() => onScrollTo('campus-section')}
            className="item group cursor-pointer flex flex-col text-left transition-opacity duration-200 hover:opacity-90 shrink-0"
            style={{ background: 'none' }}
          >
            <h4 
              className="font-['Poppins',sans-serif] text-[14px] font-bold text-white leading-[1.2] mb-[3px] tracking-normal transition-colors group-hover:text-amber-200 whitespace-nowrap"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
            >
              Purpose-Built Campus
            </h4>
            <p 
              className="font-['Inter',sans-serif] text-[10px] font-normal text-white/85 leading-[1.2] whitespace-nowrap"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
            >
              Modern Labs & Smart Facilities
            </p>
          </div>

          {/* HEC Recognized Degrees */}
          <div 
            onClick={() => onOpenProgrammesPage ? onOpenProgrammesPage() : onScrollTo('faculties-section')}
            className="item group cursor-pointer flex flex-col text-left transition-opacity duration-200 hover:opacity-90 shrink-0"
            style={{ background: 'none' }}
          >
            <h4 
              className="font-['Poppins',sans-serif] text-[14px] font-bold text-white leading-[1.2] mb-[3px] tracking-normal transition-colors group-hover:text-amber-200 whitespace-nowrap"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
            >
              HEC Recognized Degrees
            </h4>
            <p 
              className="font-['Inter',sans-serif] text-[10px] font-normal text-white/85 leading-[1.2] whitespace-nowrap"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
            >
              25 Accredited Programs
            </p>
          </div>

          {/* Punjab Group Legacy */}
          <div 
            onClick={() => onOpenLegacyPage ? onOpenLegacyPage() : onScrollTo('heritage-section')}
            className="item group cursor-pointer flex flex-col text-left transition-opacity duration-200 hover:opacity-90 shrink-0"
            style={{ background: 'none' }}
          >
            <h4 
              className="font-['Poppins',sans-serif] text-[14px] font-bold text-white leading-[1.2] mb-[3px] tracking-normal transition-colors group-hover:text-amber-200 whitespace-nowrap"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
            >
              Punjab Group Legacy
            </h4>
            <p 
              className="font-['Inter',sans-serif] text-[10px] font-normal text-white/85 leading-[1.2] whitespace-nowrap"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
            >
              40 Years of Educational Excellence
            </p>
          </div>

          {/* Minimal Corner Utilities: Student Portal & Search (Not highlighted) */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/20 self-center shrink-0">
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-ucp-search'));
              }}
              className="cursor-pointer flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-xs font-normal"
              title="Search (Ctrl+K)"
            >
              <Search size={14} className="text-white/60" />
              <span>Search</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenPortal && onOpenPortal()}
              className="cursor-pointer flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-xs font-normal"
              title="Student Portal Login"
            >
              <User size={14} className="text-white/60" />
              <span>Student Portal</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
