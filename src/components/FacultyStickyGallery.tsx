import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Exactly and exclusively the images specified by the user for Faculty in Action
export const FACULTY_GALLERY_IMAGES = [
  {
    id: 1,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.38.54%20AM.jpeg?updatedAt=1792658061116',
    fallback: '/assets/action/action-1.jpg',
    alt: 'Faculty Academic Colloquium & Research Assembly at UCP Bahawalpur',
  },
  {
    id: 2,
    src: 'https://ik.imagekit.io/Muffins/image%20(41).png?updatedAt=1792665394638',
    fallback: '/assets/action/action-2.jpg',
    alt: 'Scholarly Faculty Deliberations & Academic Planning',
  },
  {
    id: 3,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%201.34.21%20AM.jpeg?updatedAt=1792580312645',
    fallback: '/assets/action/action-4.jpg',
    alt: 'Interactive Teaching & Pedagogical Development Session',
  },
  {
    id: 4,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%2012.30.03%20AM.jpeg?updatedAt=1792580311292',
    fallback: '/assets/action/action-5.jpg',
    alt: 'Multi-Disciplinary Academic Symposium & Faculty Discussion',
  },
  {
    id: 5,
    src: 'https://ik.imagekit.io/Muffins/image%20(56).png?updatedAt=1792645312374',
    fallback: '/assets/action/action-6.jpg',
    alt: 'Curriculum Enhancement & Institutional Excellence Review',
  },
  {
    id: 6,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-21%20at%2011.28.10%20PM%20(2).png?updatedAt=1792653193262',
    fallback: '/assets/action/action-7.jpg',
    alt: 'Faculty Innovation & Scholarly Leadership Forum',
  },
  {
    id: 7,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.43.36%20PM.jpeg?updatedAt=1792654235718',
    fallback: '/assets/action/action-8.jpg',
    alt: 'Academic Mentoring & Student Research Colloquium',
  },
  {
    id: 8,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.13.40%20PM.jpeg?updatedAt=1792654239658',
    fallback: '/assets/action/action-9.jpg',
    alt: 'Faculty Scholarly Assembly & Lecture Delivery',
  },
  {
    id: 9,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.02%20AM.jpeg?updatedAt=1792654242831',
    fallback: '/assets/faculty/faculty-in-action-presentation.jpg',
    alt: 'Academic Leadership & Faculty Meeting in Action',
  },
  {
    id: 10,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.05%20AM.jpeg?updatedAt=1792654248191',
    fallback: '/assets/action/action-4.jpg',
    alt: 'Faculty Collaborative Strategy & Departmental Assembly',
  },
  {
    id: 11,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.04%20AM%20(2).jpeg?updatedAt=1792654243818',
    fallback: '/assets/action/action-3.jpg',
    alt: 'Academic Workshop & Higher Education Dialogue',
  },
  {
    id: 12,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.01%20AM%20(1).jpeg?updatedAt=1792654246190',
    fallback: '/assets/action/action-2.jpg',
    alt: 'Faculty Peer Consultation & Educational Leadership',
  },
  {
    id: 13,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.11.08%20PM.jpeg?updatedAt=1792654251092',
    fallback: '/assets/action/action-5.jpg',
    alt: 'Faculty Honours & Academic Recognition Ceremony',
  },
  {
    id: 14,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.07%20AM%20(1).jpeg?updatedAt=1792658086982',
    fallback: '/assets/action/action-7.jpg',
    alt: 'Academic Innovation & Research Forum in Session',
  },
  {
    id: 15,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.05%20AM%20(1).jpeg?updatedAt=1792829443829',
    fallback: '/assets/action/action-1.jpg',
    alt: 'Higher Education Pedagogy & Faculty Development',
  },
  {
    id: 16,
    src: 'https://ik.imagekit.io/Muffins/image%20(100).png?updatedAt=1792664806969',
    fallback: '/assets/action/action-9.jpg',
    alt: 'Interactive Teaching & Faculty Student Engagement',
  },
  {
    id: 17,
    src: 'https://ik.imagekit.io/Muffins/image%20(19)%20(1).png?updatedAt=1792654251320',
    fallback: '/assets/action/action-8.jpg',
    alt: 'Campus Academic Excellence & Faculty Council',
  },
  {
    id: 18,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%2012.32.16%20AM.jpeg?updatedAt=1792580286865',
    fallback: '/assets/action/action-2.jpg',
    alt: 'Scholarly Assembly & Campus Departmental Meeting',
  },
  {
    id: 19,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-21%20at%2011.28.10%20PM%20(1).png?updatedAt=1792653193671',
    fallback: '/assets/action/action-7.jpg',
    alt: 'Academic Mentorship & Research Innovation Session',
  },
  {
    id: 20,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%202.32.52%20AM%20(3).jpeg?updatedAt=1792580312746',
    fallback: '/assets/action/action-3.jpg',
    alt: 'University Convocation & Faculty Academic Procession',
  },
  {
    id: 21,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%2011.58.34%20PM.jpeg',
    fallback: '/assets/action/action-8.jpg',
    alt: 'Faculty Academic Research Colloquium & Leadership Session',
  },
  {
    id: 22,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.06.21%20AM.jpeg?updatedAt=1792949765373',
    fallback: '/assets/action/action-9.jpg',
    alt: 'Faculty Mentorship & Campus Academic Discourse',
  },
  {
    id: 23,
    src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-13%20at%201.12.45%20AM.jpeg?updatedAt=1792738711805',
    fallback: '/assets/action/action-1.jpg',
    alt: 'Departmental Strategy & University Faculty Convention',
  },
  {
    id: 24,
    src: 'https://ik.imagekit.io/Muffins/image%20(71).png?updatedAt=1792653192426',
    fallback: '/assets/action/action-5.jpg',
    alt: 'Scholarly Teaching Excellence & Faculty Assembly',
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

  // Smooth continuous auto-transition every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  // Fast preloading of next and previous image for instant zero-latency transitions
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % total;
    const prevIdx = (currentIndex - 1 + total) % total;
    const nextImg = new Image();
    nextImg.src = FACULTY_GALLERY_IMAGES[nextIdx].src;
    const prevImg = new Image();
    prevImg.src = FACULTY_GALLERY_IMAGES[prevIdx].src;
  }, [currentIndex, total]);

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

          {/* Quick Counter Badge */}
          <div className="flex items-center gap-2 self-start sm:self-end">
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 tracking-wider">
              {currentIndex + 1} / {total}
            </span>
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
                scale: 1.02,
                x: direction === 'next' ? 32 : -32 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: 0 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.98, 
                x: direction === 'next' ? -32 : 32 
              }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={currentImage.src}
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
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all duration-200 hover:scale-105 cursor-pointer shadow-lg active:scale-95"
            aria-label="Previous faculty session image"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={goToNext}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all duration-200 hover:scale-105 cursor-pointer shadow-lg active:scale-95"
            aria-label="Next faculty session image"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Minimalist Responsive Dot Track Below Single Image Frame */}
        <div className="mt-5 flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 max-w-xl mx-auto px-2">
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
                    ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-[#0F2C61]' 
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
