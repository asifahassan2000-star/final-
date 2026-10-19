import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight, CheckCircle2, Award, Landmark, Building2, Sparkles, ShieldCheck } from 'lucide-react';

interface LegacyMilestone {
  id: string;
  year: string;
  label: string;
  chapter: string;
  title: string;
  institution: string;
  narrative: string;
  significance: string;
  imageUrl: string;
  imageAlt: string;
  figureCaption: string;
}

const LEGACY_MILESTONES: LegacyMilestone[] = [
  {
    id: 'milestone-1985',
    year: '1985',
    label: 'Foundation',
    chapter: '01',
    title: 'The Foundation of Punjab Group of Colleges',
    institution: 'Punjab College of Commerce · Muslim Town, Lahore',
    narrative: 'The educational journey commenced with the establishment of Punjab College of Commerce on Muslim Town, Lahore. Founded with the mission to make disciplined, rigorous, and forward-looking education accessible to young Pakistanis, it established foundational academic standards that would reshape higher education in the province.',
    significance: 'Laid the institutional cornerstone of what grew to become Pakistan’s largest and most respected educational network.',
    imageUrl: '/assets/campus/13_hero_sunset_campus.jpg',
    imageAlt: 'Historical and architectural foundations of Punjab Group of Colleges',
    figureCaption: 'Fig. 1 — The inception of modern collegiate education, establishing a national academic benchmark.',
  },
  {
    id: 'milestone-1987',
    year: '1987',
    label: 'Professional Law',
    chapter: '02',
    title: 'Establishment of Punjab Law College',
    institution: 'Punjab Law College · Professional Jurisprudence',
    narrative: 'Recognizing that national progress requires strong constitutional jurisprudence and ethical governance, the network expanded into professional disciplines through Punjab Law College. The institution pioneered structured clinical legal education, producing advocates, judges, and public leaders across Pakistan.',
    significance: 'Marked the strategic institutional expansion into accredited professional degree education.',
    imageUrl: '/assets/campus/9_facilities_grand_staircase.jpg',
    imageAlt: 'Grand architectural staircase symbolizing structured professional education',
    figureCaption: 'Fig. 2 — Expansion into professional jurisprudence and legal scholarship.',
  },
  {
    id: 'milestone-1993',
    year: '1993',
    label: 'Computer Science',
    chapter: '03',
    title: 'Pioneering Computer Science Education',
    institution: 'Punjab Institute of Computer Science (PICS)',
    narrative: 'Foreseeing the global dawn of information technology and software engineering, the Punjab Institute of Computer Science was founded in Lahore. PICS was among the earliest institutions in Pakistan to deliver formal degree curricula in computing, cultivating the nation’s first generation of software architects and systems analysts.',
    significance: 'Provincial pioneer in structured degree programs for computer science and software development.',
    imageUrl: '/assets/facilities/comp-lab-1.jpg',
    imageAlt: 'High-tech computing laboratories at University of Central Punjab',
    figureCaption: 'Fig. 3 — High-technology workstations and software engineering laboratories.',
  },
  {
    id: 'milestone-2002',
    year: '2002',
    label: 'University Charter',
    chapter: '04',
    title: 'Statutory University Charter Received',
    institution: 'Government of the Punjab · Act IX of 2002',
    narrative: 'Following extensive pre-charter university development from 1996 to 1999, the University of Central Punjab officially received its statutory charter from the Government of the Punjab through an Act of the Provincial Assembly (Punjab Act IX of 2002), conferring full autonomous degree-awarding authority recognized by the Higher Education Commission (HEC).',
    significance: 'Statutory milestone inaugurating UCP as an autonomous, multidisciplinary university.',
    imageUrl: '/assets/campus/12_about_architecture_exterior.jpg',
    imageAlt: 'Statutory university architectural exterior and academic wings',
    figureCaption: 'Fig. 4 — Chartered autonomy, conferring degree-awarding authority across multidisciplinary faculties.',
  },
  {
    id: 'milestone-2012',
    year: '2012',
    label: 'Bahawalpur Campus',
    chapter: '05',
    title: 'Establishment of UCP Bahawalpur Campus',
    institution: 'University of Central Punjab · Bahawalpur Campus',
    narrative: 'Established in 2012 on Airport Road, UCP Bahawalpur represents the permanent local presence of the University of Central Punjab, bringing over a decade of higher academic distinction to Southern Punjab. Set across expansive grounds, the campus provides accredited undergraduate (BS) and associate degree (ADP) programs, distinguished faculties, and state-of-the-art technological laboratories.',
    significance: 'Extending premier accredited higher education and research infrastructure to the students of Bahawalpur since 2012.',
    imageUrl: '/assets/campus/8_campus_life_courtyard.jpg',
    imageAlt: 'Purpose-built campus architecture and courtyard at UCP Bahawalpur',
    figureCaption: 'Fig. 5 — Established in 2012: The purpose-built academic complex and courtyard at UCP Bahawalpur.',
  },
];

