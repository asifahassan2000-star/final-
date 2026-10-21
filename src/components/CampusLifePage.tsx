import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, X, ChevronLeft, ChevronRight, Maximize2, 
  Calendar, Search, CheckCircle2, Share2, Tag, Compass,
  ChevronDown
} from 'lucide-react';
import { 
  CAMPUS_EVENTS_DATA, 
  CampusEvent, 
  CampusEventImage,
  EVENTS_2025, 
  EVENTS_2026 
} from '../data/campusEventsData';

interface CampusLifePageProps {
  onBackToHome: () => void;
  onOpenApply: () => void;
  onOpenProgrammesPage: () => void;
  onOpenFee: () => void;
}

// =========================================================================
// MINIMAL SINGLE EVENT COMPONENT (JUST LIKE BEYOND THE CLASSROOM)
// 1. Event Name
// 2. Few lines of straight clean text under it
// 3. ONE BIG Image
// 4. Changing option little below
// 5. 5-second automatic image cycle feature
// 6. Minimal style without borders: White in light mode, Blue in dark mode
// =========================================================================
interface MinimalEventItemProps {
  event: CampusEvent;
  onOpenLightbox: (eventId: string, imageIndex: number) => void;
}

const MinimalEventItem: React.FC<MinimalEventItemProps> = ({ event, onOpenLightbox }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 5-second automatic cycling feature
  useEffect(() => {
    if (isHovered || event.images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % event.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [event.images.length, isHovered]);

  const activeImage = event.images[activeIdx] || event.images[0];

  return (
    <article 
      id={event.id}
      className="py-10 sm:py-14 first:pt-2 border-0 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Event Name */}
      <div className="max-w-5xl mb-3 sm:mb-4 overflow-hidden">
        <motion.h3 
          initial={{ opacity: 0, y: 24, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
          whileInView={{ opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0A1931] dark:text-white tracking-tight leading-snug"
          style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
        >
          {event.number}. {event.title}
        </motion.h3>

        {/* 2. Under it: Few lines of straight clean text */}
        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed mt-2.5 max-w-4xl font-normal"
        >
          {event.description}
        </motion.p>
      </div>

      {/* 3. ONE BIG IMAGE */}
      <div className="mt-4 max-w-5xl">
        <div 
          onClick={() => onOpenLightbox(event.id, activeIdx)}
          className="relative w-full aspect-[16/9] sm:aspect-[16/9.5] rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#0A1931] cursor-pointer group shadow-xs hover:shadow-lg transition-all duration-300"
          title="Click to view full photograph"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={`${event.id}-${activeIdx}`}
              src={activeImage.src}
              alt={activeImage.alt}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
              onError={(e) => {
                if (activeImage.fallbackSrc) {
                  (e.target as HTMLImageElement).src = activeImage.fallbackSrc;
                }
              }}
            />
          </AnimatePresence>

          {/* Minimal hover overlay with view trigger and counter */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-6 text-white pointer-events-none">
            <span className="text-xs font-mono tracking-wider flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <Maximize2 size={13} /> View Full Photo
            </span>
            <span className="text-xs font-mono bg-[#C8102E] px-2.5 py-1 rounded-md font-semibold">
              Photo {activeIdx + 1} of {event.images.length}
            </span>
          </div>

          {/* 5-second automatic change progress line at bottom of big image */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-black/30">
            <motion.div
              key={`progress-${event.id}-${activeIdx}-${isHovered}`}
              initial={{ width: '0%' }}
              animate={{ width: isHovered ? '0%' : '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
              className="h-full bg-[#C8102E]"
            />
          </div>
        </div>

        {/* Photo Caption text straight under the big image */}
        {activeImage.caption && (
          <p className="mt-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans italic">
            {activeImage.caption}
          </p>
        )}

        {/* 4. CHANGING OPTION LITTLE BELOW (Clean thumbnail switcher) */}
        {event.images.length > 1 && (
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto py-1">
              {event.images.map((img, imgIdx) => {
                const isSelected = imgIdx === activeIdx;
                return (
                  <button
                    key={`${event.id}-thumb-${imgIdx}`}
                    type="button"
                    onClick={() => setActiveIdx(imgIdx)}
                    className={`relative w-16 sm:w-20 aspect-[16/10] rounded-lg overflow-hidden transition-all duration-200 cursor-pointer shrink-0 ${
                      isSelected
                        ? 'ring-2 ring-[#C8102E] scale-103 opacity-100'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    title={img.caption || `View photo ${imgIdx + 1}`}
                  >
                    <img 
                      src={img.src} 
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (img.fallbackSrc) (e.target as HTMLImageElement).src = img.fallbackSrc;
                      }}
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[9px] font-mono text-center py-0.2">
                      0{imgIdx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick 5-sec change badge & navigation */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 shrink-0">
              <span className="text-[11px]">Auto 5s</span>
              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev - 1 + event.images.length) % event.images.length)}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev + 1) % event.images.length)}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

    </article>
  );
};

// =========================================================================
// MAIN CAMPUS LIFE PAGE COMPONENT
// =========================================================================
export const CampusLifePage: React.FC<CampusLifePageProps> = ({
  onBackToHome,
  onOpenProgrammesPage,
}) => {
  // Navigation & Filtering States
  const [selectedYear, setSelectedYear] = useState<'all' | '2025' | '2026'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copyToast, setCopyToast] = useState<string | null>(null);

  // Lightbox Modal State
  const [activeLightbox, setActiveLightbox] = useState<{
    eventId: string;
    imageIndex: number;
  } | null>(null);

  // SEO: Update Page Title, Meta Description for Google Ranking
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Campus Life & Events Archive (2025 – 2026) | UCP Bahawalpur";

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Official collegiate events chronicle of University of Central Punjab (UCP) Bahawalpur Campus. 22 events across 2025 and 2026 featuring alumni reunions, alpine tours, orientations, symposia, and cultural galas.'
      );
    }

    // Scroll to top on mount
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
    };
  }, []);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return CAMPUS_EVENTS_DATA.filter((ev) => {
      const matchesYear = selectedYear === 'all' || ev.year === selectedYear;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !q ||
        ev.title.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q) ||
        ev.category.toLowerCase().includes(q);

      return matchesYear && matchesQuery;
    });
  }, [selectedYear, searchQuery]);

  // Strictly separate 2025 events on top, then 2026 events
  const displayed2025Events = useMemo(() => {
    return filteredEvents.filter((e) => e.year === '2025');
  }, [filteredEvents]);

  const displayed2026Events = useMemo(() => {
    return filteredEvents.filter((e) => e.year === '2026');
  }, [filteredEvents]);

  // Lightbox handlers
  const openLightbox = (eventId: string, imageIndex: number) => {
    setActiveLightbox({ eventId, imageIndex });
  };

  const closeLightbox = () => {
    setActiveLightbox(null);
  };

  const currentLightboxEvent = useMemo(() => {
    if (!activeLightbox) return null;
    return CAMPUS_EVENTS_DATA.find((e) => e.id === activeLightbox.eventId) || null;
  }, [activeLightbox]);

  const currentLightboxImage = useMemo(() => {
    if (!currentLightboxEvent || activeLightbox === null) return null;
    return currentLightboxEvent.images[activeLightbox.imageIndex] || currentLightboxEvent.images[0];
  }, [currentLightboxEvent, activeLightbox]);

  const handleNextLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!activeLightbox || !currentLightboxEvent) return;
    const nextIdx = (activeLightbox.imageIndex + 1) % currentLightboxEvent.images.length;
    setActiveLightbox({ ...activeLightbox, imageIndex: nextIdx });
  };

  const handlePrevLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!activeLightbox || !currentLightboxEvent) return;
    const prevIdx = 
      (activeLightbox.imageIndex - 1 + currentLightboxEvent.images.length) % currentLightboxEvent.images.length;
    setActiveLightbox({ ...activeLightbox, imageIndex: prevIdx });
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeLightbox) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNextLightbox();
      if (e.key === 'ArrowLeft') handlePrevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightbox, currentLightboxEvent]);

  // Schema.org Structured Data (JSON-LD for Google Rich Results & Ranking)
  const structuredData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://ucp.edu.pk/campus-life#webpage",
          "url": "https://ucp.edu.pk/campus-life",
          "name": "Campus Life & Events Archive (2025–2026) | UCP Bahawalpur",
          "description": "Chronological official archive of 22 collegiate events at University of Central Punjab Bahawalpur Campus.",
          "isPartOf": {
            "@type": "WebSite",
            "name": "University of Central Punjab (UCP) Bahawalpur",
            "url": "https://ucp.edu.pk"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://ucp.edu.pk"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Campus Life & Events",
              "item": "https://ucp.edu.pk/campus-life"
            }
          ]
        },
        {
          "@type": "ItemList",
          "name": "UCP Bahawalpur Official Campus Events (2025 - 2026)",
          "numberOfItems": CAMPUS_EVENTS_DATA.length,
          "itemListElement": CAMPUS_EVENTS_DATA.map((ev, index) => ({
            "@type": "Event",
            "position": index + 1,
            "name": `${ev.title} — UCP Bahawalpur`,
            "description": ev.description,
            "startDate": `${ev.year}-01-01`,
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": "University of Central Punjab (UCP) Bahawalpur Campus",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Airport Road",
                "addressLocality": "Bahawalpur",
                "addressRegion": "Punjab",
                "addressCountry": "PK"
              }
            },
            "image": ev.images.map(img => img.src),
            "organizer": {
              "@type": "CollegeOrUniversity",
              "name": "University of Central Punjab (UCP) Bahawalpur Campus",
              "url": "https://ucp.edu.pk"
            }
          }))
        }
      ]
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#07192F] text-[#0A1931] dark:text-white transition-colors duration-200 font-sans selection:bg-[#C8102E] selection:text-white">
      
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 1. Minimal Header & Navigation Bar */}
      <nav 
        aria-label="Campus Life Navigation" 
        className="sticky top-0 z-30 bg-white/95 dark:bg-[#07192F]/95 backdrop-blur-md border-b border-slate-100 dark:border-white/10 py-3.5 px-4 sm:px-6 lg:px-8 select-none transition-colors"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-[#C8102E] dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1 text-[#C8102E]" />
            <span>Return to Home</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono">
            <span className="text-slate-500 dark:text-slate-400">
              22 Events Archive
            </span>
            <button
              onClick={onOpenProgrammesPage}
              className="font-sans font-semibold text-[#C8102E] hover:underline cursor-pointer"
            >
              Academic Programmes →
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Minimal Page Introduction */}
      <header className="pt-12 sm:pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#C8102E]">
            OFFICIAL ARCHIVE · 2025 – 2026
          </span>
          <span className="h-px w-10 bg-slate-200 dark:bg-white/20" aria-hidden="true" />
        </div>

        <div className="overflow-hidden py-1">
          <motion.h1 
            initial={{ opacity: 0, y: 32, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-[52px] font-serif font-bold text-[#0A1931] dark:text-white tracking-tight leading-[1.14] mb-4"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            Campus Life &amp; Events
          </motion.h1>
        </div>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-3xl font-light">
          Official chronological chronicle of collegiate milestones, academic symposiums, excursions, and student traditions at University of Central Punjab (UCP) Bahawalpur.
        </p>

        {/* Minimal Year Segment Selector & Search */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* 2025 and 2026 Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#0A1931] rounded-xl w-fit">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedYear === 'all'
                  ? 'bg-white dark:bg-[#0E2442] text-[#0A1931] dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#0A1931] dark:hover:text-white'
              }`}
            >
              All Events ({CAMPUS_EVENTS_DATA.length})
            </button>
            <button
              onClick={() => setSelectedYear('2025')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedYear === '2025'
                  ? 'bg-[#C8102E] text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#0A1931] dark:hover:text-white'
              }`}
            >
              2025 Events
            </button>
            <button
              onClick={() => setSelectedYear('2026')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedYear === '2026'
                  ? 'bg-[#C8102E] text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#0A1931] dark:hover:text-white'
              }`}
            >
              2026 Events
            </button>
          </div>

          {/* Clean Search Input */}
          <div className="relative max-w-xs w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event name or topic..."
              className="w-full pl-9 pr-7 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-[#0A1931] text-[#0A1931] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8102E] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                title="Clear"
              >
                <X size={12} />
              </button>
            )}
          </div>

        </div>
      </header>

      {/* 3. Event List (2025 on Top, Then 2026) */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* ====================================================================
            2025 EVENTS ON TOP (EVENTS 1 TO 6)
            ==================================================================== */}
        {(selectedYear === 'all' || selectedYear === '2025') && displayed2025Events.length > 0 && (
          <section id="events-2025" aria-labelledby="heading-2025" className="mb-16">
            
            {/* Year Header */}
            <div className="pt-6 pb-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8102E]">
                  2025 CHRONICLE
                </span>
                <div className="overflow-hidden py-1">
                  <motion.h2 
                    id="heading-2025"
                    initial={{ opacity: 0, y: 24, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
                    whileInView={{ opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl sm:text-2xl font-serif font-bold text-[#0A1931] dark:text-white mt-1"
                  >
                    2025 Events
                  </motion.h2>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {displayed2025Events.length} Events
              </span>
            </div>

            {/* List of 2025 Minimal Event Cards */}
            <div>
              {displayed2025Events.map((event) => (
                <MinimalEventItem
                  key={event.id}
                  event={event}
                  onOpenLightbox={openLightbox}
                />
              ))}
            </div>

          </section>
        )}

        {/* Separator between 2025 and 2026 */}
        {(selectedYear === 'all') && (
          <div className="my-10 py-6 border-t-2 border-dashed border-slate-200 dark:border-white/10 text-center">
            <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-[#C8102E]">
              Continuing to 2026 Chronicle Below ↓
            </span>
          </div>
        )}

        {/* ====================================================================
            2026 EVENTS CONTINUING BELOW (EVENTS 7 TO 22)
            ==================================================================== */}
        {(selectedYear === 'all' || selectedYear === '2026') && displayed2026Events.length > 0 && (
          <section id="events-2026" aria-labelledby="heading-2026" className="mb-16">
            
            {/* Year Header */}
            <div className="pt-6 pb-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8102E]">
                  2026 CHRONICLE
                </span>
                <div className="overflow-hidden py-1">
                  <motion.h2 
                    id="heading-2026"
                    initial={{ opacity: 0, y: 24, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
                    whileInView={{ opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl sm:text-2xl font-serif font-bold text-[#0A1931] dark:text-white mt-1"
                  >
                    2026 Events
                  </motion.h2>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {displayed2026Events.length} Events
              </span>
            </div>

            {/* List of 2026 Minimal Event Cards */}
            <div>
              {displayed2026Events.map((event) => (
                <MinimalEventItem
                  key={event.id}
                  event={event}
                  onOpenLightbox={openLightbox}
                />
              ))}
            </div>

          </section>
        )}

        {/* Zero Results State */}
        {filteredEvents.length === 0 && (
          <div className="py-20 text-center text-slate-500 dark:text-slate-400">
            <p className="text-sm">No campus events match &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedYear('all');
              }}
              className="mt-3 text-xs font-semibold text-[#C8102E] underline cursor-pointer"
            >
              Reset search
            </button>
          </div>
        )}

      </main>

      {/* 4. Minimal Clean Fullscreen Lightbox */}
      <AnimatePresence>
        {activeLightbox && currentLightboxEvent && currentLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 sm:p-6"
          >
            {/* Top Bar */}
            <div 
              className="w-full max-w-5xl flex items-center justify-between text-white z-50 select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono bg-[#C8102E] px-2 py-0.5 rounded font-bold">
                  Event #{currentLightboxEvent.number}
                </span>
                <span className="text-sm font-semibold truncate max-w-xs sm:max-w-md">
                  {currentLightboxEvent.title}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ({activeLightbox.imageIndex + 1} of {currentLightboxEvent.images.length})
                </span>
              </div>

              <button
                onClick={closeLightbox}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Central Big Image with Left / Right Navigation */}
            <div 
              className="relative w-full max-w-5xl flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handlePrevLightbox}
                className="absolute left-2 sm:left-4 z-50 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNextLightbox}
                className="absolute right-2 sm:right-4 z-50 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>

              <img 
                src={currentLightboxImage.src}
                alt={currentLightboxImage.alt}
                className="max-h-[75vh] max-w-full w-auto h-auto object-contain rounded-lg"
                onError={(e) => {
                  if (currentLightboxImage.fallbackSrc) {
                    (e.target as HTMLImageElement).src = currentLightboxImage.fallbackSrc;
                  }
                }}
              />
            </div>

            {/* Bottom Caption */}
            <div 
              className="w-full max-w-3xl text-center pb-2 select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs sm:text-sm text-slate-300 font-sans">
                {currentLightboxImage.caption || currentLightboxImage.alt}
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CampusLifePage;
