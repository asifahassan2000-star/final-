import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatedEventSection } from './AnimatedEventSection';
import { EditorialNewspaperSection } from './EditorialNewspaperSection';

// 1. TOP & MAIN FOCUS: Documentary & Short Reel Competition Assets
const docJudge = '/assets/events/documentary-competition-judges.jpg';
const docJudgeFallback = '/images/wFy5dC60_Whats-App-Image-2026-10-11-at-11-09-33-PM.jpg';
const doc1 = '/assets/events/documentary-competition-1.jpg';
const doc1Fallback = '/images/Z6gCjzm9_Whats-App-Image-2026-10-11-at-11-08-09-PM.jpg';
const doc2 = '/assets/events/documentary-competition-2.jpg';
const doc2Fallback = '/images/DPc3whkY_Whats-App-Image-2026-10-11-at-11-06-29-PM.jpg';
const doc3 = '/assets/events/documentary-competition-3.jpg';
const doc3Fallback = '/images/JWgxKLmW_Whats-App-Image-2026-10-11-at-11-08-23-PM.jpg';
const docAwards = '/assets/events/documentary-competition-awards.jpg';
const docAwardsFallback = '/images/1t5rZr61_Whats-App-Image-2026-10-11-at-11-09-58-PM.jpg';

// 2. Community & Cultural Excursions Assets
const mothersDay1 = '/assets/campus-life/mothers-day-historic-tribute-1.jpg';
const mothersDay1Fallback = '/images/pjcYnN2B_Whats-App-Image-2026-10-05-at-2-39-19-AM-2.jpg';
const mothersDay2Replacement = '/assets/campus-life/mothers-day-tribute-replacement.jpg';
const mothersDay2ReplacementFallback = '/images/HTqzJNjb_Whats-App-Image-2026-10-05-at-1-12-46-AM.jpg';

const jeepRallyMain = '/assets/campus-life/jeep-rally-main.jpg';
const jeepRallyMainFallback = '/images/PshpBWGn_Whats-App-Image-2026-10-05-at-2-39-14-AM.jpg';
const jeepRallyMeeting1 = '/assets/campus-life/jeep-rally-meeting-1.jpg';
const jeepRallyMeeting1Fallback = '/images/PGGS4ZQ0_Whats-App-Image-2026-10-05-at-1-23-51-AM-1.jpg';
const jeepRallyMeeting2 = '/assets/campus-life/jeep-rally-meeting-2.jpg';
const jeepRallyMeeting2Fallback = '/images/VcMt0mZx_Whats-App-Image-2026-10-05-at-1-23-52-AM.jpg';

const villageTour1 = '/assets/campus-life/village-tour-1.jpg';
const villageTour1Fallback = '/images/KxnwgN6v_Whats-App-Image-2026-10-05-at-1-17-53-AM-4-Copy.jpg';
const villageTour2 = '/assets/campus-life/village-tour-2.jpg';
const villageTour2Fallback = '/images/bRWh39Z1_Whats-App-Image-2026-10-11-at-11-07-35-PM.jpg';
const villageTour3 = '/assets/campus-life/village-tour-3.jpg';
const villageTour3Fallback = '/images/hxJ4v4xv_Whats-App-Image-2026-10-11-at-11-30-43-PM.jpg';
const villageTour4 = '/assets/campus-life/village-tour-4.jpg';
const villageTour4Fallback = '/images/W4CphPKd_Whats-App-Image-2026-10-11-at-11-31-06-PM.jpg';

const innovistaCinemaSinging = '/assets/campus-life/innovista-cholistan-movie-singing.jpg';
const innovistaCinemaSingingFallback = '/images/F4M5mF0r_Whats-App-Image-2026-10-11-at-11-23-40-PM.jpg';
const movieDayAddition = '/assets/campus-life/movie-day-addition.jpg';
const movieDayAdditionFallback = '/images/pjpRGkzG_Whats-App-Image-2026-10-11-at-11-24-05-PM.jpg';
const mouSigning = '/assets/campus-life/mou-signing-ceremony.jpg';
const mouSigningFallback = '/images/chjWx2NR_Whats-App-Image-2026-10-13-at-1-06-35-AM.jpg';

