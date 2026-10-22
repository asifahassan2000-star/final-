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
          className="w-[95%] max-w-[1200px] mx-auto mb-8 sm:mb-10"
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
          <div className="overflow-hidden">
            <motion.h2
              id="leadership-impact-heading"
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0A1931] tracking-tight leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
            >
              Environmental Stewardship &amp; Faculty Leadership
            </motion.h2>
          </div>
        </motion.div>

        {/* =========================================================================
            COMBINED EXECUTIVE VISUAL RETROSPECTIVE — NO SEPARATE SUBHEADINGS
            Just clean, authoritative narrative text below each visual block
            ========================================================================= */}
        <div className="space-y-8 sm:space-y-10">

          {/* 1. Director Tree Planting & UN SDGs Commitment */}
          <motion.div 
            className="w-[95%] max-w-[1200px] mx-auto space-y-4"
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
                  (e.target as HTMLImageElement).src = '/images/qZbTG19_Whats-App-Image-2026-10-11-at-11-32-22-PM.jpg';
                }}
              />
            </div>

            <div className="w-full pt-1 space-y-3.5">
              <p 
                className="w-full text-slate-700 font-sans"
                style={{
                  fontSize: '17px',
                  lineHeight: '1.8',
                  textAlign: 'justify',
                  textJustify: 'inter-word'
                }}
              >
                At the University of Central Punjab (UCP) Bahawalpur Campus, leadership extends beyond classrooms to encompass environmental stewardship, cultural heritage, and community empowerment. As a leading institution in South Punjab, UCP Bahawalpur is proudly aligned with the UN Sustainable Development Goals (SDGs), championing initiatives in clean energy, zero single-use plastics, and green campus development.
              </p>
              <p 
                className="w-full text-slate-700 font-sans"
                style={{
                  fontSize: '17px',
                  lineHeight: '1.8',
                  textAlign: 'justify',
                  textJustify: 'inter-word'
                }}
              >
                Our faculty leadership believes in leading by example — fostering a campus culture that values sustainability, honors academic collaboration, and celebrates community bonds. Through meaningful engagements, outreach programs like the Village Tour, and initiatives that recognize contribution and partnership, UCP Bahawalpur continues to shape responsible leaders and a greener, more inclusive future for the region.
              </p>
            </div>
          </motion.div>

          {/* 3. Combined Side-by-Side: Selected Image on Left, New Awards/Ceremony Image on Right */}
          <motion.div
            className="w-[95%] max-w-[1200px] mx-auto pt-6 border-t border-slate-200/80"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeCurve }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Left: Selected Assembly Image */}
              <div className="relative w-full rounded-xl overflow-hidden bg-slate-100 shadow-xs aspect-[4/3] sm:aspect-[3/2]">
                <img
                  src="https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-13%20at%2012.53.34%20AM.jpeg"
                  alt="Faculty and leadership assembly at UCP Bahawalpur"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center block"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/leadership/leadership-official-gathering.jpg';
                  }}
                />
              </div>

              {/* Right: Added Ceremony & Awards Image (https://ibb.co/PsXDkcXR) */}
              <div className="relative w-full rounded-xl overflow-hidden bg-slate-100 shadow-xs aspect-[4/3] sm:aspect-[3/2]">
                <img
                  src="https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.38.19%20PM.jpeg"
                  alt="Official faculty awards ceremony and institutional recognition at UCP Bahawalpur"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center block"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/leadership/leadership-ceremony-awards.jpg';
                  }}
                />
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default LeadershipImpactSection;
