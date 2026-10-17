import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Search, X, ChevronLeft, ChevronRight, ExternalLink,
  Cpu, Code2, Brain, ShieldCheck, 
  BarChart3, Briefcase, TrendingUp,
  Atom, Microscope, Dna, FlaskConical,
  BookOpen, Scale, Languages, GraduationCap,
  Sparkles, CheckCircle2
} from 'lucide-react';
import { 
  OFFICIAL_BAHAWALPUR_PROGRAMMES, 
  BahawalpurProgramme 
} from '../data/bahawalpurProgrammesData';

// Official course fallback images provided by user
const COURSE_FALLBACK_URLS: Record<string, string> = {
  'bs-business-analytics': 'https://i.ibb.co/Ld75Vg2t/i-Stock-1311598658.jpg',
  'bba': 'https://i.ibb.co/TXgwt6f/Chat-GPT-Image-Sep-27-2026-07-07-56-AM.png',
  'bs-accounting-finance': 'https://i.ibb.co/p6MpMGDn/shutterstock-527098861-1-scaled.avif',
  'bs-computer-science': 'https://i.ibb.co/V0QdQKgG/images-1.jpg',
  'bs-cyber-security': 'https://i.ibb.co/DPDbZQ7K/images.jpg',
  'bs-psychology': 'https://i.ibb.co/zWQVBLTD/shutterstock-158110544-scaled.jpg',
  'bs-english': 'https://i.ibb.co/cKvTywH6/360-F-409187796-W9bg-IQAKZYs-Wkc9g-Xt-Pbs5h-YAWXd6z1-T.jpg',
  'bs-physics': 'https://i.ibb.co/MkxJ7Nzy/Chat-GPT-Image-Sep-26-2026-09-44-35-AM.png',
  'bs-biochemistry': 'https://i.ibb.co/VW7jZHDF/pipette-over-test-tube-dropping-sample-chemical-into-sample-plant-scaled-jpg.webp',
  'bs-biotechnology': 'https://i.ibb.co/wFZF6w95/Biotechnology-1000x600px.jpg',
  'bs-chemistry': 'https://i.ibb.co/h1fDTVTm/p0f776fj.png',
  'bs-mathematics': 'https://i.ibb.co/2Ys8Y5H3/shutterstock-2475273911-scaled.jpg',
  'bs-zoology': 'https://i.ibb.co/hFKgG2vw/Zoology.png',
  'adp-psychology': 'https://i.ibb.co/chP4mYWB/What-s-the-Difference-Between-a-Psychiatrist-and-Psychologist.webp',
  'adp-english': 'https://i.ibb.co/xdLNTjf/360-F-310395027-i-VFf-VOCWFUONEIo-Ri-Tk7-Wq-U7-GLTOf3-QE.jpg',
  'adp-business-analytics': 'https://i.ibb.co/cKT5qwbp/What-is-business-analytics-Getty-Images-1281224851-e1708028042563.webp',
  'adp-business-administration': 'https://i.ibb.co/Ps0SNKc7/images-1.jpg',
  'adp-biotechnology': 'https://i.ibb.co/35mFgXjT/7052877-13ab.webp',
  'adp-accounting-finance': 'https://i.ibb.co/xS78W5ZT/accounting-and-finance.jpg',
  'adp-computer-science': 'https://i.ibb.co/nqtHPF6p/Online-Learning-South-Asia-Learning-Indoor-Getty-Images-1071652068.webp',
  'ads-zoology-botany-chemistry': 'https://i.ibb.co/GfDX6Zg7/pngtree-laboratory-plant-research-image-21361714.webp',
  'ads-math-physics': 'https://i.ibb.co/wN2rcm0p/creative-concept-hand-holding-light-bulb-with-planets-mathematical-formulas-representing-idea-genera.jpg',
  'adp-software-engineering': 'https://i.ibb.co/rf2T1y2M/images.jpg',
  'adp-cyber-security': 'https://i.ibb.co/DPDbZQ7K/images.jpg',
  'adp-artificial-intelligence': 'https://i.ibb.co/bMFsfmxh/hand-holding-ai-globe.jpg',
  'adp-data-science': 'https://i.ibb.co/LDnggNLM/FUq-HEVVUs-AAb-ZB0.jpg',
};

interface ProgramFinderProps {
  onSelectProgram?: (program: any) => void;
  onApplyForProgram?: (programName: string) => void;
  onOpenProgrammesPage?: (progId?: string) => void;
}

type CategoryTab = 
  | 'All' 
  | 'Computing & Technology' 
  | 'Business' 
  | 'Science' 
  | 'Humanities & Social Sciences';

