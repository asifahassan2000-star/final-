import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Landmark, GraduationCap, Award, ChevronDown, 
  ArrowRight, ArrowLeft, Calendar, ShieldCheck, Compass, 
  ExternalLink, Sparkles, BookOpen, MapPin, CheckCircle2,
  Users, Layers, Globe, Eye, X, ZoomIn
} from 'lucide-react';
import { UCP_CONTACT } from '../data/ucpData';



// Authentic historical portrait of the Nawab of Bahawalpur (Abbasi Dynasty)
import nawabFullLengthImg from '../assets/images/nawab_of_bahawalpur.jpg';
import nawabFaceSquareImg from '../assets/images/nawab_face_square.jpg';
const NAWAB_BAHAWALPUR_URL = '/images/FbztWRNC_9ada4ca53a44a4a1bf356cbc4d1a84b4.jpg';

// Authentic visual record of the Cholistan Desert (Rohi)
const CHOLISTAN_DESERT_IMG = '/images/4nqfrP2k_caption.jpg';
const CHOLISTAN_DESERT_FALLBACK = '/images/7dfzm2Qh_caption.jpg';

// Modern Bahawalpur architectural master planning & urban design
const MODERN_BAHAWALPUR_IMG = '/images/yBh5dy61_DHA-Bahawalpur-design.webp';
const MODERN_BAHAWALPUR_FALLBACK = '/images/7NgVjWn5_DHA-Bahawalpur-design.webp';

// Central Library Bahawalpur (Historic interior architecture & reading hall)
const CENTRAL_LIBRARY_IMG = '/images/ZpFGDsb3_Interior-of-Central-Library-Bahawalpur.jpg';
const CENTRAL_LIBRARY_FALLBACK = '/images/xtBXTvry_Interior-of-Central-Library-Bahawalpur.jpg';

// Al-Sadiq Mosque (Grand Jamia Mosque of Bahawalpur)
const AL_SADIQ_MOSQUE_IMG = '/images/7JyHQBjd_504070207-9306697746096496-2110290870646406506-n.jpg';
const AL_SADIQ_MOSQUE_FALLBACK = '/images/mCzm0dbV_504070207-9306697746096496-2110290870646406506-n.jpg';

// Authentic UCP Bahawalpur Campus Building Photographs
import ucpBuildingBlueprintImg from '../assets/images/ucp_building_blueprint.jpg';
const UCP_BWP_BUILDING_1 = '/images/Qv89YHt5_83465e1d-068b-2508-b106-0177842d2b18-25460-F17-EBBC-4-FE6-9900-C688-B2739086.jpg';
const UCP_BWP_BUILDING_1_FALLBACK = '/images/YBD2fdwr_83465e1d-068b-2508-b106-0177842d2b18-25460-F17-EBBC-4-FE6-9900-C688-B2739086.jpg';

const UCP_BWP_BUILDING_2 = '/images/27R0ggJH_92d98f95-f6b4-b9d1-7c21-1edc80969a4a-177-F3-FFA-C68-F-42-DD-93-B6-62708-B02-B887.jpg';
const UCP_BWP_BUILDING_2_FALLBACK = '/images/kgzVQQZv_92d98f95-f6b4-b9d1-7c21-1edc80969a4a-177-F3-FFA-C68-F-42-DD-93-B6-62708-B02-B887.jpg';

const UCP_BWP_BUILDING_3 = '/images/G4KqHRdW_2b6fc1a1-b138-45fc-4190-ee20c9ec66ec-8-D7-DE21-D-BE51-4196-89-D0-F27-F4-E80-B669.jpg';
const UCP_BWP_BUILDING_3_FALLBACK = '/images/xtpNF621_2b6fc1a1-b138-45fc-4190-ee20c9ec66ec-8-D7-DE21-D-BE51-4196-89-D0-F27-F4-E80-B669.jpg';

const UCP_BWP_BUILDING_4 = '/images/35GkrL7M_f20540bb-58c2-5d50-e433-1b6e507af588-84-B2-C91-C-6-F98-46-E2-9620-09-C36081-FED7.jpg';
const UCP_BWP_BUILDING_4_FALLBACK = '/images/bjq7W8P2_f20540bb-58c2-5d50-e433-1b6e507af588-84-B2-C91-C-6-F98-46-E2-9620-09-C36081-FED7.jpg';

const UCP_BWP_BUILDING_5 = '/images/NnL9xCmX_IMG-7973.jpg';
const UCP_BWP_BUILDING_5_FALLBACK = '/images/3Y0p1dMw_IMG-7973.jpg';

const UCP_BWP_BUILDING_PHOTOS = [
  {
    id: 'bwp-main-architecture',
    title: 'UCP Bahawalpur Purpose-Built Campus Facility',
    tag: 'Flagship Architecture',
    image: '/assets/campus/13_hero_sunset_campus.jpg',
    fallback: ucpBuildingBlueprintImg
  },
  {
    id: 'bwp-facade',
    title: 'UCP Bahawalpur Close Architectural Exterior',
    tag: 'Exterior Architecture',
    image: '/assets/campus/12_about_architecture_exterior.jpg',
    fallback: UCP_BWP_BUILDING_4_FALLBACK
  },
  {
    id: 'bwp-complex',
    title: 'UCP Bahawalpur Campus Grounds & Lawns',
    tag: 'Campus Grounds',
    image: '/assets/campus/8_campus_life_courtyard.jpg',
    fallback: UCP_BWP_BUILDING_1_FALLBACK
  },
  {
    id: 'bwp-wing',
    title: 'Grand Staircase & Central Architectural Atrium',
    tag: 'Interior Architecture',
    image: '/assets/campus/9_facilities_grand_staircase.jpg',
    fallback: UCP_BWP_BUILDING_2_FALLBACK
  },
  {
    id: 'bwp-tower',
    title: 'Welcoming Grand Campus Entrance',
    tag: 'Arrival & Welcome',
    image: '/assets/campus/4_admissions_entrance_red_carpet.jpg',
    fallback: UCP_BWP_BUILDING_3_FALLBACK
  },
  {
    id: 'bwp-vista',
    title: 'UCP Bahawalpur Campus After Hours',
    tag: 'Campus Night View',
    image: '/assets/campus/3_campus_after_hours_night.jpg',
    fallback: UCP_BWP_BUILDING_5_FALLBACK
  }
];

interface OurLegacyPageProps {
  onBackToHome: () => void;
  onOpenApply?: (programName?: string) => void;
  onOpenProgrammesPage?: () => void;
  onOpenFee?: () => void;
}

interface HeritageItem {
  id: string;
  name: string;
  subtitle: string;
  year?: string;
  description: string;
  significance: string;
  image: string;
  fallbackImage: string;
}

interface MilestoneItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  significance: string;
  icon: string;
}

