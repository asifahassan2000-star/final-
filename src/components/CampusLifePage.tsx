import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { CAMPUS_GALLERY_IMAGES } from '../data/campusGalleryData';
import { UcpEliteNetworkSection } from './UcpEliteNetworkSection';

interface CampusLifePageProps {
  onBackToHome: () => void;
  onOpenApply: () => void;
  onOpenProgrammesPage: () => void;
  onOpenFee: () => void;
}

export const CampusLifePage: React.FC<CampusLifePageProps> = ({
  onBackToHome,
  onOpenProgrammesPage,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Featured prominent top showcase photo ("little big size" from https://ibb.co/NdjKNS0n)
  const FEATURED_TOP_SLOT = {
    image: CAMPUS_GALLERY_IMAGES[0], // campus-new-d (id 104)
    index: 0,
    alt: 'UCP Bahawalpur Grand Campus Community & Student Celebration Showcase',
  };

  // Fixed curated images for upper flagship collage (permanent, keeping all existing photos)
  const FIXED_COLLAGE_SLOTS = [
    { image: CAMPUS_GALLERY_IMAGES[1], index: 1, alt: 'UCP Bahawalpur Grand Annual Concert & Musical Night' }, // campus-new-a (id 101)
    { image: CAMPUS_GALLERY_IMAGES[2], index: 2, alt: 'UCP Bahawalpur Student Life & Campus Engagement' }, // campus-15 (id 15)
    { image: CAMPUS_GALLERY_IMAGES[3], index: 3, alt: 'UCP Bahawalpur Campus Community Gathering' }, // campus-26 (id 26)
    { image: CAMPUS_GALLERY_IMAGES[4], index: 4, alt: 'UCP Bahawalpur Annual Festivities & Gathering' }, // campus-30 (id 30)
    { image: CAMPUS_GALLERY_IMAGES[5], index: 5, alt: 'UCP Bahawalpur Concert & Stage Event' }, // campus-36 (id 36)
    { image: CAMPUS_GALLERY_IMAGES[6], index: 6, alt: 'UCP Bahawalpur Student Activities & Outdoor Moments' }, // campus-37 (id 37)
    { image: CAMPUS_GALLERY_IMAGES[7], index: 7, alt: 'UCP Bahawalpur Campus Event & Student Celebration' }, // campus-new-c (id 103)
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : CAMPUS_GALLERY_IMAGES.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! < CAMPUS_GALLERY_IMAGES.length - 1 ? prev! + 1 : 0));
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : CAMPUS_GALLERY_IMAGES.length - 1));
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev! < CAMPUS_GALLERY_IMAGES.length - 1 ? prev! + 1 : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Helper to render fixed slot in desktop/tablet collage
  const renderFixedSlot = (slotIdx: number, aspectClass: string) => {
    const slot = FIXED_COLLAGE_SLOTS[slotIdx];
    return (
      <div
        onClick={() => openLightbox(slot.index)}
        className={`relative w-full ${aspectClass} overflow-hidden bg-slate-900 cursor-pointer group`}
      >
        <img
          src={slot.image.localSrc}
          alt={slot.alt || slot.image.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center absolute inset-0 block transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = slot.image.fallbackSrc || '';
          }}
        />
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
          <Maximize2 size={24} className="text-white drop-shadow" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#07192f] text-white selection:bg-[#A51C30] selection:text-white relative overflow-x-hidden">
      
      {/* 1. Context Top Navigation Bar */}
      <nav 
        aria-label="Campus Life Navigation" 
        className="bg-[#0A1931] border-b border-slate-800/80 py-3.5 px-4 sm:px-6 lg:px-8 text-white select-none z-30 sticky top-0"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors focus:outline-none cursor-pointer"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1 text-amber-400" />
            <span>Return to Main Campus Portal</span>
          </button>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline text-slate-400 font-mono text-[11px] tracking-wider uppercase">
              UCP Bahawalpur · Campus Photo Archive
            </span>
            <button
              onClick={onOpenProgrammesPage}
              className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-4 decoration-amber-400/40 cursor-pointer"
            >
              Academic Programmes →
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Main Page Header */}
      <header className="py-10 sm:py-14 text-center px-4">
        <h1 
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2"
          style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
        >
          Life at UCP Bahawalpur
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light">
          A dynamic visual chronicle of collegiate moments, student memories, and vibrant campus life.
        </p>
      </header>

      {/* 3. Flagship Brochure Double-Bordered Collage (DYNAMIC 5-SECOND ROTATING SLOTS) */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-16">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl mx-auto relative p-2 sm:p-4 md:p-6 bg-[#0a1e3b] border-2 border-white/40 shadow-2xl rounded-sm"
        >
          {/* Inner Thin Border Line */}
          <div className="relative border border-white/60 p-1.5 sm:p-3 md:p-4 bg-[#07192f]">

            {/* Desktop & Tablet Layout with Curated Permanent Featured Photography */}
            <div className="hidden md:flex flex-col gap-2 sm:gap-2.5 w-full">

              {/* Row 1: Featured 'Little Big Size' Showcase Photo (from https://ibb.co/NdjKNS0n) */}
              <div
                onClick={() => openLightbox(FEATURED_TOP_SLOT.index)}
                className="relative w-full aspect-[2.35/1] max-h-[420px] overflow-hidden bg-slate-900 cursor-pointer group"
              >
                <img
                  src={FEATURED_TOP_SLOT.image.localSrc}
                  alt={FEATURED_TOP_SLOT.alt}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center absolute inset-0 block transition-transform duration-700 ease-out group-hover:scale-103"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FEATURED_TOP_SLOT.image.fallbackSrc || '';
                  }}
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
                  <Maximize2 size={26} className="text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Row 2: 2 Landscape Photos (Concert Night Performance & Group Photo) */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full">
                {renderFixedSlot(0, 'aspect-[16/10]')}
                {renderFixedSlot(1, 'aspect-[16/10]')}
              </div>

              {/* Row 3: 3 Photos (Courtyard, Campus Lawn, Campus Celebrations) */}
              <div className="grid grid-cols-12 gap-2 sm:gap-2.5 w-full">
                <div className="col-span-4">
                  {renderFixedSlot(2, 'aspect-[4/3]')}
                </div>
                <div className="col-span-4">
                  {renderFixedSlot(3, 'aspect-[4/3]')}
                </div>
                <div className="col-span-4">
                  {renderFixedSlot(4, 'aspect-[4/3]')}
                </div>
              </div>

              {/* Row 4: Left, Center Branding Card, Right */}
              <div className="grid grid-cols-12 gap-2 sm:gap-2.5 w-full items-stretch">
                <div className="col-span-4">
                  {renderFixedSlot(5, 'aspect-[4/3]')}
                </div>

                {/* Center Branding Block */}
                <div className="col-span-4 relative flex flex-col items-center justify-center bg-[#07192f] p-4 sm:p-6 text-center select-none overflow-hidden border border-white/20">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1d4ed8_0%,transparent_75%)] opacity-20 pointer-events-none" />

                  <span
                    className="text-white font-normal leading-none mb-3 sm:mb-4 tracking-wide"
                    style={{
                      fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif",
                      fontSize: 'clamp(38px, 4.2vw, 56px)',
                      textShadow: '0 2px 14px rgba(0,0,0,0.6)',
                    }}
                  >
                    Campus life
                  </span>

                  <div className="flex items-center justify-center my-1 sm:my-2">
                    <img
                      src="/assets/ucp-official-logo.png"
                      alt="University of Central Punjab"
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain filter drop-shadow-md"
                    />
                  </div>

                  <div className="mt-1">
                    <span className="font-['Cinzel',serif] text-xs sm:text-sm lg:text-base font-bold uppercase tracking-[0.18em] text-white block">
                      University of Central Punjab
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.25em] text-amber-400 uppercase mt-0.5 block">
                      Bahawalpur Campus
                    </span>
                  </div>
                </div>

                <div className="col-span-4">
                  {renderFixedSlot(6, 'aspect-[4/3]')}
                </div>
              </div>

            </div>

            {/* Mobile View (<768px): Clear, Adaptive, Fixed Best Featured Photos */}
            <div className="flex md:hidden flex-col gap-2 w-full">
              <div className="w-full flex flex-col items-center justify-center bg-[#07192f] py-6 px-4 text-center border border-white/20">
                <span
                  className="text-white font-normal leading-none mb-2"
                  style={{
                    fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif",
                    fontSize: 'clamp(34px, 9vw, 46px)',
                  }}
                >
                  Campus life
                </span>
                <div className="flex items-center justify-center my-1.5">
                  <img
                    src="/assets/ucp-official-logo.png"
                    alt="UCP"
                    className="w-12 h-12 object-contain filter drop-shadow"
                  />
                </div>
                <span className="font-['Cinzel',serif] text-xs font-bold uppercase tracking-[0.16em] text-white">
                  University of Central Punjab
                </span>
                <span className="text-[10px] font-mono tracking-[0.22em] text-amber-400 uppercase mt-0.5">
                  Bahawalpur Campus
                </span>
              </div>

              {/* Mobile Featured Top Photo */}
              <div
                onClick={() => openLightbox(FEATURED_TOP_SLOT.index)}
                className="w-full aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer relative group rounded-sm"
              >
                <img
                  src={FEATURED_TOP_SLOT.image.localSrc}
                  alt={FEATURED_TOP_SLOT.alt}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FEATURED_TOP_SLOT.image.fallbackSrc || '';
                  }}
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <Maximize2 size={22} className="text-white drop-shadow" />
                </div>
              </div>

              <div className="columns-2 gap-2 w-full">
                {FIXED_COLLAGE_SLOTS.map((slot, slotIdx) => {
                  return (
                    <div
                      key={`mob-flag-${slotIdx}`}
                      onClick={() => openLightbox(slot.index)}
                      className="break-inside-avoid mb-2 relative overflow-hidden bg-slate-900 cursor-pointer rounded-sm group"
                    >
                      <img
                        src={slot.image.localSrc}
                        alt={slot.alt || slot.image.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-102"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = slot.image.fallbackSrc;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <Maximize2 size={20} className="text-white drop-shadow" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </motion.div>

        {/* 4. Complete Dynamic Masonry Gallery (Full Images, Adapted Frame) */}
        <div className="w-full max-w-6xl mx-auto mt-12 sm:mt-16">
          <div className="flex items-center justify-between mb-5 px-1 border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-amber-400 block">
                Complete Photographic Chronicle
              </span>
              <span className="text-xs text-slate-300 font-sans mt-0.5 block">
                {CAMPUS_GALLERY_IMAGES.length} authentic campus moments — full frames with zero cropping
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Click any photo to expand
            </span>
          </div>

          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 w-full">
            {CAMPUS_GALLERY_IMAGES.map((img, idx) => {
              return (
                <div
                  key={`ext-full-${img.id}`}
                  onClick={() => openLightbox(idx)}
                  className="break-inside-avoid mb-3 sm:mb-4 relative rounded-xl overflow-hidden bg-[#0a1e3b] border border-white/15 shadow-md group cursor-pointer transition-all duration-300 hover:border-amber-400/60 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <img
                    src={img.localSrc}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = img.fallbackSrc;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none rounded-xl">
                    <Maximize2 size={22} className="text-white drop-shadow-md" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* 5. High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close image lightbox"
            >
              <X size={24} />
            </button>

            <div className="absolute top-5 left-5 z-50 text-xs font-mono text-white/70 bg-black/50 px-3 py-1 rounded-full border border-white/20">
              {lightboxIndex + 1} / {CAMPUS_GALLERY_IMAGES.length}
            </div>

            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 z-50 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[88vh] w-full flex items-center justify-center"
            >
              <img
                src={CAMPUS_GALLERY_IMAGES[lightboxIndex]?.localSrc}
                alt={CAMPUS_GALLERY_IMAGES[lightboxIndex]?.alt}
                className="max-w-full max-h-[88vh] w-auto h-auto object-contain rounded-md shadow-2xl border border-white/20"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    CAMPUS_GALLERY_IMAGES[lightboxIndex]?.fallbackSrc || '';
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UCP ELITE STUDENT NETWORK Section */}
      <UcpEliteNetworkSection />

    </div>
  );
};
