import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, Users, Sparkles, Calendar, MapPin, 
  Compass, Award, BookOpen, Music, Flag
} from 'lucide-react';
import { FadingStackLightbox } from './FadingStackLightbox';
import { UcpEliteNetworkSection } from './UcpEliteNetworkSection';
import { CAMPUS_GALLERY_IMAGES, CampusGalleryImage } from '../data/campusGalleryData';

// Helper to determine clean category tag from alt text
const getCampusLifeCategory = (alt: string): string => {
  const lower = alt.toLowerCase();
  if (lower.includes('concert') || lower.includes('musical')) return 'Annual Concert';
  if (lower.includes('celebration') || lower.includes('gala')) return 'Celebration & Gala';
  if (lower.includes('activities') || lower.includes('club') || lower.includes('engagement')) return 'Student Activities';
  if (lower.includes('gathering') || lower.includes('community')) return 'Campus Community';
  if (lower.includes('outdoor') || lower.includes('lawn') || lower.includes('courtyard')) return 'Courtyards & Quads';
  if (lower.includes('stage') || lower.includes('auditorium') || lower.includes('theatre')) return 'Stage & Performances';
  if (lower.includes('festiv')) return 'Campus Festivities';
  if (lower.includes('sports') || lower.includes('olympiad')) return 'Athletics & Sports';
  return 'Campus Life';
};

