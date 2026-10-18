import React, { useState, useMemo, useRef } from 'react';
import { 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Download, 
  ExternalLink, 
  FileText, 
  HelpCircle, 
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  Building,
  GraduationCap
} from 'lucide-react';
import { 
  OFFICIAL_BAHAWALPUR_PROGRAMMES, 
  BahawalpurProgramme 
} from '../data/bahawalpurProgrammesData';
import { SemesterCurriculumTable } from './SemesterCurriculumTable';

interface AcademicProgrammesPageProps {
  onBackToHome?: () => void;
  onOpenApply?: (programName?: string) => void;
  onOpenFee?: () => void;
  onOpenCalendar?: () => void;
  initialSelectedId?: string | null;
  initialCategory?: string | null;
}

type CategoryFilter = 
  | 'All' 
  | 'Undergraduate' 
  | 'Associate Degree' 
  | 'Business' 
  | 'Computing & Technology' 
  | 'Science' 
  | 'Humanities & Social Sciences';

// Comprehensive fallback images for academic programmes
const getProgrammeFallbackImage = (progId: string, currentSrc?: string): string => {
  const fallbacks: Record<string, string> = {
    'bs-psychology': 'https://i.ibb.co/zWQVBLTD/shutterstock-158110544-scaled.jpg',
    'bs-physics': 'https://i.ibb.co/MkxJ7Nzy/Chat-GPT-Image-Sep-26-2026-09-44-35-AM.png',
    'bba': 'https://i.ibb.co/TXgwt6f/Chat-GPT-Image-Sep-27-2026-07-07-56-AM.png',
    'adp-artificial-intelligence': 'https://i.ibb.co/bMFsfmxh/hand-holding-ai-globe.jpg',
    'adp-cyber-security': 'https://i.ibb.co/DPDbZQ7K/images.jpg',
    'bs-cyber-security': 'https://i.ibb.co/DPDbZQ7K/images.jpg',
    'bs-cyber': 'https://i.ibb.co/DPDbZQ7K/images.jpg',
    'bs-mathematics': 'https://i.ibb.co/2Ys8Y5H3/shutterstock-2475273911-scaled.jpg',
    'bs-chemistry': 'https://i.ibb.co/h1fDTVTm/p0f776fj.png',
    'bs-zoology': 'https://i.ibb.co/hFKgG2vw/Zoology.png',
    'adp-psychology': 'https://i.ibb.co/chP4mYWB/What-s-the-Difference-Between-a-Psychiatrist-and-Psychologist.webp',
    'bs-english': 'https://i.ibb.co/cKvTywH6/360-F-409187796-W9bg-IQAKZYs-Wkc9g-Xt-Pbs5h-YAWXd6z1-T.jpg',
    'bs-business-analytics': 'https://i.ibb.co/Ld75Vg2t/i-Stock-1311598658.jpg',
    'bs-biotechnology': 'https://i.ibb.co/wFZF6w95/Biotechnology-1000x600px.jpg',
    'bs-accounting-finance': 'https://i.ibb.co/p6MpMGDn/shutterstock-527098861-1-scaled.avif',
    'bs-biochemistry': 'https://i.ibb.co/VW7jZHDF/pipette-over-test-tube-dropping-sample-chemical-into-sample-plant-scaled-jpg.webp',
    'bs-computer-science': 'https://i.ibb.co/V0QdQKgG/images-1.jpg',
    'adp-software-engineering': 'https://i.ibb.co/rf2T1y2M/images.jpg',
    'adp-data-science': 'https://i.ibb.co/LDnggNLM/FUq-HEVVUs-AAb-ZB0.jpg',
    'ads-zoology-botany-chemistry': 'https://i.ibb.co/GfDX6Zg7/pngtree-laboratory-plant-research-image-21361714.webp',
    'ads-math-physics': 'https://i.ibb.co/wN2rcm0p/creative-concept-hand-holding-light-bulb-with-planets-mathematical-formulas-representing-idea-genera.jpg',
    'adp-english': 'https://i.ibb.co/xdLNTjf/360-F-310395027-i-VFf-VOCWFUONEIo-Ri-Tk7-Wq-U7-GLTOf3-QE.jpg',
    'adp-business-analytics': 'https://i.ibb.co/cKT5qwbp/What-is-business-analytics-Getty-Images-1281224851-e1708028042563.webp',
    'adp-biotechnology': 'https://i.ibb.co/35mFgXjT/7052877-13ab.webp',
    'adp-accounting-finance': 'https://i.ibb.co/xS78W5ZT/accounting-and-finance.jpg',
    'adp-business-administration': 'https://i.ibb.co/Ps0SNKc7/images-1.jpg',
    'adp-computer-science': 'https://i.ibb.co/nqtHPF6p/Online-Learning-South-Asia-Learning-Indoor-Getty-Images-1071652068.webp',
  };
  return fallbacks[progId] || currentSrc || '/public/hero-featured-campus.jpg';
};

