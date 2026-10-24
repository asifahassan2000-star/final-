import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, Users, Sparkles, Calendar, MapPin, 
  Compass, Award, BookOpen, Music, Flag, Maximize2
} from 'lucide-react';
import { FadingStackLightbox } from './FadingStackLightbox';
import { UcpEliteNetworkSection } from './UcpEliteNetworkSection';
import { CAMPUS_EVENTS_DATA } from '../data/campusEventsData';

export interface EventMarqueeMoment {
  id: string;
  eventId: string;
  eventName: string;
  imageSrc: string;
  fallbackSrc: string;
  alt: string;
}

// Authentic project assets from src/assets/images and public/assets
import studentPortraitImg from '../assets/images/bs_psychology_user.webp';
import bbaImg from '../assets/images/program_bba.webp';
import cyberSecurityImg from '../assets/images/program_cyber_security.jpg';

const businessSeminarImg = '/assets/campus/11_academics_classroom.jpg';
const computingLabImg = '/assets/facilities/comp-lab-1.jpg';
const libraryImg = '/assets/facilities/library-main-large.jpg';
const scienceLabImg = '/assets/facilities/comp-lab-2.jpg';

// Authentic campus assets from public/assets/campus
const concertImg = '/assets/campus/campus-concert-live-music.png';
const concertFallback = '/images/dwVXXsjv_image-11.png';
const cholistanHaveliSingingImg = '/assets/campus/haveli_cholistan_student_singing.jpg';
const cholistanHaveliSingingFallback = '/images/7dwzJ7HH_Whats-App-Image-2026-10-11-at-11-12-56-PM.jpg';
const rhythmCampusLifeImg = '/assets/campus/campus_life_rhythm_featured.jpg';
const rhythmCampusLifeFallback = '/images/NBMmfPv_Whats-App-Image-2026-10-09-at-8-49-16-AM.jpg';
const corridorImg = '/assets/campus/6_campus_life_decorated_corridor.jpg';
const courtyardImg = '/assets/campus/8_campus_life_courtyard.jpg';
const nightCampusImg = '/assets/campus/3_campus_after_hours_night.jpg';
const lawnImg = '/assets/campus/8_campus_life_courtyard.jpg';
const hallwayImg = '/assets/campus/10_campus_sunlit_hallway.jpg';
const redCarpetImg = '/assets/campus/4_admissions_entrance_red_carpet.jpg';
const closingDramaticImg = '/assets/campus/14_closing_dramatic_campus.jpg';

interface CampusLifeProps {
  onOpenCampusLifePage?: () => void;
}

interface MarqueeItem {
  id: string;
  title: string;
  tag: string;
  image: string;
  subtitle: string;
}