const getCampusLifeTitle = (alt: string): string => {
  const cleaned = alt.replace(/^UCP Bahawalpur\s*/i, '').trim();
  return cleaned || 'Campus Life Moment';
};

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
const concertFallback = 'https://i.ibb.co/dwVXXsjv/image-11.png';
const cholistanHaveliSingingImg = '/assets/campus/haveli_cholistan_student_singing.jpg';
const cholistanHaveliSingingFallback = 'https://i.ibb.co/7dwzJ7HH/Whats-App-Image-2026-10-11-at-11-12-56-PM.jpg';
const rhythmCampusLifeImg = '/assets/campus/campus_life_rhythm_featured.jpg';
const rhythmCampusLifeFallback = 'https://i.ibb.co/NBMmfPv/Whats-App-Image-2026-10-09-at-8-49-16-AM.jpg';
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
  const [nightSpreadVisible, setNightSpreadVisible] = useState(true);
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

  const corridorList = [cholistanHaveliSingingImg, rhythmCampusLifeImg, concertImg, corridorImg, courtyardImg, nightCampusImg, hallwayImg, lawnImg];
  const courtyardList = [courtyardImg, concertImg, corridorImg, hallwayImg, lawnImg, redCarpetImg];
  const concertList = [concertImg, cholistanHaveliSingingImg, rhythmCampusLifeImg, courtyardImg, nightCampusImg, closingDramaticImg];
  const nightCampusList = [nightCampusImg, concertImg, corridorImg, courtyardImg, closingDramaticImg, hallwayImg];

  // Fixed static images for home page Campus Life section (no automatic cycling)
  const currentCorridorImg = cholistanHaveliSingingImg;
  const currentCourtyardImg = courtyardImg;
  const currentNightCampusImg = nightCampusImg;

  const headerRef = useRef<HTMLDivElement>(null);
  const spreadRef = useRef<HTMLDivElement>(null);
  const nightSpreadRef = useRef<HTMLDivElement>(null);
  const marqueeHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === headerRef.current) setHeaderVisible(true);
          if (entry.target === spreadRef.current) setSpreadVisible(true);
          if (entry.target === nightSpreadRef.current) setNightSpreadVisible(true);
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
    if (nightSpreadRef.current) observer.observe(nightSpreadRef.current);
    if (marqueeHeaderRef.current) observer.observe(marqueeHeaderRef.current);

    // Fallback timer so animations always display quickly
    const fallbackTimer = setTimeout(() => {
      setHeaderVisible(true);
      setSpreadVisible(true);
      setNightSpreadVisible(true);
      setMarqueeHeaderVisible(true);
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Helper to shuffle images for randomized streaming on page load
  const shuffleImages = (arr: CampusGalleryImage[]): CampusGalleryImage[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // State holds all 59 images from Campus Life section, randomized and continuously flowing
  const [streamImages, setStreamImages] = useState<CampusGalleryImage[]>(() => {
    return shuffleImages(CAMPUS_GALLERY_IMAGES);
  });

  // Continuously rotate / update cards randomly so any image from campus life section comes here and changes continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setStreamImages((prev) => {
        if (!prev.length) return prev;
        // Select a random slot and swap with another random image from the complete pool
        const targetSlot = Math.floor(Math.random() * prev.length);
        const randomPoolImg = CAMPUS_GALLERY_IMAGES[Math.floor(Math.random() * CAMPUS_GALLERY_IMAGES.length)];
        const next = [...prev];
        next[targetSlot] = randomPoolImg;
        return next;
      });
    }, 4000);

    return () => clearInterval(timer);
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
          {/* Small label: CAMPUS LIFE & STUDENT CULTURE with subtle gold accent line */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.28em] text-[#C5A880]">
              CAMPUS LIFE & STUDENT CULTURE
            </span>
            <span className="h-px w-10 bg-[#C5A880]/60" aria-hidden="true" />
          </div>

          {/* Main Title: Celebrations, Culture & Campus Life */}
          <h2
            id="campus-life-heading"
            className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-bold text-[#0A1931] tracking-tight leading-[1.12] mb-5"
            style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', 'Playfair Display', Georgia, serif" }}
          >
            Celebrations, Culture & Campus Life
          </h2>

          {/* Supporting Text: Beyond the classroom, every experience becomes part of the UCP journey. */}
          <p className="text-lg sm:text-xl text-slate-700 font-serif italic leading-relaxed border-l-2 border-[#C5A880] pl-4 sm:pl-5 mb-5">
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
                <img
                  key={currentCorridorImg}
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
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#C5A880] font-semibold block mb-1">
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
                <Sparkles size={13} className="text-[#C5A880]" />
                <span>Student Music Vibe</span>
              </div>
            </div>
          </div>

          {/* Right Column: Arched Courtyard & Annual Live Concert Photography & Editorial Narrative */}
          <div className="lg:col-span-6 flex flex-col space-y-7">
            
            {/* Visual Showcase: Central Courtyards & Annual Live Concert */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Arched Courtyard Image */}
              <div 
                onClick={() => openStackLightbox([courtyardImg, corridorImg, hallwayImg, lawnImg, redCarpetImg], 'Student Gathering Grounds')}
                className="relative group overflow-hidden rounded-t-[50px] rounded-b-2xl border border-[#0A1931]/10 bg-slate-100 shadow-[0_12px_30px_rgba(10,25,49,0.06)] aspect-[4/3] w-full cursor-pointer hover:brightness-105 transition-all duration-300"
              >
                <img
                  key={currentCourtyardImg}
                  src={currentCourtyardImg}
                  alt="Central Courtyards and Student Gathering Grounds at UCP Bahawalpur"
                  loading="eager"
                  className="w-full h-full object-cover object-center transition-all duration-1000 ease-out group-hover:scale-[1.03] animate-in fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white pointer-events-none">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A880] block font-semibold">
                    COURTYARD
                  </span>
                  <span className="font-serif text-sm sm:text-base font-bold text-white block">
                    Student Gathering Grounds
                  </span>
                </div>
              </div>

              {/* Annual Live Concert Image */}
              <div 
                onClick={() => openStackLightbox(concertList, 'Annual Live Concert & Musical Performance')}
                className="relative group overflow-hidden rounded-2xl rounded-tr-[50px] border border-[#0A1931]/10 bg-slate-900 shadow-[0_12px_30px_rgba(10,25,49,0.06)] aspect-[4/3] w-full cursor-pointer hover:brightness-105 transition-all duration-300"
              >
                <img
                  src={concertImg}
                  alt="Annual Live Concert and Musical Performance at UCP Bahawalpur"
                  loading="eager"
                  className="w-full h-full object-cover object-center transition-all duration-1000 ease-out group-hover:scale-[1.03] animate-in fade-in"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = concertFallback;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931]/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white pointer-events-none">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A880] block font-semibold">
                    ANNUAL CONCERT
                  </span>
                  <span className="font-serif text-sm sm:text-base font-bold text-white block">
                    Live Campus Performance
                  </span>
                </div>
                {/* Live Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#A51C30]/90 text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>Live Concert</span>
                </div>
              </div>
            </div>

            {/* Editorial Narrative Block */}
            <div className="space-y-6 pt-1">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#A51C30]" />
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#A51C30] font-bold">
                    COMMUNITY & LEADERSHIP
                  </span>
                </div>
                <h3 
                  className="text-2xl sm:text-3xl font-serif font-bold text-[#0A1931] leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
                >
                  A Vibrant Ecosystem of Student Engagement
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                  At UCP Bahawalpur, learning thrives in conversation and shared creative moments. Between classes, students gather in lush quads, experience live musical concerts, organize cultural galas, and lead community initiatives.
                </p>
              </div>

              {/* Sophisticated Distinctive Columns (No childish cards or heavy borders) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#0A1931]/10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0A1931] font-bold uppercase tracking-wider">
                    <Users size={14} className="text-[#C5A880]" />
                    <span>Active Student Activities & Clubs</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Student-led engagement forums spanning Tech, Media, Arts, Discussions, and Creative Pursuits.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0A1931] font-bold uppercase tracking-wider">
                    <Music size={14} className="text-[#C5A880]" />
                    <span>Live Concerts & Traditions</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Annual musical concerts, cultural galas, celebratory corridors, and regional excursions across Pakistan.
                  </p>
                </div>
              </div>

              {/* Clean Editorial Action Link */}
              {onOpenCampusLifePage && (
                <div className="pt-2">
                  <button
                    onClick={onOpenCampusLifePage}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0A1931] hover:text-[#A51C30] transition-colors cursor-pointer group"
                  >
                    <span>View Dedicated Campus Life Archive</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5 text-[#C5A880]" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ====================================================================
            3. CINEMATIC WIDE ARCHITECTURAL PANORAMA — "CAMPUS AFTER HOURS"
            Large, immersive photograph with rounded curvature and refined typography
            ==================================================================== */}
        <div 
          ref={nightSpreadRef}
          className={`mb-32 sm:mb-40 transition-all duration-800 ease-out ${
            nightSpreadVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div 
            onClick={() => openStackLightbox([nightCampusImg, corridorImg, courtyardImg, closingDramaticImg, hallwayImg], 'Campus After Hours')}
            className="relative group overflow-hidden rounded-[28px] sm:rounded-[40px] border border-[#0A1931]/10 bg-[#07192F] shadow-[0_20px_50px_rgba(10,25,49,0.08)] cursor-pointer hover:brightness-105 transition-all duration-300"
          >
            <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden">
              <img
                key={currentNightCampusImg}
                src={currentNightCampusImg}
                alt="Campus After Hours - Illuminated Architectural View of UCP Bahawalpur"
                loading="eager"
                className="w-full h-full object-cover object-center transition-all duration-1000 ease-out group-hover:scale-[1.025] animate-in fade-in"
              />

              {/* Scrim for rich evening atmosphere */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07192F]/90 via-[#07192F]/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white pointer-events-none">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#C5A880] font-bold">
                      CAMPUS AFTER HOURS
                    </span>
                    <span className="h-px w-8 bg-[#C5A880]/50" />
                  </div>

                  <h3 
                    className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white drop-shadow-md mb-2 sm:mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
                  >
                    Where Academic Passion Extends into the Evening
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed max-w-xl">
                    As twilight settles over the Cholistan horizon, the campus architecture illuminates, welcoming evening symposiums, hackathons, robotics labs, and collaborative team research that carry forward student curiosity.
                  </p>
                </div>

                <div className="pointer-events-auto flex-shrink-0">
                  {onOpenCampusLifePage && (
                    <button
                      onClick={onOpenCampusLifePage}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs font-mono uppercase tracking-widest backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95 cursor-pointer group"
                    >
                      <span>Explore Experiences</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 text-[#C5A880]" />
                    </button>
                  )}
                </div>
              </div>

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
            <span className="text-xs font-mono font-bold uppercase tracking-[0.26em] text-[#C5A880]">
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
              className="animate-marquee-ltr flex items-center gap-6 sm:gap-8"
              style={{
                animationDuration: `${Math.max(streamImages.length * 4.2, 60)}s`,
              }}
            >
              
              {/* First Sequence of All Campus Life Images */}
              {streamImages.map((item, idx) => {
                const title = getCampusLifeTitle(item.alt);
                const tag = getCampusLifeCategory(item.alt);
                const imgSrc = item.localSrc || item.fallbackSrc;

                return (
                  <div 
                    key={`mq-first-${item.id}-${idx}`}
                    className="group/card relative w-[320px] sm:w-[400px] md:w-[440px] aspect-[16/11] flex-shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#0A1931]/10 bg-slate-100 shadow-[0_10px_30px_rgba(10,25,49,0.06)] cursor-pointer hover:brightness-105 transition-all duration-300"
                    onClick={() => {
                      const surrounding = [
                        imgSrc,
                        ...streamImages.map(m => m.localSrc || m.fallbackSrc).filter(u => u !== imgSrc)
                      ].slice(0, 10);
                      openStackLightbox(surrounding, tag);
                    }}
                  >
                    <img
                      src={item.localSrc}
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
                    
                    {/* Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931]/85 via-[#0A1931]/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover/card:opacity-95" />

                    {/* Editorial Tag & Title Overlay */}
                    <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white pointer-events-none">
                      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C5A880] font-semibold block mb-1">
                        {tag}
                      </span>
                      <h4 
                        className="font-serif text-base sm:text-lg lg:text-xl font-bold text-white leading-tight drop-shadow-xs mb-1 line-clamp-1"
                        style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
                      >
                        {title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-200 line-clamp-1 font-sans">
                        UCP Bahawalpur • Life Beyond the Classroom
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Exact Duplicated Sequence for Perfect Gapless Infinite Loop (Left-to-Right) */}
              {streamImages.map((item, idx) => {
                const title = getCampusLifeTitle(item.alt);
                const tag = getCampusLifeCategory(item.alt);
                const imgSrc = item.localSrc || item.fallbackSrc;

                return (
                  <div 
                    key={`mq-second-${item.id}-${idx}`}
                    className="group/card relative w-[320px] sm:w-[400px] md:w-[440px] aspect-[16/11] flex-shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#0A1931]/10 bg-slate-100 shadow-[0_10px_30px_rgba(10,25,49,0.06)] cursor-pointer hover:brightness-105 transition-all duration-300"
                    onClick={() => {
                      const surrounding = [
                        imgSrc,
                        ...streamImages.map(m => m.localSrc || m.fallbackSrc).filter(u => u !== imgSrc)
                      ].slice(0, 10);
                      openStackLightbox(surrounding, tag);
                    }}
                    aria-hidden="true"
                  >
                    <img
                      src={item.localSrc}
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
                    
                    {/* Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931]/85 via-[#0A1931]/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover/card:opacity-95" />

                    {/* Editorial Tag & Title Overlay */}
                    <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white pointer-events-none">
                      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C5A880] font-semibold block mb-1">
                        {tag}
                      </span>
                      <h4 
                        className="font-serif text-base sm:text-lg lg:text-xl font-bold text-white leading-tight drop-shadow-xs mb-1 line-clamp-1"
                        style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
                      >
                        {title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-200 line-clamp-1 font-sans">
                        UCP Bahawalpur • Life Beyond the Classroom
                      </p>
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