// 3. Tutorial Lectures & Recreational Gaming / Skills Assets
const studentSinging = '/assets/campus-life/student-singing-vocal-performance.jpg';
const studentSingingFallback = '/images/4RGfzpX8_image-2.jpg';
const studentDigitalSkills = '/assets/campus-life/student-digital-skills-lab.jpg';
const studentDigitalSkillsFallback = '/images/5x6v5v8X_image-1.jpg';

// 3. Tutorial Lectures & Recreational Gaming / Skills Assets
const tutorialGaming1 = '/assets/campus-life/student-recreational-gaming-tutorial.jpg';
const tutorialGaming1Fallback = '/images/d0RFqWwY_Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg';
const tutorialLecture2 = '/assets/campus-life/tutorial-lecture-2.jpg';
const tutorialLecture2Fallback = '/images/k20Sp6Gq_Whats-App-Image-2026-10-08-at-12-46-42-AM-3.jpg';
const tutorialLecture3 = '/assets/campus-life/tutorial-lecture-3.jpg';
const tutorialLecture3Fallback = '/images/JYCmfbX_Whats-App-Image-2026-10-08-at-12-46-43-AM.jpg';
const tutorialLecture4 = '/assets/campus-life/tutorial-lecture-4.jpg';
const tutorialLecture4Fallback = '/images/rKVgFRvy_Whats-App-Image-2026-10-08-at-12-46-42-AM.jpg';

interface BeyondTheClassroomProps {
  onScrollToCampusLife?: () => void;
  onOpenCampusLifePage?: () => void;
}

