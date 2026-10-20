import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, Search, GraduationCap, Building2, 
  Award, Globe, Newspaper, PhoneCall, BookOpen, Compass,
  Sparkles, CheckCircle2, User, ExternalLink, ShieldCheck,
  Video, Laptop, Lightbulb, FileText, ArrowRight, Calendar,
  Home, MapPin
} from 'lucide-react';
import { UcpLogo } from './UcpLogo';
import { ThemeToggle } from './ThemeToggle';
import { FACULTIES, UCP_CONTACT } from '../data/ucpData';
import { OFFICIAL_BAHAWALPUR_PROGRAMMES } from '../data/bahawalpurProgrammesData';
import { InfoModalType } from './UcpInfoModal';

interface NavbarProps {
  onOpenApply: () => void;
  onOpenFee: () => void;
  onOpenPortal: () => void;
  onOpenInfo: (type: InfoModalType) => void;
  onSelectFaculty: (facultyId: string) => void;
  onScrollTo: (sectionId: string) => void;
  onOpenFacultyPage?: () => void;
  onOpenProgrammesPage?: (progId?: string) => void;
  onOpenLegacyPage?: () => void;
  onOpenCampusLifePage?: () => void;
  onOpenScholarshipsPage?: (sectionId?: string) => void;
  onOpenCnnAcademyPage?: () => void;
  onOpenCalendar?: () => void;
  onBackToHome?: () => void;
  currentPage?: 'home' | 'faculty' | 'programmes' | 'legacy' | 'campus-life' | 'scholarships' | 'fee-structure' | 'cnn-academy' | 'calendar';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenApply,
  onOpenFee,
  onOpenPortal,
  onOpenInfo,
  onSelectFaculty,
  onScrollTo,
  onOpenFacultyPage,
  onOpenProgrammesPage,
  onOpenLegacyPage,
  onOpenCampusLifePage,
  onOpenScholarshipsPage,
  onOpenCnnAcademyPage,
  onOpenCalendar,
  onBackToHome,
  currentPage = 'home',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Global Site Search States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState<'all' | 'programs' | 'pages'>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  type NavItemId = 'home' | 'about' | 'programs' | 'campus-life' | 'facilities' | 'admissions' | 'contact';
  const [activeNav, setActiveNav] = useState<NavItemId>('home');

  const bsProgrammes = OFFICIAL_BAHAWALPUR_PROGRAMMES.filter((p) => p.level === 'Undergraduate');
  const adpProgrammes = OFFICIAL_BAHAWALPUR_PROGRAMMES.filter((p) => p.level === 'Associate Degree');

