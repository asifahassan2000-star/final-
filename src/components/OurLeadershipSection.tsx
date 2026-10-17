import React, { useState, useEffect, useRef } from 'react';
import { Quote, X, ArrowUpRight, GraduationCap, Building2, BookMarked, Check, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export interface LeadershipPortfolioItem {
  role: string;
  organizations: string[];
}

export interface LeaderBiography {
  executiveProfile?: string;
  visionQuote?: string;
  motto?: string;
  summary: string;
  qualification?: string;
  researchExpertise?: string;
  highlights: string[];
  awards?: string[];
}

export interface LeaderProfile {
  id: string;
  name: string;
  designation: string;
  secondaryDesignation?: string;
  officialRole: string;
  portraitUrl: string;
  fallbackUrl: string;
  messageTitle: string;
  fullMessage: string[];
  portfolio?: LeadershipPortfolioItem[];
  biography?: LeaderBiography;
}

const LEADERSHIP_PROFILES: LeaderProfile[] = [
  {
    id: 'mian-amer-mahmood',
    name: 'Mian Amer Mahmood',
    designation: 'Chairman, Board of Governors',
    secondaryDesignation: 'Founder & Patron-in-Chief, Punjab Group of Colleges (PGC)',
    officialRole: 'Chairman, University of Central Punjab',
    portraitUrl: '/assets/campus/mian_amer_mahmood.png',
    fallbackUrl: 'https://i.ibb.co/99s2Cmqj/mian-ameer.png',
    messageTitle: 'Chairman’s Message',
    fullMessage: [
      'Welcome to the University of Central Punjab (UCP), a nationally recognized university for academic excellence, and a vibrant community of scholars and learners committed to serve the nation and humanity across the world. You are becoming a member of a student community which will charm you by its cultural, demographic, and economic diversity.',
      'UCP puts strong emphasis on multi-disciplinary teaching and research across disciplines. You will have the opportunity to pursue and choose from a number of courses from bachelors to doctoral degrees according to your area of interest. Whether you want to be an entrepreneur or a professional manager, our faculty will ensure that you are prepared for a successful career in industry, public sector, or the business world.',
      'Take advantage of the opportunities provided to you. If you take the initiative for planning your own life, there will be many professionals to help and advise. Let your quest for knowledge be limitless; we will do our best to make your educational experience rich, transformative, and memorable.'
    ],
    portfolio: [
      {
        role: 'Chairman, Board of Governors',
        organizations: ['University of Central Punjab (UCP)']
      },
      {
        role: 'Chancellor',
        organizations: [
          'Mohammad Ali Jinnah University (MAJU)',
          'Capital University of Science & Technology (CUST)'
        ]
      },
      {
        role: 'Chairman',
        organizations: [
          'Punjab Colleges',
          'Resource Academia',
          'Allied Schools',
          'EFA Schools'
        ]
      },
      {
        role: 'Chief Executive',
        organizations: [
          'Dunya News Network',
          'Lahore News'
        ]
      }
    ],
    biography: {
      summary: 'Mian Amer Mahmood is a celebrated Pakistani educationalist, visionary entrepreneur, and nation-builder. As the founder and Chairman of the Punjab Group of Colleges (PGC) and University of Central Punjab (UCP), he created Pakistan’s largest educational conglomerate spanning top chartered universities, colleges, and over 1,500 schools.',
      highlights: [
        'Founder of Pakistan’s largest educational network comprising 3 chartered universities, 400+ college campuses, and 1,500+ schools.',
        'Chief Executive of Dunya Media Group, advancing quality journalism through Dunya News HD, Lahore News, and Roznama Dunya.',
        'Spearheaded historic merit scholarship disbursements exceeding 1.3 Billion PKR annually for deserving scholars across Pakistan.',
        'Formed international strategic alliances including CNN Academy and leading research institutions across Europe and North America.'
      ],
      awards: [
        'Conferred Hilal-e-Imtiaz (Crescent of Excellence) by the President of Pakistan for exemplary public service and educational leadership.',
        'Served as the elected City District Nazim (Mayor) of Lahore from 2001 to 2009, overseeing monumental civic, educational, and healthcare transformations.'
      ]
    }
  },
  {
    id: 'prof-hamid-iqbal',
    name: 'Prof. Hamid Iqbal',
    designation: 'Director UCP Bahawalpur',
    secondaryDesignation: 'Executive Directorate, Campus Governance',
    officialRole: 'Director, UCP Bahawalpur Campus',
    portraitUrl: '/assets/leadership/prof_hamid_iqbal_director.png',
    fallbackUrl: 'https://i.ibb.co/5hzSMywr/IMG-3544.png',
    messageTitle: 'Director’s Message',
    fullMessage: [
      'The University of Central Punjab is a nationally recognized institution dedicated to academic excellence, impactful research, and the holistic development of students within a diverse and inclusive community. UCP equips its students with the adaptability, critical thinking, creativity, and entrepreneurial mindset required to succeed in a rapidly evolving society. Through world-class resources and a committed faculty, the University ensures a transformative, enriching, and memorable educational experience.'
    ],
    biography: {
      executiveProfile: 'A distinguished academic executive and institutional leader with nearly two decades of leadership experience across the higher education and college education sectors, including 12 years in senior directorial and institutional leadership roles with the Punjab Group of Colleges (PGC). Currently serving as Director, University of Central Punjab (UCP) and Punjab Colleges, Bahawalpur Cluster, he brings a wealth of expertise in strategic leadership, academic administration, institutional development, and organizational excellence. With a strong commitment to academic quality, people development, and operational effectiveness, he has consistently focused on strengthening institutional frameworks, empowering academic teams, fostering a culture of performance and accountability, and translating strategic vision into sustainable, measurable outcomes. His leadership reflects a forward-thinking approach to educational advancement, institutional growth, and the pursuit of excellence across the academic landscape.',
      visionQuote: '“Translating strategic vision into sustainable, measurable outcomes and empowering academic teams toward institutional excellence.”',
      motto: 'STRATEGIC VISION · INSTITUTIONAL EXCELLENCE',
      summary: 'A distinguished academic executive and institutional leader with nearly two decades of leadership experience across the higher education and college education sectors, including 12 years in senior directorial and institutional leadership roles with the Punjab Group of Colleges (PGC).',
      highlights: [
        'Nearly two decades of leadership experience across the higher education and college education sectors.',
        '12 years in senior directorial and institutional leadership roles with the Punjab Group of Colleges (PGC).',
        'Director, University of Central Punjab (UCP) and Punjab Colleges, Bahawalpur Cluster.',
        'Proven expertise in strategic leadership, academic administration, institutional development, and organizational excellence.',
        'Dedicated commitment to strengthening institutional frameworks, empowering academic teams, and fostering performance and accountability.'
      ]
    }
  },
  {
    id: 'prof-dr-aurangzaib-virk',
    name: 'Prof. Dr. Aurangzaib Virk',
    designation: 'Head UCP Bahawalpur Campus',
    secondaryDesignation: 'Principal, University of Central Punjab (UCP) Bahawalpur',
    officialRole: 'Head of Campus & Principal, UCP Bahawalpur',
    portraitUrl: '/assets/campus/prof_aurangzaib_virk.png',
    fallbackUrl: 'https://i.ibb.co/hRDYDCRp/IMG-3542.png',
    messageTitle: 'Head of Campus & Principal’s Message',
    fullMessage: [
      'The University of Central Punjab warmly welcomes students and parents to an institution committed to academic excellence, integrity, and transformative education.',
      'UCP provides a rigorous and supportive learning environment that develops adaptable, skilled, and value-driven graduates prepared to meet future challenges.',
      'Through dedicated faculty, strong alumni engagement, and a culture of innovation, UCP nurtures leaders equipped to contribute meaningfully to society and the nation.'
    ],
    biography: {
      executiveProfile: 'Vision-driven and accomplished Academic Executive and Institutional Leader with extensive experience in the higher education and college education sectors, including nearly a decade of leadership and institutional experience with the Punjab Group of Colleges (PGC). Currently serving as Principal, University of Central Punjab (UCP), Bahawalpur Campus, with a strong track record of leading academic institutions, strengthening institutional systems, developing people, and translating strategic priorities into measurable academic and organizational outcomes.',
      visionQuote: '“Building Academic Excellence, Empowering People, Creating a Sustainable Future.”',
      motto: 'STRONGER INSTITUTIONS · BRIGHTER FUTURES',
      summary: 'Vision-driven and accomplished Academic Executive and Institutional Leader with extensive experience in the higher education and college education sectors, including nearly a decade of leadership and institutional experience with the Punjab Group of Colleges (PGC).',
      qualification: 'PhD in Management Sciences (Strategic Management)',
      researchExpertise: 'Research expertise in sustainability, environmental management and strategic organizational practices. Actively engaged with contemporary themes related to environmental sustainability and pollution control in Pakistan\'s leather sector, in coordination with the Pakistan Tanners Association, contributing academic and strategic perspectives toward addressing environmental challenges and promoting more sustainable industrial practices.',
      highlights: [
        'Nearly a decade of leadership experience across higher and college education, including senior leadership with Punjab Group of Colleges (PGC).',
        'Current service as Principal, University of Central Punjab (UCP), Bahawalpur Campus.',
        'Strong track record of leading academic institutions, strengthening institutional systems, and developing people.',
        'Translating strategic priorities into measurable academic and organizational outcomes.'
      ]
    }
  }
];

interface OurLeadershipSectionProps {
  onOpenApply?: () => void;
  onScrollTo?: (sectionId: string) => void;
}

const MobileLeaderCard: React.FC<{
  leader: LeaderProfile;
  onSelect: (leader: LeaderProfile) => void;
}> = ({ leader, onSelect }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="lg:hidden bg-white rounded-none sm:rounded-sm border border-slate-300 p-4 sm:p-5 shadow-xs">
      <div className="flex gap-4 items-start">
        {/* Square rectangular portrait frame */}
        <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-none overflow-hidden shrink-0 border border-slate-300 bg-slate-100">
          <img
            src={leader.portraitUrl}
            alt={leader.name}
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== leader.fallbackUrl) {
                target.src = leader.fallbackUrl;
              }
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg font-bold text-[#0A1931] tracking-tight leading-snug">
            {leader.name}
          </h3>
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[1.2px] text-[#C8102E] font-semibold mt-0.5 font-sans">
            {leader.designation}
          </p>
          <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed font-sans">
            {leader.fullMessage[0]}
          </p>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 w-full flex items-center justify-between text-xs font-semibold text-[#0A1931] bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-none cursor-pointer transition-colors border border-slate-300 font-sans"
      >
        <span>{expanded ? 'Show less' : 'Read Full Message'}</span>
        <span className={`transform transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}>→</span>
      </button>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-200 text-xs sm:text-sm text-slate-700 space-y-3 font-sans">
          {leader.secondaryDesignation && (
            <p className="text-xs text-slate-500 italic">
              {leader.secondaryDesignation}
            </p>
          )}
          {leader.fullMessage.map((paragraph, pIdx) => (
            <p key={pIdx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
          <div className="pt-2">
            <button
              onClick={() => onSelect(leader)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A1931] hover:text-white bg-slate-50 hover:bg-[#0A1931] px-3.5 py-2 rounded-none border border-slate-300 transition-all cursor-pointer shadow-2xs"
            >
              <span>View Profile & Credentials</span>
              <ArrowUpRight size={13} className="text-[#C8102E]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const OurLeadershipSection: React.FC<OurLeadershipSectionProps> = () => {
  const [selectedLeader, setSelectedLeader] = useState<LeaderProfile | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Immediate fallback ensures heading is always visible
    const timer = setTimeout(() => setIsHeaderVisible(true), 150);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '80px' }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedLeader(null);
      }
    };
    if (selectedLeader) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedLeader]);

  return (
    <section
      id="leadership-section"
      className="relative bg-slate-50/70 text-slate-900 py-16 sm:py-20 lg:py-24 border-t border-b border-slate-200 select-none overflow-visible scroll-mt-20"
      aria-labelledby="leadership-heading"
    >
      {/* Anchor alias for existing chairman-section references */}
      <div id="chairman-section" className="absolute -top-20" aria-hidden="true" />

      {/* =========================================================================
          SECTION HEADER — Clean Official University Design with Guaranteed Visible Text Reveal
          ========================================================================= */}
      <div ref={headerRef} className="max-w-5xl mx-auto text-center px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-2.5">
          <span 
            className="w-5 h-[2px] bg-[#C8102E] origin-right transition-transform duration-500 ease-out"
            style={{ transform: isHeaderVisible ? 'scaleX(1)' : 'scaleX(0.7)' }}
            aria-hidden="true" 
          />
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C8102E] font-sans">
            Campus Leadership
          </span>
          <span 
            className="w-5 h-[2px] bg-[#C8102E] origin-left transition-transform duration-500 ease-out"
            style={{ transform: isHeaderVisible ? 'scaleX(1)' : 'scaleX(0.7)' }}
            aria-hidden="true" 
          />
        </div>

        {/* Cinematic Staggered Text Reveal: Guaranteed 100% visible, Navy Blue #0A1931 */}
        <h2
          id="leadership-heading"
          className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0A1931] tracking-tight leading-tight mb-3.5"
        >
          {['Leadership', 'with', 'Vision.', 'Excellence', 'with', 'Purpose.'].map((word, idx) => (
            <span
              key={idx}
              className="inline-block transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] mr-[0.26em] last:mr-0 text-[#0A1931]"
              style={{
                opacity: isHeaderVisible ? 1 : 0.9,
                transform: isHeaderVisible ? 'translateY(0)' : 'translateY(6px)',
                transitionDelay: `${idx * 45}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Narrative Subtitle Reveal */}
        <p 
          className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto font-normal transition-all duration-700 ease-out"
          style={{
            opacity: isHeaderVisible ? 1 : 0.85,
            transform: isHeaderVisible ? 'translateY(0)' : 'translateY(6px)',
            transitionDelay: '280ms',
          }}
        >
          Steered by visionary academic leaders committed to intellectual rigor, student development, and transformative opportunities.
        </p>
      </div>

      {/* =========================================================================
          LEADERSHIP EDITORIAL PROFILES (Square & Rectangular Geometry, Large Portraits)
          ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 lg:space-y-16">
        {LEADERSHIP_PROFILES.map((leader, index) => {
          const isImageLeft = index % 2 === 0;

          return (
            <React.Fragment key={leader.id}>
              {/* Mobile collapse card (< 1024px) */}
              <MobileLeaderCard leader={leader} onSelect={setSelectedLeader} />

              {/* Desktop editorial layout (1024px+) — Clean Rectangular University Aesthetic */}
              <article
                aria-label={`${leader.name} — ${leader.designation}`}
                className={`hidden lg:flex ${
                  isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center justify-between gap-8 sm:gap-12 lg:gap-14 bg-white p-6 sm:p-8 lg:p-10 rounded-none sm:rounded-sm border border-slate-300 shadow-xs hover:border-slate-400 transition-colors`}
              >
                {/* ===================================================================
                    PORTRAIT CONTAINER — Sharp Square / Rectangular Framing (300px x 400px aspect-3/4)
                    =================================================================== */}
                <div className="w-full lg:w-[320px] shrink-0 flex flex-col items-center">
                  <div className="relative w-[260px] sm:w-[290px] lg:w-[310px] aspect-[3/4] bg-slate-100 border-2 border-slate-300 rounded-none overflow-hidden shadow-xs group">
                    <img
                      src={leader.portraitUrl}
                      alt={`${leader.name} - ${leader.designation}`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== leader.fallbackUrl) {
                          target.src = leader.fallbackUrl;
                        }
                      }}
                    />
                  </div>
                </div>

                {/* ===================================================================
                    CONTENT COLUMN — Academic Editorial Typography (Navy & Red)
                    =================================================================== */}
                <div className="w-full lg:flex-1 flex flex-col justify-center space-y-4">
                  {/* 1. Leader Name in Official Navy with Red Accent */}
                  <div className="border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-none bg-[#C8102E]" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8102E] font-sans">
                        {leader.designation}
                      </span>
                    </div>

                    <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0A1931] tracking-tight leading-snug">
                      {leader.name}
                    </h3>

                    {leader.secondaryDesignation && (
                      <p className="text-xs sm:text-[13px] text-slate-500 font-sans mt-0.5">
                        {leader.secondaryDesignation}
                      </p>
                    )}
                  </div>

                  {/* 2. Official Leadership Message Body — Full Complete Text */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-[#0A1931]">
                      <Quote size={15} className="text-[#C8102E] shrink-0" aria-hidden="true" />
                      <span className="text-xs font-bold uppercase tracking-wide text-[#0A1931] font-sans">
                        {leader.messageTitle}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-[14px] sm:text-[15px] text-slate-700 leading-relaxed font-sans">
                      {leader.fullMessage.map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* 3. Interactive Profile Button with Clean Rectangular Border */}
                  <div className="pt-2">
                    <button
                      onClick={() => setSelectedLeader(leader)}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A1931] hover:text-white bg-slate-50 hover:bg-[#0A1931] px-4 py-2.5 rounded-none border border-slate-300 hover:border-[#0A1931] transition-all duration-200 cursor-pointer group shadow-2xs font-sans"
                      aria-label={`View full profile of ${leader.name}`}
                    >
                      <span>View Profile & Credentials</span>
                      <ArrowUpRight size={14} className="text-[#C8102E] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>

                </div>
              </article>
            </React.Fragment>
          );
        })}
      </div>

      {/* =========================================================================
          SECTION SIGNATURE QUOTE with Masked Text Reveal
          ========================================================================= */}
      <footer className="mt-14 sm:mt-18 pt-8 border-t border-slate-200 text-center max-w-2xl mx-auto px-6">
        <blockquote
          className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg italic text-[#0A1931] leading-relaxed"
        >
          “Leadership is not simply about direction — it is about creating a future worth moving toward.”
        </blockquote>
        <div className="mt-2.5 flex items-center justify-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.2em] text-slate-500">
          <span className="w-3 h-px bg-[#C8102E]" />
          <span>University of Central Punjab</span>
          <span className="w-3 h-px bg-[#C8102E]" />
        </div>
      </footer>

      {/* =========================================================================
          POLISHED LEADER PROFILE MODAL (Rectangular Geometry, Accessible, Full Bio)
          ========================================================================= */}
      <AnimatePresence>
        {selectedLeader && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A1931]/80 backdrop-blur-xs select-text overflow-y-auto"
            onClick={() => setSelectedLeader(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-leader-name"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl rounded-none sm:rounded-sm border border-slate-300 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-slate-900"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#0A1931] text-white border-b border-[#0A1931]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-none bg-[#C8102E]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-300 font-sans">
                    Institutional Leadership Profile
                  </span>
                </div>
                <button
                  onClick={() => setSelectedLeader(null)}
                  className="text-slate-300 hover:text-white p-1 transition-colors cursor-pointer"
                  aria-label="Close profile modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto font-sans">
                
                {/* Profile Hero Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200">
                  <div className="w-32 sm:w-40 aspect-[3/4] shrink-0 border-2 border-slate-300 rounded-none overflow-hidden bg-slate-50 shadow-xs relative">
                    <img
                      src={selectedLeader.portraitUrl}
                      alt={selectedLeader.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = selectedLeader.fallbackUrl;
                      }}
                    />
                  </div>

                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8102E] font-sans">
                      {selectedLeader.designation}
                    </span>

                    <h3
                      id="modal-leader-name"
                      className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-[#0A1931] tracking-tight"
                    >
                      {selectedLeader.name}
                    </h3>
                    
                    {selectedLeader.secondaryDesignation && (
                      <p className="text-xs sm:text-sm text-slate-600 font-sans">
                        {selectedLeader.secondaryDesignation}
                      </p>
                    )}
                  </div>
                </div>

                {/* Prof. Dr. Aurangzaib Virk Special Executive Vision & Motto */}
                {selectedLeader.biography?.visionQuote && (
                  <div className="bg-[#0A1931]/5 border-l-3 border-[#C8102E] p-4 sm:p-5 rounded-none space-y-2">
                    <div className="text-xs font-mono font-bold tracking-widest text-[#C8102E] uppercase">
                      {selectedLeader.biography.motto}
                    </div>
                    <blockquote className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg italic text-[#0A1931] font-semibold leading-relaxed">
                      {selectedLeader.biography.visionQuote}
                    </blockquote>
                  </div>
                )}

                {/* Executive Profile Statement */}
                {selectedLeader.biography?.executiveProfile && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-[#C8102E]" />
                      <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931]">
                        Executive Profile
                      </h4>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-700 bg-slate-50 p-4 rounded-none border border-slate-200">
                      {selectedLeader.biography.executiveProfile}
                    </p>
                  </div>
                )}

                {/* Complete Official Message */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1.5">
                    <Quote size={15} className="text-[#C8102E]" />
                    <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931]">
                      {selectedLeader.messageTitle}
                    </h4>
                  </div>

                  <div className="space-y-3 text-sm leading-relaxed text-slate-700 bg-slate-50 p-4 sm:p-5 rounded-none border border-slate-200">
                    {selectedLeader.fullMessage.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Qualification & Research Expertise */}
                {selectedLeader.biography?.qualification && (
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <BookMarked size={16} className="text-[#0A1931]" />
                      <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931]">
                        Qualification & Research Expertise
                      </h4>
                    </div>

                    <div className="bg-white p-4 rounded-none border border-slate-200 space-y-3 shadow-2xs">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A1931] text-white rounded-none text-xs font-bold">
                        <GraduationCap size={14} className="text-white" />
                        <span>{selectedLeader.biography.qualification}</span>
                      </div>

                      {selectedLeader.biography.researchExpertise && (
                        <p className="text-sm leading-relaxed text-slate-700 pt-1">
                          {selectedLeader.biography.researchExpertise}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Complete Portfolio Breakdown */}
                {selectedLeader.portfolio && (
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={16} className="text-[#0A1931]" />
                      <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931]">
                        Institutional Portfolio & Executive Positions
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedLeader.portfolio.map((item, idx) => (
                        <div key={idx} className="p-3 border border-slate-200 rounded-none bg-white space-y-1">
                          <span className="text-[11px] uppercase tracking-wider text-[#C8102E] font-bold block">
                            {item.role}
                          </span>
                          <div className="space-y-0.5">
                            {item.organizations.map((org, oIdx) => (
                              <p key={oIdx} className="text-xs font-semibold text-slate-800">
                                • {org}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Leadership & Institutional Impact Highlights */}
                {selectedLeader.biography?.highlights && (
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap size={16} className="text-[#0A1931]" />
                      <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931]">
                        Leadership & Institutional Impact
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {selectedLeader.biography.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-none border border-slate-200 text-xs text-slate-800 leading-relaxed">
                          <Check size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* State Awards & Honors */}
                {selectedLeader.biography?.awards && (
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-[#C8102E]" />
                      <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931]">
                        State Awards & Public Accolades
                      </h4>
                    </div>

                    <div className="space-y-2 pt-1">
                      {selectedLeader.biography.awards.map((award, idx) => (
                        <div key={idx} className="p-3 bg-amber-50/70 border border-amber-200 rounded-none text-xs text-slate-800 leading-relaxed flex items-start gap-2">
                          <span className="text-amber-800 font-bold shrink-0">★</span>
                          <span>{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedLeader(null)}
                  className="px-5 py-2 bg-[#0A1931] hover:bg-[#C8102E] text-white font-semibold text-xs rounded-none transition-colors cursor-pointer shadow-xs font-sans"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
