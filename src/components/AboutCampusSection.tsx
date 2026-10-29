import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Building2, 
  Trees, 
  CheckCircle2, 
  Presentation, 
  Maximize2, 
  X, 
  Sparkles,
  FlaskConical,
  Users,
  BookOpenCheck,
  Award,
  GraduationCap,
  Coins,
  ArrowRightLeft,
  TrendingUp
} from 'lucide-react';

const WHY_JOIN_ITEMS = [
  {
    text: 'STATE-OF-THE-ART INFRASTRUCTURE',
    icon: Building2,
  },
  {
    text: 'ADVANCED SCIENCE & COMPUTER LABS',
    icon: FlaskConical,
  },
  {
    text: 'VIBRANT & SUPPORTIVE CAMPUS LIFE',
    icon: Users,
  },
  {
    text: 'A RIGOROUS CURRICULUM',
    icon: BookOpenCheck,
  },
  {
    text: 'WORLD-CLASS FACULTY',
    icon: Award,
  },
  {
    text: 'OFFICIAL UCP LAHORE DEGREE — CLOSE TO HOME',
    icon: GraduationCap,
  },
  {
    text: 'SAVE TRAVEL & LIVING COSTS',
    icon: Coins,
  },
  {
    text: 'SEAMLESS MOBILITY TO UCP LAHORE',
    icon: ArrowRightLeft,
  },
  {
    text: 'A STRONG FOUNDATION FOR FUTURE SUCCESS',
    icon: TrendingUp,
  },
];

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

  const orientationPhotos: ClassroomPhoto[] = [
    {
      id: 'orientation-tree',
      title: 'The Family Tree Tradition',
      subtitle: 'Leaving a Thumbprint, Growing Together as a UCPian',
      src: 'https://ik.imagekit.io/Muffins/image%20(40).jpg',
      fallback: '/assets/campus/orientation-thumbprint-tree.jpg',
      caption: 'Every new student leaves a single colorful thumbprint on our family tree canvas, leaving their indelible mark and becoming an active leaf in our expanding legacy.',
      tag: 'FAMILY TREE TRADITION',
    },
    {
      id: 'orientation-frame',
      title: 'Proud "I am a UCPian" Moments',
      subtitle: 'Capturing the Joy of Belonging and New Friendships',
      src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-19%20at%203.44.31%20AM.jpeg',
      fallback: '/assets/campus/orientation-ucpian-frame.jpeg',
      caption: 'Smiling inside the celebratory frame to declare belonging to the world, creating memories that get shared everywhere as a lifelong member of the UCP family.',
      tag: 'STUDENT IDENTITY & BELONGING',
    },
  ];

  const classroomPhotos: ClassroomPhoto[] = [
    {
      id: 'presentation-1',
      title: 'Student Case Presentations',
      subtitle: 'Multimedia Lecture Halls & Interactive Delivery',
      src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.26.34%20PM.jpeg',
      fallback: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.26.34%20PM.jpeg',
      caption: 'Students delivering oral presentations, presenting semester case studies, and defending course projects in digitally equipped classrooms.',
      tag: 'STUDENT PRESENTATION',
    },
    {
      id: 'presentation-2',
      title: 'Interactive Academic Dialogue',
      subtitle: 'Faculty Mentorship & Collaborative Inquiry',
      src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.19.54%20PM.jpeg',
      fallback: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.19.54%20PM.jpeg',
      caption: 'Dynamic peer exchanges, active faculty question-and-answer sessions, and interactive classroom learning fostering intellectual confidence.',
      tag: 'ACTIVE LEARNING',
    },
    {
      id: 'teacher-training-3',
      title: 'Teacher Training & Pedagogical Development',
      subtitle: 'Subject Delivery, Generational Mindset & Modern Pedagogy',
      src: 'https://ik.imagekit.io/Muffins/image%20(88).png?updatedAt=1792664809581',
      fallback: '/assets/campus/teacher-training-presentation.jpg',
      caption: 'Faculty development sessions where professors deliver presentations on subject methodologies, classroom pedagogy, and modern teaching techniques.',
      tag: 'TEACHER TRAINING',
    },
  ];

  const easeCurve = [0.22, 1, 0.36, 1] as const;

  return (
    <section 
      id="our-campus-section" 
      className="relative bg-white dark:bg-[#080f1d] py-20 sm:py-24 lg:py-28 border-b border-slate-200/80 dark:border-white/10 select-none transition-colors duration-200"
      aria-labelledby="about-campus-heading"
    >
      {/* Anchor alias for About navigation */}
      <div id="about-section" className="absolute -top-24" aria-hidden="true" />
      
      {/* Subtle architectural dot grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(#092242 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Framer Motion Mask Reveal */}
        <div className="w-full mb-0">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#a30f16] dark:text-amber-400">
              OUR CAMPUS · BAHAWALPUR
            </span>
            <span className="h-px w-8 bg-[#a30f16]/40 dark:bg-amber-400/40" aria-hidden="true" />
          </div>

          <div className="overflow-hidden">
            <motion.h2
              id="about-campus-heading"
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-semibold text-[#092242] dark:text-white tracking-tight leading-[1.18]"
              style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
            >
              An Environment Built for Growth & Academic Discovery
            </motion.h2>
          </div>

          <div className="mt-6 space-y-6 text-lg sm:text-[20px] lg:text-[21.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans w-full">
            <motion.p 
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.75, delay: 0.1, ease: easeCurve }}
              className="text-[19px] sm:text-[21px] lg:text-[22.5px] leading-relaxed text-slate-700 dark:text-slate-200"
            >
              <strong>UCP Bahawalpur Campus</strong>, also widely known as <strong>UCP BWP</strong> (Constituent College UCP Campus Bahawalpur), is the official collegiate campus of the <strong>University of Central Punjab Bahawalpur</strong>, located on Airport Road, Bahawalpur. As part of Pakistan's largest educational network—the Punjab Group of Colleges (PGC)—the campus empowers students across Southern Punjab to pursue prestigious, HEC-recognized undergraduate BS and Associate Degree (ADP) programs close to home, with world-class faculty, cutting-edge computing labs, and guaranteed merit scholarships.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.75, delay: 0.15, ease: easeCurve }}
              className="text-[17.5px] sm:text-[19.5px] lg:text-[21px] leading-relaxed text-slate-600 dark:text-slate-300"
            >
              Academic offerings at UCP Bahawalpur span market-driven four-year Bachelor of Science (BS) and two-year Associate Degree Programs (ADP). Disciplines include Computer Science, Artificial Intelligence, Software Engineering, Cyber Security, Data Science, BBA (Honors), Business Analytics, Accounting &amp; Finance, Biotechnology, Biochemistry, Chemistry, Physics, Mathematics, Zoology, English, and Psychology. All degree programs adhere to the centralized curriculum and academic evaluation standards set by UCP Lahore.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.75, delay: 0.2, ease: easeCurve }}
              className="text-[17.5px] sm:text-[19.5px] lg:text-[21px] leading-relaxed text-slate-600 dark:text-slate-300"
            >
              The purpose-built campus in Bahawalpur features advanced computing and robotics facilities, state-of-the-art natural science labs, an extensive digital library, air-conditioned lecture halls, dedicated student societies, and comprehensive fleet transport. Eligible students benefit from merit scholarships covering up to 50% tuition, 25% PGC alumni concessions, kinship discounts, and flexible semester fee installment plans.
            </motion.p>
          </div>
        </div>

        {/* =========================================================================
            WHY JOIN CONSTITUENT COLLEGE UCP CAMPUS BAHAWALPUR?
            Minimal & Professional Academic Layout
            ========================================================================= */}
        <div 
          className="w-full my-[60px] py-[60px] px-4 sm:px-10 lg:px-[80px]"
        >
          {/* 1. MAIN HEADING (Center aligned, 36px, bold 800, red color, scroll animated) */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-[50px]"
          >
            <h3 
              className="text-[26px] sm:text-[36px] font-[800] text-[#b01e23] dark:text-[#ef4444] uppercase tracking-[0.5px] leading-tight text-center max-w-4xl mx-auto"
              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
            >
              WHY JOIN CONSTITUENT COLLEGE UCP CAMPUS BAHAWALPUR?
            </h3>
            {/* Small red line: 70px width, 4px height, centered */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-[70px] h-[4px] bg-[#b01e23] dark:bg-[#ef4444] mx-auto mt-4 rounded-full origin-center" 
              aria-hidden="true" 
            />
          </motion.div>

          {/* 2. GRID: 2 columns (5 left, 4 right) center alignment, max-width 1100px, gap 18px */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] max-w-[1100px] mx-auto w-full">
            {/* Left Column (5 items) */}
            <div className="flex flex-col gap-[18px]">
              {WHY_JOIN_ITEMS.slice(0, 5).map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`left-${index}`}
                    className="group card-shine-sweep flex items-center min-h-[78px] px-[28px] py-[24px] bg-white dark:bg-[#0c1626] border border-[#f0f0f0] dark:border-white/10 border-l-[4px] border-l-transparent hover:border-l-[#b01e23] transition-all duration-300 cursor-pointer select-none rounded-lg shadow-xs"
                  >
                    {/* Left: 42px circular icon */}
                    <div className="w-[42px] h-[42px] rounded-full bg-[#f4f6fb] dark:bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#b01e23]/10">
                      <Icon size={19} className="text-[#092242] dark:text-slate-200 transition-colors duration-200 group-hover:text-[#b01e23]" />
                    </div>

                    {/* Font size 16px bold uppercase */}
                    <span 
                      className="ml-[20px] text-[15px] sm:text-[16px] font-bold uppercase text-[#092242] dark:text-white tracking-wide truncate transition-colors duration-200"
                      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
                    >
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Right Column (4 items) */}
            <div className="flex flex-col gap-[18px]">
              {WHY_JOIN_ITEMS.slice(5).map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`right-${index}`}
                    className="group card-shine-sweep flex items-center min-h-[78px] px-[28px] py-[24px] bg-white dark:bg-[#0c1626] border border-[#f0f0f0] dark:border-white/10 border-l-[4px] border-l-transparent hover:border-l-[#b01e23] transition-all duration-300 cursor-pointer select-none rounded-lg shadow-xs"
                  >
                    {/* Left: 42px circular icon */}
                    <div className="w-[42px] h-[42px] rounded-full bg-[#f4f6fb] dark:bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#b01e23]/10">
                      <Icon size={19} className="text-[#092242] dark:text-slate-200 transition-colors duration-200 group-hover:text-[#b01e23]" />
                    </div>

                    {/* Font size 16px bold uppercase */}
                    <span 
                      className="ml-[20px] text-[15px] sm:text-[16px] font-bold uppercase text-[#092242] dark:text-white tracking-wide truncate transition-colors duration-200"
                      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
                    >
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* =========================================================================
            2. ORIENTATION DAY & STUDENT BELONGING TRADITIONS
            Thumbprint Tree Tradition & "I am a UCPian" Photo Frame
            ========================================================================= */}
        <motion.div
          className="pt-10 sm:pt-14 mb-16 sm:mb-20 border-t border-slate-200/80 dark:border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeCurve }}
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Section Eyebrow & Title */}
          <div className="max-w-4xl mb-8">
            <div className="overflow-hidden">
              <motion.h3
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-[#092242] dark:text-white tracking-tight leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
              >
                Orientation Day at UCP Bahawalpur — The Beginning of Belonging
              </motion.h3>
            </div>
          </div>

          {/* Both Images Side-by-Side (Clean & Professional, No Overlay Text) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6 sm:mb-8">
            {orientationPhotos.map((item) => (
              <div
                key={item.id}
                className="w-full"
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-sm border border-slate-200/80 dark:border-white/10 transition-all duration-300">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center block"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.fallback;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Simple Neat Narrative Text — No Border or Box Behind Text */}
          <div className="w-full">
            <p className="text-slate-600 dark:text-slate-300 font-sans text-base sm:text-lg leading-relaxed text-justify">
              Orientation Day at UCP Bahawalpur is more than just a welcome, it's the beginning of belonging. It starts with a single thumbprint on our family tree, where every new student leaves a mark and becomes a leaf in our growing legacy. And it continues with a smile inside a frame, proudly declaring to the world, “I am a UCPian.” From a small impression that stays forever to a picture that gets shared everywhere, this is where your identity begins, your friendships form, and your journey as part of the UCP family truly takes root.
            </p>
          </div>
        </motion.div>

        {/* =========================================================================
            3. STUDENT CLASSROOM PRESENTATIONS & BEST STUDY ENVIRONMENT
            ========================================================================= */}
        <motion.div
          className="pt-6 border-t border-slate-200/80 dark:border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeCurve }}
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Subheading Block */}
          <div className="mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#a30f16] dark:text-amber-400 uppercase flex items-center gap-1.5">
                  <Presentation size={14} /> CLASSROOMS & TEACHING EXCELLENCE
                </span>
                <span className="h-3 w-px bg-slate-300 dark:bg-white/20" />
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  STUDENT & FACULTY SESSIONS
                </span>
              </div>
              <div className="overflow-hidden">
                <motion.h3 
                  initial={{ y: '100%', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl sm:text-3xl font-serif font-bold text-[#092242] dark:text-white tracking-tight"
                  style={{ fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif" }}
                >
                  Interactive Classrooms, Presentations &amp; Teacher Training
                </motion.h3>
              </div>
            </div>
          </div>

          {/* 3-Card Minimal Classroom & Student Sessions Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {classroomPhotos.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: easeCurve }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-transparent p-0 flex flex-col justify-between transition-all duration-300 group cursor-pointer border-0 shadow-none space-y-3"
                onClick={() => setActivePhoto(item)}
              >
                <div>
                  {/* Photo Frame */}
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 mb-3 shadow-xs border border-slate-200/80 dark:border-white/10">
                    <img src={item.src}
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
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 
                    className="text-lg font-serif font-bold text-[#092242] dark:text-white mb-1 group-hover:text-[#a30f16] dark:group-hover:text-amber-400 transition-colors"
                    style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide mb-2 line-clamp-1">
                    {item.subtitle}
                  </p>

                  {/* Caption */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed text-justify line-clamp-3">
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
                <img loading="lazy" decoding="async" src={activePhoto.src}
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