export const AcademicProgrammesPage: React.FC<AcademicProgrammesPageProps> = ({
  onBackToHome,
  onOpenApply,
  onOpenFee,
  onOpenCalendar,
  initialSelectedId,
  initialCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(() => {
    if (
      initialCategory && 
      ['All', 'Undergraduate', 'Associate Degree', 'Business', 'Computing & Technology', 'Science', 'Humanities & Social Sciences'].includes(initialCategory)
    ) {
      return initialCategory as CategoryFilter;
    }
    return 'All';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [degreeFilter, setDegreeFilter] = useState<'All' | 'BS' | 'BBA' | 'ADP' | 'ADS'>('All');
  const [creditFilter, setCreditFilter] = useState<'All' | '60-70' | '71-80' | '125-135' | '136+'>('All');
  const [activeProgramme, setActiveProgramme] = useState<BahawalpurProgramme | null>(() => {
    if (initialSelectedId) {
      return OFFICIAL_BAHAWALPUR_PROGRAMMES.find((p) => p.id === initialSelectedId) || null;
    }
    return null;
  });

  const detailFeeRef = useRef<HTMLDivElement>(null);

  // Category navigation tabs
  const categoryTabs: CategoryFilter[] = [
    'All',
    'Undergraduate',
    'Associate Degree',
    'Business',
    'Computing & Technology',
    'Science',
    'Humanities & Social Sciences',
  ];

  // Filtered programmes
  const filteredProgrammes = useMemo(() => {
    return OFFICIAL_BAHAWALPUR_PROGRAMMES.filter((prog) => {
      // Search matching
      const matchesSearch = 
        searchQuery === '' ||
        prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.whatYouWillLearn.some((w) => w.toLowerCase().includes(searchQuery.toLowerCase())) ||
        prog.careerPathways.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category tab matching
      let matchesCategory = true;
      if (selectedCategory === 'Undergraduate') {
        matchesCategory = prog.level === 'Undergraduate';
      } else if (selectedCategory === 'Associate Degree') {
        matchesCategory = prog.level === 'Associate Degree';
      } else if (selectedCategory !== 'All') {
        matchesCategory = prog.category === selectedCategory;
      }

      // Degree filter
      const matchesDegree = degreeFilter === 'All' || prog.degree === degreeFilter;

      // Credit hours filter
      let matchesCredit = true;
      if (creditFilter === '60-70') matchesCredit = prog.creditHours >= 60 && prog.creditHours <= 70;
      else if (creditFilter === '71-80') matchesCredit = prog.creditHours >= 71 && prog.creditHours <= 80;
      else if (creditFilter === '125-135') matchesCredit = prog.creditHours >= 125 && prog.creditHours <= 135;
      else if (creditFilter === '136+') matchesCredit = prog.creditHours >= 136;

      return matchesSearch && matchesCategory && matchesDegree && matchesCredit;
    });
  }, [searchQuery, selectedCategory, degreeFilter, creditFilter]);

  // Grouped for editorial view
  const undergraduateList = useMemo(() => {
    return filteredProgrammes.filter((p) => p.level === 'Undergraduate');
  }, [filteredProgrammes]);

  const associateList = useMemo(() => {
    return filteredProgrammes.filter((p) => p.level === 'Associate Degree');
  }, [filteredProgrammes]);

  const handleSelectProgramme = (prog: BahawalpurProgramme) => {
    setActiveProgramme(prog);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseDetail = () => {
    setActiveProgramme(null);
  };

  const handleApplyClick = (progName?: string) => {
    if (onOpenApply) {
      onOpenApply(progName);
    } else {
      window.open(
        'https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F',
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  const handleDownloadDetails = (prog: BahawalpurProgramme) => {
    // Generates a clean institutional curriculum summary download
    const documentText = `UNIVERSITY OF CENTRAL PUNJAB — BAHAWALPUR CAMPUS
OFFICIAL ACADEMIC PROGRAMME PROSPECTUS & FEE SCHEDULE — FALL 2026

Programme: ${prog.name} (${prog.degree})
Level: ${prog.level}
Academic Discipline: ${prog.category}
Total Credit Hours: ${prog.creditHours}

--------------------------------------------------------------------------------
ABOUT THE PROGRAMME
--------------------------------------------------------------------------------
${prog.about}

--------------------------------------------------------------------------------
WHAT YOU WILL LEARN
--------------------------------------------------------------------------------
${prog.whatYouWillLearn.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}

--------------------------------------------------------------------------------
POTENTIAL CAREER PATHWAYS
--------------------------------------------------------------------------------
${prog.careerPathways.map((item, idx) => `• ${item}`).join('\n')}

--------------------------------------------------------------------------------
YOUR NEXT STEP
--------------------------------------------------------------------------------
${prog.yourNextStep.overview}
${prog.yourNextStep.options.map((opt) => `- ${opt.title}: ${opt.description}`).join('\n')}

--------------------------------------------------------------------------------
PROGRAMME BENEFITS
--------------------------------------------------------------------------------
${prog.benefits.map((b) => `• ${b}`).join('\n')}

--------------------------------------------------------------------------------
OFFICIAL FEE STRUCTURE — FALL 2026
--------------------------------------------------------------------------------
Registration Fee: PKR ${prog.registrationFee.toLocaleString()}
Admission Fee: PKR ${prog.admissionFee.toLocaleString()}
Fee per Credit Hour: PKR ${prog.feePerCreditHour.toLocaleString()}
Total Credit Hours: ${prog.creditHours}
Estimated Total Fee: PKR ${prog.totalFee.toLocaleString()}
Yearly Average: PKR ${prog.yearlyAverage.toLocaleString()}

Disclaimer:
Fee information is based on the Fall 2026 structure supplied for UCP Bahawalpur.
UCP reserves the right to revise fees and credit hours.

--------------------------------------------------------------------------------
ADMISSION ELIGIBILITY
--------------------------------------------------------------------------------
Eligibility requirements are subject to the official UCP admission criteria for the programme.
Please confirm current requirements with the admissions office.

Admissions Portal: https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F
Campus Phone: 062-2202030 / 062-2202050
`;

    const blob = new Blob([documentText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${prog.id}-ucp-bahawalpur-fall2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const scrollToFeeTable = () => {
    if (detailFeeRef.current) {
      detailFeeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // =========================================================================
  // RENDER: DEDICATED PROGRAMME DETAIL EXPERIENCE (10 SECTIONS)
  // =========================================================================
  if (activeProgramme) {
    const prog = activeProgramme;
    return (
      <div className="bg-[#fcfbf9] text-stone-900 dark:bg-[#080f1d] dark:text-[#f8fafc] min-h-screen">
        {/* Navigation Breadcrumb & Back Bar */}
        <div className="bg-white border-b border-stone-200 sticky top-16 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <button
              onClick={handleCloseDetail}
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-[#092242] transition-colors focus:outline-none"
            >
              <ArrowLeft size={15} />
              <span>Back to All Programmes</span>
            </button>

            <div className="flex items-center gap-4 text-xs text-stone-500 font-mono">
              <span className="hidden sm:inline">UCP Bahawalpur</span>
              <span className="hidden sm:inline text-stone-300">/</span>
              <span>{prog.level}</span>
              <span className="text-stone-300">/</span>
              <span className="font-semibold text-stone-800">{prog.degree}</span>
            </div>
          </div>
        </div>

        {/* 1. PROGRAMME HERO (Natural photographic background with deep neutral contrast overlay) */}
        <section className="relative bg-[#0A1931] text-white overflow-hidden border-b border-slate-800">
          {/* Full-width continuous background image with Ken-Burns animation, anchored right for clear visibility */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <img
              src={prog.image}
              alt={prog.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getProgrammeFallbackImage(prog.id, prog.image);
              }}
              className={`w-full h-full object-cover object-center md:object-right animate-hero-kenburns brightness-[1.1] contrast-[1.05] ${
                prog.id === 'adp-business-administration' ? 'object-[center_35%]' : ''
              }`}
            />
          </div>

          {/* Clean dark neutral scrims for maximum text contrast without blue tinting */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0A1931]/95 from-0% via-[#0A1931]/75 via-45% to-transparent to-85% pointer-events-none" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A1931]/50 via-transparent to-transparent pointer-events-none" />

          {/* Foreground Hero Content: Clean, spacious text & actions on the left */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-3xl space-y-6">
              {/* Unboxed Metadata Header */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-amber-300 tracking-wider uppercase font-semibold">
                <span className="bg-amber-400/20 border border-amber-400/40 text-amber-300 px-2.5 py-0.5 rounded-full font-mono shadow-xs">
                  {prog.level}
                </span>
                <span className="text-white/60">·</span>
                <span className="text-white font-medium">{prog.category}</span>
                <span className="text-white/60">·</span>
                <span className="tabular-nums font-mono text-white font-medium">{prog.creditHours} Credit Hours</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.12] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] text-balance">
                {prog.name}
              </h1>

              <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]">
                {prog.shortDescription}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => handleApplyClick(prog.name)}
                  className="px-6 py-3.5 bg-[#b8121a] hover:bg-[#9a0f16] active:scale-95 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#b8121a]/30 focus:outline-none flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply for Fall 2026</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={scrollToFeeTable}
                  className="px-5 py-3.5 bg-white/15 hover:bg-white/25 active:scale-95 text-white border border-white/30 text-xs font-bold uppercase tracking-wider rounded-xl transition-all focus:outline-none cursor-pointer backdrop-blur-xs shadow-xs"
                >
                  View Fee Structure
                </button>
                <button
                  onClick={() => handleDownloadDetails(prog)}
                  className="px-5 py-3.5 bg-black/40 hover:bg-black/60 active:scale-95 text-white border border-white/25 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 focus:outline-none cursor-pointer backdrop-blur-xs"
                >
                  <Download size={14} />
                  <span>Download Details</span>
                </button>
              </div>

              {/* Live Campus Highlights Strip */}
              <div className="pt-3 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Admissions Open for Fall 2026</span>
                </div>
                <span className="text-white/50">·</span>
                <div className="flex items-center gap-1.5 text-white/90">
                  <GraduationCap size={14} className="text-amber-400" />
                  <span>UCP Constituent College Network</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. QUICK PROGRAMME FACTS (Horizontal Strip directly under hero) */}
        <section className="bg-stone-100 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
              <div className="pt-2 sm:pt-0 sm:px-4">
                <span className="block text-[11px] uppercase tracking-wider text-stone-500 font-medium">Degree Type</span>
                <span className="text-sm sm:text-base font-bold text-stone-900 mt-0.5 block">{prog.degree}</span>
              </div>
              <div className="pt-2 sm:pt-0 sm:px-4">
                <span className="block text-[11px] uppercase tracking-wider text-stone-500 font-medium">Credit Hours</span>
                <span className="text-sm sm:text-base font-bold text-stone-900 mt-0.5 block tabular-nums">{prog.creditHours}</span>
              </div>
              <div className="pt-2 sm:pt-0 sm:px-4">
                <span className="block text-[11px] uppercase tracking-wider text-stone-500 font-medium">Fee / Credit Hour</span>
                <span className="text-sm sm:text-base font-bold text-stone-900 mt-0.5 block tabular-nums">PKR {prog.feePerCreditHour.toLocaleString()}</span>
              </div>
              <div className="pt-2 sm:pt-0 sm:px-4">
                <span className="block text-[11px] uppercase tracking-wider text-stone-500 font-medium">Estimated Total Fee</span>
                <span className="text-sm sm:text-base font-bold text-stone-900 mt-0.5 block tabular-nums text-[#092242]">PKR {prog.totalFee.toLocaleString()}</span>
              </div>
              <div className="pt-2 sm:pt-0 sm:px-4">
                <span className="block text-[11px] uppercase tracking-wider text-stone-500 font-medium">Yearly Average</span>
                <span className="text-sm sm:text-base font-bold text-stone-900 mt-0.5 block tabular-nums text-[#b8121a]">PKR {prog.yearlyAverage.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

          {/* 2. ABOUT THE PROGRAMME */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase tracking-widest text-[#b8121a] font-bold block mb-1">
                Academic Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#092242] tracking-tight">
                About the Programme
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-base text-stone-700 leading-relaxed font-normal">
                {prog.about}
              </p>
              <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs text-stone-600">
                <span>Awarding Institution: <strong>University of Central Punjab</strong></span>
                <span>Campus: <strong>Bahawalpur</strong></span>
                <span>Admission Session: <strong>Fall 2026</strong></span>
              </div>
            </div>
          </section>

          <hr className="border-stone-200" />

          {/* 3. WHAT YOU WILL LEARN */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase tracking-widest text-[#b8121a] font-bold block mb-1">
                Curriculum Focus
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#092242] tracking-tight">
                What You Will Learn
              </h2>
              <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                Core academic and practical competencies developed across the academic term.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {prog.whatYouWillLearn.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl bg-white border border-stone-200 flex items-start gap-3 shadow-2xs"
                  >
                    <span className="w-6 h-6 rounded-full bg-stone-100 text-[#092242] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-stone-800 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <hr className="border-stone-200" />

          {/* 3.5. SEMESTER-BY-SEMESTER ROADMAP & SUBJECTS (EXCEL STYLE TABLE) */}
          <section className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#b8121a] font-bold block mb-1">
                Semester-Wise Curriculum
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#092242] tracking-tight">
                Scheme of Studies & Course Road Map
              </h2>
              <p className="mt-1 text-xs text-stone-500 leading-relaxed max-w-2xl font-light">
                Official semester-by-semester subject breakdown with course codes, academic classifications, and credit hour distribution for {prog.name}.
              </p>
            </div>

            <SemesterCurriculumTable
              programId={prog.id}
              programName={prog.name}
              level={prog.level}
            />
          </section>

          <hr className="border-stone-200" />

          {/* 4. CAREER PATHWAYS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase tracking-widest text-[#b8121a] font-bold block mb-1">
                Professional Horizons
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#092242] tracking-tight">
                Where Can This Degree Take You?
              </h2>
              <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                Potential career pathways include positions across corporate, public, and research sectors. Career outcomes depend upon individual academic performance and employer criteria.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-xs">
                <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-4">
                  Potential Career Pathways Include:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prog.careerPathways.map((role, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-stone-800 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#092242]" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <hr className="border-stone-200" />

          {/* 5. WHAT AFTER THIS PROGRAMME? (YOUR NEXT STEP) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase tracking-widest text-[#b8121a] font-bold block mb-1">
                Future Trajectory
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#092242] tracking-tight">
                Your Next Step
              </h2>
              <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                Strategic progression options available upon successful completion of the programme.
              </p>
            </div>
            <div className="lg:col-span-8 space-y-4">
              <p className="text-sm text-stone-700 leading-relaxed font-normal">
                {prog.yourNextStep.overview}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {prog.yourNextStep.options.map((opt, idx) => (
                  <div key={idx} className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#092242] mb-1">
                      {opt.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                ))}
              </div>
              {prog.level === 'Associate Degree' && (
                <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                  <strong>Associate Degree Transition Notice:</strong> Students completing this two-year programme may explore relevant bachelor's / post-ADP pathways subject to eligibility, university rules, and programme availability.
                </div>
              )}
            </div>
          </section>

          <hr className="border-stone-200" />

          {/* 6. PROGRAMME BENEFITS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase tracking-widest text-[#b8121a] font-bold block mb-1">
                Institutional Value
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#092242] tracking-tight">
                Why Study This Programme?
              </h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-3">
                {prog.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-stone-700">
                    <span className="mt-1 w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                      <Check size={11} />
                    </span>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <hr className="border-stone-200" />

          {/* 7. FEE STRUCTURE (PREMIUM TABLE) */}
          <section ref={detailFeeRef} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#b8121a] font-bold block">
                  Financial Schedule
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#092242] tracking-tight">
                  Fee Structure — Fall 2026
                </h2>
              </div>
              <span className="text-xs font-mono text-stone-500">
                Campus: UCP Bahawalpur
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 border-b border-stone-200 text-stone-700 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Registration Fee</th>
                    <th className="py-3.5 px-4">Admission Fee</th>
                    <th className="py-3.5 px-4">Fee / Credit Hour</th>
                    <th className="py-3.5 px-4">Total Credit Hours</th>
                    <th className="py-3.5 px-4">Estimated Total Fee</th>
                    <th className="py-3.5 px-4">Yearly Average</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-mono text-stone-800">
                  <tr className="hover:bg-stone-50 transition-colors">
                    <td className="py-4 px-4 tabular-nums">PKR {prog.registrationFee.toLocaleString()}</td>
                    <td className="py-4 px-4 tabular-nums">PKR {prog.admissionFee.toLocaleString()}</td>
                    <td className="py-4 px-4 tabular-nums">PKR {prog.feePerCreditHour.toLocaleString()}</td>
                    <td className="py-4 px-4 tabular-nums font-bold text-[#092242]">{prog.creditHours}</td>
                    <td className="py-4 px-4 tabular-nums font-bold text-base text-[#092242]">
                      PKR {prog.totalFee.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 tabular-nums font-bold text-[#b8121a]">
                      PKR {prog.yearlyAverage.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-[11px] text-stone-600 leading-relaxed font-sans">
              <strong>Notice:</strong> Fee information is based on the Fall 2026 structure supplied for UCP Bahawalpur. UCP reserves the right to revise fees and credit hours.
            </div>
          </section>

          {/* Bottom Return Bar */}
          <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
            <button
              onClick={handleCloseDetail}
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-[#092242] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to All Programmes</span>
            </button>
            <span className="text-xs text-stone-400 font-mono">
              University of Central Punjab · Bahawalpur Campus
            </span>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: MAIN ACADEMIC PROGRAMMES DIRECTORY PAGE
  // =========================================================================
  return (
    <div id="academic-programmes-section" className="bg-[#fcfbf9] text-stone-900 dark:bg-[#080f1d] dark:text-[#f8fafc] min-h-screen">
      
      {/* Editorial University Header (Deep neutral campus quadrangle hero with natural photographic tones) */}
      <section className="relative bg-[#0A1931] text-white border-b border-slate-800 py-16 sm:py-24 overflow-hidden">
        {/* Full-width continuous background image with Ken-Burns animation, anchored right */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="/assets/campus/13_hero_sunset_campus.jpg"
            alt="UCP Bahawalpur Campus Quadrangle"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center md:object-right animate-hero-kenburns brightness-[1.08] contrast-[1.04]"
          />
        </div>

        {/* Clean dark neutral scrim for natural photography without blue color cast */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0A1931]/95 from-0% via-[#0A1931]/75 via-45% to-transparent to-85% pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A1931]/50 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-bold bg-amber-400/10 border border-amber-400/25 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>University of Central Punjab · Bahawalpur Campus</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
              ACADEMIC PROGRAMMES
            </h1>

            <p className="text-base sm:text-lg font-serif italic text-amber-200/90">
              “Explore Your Path at UCP Bahawalpur”
            </p>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-light">
              Discover undergraduate & associate degree programmes designed to develop academic excellence, modern computing capabilities, and professional career readiness.
            </p>

            {/* Operational Verification Tag */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-stone-300 font-mono">
              <div className="inline-flex items-center gap-2 bg-black/40 border border-white/15 px-3.5 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Fall 2026 Admissions Open</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-black/40 border border-white/15 px-3.5 py-1.5 rounded-full">
                <span>27 Accredited Programmes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Data Rule Banner */}
      <div className="bg-stone-100 border-b border-stone-200 text-stone-600 text-xs py-2 px-4 text-center font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <span><strong>Official Campus Data:</strong> UCP Bahawalpur Fall 2026 verified schedule.</span>
          <span className="hidden sm:inline text-stone-300">|</span>
          <span className="text-stone-500">UCP reserves the right to revise fees and credit hours.</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Search & Academic Navigation Filter System */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programmes by name, keyword, or career (e.g. Computer Science, Artificial Intelligence, Business, Psychology, English, Science)..."
              className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#092242]/20 focus:border-[#092242]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 font-mono"
              >
                Clear
              </button>
            )}
          </div>

          {/* Academic Navigation Categories (Tabs) */}
          <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-1 border-b border-stone-100 scrollbar-none text-xs font-medium">
            <div className="flex items-center gap-1.5 shrink-0">
              {categoryTabs.map((tab) => {
                const isActive = selectedCategory === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setSelectedCategory(tab)}
                    className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors focus:outline-none cursor-pointer ${
                      isActive
                        ? 'bg-[#092242] text-white font-semibold'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {onOpenCalendar && (
              <button
                type="button"
                onClick={onOpenCalendar}
                className="px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors bg-white hover:bg-slate-50 text-[#0A1931] border border-slate-300 font-semibold flex items-center gap-1.5 cursor-pointer shrink-0 ml-2"
                title="Open Academic Calendar"
              >
                <span>Academic Calendar</span>
                <span className="text-[#C8102E] font-bold">→</span>
              </button>
            )}
          </div>

          {/* Detailed Filters (Degree & Credit Hours) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-stone-500 font-medium">Degree:</span>
                <div className="flex items-center gap-1">
                  {(['All', 'BS', 'BBA', 'ADP', 'ADS'] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDegreeFilter(d)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                        degreeFilter === d
                          ? 'bg-stone-200 text-stone-900 font-bold'
                          : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-stone-500 font-medium">Credit Hours:</span>
                <div className="flex items-center gap-1">
                  {(['All', '60-70', '71-80', '125-135', '136+'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCreditFilter(c)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                        creditFilter === c
                          ? 'bg-stone-200 text-stone-900 font-bold'
                          : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {(searchQuery || selectedCategory !== 'All' || degreeFilter !== 'All' || creditFilter !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setDegreeFilter('All');
                    setCreditFilter('All');
                  }}
                  className="text-xs text-[#b8121a] hover:underline flex items-center gap-1"
                >
                  <RotateCcw size={12} />
                  <span>Reset Filters</span>
                </button>
              )}
              <span className="text-stone-500 font-mono text-[11px]">
                Showing {filteredProgrammes.length} of {OFFICIAL_BAHAWALPUR_PROGRAMMES.length} Programmes
              </span>
            </div>
          </div>
        </div>

        {/* Empty Search State */}
        {filteredProgrammes.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8">
            <HelpCircle className="mx-auto text-stone-300 mb-3" size={36} />
            <h3 className="text-lg font-serif font-bold text-stone-800">No Matching Programmes Found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
              Please try adjusting your search terms or filter criteria to browse available UCP Bahawalpur programmes.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setDegreeFilter('All');
                setCreditFilter('All');
              }}
              className="mt-4 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
            >
              View All Programmes
            </button>
          </div>
        )}

        {/* 01. UNDERGRADUATE PROGRAMMES SECTION */}
        {undergraduateList.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-stone-200 pb-3 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono text-[#b8121a] font-bold uppercase tracking-widest block">
                  Category 01
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#092242] tracking-tight">
                  UNDERGRADUATE PROGRAMMES
                </h2>
              </div>
              <span className="text-xs font-mono text-stone-500">
                {undergraduateList.length} {undergraduateList.length === 1 ? 'Programme' : 'Programmes'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {undergraduateList.map((prog) => (
                <article
                  key={prog.id}
                  onClick={() => handleSelectProgramme(prog)}
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
                >
                  {/* Card Image */}
                  <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                    <img
                      src={prog.image}
                      alt={prog.name}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (prog.id === 'bs-psychology') {
                          target.src = 'https://i.ibb.co/zWQVBLTD/shutterstock-158110544-scaled.jpg';
                        } else if (prog.id === 'bs-physics') {
                          target.src = 'https://i.ibb.co/MkxJ7Nzy/Chat-GPT-Image-Sep-26-2026-09-44-35-AM.png';
                        } else if (prog.id === 'bba') {
                          target.src = 'https://i.ibb.co/TXgwt6f/Chat-GPT-Image-Sep-27-2026-07-07-56-AM.png';
                        } else if (prog.id === 'adp-artificial-intelligence') {
                          target.src = 'https://i.ibb.co/bMFsfmxh/hand-holding-ai-globe.jpg';
                        } else if (prog.id === 'adp-cyber-security' || prog.id === 'bs-cyber-security' || prog.id === 'bs-cyber') {
                          target.src = 'https://i.ibb.co/DPDbZQ7K/images.jpg';
                        } else if (prog.id === 'bs-mathematics') {
                          target.src = 'https://i.ibb.co/2Ys8Y5H3/shutterstock-2475273911-scaled.jpg';
                        } else if (prog.id === 'bs-chemistry') {
                          target.src = 'https://i.ibb.co/h1fDTVTm/p0f776fj.png';
                        } else if (prog.id === 'bs-zoology') {
                          target.src = 'https://i.ibb.co/hFKgG2vw/Zoology.png';
                        } else if (prog.id === 'adp-psychology') {
                          target.src = 'https://i.ibb.co/chP4mYWB/What-s-the-Difference-Between-a-Psychiatrist-and-Psychologist.webp';
                        } else if (prog.id === 'bs-english') {
                          target.src = 'https://i.ibb.co/cKvTywH6/360-F-409187796-W9bg-IQAKZYs-Wkc9g-Xt-Pbs5h-YAWXd6z1-T.jpg';
                        } else if (prog.id === 'bs-business-analytics') {
                          target.src = 'https://i.ibb.co/Ld75Vg2t/i-Stock-1311598658.jpg';
                        } else if (prog.id === 'bs-biotechnology') {
                          target.src = 'https://i.ibb.co/wFZF6w95/Biotechnology-1000x600px.jpg';
                        } else if (prog.id === 'bs-accounting-finance') {
                          target.src = 'https://i.ibb.co/p6MpMGDn/shutterstock-527098861-1-scaled.avif';
                        } else if (prog.id === 'bs-biochemistry') {
                          target.src = 'https://i.ibb.co/VW7jZHDF/pipette-over-test-tube-dropping-sample-chemical-into-sample-plant-scaled-jpg.webp';
                        } else if (prog.id === 'bs-computer-science') {
                          target.src = 'https://i.ibb.co/V0QdQKgG/images-1.jpg';
                        } else if (prog.id === 'adp-software-engineering') {
                          target.src = 'https://i.ibb.co/rf2T1y2M/images.jpg';
                        } else if (prog.id === 'adp-data-science') {
                          target.src = 'https://i.ibb.co/LDnggNLM/FUq-HEVVUs-AAb-ZB0.jpg';
                        } else if (prog.id === 'ads-zoology-botany-chemistry') {
                          target.src = 'https://i.ibb.co/GfDX6Zg7/pngtree-laboratory-plant-research-image-21361714.webp';
                        } else if (prog.id === 'ads-math-physics') {
                          target.src = 'https://i.ibb.co/wN2rcm0p/creative-concept-hand-holding-light-bulb-with-planets-mathematical-formulas-representing-idea-genera.jpg';
                        } else if (prog.id === 'adp-english') {
                          target.src = 'https://i.ibb.co/xdLNTjf/360-F-310395027-i-VFf-VOCWFUONEIo-Ri-Tk7-Wq-U7-GLTOf3-QE.jpg';
                        } else if (prog.id === 'adp-business-analytics') {
                          target.src = 'https://i.ibb.co/cKT5qwbp/What-is-business-analytics-Getty-Images-1281224851-e1708028042563.webp';
                        } else if (prog.id === 'adp-biotechnology') {
                          target.src = 'https://i.ibb.co/35mFgXjT/7052877-13ab.webp';
                        } else if (prog.id === 'adp-accounting-finance') {
                          target.src = 'https://i.ibb.co/xS78W5ZT/accounting-and-finance.jpg';
                        } else if (prog.id === 'adp-business-administration') {
                          target.src = 'https://i.ibb.co/Ps0SNKc7/images-1.jpg';
                        } else if (prog.id === 'adp-computer-science') {
                          target.src = 'https://i.ibb.co/nqtHPF6p/Online-Learning-South-Asia-Learning-Indoor-Getty-Images-1071652068.webp';
                        }
                      }}
                      className={`w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 ${
                        prog.id === 'adp-business-administration' ? 'object-[center_35%]' : 'object-center'
                      }`}
                    />
                    <div className="absolute top-3 left-3 bg-[#092242]/90 text-white text-[11px] font-mono px-2 py-0.5 rounded tracking-wide font-semibold">
                      {prog.degree}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Unboxed Metadata Discipline */}
                      <div className="text-[11px] text-stone-500 font-medium mb-1.5 flex items-center gap-1.5">
                        <span>{prog.category}</span>
                        <span>·</span>
                        <span className="font-mono tabular-nums">{prog.creditHours} Cr.</span>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-[#092242] group-hover:text-[#b8121a] transition-colors leading-snug">
                        {prog.name}
                      </h3>

                      <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {prog.shortDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="font-mono text-stone-500 tabular-nums">
                        PKR {prog.yearlyAverage.toLocaleString()}/yr avg
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectProgramme(prog);
                        }}
                        className="bg-[#0F2C61] hover:bg-[#1a428a] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 02. ASSOCIATE DEGREE PROGRAMMES SECTION */}
        {associateList.length > 0 && (
          <section className="space-y-6 pt-4">
            <div className="border-b border-stone-200 pb-3 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono text-[#b8121a] font-bold uppercase tracking-widest block">
                  Category 02
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#092242] tracking-tight">
                  Associate Degree Programmes — Fall 2026
                </h2>
              </div>
              <span className="text-xs font-mono text-stone-500">
                {associateList.length} {associateList.length === 1 ? 'Programme' : 'Programmes'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {associateList.map((prog) => (
                <article
                  key={prog.id}
                  onClick={() => handleSelectProgramme(prog)}
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
                >
                  {/* Card Image */}
                  <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                    <img
                      src={prog.image}
                      alt={prog.name}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (prog.id === 'adp-artificial-intelligence') {
                          target.src = 'https://i.ibb.co/bMFsfmxh/hand-holding-ai-globe.jpg';
                        } else if (prog.id === 'adp-cyber-security') {
                          target.src = 'https://i.ibb.co/DPDbZQ7K/images.jpg';
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#092242]/90 text-white text-[11px] font-mono px-2 py-0.5 rounded tracking-wide font-semibold">
                      {prog.degree}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Unboxed Metadata Discipline */}
                      <div className="text-[11px] text-stone-500 font-medium mb-1.5 flex items-center gap-1.5">
                        <span>{prog.category}</span>
                        <span>·</span>
                        <span className="font-mono tabular-nums">{prog.creditHours} Cr.</span>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-[#092242] group-hover:text-[#b8121a] transition-colors leading-snug">
                        {prog.name}
                      </h3>

                      <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {prog.shortDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="font-mono text-stone-500 tabular-nums">
                        PKR {prog.yearlyAverage.toLocaleString()}/yr avg
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectProgramme(prog);
                        }}
                        className="bg-[#0F2C61] hover:bg-[#1a428a] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Global Admissions Notice Box */}
        <section className="bg-stone-50 rounded-2xl border border-stone-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-serif font-bold text-[#092242]">
              Need Guidance on Programme Selection?
            </h3>
            <p className="text-xs text-stone-600 max-w-xl leading-relaxed">
              Our academic advisors at the Bahawalpur Campus are available Monday to Friday (9:00 AM – 5:00 PM) to assist prospective students with degree path guidance and eligibility verification.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleApplyClick()}
              className="px-5 py-2.5 bg-[#b8121a] hover:bg-[#9a0f16] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
            >
              Apply Online
            </button>
            <a
              href="mailto:admissions.bwp@ucp.edu.pk"
              className="px-4 py-2.5 bg-white border border-stone-300 hover:border-stone-400 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
            >
              Email Admissions
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
