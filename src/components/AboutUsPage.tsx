import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import ucpBwpBuilding5Local from '../assets/images/ucp_bwp_building_5.jpg';

interface AboutUsPageProps {
  onBackToHome: () => void;
  onOpenApply?: () => void;
  onOpenProgrammesPage?: () => void;
  onOpenFacilitiesPage?: () => void;
  onOpenCampusLifePage?: () => void;
  onOpenLegacyPage?: () => void;
  onOpenFacultyPage?: () => void;
}

// Fast ease-out number counter animated on scroll
const AnimatedCounter: React.FC<{
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}> = ({ target, suffix = '', prefix = '', decimals = 0, duration = 1.0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      // Fast easeOutQuart curve
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(ease * target);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
      {suffix}
    </span>
  );
};

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onBackToHome,
  onOpenApply,
  onOpenProgrammesPage,
  onOpenFacilitiesPage,
  onOpenCampusLifePage,
  onOpenLegacyPage,
  onOpenFacultyPage,
}) => {
  const [scrollY, setScrollY] = useState(0);
  // Ensure view starts at the absolute top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#000000] font-sans antialiased selection:bg-[#B31B1B] selection:text-white">
      {/* =======================================================================
          HERO SECTION:
          - White background #FFFFFF
          - Center aligned huge Serif heading: "About UCP Bahawalpur"
          - Full-width big image with rounded corners 12px & parallax scroll animation
          - User requested flagship image: https://ik.imagekit.io/Muffins/image%20-%202026-10-24T122141.678.png
      ======================================================================= */}
      <section className="bg-[#FFFFFF] pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 text-center">
        <div className="max-w-7xl mx-auto">
          {/* Center Aligned Huge Serif Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold bg-[#092242]/10 text-[#092242] border border-[#092242]/20 mb-3 font-sans">
              University of Central Punjab · Bahawalpur
            </span>
            <h1 
              className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] font-normal text-[44px] sm:text-[56px] lg:text-[68px] leading-[1.05] tracking-[-1.5px] text-[#000000] max-w-4xl mx-auto mb-4 sm:mb-5"
            >
              About UCP Bahawalpur
            </h1>
            <p className="font-sans text-[18px] sm:text-[21px] text-[#4A4D52] font-normal max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              A premier chartered institution uniting world-class academic rigor, state-of-the-art scientific infrastructure, and transformative mentorship in Southern Punjab.
            </p>
          </motion.div>

          {/* Full-width Big Image with Rounded Corners 14px & Parallax Zoom & Scroll Reveal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[1400px] mx-auto rounded-[14px] overflow-hidden shadow-2xl border border-[#EAEAEA] bg-slate-900 aspect-[16/9] sm:aspect-[2/1] max-h-[720px] group"
          >
            <img
              src="https://ik.imagekit.io/Muffins/image%20-%202026-10-24T122141.678.png"
              alt="University of Central Punjab Bahawalpur Campus Flagship View"
              style={{
                transform: `scale(${1 + Math.min(scrollY * 0.00035, 0.12)})`,
                transition: 'transform 0.15s ease-out',
              }}
              className="w-full h-full object-cover object-center will-change-transform group-hover:scale-102 transition-transform duration-700"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/campus/hero_campus_night_flagship.webp';
              }}
            />
            {/* Elegant vignette and subtle corner caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 text-left text-white pointer-events-none drop-shadow-md">
              <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-sans text-white/90 font-semibold">
                Official Constituent College Campus
              </div>
              <div className="font-['Source_Serif_4','Source_Serif_Pro',serif] text-base sm:text-xl font-normal text-white">
                University of Central Punjab · Airport Road, Bahawalpur
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =======================================================================
          INTRO SECTION (Stanford Academic Style):
      {/* =======================================================================
          INTRO SECTION (Stanford Academic Style):
          - Title: "The Spirit of the South Punjab" - Bold Serif 54px with rich navy blue accent
          - Frameless text headers: "Collegiate Vision" and "The Founding Resolution"
          - Center Red Button: "Our Legacy" -> connects to Our Legacy section
          - Stanford Story: "A Promise Kept to the Sons & Daughters of Southern Punjab"
          - Big font size (22-26px), high-contrast readability, blue highlighting
          - Upward scroll animations for all text blocks
          - Stanford 4-Metric Milestones Grid with fast animated counter from 0
      ======================================================================= */}
      <section className="bg-[#FFFFFF] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 border-b border-[#EAEAEA]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            {/* Clean text without frame */}
            <span className="text-xs uppercase tracking-[0.24em] text-[#B31B1B] font-bold font-sans block mb-2">
              Collegiate Vision · Southern Punjab
            </span>

            {/* Highlighted and Bold Heading */}
            <h2 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] font-bold text-[38px] sm:text-[48px] lg:text-[56px] text-[#092242] tracking-tight leading-tight">
              The Spirit of the South Punjab
            </h2>
            <div className="w-24 h-1.5 bg-[#B31B1B] mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[22px] sm:text-[24px] lg:text-[25px] leading-[1.8] text-[#1A1A1A] font-normal max-w-4xl mx-auto"
          >
            Bringing Lahore’s premier chartered university education directly to Bahawalpur. Established as an official Constituent College, the University of Central Punjab Bahawalpur exists so that no young visionary in Southern Punjab ever has to leave their home, aging parents, or ancestral soil to access world-class higher education, advanced scientific research laboratories, and limitless career horizons.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[20px] sm:text-[22px] leading-[1.85] text-[#333333] font-normal max-w-4xl mx-auto pt-1"
          >
            From cutting-edge Artificial Intelligence, Data Science, and Software Engineering to Business Analytics, Clinical Psychology, Media Studies, and Biotechnology, UCP Bahawalpur bridges four decades of educational heritage with the forward-looking innovation of a world-ranked modern university.
          </motion.p>

          {/* Center Red Button connecting to Our Legacy */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 pb-6 flex justify-center"
          >
            <button
              type="button"
              onClick={onOpenLegacyPage || onBackToHome}
              className="bg-[#B31B1B] hover:bg-[#8C1515] text-white rounded-full px-8 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[1.5px] font-sans transition-all cursor-pointer shadow-md hover:shadow-lg inline-flex items-center gap-2 group"
            >
              <span>Our Legacy</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Stanford-Style Feature Narrative: A Promise Kept */}
          <div className="text-left pt-10 sm:pt-14 space-y-8 border-t border-[#EAEAEA]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center pb-3"
            >
              {/* Clean text without blue border/frame */}
              <span className="text-xs uppercase tracking-[0.24em] text-[#B31B1B] font-bold font-sans block mb-2">
                The Founding Resolution
              </span>
              <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#092242] leading-snug tracking-tight">
                A Promise Kept to the Sons &amp; Daughters of Southern Punjab
              </h3>
              <div className="w-20 h-1 bg-[#B31B1B] mx-auto mt-3.5 rounded-full" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[21px] sm:text-[23px] leading-[1.85] text-[#1F1F1F] font-normal"
            >
              For decades, the historic city of Bahawalpur and the surrounding fertile belt of Southern Punjab produced brilliant, hard-working students with unmatched dreams. Yet, when the time came for university education, young boys and girls faced a painful barrier: packing their bags, leaving their aging parents and ancestral homes, and migrating hundreds of miles to Lahore or Islamabad at immense emotional and financial burden.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[21px] sm:text-[23px] leading-[1.85] text-[#1F1F1F] font-normal"
            >
              Countless brilliant girls were held back by distance and safety concerns, while countless families stretched their life savings to finance hostel life in distant cities. In response to this deeply felt human need, the leadership of Punjab Group of Colleges (PGC) and the University of Central Punjab (UCP) made an unbreakable resolution:
            </motion.p>

            {/* Stanford Editorial Quote Callout with Dual UCP Red & Navy Blue Accent */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="my-8 pl-6 sm:pl-8 border-l-[6px] border-[#B31B1B] bg-gradient-to-r from-red-50/80 via-blue-50/30 to-transparent py-6 sm:py-7 rounded-r-2xl border-y border-r border-slate-200/50 shadow-xs"
            >
              <p className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[23px] sm:text-[27px] lg:text-[29px] leading-[1.6] text-[#092242] font-semibold italic">
                “The children of Bahawalpur deserve the exact same premier degree, the exact same distinguished faculty, and the exact same cutting-edge laboratories as those in Lahore — right here on their own soil.”
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[21px] sm:text-[23px] leading-[1.85] text-[#1F1F1F] font-normal"
            >
              Established as an official Constituent College, UCP Bahawalpur emerged not merely as a campus of bricks and mortar, but as a living monument of empowerment. Today, over 25 chartered BS and ADP degree programs in Computer Science, Artificial Intelligence, Business Administration, Media, Psychology, and Life Sciences are delivered with uncompromising academic rigor.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[21px] sm:text-[23px] leading-[1.85] text-[#1F1F1F] font-normal"
            >
              Under Punjab Group’s nationwide pledge, over <span className="text-[#B31B1B] font-bold">Rs. 1.3 Billion</span> in merit scholarships and tuition concessions has been disbursed, ensuring that financial limitations never obstruct a deserving student’s pathway to a world-class degree.
            </motion.p>

            {/* Stanford Metric Milestones Grid with Fast Counting Numbers (Animated on Scroll from 0) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-12 sm:pt-14 border-t border-[#EAEAEA] mt-10 text-center sm:text-left"
            >
              <div className="space-y-1.5 p-3.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                <div className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#B31B1B]">
                  <AnimatedCounter target={25} suffix="+" duration={0.9} />
                </div>
                <div className="font-sans text-xs sm:text-[13px] uppercase tracking-[0.1em] font-bold text-[#092242]">
                  HEC Accredited Degrees
                </div>
                <p className="font-sans text-[13px] text-slate-500 leading-normal">
                  Chartered BS &amp; ADP Programs
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                <div className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#092242]">
                  <AnimatedCounter target={1.3} suffix="B+" decimals={1} duration={0.9} />
                </div>
                <div className="font-sans text-xs sm:text-[13px] uppercase tracking-[0.1em] font-bold text-[#092242]">
                  PKR in Scholarships
                </div>
                <p className="font-sans text-[13px] text-slate-500 leading-normal">
                  Merit &amp; Need-Based Concessions
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                <div className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#B31B1B]">
                  <AnimatedCounter target={2} suffix="M+" duration={0.9} />
                </div>
                <div className="font-sans text-xs sm:text-[13px] uppercase tracking-[0.1em] font-bold text-[#092242]">
                  Alumni Network
                </div>
                <p className="font-sans text-[13px] text-slate-500 leading-normal">
                  PGC &amp; UCP Global Professionals
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                <div className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#092242]">
                  <AnimatedCounter target={40} suffix="+" duration={0.9} />
                </div>
                <div className="font-sans text-xs sm:text-[13px] uppercase tracking-[0.1em] font-bold text-[#092242]">
                  Years Educational Legacy
                </div>
                <p className="font-sans text-[13px] text-slate-500 leading-normal">
                  Punjab Group of Colleges Heritage
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          SECTION 1: OUR GUIDING FORCE (Stanford Split 50/50 Layout)
          - Left Column: Sticky top 150px
              - H2: Big Serif heading 32px
              - Small red pill button "Meet Our Leaders" (#B31B1B, white text, rounded-full, 11px uppercase tracking 1px)
          - Right Column:
              - P: Large sans-serif text 19px, line-height 1.8, color #2D2D2D, font-weight 400, max-width 600px
              - Clean grid of leader images + name + designation below (no card shadow, just image + text like Stanford)
      ======================================================================= */}
      <section className="bg-[#FFFFFF] py-20 lg:py-[120px] px-6 lg:px-12 border-b border-[#EAEAEA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Sticky top 150px */}
            <div className="lg:col-span-5 lg:sticky lg:top-[150px] space-y-5">
              <h2 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[28px] sm:text-[32px] font-normal text-[#000000] leading-snug tracking-tight">
                Our Guiding Force
              </h2>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('leadership-grid-stanford');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#B31B1B] hover:bg-[#8C1515] text-white rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[1px] font-sans transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Meet Our Leaders</span>
                  <span className="text-xs">↓</span>
                </button>
              </div>
            </div>

            {/* Right Column: Scrolling text + clean grid of leaders */}
            <div className="lg:col-span-7 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                <p className="font-sans text-[20px] sm:text-[21px] leading-[1.8] text-[#1F1F1F] font-normal max-w-[620px] text-left">
                  The vision and leadership behind the University of Central Punjab&apos;s transformative journey is guided by esteemed academic statesmen and educational pioneers. Under their dynamic stewardship, UCP Bahawalpur upholds uncompromised academic standards, transformative student mentorship, and visionary institutional expansion across Southern Punjab.
                </p>
                <p className="font-sans text-[18px] sm:text-[19px] leading-[1.8] text-[#4A4D52] font-normal max-w-[620px] text-left">
                  Their steadfast dedication ensures that our academic faculties, scientific laboratories, and community partnerships provide students with the critical thinking, adaptability, and ethical conviction needed to lead in a changing nation.
                </p>
              </motion.div>

              {/* Clean Grid of Leaders with Larger Images and Minimal Small Name on Image at Bottom */}
              <div id="leadership-grid-stanford" className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 pt-6 border-t border-[#EAEAEA] items-start">
                
                {/* Leader 1: Mian Amer Mahmood */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group text-left"
                >
                  <div className="relative w-full max-w-[195px] sm:max-w-[215px] aspect-[3/4] bg-[#F5F5F5] rounded-[8px] overflow-hidden border border-[#EAEAEA] shadow-sm hover:shadow-md transition-all duration-300">
                    <img
                      src="https://ik.imagekit.io/Muffins/image%20-%202026-10-23T213740.120.png"
                      alt="Mian Amer Mahmood"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-104 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/welcome/mian-amer-mahmood.png';
                      }}
                    />
                    {/* Name minimal small on image at bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white pointer-events-none">
                      <div className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[12.5px] sm:text-[14px] font-medium leading-tight text-white tracking-tight">
                        Mian Amer Mahmood
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.06em] text-white/85 font-sans leading-tight mt-0.5 truncate">
                        Chairman, UCP
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Leader 2: Prof. Sohail Afzal */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group text-left"
                >
                  <div className="relative w-full max-w-[195px] sm:max-w-[215px] aspect-[3/4] bg-[#F5F5F5] rounded-[8px] overflow-hidden border border-[#EAEAEA] shadow-sm hover:shadow-md transition-all duration-300">
                    <img
                      src="https://ik.imagekit.io/Muffins/image%20-%202026-10-24T140135.933.png"
                      alt="Prof. Sohail Afzal"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-104 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://ik.imagekit.io/Muffins/image%20-%202026-10-24T140135.933.png';
                      }}
                    />
                    {/* Name minimal small on image at bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white pointer-events-none">
                      <div className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[12.5px] sm:text-[14px] font-medium leading-tight text-white tracking-tight">
                        Prof. Sohail Afzal
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.06em] text-white/85 font-sans leading-tight mt-0.5 truncate">
                        Executive Director
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Leader 3: Prof. Hamid Iqbal */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group text-left"
                >
                  <div className="relative w-full max-w-[195px] sm:max-w-[215px] aspect-[3/4] bg-[#F5F5F5] rounded-[8px] overflow-hidden border border-[#EAEAEA] shadow-sm hover:shadow-md transition-all duration-300">
                    <img
                      src="https://ik.imagekit.io/Muffins/image%20-%202026-10-23T154255.281.png"
                      alt="Prof. Hamid Iqbal"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-104 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/leadership/prof_hamid_iqbal_director.png';
                      }}
                    />
                    {/* Name minimal small on image at bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white pointer-events-none">
                      <div className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[12.5px] sm:text-[14px] font-medium leading-tight text-white tracking-tight">
                        Prof. Hamid Iqbal
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.06em] text-white/85 font-sans leading-tight mt-0.5 truncate">
                        Director, PGC &amp; UCP
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Leader 4: Prof. Dr. Aurangzaib Virk */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group text-left"
                >
                  <div className="relative w-full max-w-[195px] sm:max-w-[215px] aspect-[3/4] bg-[#F5F5F5] rounded-[8px] overflow-hidden border border-[#EAEAEA] shadow-sm hover:shadow-md transition-all duration-300">
                    <img
                      src="https://ik.imagekit.io/Muffins/image%20-%202026-10-23T154101.204.png"
                      alt="Prof. Dr. Aurangzaib Virk"
                      className="w-full h-full object-cover object-[center_14%] group-hover:scale-104 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/campus/prof_aurangzaib_virk.png';
                      }}
                    />
                    {/* Name minimal small on image at bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white pointer-events-none">
                      <div className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[12.5px] sm:text-[14px] font-medium leading-tight text-white tracking-tight">
                        Prof. Dr. Aurangzaib Virk
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.06em] text-white/85 font-sans leading-tight mt-0.5 truncate">
                        Principal, UCP
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Minimal "Our Faculty" link button at end of leadership */}
              <div className="pt-8 flex items-center justify-start gap-4">
                <button
                  type="button"
                  onClick={onOpenFacultyPage}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#092242] text-[#092242] hover:bg-[#092242] hover:text-white transition-all text-xs font-semibold uppercase tracking-[0.12em] font-sans cursor-pointer group shadow-2xs"
                >
                  <span>Our Faculty Directory</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =======================================================================
          SECTION 2: OUR VISION & MISSION (Stanford Split 50/50 Layout)
          - Left Column: Sticky top 150px
              - H2: "Vision and Mission that drives us"
              - Small red pill button
          - Right Column:
              - P: Large sans-serif text 19px, line-height 1.8, color #2D2D2D, font-weight 400
              - Below text: Big image 600x400px rounded 8px with scroll reveal animation
      ======================================================================= */}
      <section className="bg-[#FFFFFF] py-20 lg:py-[120px] px-6 lg:px-12 border-b border-[#EAEAEA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Sticky top 150px */}
            <div className="lg:col-span-5 lg:sticky lg:top-[150px] space-y-5">
              <h2 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[28px] sm:text-[32px] font-normal text-[#000000] leading-snug tracking-tight">
                Vision and Mission that drives us
              </h2>
              <div>
                <button
                  type="button"
                  onClick={onOpenProgrammesPage}
                  className="bg-[#B31B1B] hover:bg-[#8C1515] text-white rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[1px] font-sans transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Academic Programs</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Right Column: Scrolling text + big image 600x400px */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-2xl font-normal text-[#000000] mb-2.5">
                    Our Vision
                  </h3>
                  <p className="font-sans text-[20px] sm:text-[21px] leading-[1.8] text-[#1F1F1F] font-normal max-w-[620px] text-left">
                    To be recognized as a premier institution of higher learning that inspires transformative education, pioneering research, technological innovation, and ethical leadership to serve the nation and global society.
                  </p>
                </div>

                <div className="pt-2">
                  <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-2xl font-normal text-[#000000] mb-2.5">
                    Our Mission
                  </h3>
                  <p className="font-sans text-[20px] sm:text-[21px] leading-[1.8] text-[#1F1F1F] font-normal max-w-[620px] text-left">
                    Empowering students through academic rigor, industry linkages, state-of-the-art facilities, and holistic character building to produce agile, ethical leaders of tomorrow. We bridge fundamental foundational theory with contemporary technological applications, ensuring that every graduate possesses both intellectual depth and practical capability.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* =======================================================================
          SECTION 3: CORE VALUES (Stanford Split 50/50 Layout)
          - Left Column: Sticky top 150px
              - H2: "Core values that define us"
              - Small red pill button
          - Right Column:
              - P: Large sans-serif text 19px, line-height 1.8, color #2D2D2D, font-weight 400
              - Below text: Big image 600x400px rounded 8px with scroll reveal animation
      ======================================================================= */}
      <section className="bg-[#FFFFFF] py-20 lg:py-[120px] px-6 lg:px-12 border-b border-[#EAEAEA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Sticky top 150px */}
            <div className="lg:col-span-5 lg:sticky lg:top-[150px] space-y-5">
              <h2 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[28px] sm:text-[32px] font-normal text-[#000000] leading-snug tracking-tight">
                Core values that define us
              </h2>
              <div>
                <button
                  type="button"
                  onClick={onOpenFacilitiesPage}
                  className="bg-[#B31B1B] hover:bg-[#8C1515] text-white rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[1px] font-sans transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Campus Life &amp; Facilities</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Right Column: Scrolling Core Values with Big Typography & High-Priority Red Accents */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <p className="font-sans text-[20px] sm:text-[22px] leading-[1.8] text-[#1F1F1F] font-normal max-w-[650px] text-left">
                  At UCP Bahawalpur, every academic curriculum, scientific inquiry, and student mentorship initiative is anchored in six foundational core values:
                </p>

                <div className="space-y-8 text-left max-w-[650px]">
                  {/* 1. Integrity */}
                  <div className="border-l-[4px] border-[#B31B1B] pl-5 sm:pl-6 py-1 bg-gradient-to-r from-red-50/40 to-transparent">
                    <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[22px] sm:text-[25px] font-bold text-[#000000] tracking-tight">
                      Integrity
                    </h4>
                    <p className="font-sans text-[19px] sm:text-[20px] leading-[1.7] text-[#2D2D2D] mt-1.5 font-normal">
                      We put honesty and ethical responsibility at the core of everything we do.
                    </p>
                  </div>

                  {/* 2. Respect */}
                  <div className="border-l-[4px] border-[#B31B1B] pl-5 sm:pl-6 py-1 bg-gradient-to-r from-red-50/40 to-transparent">
                    <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[22px] sm:text-[25px] font-bold text-[#000000] tracking-tight">
                      Respect
                    </h4>
                    <p className="font-sans text-[19px] sm:text-[20px] leading-[1.7] text-[#2D2D2D] mt-1.5 font-normal">
                      We treat everyone with dignity and value the wisdom and expertise of the people that surround us.
                    </p>
                  </div>

                  {/* 3. Tolerance */}
                  <div className="border-l-[4px] border-[#B31B1B] pl-5 sm:pl-6 py-1 bg-gradient-to-r from-red-50/40 to-transparent">
                    <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[22px] sm:text-[25px] font-bold text-[#000000] tracking-tight">
                      Tolerance
                    </h4>
                    <p className="font-sans text-[19px] sm:text-[20px] leading-[1.7] text-[#2D2D2D] mt-1.5 font-normal">
                      We accept the existence of different views, ideas, and people even if we may disagree with them.
                    </p>
                  </div>

                  {/* 4. Commitment */}
                  <div className="border-l-[4px] border-[#B31B1B] pl-5 sm:pl-6 py-1 bg-gradient-to-r from-red-50/40 to-transparent">
                    <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[22px] sm:text-[25px] font-bold text-[#000000] tracking-tight">
                      Commitment
                    </h4>
                    <p className="font-sans text-[19px] sm:text-[20px] leading-[1.7] text-[#2D2D2D] mt-1.5 font-normal">
                      We are passionate and determined to work hard in order to achieve our goals.
                    </p>
                  </div>

                  {/* 5. Service */}
                  <div className="border-l-[4px] border-[#B31B1B] pl-5 sm:pl-6 py-1 bg-gradient-to-r from-red-50/40 to-transparent">
                    <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[22px] sm:text-[25px] font-bold text-[#000000] tracking-tight">
                      Service
                    </h4>
                    <p className="font-sans text-[19px] sm:text-[20px] leading-[1.7] text-[#2D2D2D] mt-1.5 font-normal">
                      We believe in helping our community and working together to empower each other.
                    </p>
                  </div>

                  {/* 6. Creativity */}
                  <div className="border-l-[4px] border-[#B31B1B] pl-5 sm:pl-6 py-1 bg-gradient-to-r from-red-50/40 to-transparent">
                    <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[22px] sm:text-[25px] font-bold text-[#000000] tracking-tight">
                      Creativity
                    </h4>
                    <p className="font-sans text-[19px] sm:text-[20px] leading-[1.7] text-[#2D2D2D] mt-1.5 font-normal">
                      We celebrate innovation and encourage new ways to think.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* =======================================================================
          CLOSING SECTION: Academic Signature & Action Links
      ======================================================================= */}
      <section className="bg-[#FFFFFF] py-16 sm:py-20 lg:py-24 px-6 lg:px-12 border-t border-[#EAEAEA]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[12px] font-sans uppercase tracking-[0.2em] text-[#B31B1B] font-bold block">
            Constituent College · Bahawalpur
          </span>
          <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-2xl sm:text-3xl font-normal text-[#000000]">
            Begin Your Academic Journey at UCP Bahawalpur
          </h3>
          <p className="font-sans text-[16px] leading-[1.8] text-[#53565A] max-w-xl mx-auto">
            Discover accredited degree programs in Computer Science, Business, Media, Life Sciences, and Social Sciences backed by generous scholarships.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {onOpenApply && (
              <button
                type="button"
                onClick={onOpenApply}
                className="bg-[#B31B1B] hover:bg-[#8C1515] text-white rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] font-sans transition-colors cursor-pointer shadow-xs"
              >
                Apply Online
              </button>
            )}
            {onOpenProgrammesPage && (
              <button
                type="button"
                onClick={onOpenProgrammesPage}
                className="bg-transparent hover:bg-slate-50 text-[#000000] border border-[#CCCCCC] rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] font-sans transition-colors cursor-pointer"
              >
                View Programmes
              </button>
            )}
            {onOpenFacultyPage && (
              <button
                type="button"
                onClick={onOpenFacultyPage}
                className="bg-transparent hover:bg-slate-50 text-[#092242] border border-[#092242]/30 rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] font-sans transition-colors cursor-pointer"
              >
                Our Faculty
              </button>
            )}
            <button
              type="button"
              onClick={onBackToHome}
              className="text-[#53565A] hover:text-[#000000] px-4 py-2 text-xs font-medium font-sans transition-colors cursor-pointer"
            >
              ← Back to Portal Home
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
