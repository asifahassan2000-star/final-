import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Globe, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2,
  GraduationCap,
  Users
} from 'lucide-react';

interface OfferCard {
  id: number;
  title: string;
  collapsedTitle: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  highlights: string[];
  actionText: string;
  externalLink?: string;
  targetId?: string;
  actionType: 'scholarships' | 'programmes' | 'legacy' | 'facilities' | 'international' | 'apply' | 'campus-life';
  // Graphic designer palette & vectors
  theme: {
    bgGradient: string;
    accentColor: string;
    borderGlow: string;
    chipBg: string;
    numberColor: string;
    svgPattern: 'crest' | 'ribbon' | 'grid' | 'circuit' | 'globe';
  };
}

interface WhatWeOfferAccordionProps {
  onOpenApply?: (programName?: string) => void;
  onOpenProgrammesPage?: () => void;
  onOpenCampusLifePage?: () => void;
  onOpenScholarshipsPage?: () => void;
  onOpenLegacyPage?: () => void;
  onOpenFacultyPage?: (category?: string) => void;
  onOpenFacilitiesPage?: () => void;
  onScrollTo?: (id: string) => void;
}

const INTERNATIONAL_OFFICE_URL =
  'https://ucpio.ucp.edu.pk/?_gl=1%2A1bxetf4%2A_gcl_au%2AMTYwNTM0NDE2My4xNzkxMzA5NzAw%2A_ga%2AMTk1MjM5OTM3NS4xNzkxMzA5NzAx%2A_ga_9BBZL6TFYQ%2AczE3OTEzMjM3NDgkbzQkZzAkdDE3OTEzMjM3NDgkajYwJGwwJGg3MDA3Njc0MTA.';