export const OurLegacyPage: React.FC<OurLegacyPageProps> = ({
  onBackToHome,
  onOpenApply,
  onOpenProgrammesPage,
  onOpenFee,
}) => {
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<HeritageItem | null>(null);
  const [activeMilestoneTab, setActiveMilestoneTab] = useState<number>(0);
  const [selectedBwpBuildingIdx, setSelectedBwpBuildingIdx] = useState<number>(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 1. Bahawalpur Heritage Landmarks Data
  const heritageLandmarks: HeritageItem[] = [
    {
      id: 'noor-mahal',
      name: 'Noor Mahal',
      subtitle: 'Italianate Chateau of the Abbasi Nawabs',
      year: 'Constructed 1872–1875',
      description: 'Commissioned by Nawab Sir Muhammad Sadiq Muhammad Khan IV, Noor Mahal is an architectural marvel blending neoclassical Italian chateau aesthetics with Corinthian columns, grand ballrooms, and intricate gilded ceilings.',
      significance: 'Stands as one of the most prominent cultural symbols of Bahawalpur’s royal patronage of art and monumental architecture.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Front_Elevation_of_Noor_Mahal.jpg/1280px-Front_Elevation_of_Noor_Mahal.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'derawar-fort',
      name: 'Derawar Fort',
      subtitle: 'Monumental 40-Bastion Fortress in Cholistan',
      year: 'Rebuilt 1732 CE by Nawab Sadeq Mohammad Khan I',
      description: 'A colossal square citadel situated in the heart of Cholistan, Derawar Fort features 40 imposing bastions rising 30 meters above the sands, guarding ancient trans-regional trade routes.',
      significance: 'An enduring monument to the defensive fortification, sovereign authority, and enduring grandeur of the former Bahawalpur State.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Derawar_Fort%2C_Bahawalpur_I.jpg/1280px-Derawar_Fort%2C_Bahawalpur_I.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'darbar-mahal',
      name: 'Darbar Mahal',
      subtitle: 'Royal Court of State and Diplomatic Splendour',
      year: 'Commissioned 1904 by Nawab Bahawal Khan V',
      description: 'Built in red brick and white marble, Darbar Mahal exemplifies Indo-Saracenic and Mughal-Arabic revival architecture, featuring grand ceremonial courtyards, Mughal minarets, and delicate jharoka balconies.',
      significance: 'Historically served as the judicial council seat and formal reception palace for heads of state visiting the Nawab of Bahawalpur.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Darbar_Mahal_%28Palace%29%2C_Bahawalpur.jpg/1280px-Darbar_Mahal_%28Palace%29%2C_Bahawalpur.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1590059390046-67993a40ce08?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'al-sadiq-mosque',
      name: 'Al-Sadiq Mosque',
      subtitle: 'The Grand Jamia Mosque of Bahawalpur',
      year: 'Commissioned by Nawab Sir Sadiq Muhammad Khan IV',
      description: 'Constructed with pristine white marble on an elevated terrace in the historical commercial center, this grand congregational mosque can accommodate more than 50,000 worshippers under its majestic domes and minarets.',
      significance: 'Reflects the deep Islamic traditions, philanthropic commitments, and spiritual devotion fostered across generations by the Abbasi rulers.',
      image: AL_SADIQ_MOSQUE_IMG,
      fallbackImage: AL_SADIQ_MOSQUE_FALLBACK
    },
    {
      id: 'cholistan-desert',
      name: 'Cholistan Desert (Rohi)',
      subtitle: 'Landscapes of Cultural Antiquity & Nomadic Lore',
      year: 'Ancient Hakra River Civilization Route',
      description: 'The vast desert expanse surrounding Bahawalpur represents millennia of nomadic living, legendary folk poetry, traditional craftwork, and archaeological settlements dating back to the Indus Valley civilization.',
      significance: 'Forms the geographic soul and poetic identity of the Southern Punjab region, immortalized in the mystical verses of Khawaja Ghulam Farid.',
      image: CHOLISTAN_DESERT_IMG,
      fallbackImage: CHOLISTAN_DESERT_FALLBACK
    },
    {
      id: 'central-library',
      name: 'Central Library Bahawalpur',
      subtitle: 'Historic Civic & Educational Architecture (Founded 1924)',
      year: 'Institutional Foundation of Learning (1924)',
      description: 'Bahawalpur was renowned across the subcontinent for establishing premier educational institutions. The majestic Central Library, featuring exquisite Victorian-Italianate interior woodwork, arched reading halls, and thousands of rare manuscripts, was established under the royal patronage of the Nawab of Bahawalpur.',
      significance: 'Demonstrates Bahawalpur’s historic foresight: royal revenues were continually directed toward libraries, scientific institutions, and educational access.',
      image: CENTRAL_LIBRARY_IMG,
      fallbackImage: CENTRAL_LIBRARY_FALLBACK
    }
  ];

  // 2. Story of Bahawalpur Timeline (Verified Information)
  const bahawalpurPeriods = [
    {
      period: 'The Nawab Era',
      tagline: 'Sovereign Statehood & Architectural Flourishing',
      description: 'A foundational period marked by the establishment and sovereignty of the Bahawalpur State under the Abbasi dynasty. The Nawabs established strong administrative systems, promoted trade, and invested heavily in monumental architecture, creating a distinctive civic and cultural identity.'
    },
    {
      period: 'Royal Heritage & Monumental Construction',
      tagline: 'Enduring Palaces, Fortresses & Mosques',
      description: 'Historic palaces such as Noor Mahal and Darbar Mahal, defensive strongholds like Derawar Fort, and public landmarks including Al-Sadiq Mosque were constructed. These enduring civic and religious institutions became permanent symbols of regional pride.'
    },
    {
      period: 'Modern Bahawalpur',
      tagline: 'Center of Education, Culture & Commerce',
      description: 'Following integration into Pakistan, Bahawalpur smoothly transitioned from princely administration into a vital division in Southern Punjab. The city developed into a key hub for higher education, agricultural trade, medicine, and cultural preservation.'
    },
    {
      period: 'Bahawalpur Today',
      tagline: 'Preserving Heritage While Expanding Horizons',
      description: 'Today, Bahawalpur stands as a historic city continuing to grow while preserving its distinctive heritage. Where royal traditions once fostered scholarship and civics, modern educational institutions now empower a new generation with 21st-century knowledge.'
    }
  ];

  // 3. Verified Official PGC & UCP Historical Milestones
  const officialMilestones: MilestoneItem[] = [
    {
      year: '1985',
      title: 'Foundation of Punjab Group of Colleges',
      institution: 'Punjab Group of Colleges (PGC)',
      description: 'The educational journey commenced with the opening of the first campus of Punjab College of Commerce on Muslim Town, Lahore. Its founding objective was providing accessible, high-quality, and disciplined education to young Pakistanis.',
      significance: 'Laid the bedrock of what would become the largest educational network in Pakistan.',
      icon: 'Building2'
    },
    {
      year: '1987',
      title: 'Establishment of Punjab Law College',
      institution: 'Punjab Law College',
      description: 'Broadening the scope into professional disciplines, Punjab Law College was instituted to educate future advocates, jurists, and legal scholars with rigorous legal ethics and case-law mastery.',
      significance: 'Marked the strategic expansion of the network into structured professional degree training.',
      icon: 'Award'
    },
    {
      year: '1993',
      title: 'Pioneering Computer Science Education',
      institution: 'Punjab Institute of Computer Science (PICS)',
      description: 'Recognizing the nascent digital revolution, Punjab Institute of Computer Science was founded in Lahore, producing Pakistan’s early cohort of software engineers and systems analysts.',
      significance: 'Early pioneer of formal degree programs in software engineering and computer science in the province.',
      icon: 'Sparkles'
    },
    {
      year: '1996',
      title: 'Petition for University Establishment',
      institution: 'Higher Education Charter Initiative',
      description: 'Having established proven academic excellence across commerce, law, and computer science, a formal institutional petition was prepared and submitted to the Government of Punjab for university chartering.',
      significance: 'Initiated the regulatory transition from an allied collegiate network to a chartered degree-awarding university.',
      icon: 'Landmark'
    },
    {
      year: '1999',
      title: 'Commencement of University Operations',
      institution: 'University Operations Phase',
      description: 'Pre-charter university-level operations commenced, structuring multidisciplinary faculties, advanced degree curricula, academic governance boards, and specialized laboratory infrastructure.',
      significance: 'Tested and verified the academic, physical, and governance frameworks required for statutory university status.',
      icon: 'GraduationCap'
    },
    {
      year: '2002',
      title: 'Statutory University Charter Received',
      institution: 'University of Central Punjab (UCP)',
      description: 'The University of Central Punjab officially received its statutory charter from the Government of the Punjab through an Act of the Provincial Assembly (Punjab Act IX of 2002), conferring full degree-awarding authority.',
      significance: 'Formally inaugurated UCP as an autonomous, recognized degree-granting institution of higher learning in Pakistan.',
      icon: 'ShieldCheck'
    },
    {
      year: '2012',
      title: 'Establishment of UCP Bahawalpur Campus',
      institution: 'Constituent College UCP Campus Bahawalpur',
      description: 'In 2012, the University of Central Punjab established its constituent campus in Bahawalpur on Airport Road, bringing recognized undergraduate and associate degree programs, purpose-built academic architecture, and world-class higher education to Southern Punjab.',
      significance: 'Brought UCP academic distinction, qualified faculties, and modern research laboratories directly to the historic region of Bahawalpur.',
      icon: 'Building2'
    }
  ];



  return (
    <div id="legacy-page-root" className="min-h-screen bg-[#fafbfc] dark:bg-[#080f1d] text-slate-900 dark:text-[#f8fafc] font-sans selection:bg-[#a30f16] selection:text-white">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-[#07192f] border-b border-slate-800 text-xs py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <button 
              onClick={onBackToHome}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <ArrowLeft size={13} />
              <span>Campus Home</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-amber-400 font-semibold">Our Legacy</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400 hidden sm:inline">Bahawalpur Heritage to Higher Education</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 hidden md:inline">
              Official University History & Campus Narrative
            </span>
            <button
              onClick={() => scrollToSection('ucp-bwp-section')}
              className="text-[11px] bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded transition-colors font-medium cursor-pointer"
            >
              Jump to Bahawalpur Campus ↓
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          1. HERO — “A LEGACY OF HERITAGE & KNOWLEDGE”
          Large full-screen hero using real campus photograph + dark navy overlay
          ========================================================================= */}
      <section 
        id="legacy-hero" 
        className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#092242] text-white select-none"
      >
        {/* Real Campus Photograph Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={UCP_BWP_BUILDING_4} 
            alt="UCP Bahawalpur Campus Architecture" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 opacity-90"
            onError={(e) => {
              (e.target as HTMLImageElement).src = UCP_BWP_BUILDING_4_FALLBACK;
            }}
          />
          {/* Slightly less dark blue overlay so background image is comfortably visible */}
          <div className="absolute inset-0 bg-[#092242]/45 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#092242]/90 via-[#092242]/45 to-[#092242]/65" />
          {/* Subtle architectural grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          
          {/* Clean Label */}
          <div 
            data-reveal="heading" 
            data-reveal-delay="0"
            className="inline-flex items-center text-white text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-6"
          >
            <span>OUR LEGACY</span>
          </div>

          {/* Large Heading */}
          <h1 
            data-reveal="heading" 
            data-reveal-delay="100"
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.18] max-w-4xl drop-shadow-md"
          >
            A Legacy of Heritage, Knowledge & Opportunity
          </h1>

          {/* Subtitle */}
          <p 
            data-reveal="paragraph" 
            data-reveal-delay="220"
            className="mt-6 text-lg sm:text-xl lg:text-2xl text-slate-200 font-normal leading-relaxed max-w-3xl drop-shadow"
          >
            From the royal heritage of Bahawalpur to a new generation of educational opportunity.
          </p>

          {/* Visual Journey Step Chips */}
          <div 
            data-reveal="card" 
            data-reveal-delay="360"
            className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-300 bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-sm max-w-4xl"
          >
            <span className="text-amber-400 font-bold uppercase tracking-wider">BAHAWALPUR</span>
            <span className="text-slate-500">→</span>
            <span className="text-amber-300/90 uppercase tracking-wider">HERITAGE</span>
            <span className="text-slate-500">→</span>
            <span className="text-slate-200 uppercase tracking-wider">EDUCATION</span>
            <span className="text-slate-500">→</span>
            <span className="text-white uppercase tracking-wider">PGC</span>
            <span className="text-slate-500">→</span>
            <span className="text-white uppercase tracking-wider">UCP</span>
            <span className="text-slate-500">→</span>
            <span className="bg-[#a30f16] text-white px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">UCP BAHAWALPUR</span>
            <span className="text-slate-500">→</span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider">FUTURE</span>
          </div>

          {/* Quick Jump Buttons */}
          <div 
            data-reveal="card" 
            data-reveal-delay="500"
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => scrollToSection('bahawalpur-heritage')}
              className="bg-white text-[#092242] hover:bg-slate-100 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span>Explore The Story</span>
              <ArrowRight size={14} className="text-[#a30f16]" />
            </button>

            <button
              onClick={() => scrollToSection('pgc-beginning')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 backdrop-blur-sm cursor-pointer"
            >
              Educational Milestones (1985–Present)
            </button>
          </div>

          {/* Subtle Scroll-Down Indicator */}
          <div className="mt-14 animate-bounce">
            <button 
              onClick={() => scrollToSection('bahawalpur-heritage')}
              aria-label="Scroll down to heritage section"
              className="text-slate-400 hover:text-amber-400 transition-colors flex flex-col items-center gap-1 cursor-pointer"
            >
              <span className="text-[11px] uppercase tracking-widest font-semibold">Scroll to Discover</span>
              <ChevronDown size={20} />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. BAHAWALPUR — CITY OF ROYAL HERITAGE
          Editorial section introducing Bahawalpur before discussing UCP
          ========================================================================= */}
      <section id="bahawalpur-heritage" className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Elegant Text on the Left with Framer Motion from Left */}
            <motion.div 
              className="lg:col-span-6 space-y-6"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false, amount: 0.25 }}
            >
              
              {/* Category Kicker */}
              <div 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a30f16]"
              >
                <Landmark size={15} />
                <span>The Royal Roots of Southern Punjab</span>
              </div>

              {/* Main Section Heading */}
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#092242] tracking-tight leading-[1.16]"
              >
                Bahawalpur — A City of Royal Heritage
              </h2>

              {/* Exact Styled Text as Requested */}
              <p 
                className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal"
              >
                Bahawalpur carries a distinctive heritage shaped by the former Nawab State, historic architecture, cultural traditions and the landscapes of Cholistan. Its palaces, forts and public landmarks preserve a remarkable connection with the past.
              </p>

              {/* Additional Editorial Context */}
              <p 
                className="text-slate-600 leading-relaxed text-sm sm:text-base"
              >
                Known historically as a princely state of sovereign dignity, Bahawalpur was characterized by an enlightened tradition of statecraft where the Nawabs invested state resources in civic infrastructure, grand palaces, public libraries, and educational endowments.
              </p>

              {/* Landmarks Bullets Mention */}
              <div 
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2.5"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#092242] flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-amber-600" />
                  Distinctive Regional Landmarks:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-semibold text-slate-800">
                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a30f16]" />
                    <span>Noor Mahal</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a30f16]" />
                    <span>Derawar Fort</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a30f16]" />
                    <span>Darbar Mahal</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a30f16]" />
                    <span>Al-Sadiq Mosque</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a30f16]" />
                    <span>Cholistan Desert</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a30f16]" />
                    <span>Central Library</span>
                  </div>
                </div>
              </div>

              {/* Elegant Highlighted Sentence with Nawab Portrait (Staggered y: 40) */}
              <motion.div 
                className="flex items-center gap-4 sm:gap-5 p-4 border-l-4 border-amber-500 bg-amber-50/70 rounded-r-2xl shadow-xs"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: false, amount: 0.25 }}
              >
                <div 
                  onClick={() => setSelectedGalleryItem({
                    id: 'nawab-portrait-royal',
                    name: 'His Highness The Nawab of Bahawalpur',
                    subtitle: 'Sovereign Abbasi Dynasty of Bahawalpur State',
                    year: 'Princely State of Bahawalpur',
                    description: 'His Highness the Nawab of Bahawalpur governed the sovereign princely state of Bahawalpur with visionary statecraft, creating modern hospitals, judicial courts, monumental palaces, and renowned educational endowments.',
                    significance: 'Spearheaded royal investments into regional education and institutional welfare that continue to shape the character of Bahawalpur today.',
                    image: nawabFullLengthImg,
                    fallbackImage: NAWAB_BAHAWALPUR_URL
                  })}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-lg ring-2 ring-amber-400 bg-amber-100 cursor-pointer group/nawab-sm relative"
                  title="Click to view full archival portrait of the Nawab of Bahawalpur"
                >
                  <img 
                    src={nawabFaceSquareImg} 
                    alt="His Highness The Nawab of Bahawalpur" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = NAWAB_BAHAWALPUR_URL;
                    }}
                    className="w-full h-full object-cover [object-position:50%_12%] group-hover/nawab-sm:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/nawab-sm:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <ZoomIn size={14} />
                  </div>
                </div>
                <div>
                  <p className="text-base sm:text-lg font-serif font-bold text-[#092242] italic leading-snug">
                    “Where the legacy of the Nawabs meets the aspirations of a new generation.”
                  </p>
                  <p className="text-xs text-amber-900 mt-1 font-medium">
                    A city of royal heritage and growing opportunity.
                  </p>
                </div>
              </motion.div>

            </motion.div>

            {/* Large Historical Image on the Right with Framer Motion from Right */}
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false, amount: 0.25 }}
            >
              <div 
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Front_Elevation_of_Noor_Mahal.jpg/1280px-Front_Elevation_of_Noor_Mahal.jpg" 
                  alt="Noor Mahal Bahawalpur Historical Palace" 
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                
                {/* Photo Inset Caption Badge */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#092242] via-[#092242]/80 to-transparent p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-amber-300 tracking-wider uppercase">
                        Architectural Jewel
                      </span>
                      <h3 className="text-xl font-bold text-white mt-0.5">
                        Noor Mahal, Bahawalpur
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        Built in 1872 CE • Historic Residence & Cultural Emblem of the Abbasi Dynasty
                      </p>
                    </div>
                    <span className="hidden sm:inline-block bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20">
                      Royal Heritage
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          3. BAHAWALPUR HERITAGE GALLERY
          Large premium image gallery with authentic photographs and small elegant captions
          ========================================================================= */}
      <section id="heritage-gallery" className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            className="max-w-3xl mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: false, amount: 0.25 }}
          >
            <span 
              className="text-xs font-bold text-[#a30f16] tracking-wider uppercase flex items-center gap-1.5"
            >
              <Landmark size={14} /> Historic Visual Record
            </span>
            <h2 
              className="text-3xl sm:text-4xl font-extrabold text-[#092242] tracking-tight mt-1"
            >
              Bahawalpur Heritage Gallery
            </h2>
            <p 
              className="text-slate-600 text-base mt-2"
            >
              Preserving the monumental architectural expressions, royal courts, and historic landscapes of Bahawalpur and the Cholistan Desert.
            </p>
          </motion.div>

          {/* 6-Card Large Photography Grid with Staggered Framer Motion */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {heritageLandmarks.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: false, amount: 0.2 }}
                onClick={() => setSelectedGalleryItem(item)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image Container with subtle zoom effect */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.fallbackImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                  
                  {/* Subtle View Badge */}
                  <div className="absolute top-3.5 right-3.5 bg-black/50 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ZoomIn size={12} />
                    <span>View Archival Details</span>
                  </div>

                  {/* Year Tag on Image */}
                  <div className="absolute bottom-3 left-3 bg-[#092242]/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded border border-amber-400/30">
                    {item.year || 'Historical Landmark'}
                  </div>
                </div>

                {/* Elegant Content & Caption */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#092242] group-hover:text-[#a30f16] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-3 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="truncate pr-2 italic">{item.significance}</span>
                    <ArrowRight size={13} className="text-[#a30f16] shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. THE STORY OF BAHAWALPUR
          Sophisticated timeline with verified historical information
          ========================================================================= */}
      <section id="bahawalpur-story" className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span 
              data-reveal="heading" 
              data-reveal-delay="0"
              className="text-xs font-bold text-[#a30f16] tracking-wider uppercase flex items-center justify-center gap-1.5"
            >
              <Calendar size={14} /> Chronological Perspective
            </span>
            <h2 
              data-reveal="heading" 
              data-reveal-delay="80"
              className="text-3xl sm:text-4xl font-extrabold text-[#092242] tracking-tight mt-1"
            >
              The Story of Bahawalpur
            </h2>
            <p 
              data-reveal="paragraph" 
              data-reveal-delay="120"
              className="text-slate-600 text-sm sm:text-base mt-2"
            >
              A documented historical progression from princely state sovereignty to regional center of learning and commerce.
            </p>
          </div>

          {/* Timeline Process with Framer Motion Alternating Slide */}
          <div className="relative border-l-2 border-[#092242]/20 ml-4 sm:ml-8 space-y-12 sm:space-y-16 pl-6 sm:pl-10">
            {bahawalpurPeriods.map((item, idx) => (
              <motion.div 
                key={item.period}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: false, amount: 0.25 }}
                className="relative group"
              >
                {/* Timeline Node Point */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#092242] border-4 border-white shadow-md flex items-center justify-center text-amber-300">
                  <span className="text-[10px] font-extrabold">{idx + 1}</span>
                </div>

                {/* Timeline Card */}
                <div className={`p-6 sm:p-8 rounded-3xl border shadow-xs hover:shadow-lg transition-all duration-300 ${
                  item.period === 'The Nawab Era'
                    ? 'bg-gradient-to-br from-amber-50/60 via-white to-slate-50/80 border-amber-300/80 shadow-md ring-1 ring-amber-200/50'
                    : 'bg-slate-50 hover:bg-white border-slate-200/90'
                }`}>
                  {item.period === 'The Nawab Era' ? (
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
                      {/* Big Size Circle Image of Nawab of Bahawalpur */}
                      <div className="shrink-0 flex flex-col items-center">
                        <div 
                          onClick={() => setSelectedGalleryItem({
                            id: 'nawab-portrait-era',
                            name: 'His Highness The Nawab of Bahawalpur',
                            subtitle: 'The Nawab Era • Abbasi Dynasty',
                            year: 'Historic Nawab State of Bahawalpur',
                            description: 'A foundational period marked by the establishment and sovereignty of the Bahawalpur State under the Abbasi dynasty. The Nawabs established strong administrative systems, promoted trade, and invested heavily in monumental architecture, creating a distinctive civic and cultural identity.',
                            significance: 'Preserved an enlightened sovereign era in Southern Punjab characterized by peace, prosperity, and royal patronage of architecture and scholarship.',
                            image: nawabFullLengthImg,
                            fallbackImage: NAWAB_BAHAWALPUR_URL
                          })}
                          className="relative group/nawab cursor-pointer"
                          title="Click to view full-length archival portrait of the Nawab of Bahawalpur"
                        >
                          {/* Outer Gold Halo Ring */}
                          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-amber-500/40 via-amber-300/30 to-amber-500/40 blur-sm group-hover/nawab:blur-md transition-all duration-300" />
                          
                          {/* Big Size Circle Frame */}
                          <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-amber-400 bg-amber-100 flex items-center justify-center transition-transform duration-500 group-hover/nawab:scale-103">
                            <img 
                              src={nawabFaceSquareImg} 
                              alt="His Highness The Nawab of Bahawalpur" 
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = NAWAB_BAHAWALPUR_URL;
                              }}
                              className="w-full h-full object-cover [object-position:50%_12%] filter brightness-102 contrast-105"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-[#092242]/35 opacity-0 group-hover/nawab:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2">
                              <ZoomIn size={24} className="text-amber-300 drop-shadow" />
                              <span className="text-[11px] font-bold mt-1 tracking-wider uppercase text-amber-200">View Full Portrait</span>
                            </div>
                          </div>

                          {/* Royal Insignia Ribbon Badge */}
                          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#092242] text-amber-300 text-[10px] sm:text-[11px] font-bold px-3.5 py-0.5 rounded-full border border-amber-400/80 shadow-lg whitespace-nowrap uppercase tracking-wider flex items-center gap-1">
                            <ShieldCheck size={12} className="text-amber-400" />
                            <span>Nawab of Bahawalpur</span>
                          </div>
                        </div>

                        <span className="text-[11px] text-slate-500 font-serif italic mt-4 text-center">
                          Abbasi Dynasty • Princely State
                        </span>
                      </div>

                      {/* Nawab Era Text Content */}
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                          <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#092242]">
                            {item.period}
                          </h3>
                          <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300 self-center sm:self-auto">
                            {item.tagline}
                          </span>
                        </div>
                        
                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-3 font-normal">
                          {item.description}
                        </p>

                        <div className="mt-5 pt-4 border-t border-amber-200/70 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60 text-slate-700">
                            <strong className="text-[#092242] font-serif block mb-0.5">Sovereignty & Governance</strong>
                            <span>Distinguished administrative independence with visionary statecraft in Southern Punjab.</span>
                          </div>
                          <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60 text-slate-700">
                            <strong className="text-[#092242] font-serif block mb-0.5">Monumental Architecture</strong>
                            <span>Royal patronage that built Noor Mahal, Darbar Mahal, and majestic civic endowments.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : item.period === 'Modern Bahawalpur' ? (
                    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                      {/* Modern Bahawalpur Text Content */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                          <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-[#092242]">
                            {item.period}
                          </h3>
                          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 self-start sm:self-auto">
                            {item.tagline}
                          </span>
                        </div>
                        
                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-3">
                          {item.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                          <span className="font-medium text-slate-600">Planned Urban Infrastructure & Modern Campus Growth</span>
                          <span className="text-[11px] text-slate-400">Southern Punjab Growth Hub</span>
                        </div>
                      </div>

                      {/* Modern Bahawalpur Image - Pure designer aesthetic, true proportion, clean & minimal */}
                      <div className="w-full lg:w-[46%] shrink-0">
                        <div 
                          onClick={() => setSelectedGalleryItem({
                            id: 'modern-bahawalpur-design',
                            name: 'Modern Bahawalpur Urban Development',
                            subtitle: 'Contemporary Infrastructure & Master Planning',
                            year: 'Modern Era Development',
                            description: item.description,
                            significance: 'Reflects Bahawalpur’s modern evolution — combining rich historical identity with contemporary urban master-planning, advanced road networks, and 21st-century educational infrastructure.',
                            image: MODERN_BAHAWALPUR_IMG,
                            fallbackImage: MODERN_BAHAWALPUR_FALLBACK
                          })}
                          className="group/modern relative overflow-hidden rounded-2xl cursor-pointer bg-slate-100 shadow-xs hover:shadow-md transition-all duration-300"
                          title="Click to view full image"
                        >
                          <img 
                            src={MODERN_BAHAWALPUR_IMG}
                            alt="Modern Bahawalpur urban design and master planning"
                            referrerPolicy="no-referrer"
                            className="w-full h-auto aspect-[600/323] object-cover transition-transform duration-500 ease-out group-hover/modern:scale-[1.02]"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = MODERN_BAHAWALPUR_FALLBACK;
                            }}
                          />
                          {/* Subtle hover badge */}
                          <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md opacity-0 group-hover/modern:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 pointer-events-none">
                            <ZoomIn size={12} />
                            <span>View Full</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-2 text-center lg:text-left">
                          Modern architectural master planning & infrastructure — Bahawalpur
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                        <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-[#092242]">
                          {item.period}
                        </h3>
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                          {item.tagline}
                        </span>
                      </div>
                      
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-3">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. FROM ROYAL HERITAGE TO MODERN EDUCATION
          Beautiful transition section with transition photograph from historic to UCP
          ========================================================================= */}
      <section id="heritage-to-education" className="py-20 lg:py-24 bg-[#092242] text-white relative">
        {/* Subtle background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Text Narrative from Left */}
            <motion.div 
              className="lg:col-span-6 space-y-6"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false, amount: 0.25 }}
            >
              
              <div 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400"
              >
                <Compass size={15} />
                <span>The Evolutionary Transition</span>
              </div>

              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.16]"
              >
                From Heritage to Higher Education
              </h2>

              {/* Exact Styled Text as Requested */}
              <blockquote 
                className="text-lg sm:text-xl text-slate-200 leading-relaxed font-light border-l-4 border-amber-400 pl-4 py-1 italic"
              >
                “Bahawalpur’s story is not only preserved in its historic buildings. It continues through its people, institutions, culture and commitment to learning. Today, the city combines a proud heritage with an increasingly modern educational environment.”
              </blockquote>

              <p 
                className="text-slate-300 text-sm sm:text-base leading-relaxed"
              >
                The same spirit of enlightenment that inspired the construction of grand libraries and colleges in the nineteenth and twentieth centuries now finds its contemporary home at UCP Bahawalpur. Here, royal dignity transforms into academic excellence, scientific inquiry, and purposeful careers.
              </p>

              <div 
                className="grid grid-cols-2 gap-4 pt-2"
              >
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-2xl font-black text-amber-400 font-mono">1880s+</div>
                  <div className="text-xs text-slate-300 mt-1">Tradition of Civic Scholarship & Patronage</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-2xl font-black text-emerald-400 font-mono">2020s+</div>
                  <div className="text-xs text-slate-300 mt-1">World-Class Degree Programs in Bahawalpur</div>
                </div>
              </div>

            </motion.div>

            {/* Visual Transition: Equal-Sized Square Images Side-by-Side (Frame strictly equal to square image) */}
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false, amount: 0.25 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
                
                {/* Image 1: Historic Architecture (Strict 1:1 Square, frame matches image exactly) */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-xl group border-0 bg-transparent">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Darbar_Mahal_%28Palace%29%2C_Bahawalpur.jpg/1280px-Darbar_Mahal_%28Palace%29%2C_Bahawalpur.jpg" 
                    alt="Darbar Mahal Historical Architecture" 
                    className="w-full h-full aspect-square object-cover object-center group-hover:scale-105 transition-transform duration-700 block"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Historic Legacy
                    </span>
                    <p className="text-sm font-bold text-white mt-1 leading-snug">Royal Bahawalpur Architecture</p>
                  </div>
                </div>

                {/* Image 2: Modern UCP Bahawalpur Campus (Strict 1:1 Square, frame matches image exactly) */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-xl group border-0 bg-transparent">
                  <img 
                    src={UCP_BWP_BUILDING_1} 
                    alt="UCP Bahawalpur Campus Building" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full aspect-square object-cover object-center group-hover:scale-105 transition-transform duration-700 block"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = UCP_BWP_BUILDING_1_FALLBACK;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 bg-[#a30f16] px-2 py-0.5 rounded backdrop-blur-xs">
                      Modern Opportunity
                    </span>
                    <p className="text-sm font-bold text-white mt-1 leading-snug">UCP Bahawalpur Campus</p>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          6. PUNJAB GROUP OF COLLEGES — THE EDUCATIONAL BEGINNING
          Timeline using VERIFIED official PGC/UCP history (1985–2002)
          ========================================================================= */}
      <section id="pgc-beginning" className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14">
            <span 
              data-reveal="heading" 
              data-reveal-delay="0"
              className="text-xs font-bold text-[#a30f16] tracking-wider uppercase flex items-center gap-1.5"
            >
              <Award size={14} /> Official Documented Milestones
            </span>
            <h2 
              data-reveal="heading" 
              data-reveal-delay="80"
              className="text-3xl sm:text-4xl font-extrabold text-[#092242] tracking-tight mt-1"
            >
              The Beginning of an Educational Legacy
            </h2>
            <p 
              data-reveal="paragraph" 
              data-reveal-delay="120"
              className="text-slate-600 text-base mt-2"
            >
              The historical development of Punjab Group of Colleges (PGC) — from a pioneering commerce institution in 1985 to a nationally recognized chartered university.
            </p>
          </div>

          {/* Tabbed / Grid Interactive Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {officialMilestones.map((m, idx) => (
              <div
                key={m.year}
                data-reveal="card"
                data-reveal-delay={100 + idx * 80}
                className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Year Pill */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                    <span className="text-2xl font-black text-[#a30f16] font-mono group-hover:scale-105 transition-transform inline-block">
                      {m.year}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                      Milestone {idx + 1}
                    </span>
                  </div>

                  {/* Institution Badge */}
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {m.institution}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#092242] group-hover:text-[#a30f16] transition-colors">
                    {m.title}
                  </h3>

                  {/* Factual Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5">
                    {m.description}
                  </p>
                </div>

                {/* Historical Significance Footer */}
                <div className="mt-5 pt-3 border-t border-slate-200/80 text-[11px] text-[#092242] font-semibold bg-white p-2.5 rounded-xl border border-slate-200/60">
                  <span className="text-amber-600 font-bold block mb-0.5 uppercase tracking-wider text-[10px]">
                    Institutional Significance:
                  </span>
                  {m.significance}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. UNIVERSITY OF CENTRAL PUNJAB
          Verified institutional development from wider network
          ========================================================================= */}
      <section id="ucp-university" className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Authentic UCP University Imagery */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div 
                data-reveal="image" 
                data-reveal-delay="150"
                className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 group"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Ucplhr.jpg" 
                  alt="University of Central Punjab Campus" 
                  className="w-full h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://ucp.edu.pk/wp-content/uploads/2025/06/01.webp';
                  }}
                />
                <div className="p-4 bg-[#092242] text-white text-xs">
                  <div className="font-bold">University of Central Punjab</div>
                  <div className="text-slate-300 text-[11px]">Chartered under Punjab Act IX of 2002</div>
                </div>
              </div>
            </div>

            {/* Right: Documented Development Facts */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              
              <div 
                data-reveal="heading" 
                data-reveal-delay="0"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a30f16]"
              >
                <GraduationCap size={15} />
                <span>Statutory Higher Education</span>
              </div>

              <h2 
                data-reveal="heading" 
                data-reveal-delay="80"
                className="text-3xl sm:text-4xl font-extrabold text-[#092242] tracking-tight"
              >
                From Colleges to University
              </h2>

              <p 
                data-reveal="paragraph" 
                data-reveal-delay="120"
                className="text-slate-700 text-base leading-relaxed"
              >
                The establishment of University of Central Punjab represents the natural evolution of Punjab Group of Colleges into a comprehensive, multidisciplinary university. Since receiving its statutory charter in 2002, UCP has developed structured academic faculties covering computer science, business administration, engineering, law, media, humanities, and sciences.
              </p>

              {/* Verified Development Points */}
              <div 
                data-reveal="card" 
                data-reveal-delay="200"
                className="space-y-3 pt-2"
              >
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-[#092242] block">Government Charter & Recognition</strong>
                    <span className="text-xs text-slate-600">Chartered by the Provincial Assembly of the Punjab (Act IX of 2002) and recognized by the Higher Education Commission (HEC) of Pakistan.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-[#092242] block">Multidisciplinary Academic Growth</strong>
                    <span className="text-xs text-slate-600">Comprehensive faculties spanning Information Technology, Management Studies, Engineering, Media & Mass Communication, Law, and Applied Sciences.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-[#092242] block">Research & Civic Linkages</strong>
                    <span className="text-xs text-slate-600">Active peer-reviewed research publications, technology commercialization, and regional community outreach.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          8. VISUAL JOURNEY
          Premium visual flow:
          PUNJAB GROUP OF COLLEGES → EDUCATIONAL EXPANSION → UCP → GROWTH → UCP BAHAWALPUR
          ========================================================================= */}
      <section id="visual-journey" className="py-20 lg:py-24 bg-[#092242] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span 
              data-reveal="heading" 
              data-reveal-delay="0"
              className="text-xs font-bold text-amber-400 tracking-[0.2em] uppercase flex items-center justify-center gap-1.5"
            >
              <Sparkles size={14} /> The Institutional Continuum
            </span>
            <h2 
              data-reveal="heading" 
              data-reveal-delay="80"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-1"
            >
              The Visual Journey
            </h2>
            <p 
              data-reveal="paragraph" 
              data-reveal-delay="120"
              className="text-slate-300 text-sm sm:text-base mt-2"
            >
              How thirty-nine years of documented educational dedication culminated in UCP Bahawalpur.
            </p>
          </div>

          {/* Premium Visual Flow Container */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            
            {/* Step 1 */}
            <div 
              data-reveal="card" 
              data-reveal-delay="140"
              className="relative bg-white/5 border border-amber-400/30 rounded-2xl p-6 text-center flex flex-col items-center justify-between hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-400/40">
                <Building2 size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 font-mono tracking-wider block">PHASE 01</span>
                <h3 className="text-sm font-extrabold text-white mt-1 uppercase tracking-wider">
                  Punjab Group of Colleges
                </h3>
                <p className="text-xs text-slate-300 mt-2">
                  1985 foundation establishing Pakistan’s largest collegiate network.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 w-full text-[11px] text-amber-300 font-semibold">
                Commerce & Foundation
              </div>
            </div>

            {/* Step 2 */}
            <div 
              data-reveal="card" 
              data-reveal-delay="280"
              className="relative bg-white/5 border border-amber-400/30 rounded-2xl p-6 text-center flex flex-col items-center justify-between hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-400/40">
                <Layers size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 font-mono tracking-wider block">PHASE 02</span>
                <h3 className="text-sm font-extrabold text-white mt-1 uppercase tracking-wider">
                  Educational Expansion
                </h3>
                <p className="text-xs text-slate-300 mt-2">
                  Launch of Punjab Law College & Punjab Institute of Computer Science.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 w-full text-[11px] text-amber-300 font-semibold">
                Law & Early Computing
              </div>
            </div>

            {/* Step 3 */}
            <div 
              data-reveal="card" 
              data-reveal-delay="420"
              className="relative bg-white/5 border border-amber-400/30 rounded-2xl p-6 text-center flex flex-col items-center justify-between hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-400/40">
                <Landmark size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 font-mono tracking-wider block">PHASE 03</span>
                <h3 className="text-sm font-extrabold text-white mt-1 uppercase tracking-wider">
                  University of Central Punjab
                </h3>
                <p className="text-xs text-slate-300 mt-2">
                  Statutory University Charter granted by the Government of Punjab (2002).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 w-full text-[11px] text-amber-300 font-semibold">
                Degree Awarding Charter
              </div>
            </div>

            {/* Step 4 */}
            <div 
              data-reveal="card" 
              data-reveal-delay="560"
              className="relative bg-white/5 border border-amber-400/30 rounded-2xl p-6 text-center flex flex-col items-center justify-between hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-400/40">
                <Globe size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 font-mono tracking-wider block">PHASE 04</span>
                <h3 className="text-sm font-extrabold text-white mt-1 uppercase tracking-wider">
                  Academic & Institutional Growth
                </h3>
                <p className="text-xs text-slate-300 mt-2">
                  Multidisciplinary faculties, PhD programs, and advanced academic research expansion.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 w-full text-[11px] text-amber-300 font-semibold">
                Multidisciplinary Scaling
              </div>
            </div>

            {/* Step 5: Highlighted Target */}
            <div 
              data-reveal="card" 
              data-reveal-delay="700"
              className="relative bg-[#a30f16] border-2 border-amber-400 rounded-2xl p-6 text-center flex flex-col items-center justify-between shadow-2xl scale-102"
            >
              <div className="w-12 h-12 rounded-xl bg-white text-[#a30f16] flex items-center justify-center mb-4 shadow">
                <GraduationCap size={24} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-amber-300 font-mono tracking-wider block">DESTINATION</span>
                <h3 className="text-sm font-black text-white mt-1 uppercase tracking-wider">
                  UCP Bahawalpur
                </h3>
                <p className="text-xs text-white/90 mt-2">
                  Bringing University of Central Punjab's legacy directly to historic Bahawalpur.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/20 w-full text-[11px] text-amber-300 font-bold">
                Local Presence & Future
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          9. UCP BAHAWALPUR — OUR LOCAL LEGACY
          Very large section with large real photograph occupying ~50%
          ========================================================================= */}
      <section id="ucp-bwp-section" className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left 50%: Large REAL photograph of UCP Bahawalpur campus with Framer Motion from Left */}
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false, amount: 0.25 }}
            >
              <div 
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-300 group"
              >
                <img 
                  src={UCP_BWP_BUILDING_PHOTOS[selectedBwpBuildingIdx].image} 
                  alt={UCP_BWP_BUILDING_PHOTOS[selectedBwpBuildingIdx].title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-[480px] sm:h-[560px] object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = UCP_BWP_BUILDING_PHOTOS[selectedBwpBuildingIdx].fallback;
                  }}
                />
                
                {/* Overlay Info Card */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#092242] via-[#092242]/85 to-transparent p-6 text-white">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#a30f16] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        Official Campus
                      </span>
                      <span className="text-amber-300 text-xs font-semibold">
                        Southern Punjab Presence
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full font-mono font-medium">
                      View {selectedBwpBuildingIdx + 1} of {UCP_BWP_BUILDING_PHOTOS.length}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {UCP_BWP_BUILDING_PHOTOS[selectedBwpBuildingIdx].title}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <MapPin size={13} className="text-amber-400 shrink-0" />
                      <span>Bahawalpur, Punjab, Pakistan</span>
                    </div>
                    <span className="text-[11px] text-amber-300/90 font-medium">
                      {UCP_BWP_BUILDING_PHOTOS[selectedBwpBuildingIdx].tag}
                    </span>
                  </div>
                </div>

              </div>

              {/* Interactive Building Photo Selector Thumbnails */}
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
                {UCP_BWP_BUILDING_PHOTOS.map((bPhoto, idx) => (
                  <button
                    key={bPhoto.id}
                    onClick={() => setSelectedBwpBuildingIdx(idx)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all p-0.5 text-left cursor-pointer group/thumb ${
                      selectedBwpBuildingIdx === idx 
                        ? 'border-[#a30f16] shadow-md ring-2 ring-[#a30f16]/30' 
                        : 'border-slate-200 hover:border-slate-400 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="h-14 sm:h-16 w-full overflow-hidden rounded-lg bg-slate-900">
                      <img 
                        src={bPhoto.image} 
                        alt={bPhoto.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = bPhoto.fallback;
                        }}
                      />
                    </div>
                    <span className="block text-[10px] font-semibold text-slate-700 truncate mt-1 text-center px-1">
                      {bPhoto.tag}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right 50%: Institutional Verified Narrative with Framer Motion from Right */}
            <motion.div 
              className="lg:col-span-6 space-y-6"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false, amount: 0.25 }}
            >
              
              <div 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a30f16]"
              >
                <Building2 size={15} />
                <span>Our Local Legacy</span>
              </div>

              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#092242] tracking-tight leading-[1.15]"
              >
                UCP Bahawalpur
              </h2>

              {/* Exact Styled Text as Requested */}
              <p 
                className="text-lg sm:text-xl text-slate-800 leading-relaxed font-normal"
              >
                “UCP Bahawalpur represents the presence of University of Central Punjab within a city known for its rich heritage and growing educational aspirations.”
              </p>

              <p 
                className="text-slate-600 text-sm sm:text-base leading-relaxed"
              >
                Established in <strong className="text-[#092242] font-bold">2012</strong> to extend world-class university curricula and modern campus facilities to students across Southern Punjab, UCP Bahawalpur has delivered over a decade of higher educational excellence. Offering accredited undergraduate (BS) and associate degree (ADP) programmes, students study under established academic guidelines, qualified faculties, and state-of-the-art technological laboratories on Airport Road.
              </p>

              {/* Verified Campus Facts Box */}
              <div 
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#092242]">
                  Verified Campus Information:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-semibold block text-[10px] uppercase">Campus Location</span>
                    <strong className="text-slate-900 text-xs">Airport Road, Bahawalpur</strong>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-semibold block text-[10px] uppercase">Official Helpline</span>
                    <strong className="text-slate-900 text-xs font-mono">{UCP_CONTACT.phone1} / {UCP_CONTACT.phone2}</strong>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-semibold block text-[10px] uppercase">Established in Bahawalpur</span>
                    <strong className="text-[#a30f16] text-xs font-bold">2012 (Constituent College Campus)</strong>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-semibold block text-[10px] uppercase">University Affiliation</span>
                    <strong className="text-slate-900 text-xs">University of Central Punjab (PGC)</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div 
                className="pt-2 flex flex-wrap items-center gap-3"
              >
                {onOpenProgrammesPage && (
                  <button
                    onClick={onOpenProgrammesPage}
                    className="bg-[#092242] hover:bg-[#a30f16] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Bahawalpur Programmes (25)</span>
                    <ArrowRight size={14} />
                  </button>
                )}

                {onOpenApply && (
                  <button
                    onClick={() => onOpenApply()}
                    className="bg-[#a30f16] hover:bg-[#860c12] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors shadow-md cursor-pointer"
                  >
                    Apply Online for Fall 2026
                  </button>
                )}
              </div>

            </motion.div>

          </div>

        </div>
      </section>



      {/* =========================================================================
          12. FINAL QUOTE-STYLE STATEMENT
          Beautiful centered institutional statement with direct actions
          ========================================================================= */}
      <section id="legacy-final-statement" className="py-20 lg:py-24 bg-[#051121] text-white border-t border-[#0e274a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* Subtle Top Gold Emblem */}
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-8" />

          {/* Three-Line Centered Statement */}
          <div 
            data-reveal="heading" 
            data-reveal-delay="0"
            className="space-y-2 text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight text-white leading-snug sm:leading-tight"
          >
            <div className="text-slate-100">Honouring our heritage.</div>
            <div className="text-amber-300">Building knowledge.</div>
            <div className="text-white">Inspiring the future.</div>
          </div>

          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-8 mb-6" />

          {/* Website Section Tagline Notice */}
          <p className="text-xs text-slate-400 uppercase tracking-widest font-mono font-medium mb-10">
            University of Central Punjab • Bahawalpur Campus
          </p>

          {/* Action Call to Explore Programmes or Apply */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {onOpenProgrammesPage && (
              <button
                onClick={onOpenProgrammesPage}
                className="bg-white text-[#092242] hover:bg-slate-100 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer"
              >
                <BookOpen size={16} className="text-[#a30f16]" />
                <span>Explore Academic Programmes (25)</span>
              </button>
            )}

            {onOpenApply && (
              <button
                onClick={() => onOpenApply()}
                className="bg-[#a30f16] hover:bg-[#860c12] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span>Apply for Fall 2026 Admissions</span>
                <ArrowRight size={16} />
              </button>
            )}

            <button
              onClick={onBackToHome}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
            >
              Return to Campus Home
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          MODAL: Archival Landmark Lightbox Viewer (Full-Length, Uncropped)
          ========================================================================= */}
      {selectedGalleryItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedGalleryItem(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-300 relative text-slate-900 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedGalleryItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            {selectedGalleryItem.id.startsWith('nawab') ? (
              <div className="flex flex-col md:flex-row overflow-y-auto">
                {/* Full-Length Uncropped Portrait Display */}
                <div className="md:w-1/2 bg-[#061527] p-6 sm:p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-800">
                  <div className="relative group max-w-full">
                    <img 
                      src={selectedGalleryItem.image} 
                      alt={selectedGalleryItem.name} 
                      referrerPolicy="no-referrer"
                      className="max-h-[72vh] w-auto mx-auto object-contain rounded-2xl shadow-2xl border-2 border-amber-400/80 ring-4 ring-amber-400/20"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = selectedGalleryItem.fallbackImage;
                      }}
                    />
                    <div className="mt-3 text-center">
                      <span className="inline-block bg-black/60 text-amber-300 text-[11px] font-mono font-semibold px-3 py-1 rounded-full border border-amber-400/30">
                        Full-Length Sovereign Portrait • 560 × 719
                      </span>
                    </div>
                  </div>
                </div>

                {/* Archival Details Panel */}
                <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                        {selectedGalleryItem.year}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#092242] mt-2">
                        {selectedGalleryItem.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {selectedGalleryItem.subtitle}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Historical & Sovereign Record
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {selectedGalleryItem.description}
                      </p>
                    </div>

                    <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200">
                      <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-amber-700 shrink-0" />
                        Cultural & Educational Significance
                      </h5>
                      <p className="text-xs text-amber-950 leading-relaxed">
                        {selectedGalleryItem.significance}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Bahawalpur State Archives
                    </span>
                    <button
                      onClick={() => setSelectedGalleryItem(null)}
                      className="bg-[#092242] text-white hover:bg-[#a30f16] px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
                    >
                      Close Full View
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-y-auto">
                <div className="relative max-h-[60vh] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                  <img 
                    src={selectedGalleryItem.image} 
                    alt={selectedGalleryItem.name} 
                    referrerPolicy="no-referrer"
                    className="max-h-[58vh] w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = selectedGalleryItem.fallbackImage;
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/60 px-2 py-0.5 rounded">
                      {selectedGalleryItem.year}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold mt-1">{selectedGalleryItem.name}</h3>
                    <p className="text-xs text-slate-300">{selectedGalleryItem.subtitle}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Architectural & Historical Record
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedGalleryItem.description}
                    </p>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200/80">
                    <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-amber-700" />
                      Cultural Significance to Bahawalpur
                    </h5>
                    <p className="text-xs text-amber-950 leading-relaxed">
                      {selectedGalleryItem.significance}
                    </p>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setSelectedGalleryItem(null)}
                      className="bg-[#092242] text-white hover:bg-[#a30f16] px-5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Close Archive Record
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}



    </div>
  );
};
