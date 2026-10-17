import React from 'react';
import { Quote, Award, CheckCircle, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface ChairmanMessageProps {
  onOpenApply: () => void;
  onScrollTo: (sectionId: string) => void;
}

export const ChairmanMessage: React.FC<ChairmanMessageProps> = ({ onOpenApply, onScrollTo }) => {
  return (
    <section id="chairman-section" className="py-20 sm:py-24 bg-white relative overflow-hidden">
      {/* Subtle background motif */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-slate-100/60 pointer-events-none blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Chairman Portrait & Credential Badge: Image rendered immediately with subtle scroll parallax */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative group parallax-container">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#112c4f] to-[#a30f16] rounded-3xl opacity-20 group-hover:opacity-35 blur-sm transition-all" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 max-w-sm">
                <img
                  src="https://ucp.edu.pk/wp-content/uploads/2023/01/home_chiarmain.webp"
                  alt="Mian Amer Mahmood - Chairman UCP"
                  data-parallax-img
                  loading="lazy"
                  decoding="async"
                  className="parallax-img w-full h-auto object-cover object-top subtle-hover-scale"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                
                {/* Floating Chairman Badge */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0c2340] via-[#0c2340]/90 to-transparent p-6 text-white text-left">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Mian Amer Mahmood</h3>
                  <p className="text-sm sm:text-base text-rose-300 font-semibold tracking-wide uppercase mt-0.5">
                    Chairman, University of Central Punjab
                  </p>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1">
                    Chairman, Punjab Group of Colleges (PGC)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick credentials card: Exists immediately */}
            <div className="editorial-card mt-6 w-full max-w-sm bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center justify-around text-center shadow-sm">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#092242]">
                  <AnimatedCounter value="1999" duration={850} />
                </span>
                <span className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider font-semibold">Charter Year</span>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#a30f16]">
                  <AnimatedCounter value="500K+" duration={850} />
                </span>
                <span className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider font-semibold">PGC Family</span>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#092242]">
                  <AnimatedCounter value="#362" duration={850} />
                </span>
                <span className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider font-semibold">QS Asian Rank</span>
              </div>
            </div>
          </div>

          {/* Chairman's Message Content */}
          <div className="lg:col-span-7 space-y-6">
            
            <div data-reveal="label" data-reveal-delay="0" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-[#092242] text-xs sm:text-sm font-bold uppercase tracking-wider border border-slate-200">
              <Quote size={15} className="text-[#a30f16]" /> Leadership Vision
            </div>

            <div className="heading-mask">
              <h2 
                data-reveal="heading"
                data-reveal-delay="100"
                className="heading-reveal text-4xl sm:text-5xl lg:text-6xl font-normal text-[#092242] tracking-wide leading-tight"
                style={{ fontFamily: "'UnifrakturMaguntia', 'Old English Text MT', 'Engravers Old English BT', 'Cloister Black', 'Chaucer', 'Blackletter', serif" }}
              >
                Chairman's Message
              </h2>
            </div>

            {/* The authentic featured quote */}
            <div data-reveal="fade-up" data-reveal-delay="220" className="relative p-6 sm:p-8 rounded-2xl bg-[#0b2341] text-white shadow-xl border border-slate-700/60">
              <Quote size={40} className="text-[#a30f16] opacity-80 mb-3" />
              <blockquote className="text-lg sm:text-2xl font-medium italic leading-relaxed text-slate-100">
                “We aim to make our students adaptable to change so that they may thrive in a rapidly evolving job market; critical thinkers to be able to identify problems in our society and; creative to come up with pragmatic solutions.”
              </blockquote>
              <div className="mt-5 pt-4 border-t border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-sm sm:text-base font-bold uppercase text-white block">Mian Amer Mahmood</span>
                  <span className="text-xs sm:text-sm text-slate-300">Chairman, UCP</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>

            {/* Extended context on UCP and PGC */}
            <p data-reveal="text" data-reveal-delay="340" className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Established under the patronage of the <strong>Punjab Group of Colleges (PGC)</strong> — Pakistan’s largest educational network — the University of Central Punjab continues to set the benchmark for higher learning, pioneering research, and transformative leadership.
            </p>

            <div data-reveal="fade-up" data-reveal-delay="340" className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-[#a30f16] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-800 font-medium">
                  Merit & need-based scholarship fund exceeding <strong><AnimatedCounter value="1.3" duration={850} /> Billion PKR</strong>.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-[#a30f16] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-800 font-medium">
                  <strong><AnimatedCounter value="199+" duration={850} /> PhD Scholars</strong> delivering internationally recognized research.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-[#a30f16] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-800 font-medium">
                  Global collaboration with <strong>CNN Academy</strong> & top world universities.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-[#a30f16] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-800 font-medium">
                  Accredited by <strong>HEC, PEC, NBEAC, NCEAC, PCP & PBC</strong>.
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div data-reveal="button" data-reveal-delay="340" className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="chairman-apply-btn"
                onClick={onOpenApply}
                className="bg-[#a30f16] hover:bg-[#880d12] text-white px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95"
              >
                Join UCP Fall 2026 <ArrowRight size={16} />
              </button>

              <button
                id="chairman-explore-faculties-btn"
                onClick={() => onScrollTo('faculties-section')}
                className="text-[#092242] hover:text-[#a30f16] text-sm font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl border border-slate-300 hover:border-[#a30f16] transition-all bg-white hover:bg-slate-50"
              >
                Explore 9 Faculties
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
