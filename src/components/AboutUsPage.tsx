import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import ucpBwpBuilding5Local from '../assets/images/ucp_bwp_building_5.jpg';

interface AboutUsPageProps {
  onBackToHome: () => void;
  onOpenApply?: () => void;
  onOpenProgrammesPage?: () => void;
  onOpenFacilitiesPage?: () => void;
  onOpenCampusLifePage?: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onBackToHome,
  onOpenApply,
  onOpenProgrammesPage,
  onOpenFacilitiesPage,
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
          HEADER: Top sticky header, background color #B31B1B (UCP Cardinal Red),
          text white, logo "UCP Bahawalpur" left
      ======================================================================= */}
      <header className="sticky top-[58px] sm:top-[66px] z-20 bg-[#B31B1B] text-white py-3.5 px-4 sm:px-6 lg:px-12 border-b border-[#9E1818] shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo "UCP Bahawalpur" Left */}
          <div 
            onClick={onBackToHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <span 
              className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-xl sm:text-2xl font-normal text-white tracking-tight"
            >
              UCP Bahawalpur
            </span>
            <span className="hidden sm:inline-block text-xs uppercase tracking-[0.14em] text-white/80 font-sans border-l border-white/30 pl-3">
              Constituent College
            </span>
          </div>

          {/* Right Navigation Actions */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-sans">
            <button
              type="button"
              onClick={onBackToHome}
              className="text-white hover:text-white/80 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Portal Home</span>
            </button>
            {onOpenApply && (
              <button
                type="button"
                onClick={onOpenApply}
                className="bg-white text-[#B31B1B] hover:bg-white/95 px-3.5 py-1.5 rounded-full font-semibold uppercase tracking-[0.08em] text-[11px] transition-all cursor-pointer shadow-xs"
              >
                Apply Online
              </button>
            )}
          </div>
        </div>
      </header>

      {/* =======================================================================
          HERO SECTION:
          - White background #FFFFFF
          - Center aligned huge Serif heading: "About UCP Bahawalpur"
          - Font: Source Serif Pro / Times New Roman, weight 400, size 64px desktop, 42px mobile, letter-spacing -1px, color #000
          - Below heading, full-width big image 1400x700px with rounded corners 12px,
            with parallax scroll animation (image zooms slowly on scroll). Add subtle shadow.
      ======================================================================= */}
      <section className="bg-[#FFFFFF] pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 text-center">
        <div className="max-w-7xl mx-auto">
          {/* Center Aligned Huge Serif Heading */}
          <h1 
            className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] font-normal text-[42px] sm:text-[54px] lg:text-[64px] leading-[1.08] tracking-[-1px] text-[#000000] max-w-4xl mx-auto mb-10 sm:mb-14"
          >
            About UCP Bahawalpur
          </h1>

          {/* Full-width Big Image 1400x700px with Rounded Corners 12px & Parallax Zoom */}
          <div className="relative w-full max-w-[1400px] mx-auto rounded-[12px] overflow-hidden shadow-md border border-[#EAEAEA] bg-slate-100 aspect-[16/9] sm:aspect-[2/1] max-h-[700px]">
            <img
              src={ucpBwpBuilding5Local}
              alt="University of Central Punjab Bahawalpur Campus Main Building"
              style={{
                transform: `scale(${1 + Math.min(scrollY * 0.00035, 0.12)})`,
                transition: 'transform 0.15s ease-out',
              }}
              className="w-full h-full object-cover object-center will-change-transform"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/campus/hero_campus_night_flagship.webp';
              }}
            />
          </div>
        </div>
      </section>

      {/* =======================================================================
          INTRO PARAGRAPH (Below big image, centered):
          - Title: "The Spirit of the South Punjab" - Serif 36px
          - Paragraph text centered max-width 700px, sans-serif 18px line-height 1.7 color #333, professional academic tone.
          - Current UCP Bahawalpur intro text
      ======================================================================= */}
      <section className="bg-[#FFFFFF] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#EAEAEA]">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] font-normal text-[30px] sm:text-[36px] text-[#000000] tracking-tight leading-tight">
            The Spirit of the South Punjab
          </h2>

          <p className="font-sans text-[18px] sm:text-[19px] leading-[1.7] text-[#333333] font-normal max-w-[700px] mx-auto">
            Bringing Lahore’s premier chartered university education directly to Bahawalpur. Established as an official Constituent College on Airport Road, the University of Central Punjab Bahawalpur exists so that no young visionary ever has to leave their home, family, or city to access world-class higher education, advanced research laboratories, and limitless career horizons.
          </p>

          <p className="font-sans text-[16px] sm:text-[17px] leading-[1.7] text-[#53565A] font-normal max-w-[680px] mx-auto">
            Under the educational legacy of the Punjab Group of Colleges, our institution unites academic rigor with regional opportunity, providing over 25 chartered BS and ADP degree programs led by distinguished faculty committed to student mentorship and ethical leadership.
          </p>
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
                <p className="font-sans text-[18px] lg:text-[19px] leading-[1.8] text-[#2D2D2D] font-normal max-w-[600px] text-left">
                  The vision and leadership behind the University of Central Punjab&apos;s transformative journey is guided by esteemed academic statesmen and educational pioneers. Under their dynamic stewardship, UCP Bahawalpur upholds uncompromised academic standards, transformative student mentorship, and visionary institutional expansion across Southern Punjab.
                </p>
                <p className="font-sans text-[16px] lg:text-[17px] leading-[1.8] text-[#53565A] font-normal max-w-[600px] text-left">
                  Their steadfast dedication ensures that our academic faculties, scientific laboratories, and community partnerships provide students with the critical thinking, adaptability, and ethical conviction needed to lead in a changing nation.
                </p>
              </motion.div>

              {/* Clean Grid of Leaders with Minimal Small Name on Image at Bottom */}
              <div id="leadership-grid-stanford" className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 pt-6 border-t border-[#EAEAEA] items-start">
                
                {/* Leader 1: Mian Amer Mahmood */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group text-left"
                >
                  <div className="relative w-full max-w-[130px] aspect-[3/4] bg-[#F5F5F5] rounded-[6px] overflow-hidden border border-[#EAEAEA] shadow-2xs">
                    <img
                      src="https://ik.imagekit.io/Muffins/image%20-%202026-10-23T213740.120.png"
                      alt="Mian Amer Mahmood"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/welcome/mian-amer-mahmood.png';
                      }}
                    />
                    {/* Name minimal small on image at bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 bg-gradient-to-t from-black/90 via-black/55 to-transparent text-white pointer-events-none">
                      <div className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[11.5px] sm:text-[12.5px] font-medium leading-tight text-white tracking-tight">
                        Mian Amer Mahmood
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.06em] text-white/85 font-sans leading-tight mt-0.5 truncate">
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
                  <div className="relative w-full max-w-[130px] aspect-[3/4] bg-[#F5F5F5] rounded-[6px] overflow-hidden border border-[#EAEAEA] shadow-2xs">
                    <img
                      src="https://ik.imagekit.io/Muffins/image%20-%202026-10-23T213323.406.png"
                      alt="Prof. Sohail Afzal"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/leadership/sohail_afzal_user_selected_3_4.jpg';
                      }}
                    />
                    {/* Name minimal small on image at bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 bg-gradient-to-t from-black/90 via-black/55 to-transparent text-white pointer-events-none">
                      <div className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[11.5px] sm:text-[12.5px] font-medium leading-tight text-white tracking-tight">
                        Prof. Sohail Afzal
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.06em] text-white/85 font-sans leading-tight mt-0.5 truncate">
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
                  <div className="relative w-full max-w-[130px] aspect-[3/4] bg-[#F5F5F5] rounded-[6px] overflow-hidden border border-[#EAEAEA] shadow-2xs">
                    <img
                      src="https://ik.imagekit.io/Muffins/image%20-%202026-10-23T154255.281.png"
                      alt="Prof. Hamid Iqbal"
                      className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/leadership/prof_hamid_iqbal_director.png';
                      }}
                    />
                    {/* Name minimal small on image at bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 bg-gradient-to-t from-black/90 via-black/55 to-transparent text-white pointer-events-none">
                      <div className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[11.5px] sm:text-[12.5px] font-medium leading-tight text-white tracking-tight">
                        Prof. Hamid Iqbal
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.06em] text-white/85 font-sans leading-tight mt-0.5 truncate">
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
                  <div className="relative w-full max-w-[130px] aspect-[3/4] bg-[#F5F5F5] rounded-[6px] overflow-hidden border border-[#EAEAEA] shadow-2xs">
                    <img
                      src="https://ik.imagekit.io/Muffins/image%20-%202026-10-23T154101.204.png"
                      alt="Prof. Dr. Aurangzaib Virk"
                      className="w-full h-full object-cover object-[center_14%] group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/campus/prof_aurangzaib_virk.png';
                      }}
                    />
                    {/* Name minimal small on image at bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 bg-gradient-to-t from-black/90 via-black/55 to-transparent text-white pointer-events-none">
                      <div className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-[11.5px] sm:text-[12.5px] font-medium leading-tight text-white tracking-tight">
                        Prof. Dr. Aurangzaib Virk
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.06em] text-white/85 font-sans leading-tight mt-0.5 truncate">
                        Principal, UCP
                      </div>
                    </div>
                  </div>
                </motion.div>

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
                  <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-xl font-normal text-[#000000] mb-2">
                    Our Vision
                  </h3>
                  <p className="font-sans text-[18px] lg:text-[19px] leading-[1.8] text-[#2D2D2D] font-normal max-w-[600px] text-left">
                    To be recognized as a premier institution of higher learning that inspires transformative education, pioneering research, technological innovation, and ethical leadership to serve the nation and global society.
                  </p>
                </div>

                <div className="pt-2">
                  <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-xl font-normal text-[#000000] mb-2">
                    Our Mission
                  </h3>
                  <p className="font-sans text-[18px] lg:text-[19px] leading-[1.8] text-[#2D2D2D] font-normal max-w-[600px] text-left">
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

            {/* Right Column: Scrolling text + big image 600x400px */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <p className="font-sans text-[18px] lg:text-[19px] leading-[1.8] text-[#2D2D2D] font-normal max-w-[600px] text-left">
                  At UCP Bahawalpur, every academic curriculum, laboratory investigation, and student initiative is anchored in six foundational values that govern our community:
                </p>

                <div className="space-y-5 text-left max-w-[600px]">
                  <div>
                    <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-base font-normal text-[#000000]">
                      Academic Rigor &amp; Inquiry
                    </h4>
                    <p className="font-sans text-[15px] lg:text-[16px] leading-[1.7] text-[#53565A] mt-1">
                      Pursuing excellence in curriculum depth, scientific problem-solving, and continuous inquiry aligned with global benchmarks.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-base font-normal text-[#000000]">
                      Ethical Integrity &amp; Honor
                    </h4>
                    <p className="font-sans text-[15px] lg:text-[16px] leading-[1.7] text-[#53565A] mt-1">
                      Cultivating absolute honesty, personal accountability, and moral courage across all scholarly and professional endeavors.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-base font-normal text-[#000000]">
                      Student-Centric Care
                    </h4>
                    <p className="font-sans text-[15px] lg:text-[16px] leading-[1.7] text-[#53565A] mt-1">
                      Nurturing every learner through empathetic faculty mentorship, academic guidance, mental wellness, and career enablement.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-base font-normal text-[#000000]">
                      Innovation &amp; Future Readiness
                    </h4>
                    <p className="font-sans text-[15px] lg:text-[16px] leading-[1.7] text-[#53565A] mt-1">
                      Equipping graduates with advanced computational intelligence, adaptive problem-solving, and professional dexterity.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-base font-normal text-[#000000]">
                      Civic &amp; Regional Impact
                    </h4>
                    <p className="font-sans text-[15px] lg:text-[16px] leading-[1.7] text-[#53565A] mt-1">
                      Actively uplifting Southern Punjab through community service, cultural preservation, and sustainable industrial partnerships.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-base font-normal text-[#000000]">
                      Meritocracy &amp; Inclusion
                    </h4>
                    <p className="font-sans text-[15px] lg:text-[16px] leading-[1.7] text-[#53565A] mt-1">
                      Opening doors of opportunity to deserving talent across all backgrounds with transparent merit scholarships and equal access.
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
          <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#B31B1B] font-semibold block">
            Constituent College · Airport Road Bahawalpur
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
