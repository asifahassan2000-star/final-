import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Award, Sparkles, BookOpen } from 'lucide-react';

export interface GalleryPhoto {
  id: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  fallbackImage: string;
  alt: string;
  caption: string;
  dateline: string;
  category: string;
  badge?: string;
}

export const EditorialNewspaperSection: React.FC = () => {
  // 1. SEMINAR SECTION (6 authentic photographs — Big, prominent presentation)
  const communicationSeminarPhotos: GalleryPhoto[] = [
    {
      id: 'comm-keynote-large',
      title: 'Seminar on Effective Communication',
      subtitle: 'Keynote Address on Executive Oratory, Rhetorical Precision & Leadership Presence',
      imageSrc: '/assets/events/seminar-comm-keynote-large.jpg',
      fallbackImage: 'https://i.ibb.co/4wq6trSW/Whats-App-Image-2026-10-11-at-11-04-13-PM.jpg',
      alt: 'Keynote speaker delivering executive address on effective communication at UCP Bahawalpur',
      caption: 'Distinguished guest speaker addressing students and faculty on high-impact verbal rhetoric, corporate diplomacy, and confident public delivery.',
      dateline: 'EXECUTIVE AUDITORIUM · MAIN LECTURE',
      category: 'EXECUTIVE SEMINAR',
      badge: 'KEYNOTE ADDRESS',
    },
    {
      id: 'seminar-speaker-session',
      title: 'Speaker Lecture & Discourse Session',
      subtitle: 'Mastering Professional Eloquence & Interpersonal Agility',
      imageSrc: '/assets/events/seminar-speaker-session.jpg',
      fallbackImage: 'https://i.ibb.co/LzRyY8vQ/Whats-App-Image-2026-10-12-at-3-48-34-AM.jpg',
      alt: 'Distinguished speaker presenting during executive seminar at UCP Bahawalpur',
      caption: 'Practical exercises in strategic messaging, audience engagement, and confident oral argumentation for collegiate scholars.',
      dateline: 'MAIN AUDITORIUM · PODIUM SESSION',
      category: 'EXECUTIVE SEMINAR',
      badge: 'SPEAKER LECTURE',
    },
    {
      id: 'seminar-stage-panel',
      title: 'Executive Stage Panel & Academic Review',
      subtitle: 'Faculty Dignitaries & Invited Guest Speakers in Plenary Discussion',
      imageSrc: '/assets/events/seminar-stage-panel.jpg',
      fallbackImage: 'https://i.ibb.co/Z6LzQgNC/Whats-App-Image-2026-10-12-at-3-50-32-AM.jpg',
      alt: 'Executive seminar stage and distinguished faculty panel at UCP Bahawalpur',
      caption: 'Senior administration, visiting guest educators, and academic leadership presiding over executive communication proceedings.',
      dateline: 'EXECUTIVE STAGE · FORMAL PLENARY',
      category: 'EXECUTIVE SEMINAR',
      badge: 'EXECUTIVE STAGE',
    },
    {
      id: 'seminar-audience-delegates',
      title: 'Audience Hall & Student Assembly',
      subtitle: 'Active Student Engagement Across Academic Faculties',
      imageSrc: '/assets/events/seminar-audience-delegates.jpg',
      fallbackImage: 'https://i.ibb.co/b58txN9k/Whats-App-Image-2026-10-12-at-3-49-32-AM.jpg',
      alt: 'Full audience hall of students and faculty during seminar at UCP Bahawalpur',
      caption: 'Packed lecture theater with students, researchers, and faculty members actively engaged in executive training modules.',
      dateline: 'CENTRAL AUDITORIUM · FULL ASSEMBLY',
      category: 'EXECUTIVE SEMINAR',
      badge: 'HALL ASSEMBLY',
    },
    {
      id: 'comm-overview-1',
      title: 'Distinguished Guest Lecture & Faculty Assembly',
      subtitle: 'Interpersonal Dynamics and Scholarly Communication Standards',
      imageSrc: '/assets/events/seminar-overview-1.jpg',
      fallbackImage: 'https://i.ibb.co/p9wFJZF/image-15.jpg',
      alt: 'Seminar on effective communication audience and executive stage',
      caption: 'Undergraduate student delegations and senior academicians engaged in an intensive seminar exploring contemporary business discourse.',
      dateline: 'EXECUTIVE HALL · SESSION 01',
      category: 'EXECUTIVE SEMINAR',
      badge: 'FACULTY ASSEMBLY',
    },
    {
      id: 'comm-overview-2',
      title: 'Interactive Deliberations & Q&A Discourse',
      subtitle: 'Critical Inquiry, Cross-Examination & Collaborative Speaking Roundtables',
      imageSrc: '/assets/events/seminar-overview-2.jpg',
      fallbackImage: 'https://i.ibb.co/Kpn9Bc8J/Whats-App-Image-2026-10-11-at-11-02-58-PM.jpg',
      alt: 'Interactive discussion and student participation in communication seminar',
      caption: 'Dynamic participant question-and-answer exchanges refining conversational agility, debate mechanics, and interpersonal clarity.',
      dateline: 'SEMINAR SUITE · WORKSHOP SESSION',
      category: 'EXECUTIVE SEMINAR',
      badge: 'Q&A WORKSHOP',
    },
  ];

  // 2. INTERNATIONAL SYMPOSIUM ON AI & SECURE SYSTEMS (Both together, Big Size, Less Wording)
  const symposiumPhotos: GalleryPhoto[] = [
    {
      id: 'symp-ai-secure-1',
      title: 'International Symposium on AI and Secure Systems',
      subtitle: 'Keynote Deliberations & Technical Plenary Sessions',
      imageSrc: '/assets/events/symposium-ai-secure-systems-1.jpg',
      fallbackImage: 'https://i.ibb.co/Z6LzQgNC/Whats-App-Image-2026-10-12-at-3-50-32-AM.jpg',
      alt: 'International Symposium on AI and Secure Systems Keynote Session at UCP Bahawalpur',
      caption: 'International researchers and computational scientists convening in the Executive Auditorium for keynote deliberations on AI, neural systems, and secure architectures.',
      dateline: 'FLAGSHIP SYMPOSIUM · GRAND AUDITORIUM',
      category: 'INTERNATIONAL SYMPOSIUM',
      badge: 'KEYNOTE STAGE',
    },
    {
      id: 'symp-ai-secure-2',
      title: 'International Symposium on AI and Secure Systems',
      subtitle: 'International Research Delegates & Academic Colloquium',
      imageSrc: '/assets/events/symposium-ai-secure-systems-2.jpg',
      fallbackImage: 'https://i.ibb.co/ymcGpgCf/Whats-App-Image-2026-10-12-at-3-51-10-AM.jpg',
      alt: 'Distinguished international delegates attending AI and Secure Systems symposium at UCP Bahawalpur',
      caption: 'Distinguished international scholars and department faculty reviewing breakthroughs in machine learning, cryptographic protocols, and automated secure computing.',
      dateline: 'RESEARCH COUNCIL FORUM · PLENARY',
      category: 'INTERNATIONAL SYMPOSIUM',
      badge: 'DELEGATES ASSEMBLY',
    },
  ];

  // 3. PROJECT EXHIBITION PHOTOS (8 authentic photographs — with https://ibb.co/S4mSWfnT on top!)
  const projectExhibitionPhotos: GalleryPhoto[] = [
    {
      id: 'proj-top',
      title: 'Annual Student Project & Innovation Exhibition',
      subtitle: 'Flagship Showcase of Applied Computing, Embedded Hardware & Commercial Innovations',
      imageSrc: '/assets/events/project-exhibition-top.jpg',
      fallbackImage: 'https://i.ibb.co/gLWYH4T1/Whats-App-Image-2026-10-11-at-11-43-36-PM.jpg',
      alt: 'UCP Bahawalpur Student Project Exhibition Flagship Showcase Arena',
      caption: 'Flagship exhibition hall welcoming academic evaluators, industrial executives, and university delegations reviewing senior capstone innovations.',
      dateline: 'CENTRAL EXHIBITION HALL · LEAD SHOWCASE',
      category: 'PROJECT EXHIBITION',
      badge: 'LEAD ARENA',
    },
    {
      id: 'proj-1',
      title: 'Applied Engineering, Computing & Commercial Capstones',
      subtitle: 'Cross-Faculty Evaluation with Leading Tech Professionals',
      imageSrc: '/assets/events/project-exhibition.jpg',
      fallbackImage: 'https://i.ibb.co/vvQkvTcd/Whats-App-Image-2026-10-11-at-11-40-34-PM.jpg',
      alt: 'UCP Bahawalpur Student Project Exhibition Main Hall Showcase',
      caption: 'Undergraduate and graduate students presenting working prototypes, embedded systems, and enterprise software systems to evaluation panels.',
      dateline: 'DEPARTMENTAL SHOWCASE · EXHIBITION ARENA',
      category: 'PROJECT EXHIBITION',
      badge: 'MAIN ARENA',
    },
    {
      id: 'proj-7',
      title: 'Student Innovation Pods & Interactive Live Demos',
      subtitle: 'Hands-on Technical Execution Evaluated by Departmental Juries',
      imageSrc: '/assets/events/project-exhibition-7.jpg',
      fallbackImage: 'https://i.ibb.co/wr04XwP2/Whats-App-Image-2026-10-11-at-11-42-37-PM.jpg',
      alt: 'Student developers demonstrating active project hardware and software',
      caption: 'Live demonstrations of automated systems, web architectures, and hardware modules undergoing scrutiny by industry panels.',
      dateline: 'ENGINEERING PODS · LIVE DEMO',
      category: 'PROJECT EXHIBITION',
      badge: 'LIVE DEMO',
    },
    {
      id: 'proj-2',
      title: 'Robotics & Hardware Systems Demonstrations',
      subtitle: 'Microcontroller Firmware & Industrial Automation Frameworks',
      imageSrc: '/assets/events/project-exhibition-2.jpg',
      fallbackImage: 'https://i.ibb.co/wxv8Pzc/Whats-App-Image-2026-10-11-at-11-46-24-PM.jpg',
      alt: 'Students demonstrating robotics and hardware innovation projects',
      caption: 'Interactive robotics models and automated sensor nodes tested live during peer and faculty review sessions.',
      dateline: 'EMBEDDED SYSTEMS LAB · POD 02',
      category: 'PROJECT EXHIBITION',
      badge: 'ROBOTICS & EMBEDDED',
    },
    {
      id: 'proj-3',
      title: 'Software Architectures & AI Capstone Juries',
      subtitle: 'Technical Rigour Judged by Industrial Software Architects',
      imageSrc: '/assets/events/project-exhibition-3.jpg',
      fallbackImage: 'https://i.ibb.co/KBSTmxb/Whats-App-Image-2026-10-11-at-11-43-53-PM.jpg',
      alt: 'Student developers explaining cloud and algorithmic solutions to juries',
      caption: 'Senior engineering faculties and industry delegates conducting in-depth technical code audits and viva assessments.',
      dateline: 'INNOVATION ATRIUM · JURY STAGE',
      category: 'PROJECT EXHIBITION',
      badge: 'TECHNICAL JURY',
    },
    {
      id: 'proj-4',
      title: 'Smart Automation & IoT Demonstration Pods',
      subtitle: 'Applied Prototypes Addressing Real-World Challenges',
      imageSrc: '/assets/events/project-exhibition-4.jpg',
      fallbackImage: 'https://i.ibb.co/tTkCHVb9/Whats-App-Image-2026-10-11-at-11-46-24-PM.jpg',
      alt: 'Exhibition project display boards and hardware interfaces',
      caption: 'Telemetry devices, agricultural automation modules, and smart monitors exhibited with live serial data visualization.',
      dateline: 'COMPUTING & ENGINEERING PAVILION',
      category: 'PROJECT EXHIBITION',
      badge: 'IOT & AUTOMATION',
    },
    {
      id: 'proj-5',
      title: 'Commercial Startup Models & Incubation Pitches',
      subtitle: 'Market Viability & Business Feasibility Formulations',
      imageSrc: '/assets/events/project-exhibition-5.jpg',
      fallbackImage: 'https://i.ibb.co/MDT4rNPv/Whats-App-Image-2026-10-11-at-11-41-20-PM.jpg',
      alt: 'Students pitching startup models and project feasibility studies',
      caption: 'Teams displaying commercial viability, unit economics, and operational roadmaps to angel investors and visiting venture leaders.',
      dateline: 'ENTREPRENEURSHIP SUITE · DISPLAY POD',
      category: 'PROJECT EXHIBITION',
      badge: 'INCUBATION PITCH',
    },
    {
      id: 'proj-6',
      title: 'Engineering Prototyping & Capstone Assembly Arena',
      subtitle: 'Interdisciplinary Collaboration Across Computing & Management',
      imageSrc: '/assets/events/project-exhibition-6.jpg',
      fallbackImage: 'https://i.ibb.co/Y4084CbJ/Whats-App-Image-2026-10-11-at-11-44-52-PM.jpg',
      alt: 'Students and visitors interacting around project exhibition showcase booths',
      caption: 'Visitors, visiting educators, and students interacting across exhibition stands to evaluate technical execution and market potential.',
      dateline: 'CENTRAL ATRIUM · MAIN ARENA',
      category: 'PROJECT EXHIBITION',
      badge: 'EXHIBITION ARENA',
    },
  ];

  // Combined photographs for master fullscreen lightbox (17 photographs total)
  const allPhotos: GalleryPhoto[] = [
    ...symposiumPhotos,
    ...communicationSeminarPhotos,
    ...projectExhibitionPhotos,
  ];

  // Active indices (default 0 for each section, meaning project exhibition starts with project-exhibition-top.jpg on top!)
  const [activeCommIdx, setActiveCommIdx] = useState(0);
  const [activeSympIdx, setActiveSympIdx] = useState(0);
  const [activeProjIdx, setActiveProjIdx] = useState(0);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (photoId: string) => {
    const idx = allPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % allPhotos.length);
    }
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + allPhotos.length) % allPhotos.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') handleNextPhoto();
      else if (e.key === 'ArrowLeft') handlePrevPhoto();
      else if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const activeCommPhoto = communicationSeminarPhotos[activeCommIdx];
  const activeSympPhoto = symposiumPhotos[activeSympIdx];
  const activeProjPhoto = projectExhibitionPhotos[activeProjIdx];

  const easeCurve = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="relative mb-24 sm:mb-32 select-none">
      
      {/* ====================================================================
          MINIMAL OFFICIAL MASTHEAD STRIP (Clean, Decent, Literary)
          ==================================================================== */}
      <div className="border-b border-[#0F2C61]/15 dark:border-white/10 pb-4 mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[#0F2C61] dark:text-slate-200">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.24em] font-semibold text-[#0F2C61]/90 dark:text-amber-400">
              COLLEGIATE ARCHIVE · OFFICIAL DISPATCHES
            </span>
            <span className="h-3 w-px bg-[#0F2C61]/20 dark:bg-white/20 hidden sm:inline-block" />
            <span className="text-xs font-serif italic text-slate-600 dark:text-slate-400 hidden sm:inline-block">
              University of Central Punjab Bahawalpur Campus
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>OFFICIAL CAMPUS RECORDS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B] dark:bg-amber-400" />
          </div>
        </div>
      </div>

      {/* ====================================================================
          PRIMARY TWO-FEATURE MAGAZINE GRID (EQUAL GRAND VISUAL WEIGHT)
          Column A: International Symposium on AI (CSS Selectors 11, 13)
          Column B: Seminar Section (CSS Selectors 12, 19)
          ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-12">
        
        {/* ------------------------------------------------------------------
            FEATURE 1: INTERNATIONAL SYMPOSIUM ON AI (CENTERPIECE) (CSS Selectors 11, 13)
            ------------------------------------------------------------------ */}
        <motion.article 
          className="bg-white dark:bg-[#0d1e38] rounded-xl p-5 sm:p-7 border border-slate-200 dark:border-[#1e3256] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeCurve }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <div>
            {/* Minimal Header */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono font-semibold tracking-[0.22em] text-[#991B1B] dark:text-amber-400 uppercase">
                INTERNATIONAL SYMPOSIUM
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                AI & SECURE SYSTEMS
              </span>
            </div>

            {/* Serif Headline */}
            <h3 
              className="text-xl sm:text-2xl lg:text-[26px] font-serif font-bold text-[#0F2C61] dark:text-white leading-[1.22] tracking-tight mb-2 group-hover:text-[#991B1B] dark:group-hover:text-amber-400 transition-colors duration-200"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
            >
              International Symposium on AI and Secure Systems
            </h3>

            {/* Standfirst */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-serif italic mb-4 leading-relaxed">
              Keynote Deliberations, Plenary Discourse & Technical Colloquium
            </p>

            {/* Dual Big Size Images - Both Displayed Together */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div 
                className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#0F2C61]/10 dark:border-[#1e3256] bg-slate-100 dark:bg-slate-900 cursor-pointer shadow-xs group/img"
                onClick={() => openLightbox('symp-ai-secure-1')}
                title="Click to inspect keynote stage"
              >
                <img src="/assets/events/symposium-ai-secure-systems-1.jpg"
                  alt="International Symposium on AI and Secure Systems Keynote Stage"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-103"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://i.ibb.co/Z6LzQgNC/Whats-App-Image-2026-10-12-at-3-50-32-AM.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-between p-2.5">
                  <span className="text-white text-[11px] font-mono tracking-wider flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                    <Maximize2 size={11} /> Expand
                  </span>
                  <span className="text-white/90 text-[10px] font-mono bg-[#991B1B]/80 px-2 py-0.5 rounded">
                    Keynote Stage
                  </span>
                </div>
              </div>

              <div 
                className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#0F2C61]/10 dark:border-[#1e3256] bg-slate-100 dark:bg-slate-900 cursor-pointer shadow-xs group/img"
                onClick={() => openLightbox('symp-ai-secure-2')}
                title="Click to inspect delegates assembly"
              >
                <img src="/assets/events/symposium-ai-secure-systems-2.jpg"
                  alt="International Symposium on AI and Secure Systems Research Delegates"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-103"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://i.ibb.co/ymcGpgCf/Whats-App-Image-2026-10-12-at-3-51-10-AM.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-between p-2.5">
                  <span className="text-white text-[11px] font-mono tracking-wider flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                    <Maximize2 size={11} /> Expand
                  </span>
                  <span className="text-white/90 text-[10px] font-mono bg-[#991B1B]/80 px-2 py-0.5 rounded">
                    Delegates Assembly
                  </span>
                </div>
              </div>
            </div>

            {/* Dateline & Narrative — Less Wording */}
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              EXECUTIVE AUDITORIUM · SESSIONS DOCUMENTED
            </p>
            <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-justify">
              International researchers and computational scientists gathered at UCP Bahawalpur for the International Symposium on AI and Secure Systems, deliberating on deep learning breakthroughs, cryptographic resilience, and secure automated computing.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
            <span>FACULTY OF INFORMATION TECHNOLOGY</span>
          </div>
        </motion.article>

        {/* ------------------------------------------------------------------
            FEATURE 2: SEMINAR SECTION (BIG NOT SMALL — 6 SESSIONS) (CSS Selectors 12, 19)
            ------------------------------------------------------------------ */}
        <motion.article 
          className="bg-white dark:bg-[#0d1e38] rounded-xl p-5 sm:p-7 border border-slate-200 dark:border-[#1e3256] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: easeCurve }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <div>
            {/* Minimal Header */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono font-semibold tracking-[0.22em] text-[#991B1B] dark:text-amber-400 uppercase">
                {activeCommPhoto.category}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                SESSION {activeCommIdx + 1} OF 6
              </span>
            </div>

            {/* Serif Headline (CSS Selector 19) */}
            <h3 
              className="text-xl sm:text-2xl lg:text-[26px] font-serif font-bold text-[#0F2C61] dark:text-white leading-[1.22] tracking-tight mb-2 group-hover:text-[#991B1B] dark:group-hover:text-amber-400 transition-colors duration-200"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
            >
              {activeCommPhoto.title}
            </h3>

            {/* Standfirst */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-serif italic mb-4 leading-relaxed">
              {activeCommPhoto.subtitle}
            </p>

            {/* Big Prominent Photo Frame (Big Not Small — matching symposium size) */}
            <div 
              className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-[#0F2C61]/10 dark:border-[#1e3256] bg-slate-100 dark:bg-slate-900 cursor-pointer mb-3 shadow-xs"
              onClick={() => openLightbox(activeCommPhoto.id)}
              title="Click to view full photograph"
            >
              <img key={activeCommPhoto.imageSrc}
                src={activeCommPhoto.imageSrc}
                alt={activeCommPhoto.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = activeCommPhoto.fallbackImage;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                <span className="text-white text-xs font-mono tracking-wider flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs">
                  <Maximize2 size={12} /> Inspect Photo
                </span>
                <span className="text-white/90 text-[10px] font-mono bg-[#991B1B]/80 px-2 py-0.5 rounded">
                  {activeCommPhoto.badge}
                </span>
              </div>
            </div>

            {/* Clean Minimal 6-Thumbnail Selector Grid for Seminar Section */}
            <div className="grid grid-cols-6 gap-1.5 mb-4">
              {communicationSeminarPhotos.map((item, idx) => {
                const isSelected = idx === activeCommIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveCommIdx(idx)}
                    className={`relative aspect-[4/3] rounded-md overflow-hidden border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-[#991B1B] dark:border-amber-400 ring-2 ring-[#991B1B]/40 dark:ring-amber-400/40 scale-102 z-10'
                        : 'border-slate-200/80 dark:border-white/10 opacity-70 hover:opacity-100 hover:border-[#0F2C61]/40'
                    }`}
                    title={item.badge || `Session ${idx + 1}`}
                  >
                    <img loading="lazy" decoding="async" src={item.imageSrc}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = item.fallbackImage;
                      }}
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[8px] font-mono text-center py-0.2">
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dateline & Narrative */}
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              {activeCommPhoto.dateline}
            </p>
            <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-justify">
              {activeCommPhoto.caption}
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-[#0F2C61]/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
            <span>EXECUTIVE DISCOURSE SUITE</span>
          </div>
        </motion.article>

      </div>

      {/* ====================================================================
          FEATURE 3: ANNUAL STUDENT PROJECT & INNOVATION EXHIBITION
          ==================================================================== */}
      <motion.article 
        className="bg-white dark:bg-[#0d1e38] rounded-xl p-5 sm:p-8 border border-slate-200 dark:border-[#1e3256] shadow-xs hover:shadow-md transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: easeCurve }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Exhibition Context & Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-mono font-semibold tracking-[0.22em] text-[#991B1B] dark:text-amber-400 uppercase">
                  {activeProjPhoto.category}
                </span>
                <span className="h-3 w-px bg-slate-300 dark:bg-white/20" />
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  VIEW {activeProjIdx + 1} OF 8
                </span>
              </div>

              <h3 
                className="text-xl sm:text-2xl font-serif font-bold text-[#0F2C61] dark:text-white leading-[1.24] mb-2"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
              >
                {activeProjPhoto.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-serif italic mb-3.5">
                {activeProjPhoto.subtitle}
              </p>

              <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 font-sans leading-relaxed text-justify mb-4">
                {activeProjPhoto.caption}
              </p>

              <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                {activeProjPhoto.dateline}
              </p>
            </div>

            {/* Curatorial Quote */}
            <div className="p-3.5 rounded-lg bg-[#F8F6F0] dark:bg-[#12284c] border border-[#0F2C61]/10 dark:border-[#1e3256] text-slate-700 dark:text-slate-200">
              <span className="block text-[10px] font-mono font-semibold tracking-wider text-[#991B1B] dark:text-amber-400 uppercase mb-1">
                EVALUATION COMMITTEE
              </span>
              <p 
                className="text-xs font-serif italic leading-relaxed text-slate-600 dark:text-slate-300"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
              >
                “Projects reflect undergraduate mastery across firmware, artificial intelligence, and applied commercial feasibility.”
              </p>
            </div>
          </div>

          {/* Right Column: Active Exhibition Photo (with Lead image on top) + 8-Thumbnail Strip */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Active Exhibition Photo Frame — Lead Image Default on Top */}
            <div 
              className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-lg overflow-hidden border border-[#0F2C61]/10 dark:border-[#1e3256] bg-slate-100 dark:bg-slate-900 cursor-pointer mb-3 shadow-xs group"
              onClick={() => openLightbox(activeProjPhoto.id)}
              title="Click to expand this exhibition photo"
            >
              <img key={activeProjPhoto.imageSrc}
                src={activeProjPhoto.imageSrc}
                alt={activeProjPhoto.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = activeProjPhoto.fallbackImage;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5">
                <span className="text-white text-xs font-mono tracking-wider flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs">
                  <Maximize2 size={12} /> Inspect Exhibition Photo
                </span>
                <span className="text-white text-xs font-mono bg-[#991B1B]/80 px-2 py-0.5 rounded">
                  {activeProjPhoto.badge}
                </span>
              </div>
            </div>

            {/* Clean Minimal 8-Thumbnail Selector Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {projectExhibitionPhotos.map((photo, pIdx) => {
                const isSelected = pIdx === activeProjIdx;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setActiveProjIdx(pIdx)}
                    className={`relative aspect-[4/3] rounded-md overflow-hidden border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-[#991B1B] dark:border-amber-400 ring-2 ring-[#991B1B]/40 dark:ring-amber-400/40 scale-102 z-10'
                        : 'border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100 hover:border-[#0F2C61]/40'
                    }`}
                    title={`View ${photo.badge || `Exhibition View ${pIdx + 1}`}`}
                  >
                    <img loading="lazy" decoding="async" src={photo.imageSrc}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = photo.fallbackImage;
                      }}
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[8px] font-mono text-center py-0.2">
                      0{pIdx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </motion.article>

      {/* ====================================================================
          FULL RESOLUTION ARCHIVAL IMAGE LIGHTBOX MODAL (17 PHOTOS)
          ==================================================================== */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div 
              className="relative max-w-4xl w-full bg-white dark:bg-[#0d1e38] text-[#0F2C61] dark:text-white rounded-xl overflow-hidden shadow-2xl border border-white/20 dark:border-[#1e3256] flex flex-col max-h-[92vh]"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#12284c]">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-[#991B1B] dark:text-amber-400 uppercase tracking-wider">
                    {allPhotos[lightboxIndex].category}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500">·</span>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-300 uppercase">
                    ARCHIVE RECORD ({lightboxIndex + 1} OF {allPhotos.length})
                  </span>
                </div>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Photo Display with Navigation Arrows */}
              <div className="relative bg-slate-950 flex-1 min-h-[300px] max-h-[62vh] flex items-center justify-center overflow-hidden">
                <img loading="lazy" decoding="async" key={allPhotos[lightboxIndex].imageSrc}
                  src={allPhotos[lightboxIndex].imageSrc}
                  alt={allPhotos[lightboxIndex].alt}
                  className="max-h-[62vh] w-auto max-w-full object-contain mx-auto transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = allPhotos[lightboxIndex].fallbackImage;
                  }}
                />

                {/* Left Arrow */}
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft size={22} />
                </button>

                {/* Right Arrow */}
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
                  aria-label="Next photograph"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Caption & Metadata Bar */}
              <div className="p-4 sm:p-5 bg-white dark:bg-[#0d1e38] border-t border-slate-200 dark:border-white/10 overflow-y-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h4 
                    className="text-base sm:text-lg font-serif font-bold text-[#0F2C61] dark:text-white"
                    style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                  >
                    {allPhotos[lightboxIndex].title}
                  </h4>
                  <span className="text-[10px] font-mono text-[#991B1B] dark:text-amber-400 uppercase tracking-wider">
                    {allPhotos[lightboxIndex].dateline}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                  {allPhotos[lightboxIndex].caption}
                </p>

                {/* Quick thumbnail strip inside lightbox */}
                <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-white/10 flex items-center gap-1.5 overflow-x-auto pb-1">
                  {allPhotos.map((p, pIdx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setLightboxIndex(pIdx)}
                      className={`relative w-11 h-8 rounded overflow-hidden flex-shrink-0 border transition-all cursor-pointer ${
                        pIdx === lightboxIndex
                          ? 'border-[#991B1B] dark:border-amber-400 ring-2 ring-[#991B1B]/40 dark:ring-amber-400/40 scale-105'
                          : 'border-slate-300 dark:border-white/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img loading="lazy" decoding="async" src={p.imageSrc}
                        alt={p.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = p.fallbackImage;
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default EditorialNewspaperSection;
