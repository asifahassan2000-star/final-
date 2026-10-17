import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface EventImageItem {
  src: string;
  fallback?: string;
  alt: string;
  caption?: string;
  tag?: string;
  title?: string;
}

export interface AnimatedEventSectionProps {
  title: string;
  description: string;
  images: (EventImageItem | string)[];
  reverse?: boolean;
  categoryLabel?: string;
  categoryNumber?: string;
  highlights?: string[];
  fullSizeImage?: boolean;
}

export const AnimatedEventSection: React.FC<AnimatedEventSectionProps> = ({
  title,
  description,
  images,
  reverse = false,
  categoryLabel,
  categoryNumber,
  highlights = [],
}) => {
  // Normalize image data
  const normalizedImages: EventImageItem[] = images.map((item, idx) => {
    if (typeof item === 'string') {
      return {
        src: item,
        alt: `${title} photograph ${idx + 1}`,
        caption: undefined,
      };
    }
    return item;
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeImage = normalizedImages[activeIdx] || normalizedImages[0];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % normalizedImages.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const easeCurve = [0.22, 1, 0.36, 1] as const;

  const imagesInitialX = reverse ? 40 : -40;
  const textInitialX = reverse ? -40 : 40;

  return (
    <div className="relative mb-24 sm:mb-36 last:mb-16 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ====================================================================
            IMAGE COLUMN — Full-Size Visual Presentation with Clean Switcher
            ==================================================================== */}
        <motion.div
          className={`lg:col-span-7 ${
            reverse ? 'order-1 lg:order-2' : 'order-1'
          }`}
          initial={{ opacity: 0, x: imagesInitialX }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: easeCurve }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Main Full-Size Display Card */}
          <div className="bg-white/80 rounded-2xl p-3 sm:p-4 border border-[#0F2C61]/10 shadow-xs hover:shadow-md transition-all duration-300">
            <div 
              className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-xl overflow-hidden border border-[#0F2C61]/10 bg-slate-100 cursor-pointer group shadow-2xs"
              onClick={() => setIsLightboxOpen(true)}
              title="Click to view full photograph"
            >
              <img
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                onError={(e) => {
                  if (activeImage.fallback) {
                    (e.target as HTMLImageElement).src = activeImage.fallback;
                  }
                }}
              />
              
              {/* Subtle scrim & action pill */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <span className="text-white text-xs font-mono tracking-wider flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs">
                  <Maximize2 size={12} /> View Full Photo
                </span>
                <span className="text-white/90 text-[10px] font-mono bg-[#991B1B]/80 px-2 py-0.5 rounded">
                  {activeIdx + 1} / {normalizedImages.length}
                </span>
              </div>

              {/* Tag / Caption on Card */}
              {activeImage.tag && (
                <div className="absolute top-3.5 left-3.5 pointer-events-none">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white bg-[#0F2C61]/80 px-2.5 py-1 rounded backdrop-blur-xs shadow-xs">
                    {activeImage.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Photo Caption */}
            {activeImage.caption && (
              <div className="mt-3 px-1 text-slate-700">
                <p className="text-xs sm:text-[13px] font-sans leading-relaxed text-justify">
                  {activeImage.caption}
                </p>
              </div>
            )}

            {/* Minimal Thumbnail Selector Grid if Multiple Photos Exist */}
            {normalizedImages.length > 1 && (
              <div className="mt-3.5 pt-3 border-t border-[#0F2C61]/10">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                  <span>Photo Views ({normalizedImages.length})</span>
                  <span className="text-[#991B1B] font-bold">Selected: View {activeIdx + 1}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {normalizedImages.map((img, idx) => {
                    const isSelected = idx === activeIdx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveIdx(idx)}
                        className={`relative w-14 sm:w-18 aspect-[16/10] rounded-md overflow-hidden border transition-all duration-200 cursor-pointer flex-shrink-0 ${
                          isSelected
                            ? 'border-[#991B1B] ring-2 ring-[#991B1B]/40 scale-102 z-10'
                            : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-[#0F2C61]/40'
                        }`}
                        title={img.caption || `View ${idx + 1}`}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            if (img.fallback) (e.target as HTMLImageElement).src = img.fallback;
                          }}
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[8px] font-mono text-center py-0.2">
                          0{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ====================================================================
            TEXT CONTENT COLUMN
            ==================================================================== */}
        <motion.div
          className={`lg:col-span-5 flex flex-col justify-center space-y-6 ${
            reverse ? 'order-2 lg:order-1' : 'order-2'
          }`}
          initial={{ opacity: 0, x: textInitialX }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeCurve }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Label / Numbering */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#991B1B] font-bold">
              {categoryNumber || (reverse ? 'COMMUNITY' : 'CAMPUS LIFE')}
              {categoryLabel && ` / ${categoryLabel.toUpperCase()}`}
            </span>
            <span className="h-px w-10 bg-[#0F2C61]/20" aria-hidden="true" />
          </div>

          {/* Heading in Playfair Display / Serif */}
          <h3
            className="text-2xl sm:text-3xl lg:text-[38px] font-serif font-bold text-[#0F2C61] tracking-tight leading-[1.18]"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            {title}
          </h3>

          {/* Description in Inter / Sans */}
          <p
            className="text-slate-600 text-base sm:text-[17px] leading-relaxed font-sans text-justify"
            style={{ fontFamily: "'Inter', 'Source Sans 3', system-ui, sans-serif" }}
          >
            {description}
          </p>

          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-600">
              {highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#0F2C61]/10 text-[#0F2C61] font-medium shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B]" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

      </div>

      {/* ====================================================================
          FULL RESOLUTION LIGHTBOX MODAL
          ==================================================================== */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div 
              className="relative max-w-4xl w-full bg-[#FDFBF7] text-[#0F2C61] rounded-xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[92vh]"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#0F2C61]/15 bg-[#F4F1EA]">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-[#991B1B] uppercase tracking-wider">
                    {categoryLabel || 'CAMPUS LIFE'}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs font-mono text-slate-600 uppercase">
                    PHOTO {activeIdx + 1} OF {normalizedImages.length}
                  </span>
                </div>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-1 rounded-full hover:bg-black/10 transition-colors text-slate-600 hover:text-black cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Photo Display with Navigation Arrows */}
              <div className="relative bg-slate-950 flex-1 min-h-[300px] max-h-[64vh] flex items-center justify-center overflow-hidden">
                <img
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="max-h-[64vh] w-auto max-w-full object-contain mx-auto transition-all duration-300"
                  onError={(e) => {
                    if (activeImage.fallback) {
                      (e.target as HTMLImageElement).src = activeImage.fallback;
                    }
                  }}
                />

                {normalizedImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
                      aria-label="Previous photograph"
                    >
                      <ChevronLeft size={22} />
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
                      aria-label="Next photograph"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>

              {/* Caption Bar */}
              <div className="p-4 sm:p-5 bg-[#FDFBF7] border-t border-[#0F2C61]/10">
                <h4 
                  className="text-base sm:text-lg font-serif font-bold text-[#0F2C61] mb-1"
                  style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                >
                  {title}
                </h4>
                {activeImage.caption && (
                  <p className="text-xs sm:text-[13px] text-slate-700 font-sans leading-relaxed">
                    {activeImage.caption}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AnimatedEventSection;