export const WhatWeOfferAccordion: React.FC<WhatWeOfferAccordionProps> = ({
  onOpenApply,
  onOpenProgrammesPage,
  onOpenCampusLifePage,
  onOpenScholarshipsPage,
  onOpenLegacyPage,
  onOpenFacultyPage,
  onOpenFacilitiesPage,
  onScrollTo,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const cards: OfferCard[] = [
    {
      id: 1,
      title: 'Prestigious UCP Degree',
      collapsedTitle: 'Prestigious UCP Degree',
      badge: "HEC 'W4' Ranked • PGC Heritage",
      icon: Award,
      description:
        'A degree from the University of Central Punjab commands nationwide respect and global recognition. Backed by Punjab Group of Colleges—Pakistan’s largest educational network—graduates step directly into senior corporate and public roles.',
      highlights: [
        "HEC Highest 'W4' Category Accreditation",
        '300,000+ Strong Punjab Group Alumni Network',
        'Top Industry Standing & High Employability',
      ],
      actionText: 'Explore Degree & Legacy',
      actionType: 'legacy',
      theme: {
        bgGradient: 'from-[#07192F] via-[#0E284D] to-[#051426]',
        accentColor: '#D4AF37',
        borderGlow: 'rgba(212, 175, 55, 0.4)',
        chipBg: 'bg-[#D4AF37]/15 border-[#D4AF37]/35 text-[#F6E05E]',
        numberColor: 'text-[#D4AF37]/40',
        svgPattern: 'crest',
      },
    },
    {
      id: 2,
      title: 'Multiple Scholarships',
      collapsedTitle: 'Multiple Scholarships',
      badge: 'Up to 50% Tuition Assistance',
      icon: Sparkles,
      description:
        'We believe financial circumstances should never obstruct merit. UCP Bahawalpur awards merit scholarships up to 50%, 25% PGC alumni tuition fee concessions, and 25% kinship concessions for siblings.',
      highlights: [
        'Merit Scholarships up to 50% Tuition Waiver',
        '25% Tuition Fee Concession for PGC Alumni Students',
        '25% Kinship Concession (Siblings in UCP / PGC)',
      ],
      actionText: 'Calculate & View Scholarships',
      actionType: 'scholarships',
      theme: {
        bgGradient: 'from-[#630C16] via-[#8C1322] to-[#42060E]',
        accentColor: '#F59E0B',
        borderGlow: 'rgba(245, 158, 11, 0.45)',
        chipBg: 'bg-[#F59E0B]/15 border-[#F59E0B]/35 text-[#FDE68A]',
        numberColor: 'text-[#F59E0B]/40',
        svgPattern: 'ribbon',
      },
    },
    {
      id: 3,
      title: 'Diverse Programmes',
      collapsedTitle: 'Diverse Programmes',
      badge: '25+ BS & ADP Degree Pathways',
      icon: BookOpen,
      description:
        'Explore market-relevant undergraduate degrees designed in synergy with industry demands. From Artificial Intelligence and Computer Science to Business Analytics, Biotechnology, and Media, our curricula foster practical innovation.',
      highlights: [
        'Computing & IT: BS CS, ADP AI, Cyber Security & SE',
        'Business: BBA, Business Analytics, Accounting',
        'Sciences & Humanities: Biotechnology, English, Math',
      ],
      actionText: 'Explore All Programmes',
      actionType: 'programmes',
      theme: {
        bgGradient: 'from-[#0A223E] via-[#103866] to-[#06172C]',
        accentColor: '#38BDF8',
        borderGlow: 'rgba(56, 189, 248, 0.4)',
        chipBg: 'bg-[#38BDF8]/15 border-[#38BDF8]/35 text-[#BAE6FD]',
        numberColor: 'text-[#38BDF8]/40',
        svgPattern: 'grid',
      },
    },
    {
      id: 4,
      title: 'Well-Equipped Labs & World-Class Faculty',
      collapsedTitle: 'Labs & World-Class Faculty',
      badge: 'Smart Labs • PhD Mentorship',
      icon: Cpu,
      description:
        'Experience hands-on discovery in state-of-the-art computer architectures, digital electronics facilities, and advanced scientific research laboratories, mentored by distinguished PhD faculty and published academic scholars.',
      highlights: [
        'High-Performance AI & Software Engineering Labs',
        'Advanced Biochemistry & Molecular Science Suites',
        'Personalized Mentorship by Experienced PhD Mentors',
      ],
      actionText: 'Discover Labs & Faculty',
      actionType: 'facilities',
      theme: {
        bgGradient: 'from-[#06242B] via-[#0A3D4A] to-[#04171C]',
        accentColor: '#34D399',
        borderGlow: 'rgba(52, 211, 153, 0.4)',
        chipBg: 'bg-[#34D399]/15 border-[#34D399]/35 text-[#A7F3D0]',
        numberColor: 'text-[#34D399]/40',
        svgPattern: 'circuit',
      },
    },
    {
      id: 5,
      title: 'Campus Life & Co-Curricular Leadership',
      collapsedTitle: 'Campus Life & Activities',
      badge: 'Seminars • Leadership • Societies',
      icon: Users,
      description:
        'Step into an invigorating collegiate journey filled with national leadership seminars, research symposia, student-led societies, competitive sports championships, and vibrant cultural galas that cultivate vision, confidence, and character.',
      highlights: [
        'Executive Leadership Seminars & National Symposia',
        'Active Student Societies: Tech, Debate, Media & Arts',
        'Annual Sports Tournaments, Desert Jeep Rallies & Tours',
      ],
      actionText: 'Explore Campus Life Section',
      actionType: 'campus-life',
      theme: {
        bgGradient: 'from-[#0A1B3F] via-[#152E6A] to-[#06122C]',
        accentColor: '#38BDF8',
        borderGlow: 'rgba(56, 189, 248, 0.45)',
        chipBg: 'bg-[#38BDF8]/15 border-[#38BDF8]/35 text-[#BAE6FD]',
        numberColor: 'text-[#38BDF8]/40',
        svgPattern: 'globe',
      },
    },
  ];

  const handleAction = (card: OfferCard, e: React.MouseEvent) => {
    e.stopPropagation();

    if (card.externalLink) {
      window.open(card.externalLink, '_blank', 'noopener,noreferrer');
      return;
    }

    if (card.actionType === 'campus-life') {
      if (onOpenCampusLifePage) {
        onOpenCampusLifePage();
      } else if (onScrollTo) {
        onScrollTo('campus-life-section');
      }
      return;
    }

    if (card.actionType === 'scholarships' && onOpenScholarshipsPage) {
      onOpenScholarshipsPage();
      return;
    }

    if (card.actionType === 'programmes' && onOpenProgrammesPage) {
      onOpenProgrammesPage();
      return;
    }

    if (card.actionType === 'legacy' && onOpenLegacyPage) {
      onOpenLegacyPage();
      return;
    }

    if (card.actionType === 'facilities') {
      if (onOpenFacilitiesPage) {
        onOpenFacilitiesPage();
      } else if (onScrollTo) {
        onScrollTo('facilities-section');
      } else if (onOpenFacultyPage) {
        onOpenFacultyPage();
      }
      return;
    }

    if (onOpenApply) {
      onOpenApply();
    }
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  // Render graphic designer vector patterns
  const renderGraphicPattern = (type: OfferCard['theme']['svgPattern'], accentColor: string) => {
    switch (type) {
      case 'crest':
        return (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.18]"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Concentric institutional seal rings */}
            <circle cx="340" cy="200" r="170" stroke={accentColor} strokeWidth="1.2" strokeDasharray="6 4" />
            <circle cx="340" cy="200" r="140" stroke={accentColor} strokeWidth="1.8" />
            <circle cx="340" cy="200" r="110" stroke={accentColor} strokeWidth="0.8" strokeDasharray="4 4" />
            <circle cx="340" cy="200" r="75" stroke={accentColor} strokeWidth="1.5" />
            
            {/* Heraldic Shield Silhouette */}
            <path
              d="M340 145 C355 145 385 140 385 160 C385 205 340 240 340 240 C340 240 295 205 295 160 C295 140 325 145 340 145 Z"
              stroke={accentColor}
              strokeWidth="1.8"
            />
            {/* Laurels & Stars */}
            <circle cx="340" cy="180" r="14" stroke={accentColor} strokeWidth="1.2" />
            <path d="M340 162 L343 172 L354 172 L345 178 L348 188 L340 182 L332 188 L335 178 L326 172 L337 172 Z" fill={accentColor} />

            {/* Fine architectural diagonal guilloche grid */}
            <line x1="0" y1="0" x2="400" y2="400" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="80" y1="0" x2="480" y2="400" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="-80" y1="0" x2="320" y2="400" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.3" />
          </svg>
        );

      case 'ribbon':
        return (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.22]"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Flowing scholarship ribbons & award medallion rays */}
            <path
              d="M120 40 C220 80 280 200 380 260 C420 280 460 320 490 380"
              stroke={accentColor}
              strokeWidth="2"
            />
            <path
              d="M140 30 C240 70 300 190 400 250"
              stroke={accentColor}
              strokeWidth="1.2"
              strokeDasharray="5 5"
            />
            <path
              d="M80 60 C180 110 240 230 350 300"
              stroke={accentColor}
              strokeWidth="0.8"
            />
            {/* Starburst Rosette */}
            <g transform="translate(320, 140)">
              <circle cx="0" cy="0" r="55" stroke={accentColor} strokeWidth="1.4" strokeDasharray="4 3" />
              <circle cx="0" cy="0" r="42" stroke={accentColor} strokeWidth="1.8" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line
                  key={deg}
                  x1="0"
                  y1="0"
                  x2="35"
                  y2="0"
                  transform={`rotate(${deg})`}
                  stroke={accentColor}
                  strokeWidth="1"
                />
              ))}
            </g>
          </svg>
        );

      case 'grid':
        return (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.2]"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Isometric diamond facet geometry & blueprint coordinates */}
            <defs>
              <pattern id="academicGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={accentColor} strokeWidth="0.6" strokeOpacity="0.5" />
                <circle cx="40" cy="40" r="1.5" fill={accentColor} fillOpacity="0.7" />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#academicGrid)" />
            {/* Stylized Disciplines Compass & Arc */}
            <circle cx="340" cy="220" r="120" stroke={accentColor} strokeWidth="1.2" strokeDasharray="6 6" />
            <polygon
              points="340,140 370,220 340,300 310,220"
              stroke={accentColor}
              strokeWidth="1.6"
              fill={accentColor}
              fillOpacity="0.08"
            />
          </svg>
        );

      case 'circuit':
        return (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.22]"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Tech Lab & Molecular Circuit Tracks */}
            <path
              d="M80 80 H200 L250 130 H350 V240 L310 280 H180"
              stroke={accentColor}
              strokeWidth="1.4"
            />
            <path
              d="M120 120 H180 L220 160 H320"
              stroke={accentColor}
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            {/* Circuit Nodes */}
            <circle cx="200" cy="80" r="4.5" fill={accentColor} />
            <circle cx="350" cy="130" r="4.5" fill={accentColor} />
            <circle cx="350" cy="240" r="4.5" fill={accentColor} />
            <circle cx="180" cy="280" r="4.5" fill={accentColor} />
            
            {/* Molecular Hexagon Cluster */}
            <g transform="translate(300, 180)">
              <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" stroke={accentColor} strokeWidth="1.4" />
              <polygon points="45,-5 71,10 71,40 45,55 19,40 19,10" stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="0" cy="0" r="6" fill={accentColor} />
            </g>
          </svg>
        );

      case 'globe':
        return (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.2]"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Global Geodesic Longitudes & Latitudes */}
            <circle cx="330" cy="200" r="140" stroke={accentColor} strokeWidth="1.6" />
            <ellipse cx="330" cy="200" rx="95" ry="140" stroke={accentColor} strokeWidth="1.1" />
            <ellipse cx="330" cy="200" rx="45" ry="140" stroke={accentColor} strokeWidth="0.9" strokeDasharray="5 4" />
            <line x1="190" y1="200" x2="470" y2="200" stroke={accentColor} strokeWidth="1.4" />
            <line x1="210" y1="140" x2="450" y2="140" stroke={accentColor} strokeWidth="0.9" strokeDasharray="4 4" />
            <line x1="210" y1="260" x2="450" y2="260" stroke={accentColor} strokeWidth="0.9" strokeDasharray="4 4" />
            {/* International Hub Nodes */}
            <circle cx="280" cy="140" r="4" fill={accentColor} />
            <circle cx="380" cy="170" r="4" fill={accentColor} />
            <circle cx="340" cy="260" r="4" fill={accentColor} />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <section 
      className="py-20 md:py-28 lg:py-32 bg-[#F8FAFC] relative overflow-hidden select-none border-y border-slate-200/70" 
      id="what-we-offer"
      aria-label="What we offer for you"
    >
      {/* Subtle Atmospheric Watermark Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#0F2C52]/[0.035] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#A51C30]/[0.035] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Official Distinction */}
        <div className="mb-10 md:mb-12 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="mask-reveal-wrap">
                <h2
                  data-reveal="heading"
                  data-reveal-delay="0"
                  className="mask-reveal-child text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#091E3A] tracking-tight leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Campus Life, Co-Curricular Activities &amp; Leadership Experience
                </h2>
              </div>
              
              <p 
                data-reveal="paragraph"
                data-reveal-delay="120"
                className="text-sm sm:text-base text-slate-600 mt-2.5 max-w-3xl leading-relaxed font-sans font-light"
              >
                Immerse yourself in a transformative university experience enriched with prestigious leadership seminars, academic symposia, vibrant student societies, competitive sports tournaments, and co-curricular pursuits that inspire character and cultivate future leaders.
              </p>
            </div>

            <button
              type="button"
              data-reveal="card"
              data-reveal-delay="200"
              onClick={() => {
                if (onOpenCampusLifePage) {
                  onOpenCampusLifePage();
                } else if (onScrollTo) {
                  onScrollTo('campus-life-section');
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F2C52] hover:bg-[#A51C30] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer self-start sm:self-auto shrink-0 group"
            >
              <span>Explore Campus Life</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main Expanding Accordion Gallery with Graphic Designer Vector Backgrounds */}
        <div 
          data-reveal="card"
          data-reveal-delay="240"
          className="w-full"
        >
          <div
            className="flex flex-col md:flex-row gap-3 sm:gap-3.5 w-full md:h-[450px]"
            role="region"
            aria-label="Institutional pillars gallery"
          >
            {cards.map((card, index) => {
              const isExpanded = activeIndex === index;
              const IconComponent = card.icon;

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  style={{
                    flexGrow: isExpanded ? 5.4 : 1,
                    flexBasis: isExpanded ? '540px' : '92px',
                    transition:
                      'flex-grow 850ms cubic-bezier(0.22, 1, 0.36, 1), flex-basis 850ms cubic-bezier(0.22, 1, 0.36, 1), height 850ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 600ms ease, border-color 600ms ease',
                  }}
                  className={`
                    relative rounded-2xl overflow-hidden cursor-pointer select-none
                    shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_45px_rgba(7,25,47,0.25)]
                    h-[88px] md:h-full border transition-all duration-500
                    ${
                      isExpanded
                        ? `h-[460px] md:h-full md:min-w-[360px] md:max-w-[650px] ring-2 ring-white/20 border-white/30`
                        : 'h-[88px] md:h-full md:w-[92px] md:min-w-[85px] md:max-w-[108px] border-white/10 opacity-95 hover:opacity-100'
                    }
                  `}
                >
                  {/* Colored Graphic Designer Background (Official Colors & Dynamic Gradients) */}
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-br ${card.theme.bgGradient}
                      transition-transform duration-1000 ease-out
                      ${isExpanded ? 'scale-100' : 'scale-[1.03]'}
                    `}
                  />

                  {/* Flowy Graphic Designer Vector Overlay */}
                  {renderGraphicPattern(card.theme.svgPattern, card.theme.accentColor)}

                  {/* Official Watermarked University Logo in Background (Subtle & Dignified, Not A Photo) */}
                  <div className="absolute -bottom-8 -right-8 pointer-events-none select-none opacity-[0.09] transition-opacity duration-700">
                    <img
                      src="/assets/ucp-official-logo.png"
                      alt=""
                      aria-hidden="true"
                      className="w-56 h-56 object-contain filter invert brightness-200"
                    />
                  </div>

                  {/* Ambient Light Vignette for Depth */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: isExpanded
                        ? `radial-gradient(circle at 15% 20%, ${card.theme.borderGlow} 0%, transparent 60%)`
                        : `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)`,
                    }}
                  />

                  {/* Subtle Grid Accent Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

                  {/* =========================================================
                      COLLAPSED STATE (Desktop Vertical Spine / Mobile Bar)
                      ========================================================= */}
                  <div
                    className={`
                      absolute inset-0 flex items-center justify-center transition-opacity duration-500
                      ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                    `}
                  >
                    {/* Desktop Vertical Strip */}
                    <div className="hidden md:flex flex-col items-center justify-between h-full py-7 w-full px-2">
                      {/* Top: Minimal Number Tag */}
                      <span className={`text-[11px] font-mono font-bold tracking-widest ${card.theme.numberColor}`}>
                        0{card.id}
                      </span>

                      {/* Middle: Vertical Rotated Label */}
                      <div className="flex items-center justify-center my-auto">
                        <span
                          className="text-white text-[13.5px] font-semibold tracking-wider whitespace-nowrap drop-shadow-md select-none font-sans"
                          style={{
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                          }}
                        >
                          {card.collapsedTitle}
                        </span>
                      </div>

                      {/* Bottom: Floating Icon Ring */}
                      <div 
                        className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-md group-hover:scale-110 transition-transform"
                        style={{ color: card.theme.accentColor }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Mobile Horizontal Strip when collapsed */}
                    <div className="flex md:hidden items-center justify-between w-full px-5 h-full bg-black/20 backdrop-blur-[2px]">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center border border-white/20 shadow-sm"
                          style={{ color: card.theme.accentColor }}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <span className="text-white font-semibold text-sm tracking-wide block">
                            {card.title}
                          </span>
                          <span className="text-[11px] text-white/60 font-mono">
                            Pillar 0{card.id}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-white/80 font-medium px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
                        Expand →
                      </span>
                    </div>
                  </div>

                  {/* =========================================================
                      EXPANDED STATE WITH FLOWY ANIMATIONS
                      ========================================================= */}
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        key={`content-${card.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.4 }}
                        className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 text-white"
                      >
                        {/* Top Badge & Counter */}
                        <motion.div
                          initial={{ opacity: 0, y: -12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-center justify-between gap-3"
                        >
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md border text-[11.5px] font-medium tracking-wide shadow-sm ${card.theme.chipBg}`}>
                            <IconComponent className="w-3.5 h-3.5" />
                            <span>{card.badge}</span>
                          </div>

                          <div className="flex items-center gap-2 font-mono text-xs">
                            <span className="text-white/40">PILLAR</span>
                            <span className="font-bold text-white/90">0{card.id} / 05</span>
                          </div>
                        </motion.div>

                        {/* Core Content Area */}
                        <div className="max-w-[98%] md:max-w-[78%] my-auto py-2">
                          
                          {/* Heading */}
                          <motion.h3
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.20, ease: [0.22, 1, 0.36, 1] }}
                            className="text-2xl sm:text-[26px] md:text-[28px] font-bold text-white mb-2.5 leading-snug tracking-tight drop-shadow-md"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                          >
                            {card.title}
                          </motion.h3>

                          {/* Flowy Colored Accent Divider */}
                          <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 60, opacity: 1 }}
                            transition={{ duration: 0.55, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                            className="h-[2.5px] rounded-full mb-3.5 shadow-sm"
                            style={{
                              background: `linear-gradient(90deg, ${card.theme.accentColor} 0%, transparent 100%)`,
                            }}
                          />

                          {/* Description */}
                          <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.30, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[13px] sm:text-[13.5px] text-white/90 leading-relaxed font-sans font-light drop-shadow-sm mb-4 line-clamp-3 sm:line-clamp-none"
                          >
                            {card.description}
                          </motion.p>

                          {/* Feature Highlight Bullets */}
                          <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-1.5 mb-5 hidden sm:block"
                          >
                            {card.highlights.map((item, hIdx) => (
                              <div key={hIdx} className="flex items-center gap-2 text-xs text-white/80 font-sans">
                                <CheckCircle2 
                                  className="w-3.5 h-3.5 flex-shrink-0" 
                                  style={{ color: card.theme.accentColor }} 
                                />
                                <span>{item}</span>
                              </div>
                            ))}
                          </motion.div>

                          {/* Interactive Call to Action Button */}
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <button
                              type="button"
                              onClick={(e) => handleAction(card, e)}
                              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white text-[#0A1931] text-xs font-bold uppercase tracking-wider hover:bg-slate-50 active:scale-95 transition-all shadow-lg hover:shadow-xl group cursor-pointer"
                            >
                              <span>{card.actionText}</span>
                              {card.externalLink ? (
                                <ExternalLink className="w-3.5 h-3.5 text-[#A51C30] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              ) : (
                                <ArrowRight className="w-3.5 h-3.5 text-[#A51C30] transition-transform group-hover:translate-x-1" />
                              )}
                            </button>
                          </motion.div>
                        </div>

                        {/* Bottom Institutional Seal Mark */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.48 }}
                          className="flex items-center justify-between text-[11px] text-white/60 pt-2 border-t border-white/10"
                        >
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-1.5 h-1.5 rounded-full" 
                              style={{ backgroundColor: card.theme.accentColor }}
                            />
                            <span className="font-sans">University of Central Punjab • Bahawalpur Campus</span>
                          </div>
                          <span className="hidden sm:inline font-mono text-[10px] text-white/40 tracking-wider">
                            OFFICIAL ACCREDITATION
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Dots below for Mobile Quick-Switch */}
          <div
            className="flex md:hidden justify-center items-center gap-2 mt-5"
            role="tablist"
            aria-label="Pillars navigation"
          >
            {cards.map((card, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={card.id}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to ${card.title}`}
                  className={`
                    transition-all duration-300 rounded-full cursor-pointer
                    ${
                      isActive
                        ? 'w-7 h-2.5 bg-[#0A1931] shadow-sm'
                        : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                    }
                  `}
                />
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatWeOfferAccordion;
