import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { UCP_CONTACT } from '../data/ucpData';

interface ClosingDramaticSectionProps {
  onOpenApply: () => void;
  onOpenProgrammesPage: () => void;
  onScrollTo?: (id: string) => void;
}

export const ClosingDramaticSection: React.FC<ClosingDramaticSectionProps> = ({
  onOpenApply,
  onOpenProgrammesPage,
  onScrollTo,
}) => {
  return (
    <section 
      id="closing-campus-section"
      className="relative w-full bg-[#07192f] text-white overflow-hidden py-[100px]"
      aria-labelledby="closing-heading"
    >
      {/* IMAGE 14: Dramatic Architectural Image without dark mud overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/assets/campus/14_closing_dramatic_campus.jpg"
          alt="Dramatic Architectural Perspective of University of Central Punjab Bahawalpur"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Luminous, light-balanced transparent gradient scrim (no heavy dark mud) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/30 pointer-events-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-xs uppercase tracking-[0.24em] font-semibold text-[#FEF08A] mb-6 backdrop-blur-sm">
          <Sparkles size={13} />
          <span>YOUR ACADEMIC HOME IN SOUTHERN PUNJAB</span>
        </div>

        {/* Main Heading with Playfair Display */}
        <h2
          id="closing-heading"
          className="text-3xl sm:text-5xl lg:text-6xl font-['Playfair_Display',serif] font-bold tracking-tight text-white leading-[1.15] drop-shadow-md mb-6"
        >
          Experience UCP Bahawalpur
        </h2>

        {/* Staggered Supporting Text (Inter) */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-100 font-sans leading-relaxed mb-10 drop-shadow-sm">
          A tradition of excellence, a purpose-built architectural campus, and distinguished faculty committed to shaping leaders of character and distinction.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenApply}
            className="px-7 py-3.5 bg-[#a30f16] hover:bg-[#860c12] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-[0.16em] transition-all shadow-xl hover:shadow-rose-950/60 flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Begin Application</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onOpenProgrammesPage}
            className="px-6 py-3.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide border border-white/30 backdrop-blur-md transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            Explore Academic Programmes
          </button>
        </div>

        {/* Location & Accreditation Marker */}
        <div className="mt-14 pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-200 font-sans tracking-wide">
          <span>Chartered by the Government of the Punjab</span>
          <span>·</span>
          <span>HEC Recognized (Highest Category)</span>
          <span>·</span>
          <span>Bahawalpur, Punjab, Pakistan</span>
        </div>
      </motion.div>
    </section>
  );
};