interface OurLegacySectionProps {
  onOpenApply?: () => void;
  onOpenProgrammesPage?: () => void;
  onScrollTo?: (id: string) => void;
  onOpenLegacyPage?: () => void;
}

export const OurLegacySection: React.FC<OurLegacySectionProps> = ({
  onOpenApply,
  onOpenProgrammesPage,
  onScrollTo,
  onOpenLegacyPage,
}) => {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(LEGACY_MILESTONES[0].id);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const milestoneRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the section
      const totalDist = rect.height - windowHeight * 0.5;
      const currentDist = -rect.top + windowHeight * 0.3;
      const progress = Math.max(0, Math.min(1, currentDist / totalDist));
      setScrollProgress(progress);

      // Determine active milestone
      const scrollPosition = window.scrollY + windowHeight * 0.45;
      for (let i = LEGACY_MILESTONES.length - 1; i >= 0; i--) {
        const milestone = LEGACY_MILESTONES[i];
        const el = milestoneRefs.current[milestone.id];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveMilestoneId(milestone.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMilestone = (id: string) => {
    const el = milestoneRefs.current[id];
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="legacy-section"
      ref={sectionRef}
      className="relative bg-[#FDFBF7] text-[#0A1931] py-24 sm:py-32 lg:py-40 border-t border-[#0A1931]/10 selection:bg-[#A51C30] selection:text-white overflow-hidden"
      aria-labelledby="legacy-main-heading"
    >
      {/* Subtle fine architectural hairline texture in background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(#0A1931 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. RESTRAINED EDITORIAL SECTION INTRODUCTION
            ========================================================================= */}
        <header className="max-w-3xl mb-16 sm:mb-20" data-reveal="mask">
          
          {/* Small Eyebrow Label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#A51C30]">
              OUR LEGACY
            </span>
            <span className="h-px w-8 bg-[#A51C30]/50" aria-hidden="true" />
          </div>

          {/* Main Heading: 42–56px desktop, 30–38px mobile, elegant, medium/semi-bold */}
          <div className="mask-reveal-wrap">
            <h2
              id="legacy-main-heading"
              className="mask-reveal-child text-3xl sm:text-4xl lg:text-[50px] font-serif font-semibold text-[#0A1931] tracking-tight leading-[1.16] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
            >
              Building a Legacy of Education and Excellence
            </h2>
          </div>

          {/* Core Institutional Philosophy Quote */}
          <blockquote className="border-l-2 border-[#A51C30] pl-4 sm:pl-5 py-1 mb-6 text-lg sm:text-[20px] text-[#0A1931] font-serif italic leading-relaxed bg-[#FAF8F5]/80 p-3">
            “Rooted in a tradition of educational excellence, UCP Bahawalpur continues a journey shaped by knowledge, ambition and opportunity.”
          </blockquote>

          {/* Dual Editorial Movements: A History of Progress & A Campus for the Future */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#A51C30] mb-1.5 flex items-center gap-1.5">
                <Landmark size={14} />
                A History of Progress
              </h3>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-sans">
                From a pioneering commerce college in 1985 to a nationally chartered university in 2002, our institutional timeline records disciplined academic expansion across professional law, computer science, and research faculties.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#A51C30] mb-1.5 flex items-center gap-1.5">
                <Building2 size={14} />
                A Campus for the Future
              </h3>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-sans">
                UCP Bahawalpur connects this 39-year university tradition directly with Southern Punjab, offering accredited degree programs within purpose-built architectural facilities and high-technology laboratories.
              </p>
            </div>
          </div>

          {/* Very thin navy hairline divider */}
          <div className="h-px w-24 bg-[#A51C30]/50 mt-8" aria-hidden="true" />
        </header>

        {/* =========================================================================
            2. THE EDITORIAL HISTORICAL COMPOSITION & LEGACY THREAD
            Asymmetric 3-zone layout:
            LEFT: Small label + Timeline Thread + Milestone Year
            CENTER: Heading + Factual Narrative + Significance
            RIGHT: Large authentic campus photography with micro-hover
            ========================================================================= */}
        <div className="relative">
          
          {/* Sticky Timeline Bar on Desktop (Subtle vertical hairline thread) */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-48 pointer-events-none z-10">
            <div className="sticky top-32 pointer-events-auto space-y-6 bg-[#FDFBF7]/95 backdrop-blur-xs py-5 pr-6 border-r border-[#0A1931]/10">
              
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0A1931]/50">
                  LEGACY THREAD
                </span>
                <span className="text-[10px] font-mono text-[#A51C30] font-bold">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>

              {/* Dynamic Progress Track Line */}
              <div className="relative pl-3">
                {/* Background vertical hairline */}
                <div className="absolute left-[7px] top-1 bottom-2 w-px bg-[#0A1931]/15" aria-hidden="true" />
                {/* Foreground active progress line */}
                <div 
                  className="absolute left-[7px] top-1 w-[2px] bg-[#A51C30] transition-all duration-200" 
                  style={{ height: `${scrollProgress * 100}%` }}
                  aria-hidden="true" 
                />

                <nav className="space-y-4 relative" aria-label="Legacy timeline navigation">
                  {LEGACY_MILESTONES.map((m) => {
                    const isActive = activeMilestoneId === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => scrollToMilestone(m.id)}
                        className={`group flex items-center gap-3 w-full text-left transition-all duration-300 cursor-pointer ${
                          isActive ? 'text-[#0A1931]' : 'text-slate-400 hover:text-slate-700'
                        }`}
                      >
                        {/* Timeline Node Point */}
                        <span 
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shrink-0 ${
                            isActive 
                              ? 'bg-[#A51C30] scale-125 ring-4 ring-[#A51C30]/20' 
                              : 'bg-slate-300 group-hover:bg-slate-400'
                          }`} 
                          aria-hidden="true"
                        />
                        
                        <div className="min-w-0">
                          <span className={`block font-serif text-sm font-semibold tracking-wide transition-colors ${isActive ? 'text-[#A51C30] font-bold' : ''}`}>
                            {m.year}
                          </span>
                          <span className="block text-[11px] font-sans truncate text-slate-500">
                            {m.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {onOpenLegacyPage && (
                <div className="pt-4 border-t border-[#0A1931]/10">
                  <button
                    onClick={onOpenLegacyPage}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A51C30] hover:text-[#0A1931] transition-colors cursor-pointer group/nav"
                  >
                    <span>Full History Archive</span>
                    <ArrowRight size={12} className="transition-transform group-hover/nav:translate-x-1" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sequential Historical Chapters Flow */}
          <div className="lg:pl-56 space-y-24 sm:space-y-32 lg:space-y-36">
            {LEGACY_MILESTONES.map((milestone, idx) => {
              const isActive = activeMilestoneId === milestone.id;
              return (
                <article
                  key={milestone.id}
                  id={milestone.id}
                  ref={(el) => {
                    milestoneRefs.current[milestone.id] = el;
                  }}
                  className={`scroll-mt-28 transition-all duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-85'
                  }`}
                  aria-label={`${milestone.year}: ${milestone.title}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    
                    {/* Editorial Content (Left 7 Columns in Grid) */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
                      
                      {/* Chapter Kicker & Historical Year Header */}
                      <div className="flex items-center justify-between border-b border-[#0A1931]/10 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-[#A51C30] tracking-wider uppercase">
                            CHAPTER {milestone.chapter}
                          </span>
                          <span className="text-[#0A1931]/30">·</span>
                          <span className="font-serif text-base font-bold text-[#0A1931]">
                            {milestone.year}
                          </span>
                        </div>
                        <span className="text-[11px] font-sans font-medium uppercase tracking-[0.16em] text-[#0A1931]/50">
                          {milestone.label}
                        </span>
                      </div>

                      {/* Milestone Title */}
                      <div className="space-y-1.5">
                        <h3 
                          className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-semibold text-[#0A1931] tracking-tight leading-tight"
                          style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
                        >
                          {milestone.title}
                        </h3>
                        <p className="text-[13px] font-sans font-bold uppercase tracking-[0.14em] text-[#A51C30]">
                          {milestone.institution}
                        </p>
                      </div>

                      {/* Factual Narrative Paragraph */}
                      <p className="text-[16px] sm:text-[17.5px] text-slate-600 leading-relaxed font-sans max-w-[620px]">
                        {milestone.narrative}
                      </p>

                      {/* Institutional Significance Highlight */}
                      <div className="border-l-2 border-[#A51C30] pl-4 py-1.5 bg-[#FAF8F5] p-3.5 text-xs sm:text-[13px] text-[#0A1931] font-sans leading-relaxed">
                        <strong className="font-semibold text-[#0A1931] block mb-0.5">
                          Institutional Significance:
                        </strong>
                        <span className="text-slate-600">{milestone.significance}</span>
                      </div>

                    </div>

                    {/* Museum-Grade Photographic Showcase (Right 5 Columns in Grid) */}
                    <div className="lg:col-span-5">
                      <div className="group relative overflow-hidden bg-[#FAF8F5] border border-[#0A1931]/15 p-2 shadow-xs transition-all duration-500 hover:border-[#0A1931]/30 hover:shadow-md">
                        
                        {/* Image Frame with micro-hover scale */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                          <img
                            src={milestone.imageUrl}
                            alt={milestone.imageAlt}
                            loading="eager"
                            decoding="async"
                            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                          />
                          {/* Fine architectural hairline photo border */}
                          <div className="absolute inset-0 border border-black/5 pointer-events-none" aria-hidden="true" />
                        </div>

                        {/* Quiet Figure Caption */}
                        <div className="px-1 pt-2.5 pb-0.5">
                          <p className="text-[11px] font-serif italic text-slate-500 leading-tight">
                            {milestone.figureCaption}
                          </p>
                        </div>

                      </div>
                    </div>

                  </div>

                  {/* Subtle Separator between Milestones */}
                  {idx < LEGACY_MILESTONES.length - 1 && (
                    <div className="mt-20 sm:mt-28 border-b border-[#0A1931]/5" aria-hidden="true" />
                  )}
                </article>
              );
            })}
          </div>

        </div>

        {/* =========================================================================
            3. DIGNIFIED CLOSING STATEMENT & CALL TO EXPLORATION
            ========================================================================= */}
        <div className="mt-24 sm:mt-32 pt-12 border-t border-[#0A1931]/10 text-center max-w-2xl mx-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-[#A51C30] mx-auto mb-4 opacity-75" aria-hidden="true" />
          
          <h4 
            className="text-xl sm:text-2xl font-serif font-semibold text-[#0A1931] tracking-tight leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
          >
            A Living Heritage of Knowledge
          </h4>

          <p className="text-sm text-slate-600 font-sans leading-relaxed mt-2.5 max-w-lg mx-auto">
            Thirty-nine years of documented educational progress now empower students at UCP Bahawalpur to pursue world-class degrees in Southern Punjab.
          </p>

          <div className="pt-6 flex items-center justify-center gap-4 flex-wrap">
            {onOpenProgrammesPage && (
              <button
                onClick={onOpenProgrammesPage}
                className="inline-flex items-center gap-2 bg-[#0A1931] hover:bg-[#A51C30] text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors rounded-lg cursor-pointer shadow-xs"
              >
                <span>Explore Academic Programs</span>
                <ArrowRight size={13} />
              </button>
            )}

            {onOpenLegacyPage && (
              <button
                onClick={onOpenLegacyPage}
                className="inline-flex items-center gap-2 border border-[#0A1931]/20 hover:border-[#A51C30] text-[#0A1931] hover:text-[#A51C30] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors rounded-lg cursor-pointer bg-white"
              >
                <span>Complete Heritage Archive</span>
                <ChevronRight size={14} className="text-[#A51C30]" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