export const CampusLife: React.FC<CampusLifeProps> = ({ onOpenCampusLifePage }) => {
  // Scroll reveal visibility flags for each block (true by default for instant rendering)
  const [headerVisible, setHeaderVisible] = useState(true);
  const [spreadVisible, setSpreadVisible] = useState(true);
  const [marqueeHeaderVisible, setMarqueeHeaderVisible] = useState(true);

  // Fading Stack Lightbox state
  const [stackLightboxOpen, setStackLightboxOpen] = useState(false);
  const [stackLightboxImages, setStackLightboxImages] = useState<string[]>([]);
  const [stackLightboxCategory, setStackLightboxCategory] = useState<string>('Campus Life');

  const openStackLightbox = (images: string[], categoryTitle: string = 'Campus Life') => {
    setStackLightboxImages(images);
    setStackLightboxCategory(categoryTitle);
    setStackLightboxOpen(true);
  };

  const corridorList = [
    '/assets/campus-life/shogran-valley-tour-1.jpg',
    '/assets/campus-life/campus-life-culture-1.jpg',
    '/assets/campus-life/campus-life-culture-2.jpg',
    cholistanHaveliSingingImg,
    rhythmCampusLifeImg,
    concertImg,
    corridorImg,
    courtyardImg,
    nightCampusImg,
    hallwayImg,
    lawnImg,
  ];
  const courtyardList = [
    courtyardImg,
    '/assets/campus-life/shogran-valley-tour-1.jpg',
    '/assets/campus-life/campus-life-culture-1.jpg',
    concertImg,
    corridorImg,
    hallwayImg,
    lawnImg,
    redCarpetImg,
  ];
  const concertList = [concertImg, cholistanHaveliSingingImg, rhythmCampusLifeImg, courtyardImg, nightCampusImg, closingDramaticImg];
  const nightCampusList = [nightCampusImg, concertImg, corridorImg, courtyardImg, closingDramaticImg, hallwayImg];

  // Fixed static images for home page Campus Life section (no automatic cycling)
  const currentCorridorImg = cholistanHaveliSingingImg;
  const currentCourtyardImg = courtyardImg;
  const currentNightCampusImg = nightCampusImg;

  const headerRef = useRef<HTMLDivElement>(null);
  const spreadRef = useRef<HTMLDivElement>(null);
  const marqueeHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === headerRef.current) setHeaderVisible(true);
          if (entry.target === spreadRef.current) setSpreadVisible(true);
          if (entry.target === marqueeHeaderRef.current) setMarqueeHeaderVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.12,
      rootMargin: '40px 0px -40px 0px',
    });

    if (headerRef.current) observer.observe(headerRef.current);
    if (spreadRef.current) observer.observe(spreadRef.current);
    if (marqueeHeaderRef.current) observer.observe(marqueeHeaderRef.current);

    // Fallback timer so animations always display quickly
    const fallbackTimer = setTimeout(() => {
      setHeaderVisible(true);
      setSpreadVisible(true);
      setMarqueeHeaderVisible(true);
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Curated 16 high-impact authentic event moments (one per key event) for lightning-fast performance
  const streamImages = React.useMemo<EventMarqueeMoment[]>(() => {
    return CAMPUS_EVENTS_DATA.slice(0, 16).map((event) => {
      const img = event.images[0] || { src: '', fallbackSrc: '' };
      return {
        id: `curated-${event.id}`,
        eventId: event.id,
        eventName: event.title,
        imageSrc: img.src,
        fallbackSrc: img.fallbackSrc || img.src,
        alt: `${event.title} — UCP Bahawalpur`,
      };
    });
  }, []);

  return (
    <>
    <section 
      id="campus-section" 
      className="relative py-[100px] bg-[#FDFBF7] text-[#0A1931] border-b border-[#0A1931]/10 overflow-hidden"
      aria-labelledby="campus-life-heading"
    >
      {/* Subtle Fine Academic Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#0A1931 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* ====================================================================
            1. SOPHISTICATED SECTION HEADING
            "Life at UCP Bahawalpur"
            Small label: "CAMPUS LIFE"
            Supporting text: "Beyond the classroom, every experience becomes part of the UCP journey."
            ==================================================================== */}
        <header 
          ref={headerRef}
          className={`max-w-3xl mb-16 sm:mb-24 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
          }`}
        >
          {/* Small label: CAMPUS LIFE & STUDENT CULTURE with official red accent line */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.28em] text-[#C8102E]">
              CAMPUS LIFE & STUDENT CULTURE
            </span>
            <span className="h-px w-10 bg-[#C8102E]/60" aria-hidden="true" />
          </div>

          {/* Main Title: Celebrations, Culture & Campus Life with Smooth Mask Reveal */}
          <div className="overflow-hidden">
            <h2
              id="campus-life-heading"
              className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-bold text-[#0A1931] tracking-tight leading-[1.12] mb-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ 
                fontFamily: "'Cormorant Garamond', 'Libre Baskerville', 'Playfair Display', Georgia, serif",
                transform: headerVisible ? 'translateY(0)' : 'translateY(100%)',
              }}
            >
              Celebrations, Culture &amp; Campus Life
            </h2>
          </div>

          {/* Supporting Text: Beyond the classroom, every experience becomes part of the UCP journey. */}
          <p className="text-lg sm:text-xl text-slate-700 font-serif italic leading-relaxed border-l-2 border-[#C8102E] pl-4 sm:pl-5 mb-5">
            From live musical concerts and decorated corridors to open courtyards, every moment becomes an unforgettable chapter of the UCP journey.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl">
            A vibrant collegiate atmosphere of student camaraderie, live concerts, cultural festivals, open-air courtyards, and collaborative student activities that foster lifelong friendships and creative expression.
          </p>
        </header>

        {/* ====================================================================
            2. ASYMMETRIC EDITORIAL SPREAD — LARGE CURVED/ROUNDED PHOTOGRAPHY
            Features:
            - Left: Large vertical curved photograph (Decorated Corridor IMAGE 06)
            - Right top: Expansive curved arched photograph (Courtyard IMAGE 08)
            - Right bottom: Refined editorial narrative with elegant typography
            ==================================================================== */}
        <div 
          ref={spreadRef}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-28 sm:mb-36 transition-all duration-800 ease-out ${
            spreadVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left Column: Striking Large Curved Vertical Editorial Image */}
          <div className="lg:col-span-6">
            <div className="relative group">
              {/* Primary Anchor: Cholistan Haveli Student Singing Evening Session with full size frame */}
              <div 
                onClick={() => openStackLightbox(corridorList, 'Cholistan Haveli Evening Musical Session')}
                className="relative w-full aspect-[3/2] overflow-hidden rounded-[28px_16px_36px_16px] border border-[#0A1931]/10 bg-slate-900 shadow-[0_16px_40px_rgba(10,25,49,0.07)] cursor-pointer hover:brightness-105 transition-all duration-300"
              >
                <img decoding="async" key={currentCorridorImg}
                  src={currentCorridorImg}
                  alt="Student Life - Best vibes of students singing at Cholistan Haveli during evening session at UCP Bahawalpur"
                  loading="eager"
                  className="w-full h-full object-cover object-center transition-all duration-1000 ease-out group-hover:scale-[1.02] animate-in fade-in"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = cholistanHaveliSingingFallback;
                  }}
                />
              </div>

              {/* Minimalist Editorial Under-Caption (Clean layout, no text over image) */}
              <div className="mt-4 px-2">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#C8102E] font-semibold block mb-1">
                  CHOLISTAN HAVELI • EVENING MUSICAL SESSION
                </span>
                <h3 
                  className="font-serif text-xl sm:text-2xl font-bold text-[#0F2C61] leading-tight mb-1.5"
                  style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
                >
                  Unforgettable Evening Vibes: Students Singing at Cholistan Haveli
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed max-w-lg">
                  Experiencing the quintessential spirit of collegiate life — students gathered in heartfelt singing and acoustic melodies against the majestic evening glow of historic Cholistan Haveli.
                </p>
              </div>

              {/* Decorative Subtle Accent Tag */}
              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#0A1931]/10 shadow-lg text-[11px] font-mono uppercase tracking-wider text-[#0A1931]">
                <Sparkles size={13} className="text-[#C8102E]" />
                <span>Student Music Vibe</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Community Leadership */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-7">
            {/* Editorial Narrative Block */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 
                  className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0A1931] leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
                >
                  A Vibrant Ecosystem of Student Engagement
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                  At UCP Bahawalpur, learning thrives in conversation and shared creative moments. Between classes, students gather in lush quads, experience live musical concerts, organize cultural galas, and lead community initiatives.
                </p>
              </div>

              {/* Distinctive Feature Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-[#0A1931]/10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0A1931] font-bold uppercase tracking-wider">
                    <Users size={14} className="text-[#C8102E]" />
                    <span>Active Student Activities & Clubs</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Student-led engagement forums spanning Tech, Media, Arts, Discussions, and Creative Pursuits.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0A1931] font-bold uppercase tracking-wider">
                    <Music size={14} className="text-[#C8102E]" />
                    <span>Live Concerts & Traditions</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Annual musical concerts, cultural galas, celebratory corridors, and regional excursions across Pakistan.
                  </p>
                </div>
              </div>

              {/* Clean Editorial Action Link */}
              {onOpenCampusLifePage && (
                <div className="pt-2">
                  <button
                    onClick={onOpenCampusLifePage}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0A1931] hover:text-[#C8102E] transition-colors cursor-pointer group"
                  >
                    <span>View Dedicated Campus Life Archive</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5 text-[#C8102E]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>



        {/* ====================================================================
            4. INFINITE HORIZONTAL IMAGE MARQUEE SECTION
            Heading:
            "Moments That Define Campus Life"
            Below it:
            "Explore the people, experiences, events and memories that make UCP Bahawalpur more than a place to study."
            Continuous movement from LEFT TO RIGHT with smooth hover pause.
            Large, clearly visible, premium proportions, no tiny thumbnails.
            ==================================================================== */}
        <div 
          ref={marqueeHeaderRef}
          className={`space-y-10 sm:space-y-12 transition-all duration-700 ease-out ${
            marqueeHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
          }`}
        >
          {/* Header above Marquee */}
          <div className="text-center max-w-3xl mx-auto space-y-3 px-4">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.26em] text-[#C8102E]">
              CURATED RETROSPECTIVE
            </span>
            <h3 
              className="text-2xl sm:text-4xl font-serif font-bold text-[#0A1931] tracking-tight leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
            >
              Moments That Define Campus Life
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-2xl mx-auto">
              Explore the people, experiences, events and memories that make UCP Bahawalpur more than a place to study.
            </p>
          </div>

          {/* Marquee Outer Container with Edge Fade Masks */}
          <div className="marquee-container relative w-full overflow-hidden py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            
            {/* Left & Right Editorial Fades for Seamless Viewport Transitions */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#FDFBF7] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#FDFBF7] to-transparent z-20 pointer-events-none" />

            {/* Seamless Infinite Marquee Track Moving LEFT TO RIGHT with all Campus Life Images */}
            <div 
              className="animate-marquee-ltr flex items-center gap-3.5 sm:gap-6 md:gap-8 select-none"
              style={{
                animationDuration: `${Math.max(streamImages.length * 4.2, 55)}s`,
              }}
            >
              
              {/* First Sequence of All Campus Life Images */}
              {streamImages.map((item, idx) => {
                const imgSrc = item.imageSrc || item.fallbackSrc;

                return (
                  <div 
                    key={`mq-first-${item.id}-${idx}`}
                    className="group/card relative w-[210px] xs:w-[230px] sm:w-[340px] md:w-[420px] aspect-[16/11] flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-[#0A1931]/10 bg-slate-900 shadow-[0_8px_24px_rgba(10,25,49,0.06)] cursor-pointer hover:brightness-105 transition-all duration-300"
                    onClick={() => {
                      const eventImages = CAMPUS_EVENTS_DATA.find(e => e.id === item.eventId)?.images.map(img => img.src) || [imgSrc];
                      openStackLightbox(eventImages, item.eventName);
                    }}
                  >
                    <img 
                      src={item.imageSrc}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.dataset.tried) {
                          target.dataset.tried = 'true';
                          target.src = item.fallbackSrc;
                        }
                      }}
                    />
                    
                    {/* Contrast Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931]/90 via-[#0A1931]/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover/card:opacity-95" />

                    {/* Exact Event Name and Pic — No numbers or generic labels */}
                    <div className="absolute bottom-2.5 left-3.5 right-3.5 sm:bottom-6 sm:left-6 sm:right-6 text-white pointer-events-none">
                      <h4 
                        className="font-serif text-xs sm:text-base lg:text-xl font-bold text-white leading-tight drop-shadow-md line-clamp-1"
                        style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
                      >
                        {item.eventName}
                      </h4>
                    </div>
                  </div>
                );
              })}

              {/* Exact Duplicated Sequence for Perfect Gapless Infinite Loop (Left-to-Right) */}
              {streamImages.map((item, idx) => {
                const imgSrc = item.imageSrc || item.fallbackSrc;

                return (
                  <div 
                    key={`mq-second-${item.id}-${idx}`}
                    className="group/card relative w-[210px] xs:w-[230px] sm:w-[340px] md:w-[420px] aspect-[16/11] flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-[#0A1931]/10 bg-slate-900 shadow-[0_8px_24px_rgba(10,25,49,0.06)] cursor-pointer hover:brightness-105 transition-all duration-300"
                    onClick={() => {
                      const eventImages = CAMPUS_EVENTS_DATA.find(e => e.id === item.eventId)?.images.map(img => img.src) || [imgSrc];
                      openStackLightbox(eventImages, item.eventName);
                    }}
                    aria-hidden="true"
                  >
                    <img 
                      src={item.imageSrc}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.dataset.tried) {
                          target.dataset.tried = 'true';
                          target.src = item.fallbackSrc;
                        }
                      }}
                    />
                    
                    {/* Contrast Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931]/90 via-[#0A1931]/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover/card:opacity-95" />

                    {/* Exact Event Name and Pic — No numbers or generic labels */}
                    <div className="absolute bottom-2.5 left-3.5 right-3.5 sm:bottom-6 sm:left-6 sm:right-6 text-white pointer-events-none">
                      <h4 
                        className="font-serif text-xs sm:text-base lg:text-xl font-bold text-white leading-tight drop-shadow-md line-clamp-1"
                        style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
                      >
                        {item.eventName}
                      </h4>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>

      </div>

      {/* Fading Stack Lightbox Modal */}
      <FadingStackLightbox
        isOpen={stackLightboxOpen}
        onClose={() => setStackLightboxOpen(false)}
        images={stackLightboxImages}
        categoryName={stackLightboxCategory}
      />
    </section>

    {/* UCP ELITE STUDENT NETWORK — Volunteer Team Members Section */}
    <UcpEliteNetworkSection />
    </>
  );
};

export default CampusLife;