export const BeyondTheClassroomSection: React.FC<BeyondTheClassroomProps> = ({
  onScrollToCampusLife,
  onOpenCampusLifePage,
}) => {
  const handleExploreCampusLife = () => {
    if (onOpenCampusLifePage) {
      onOpenCampusLifePage();
    } else if (onScrollToCampusLife) {
      onScrollToCampusLife();
    } else {
      const elem = document.getElementById('campus-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id="beyond-the-classroom-section"
      className="relative py-[90px] sm:py-[110px] bg-[#FDFBF7] dark:bg-[#080f1d] text-[#0F2C61] dark:text-[#f8fafc] border-b border-[#0F2C61]/10 dark:border-white/10 select-none selection:bg-[#0F2C61] selection:text-white transition-colors duration-200"
      aria-labelledby="beyond-classroom-heading"
    >
      {/* Subtle Academic Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(#0F2C61 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* ====================================================================
            SECTION HEADER — Editorial University Retrospective Title
            ==================================================================== */}
        <header className="max-w-3xl mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.28em] text-[#0F2C61]/80 dark:text-amber-400">
              EDITORIAL ARCHIVE · STUDENT EXPERIENCES
            </span>
            <span className="h-px w-10 bg-[#0F2C61]/30 dark:bg-amber-400/30" aria-hidden="true" />
          </div>

          <h2
            id="beyond-classroom-heading"
            className="text-3xl sm:text-5xl lg:text-[56px] font-serif font-bold text-[#0F2C61] dark:text-white tracking-tight leading-[1.12] mb-6"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            BEYOND THE CLASSROOM
          </h2>

          <p 
            className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 font-serif italic leading-relaxed border-l-2 border-[#0F2C61]/40 dark:border-amber-400/40 pl-4 sm:pl-5 mb-4"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            Experiences that shape student life beyond academics.
          </p>

          <p 
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl"
            style={{ fontFamily: "'Inter', 'Source Sans 3', system-ui, sans-serif" }}
          >
            A curated photographic retrospective celebrating the dynamic collegiate journey at UCP Bahawalpur — from documentary film competitions and academic symposiums to cultural excursions, village heritage tours, and campus community life.
          </p>
        </header>

        {/* ====================================================================
            1. TOP & MAIN FOCUS: DOCUMENTARY & SHORT REEL COMPETITION
            (Judges: Shahzad Hussain & Javeed Khaliq)
            ==================================================================== */}
        <AnimatedEventSection
          title="Documentary & Short Reel Competition"
          categoryNumber="01"
          categoryLabel="CREATIVE MEDIA & CINEMA"
          description="A flagship cinematic showcase featuring student documentary screenings, visual storytelling reels, and critical critiques evaluated by distinguished jury members — including acclaimed media luminaries Shahzad Hussain and Javeed Khaliq invited as official judges to adjudicate, mentor, and award the best cinematic productions."
          reverse={false}
          highlights={['Shahzad Hussain (Judge)', 'Javeed Khaliq (Judge)', 'Documentary Screenings', 'Award Ceremonies']}
          images={[
            {
              src: docJudge,
              fallback: docJudgeFallback,
              alt: 'Distinguished judges Shahzad Hussain and Javeed Khaliq adjudicating documentary competition at UCP Bahawalpur',
              caption: 'Distinguished Adjudication Panel: Acclaimed media professionals Shahzad Hussain and Javeed Khaliq presiding as official judges, reviewing student documentary films, short reels, and narrative storytelling.',
              tag: 'JURY PANEL',
            },
            {
              src: doc1,
              fallback: doc1Fallback,
              alt: 'Documentary & Short Reel Competition main hall assembly',
              caption: 'Documentary & Short Reel Competition Assembly: Main stage gathering welcoming student directors, cinematographers, and faculty evaluators.',
              tag: 'MAIN STAGE',
            },
            {
              src: doc2,
              fallback: doc2Fallback,
              alt: 'Student documentary screening and visual storytelling session',
              caption: 'Student Cinematic Screenings: Competing short reels and documentary productions projected live for peer assessment and jury appraisal.',
              tag: 'SCREENING',
            },
            {
              src: doc3,
              fallback: doc3Fallback,
              alt: 'Audience and judges reviewing short reel competition entries',
              caption: 'Short Reel Adjudication: Interactive critique sessions exploring camera direction, narrative pacing, and technical editing execution.',
              tag: 'ADJUDICATION',
            },
            {
              src: docAwards,
              fallback: docAwardsFallback,
              alt: 'Documentary competition trophy and award recognition ceremony with judges',
              caption: 'Honorary Recognition & Awards Ceremony: Trophies, merit shields, and official certificates presented to winning student filmmakers by invited judges.',
              tag: 'AWARDS',
            },
          ]}
        />

        {/* ====================================================================
            2. EDITORIAL NEWSPAPER GRID / ASYMMETRICAL MAGAZINE LAYOUT
            (Project Exhibition with Lead on Top, International AI Symposium, Academic Seminars)
            ==================================================================== */}
        <EditorialNewspaperSection />

        {/* ====================================================================
            3. COMMUNITY & CULTURAL EXCURSIONS (Mothers Day, Jeep Rally, Village Tour, Cinema/Music)
            ==================================================================== */}
        <AnimatedEventSection
          title="Community & Cultural Excursions"
          categoryNumber="03"
          categoryLabel="COLLEGIATE EXPERIENCES"
          description="Cherished collegiate milestones, cultural heritage tours, and outdoor adventures — from maternal tributes honoring historic women role models in traditional getup, to open-air film screenings at Innovista, singing nights at Haveli Cholistan, village heritage tours, and the desert Jeep Rally collaboration under the banner 'Education Meets Adventure'."
          reverse={true}
          highlights={['Mothers Day Tribute', 'Cholistan Jeep Rally', 'Village Tour', 'Innovista Movie & Music']}
          images={[
            {
              src: mothersDay1,
              fallback: mothersDay1Fallback,
              alt: 'Mothers Day historic tribute celebration with students in traditional attire',
              caption: 'Mothers Day Tribute: Students honoring maternal legacy and historic trailblazing women, dressed in traditional period getup to celebrate their timeless contributions.',
              tag: 'MOTHERS DAY TRIBUTE',
            },
            {
              src: mothersDay2Replacement,
              fallback: mothersDay2ReplacementFallback,
              alt: 'Commemorative Mothers Day tribute stage assembly at UCP Bahawalpur',
              caption: 'Commemorative Women\'s Tribute Assembly: Heartfelt student celebrations and stage presentations honoring motherly sacrifices and inspiring women leaders.',
              tag: 'HISTORIC TRIBUTE',
            },
            {
              src: jeepRallyMain,
              fallback: jeepRallyMainFallback,
              alt: 'Cholistan Jeep Rally expedition with UCP Bahawalpur students',
              caption: 'Cholistan Jeep Rally Excursion: UCP Bahawalpur students exploring the renowned desert motorsport rally, regional heritage, and historic desert terrain.',
              tag: 'JEEP RALLY EXCURSION',
            },
            {
              src: jeepRallyMeeting1,
              fallback: jeepRallyMeeting1Fallback,
              alt: 'Education Meets Adventure collaboration meeting for Cholistan Jeep Rally',
              caption: 'Education Meets Adventure: Executive planning meeting and strategic collaboration for the Cholistan Jeep Rally student expedition.',
              tag: 'EDUCATION & ADVENTURE',
            },
            {
              src: jeepRallyMeeting2,
              fallback: jeepRallyMeeting2Fallback,
              alt: 'Jeep Rally collaboration forum and student briefing session',
              caption: 'Collegiate Excursion Briefing: Administration and rally organizers finalizing student expedition itineraries for the Cholistan desert rally.',
              tag: 'COLLABORATION FORUM',
            },
            {
              src: villageTour1,
              fallback: villageTour1Fallback,
              alt: 'Village Tour heritage excursion with UCP students exploring southern Punjab villages',
              caption: 'Village Tour Heritage Experience: Students exploring traditional rural life, regional crafts, and historical architecture across southern Punjab villages.',
              tag: 'VILLAGE TOUR',
            },
            {
              src: villageTour2,
              fallback: villageTour2Fallback,
              alt: 'Cultural fieldwork and rural heritage discourse during village tour',
              caption: 'Cultural Fieldwork & Rural Discovery: Interactive student encounters with local artisan communities, documenting living traditions and folklore.',
              tag: 'CULTURAL DISCOVERY',
            },
            {
              src: villageTour3,
              fallback: villageTour3Fallback,
              alt: 'Village tour communal gatherings and regional cultural immersion',
              caption: 'Communal Heritage & Artisan Interactions: Experiential rural learning connecting collegiate scholars with regional arts and customs.',
              tag: 'VILLAGE TOUR',
            },
            {
              src: villageTour4,
              fallback: villageTour4Fallback,
              alt: 'Rural fieldwork and folk heritage documentation during village tour',
              caption: 'Folk Traditions & Rural Documentation: Fieldwork exploring indigenous history, vernacular architecture, and community warmth.',
              tag: 'RURAL HERITAGE',
            },
            {
              src: innovistaCinemaSinging,
              fallback: innovistaCinemaSingingFallback,
              alt: 'Movie time at Innovista Cholistan and singing night at Haveli Cholistan',
              caption: 'Movie Time at Innovista Cholistan & Musical Evenings: Open-air film screenings and acoustic singing gatherings at Haveli Cholistan under serene desert starlight.',
              tag: 'CINEMA & MUSIC',
            },
            {
              src: movieDayAddition,
              fallback: movieDayAdditionFallback,
              alt: 'Movie day cinema gathering and acoustic musical night',
              caption: 'Collegiate Cinema & Melodic Evenings: Students enjoying cinematic screenings, acoustic musical vibes, and memorable evening camaraderie.',
              tag: 'FILM & RECREATION',
            },
            {
              src: '/assets/campus-life/shogran-valley-tour-1.jpg',
              fallback: '/images/0j944vNC_image-8.jpg',
              alt: 'Shogran Valley excursion tour with UCP Bahawalpur scholars',
              caption: 'Shogran Valley Northern Tour: UCP Bahawalpur students and faculty exploring the scenic pine trails, alpine heights, and natural vistas of Shogran.',
              tag: 'SHOGRAN VALLEY TOUR',
            },
            {
              src: '/assets/campus-life/campus-life-culture-1.jpg',
              fallback: '/images/q3FMgJQ6_Whats-App-Image-2026-10-18-at-1-23-07-AM.jpg',
              alt: 'Campus Life cultural celebrations and student gathering at UCP Bahawalpur',
              caption: 'Campus Life & Cultural Celebration: Dynamic student festivities, cultural representation, and communal camaraderie across faculties.',
              tag: 'CAMPUS LIFE CELEBRATION',
            },
            {
              src: '/assets/campus-life/campus-life-culture-2.jpg',
              fallback: '/images/7tL25pD8_Whats-App-Image-2026-10-18-at-1-24-42-AM.jpg',
              alt: 'Student cultural excursion and collegiate memories at UCP Bahawalpur',
              caption: 'Collegiate Cultural Milestones: Memorable student outdoor events, interactive gatherings, and peer excursions fostering lasting bonds.',
              tag: 'CULTURAL EXCURSION',
            },
          ]}
        />

        {/* ====================================================================
            4. TUTORIAL LECTURES & RECREATIONAL SKILLS (Singing, Digital Skills & All Games)
            ==================================================================== */}
        <AnimatedEventSection
          title="Tutorial Lectures & Recreational Skills"
          categoryNumber="04"
          categoryLabel="STUDENT ACTIVITIES"
          description="Students freely explore their passions through interactive tutorial lectures, hands-on digital skills labs, acoustic singing and vocal sessions, and recreational gaming where every student engages in the games, creative talents, and skills they love."
          reverse={false}
          highlights={['Tutorial Lectures', 'Digital Skills', 'Singing & Music', 'Recreational Gaming']}
          images={[
            {
              src: studentSinging,
              fallback: studentSingingFallback,
              alt: 'Student acoustic singing and musical vocal session',
              caption: 'Acoustic Singing & Musical Vocals: Expressive musical performances, acoustic singing sessions, and artistic vocal showcases celebrating student creative passion.',
              tag: 'SINGING & MUSIC',
            },
            {
              src: studentDigitalSkills,
              fallback: studentDigitalSkillsFallback,
              alt: 'Students developing digital skills and hands-on technological literacy in lab',
              caption: 'Digital Skills & Applied Computing Workshops: Practical software mastery, creative digital media, and hands-on technological skill development.',
              tag: 'DIGITAL SKILLS',
            },
            {
              src: tutorialGaming1,
              fallback: tutorialGaming1Fallback,
              alt: 'Tutorial lecture and recreational gaming skills interactive session',
              caption: 'Tutorial Lectures & Recreational Skills: Students participating in interactive learning tutorials, multi-skill development, and diverse indoor recreational games according to their personal interests.',
              tag: 'GAMES & SKILLS',
            },
            {
              src: tutorialLecture2,
              fallback: tutorialLecture2Fallback,
              alt: 'Interactive tutorial lecture and mentor coaching clinic',
              caption: 'Interactive Tutorial Session: Faculty mentoring, problem-solving clinics, and hands-on skill demonstrations across academic domains.',
              tag: 'TUTORIAL WORKSHOP',
            },
            {
              src: tutorialLecture3,
              fallback: tutorialLecture3Fallback,
              alt: 'Collaborative student study lab and tutorial group discussion',
              caption: 'Collaborative Study Hub: Peer learning, interactive tutorial labs, and tactical skill cultivation tailored to student goals.',
              tag: 'SKILL HUB',
            },
            {
              src: tutorialLecture4,
              fallback: tutorialLecture4Fallback,
              alt: 'Student recreational gaming and leisure skill session',
              caption: 'Recreational Gaming & Leisure Sessions: Multi-format student recreational activities promoting mental agility, team synergy, and leisure balance.',
              tag: 'RECREATIONAL GAMING',
            },
          ]}
        />

        {/* ====================================================================
            EDITORIAL CONCLUSION & CTA
            ==================================================================== */}
        <div className="pt-20 sm:pt-28 border-t border-[#0F2C61]/10 dark:border-white/10 text-center max-w-2xl mx-auto space-y-6">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0F2C61] dark:bg-amber-400 mx-auto" aria-hidden="true" />
          
          <p 
            className="text-2xl sm:text-3xl lg:text-4xl text-[#0F2C61] dark:text-white font-serif font-bold italic leading-tight"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            “Every experience becomes part of the UCP story.”
          </p>

          <span className="block text-xs uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400 font-mono">
            University of Central Punjab · Bahawalpur Campus
          </span>

          <div className="pt-4">
            <button
              onClick={handleExploreCampusLife}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0F2C61] dark:bg-amber-400 dark:text-slate-950 font-bold hover:bg-[#0A1D42] dark:hover:bg-amber-300 text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 cursor-pointer group"
            >
              <span>Explore Campus Life</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 text-slate-300 dark:text-slate-950" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BeyondTheClassroomSection;
