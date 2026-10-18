import React from 'react';
import { motion } from 'framer-motion';

interface LeadershipImpactSectionProps {
  onScrollTo?: (id: string) => void;
}

export const LeadershipImpactSection: React.FC<LeadershipImpactSectionProps> = () => {
  const easeCurve = [0.22, 1, 0.36, 1] as const;

  return (
    <section 
      id="leadership-impact-section" 
      className="relative bg-white py-10 sm:py-14 border-b border-slate-200 select-none"
      aria-labelledby="leadership-impact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* First Section Heading — Kept Exactly Same */}
        <motion.div
          className="max-w-3xl mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCurve }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8102E] font-semibold">
              INSTITUTIONAL GOVERNANCE & SUSTAINABILITY
            </span>
          </div>
          <h2
            id="leadership-impact-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0A1931] tracking-tight leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
          >
            Environmental Stewardship & Faculty Leadership
          </h2>
        </motion.div>

        {/* =========================================================================
            COMBINED EXECUTIVE VISUAL RETROSPECTIVE — NO SEPARATE SUBHEADINGS
            Just clean, authoritative narrative text below each visual block
            ========================================================================= */}
        <div className="space-y-8 sm:space-y-10">

          {/* 1. Director Tree Planting & UN SDGs Commitment */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeCurve }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative rounded-xl overflow-hidden bg-slate-100 shadow-xs w-full aspect-[16/10] sm:aspect-[16/9] max-h-[580px]">
              <img
                src="/assets/leadership/director-tree-plantation-sdg.jpg"
                alt="Director Prof. Hamid Iqbal inaugurating the UN SDG Tree Plantation Drive at UCP Bahawalpur"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center block"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://i.ibb.co/qZbTG19/Whats-App-Image-2026-10-11-at-11-32-22-PM.jpg';
                }}
              />
            </div>

            <div className="max-w-4xl pt-0.5">
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed font-sans">
                UCP is committed to the UN Sustainable Development Goals (SDGs), recognized nationally for clean energy, zero single-use plastics, and community outreach.
              </p>
              <p className="mt-1 text-xs text-slate-500 font-sans">
                Director Prof. Hamid Iqbal inaugurating the Green Campus & UN Sustainable Development Goals Tree Plantation Drive at UCP Bahawalpur.
              </p>
            </div>
          </motion.div>

          {/* 2. Director Recognizing Faculty Member */}
          <motion.div
            className="pt-6 border-t border-slate-200/80 space-y-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeCurve }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="relative w-full rounded-xl overflow-hidden bg-slate-100 shadow-xs aspect-[16/9] sm:aspect-[21/10] max-h-[600px]">
              <img
                src="/assets/leadership/director-faculty-handshake.jpg"
                alt="Director Prof. Hamid Iqbal with faculty member at UCP Bahawalpur"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center block"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://i.ibb.co/WN1SQWGm/image-5.jpg';
                }}
              />
            </div>

            <div className="max-w-4xl pt-0.5">
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                Director Prof. Hamid Iqbal recognizing and commending faculty members for meritorious academic service, research contributions, and leadership at UCP Bahawalpur.
              </p>
            </div>
          </motion.div>

          {/* 3. Combined Side-by-Side: Selected Image on Left, New Awards/Ceremony Image on Right */}
          <motion.div
            className="pt-6 border-t border-slate-200/80 space-y-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeCurve }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Left: Selected Assembly Image */}
              <div className="relative w-full rounded-xl overflow-hidden bg-slate-100 shadow-xs aspect-[4/3] sm:aspect-[3/2]">
                <img
                  src="/assets/leadership/leadership-official-gathering.jpg"
                  alt="Faculty and leadership assembly at UCP Bahawalpur"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center block"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://i.ibb.co/RTFJgsVp/Whats-App-Image-2026-10-13-at-12-53-34-AM.jpg';
                  }}
                />
              </div>

              {/* Right: Added Ceremony & Awards Image (https://ibb.co/PsXDkcXR) */}
              <div className="relative w-full rounded-xl overflow-hidden bg-slate-100 shadow-xs aspect-[4/3] sm:aspect-[3/2]">
                <img
                  src="/assets/leadership/leadership-ceremony-awards.jpg"
                  alt="Official faculty awards ceremony and institutional recognition at UCP Bahawalpur"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center block"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://i.ibb.co/RGrj83r1/Whats-App-Image-2026-10-11-at-11-38-19-PM.jpg';
                  }}
                />
              </div>
            </div>

            <div className="max-w-4xl pt-0.5">
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                Official institutional assemblies, faculty convocations, and executive recognition ceremonies at UCP Bahawalpur celebrating academic culture and institutional excellence.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default LeadershipImpactSection;
