import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Exactly and exclusively the images specified by the user for Faculty in Action
export const FACULTY_GALLERY_IMAGES = [
  {
    id: 1,
    src: '/assets/action/action-1.jpg',
    fallback: '/images/d4Js05Q6_Whats-App-Image-2026-10-05-at-2-38-54-AM.jpg',
    alt: 'Faculty Academic Colloquium & Collaborative Seminar',
    originalUrl: 'https://ibb.co/N2ng6yLp',
  },
  {
    id: 2,
    src: '/assets/action/action-2.jpg',
    fallback: '/images/8nwhjT2X_Whats-App-Image-2026-10-05-at-2-39-01-AM-1.jpg',
    alt: 'Departmental Academic Council & Strategic Planning Session',
    originalUrl: 'https://ibb.co/wZqvK3CY',
  },
  {
    id: 3,
    src: '/assets/action/action-3.jpg',
    fallback: '/images/5XmTg1nD_Whats-App-Image-2026-10-05-at-2-39-04-AM-2.jpg',
    alt: 'Interactive Teaching & Faculty Mentorship Workshop',
    originalUrl: 'https://ibb.co/zWpsTm7c',
  },
  {
    id: 4,
    src: '/assets/action/action-4.jpg',
    fallback: '/images/XxnGYJmt_Whats-App-Image-2026-10-05-at-2-39-05-AM.jpg',
    alt: 'Academic Research & Multi-Disciplinary Discussion Forum',
    originalUrl: 'https://ibb.co/JjYS3kXH',
  },
  {
    id: 5,
    src: '/assets/action/action-5.jpg',
    fallback: '/images/QFfNPhws_Whats-App-Image-2026-10-05-at-2-39-15-AM-1.jpg',
    alt: 'Faculty Professional Development & Pedagogy Symposium',
    originalUrl: 'https://ibb.co/gM3TSQKs',
  },
  {
    id: 6,
    src: '/assets/action/action-6.jpg',
    fallback: '/images/VWKTk73X_Whats-App-Image-2026-10-05-at-2-39-02-AM.jpg',
    alt: 'Curriculum Review & Institutional Excellence Committee',
    originalUrl: 'https://ibb.co/xS46rp3V',
  },
  {
    id: 7,
    src: '/assets/action/action-7.jpg',
    fallback: '/images/7d82CDcp_Whats-App-Image-2026-10-05-at-2-39-07-AM-1.jpg',
    alt: 'Faculty Innovation & Scholarly Leadership Gathering',
    originalUrl: 'https://ibb.co/C3Nh8yd9',
  },
  {
    id: 8,
    src: '/assets/action/action-8.jpg',
    fallback: '/images/7d82CDcp_Whats-App-Image-2026-10-05-at-2-39-07-AM-1.jpg',
    alt: 'Academic Mentoring & Student Development Council',
    originalUrl: 'https://ibb.co/WpkcGFJp',
  },
  {
    id: 9,
    src: '/assets/action/action-9.jpg',
    fallback: '/images/8ntpY9jM_Whats-App-Image-2026-10-05-at-11-58-34-PM.jpg',
    alt: 'Scholarly Assembly & Campus Research Colloquium',
    originalUrl: 'https://ibb.co/LDHWN1CS',
  },
  {
    id: 10,
    src: '/assets/faculty/faculty-in-action-presentation.jpg',
    fallback: '/images/mWK32rn_Whats-App-Image-2026-10-11-at-11-13-40-PM.jpg',
    alt: 'Faculty Academic Presentation & Pedagogical Delivery in Action',
    originalUrl: 'https://ibb.co/xTbNBKn',
  },
  {
    id: 11,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.38.19%20PM.jpeg',
    fallback: '/assets/leadership/leadership-ceremony-awards.jpg',
    alt: 'Faculty Awards Ceremony & Academic Recognition in Action',
    originalUrl: 'https://ibb.co/PsXDkcXR',
  },
];

export const FacultyStickyGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const total = FACULTY_GALLERY_IMAGES.length;

  const goToNext = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Smooth continuous auto-transition every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  const currentImage = FACULTY_GALLERY_IMAGES[currentIndex];

  return (
    <section 
      id="faculty-sticky-focus" 
      className="w-full bg-[#f8fafc] py-10 sm:py-14 border-t border-b border-slate-200 select-none"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-[2px] bg-[#C5A059]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
                Scholarly Life & Academic Assembly
              </span>
            </div>
            <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl lg:text-4xl font-normal text-[#0F2C61] tracking-tight">
              Faculty in Action
            </h2>
          </div>
        </div>

        {/* 
          CLEAN CINEMATIC FRAME:
          Full image visibility, edge-to-edge, NO text, NO overlay spans, NO gradient scrim
          Exclusively the user-specified images
        */}
        <div 
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 shadow-xl border border-slate-200"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Animated Image Layer: Smooth motion between images */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentImage.id}
              initial={{ 
                opacity: 0, 
                scale: 1.03,
                x: direction === 'next' ? 36 : -36 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: 0 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.98, 
                x: direction === 'next' ? -36 : 36 
              }}
              transition={{ 
                duration: 0.75, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img src={currentImage.src}
                alt={currentImage.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center block"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.dataset.tried) {
                    target.dataset.tried = 'true';
                    target.src = currentImage.fallback;
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            onClick={goToPrev}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/35 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all duration-200 hover:scale-105 cursor-pointer shadow-lg"
            aria-label="Previous faculty session image"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={goToNext}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/35 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all duration-200 hover:scale-105 cursor-pointer shadow-lg"
            aria-label="Next faculty session image"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Minimalist Dot Indicators Below Single Image Frame */}
        <div className="mt-5 flex items-center justify-center gap-2 sm:gap-2.5">
          {FACULTY_GALLERY_IMAGES.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 'next' : 'prev');
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive 
                    ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-[#0F2C61]' 
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Photo ${idx + 1}`}
                aria-label={`Photo ${idx + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FacultyStickyGallery;
