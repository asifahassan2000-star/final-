import React, { useEffect } from 'react';
import { 
  ArrowLeft, Compass, Award, ShieldCheck, GraduationCap, 
  Building2, Users, Sparkles, CheckCircle2, BookOpen, 
  MapPin, Globe, ExternalLink, ArrowRight, HeartHandshake,
  Lightbulb, Target, Landmark
} from 'lucide-react';
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
  onOpenCampusLifePage,
}) => {
  // Ensure view starts at the absolute top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#071322] text-[#1E293B] dark:text-[#f8fafc] font-sans transition-colors duration-200">
      
      {/* 1. Official Top Institutional Breadcrumb Strip */}
      <div className="bg-white dark:bg-[#09182b] border-b border-slate-200 dark:border-white/10 py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono">
            <button 
              onClick={onBackToHome}
              className="hover:text-[#0A1931] dark:hover:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portal Home</span>
            </button>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-600 dark:text-slate-300">About</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-[#0A1931] dark:text-amber-400 font-semibold">About Us</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
            <span className="hidden sm:inline">Constituent College · Airport Road Bahawalpur</span>
            <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">|</span>
            <span className="text-[#C8102E] dark:text-amber-400 font-semibold bg-[#C8102E]/10 dark:bg-amber-400/10 px-2 py-0.5 border border-[#C8102E]/20 dark:border-amber-400/30">
              OFFICIAL PROFILE
            </span>
          </div>
        </div>
      </div>

      {/* 2. Hero Header with UCP Bahawalpur Building in Background */}
      <section className="relative w-full overflow-hidden bg-[#0A1931] text-white py-16 sm:py-24 lg:py-28 select-none border-b border-[#183a66]">
        {/* Background Campus Building Asset */}
        <div className="absolute inset-0 z-0">
          <img
            src={ucpBwpBuilding5Local}
            alt="University of Central Punjab Bahawalpur Campus Purpose-Built Building"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.08] scale-105 transition-transform duration-1000"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/campus/hero_campus_night_flagship.webp';
            }}
          />
          {/* Luminous Architectural Overlay for perfect contrast in both themes */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06182e]/95 via-[#0A1931]/88 to-[#06182e]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-black/30" />
          {/* Subtle CAD grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#7dd3fc_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-[0.2em] font-semibold">
              <Landmark size={13} className="text-amber-400" />
              <span>Constituent College · University of Central Punjab</span>
            </div>

            <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Empowering Ambition in the Heart of Southern Punjab
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-sans leading-relaxed font-normal">
              Bringing Lahore’s premier chartered university education directly to Bahawalpur. We exist so that no young visionary ever has to leave their home, family, or city to access world-class higher education, advanced research laboratories, and limitless career horizons.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              {onOpenApply && (
                <button
                  type="button"
                  onClick={onOpenApply}
                  className="px-6 py-3 bg-[#C8102E] hover:bg-[#A51C30] text-white font-semibold text-sm rounded-lg shadow-lg shadow-rose-950/40 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Apply Online</span>
                  <ArrowRight size={16} />
                </button>
              )}
              {onOpenProgrammesPage && (
                <button
                  type="button"
                  onClick={onOpenProgrammesPage}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-lg border border-white/20 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-sm"
                >
                  <span>Explore Academic Programmes</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. The UCP Bahawalpur Success Story — Heart-Touching, Authentic Narrative */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#071322]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Story Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C8102E] dark:text-amber-400">
                <HeartHandshake size={15} />
                <span>OUR INSPIRING JOURNEY</span>
              </div>

              <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-4xl lg:text-[42px] font-bold text-[#0A1931] dark:text-white leading-tight">
                A Promise Kept to the Sons &amp; Daughters of Southern Punjab
              </h2>

              <div className="space-y-4 text-slate-700 dark:text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                <p>
                  For decades, the historic city of Bahawalpur and the surrounding fertile belt of Southern Punjab produced brilliant, hard-working students with unmatched dreams. Yet, when the time came for university education, young boys and girls faced a painful barrier: packing their bags, leaving their aging parents and ancestral homes, and migrating hundreds of miles to Lahore or Islamabad at immense emotional and financial burden.
                </p>

                <p>
                  Countless brilliant girls were held back by distance and safety concerns, while countless families stretched their life savings to finance hostel life in distant cities. In response to this deeply felt human need, the leadership of <strong>Punjab Group of Colleges (PGC)</strong> and the <strong>University of Central Punjab (UCP)</strong> made an unbreakable resolution:
                </p>

                <blockquote className="border-l-4 border-[#C8102E] pl-4 py-2 my-4 bg-slate-50 dark:bg-[#0c1f38] italic font-serif text-base sm:text-lg text-[#0A1931] dark:text-amber-200 font-medium">
                  “The children of Bahawalpur deserve the exact same premier degree, the exact same distinguished faculty, and the exact same cutting-edge laboratories as those in Lahore — right here on their own soil.”
                </blockquote>

                <p>
                  Established as an official Constituent College on Airport Road, UCP Bahawalpur emerged not merely as a campus of bricks and mortar, but as a living monument of empowerment. Today, over 25 chartered BS and ADP degree programs in Computer Science, Artificial Intelligence, Business Administration, Media, Psychology, and Life Sciences are delivered with uncompromising academic rigor.
                </p>

                <p>
                  Under Punjab Group’s nationwide pledge, over <strong>Rs. 1.3 Billion</strong> in merit scholarships and tuition concessions has been disbursed, ensuring that financial limitations never obstruct a deserving student’s pathway to a world-class degree.
                </p>
              </div>

              {/* Success Story Highlights Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="p-3.5 bg-slate-50 dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-lg text-center">
                  <div className="text-xl sm:text-2xl font-bold text-[#0A1931] dark:text-white font-mono">25+</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">HEC Accredited Degrees</div>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-lg text-center">
                  <div className="text-xl sm:text-2xl font-bold text-[#C8102E] dark:text-amber-400 font-mono">1.3B+</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">PKR in Scholarships</div>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-lg text-center">
                  <div className="text-xl sm:text-2xl font-bold text-[#0A1931] dark:text-white font-mono">100%</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">PhD &amp; MPhil Faculty</div>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-lg text-center">
                  <div className="text-xl sm:text-2xl font-bold text-[#0A1931] dark:text-white font-mono">40+</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">Years Educational Legacy</div>
                </div>
              </div>
            </div>

            {/* Visual Showcase Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl group">
                <img
                  src={ucpBwpBuilding5Local}
                  alt="UCP Bahawalpur Campus Building"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/campus/hero_campus_night_flagship.webp';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06182e] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 font-semibold block mb-1">
                    AIRPORT ROAD · PURPOSE-BUILT ARCHITECTURE
                  </span>
                  <p className="text-sm font-semibold leading-snug">
                    UCP Bahawalpur Campus — Modern smart lecture halls, advanced computing laboratories, and comprehensive central library.
                  </p>
                </div>
              </div>

              {/* Testimonial Quote Banner */}
              <div className="p-5 bg-amber-50 dark:bg-[#0c1f38] border border-amber-200 dark:border-amber-500/20 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={14} />
                  <span>The Spirit of Bahawalpur</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  “Here, academic prestige meets hometown pride. Our students don’t just graduate; they pioneer the future of computing, business, media, and science across Southern Punjab and beyond.”
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Dramatic Picture & Profile of Leaders */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-[#061220] border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C8102E] dark:text-amber-400">
              <Users size={14} />
              <span>EXECUTIVE GOVERNANCE &amp; ACADEMIC STEWARDSHIP</span>
            </div>
            <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-[#0A1931] dark:text-white">
              Architects of Vision &amp; Institutional Excellence
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Meet the visionary statesmen and distinguished educators who steered UCP Bahawalpur into becoming Southern Punjab’s premier academic beacon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Leader 1: Mian Amer Mahmood */}
            <div className="bg-white dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group">
              <div className="aspect-[3/4] overflow-hidden bg-[#0A1931] relative">
                <img
                  src="/assets/welcome/mian-amer-mahmood.png"
                  alt="Mian Amer Mahmood (Hilal-e-Imtiaz)"
                  className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/99s2Cmqj_mian-ameer.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-semibold block">
                    FOUNDER &amp; CHAIRMAN
                  </span>
                  <h3 className="font-['Playfair_Display',serif] text-lg font-bold leading-tight">
                    Mian Amer Mahmood
                  </h3>
                  <span className="text-[11px] text-slate-300 block">Hilal-e-Imtiaz</span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  “Education is the greatest catalyst for national empowerment. When you empower a young mind with quality education, you uplift an entire generation.”
                </p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/10 pt-2 font-mono">
                  Chairman BoG, UCP &amp; PGC · Former 3rd Mayor of Lahore
                </div>
              </div>
            </div>

            {/* Leader 2: Prof. Sohail Afzal */}
            <div className="bg-white dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group">
              <div className="aspect-[3/4] overflow-hidden bg-[#0A1931] relative">
                <img
                  src="/assets/leadership/sohail_afzal_user_selected_3_4.jpg"
                  alt="Prof. Sohail Afzal"
                  className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/HffRMp9g_Whats-App-Image-2026-10-20-at-2-07-37-AM.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-semibold block">
                    EXECUTIVE DIRECTOR
                  </span>
                  <h3 className="font-['Playfair_Display',serif] text-lg font-bold leading-tight">
                    Prof. Sohail Afzal
                  </h3>
                  <span className="text-[11px] text-slate-300 block">Member BoG, UCP</span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  “At UCP we are not just means to education but a family that cares, grooms and helps unlock the true potential of our students.”
                </p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/10 pt-2 font-mono">
                  Executive Director PGC · Recipient APSUP Academic Excellence Award
                </div>
              </div>
            </div>

            {/* Leader 3: Prof. Hamid Iqbal */}
            <div className="bg-white dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group">
              <div className="aspect-[3/4] overflow-hidden bg-[#0A1931] relative">
                <img
                  src="https://ik.imagekit.io/Muffins/IMG_3544.PNG?updatedAt=1792577741736"
                  alt="Prof. Hamid Iqbal"
                  className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/leadership/prof_hamid_iqbal_director.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-semibold block">
                    DIRECTOR
                  </span>
                  <h3 className="font-['Playfair_Display',serif] text-lg font-bold leading-tight">
                    Prof. Hamid Iqbal
                  </h3>
                  <span className="text-[11px] text-slate-300 block">PGC &amp; UCP Bahawalpur Cluster</span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  “Translating strategic vision into sustainable, measurable outcomes and empowering academic teams toward institutional excellence.”
                </p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/10 pt-2 font-mono">
                  Director, UCP &amp; PGC Bahawalpur Cluster · 20+ Years Leadership
                </div>
              </div>
            </div>

            {/* Leader 4: Prof. Dr. Aurangzaib Virk */}
            <div className="bg-white dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group">
              <div className="aspect-[3/4] overflow-hidden bg-[#0A1931] relative">
                <img
                  src="https://ik.imagekit.io/Muffins/IMG_3542.PNG?updatedAt=1792580124994"
                  alt="Prof. Dr. Aurangzaib Virk"
                  className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/campus/prof_aurangzaib_virk.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-semibold block">
                    PRINCIPAL
                  </span>
                  <h3 className="font-['Playfair_Display',serif] text-lg font-bold leading-tight">
                    Prof. Dr. Aurangzaib Virk
                  </h3>
                  <span className="text-[11px] text-slate-300 block">UCP Bahawalpur Campus</span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  “Building Academic Excellence, Empowering People, Creating a Sustainable Future.”
                </p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/10 pt-2 font-mono">
                  Principal, UCP Bahawalpur · PhD in Management Sciences
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Our Vision & Mission — Best Minimal Official Style */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#071322] border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C8102E] dark:text-amber-400">
              GUIDING PRINCIPLES
            </span>
            <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-[#0A1931] dark:text-white">
              Our Vision &amp; Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Vision Box */}
            <div className="relative p-8 sm:p-10 bg-slate-50 dark:bg-[#0a182c] border-2 border-slate-200 dark:border-white/10 rounded-2xl hover:border-[#0A1931] dark:hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group shadow-sm">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A1931] text-amber-400 flex items-center justify-center shadow-md">
                  <Compass size={24} />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8102E] dark:text-amber-400 block">
                  THE STRATEGIC HORIZON
                </span>
                <h3 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-[#0A1931] dark:text-white">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  To be recognized as a premier institution that inspires transformative learning, 
                  technological innovation, and ethical leadership to serve the nation and global society.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Excellence in Higher Education &amp; Research</span>
              </div>
            </div>

            {/* Mission Box */}
            <div className="relative p-8 sm:p-10 bg-slate-50 dark:bg-[#0a182c] border-2 border-slate-200 dark:border-white/10 rounded-2xl hover:border-[#C8102E] dark:hover:border-[#C8102E] transition-all duration-300 flex flex-col justify-between group shadow-sm">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#C8102E] text-white flex items-center justify-center shadow-md">
                  <Award size={24} />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8102E] dark:text-amber-400 block">
                  THE INSTITUTIONAL COMMITMENT
                </span>
                <h3 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-[#0A1931] dark:text-white">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  Empowering students through academic rigor, industry linkages, state-of-the-art facilities, 
                  and holistic character building to produce agile, ethical leaders of tomorrow.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Industry Alliances &amp; Character Building</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Core Values — 6 Pillar Minimal Cards */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-[#061220] border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C8102E] dark:text-amber-400">
              CAMPUS ETHOS
            </span>
            <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-[#0A1931] dark:text-white">
              Our Core Values
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              The fundamental standards that guide every classroom lecture, laboratory experiment, and campus initiative.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Value 1 */}
            <div className="p-6 bg-white dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-xl shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <GraduationCap size={20} />
              </div>
              <h4 className="font-bold text-lg text-[#0A1931] dark:text-white">Academic Rigor &amp; Inquiry</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Pursuing uncompromised excellence in curriculum design, research depth, and scientific problem-solving aligned with global accreditation standards.
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-6 bg-white dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-xl shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-[#C8102E] dark:text-rose-400 flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-bold text-lg text-[#0A1931] dark:text-white">Ethical Integrity &amp; Honor</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Cultivating absolute honesty, personal accountability, and moral courage in scholarly pursuits and professional interactions.
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-6 bg-white dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-xl shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <HeartHandshake size={20} />
              </div>
              <h4 className="font-bold text-lg text-[#0A1931] dark:text-white">Student-Centric Care</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Nurturing every student as family through empathetic faculty mentorship, academic guidance, mental wellness, and career placement.
              </p>
            </div>

            {/* Value 4 */}
            <div className="p-6 bg-white dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-xl shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Lightbulb size={20} />
              </div>
              <h4 className="font-bold text-lg text-[#0A1931] dark:text-white">Innovation &amp; Future Readiness</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Equipping graduates with advanced artificial intelligence, computational skills, and an adaptable mindset to thrive in dynamic global industries.
              </p>
            </div>

            {/* Value 5 */}
            <div className="p-6 bg-white dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-xl shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <Globe size={20} />
              </div>
              <h4 className="font-bold text-lg text-[#0A1931] dark:text-white">Civic &amp; Regional Impact</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Actively serving Southern Punjab through community outreach, tourism partnerships with TDCP, environmental research, and cultural preservation.
              </p>
            </div>

            {/* Value 6 */}
            <div className="p-6 bg-white dark:bg-[#0a182c] border border-slate-200 dark:border-white/10 rounded-xl shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                <Target size={20} />
              </div>
              <h4 className="font-bold text-lg text-[#0A1931] dark:text-white">Meritocracy &amp; Inclusion</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Opening doors of opportunity to deserving talent across all backgrounds with transparent merit scholarships and equal access.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Call To Action Footer Banner */}
      <section className="py-14 bg-gradient-to-r from-[#0A1931] via-[#0F284E] to-[#0A1931] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="font-['Playfair_Display',serif] text-2xl sm:text-4xl font-bold">
            Begin Your University Journey at UCP Bahawalpur
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base font-sans">
            Admissions are open for accredited BS and ADP programs. Secure your future with world-class faculty, modern labs, and generous scholarships.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {onOpenApply && (
              <button
                type="button"
                onClick={onOpenApply}
                className="px-6 py-3 bg-[#C8102E] hover:bg-[#A51C30] text-white font-semibold text-sm rounded-lg shadow-lg cursor-pointer transition-colors"
              >
                Apply Online for Admissions
              </button>
            )}
            {onOpenFacilitiesPage && (
              <button
                type="button"
                onClick={onOpenFacilitiesPage}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-lg border border-white/20 cursor-pointer transition-colors"
              >
                Explore Campus Facilities
              </button>
            )}
            <button
              type="button"
              onClick={onBackToHome}
              className="px-6 py-3 bg-white text-[#0A1931] hover:bg-slate-100 font-semibold text-sm rounded-lg cursor-pointer transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