  // Search input auto-focus
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 70);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery('');
    }
  }, [isSearchOpen]);

  // Global Ctrl+K / Cmd+K Search Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Listen to open-ucp-search custom event dispatched from minimal corner buttons
  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener('open-ucp-search', handleOpenSearch);
    return () => window.removeEventListener('open-ucp-search', handleOpenSearch);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (currentPage !== 'home') {
        if (currentPage === 'programmes') setActiveNav('programs');
        else if (currentPage === 'campus-life') setActiveNav('campus-life');
        else if (currentPage === 'faculty' || currentPage === 'legacy') setActiveNav('about');
        return;
      }

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Bottom of page -> Contact
      if (windowHeight + scrollY >= fullHeight - 140) {
        setActiveNav('contact');
        return;
      }

      // Top of page -> Home
      if (scrollY < 260) {
        setActiveNav('home');
        return;
      }

      const sections: { id: NavItemId; elementId: string }[] = [
        { id: 'contact', elementId: 'contact-section' },
        { id: 'contact', elementId: 'footer-section' },
        { id: 'admissions', elementId: 'closing-campus-section' },
        { id: 'admissions', elementId: 'admissions-section' },
        { id: 'campus-life', elementId: 'beyond-the-classroom-section' },
        { id: 'campus-life', elementId: 'campus-section' },
        { id: 'facilities', elementId: 'facilities-section' },
        { id: 'about', elementId: 'our-campus-section' },
        { id: 'about', elementId: 'about-section' },
        { id: 'programs', elementId: 'faculty-section' },
        { id: 'programs', elementId: 'what-we-offer' },
        { id: 'programs', elementId: 'faculties-section' },
        { id: 'programs', elementId: 'programs-section' },
        { id: 'programs', elementId: 'finder-section' },
        { id: 'about', elementId: 'leadership-section' },
        { id: 'home', elementId: 'welcome-ucp-section' },
        { id: 'home', elementId: 'stats-section' },
        { id: 'home', elementId: 'top' },
      ];

      const triggerPosition = scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section.elementId);
        if (el) {
          const top = el.offsetTop;
          if (triggerPosition >= top) {
            setActiveNav(section.id);
            return;
          }
        }
      }

      setActiveNav('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavigation = (navId: NavItemId, targetSectionId: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setActiveNav(navId);

    if (currentPage !== 'home' && onBackToHome) {
      onBackToHome();
      setTimeout(() => {
        if (targetSectionId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(targetSectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 120);
    } else {
      if (targetSectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetSectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleNavClick = (sectionId: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onScrollTo(sectionId);
  };

  const campusPages = useMemo(() => [
    {
      id: 'page-programmes',
      title: 'Academic Programmes',
      category: 'Pages',
      description: 'Explore undergraduate BS and Associate ADP degree programmes with verified credit hours',
      icon: GraduationCap,
      action: () => {
        setIsSearchOpen(false);
        if (onOpenProgrammesPage) onOpenProgrammesPage();
        else handleNavClick('academic-programmes-section');
      }
    },
    {
      id: 'page-fees',
      title: 'Fee Structure & Schedules',
      category: 'Pages',
      description: 'Official Fall 2026 tuition fee breakdown, admission dues, and semester installment schedules',
      icon: FileText,
      action: () => {
        setIsSearchOpen(false);
        onOpenFee();
      }
    },
    {
      id: 'page-scholarships',
      title: 'Scholarships & Concessions',
      category: 'Pages',
      description: 'Up to 50% Merit Scholarships & 25% PGC Alumni and Kinship fee concessions',
      icon: Award,
      action: () => {
        setIsSearchOpen(false);
        if (onOpenScholarshipsPage) onOpenScholarshipsPage();
        else if (onOpenLegacyPage) onOpenLegacyPage();
      }
    },
    {
      id: 'page-calendar',
      title: 'Academic Calendar (Fall 2026)',
      category: 'Pages',
      description: 'Teaching days, mid/final exams, registration deadlines, and semester timetable',
      icon: Calendar,
      action: () => {
        setIsSearchOpen(false);
        if (onOpenCalendar) onOpenCalendar();
        else onOpenInfo('academic-calendar');
      }
    },
    {
      id: 'page-admissions',
      title: 'Apply Online (Admissions Portal)',
      category: 'Pages',
      description: 'Official UCP & PGC online application portal for Fall 2026 admissions',
      icon: ExternalLink,
      action: () => {
        setIsSearchOpen(false);
        onOpenApply();
      }
    },
    {
      id: 'page-campus-life',
      title: 'Campus Life & Facilities',
      category: 'Pages',
      description: 'Advanced computer & AI labs, library stacks, air-conditioned buses, and sports complex',
      icon: Compass,
      action: () => {
        setIsSearchOpen(false);
        if (onOpenCampusLifePage) onOpenCampusLifePage();
        else handleNavClick('beyond-the-classroom-section');
      }
    },
    {
      id: 'page-faculty',
      title: 'Faculty Directory',
      category: 'Pages',
      description: 'Distinguished professors, PhD researchers, and experienced academic department heads',
      icon: Building2,
      action: () => {
        setIsSearchOpen(false);
        if (onOpenFacultyPage) onOpenFacultyPage();
        else handleNavClick('faculty-section');
      }
    },
    {
      id: 'page-portal',
      title: 'Student Portal Login',
      category: 'Pages',
      description: 'Login to official student portal (mcom.pgc.edu.pk) for grades, attendance, and dues',
      icon: User,
      action: () => {
        setIsSearchOpen(false);
        window.open('https://mcom.pgc.edu.pk/Student/StdLogin.jsp', '_blank', 'noopener,noreferrer');
      }
    },
    {
      id: 'page-contact',
      title: 'Campus Contacts & Location',
      category: 'Pages',
      description: 'Constituent College, Airport Road, Bahawalpur · Phone: 062-2202030 / 062-2202050',
      icon: PhoneCall,
      action: () => {
        setIsSearchOpen(false);
        handleNavClick('footer-section');
      }
    }
  ], [onOpenProgrammesPage, onOpenFee, onOpenScholarshipsPage, onOpenLegacyPage, onOpenCalendar, onOpenInfo, onOpenApply, onOpenCampusLifePage, onOpenFacultyPage]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { programmes: [], pages: [] };

    const matchingProgrammes = OFFICIAL_BAHAWALPUR_PROGRAMMES.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.degree.toLowerCase().includes(q) ||
        p.level.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.about.toLowerCase().includes(q)
      );
    });

    const matchingPages = campusPages.filter((page) => {
      return (
        page.title.toLowerCase().includes(q) ||
        page.description.toLowerCase().includes(q)
      );
    });

    return {
      programmes: matchingProgrammes,
      pages: matchingPages,
    };
  }, [searchQuery, campusPages]);

  return (
    <header 
      id="main-nav-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#092242]/95 backdrop-blur-md shadow-xl shadow-black/30 py-2.5 border-b border-[#183a66]' 
          : 'bg-[#092242] py-3.5 border-b border-[#122e54]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Official Logo (Crest + "University of Central Punjab Bahawalpur" on the same line) */}
          <UcpLogo 
            variant="header"
            onClick={() => {
              if (currentPage !== 'home' && onBackToHome) {
                onBackToHome();
              } else {
                handleNavClick('top');
              }
            }}
          />

          {/* Desktop Navigation Links - Official, clean, balanced and spacious */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4 text-[14px] font-medium text-white whitespace-nowrap shrink-0">
            
            {/* 1. Home Button */}
            <button
              id="nav-home-btn"
              onClick={() => {
                if (currentPage !== 'home' && onBackToHome) {
                  onBackToHome();
                } else {
                  handleNavClick('top');
                }
              }}
              className={`px-2.5 py-1.5 transition-colors flex items-center gap-1.5 text-white hover:text-white/80 focus:outline-none focus:ring-0 border-0 bg-transparent shadow-none cursor-pointer whitespace-nowrap shrink-0 ${
                currentPage === 'home' ? 'font-bold' : 'font-medium'
              }`}
            >
              <Home size={15} className="text-white shrink-0" />
              <span className="text-white whitespace-nowrap">Home</span>
            </button>

            {/* 2. Academics Button — Directly opens Programs section */}
            <button
              id="nav-academics-btn"
              onClick={() => {
                if (onOpenProgrammesPage) {
                  onOpenProgrammesPage();
                } else {
                  handleNavClick('finder-section');
                }
              }}
              className={`px-2.5 py-1.5 transition-colors flex items-center gap-1.5 text-white hover:text-white/80 focus:outline-none focus:ring-0 border-0 bg-transparent shadow-none cursor-pointer whitespace-nowrap shrink-0 ${
                currentPage === 'programmes' ? 'font-bold' : 'font-medium'
              }`}
            >
              <GraduationCap size={15} className="text-white shrink-0" />
              <span className="text-white whitespace-nowrap">Academics</span>
            </button>

            {/* 2. Admissions Dropdown */}
            <div 
              className="relative shrink-0"
              onMouseEnter={() => setActiveDropdown('admissions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-admissions-btn"
                onClick={() => {
                  setActiveDropdown(activeDropdown === 'admissions' ? null : 'admissions');
                }}
                className={`px-2.5 py-1.5 transition-colors flex items-center gap-1.5 text-white hover:text-white/80 focus:outline-none focus:ring-0 border-0 bg-transparent shadow-none cursor-pointer whitespace-nowrap shrink-0 ${
                  activeDropdown === 'admissions' ? 'font-bold' : 'font-medium'
                }`}
              >
                <span className="text-white whitespace-nowrap">Admissions</span>
                <ChevronDown size={14} className={`transition-transform duration-200 text-white/80 ${activeDropdown === 'admissions' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'admissions' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="absolute left-0 mt-1.5 w-[260px] max-h-[380px] bg-[#FFFFFF] text-[#333333] rounded-[6px] shadow-md border border-[#E5E7EB] p-1.5 overflow-y-auto dropdown-scrollbar z-50 text-[13px]"
                    onMouseEnter={() => setActiveDropdown('admissions')}
                  >
                    <a
                      href="https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActiveDropdown(null)}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] flex items-center justify-between text-[#333333] font-medium"
                    >
                      <span>Apply Online</span>
                      <span className="text-[11px] text-[#666666]">↗</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveDropdown(null);
                        onOpenFee();
                      }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] flex items-center justify-between text-[#333333] cursor-pointer"
                    >
                      <span>Fee Structure & Programs</span>
                      <span className="text-[11px] text-[#666666]">→</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveDropdown(null);
                        if (onOpenScholarshipsPage) onOpenScholarshipsPage();
                        else window.open('https://ucpcolleges.pgc.edu/scholarship/', '_blank', 'noopener,noreferrer');
                      }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] flex items-center justify-between text-[#333333] cursor-pointer"
                    >
                      <span>Scholarships & Concessions</span>
                      <span className="text-[11px] text-[#666666]">↗</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { 
                        setActiveDropdown(null); 
                        if (onOpenProgrammesPage) onOpenProgrammesPage();
                        else onOpenInfo('merit-list'); 
                      }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] flex items-center justify-between text-[#333333] cursor-pointer"
                    >
                      <span>Academic Programs</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveDropdown(null);
                        if (onOpenCalendar) onOpenCalendar();
                        else onOpenInfo('academic-calendar');
                      }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] flex items-center justify-between text-[#333333] cursor-pointer"
                    >
                      <span>Academic Calendar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { 
                        setActiveDropdown(null); 
                        if (onOpenScholarshipsPage) {
                          onOpenScholarshipsPage('scholarship-calculator');
                        } else {
                          handleNavClick('scholarship-calculator');
                        }
                      }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] flex items-center justify-between text-[#333333] cursor-pointer"
                    >
                      <span>Eligibility & Criteria</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Our Faculty (UCP Bahawalpur) - Dedicated Page */}
            <button
              id="nav-faculty-btn"
              onClick={() => {
                if (onOpenFacultyPage) {
                  onOpenFacultyPage();
                } else {
                  handleNavClick('faculty-section');
                }
              }}
              className={`px-2.5 py-1.5 transition-colors flex items-center gap-1.5 text-white hover:text-white/80 focus:outline-none focus:ring-0 border-0 bg-transparent shadow-none cursor-pointer whitespace-nowrap shrink-0 ${
                currentPage === 'faculty' ? 'font-bold' : 'font-medium'
              }`}
            >
              <span className="text-white whitespace-nowrap inline-block">Our Faculty</span>
            </button>

            {/* 3b. Our Legacy (UCP Bahawalpur) - Dedicated Page */}
            <button
              id="nav-legacy-btn"
              onClick={() => {
                if (onOpenLegacyPage) {
                  onOpenLegacyPage();
                }
              }}
              className={`px-2.5 py-1.5 transition-colors flex items-center gap-1.5 text-white hover:text-white/80 focus:outline-none focus:ring-0 border-0 bg-transparent shadow-none cursor-pointer whitespace-nowrap shrink-0 ${
                currentPage === 'legacy' ? 'font-bold' : 'font-medium'
              }`}
            >
              <span className="text-white whitespace-nowrap inline-block">Our Legacy</span>
            </button>

            {/* 4. About Dropdown (All items organized in this folder) */}
            <div 
              className="relative shrink-0"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-about-btn"
                onClick={() => {
                  setActiveDropdown(activeDropdown === 'about' ? null : 'about');
                }}
                className={`px-2.5 py-1.5 transition-colors flex items-center gap-1.5 text-white hover:text-white/80 focus:outline-none focus:ring-0 border-0 bg-transparent shadow-none cursor-pointer whitespace-nowrap shrink-0 ${
                  activeDropdown === 'about' ? 'font-bold' : 'font-medium'
                }`}
              >
                <span className="text-white whitespace-nowrap">About</span>
                <ChevronDown size={14} className={`transition-transform duration-200 text-white/80 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'about' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="absolute left-0 xl:left-auto xl:right-0 mt-1.5 w-[260px] max-h-[380px] bg-[#FFFFFF] text-[#333333] rounded-[6px] shadow-md border border-[#E5E7EB] p-1.5 overflow-y-auto dropdown-scrollbar z-50 text-[13px]"
                    onMouseEnter={() => setActiveDropdown('about')}
                  >
                    <div className="px-[14px] py-1 text-[11px] font-bold text-[#888888] uppercase tracking-wider">
                      About UCP
                    </div>

                    <button
                      id="nav-dropdown-location-btn"
                      type="button"
                      onClick={() => { setActiveDropdown(null); handleNavClick('location-section'); }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] text-[#333333] flex items-center justify-between cursor-pointer group"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#a30f16]" />
                        <span className="font-medium text-[#0F2C61]">Our Location</span>
                      </span>
                      <span className="text-[11px] text-[#a30f16] font-medium group-hover:translate-x-0.5 transition-transform">Map & Directions ↗</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setActiveDropdown(null); handleNavClick('leadership-section'); }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] text-[#333333] flex items-center justify-between cursor-pointer"
                    >
                      <span>Our Leadership</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setActiveDropdown(null); handleNavClick('vision-rankings-section'); }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] text-[#333333] flex items-center justify-between cursor-pointer"
                    >
                      <span>Vision & Rankings</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { 
                        setActiveDropdown(null); 
                        if (onOpenCampusLifePage) {
                          onOpenCampusLifePage();
                        } else {
                          handleNavClick('campus-section'); 
                        }
                      }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] text-[#333333] flex items-center justify-between cursor-pointer"
                    >
                      <span>Campus Life & Activities</span>
                    </button>

                    <button
                      id="nav-dropdown-our-legacy-btn"
                      type="button"
                      onClick={() => { 
                        setActiveDropdown(null); 
                        if (onOpenLegacyPage) onOpenLegacyPage(); 
                      }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] text-[#333333] flex items-center justify-between cursor-pointer"
                    >
                      <span>Our Legacy</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setActiveDropdown(null); onOpenInfo('harassment-policy'); }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] text-[#333333] flex items-center justify-between cursor-pointer"
                    >
                      <span>Harassment Protection Policy</span>
                    </button>

                    <div className="my-1 border-t border-[#E5E7EB]" />
                    <div className="px-[14px] py-1 text-[11px] font-bold text-[#888888] uppercase tracking-wider">
                      Programs & Centers
                    </div>

                    <button
                      type="button"
                      onClick={() => { 
                        setActiveDropdown(null); 
                        if (onOpenCnnAcademyPage) {
                          onOpenCnnAcademyPage();
                        } else {
                          onSelectFaculty('fmmc');
                        }
                      }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] text-[#333333] flex items-center justify-between cursor-pointer"
                    >
                      <span>CNN Academy at UCP</span>
                      <span className="text-[10px] font-mono text-[#A51C30] font-bold bg-[#A51C30]/5 px-1.5 py-0.5 border border-[#A51C30]/20">
                        Official
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setActiveDropdown(null); onOpenInfo('ucp-online'); }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] text-[#333333] flex items-center justify-between cursor-pointer"
                    >
                      <span>UCP Online (LMS)</span>
                    </button>

                    <a
                      href="https://oric.ucp.edu.pk/?_gl=1%2A1038nq8%2A_gcl_au%2AMTgzMjA3ODQ4MC4xNzkwMDEyMzQ5Li0uLS4xNzkwMTgwNDM0LjY0MTA5MDAyNi4xNzkwMTgwNDM0LjE3OTAxODA0MzQ.%2A_ga%2AMTk1MTM4Njg4MS4xNzkwMDEyMzQ5%2A_ga_9BBZL6TFYQ%2AczE3OTAxNzk2OTYkbzYkZzEkdDE3OTAxODA1MTUkajQyJGwwJGg0NzM0NDM5MzA."
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActiveDropdown(null)}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] text-[#333333] flex items-center justify-between"
                    >
                      <span>ORIC (Research & Tech)</span>
                      <span className="text-[11px] text-[#666666]">↗</span>
                    </a>

                    <a
                      href="https://ucp.edu.pk/blog/?_gl=1*g7icau*_gcl_au*mtgzmja3odq4mc4xnzkwmdeymzq5li0uls4xnzkwmtgwndm0ljy0mta5mdayni4xnzkwmtgwndm0lje3otaxoda0mzq.*_ga*mtk1mtm4njg4ms4xnzkwmdeymzq5*_ga_9bbzl6tfyq*cze3otaxnzk2otykbzykzzekdde3otaxoda0otckajywjgwwjgg0nzm0ndm5mza."
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActiveDropdown(null)}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] text-[#333333] flex items-center justify-between"
                    >
                      <span>UCP Official Blog</span>
                      <span className="text-[11px] text-[#666666]">↗</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. Leadership Section Navigation */}
            <button
              id="nav-myucp-btn"
              type="button"
              onClick={() => handleNavClick('leadership-section')}
              className="px-2.5 py-1.5 transition-colors flex items-center gap-1.5 text-white hover:text-white/80 focus:outline-none focus:ring-0 border-0 bg-transparent shadow-none cursor-pointer whitespace-nowrap shrink-0 font-medium"
              title="Official Institutional Leadership"
            >
              <Award size={14} className="text-amber-400 shrink-0" />
              <span className="text-white whitespace-nowrap">Leadership</span>
            </button>

          </nav>

          {/* Right Header Area: Mobile Menu Toggle only (Clean, neat, uncluttered) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mobile menu toggle button — Prominently visible, high contrast, clean */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all duration-200 focus:outline-none cursor-pointer shadow-md shrink-0 border z-10 ${
                mobileMenuOpen
                  ? 'bg-[#C8102E] text-white border-white/50 shadow-rose-950/40'
                  : 'bg-white text-[#0A1931] border-slate-200 hover:bg-slate-100 shadow-md'
              }`}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <>
                  <X size={16} className="text-white" />
                  <span className="tracking-wide uppercase font-sans text-xs">Close</span>
                </>
              ) : (
                <>
                  <Menu size={16} className="text-[#0A1931]" />
                  <span className="tracking-wide uppercase font-sans text-xs">Menu</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071b34] border-t border-slate-700/70 px-5 pt-4 pb-6 text-sm text-slate-100 space-y-3.5 shadow-2xl animate-in slide-in-from-top-3">
          {/* Very minor, subtle search button in mobile menu (not too highlighted) */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer mb-2"
            title="Search UCP Bahawalpur"
          >
            <Search size={13} className="text-slate-400 shrink-0" />
            <span className="text-slate-400 text-xs font-normal">Search programmes, fees, admissions...</span>
          </button>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCampusLifePage) {
                  onOpenCampusLifePage();
                } else {
                  handleNavClick('campus-section');
                }
              }}
              className="bg-white/10 text-white py-2 px-3 rounded-lg font-semibold text-center text-xs border border-white/20 block hover:bg-white/20 transition-colors"
            >
              Campus Life
            </button>
            <a
              href="https://mcom.pgc.edu.pk/Student/StdLogin.jsp"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-white/10 text-white py-2 px-3 rounded-lg font-semibold text-center text-xs border border-white/20 block hover:bg-white/20 transition-colors"
            >
              Student Portal
            </a>
          </div>

          <div className="space-y-1.5 border-b border-slate-700/60 pb-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPage !== 'home' && onBackToHome) {
                  onBackToHome();
                } else {
                  handleNavClick('top');
                }
              }}
              className="w-full text-left py-2 font-semibold text-white flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Home size={15} />
                Home
              </span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenProgrammesPage) {
                  onOpenProgrammesPage();
                } else {
                  handleNavClick('finder-section');
                }
              }}
              className="w-full text-left py-2 font-semibold text-white flex items-center justify-between"
            >
              <span>Academic Programmes</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenFacultyPage) {
                  onOpenFacultyPage();
                } else {
                  handleNavClick('faculty-section');
                }
              }}
              className="w-full text-left py-2 font-semibold text-white flex items-center justify-between"
            >
              <span>Our Faculty</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenProgrammesPage) onOpenProgrammesPage();
                else handleNavClick('finder-section');
              }}
              className="w-full text-left py-2 font-semibold text-white flex items-center justify-between"
            >
              <span>Academics & Programmes</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenProgrammesPage) onOpenProgrammesPage('bs-business-analytics');
              }}
              className="w-full text-left py-1 text-slate-300 hover:text-white text-xs pl-2 flex items-center justify-between"
            >
              <span>• BS Programmes</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenProgrammesPage) onOpenProgrammesPage('adp-psychology');
              }}
              className="w-full text-left py-1 text-slate-300 hover:text-white text-xs pl-2 flex items-center justify-between"
            >
              <span>• ADP / ADS Programmes</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenProgrammesPage) onOpenProgrammesPage();
                else handleNavClick('finder-section');
              }}
              className="w-full text-left py-1 text-slate-300 hover:text-white text-xs pl-2 flex items-center justify-between cursor-pointer"
            >
              <span>• Curriculum & Program Roadmaps</span>
              <span className="text-amber-300">↗</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenScholarshipsPage) onOpenScholarshipsPage();
                else window.open('https://ucpcolleges.pgc.edu/scholarship/', '_blank', 'noopener,noreferrer');
              }}
              className="w-full text-left py-1 text-slate-300 hover:text-white text-xs pl-2 flex items-center justify-between cursor-pointer"
            >
              <span>• Scholarships & Concessions (1.3B PKR)</span>
              <span className="text-amber-300">↗</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFee();
              }}
              className="w-full text-left py-1 text-slate-300 hover:text-white text-xs pl-2 flex items-center justify-between cursor-pointer"
            >
              <span>• Fee Structure & Tuition Schedules</span>
              <span className="text-amber-300">→</span>
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <button
              onClick={() => { 
                setMobileMenuOpen(false); 
                if (onOpenProgrammesPage) onOpenProgrammesPage();
                else onOpenInfo('merit-list'); 
              }}
              className="w-full text-left py-1.5 text-slate-200 hover:text-white"
            >
              Academic Programs
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCalendar) onOpenCalendar();
                else onOpenInfo('academic-calendar');
              }}
              className="w-full text-left py-1.5 text-slate-200 hover:text-white flex items-center justify-between cursor-pointer"
            >
              <span>Academic Calendar (Official)</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); handleNavClick('location-section'); }}
              className="w-full text-left py-1.5 text-slate-200 hover:text-white flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[#a30f16]" />
                <span className="text-white font-medium">Our Location</span>
              </span>
            </button>
            <button
              onClick={() => handleNavClick('leadership-section')}
              className="w-full text-left py-1.5 text-slate-200 hover:text-white"
            >
              Our Leadership
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('vision-rankings-section');
              }}
              className="w-full text-left py-1.5 text-slate-200 hover:text-white flex items-center justify-between"
            >
              <span>Vision & Rankings</span>
            </button>
            <button
              onClick={() => { 
                setMobileMenuOpen(false); 
                if (onOpenLegacyPage) onOpenLegacyPage(); 
              }}
              className="w-full text-left py-1.5 text-slate-200 hover:text-amber-300 flex items-center justify-between"
            >
              <span>Our Legacy</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full text-left py-1.5 text-slate-200 hover:text-amber-300 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-amber-400" />
                <span>Student Portal</span>
              </span>
              <span className="text-xs text-amber-300">Login ↗</span>
            </button>
            <button
              onClick={() => { 
                setMobileMenuOpen(false); 
                if (onOpenCnnAcademyPage) {
                  onOpenCnnAcademyPage();
                } else {
                  onSelectFaculty('fmmc');
                }
              }}
              className="w-full text-left py-1.5 text-slate-200 hover:text-white flex items-center justify-between"
            >
              <span>CNN Academy at UCP</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenInfo('ucp-online'); }}
              className="w-full text-left py-1.5 text-slate-200 hover:text-white"
            >
              UCP Online (Distance Education)
            </button>

            {/* Official Mobile Appearance Mode Toggle */}
            <ThemeToggle variant="drawer" />
          </div>
        </div>
      )}

      {/* =========================================================================
          GLOBAL SEARCH MODAL (Spotlight / Command Palette style)
          ========================================================================= */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-6 animate-in fade-in duration-150"
          onClick={() => setIsSearchOpen(false)}
        >
          <div 
            className="w-full max-w-2xl bg-white rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-slate-200 overflow-hidden flex flex-col max-h-[82vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Site Search Dialog"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-slate-200 bg-slate-50/90">
              <Search size={20} className="text-[#C8102E] shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search degree programmes, fees, admissions, scholarships, calendar..."
                className="w-full text-sm sm:text-base text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-full transition-colors cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X size={16} />
                </button>
              )}
              <kbd className="hidden sm:inline-block text-[10px] font-mono font-semibold px-2 py-0.5 bg-white border border-slate-300 rounded shadow-2xs text-slate-500">
                ESC
              </kbd>
            </div>

            {/* Category Filter Pills (if query typed) */}
            {searchQuery.trim() && (
              <div className="flex items-center gap-1.5 px-4 sm:px-5 py-2 border-b border-slate-100 bg-white text-xs font-sans">
                <span className="text-slate-400 text-[11px] font-medium mr-1">Filter:</span>
                <button
                  type="button"
                  onClick={() => setSearchFilter('all')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                    searchFilter === 'all'
                      ? 'bg-[#0A1931] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({searchResults.programmes.length + searchResults.pages.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSearchFilter('programs')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                    searchFilter === 'programs'
                      ? 'bg-[#0A1931] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Degrees ({searchResults.programmes.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSearchFilter('pages')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                    searchFilter === 'pages'
                      ? 'bg-[#0A1931] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Pages &amp; Portals ({searchResults.pages.length})
                </button>
              </div>
            )}

            {/* Results Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 max-h-[60vh]">
              {/* When query is empty: Trending & Quick Access */}
              {!searchQuery.trim() ? (
                <div className="space-y-5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5 font-sans">
                      Popular Searches
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Artificial Intelligence',
                        'Computer Science',
                        'Software Engineering',
                        'Cyber Security',
                        'Business Analytics',
                        'Fee Structure',
                        'Scholarships',
                        'Psychology',
                        'Biotechnology',
                        'Academic Calendar',
                        'Admissions Fall 2026',
                        'Campus Contact'
                      ].map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setSearchQuery(term)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-[#0A1931] text-slate-700 hover:text-white rounded-lg text-xs font-medium transition-colors cursor-pointer border border-slate-200/80 font-sans"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5 font-sans">
                      Quick Portals &amp; Tools
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {campusPages.slice(0, 6).map((page) => {
                        const Icon = page.icon;
                        return (
                          <button
                            key={page.id}
                            type="button"
                            onClick={page.action}
                            className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-[#C8102E] hover:bg-slate-50 transition-all text-left cursor-pointer group"
                          >
                            <div className="p-2 rounded-lg bg-[#0A1931] text-white group-hover:bg-[#C8102E] transition-colors shrink-0 mt-0.5">
                              <Icon size={16} />
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-xs text-slate-800 group-hover:text-[#0A1931]">
                                {page.title}
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {page.description}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* Filtered Search Results */
                <div className="space-y-4">
                  {/* Matching Programmes */}
                  {(searchFilter === 'all' || searchFilter === 'programs') && searchResults.programmes.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8102E] font-sans">
                          Academic Degree Programmes ({searchResults.programmes.length})
                        </span>
                      </div>
                      <div className="space-y-2">
                        {searchResults.programmes.map((prog) => (
                          <div
                            key={prog.id}
                            onClick={() => {
                              setIsSearchOpen(false);
                              if (onOpenProgrammesPage) onOpenProgrammesPage(prog.id);
                              else handleNavClick('academic-programmes-section');
                            }}
                            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0A1931] rounded-xl transition-all cursor-pointer group flex items-center justify-between gap-3 shadow-2xs"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                  prog.level === 'Undergraduate'
                                    ? 'bg-[#0A1931] text-white'
                                    : 'bg-[#C8102E] text-white'
                                }`}>
                                  {prog.degree}
                                </span>
                                <span className="text-[11px] text-slate-500 font-medium font-sans">
                                  {prog.category}
                                </span>
                              </div>
                              <h4 className="font-bold text-sm text-slate-800 group-hover:text-[#0A1931] leading-tight font-sans">
                                {prog.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 font-sans">
                                {prog.about}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-mono font-bold text-[#0A1931] block">
                                {prog.creditHours} CH
                              </span>
                              <span className="text-[10px] text-slate-400 font-sans block mt-0.5">
                                View details →
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Pages */}
                  {(searchFilter === 'all' || searchFilter === 'pages') && searchResults.pages.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                          Campus Portals &amp; Sections ({searchResults.pages.length})
                        </span>
                      </div>
                      <div className="space-y-2">
                        {searchResults.pages.map((page) => {
                          const Icon = page.icon;
                          return (
                            <div
                              key={page.id}
                              onClick={page.action}
                              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#C8102E] rounded-xl transition-all cursor-pointer group flex items-center justify-between gap-3 shadow-2xs"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="p-2 rounded-lg bg-[#0A1931] text-white group-hover:bg-[#C8102E] transition-colors shrink-0">
                                  <Icon size={16} />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#0A1931] font-sans">
                                    {page.title}
                                  </h4>
                                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-sans">
                                    {page.description}
                                  </p>
                                </div>
                              </div>
                              <ArrowRight size={15} className="text-slate-400 group-hover:text-[#C8102E] group-hover:translate-x-0.5 transition-all shrink-0" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* No Results Fallback */}
                  {searchResults.programmes.length === 0 && searchResults.pages.length === 0 && (
                    <div className="py-12 text-center">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                        <Search size={22} />
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm font-sans">
                        No results found for &ldquo;{searchQuery}&rdquo;
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-sans">
                        Try searching for keywords like &ldquo;Computer Science&rdquo;, &ldquo;Fee Structure&rdquo;, &ldquo;AI&rdquo;, or &ldquo;Scholarships&rdquo;.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          if (onOpenProgrammesPage) onOpenProgrammesPage();
                        }}
                        className="mt-4 px-4 py-2 bg-[#0A1931] hover:bg-[#C8102E] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Browse All Degree Programmes
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer with keyboard navigation hint */}
            <div className="px-5 py-2.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-sans">
              <span>Press <kbd className="px-1 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono">ESC</kbd> to close</span>
              <span>UCP Bahawalpur Campus Search</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
