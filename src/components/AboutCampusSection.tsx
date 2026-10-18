import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Building2, Trees, CheckCircle2, Presentation, Maximize2, X } from 'lucide-react';

interface ClassroomPhoto {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  fallback: string;
  caption: string;
  tag: string;
}

interface AboutCampusSectionProps {
  onOpenApply?: () => void;
  onOpenLegacyPage?: () => void;
  onScrollTo?: (id: string) => void;
}

export const AboutCampusSection: React.FC<AboutCampusSectionProps> = ({
  onOpenApply,
  onOpenLegacyPage,
}) => {
  const [activePhoto, setActivePhoto] = useState<ClassroomPhoto | null>(null);

  const classroomPhotos: ClassroomPhoto[] = [
    {
      id: 'presentation-1',
      title: 'Student Case Presentations',
      subtitle: 'Multimedia Lecture Halls & Interactive Delivery',
      src: '/assets/campus/student-classroom-presentation-1.jpg',
      fallback: 'https://i.ibb.co/fdNr6DW5/Whats-App-Image-2026-10-11-at-11-26-34-PM.jpg',
      caption: 'Students delivering oral presentations, presenting semester case studies, and defending course projects in digitally equipped classrooms.',
      tag: 'STUDENT PRESENTATION',
    },
    {
      id: 'presentation-2',
      title: 'Interactive Academic Dialogue',
      subtitle: 'Faculty Mentorship & Collaborative Inquiry',
      src: '/assets/campus/student-classroom-presentation-2.jpg',
      fallback: 'https://i.ibb.co/LDpBsFvq/Whats-App-Image-2026-10-11-at-11-19-54-PM.jpg',
      caption: 'Dynamic peer exchanges, active faculty question-and-answer sessions, and interactive classroom learning fostering intellectual confidence.',
      tag: 'ACTIVE LEARNING',
    },
    {
      id: 'teacher-training-3',
      title: 'Teacher Training & Pedagogical Development',
      subtitle: 'Subject Delivery, Generational Mindset & Modern Pedagogy',
      src: '/assets/campus/teacher-training-presentation.jpg',
      fallback: 'https://i.ibb.co/PGh5DQqD/Whats-App-Image-2026-10-11-at-11-35-45-PM.jpg',
      caption: 'Faculty workshops where professors deliver presentations on subject methodologies, classroom pedagogy, and adapting teaching techniques to meet modern generational requirements.',
      tag: 'TEACHER TRAINING',
    },
    {
      id: 'workshop-endnote-4',
      title: 'Workshop on EndNote',
      subtitle: 'Dr. Shahid Amin · Advanced Bibliographic Tooling & Citation',
      src: '/assets/events/workshop-endnote-shahid-amin.jpg',
      fallback: 'https://i.ibb.co/R42Z7TWx/Whats-App-Image-2026-10-17-at-3-44-52-AM.jpg',
      caption: 'Hands-on academic workshop on EndNote bibliographic software, citation indexation, and scholarly referencing conducted by Dr. Shahid Amin for faculty and researchers.',
      tag: 'ENDNOTE WORKSHOP',
    },
  ];

  const easeCurve = [0.22, 1, 0.36, 1] as const;

  return (
    <section 
      id="our-campus-section"
      className="relative bg-white py-20 sm:py-24 lg:py-28 border-b border-slate-200/80 select-none"
      aria-labelledby="about-campus-heading"
    >
      {/* Anchor alias for About navigation */}
      <div id="about-section" className="absolute -top-24" aria-hidden="true" />
      
      {/* Subtle architectural dot grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#092242 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Framer Motion Reveal */}
        <motion.div 
          className="max-w-3xl mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeCurve }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#a30f16]">
              OUR CAMPUS · BAHAWALPUR
            </span>
            <span className="h-px w-8 bg-[#a30f16]/40" aria-hidden="true" />
          </div>

          <h2
            id="about-campus-heading"
            className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-semibold text-[#092242] tracking-tight leading-[1.18]"
            style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
          >
            An Environment Built for Growth & Academic Discovery
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-2xl">
            Rooted in the historic scholarly legacy of Bahawalpur and developed with purpose-built modern architecture, UCP Bahawalpur provides world-class educational spaces and interactive classrooms designed to inspire learning.
          </p>
        </motion.div>

        {/* =========================================================================
            1. DUAL-COLUMN ARCHITECTURAL & GROUNDS SHOWCASE
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16 sm:mb-20">
          
          {/* Left Column: Architectural Exterior */}
          <motion.div 
            className="lg:col-span-7 flex flex-col space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeCurve }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Architectural Exterior Photograph (Minimal, No Extra Border) */}
            <div className="group relative overflow-hidden rounded-xl bg-slate-100 shadow-xs w-full aspect-[16/9]">
              <img
                src="/assets/campus/12_about_architecture_exterior.jpg"
                alt="UCP Bahawalpur Architectural Exterior and Modern Campus Facade"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-102"
              />
            </div>

            {/* Contemporary Learning Standards Narrative Block */}
            <div className="bg-[#FDFBF7] rounded-xl p-6 sm:p-7 space-y-4 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#a30f16]">
                  <Building2 size={16} />
                  <span>Purpose-Built Academic Infrastructure</span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200/80">
                  Bahawalpur Region
                </span>
              </div>

              <h4 
                className="font-serif text-xl sm:text-2xl font-semibold text-[#092242]"
                style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
              >
                World-Class Facilities for Tomorrow’s Leaders
              </h4>

              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Spread across an expansive footprint, the campus integrates digital lecture theatres, advanced computing labs, high-speed fiber connectivity, and dedicated faculty research lounges. Every space is engineered to facilitate rigorous inquiry and collaborative problem solving.
              </p>

              <div className="pt-2 flex items-center gap-4 flex-wrap border-t border-slate-200/70">
                {onOpenLegacyPage && (
                  <button
                    onClick={onOpenLegacyPage}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#092242] hover:text-[#a30f16] transition-colors cursor-pointer group/btn"
                  >
                    <span>Explore Our Legacy</span>
                    <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1 text-[#a30f16]" />
                  </button>
                )}
                {onOpenApply && (
                  <button
                    onClick={onOpenApply}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#a30f16] hover:text-[#092242] transition-colors cursor-pointer group/btn ml-auto"
                  >
                    <span>Apply for Admissions</span>
                    <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                )}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Campus Grounds Visual & Specs */}
          <motion.div 
            className="lg:col-span-5 flex flex-col space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeCurve }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bg-[#FAF8F5] rounded-xl p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#092242]">
                  <Trees size={16} className="text-[#a30f16]" />
                  <span>Central Lawns & Academic Complex</span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200/80">
                  Full Campus View
                </span>
              </div>

              {/* Full-Bleed 16:9 Edge-to-Edge Image (Minimal, No Extra Border) */}
              <div className="group relative overflow-hidden rounded-xl bg-slate-100 shadow-xs w-full aspect-[16/9]">
                <img
                  src="/assets/campus/central_lawn_academic_complex.jpg"
                  alt="University of Central Punjab Bahawalpur Campus Central Lawns and Academic Complex"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-102"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://i.ibb.co/pr54WNFV/Whats-App-Image-2026-10-10-at-7-16-33-AM.jpg';
                  }}
                />
              </div>

              <div className="space-y-3 text-xs sm:text-[13px] text-slate-700">
                <p className="text-slate-600 leading-relaxed font-sans">
                  The Bahawalpur campus grounds combine expansive green lawns with modern academic wings, providing peaceful student gathering areas and outdoor study environments.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-slate-200/70">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Purpose-Built:</strong> Higher education complex.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Lush Greenery:</strong> Manicured lawns & quads.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Multimedia Halls:</strong> Smart classrooms & labs.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Safe & Accessible:</strong> 24/7 security & concourses.</span>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

        {/* =========================================================================
            2. STUDENT CLASSROOM PRESENTATIONS & BEST STUDY ENVIRONMENT
            Minimal style, no extra border, all images visible properly & click-to-zoom
            ========================================================================= */}
        <motion.div
          className="pt-4 border-t border-slate-200/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeCurve }}
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Subheading Block */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#a30f16] uppercase flex items-center gap-1.5">
                  <Presentation size={14} /> CLASSROOMS & TEACHING EXCELLENCE
                </span>
                <span className="h-3 w-px bg-slate-300" />
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  STUDENT & FACULTY SESSIONS
                </span>
              </div>
              <h3 
                className="text-2xl sm:text-3xl font-serif font-bold text-[#092242] tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
              >
                Interactive Classrooms, Presentations & Teacher Training
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md font-sans">
              Equipped with smart digital podiums and collaborative acoustics, our lecture halls foster confident student case presentations and high-impact faculty pedagogical workshops.
            </p>
          </div>

          {/* 4-Card Minimal Classroom & Academic Workshop Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {classroomPhotos.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: easeCurve }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-[#FAF8F5] rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 group cursor-pointer"
                onClick={() => setActivePhoto(item)}
              >
                <div>
                  {/* Photo Frame (Full Size Visible, No Extra Border) */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-3.5 shadow-2xs">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = item.fallback;
                      }}
                    />
                    
                    {/* Minimal hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                      <span className="text-white text-[11px] font-mono tracking-wider flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        <Maximize2 size={11} /> View Full
                      </span>
                      <span className="text-white/90 text-[10px] font-mono bg-[#a30f16]/80 px-1.5 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>

                    {/* Tag badge */}
                    <div className="absolute top-2.5 left-2.5 pointer-events-none">
                      <span className="text-[9px] font-mono font-semibold tracking-wider uppercase text-white bg-[#092242]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 
                    className="text-base sm:text-lg font-serif font-bold text-[#092242] mb-1 group-hover:text-[#a30f16] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium tracking-wide mb-2">
                    {item.subtitle}
                  </p>

                  {/* Caption */}
                  <p className="text-xs text-slate-600 font-sans leading-relaxed text-justify">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* =========================================================================
          FULL RESOLUTION IMAGE LIGHTBOX MODAL
          ========================================================================= */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
          >
            <motion.div 
              className="relative max-w-4xl w-full bg-[#FDFBF7] text-[#092242] rounded-xl overflow-hidden shadow-2xl border border-white/20"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-[#FAF8F5]">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-[#a30f16] uppercase tracking-wider">
                    {activePhoto.tag}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs font-mono text-slate-600 uppercase">
                    CLASSROOM ENVIRONMENT
                  </span>
                </div>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="p-1 rounded-full hover:bg-black/10 transition-colors text-slate-600 hover:text-black cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative bg-slate-950 max-h-[70vh] flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = activePhoto.fallback;
                  }}
                />
              </div>

              <div className="p-5 bg-[#FDFBF7]">
                <h4 
                  className="text-lg sm:text-xl font-serif font-bold text-[#092242] mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
                >
                  {activePhoto.title}
                </h4>
                <p className="text-xs font-mono text-[#a30f16] uppercase tracking-wider mb-2">
                  {activePhoto.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                  {activePhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default AboutCampusSection;
