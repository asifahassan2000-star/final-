import React, { useState, useEffect, useRef } from 'react';
import { 
  Quote, 
  X, 
  ArrowUpRight, 
  GraduationCap, 
  Building2, 
  BookMarked, 
  Check, 
  ShieldCheck,
  Mail,
  Globe,
  Tag,
  Award,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LeadershipPortfolioItem {
  role: string;
  organizations: string[];
}

export interface LeaderContactInfo {
  email?: string;
  website?: string;
  categories?: string[];
  phone?: string;
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
  contactInfo?: LeaderContactInfo;
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
  contactInfo?: LeaderContactInfo;
}

const LEADERSHIP_PROFILES: LeaderProfile[] = [
  {
    id: 'prof-hamid-iqbal',
    name: 'Prof. Hamid Iqbal',
    designation: 'Director PGC & UCP Bahawalpur Cluster',
    secondaryDesignation: 'Director PGC & UCP Bahawalpur Cluster',
    officialRole: 'Director PGC & UCP Bahawalpur Cluster',
    portraitUrl: 'https://ik.imagekit.io/Muffins/image%20-%202026-10-23T154255.281.png',
    fallbackUrl: '/assets/leadership/prof_hamid_iqbal_director.png',
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
    designation: 'Principal, UCP Bahawalpur Campus',
    secondaryDesignation: 'Principal, UCP Bahawalpur Campus',
    officialRole: 'Principal, UCP Bahawalpur Campus',
    portraitUrl: 'https://ik.imagekit.io/Muffins/image%20-%202026-10-23T154101.204.png',
    fallbackUrl: '/assets/campus/prof_aurangzaib_virk.png',
    messageTitle: 'Principal’s Message',
    fullMessage: [
      'The University of Central Punjab warmly welcomes students and parents to an institution committed to academic excellence, integrity, and transformative education.',
      'UCP provides a rigorous and supportive learning environment that develops adaptable, skilled, and value-driven graduates prepared to meet future challenges.',
      'Through dedicated faculty, strong alumni engagement, and a culture of innovation, UCP nurtures leaders equipped to contribute meaningfully to society and the nation.'
    ],
    contactInfo: {
      email: 'Principal.bahawalpur@ucp.edu.pk',
      categories: ['Principal Office', 'Academic Administration', 'Student Affairs']
    },
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
      ],
      contactInfo: {
        email: 'Principal.bahawalpur@ucp.edu.pk',
        categories: ['Principal Office', 'Academic Administration', 'Student Affairs']
      }
    }
  }
];

