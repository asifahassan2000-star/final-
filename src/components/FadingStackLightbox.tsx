import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface StackImageItem {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
}

interface FadingStackLightboxProps {
  images: (string | StackImageItem)[];
  categoryName?: string;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const FadingStackLightbox: React.FC<FadingStackLightboxProps> = ({
  images,
  categoryName = 'Campus Life',
  isOpen,
  onClose,
  initialIndex = 0,
}) => {
  // Ensure we always have 5 images in the stack
  const normalizedImages: StackImageItem[] = React.useMemo(() => {
    if (!images || images.length === 0) return [];
    const formatted = images.map((item) =>
      typeof item === 'string' ? { src: item, title: categoryName } : item
    );
    // Pad or slice to 5 items if needed
    if (formatted.length >= 5) return formatted.slice(0, 5);
    const result = [...formatted];
    while (result.length < 5 && formatted.length > 0) {
      result.push(formatted[result.length % formatted.length]);
    }
    return result;
  }, [images, categoryName]);

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Reset when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsPaused(false);
    }
  }, [isOpen]);

  // Auto changing after every 4 sec image change when open
  useEffect(() => {
    if (!isOpen || normalizedImages.length === 0 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isOpen, normalizedImages.length, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
      }
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, normalizedImages.length, onClose]);

  if (!isOpen || normalizedImages.length === 0) return null;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
  };

  // Stack styling configurations for 5 cards:
  // card 1: scale 1, top 0px
  // card 2: scale 0.96, top 10px
  // card 3: scale 0.92, top 20px
  // card 4: scale 0.88, top 30px
  // card 5: scale 0.84, top 40px
  const getStackProps = (offset: number) => {
    switch (offset) {
      case 0:
        return { scale: 1, top: 0, zIndex: 50, opacity: 1, shadow: 'shadow-2xl' };
      case 1:
        return { scale: 0.96, top: 10, zIndex: 40, opacity: 0.95, shadow: 'shadow-xl' };
      case 2:
        return { scale: 0.92, top: 20, zIndex: 30, opacity: 0.88, shadow: 'shadow-lg' };
      case 3:
        return { scale: 0.88, top: 30, zIndex: 20, opacity: 0.80, shadow: 'shadow-md' };
      case 4:
      default:
        return { scale: 0.84, top: 40, zIndex: 10, opacity: 0.70, shadow: 'shadow' };
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
        /* Background blurry but not black: luminous soft university tint with heavy backdrop blur */
        className="fixed inset-0 z-[9999] bg-[#0A1931]/30 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-6 select-none"
      >
        {/* Top Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-5 right-5 sm:top-7 sm:right-7 z-[10000] p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-xl transition-all duration-300 border border-white/25 cursor-pointer shadow-lg active:scale-95"
        >
          <X size={22} />
        </button>

        {/* Modal Outer Container */}
        <div
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full max-w-[700px] flex flex-col items-center"
        >
          {/* Centered Modal 700x450px Canvas for Stack */}
          <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] flex items-center justify-center">
            {normalizedImages.map((item, idx) => {
              // Calculate cyclic offset from currentIndex
              const offset = (idx - currentIndex + normalizedImages.length) % normalizedImages.length;
              const { scale, top, zIndex, opacity, shadow } = getStackProps(offset);

              return (
                <motion.div
                  key={`stack-card-${idx}`}
                  layout
                  initial={{ scale: scale * 0.95, opacity: 0, y: top + 20 }}
                  animate={{
                    scale,
                    y: top,
                    opacity,
                    zIndex,
                    rotate: 0,
                  }}
                  exit={{
                    y: -160,
                    rotate: -8,
                    opacity: 0,
                    scale: 0.82,
                    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={offset === 0 ? handleNext : undefined}
                  style={{
                    transformOrigin: 'top center',
                    zIndex,
                  }}
                  className={`
                    absolute inset-x-0 mx-auto w-[90%] sm:w-[94%] md:w-[700px]
                    h-[280px] sm:h-[360px] md:h-[410px]
                    rounded-[16px] overflow-hidden bg-slate-900 border border-white/20
                    ${shadow} cursor-pointer
                  `}
                >
                  {/* Clean Picture with NO counting badge and NO text overlaid */}
                  <img
                    src={item.src}
                    alt={item.title || `Campus Life ${idx + 1}`}
                    className="w-full h-full object-cover object-center select-none pointer-events-none"
                  />

                  {/* Soft subtle edge glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              );
            })}
          </div>

          {/* Left / Right Navigation Controls */}
          <div className="flex items-center justify-between w-full mt-4 px-2">
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous card"
              className="p-2.5 rounded-full border border-white/20 bg-[#0F2C52]/90 hover:bg-[#0F2C52] text-white transition-all duration-300 cursor-pointer shadow-lg active:scale-95 backdrop-blur-md"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots Pagination Bottom (5 Dots) */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Card dots">
              {normalizedImages.map((_, dotIdx) => {
                const isActive = currentIndex === dotIdx;
                return (
                  <button
                    key={`dot-${dotIdx}`}
                    type="button"
                    onClick={() => setCurrentIndex(dotIdx)}
                    aria-label={`Go to image ${dotIdx + 1}`}
                    className={`
                      transition-all duration-500 rounded-full cursor-pointer
                      ${
                        isActive
                          ? 'w-7 h-2 bg-[#0F2C52] border border-amber-300/80 shadow-md ring-1 ring-white/30'
                          : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                      }
                    `}
                  />
                );
              })}
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next card"
              className="p-2.5 rounded-full border border-white/20 bg-[#0F2C52]/90 hover:bg-[#0F2C52] text-white transition-all duration-300 cursor-pointer shadow-lg active:scale-95 backdrop-blur-md"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Caption Below the picture: "UCP Bahawalpur - [Category Name]" */}
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-white tracking-wide font-sans drop-shadow-md">
              UCP Bahawalpur — <span className="text-amber-300">{categoryName}</span>
            </p>
            <p className="text-[11px] text-white/70 font-mono mt-0.5">
              Auto-cycling every 4 seconds • Click image or arrows to advance
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FadingStackLightbox;