// Icon mapping based on academic discipline
const getProgramIcon = (prog: BahawalpurProgramme) => {
  const id = prog.id.toLowerCase();
  const cat = prog.category.toLowerCase();

  if (id.includes('artificial') || id.includes('ai')) return Brain;
  if (id.includes('cyber')) return ShieldCheck;
  if (id.includes('software') || id.includes('data-science')) return Code2;
  if (cat.includes('computing') || id.includes('computer')) return Cpu;
  if (id.includes('analytics')) return TrendingUp;
  if (id.includes('accounting') || id.includes('finance')) return BarChart3;
  if (cat.includes('business') || id.includes('bba') || id.includes('administration')) return Briefcase;
  if (id.includes('bio') || id.includes('botany')) return Dna;
  if (id.includes('chemistry')) return FlaskConical;
  if (cat.includes('science') || id.includes('physics')) return Atom;
  if (id.includes('law')) return Scale;
  if (id.includes('english')) return Languages;
  return GraduationCap;
};

export const ProgramFinder: React.FC<ProgramFinderProps> = ({
  onSelectProgram,
  onApplyForProgram,
  onOpenProgrammesPage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryTab>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [modalCategory, setModalCategory] = useState<CategoryTab>('All');

  // Carousel drift state
  const [isHovered, setIsHovered] = useState(false);
  const [carouselX, setCarouselX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const categoryTabs: { id: CategoryTab; label: string }[] = [
    { id: 'All', label: 'All Disciplines' },
    { id: 'Computing & Technology', label: 'Computing & AI' },
    { id: 'Business', label: 'Business & Management' },
    { id: 'Science', label: 'Applied Sciences' },
    { id: 'Humanities & Social Sciences', label: 'Humanities & Social' },
  ];

  const filteredProgrammes = useMemo(() => {
    return OFFICIAL_BAHAWALPUR_PROGRAMMES.filter((prog) => {
      if (selectedCategory === 'All') return true;
      return prog.category === selectedCategory;
    });
  }, [selectedCategory]);

  const modalFilteredProgrammes = useMemo(() => {
    return OFFICIAL_BAHAWALPUR_PROGRAMMES.filter((prog) => {
      const matchesSearch = 
        modalSearchQuery === '' ||
        prog.name.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
        prog.shortDescription.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
        prog.category.toLowerCase().includes(modalSearchQuery.toLowerCase());

      const matchesCat = modalCategory === 'All' || prog.category === modalCategory;

      return matchesSearch && matchesCat;
    });
  }, [modalSearchQuery, modalCategory]);

  // Auto drift animation: moves -30px every 3s infinitely, pauses on hover
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCarouselX((prev) => {
        // Card width 320 + gap 32 = 352px per card
        // Calculate max scroll bounds
        const maxScroll = -(filteredProgrammes.length * 352 - 1056);
        const next = prev - 30;
        if (next < Math.min(maxScroll, -352)) {
          return 0; // loop back smoothly
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, filteredProgrammes.length]);

  // Reset carousel drift when category filter changes
  useEffect(() => {
    setCarouselX(0);
  }, [selectedCategory]);

  const handleCardClick = (prog: BahawalpurProgramme) => {
    if (onOpenProgrammesPage) {
      onOpenProgrammesPage(prog.id);
    } else if (onSelectProgram) {
      onSelectProgram(prog);
    }
  };

  const handleManualScroll = (direction: 'left' | 'right') => {
    const shift = direction === 'left' ? 352 : -352;
    setCarouselX((prev) => {
      const maxScroll = -(filteredProgrammes.length * 352 - 1056);
      const next = prev + shift;
      if (next > 0) return 0;
      if (next < Math.min(maxScroll, 0)) return Math.min(maxScroll, 0);
      return next;
    });
  };

  return (
    <section 
      id="finder-section" 
      className="relative py-10 sm:py-12 bg-[#FCFBF9] border-b border-[#E5E7EB] text-[#0F2C61] overflow-hidden select-none"
      aria-labelledby="programs-directory-heading"
    >
      <div id="programs-section" className="absolute -top-20" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. TOP ROW: Title Left + 'Explore All 20 Programs ->' Right Gold Link
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-[2px] bg-[#C5A059]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059]">
                Academic Pathways
              </span>
            </div>
            <h2 
              id="programs-directory-heading"
              className="font-['Playfair_Display',serif] text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#0F2C61] tracking-tight leading-tight"
            >
              Shape Your Future — Programs
            </h2>
          </div>

          {/* Top Right Gold Link that opens full grid in modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-[#C5A059] hover:text-[#9A7B38] transition-colors cursor-pointer group self-start sm:self-end pb-0.5"
          >
            <span>Explore All 25 Programs</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* =========================================================================
            2. FILTER PILLS BELOW TITLE + CAROUSEL NAVIGATION CONTROLS
            ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-[#0F2C61] text-white shadow-xs font-semibold' 
                      : 'bg-white text-slate-600 hover:text-[#0F2C61] hover:bg-slate-50 border border-slate-200/90'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Carousel Left/Right arrow controls */}
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <button
              onClick={() => handleManualScroll('left')}
              aria-label="Previous programs"
              className="w-8 h-8 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors cursor-pointer hover:border-[#0F2C61]"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              aria-label="Next programs"
              className="w-8 h-8 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors cursor-pointer hover:border-[#0F2C61]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* =========================================================================
            3. COMPACT HORIZONTAL CAROUSEL — 3 CARDS VISIBLE (320x280px), FLIP 3D
            ========================================================================= */}
        <div 
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full max-w-[1056px] mx-auto overflow-hidden py-2"
          style={{ height: '304px' }}
        >
          {/* Edge Fades for Luxury Finish */}
          <div className="absolute left-0 inset-y-0 w-8 bg-gradient-to-r from-[#FCFBF9] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-8 bg-gradient-to-l from-[#FCFBF9] to-transparent z-10 pointer-events-none" />

          {/* Draggable & Auto-drifting track */}
          <motion.div
            drag="x"
            dragConstraints={{ 
              left: -(filteredProgrammes.length * 352 - 1056), 
              right: 0 
            }}
            animate={{ x: carouselX }}
            transition={{ type: 'spring', damping: 28, stiffness: 120 }}
            className="flex items-center gap-8 cursor-grab active:cursor-grabbing will-change-transform"
          >
            {filteredProgrammes.map((prog, index) => {
              const IconComponent = getProgramIcon(prog);
              const subjects = prog.whatYouWillLearn && prog.whatYouWillLearn.length >= 2 
                ? prog.whatYouWillLearn.slice(0, 2) 
                : ['Foundational Discipline Theory', 'Applied Empirical Laboratories'];

              return (
                <motion.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: Math.min(index * 0.08, 0.4),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-[320px] h-[280px] shrink-0 [perspective:1000px] group select-none"
                >
                  {/* 3D Flip Card Container: rotateY 180deg on hover */}
                  <div 
                    className="relative w-full h-full rounded-[20px] transition-transform duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-lg"
                  >
                    
                    {/* =======================================================
                        CARD FRONT: White, Icon + BS Title + Category, Minimal UCP Blue & Gold
                        ======================================================= */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-[20px] bg-white border border-[#E5E7EB] p-6 flex flex-col justify-between [backface-visibility:hidden] z-10"
                    >
                      {/* Top Row: Icon + Degree Tag */}
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-[#0F2C61]/5 border border-[#0F2C61]/15 text-[#0F2C61] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#C5A059]/10 group-hover:text-[#8C6D23] group-hover:border-[#C5A059]/30 transition-all duration-300">
                          <IconComponent size={24} strokeWidth={1.8} />
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#0F2C61] text-white">
                            {prog.degree}
                          </span>
                          <span className="text-[10px] font-semibold text-[#8C6D23] bg-[#C5A059]/15 border border-[#C5A059]/30 px-2 py-0.5 rounded">
                            {prog.level === 'Undergraduate' ? '4-Year BS' : '2-Year Associate'}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Category + BS Title */}
                      <div className="my-auto py-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A059] block mb-1">
                          {prog.category}
                        </span>
                        <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-[#0F2C61] leading-snug line-clamp-2">
                          {prog.name}
                        </h3>
                      </div>

                      {/* Bottom: Subtle Flip Cue */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                        <span className="group-hover:text-[#C5A059] transition-colors flex items-center gap-1">
                          Hover to flip & view curriculum ↻
                        </span>
                        <span className="text-[#0F2C61] font-bold">UCP</span>
                      </div>
                    </div>

                    {/* =======================================================
                        CARD BACK: UCP Deep Blue, 2 Subjects + Curriculum Link
                        ======================================================= */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-[20px] bg-[#0F2C61] text-white border border-[#0F2C61] p-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] z-20 shadow-xl"
                    >
                      {/* Back Header */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
                            Curriculum Focus
                          </span>
                          <span className="text-[11px] font-mono text-slate-300">
                            {prog.degree}
                          </span>
                        </div>
                        <h4 className="font-['Playfair_Display',serif] text-base font-semibold text-white/95 truncate">
                          {prog.name}
                        </h4>
                      </div>

                      {/* Back 2 Subjects / Learning Focus */}
                      <div className="space-y-2 py-1">
                        <span className="text-[10.5px] uppercase tracking-wider text-slate-300 font-medium block">
                          Key Academic Focus Areas:
                        </span>
                        <ul className="space-y-1.5 font-sans text-xs text-slate-200">
                          {subjects.map((sub, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2 leading-tight">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1" />
                              <span className="line-clamp-2">{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Back Bottom: Curriculum Link / Action Button */}
                      <div className="pt-2 border-t border-white/15">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(prog);
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-[#C5A059] hover:bg-[#b58f44] text-[#0F2C61] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                        >
                          <span>Curriculum & Overview</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>

      {/* =========================================================================
          4. MODAL: FULL DIRECTORY OF ALL 20+ PROGRAMMES (Opened via top right button)
          ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xl cursor-pointer"
              aria-hidden="true"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ 
                scale: 1, 
                y: 0, 
                opacity: 1,
                transition: { type: 'spring', damping: 25, stiffness: 280 }
              }}
              exit={{ scale: 0.94, y: 20, opacity: 0, transition: { duration: 0.2 } }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[88vh] bg-white rounded-[24px] shadow-2xl z-10 overflow-y-auto border border-[#E5E7EB] p-5 sm:p-8 lg:p-10 text-[#0F2C61]"
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer z-20 group"
                aria-label="Close modal"
              >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
              </button>

              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pr-10">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A059] block mb-1">
                    Official Academic Registry
                  </span>
                  <h3 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-[#0F2C61]">
                    Explore All Academic Programmes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                    Official catalog of 25 accredited undergraduate BS, BBA, and Associate degree programs.
                  </p>
                </div>

                {onOpenProgrammesPage && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      onOpenProgrammesPage();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2C61] hover:text-[#C5A059] transition-colors cursor-pointer shrink-0 pb-1"
                  >
                    <span>Open Full Page Directory</span>
                    <ExternalLink size={13} />
                  </button>
                )}
              </div>

              {/* Filter Tabs & Search in Modal */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-1.5">
                  {categoryTabs.map((tab) => {
                    const isActive = modalCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setModalCategory(tab.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-[#0F2C61] text-white font-semibold shadow-xs' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full md:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={modalSearchQuery}
                    onChange={(e) => setModalSearchQuery(e.target.value)}
                    placeholder="Search all degree programs..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Programs Grid in Modal: Cards with Image of Each Course and Blue Button for Detail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {modalFilteredProgrammes.map((prog) => {
                  const fallbackUrl = COURSE_FALLBACK_URLS[prog.id] || prog.image;

                  return (
                    <article
                      key={prog.id}
                      onClick={() => {
                        setIsModalOpen(false);
                        handleCardClick(prog);
                      }}
                      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col hover:border-[#C5A059]/60"
                    >
                      {/* Card Course Image */}
                      <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                        <img
                          src={prog.image || fallbackUrl}
                          alt={prog.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (fallbackUrl) {
                              target.src = fallbackUrl;
                            }
                          }}
                          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                            prog.id === 'adp-business-administration' ? 'object-[center_35%]' : 'object-center'
                          }`}
                        />
                        {/* Degree Tag Top-Left */}
                        <div className="absolute top-3 left-3 bg-[#0F2C61]/95 text-white text-[11px] font-mono px-2.5 py-0.5 rounded-md tracking-wide font-bold shadow-xs">
                          {prog.degree}
                        </div>

                        {/* Duration Tag Top-Right */}
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#0F2C61] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                          {prog.level === 'Undergraduate' ? '4-Year BS' : '2-Year ADP'}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Category & Credit Hours */}
                          <div className="text-[11px] text-[#C5A059] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <span>{prog.category}</span>
                            <span className="text-slate-300">·</span>
                            <span className="font-mono text-slate-500 tabular-nums">{prog.creditHours} Cr.</span>
                          </div>

                          {/* Program Name in Playfair Display serif */}
                          <h4 className="font-['Playfair_Display',serif] text-lg font-bold text-[#0F2C61] group-hover:text-[#C5A059] transition-colors leading-snug line-clamp-2">
                            {prog.name}
                          </h4>

                          {/* Short Description */}
                          <p className="mt-2 text-xs text-slate-500 font-sans line-clamp-2 leading-relaxed">
                            {prog.shortDescription}
                          </p>
                        </div>

                        {/* Bottom Row: Tuition + Blue Button for Detail */}
                        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-sans">Estimated Tuition</span>
                            <span className="font-mono font-semibold text-[#0F2C61] text-xs tabular-nums">
                              PKR {prog.yearlyAverage.toLocaleString()}/yr avg
                            </span>
                          </div>

                          {/* Blue button for detail */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsModalOpen(false);
                              handleCardClick(prog);
                            }}
                            className="bg-[#0F2C61] hover:bg-[#1a428a] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs hover:shadow-md cursor-pointer shrink-0"
                          >
                            <span>View Details</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <span className="text-xs text-slate-400 font-sans">
                  Showing {modalFilteredProgrammes.length} of {OFFICIAL_BAHAWALPUR_PROGRAMMES.length} official degree programs • UCP Bahawalpur
                </span>

                {onOpenProgrammesPage && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      onOpenProgrammesPage();
                    }}
                    className="text-xs font-semibold text-[#0F2C61] hover:text-[#C5A059] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Complete Syllabus & Fee Catalog</span>
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