interface OurLeadershipSectionProps {
  onOpenApply?: () => void;
  onScrollTo?: (sectionId: string) => void;
}

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
      className="relative bg-white dark:bg-[#080f1d] text-slate-900 dark:text-slate-100 py-16 sm:py-20 lg:py-24 border-t border-b border-slate-200 dark:border-white/10 select-none overflow-visible scroll-mt-20 transition-colors duration-200"
      aria-labelledby="leadership-heading"
    >
      {/* Anchor alias for existing chairman-section references */}
      <div id="chairman-section" className="absolute -top-20" aria-hidden="true" />

      {/* =========================================================================
          SECTION HEADER — Prestigious University Design Matching Welcome Section
          ========================================================================= */}
      <motion.div 
        ref={headerRef} 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-5xl xl:max-w-6xl mx-auto text-center px-4 sm:px-6 mb-14 sm:mb-18"
      >
        <div className="inline-flex items-center gap-2 mb-2.5">
          <span 
            className="w-5 h-[2px] bg-[#D4AF37] origin-right transition-transform duration-500 ease-out"
            style={{ transform: isHeaderVisible ? 'scaleX(1)' : 'scaleX(0.7)' }}
            aria-hidden="true" 
          />
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4AF37] font-sans">
            UCP BAHAWALPUR
          </span>
          <span 
            className="w-5 h-[2px] bg-[#D4AF37] origin-left transition-transform duration-500 ease-out"
            style={{ transform: isHeaderVisible ? 'scaleX(1)' : 'scaleX(0.7)' }}
            aria-hidden="true" 
          />
        </div>

        {/* Cinematic Heading */}
        <h2
          id="leadership-heading"
          className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-[30px] sm:text-[36px] lg:text-[42px] font-bold tracking-tight leading-tight text-[#0B1A3A] dark:text-white"
        >
          <span className="inline-flex items-center justify-center flex-wrap gap-x-2 sm:gap-x-3">
            <span className="inline-block text-[#0B1A3A] dark:text-white">Leadership</span>
            <span className="inline-block text-[#C8102E] dark:text-[#F3D368] font-extrabold">with Vision.</span>
            <span className="inline-block text-[#0B1A3A] dark:text-white">Excellence</span>
            <span className="inline-block text-[#C8102E] dark:text-[#F3D368] font-extrabold">with Purpose.</span>
          </span>
        </h2>

        {/* Gold Underline */}
        <div 
          className="w-[64px] h-[3.5px] mx-auto mt-3.5 mb-5 rounded-full transition-all duration-700 ease-out origin-center bg-[#D4AF37] dark:bg-[#E5C158] shadow-sm"
          style={{ 
            transform: isHeaderVisible ? 'scaleX(1)' : 'scaleX(0.2)',
            opacity: isHeaderVisible ? 1 : 0.4,
          }}
          aria-hidden="true"
        />

        {/* Narrative Subtitle */}
        <p 
          className="text-[#0B1A3A] dark:text-slate-100 text-base sm:text-lg lg:text-[20px] font-sans font-medium leading-relaxed sm:leading-[1.65] max-w-3xl mx-auto transition-all duration-700 ease-out text-center"
          style={{
            opacity: isHeaderVisible ? 1 : 0.85,
            transform: isHeaderVisible ? 'translateY(0)' : 'translateY(6px)',
          }}
        >
          Steered by visionary academic leaders committed to intellectual rigor, student development, and transformative educational opportunities across South Punjab.
        </p>
      </motion.div>

      {/* =========================================================================
          2 COLUMNS GRID — Prof. Hamid Iqbal & Prof. Dr. Aurangzaib Virk
          Matching Mian Amer Mahmood & Prof. Sohail Afzal in WelcomeUcpSection:
          Unboxed, prestigious layout with authentic building blueprint watermark,
          grand circular gold-bordered portraits, designation badge & quotation block.
          ========================================================================= */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-stretch">
        {LEADERSHIP_PROFILES.map((leader, index) => (
          <motion.article
            key={leader.id}
            id={leader.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            aria-label={`${leader.name} — ${leader.designation}`}
            className="flex flex-col justify-between h-full space-y-6"
          >
            <div>
              {/* Portrait Container with Authentic Building Blueprint Behind */}
              <div className="relative flex flex-col items-center justify-center min-h-[300px] sm:min-h-[340px] lg:min-h-[380px]">
                {/* Building Blueprint Watermark Linework Directly Behind Portrait */}
                <div
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

                {/* Big Circle Portrait */}
                <div 
                  onClick={() => setSelectedLeader(leader)}
                  className="relative z-10 p-3 sm:p-3.5 lg:p-4 rounded-full border border-slate-200/90 dark:border-white/15 bg-white/90 dark:bg-[#0e1d38]/90 shadow-xl backdrop-blur-[2px] cursor-pointer group hover:scale-[1.03] transition-all duration-300"
                  title={`Click to view biographical profile of ${leader.name}`}
                >
                  <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-[3px] border-[#D4AF37] dark:border-[#D4AF37] shadow-2xl bg-[#0B1A3A] ring-4 ring-white dark:ring-[#080f1d] relative">
                    <img
                      src={leader.portraitUrl}
                      alt={`${leader.name}, ${leader.designation}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{
                        objectPosition: leader.id === 'prof-dr-aurangzaib-virk' ? 'center 14%' : 'center 12%',
                      }}
                      loading="eager"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = leader.fallbackUrl;
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

              {/* Identity & Designation Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-center mt-5 sm:mt-6 flex flex-col items-center"
              >
                <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-[#0B1A3A] dark:text-white tracking-tight uppercase">
                  {leader.name}
                </h3>
                <span 
                  className="inline-block px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] rounded-none mt-2.5 font-sans bg-[#0B1A3A] dark:bg-[#0e2248] text-[#D4AF37] dark:text-[#F3D368] border border-[#0B1A3A] dark:border-[#D4AF37]/30 shadow-xs"
                >
                  {leader.designation}
                </span>
              </motion.div>

              {/* Leadership Message (with gold quotation mark & italic Source Serif styling) */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.2 }}
                className="relative mt-6 max-w-xl mx-auto"
              >
                <span 
                  className="font-serif text-4xl sm:text-5xl leading-none select-none float-left mr-2.5 -mt-1 text-[#D4AF37] dark:text-[#E5C158]"
                  aria-hidden="true"
                >
                  “
                </span>
                <p className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-[17px] text-[#1E293B] dark:text-slate-200 leading-[1.78] italic text-justify">
                  {leader.fullMessage.join(' ')}
                </p>
              </motion.div>
            </div>

            {/* Bottom Action Link */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-center text-xs font-sans max-w-xl mx-auto w-full"
            >
              <button
                type="button"
                onClick={() => setSelectedLeader(leader)}
                className="inline-flex items-center gap-1.5 font-bold text-[#0B1A3A] dark:text-slate-200 hover:text-[#C8102E] dark:hover:text-[#D4AF37] transition-colors cursor-pointer group py-1"
                aria-label={`View Full Profile & Credentials of ${leader.name}`}
              >
                <span className="underline decoration-slate-300 dark:decoration-slate-600 underline-offset-4 group-hover:decoration-[#C8102E] dark:group-hover:decoration-[#D4AF37]">
                  View Profile &amp; Credentials
                </span>
                <ArrowUpRight size={14} className="text-[#C8102E] dark:text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          </motion.article>
        ))}
      </div>

      {/* =========================================================================
          SECTION SIGNATURE QUOTE with Masked Text Reveal
          ========================================================================= */}
      <motion.footer 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="mt-14 sm:mt-18 pt-8 border-t border-slate-200 text-center max-w-2xl mx-auto px-6"
      >
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
      </motion.footer>

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
              <div className="flex items-center justify-between px-6 py-4 bg-[#0B1A3A] text-white border-b border-[#0B1A3A]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-none bg-[#D4AF37]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] font-sans">
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
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shrink-0 border-[3px] border-[#D4AF37] ring-4 ring-slate-100 dark:ring-slate-800 overflow-hidden bg-[#0B1A3A] shadow-xl relative">
                    <img
                      src={selectedLeader.portraitUrl}
                      alt={selectedLeader.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '100%',
                        objectFit: 'cover',
                        objectPosition: selectedLeader.id === 'prof-dr-aurangzaib-virk' ? 'center 14%' : 'center 12%',
                      }}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = selectedLeader.fallbackUrl;
                      }}
                    />
                  </div>

                  <div className="space-y-1 text-center sm:text-left">
                    <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-[#0B1A3A] text-[#D4AF37] font-sans">
                      {selectedLeader.designation}
                    </span>

                    <h3
                      id="modal-leader-name"
                      className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-[#0B1A3A] tracking-tight"
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

                {/* Official Contact Info & Executive Portfolio */}
                {selectedLeader.contactInfo && (
                  <div className="bg-slate-50 border border-slate-300 p-4 sm:p-5 rounded-none space-y-3.5 shadow-2xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-[#C8102E]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A1931]">
                          Contact Information &amp; Official Links
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                        Verified Executive Record
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedLeader.contactInfo.email && (
                        <div className="bg-white p-3 border border-slate-200 space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                            Email Address
                          </span>
                          <a
                            href={`mailto:${selectedLeader.contactInfo.email}`}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0A1931] hover:text-[#C8102E] transition-colors"
                          >
                            <Mail size={14} className="text-[#C8102E] shrink-0" />
                            <span>{selectedLeader.contactInfo.email}</span>
                          </a>
                        </div>
                      )}

                      {selectedLeader.contactInfo.website && (
                        <div className="bg-white p-3 border border-slate-200 space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                            Websites &amp; Social Links
                          </span>
                          <a
                            href={selectedLeader.contactInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0A1931] hover:text-[#C8102E] transition-colors"
                          >
                            <Globe size={14} className="text-[#0A1931] shrink-0" />
                            <span>{selectedLeader.contactInfo.website}</span>
                            <ExternalLink size={12} className="text-slate-400 ml-auto" />
                          </a>
                        </div>
                      )}
                    </div>

                    {selectedLeader.contactInfo.categories && selectedLeader.contactInfo.categories.length > 0 && (
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1.5">
                          Categories &amp; Strategic Roles
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedLeader.contactInfo.categories.map((category, catIdx) => (
                            <span
                              key={catIdx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-300 text-xs font-semibold text-[#0A1931] tracking-wide"
                            >
                              <Tag size={11} className="text-[#C8102E]" />
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

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
                      <div key={pIdx}>
                        {para.includes('\n') ? (
                          <div className="font-bold text-[#0A1931] text-xs sm:text-sm tracking-wide uppercase pt-2">
                            {para.split('\n').map((line, lIdx) => (
                              <span 
                                key={lIdx} 
                                className={lIdx === 1 ? "block text-sm sm:text-base font-extrabold text-[#C8102E] mt-0.5 tracking-wider font-serif" : "block text-slate-600 font-bold text-xs tracking-wider"}
                              >
                                {line}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p>{para}</p>
                        )}
                      </div>
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
                  <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700/60">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-[#C8102E] dark:text-red-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wide text-[#0A1931] dark:text-slate-200">
                        State Awards & Public Accolades
                      </h4>
                    </div>

                    <div className="space-y-2 pt-1">
                      {selectedLeader.biography.awards.map((award, idx) => {
                        const hasDash = award.includes('—');
                        const title = hasDash ? award.split('—')[0].trim() : '';
                        const desc = hasDash ? award.split('—').slice(1).join('—').trim() : award;

                        return (
                          <div 
                            key={idx} 
                            className="p-3 bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/40 rounded-none text-xs text-slate-800 dark:text-amber-100 leading-relaxed flex items-start gap-2.5 transition-colors duration-200 shadow-2xs dark:shadow-md dark:shadow-amber-950/30"
                          >
                            <span className="text-amber-800 dark:text-amber-400 font-bold shrink-0 mt-0.5 text-sm" aria-hidden="true">★</span>
                            {hasDash ? (
                              <span className="leading-relaxed">
                                <strong className="font-bold text-slate-900 dark:text-amber-300 dark:font-semibold">
                                  {title}
                                </strong>
                                <span className="text-amber-800 dark:text-amber-400 font-semibold mx-1.5">—</span>
                                <span className="text-slate-700 dark:text-amber-100/90 font-normal">
                                  {desc}
                                </span>
                              </span>
                            ) : (
                              <span className="text-slate-800 dark:text-amber-100 font-normal">{award}</span>
                            )}
                          </div>
                        );
                      })}
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
