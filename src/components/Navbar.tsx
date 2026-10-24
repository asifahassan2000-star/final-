import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, ChevronRight, Search, GraduationCap, Building2, 
  Award, Globe, Newspaper, PhoneCall, BookOpen, Compass,
  Sparkles, CheckCircle2, User, ExternalLink, ShieldCheck,
  Video, Laptop, Lightbulb, FileText, ArrowRight, ArrowLeft, Calendar,
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
  onOpenCampusFacilitiesPage?: () => void;
  onOpenAboutUsPage?: () => void;
  onBackToHome?: () => void;
  currentPage?: 'home' | 'faculty' | 'programmes' | 'legacy' | 'campus-life' | 'scholarships' | 'fee-structure' | 'cnn-academy' | 'calendar' | 'campus-facilities' | 'about-us';
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
  onOpenCampusFacilitiesPage,
  onOpenAboutUsPage,
  onBackToHome,
  currentPage = 'home',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileAccordions, setOpenMobileAccordions] = useState<Record<string, boolean>>({
    academics: false,
  });

  const toggleMobileAccordion = (key: string) => {
    setOpenMobileAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Global Site Search States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState<'all' | 'programs' | 'pages'>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Easter egg: 5 fast clicks on main UCP header logo within 3 seconds
  const logoClicksRef = useRef<number[]>([]);
  const handleLogoClick = () => {
    const now = Date.now();
    const recentClicks = [...logoClicksRef.current.filter((t) => now - t <= 3000), now];
    logoClicksRef.current = recentClicks;

    if (recentClicks.length >= 5) {
      logoClicksRef.current = [];
      window.dispatchEvent(new CustomEvent('show-ucp-secret-toast'));
    }

    if (currentPage !== 'home' && onBackToHome) {
      onBackToHome();
    } else {
      handleNavClick('top');
    }
  };

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

  // Close desktop dropdowns on outside click or Escape
  useEffect(() => {
    if (!activeDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#nav-admissions-wrapper') && !target.closest('#nav-about-wrapper')) {
        setActiveDropdown(null);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [activeDropdown]);


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
      className="sticky top-0 z-[100] transition-all duration-300"
    >
      {/* Top Blue Header: Like before, original compact height */}
      <div 
        className={`transition-all duration-300 ${
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
              onClick={handleLogoClick}
            />

          {/* Desktop Navigation Links - Official, clean, balanced and spacious */}
          <nav 
            onMouseEnter={() => (window as any).__preloadSubpages?.()}
            onTouchStart={() => (window as any).__preloadSubpages?.()}
            className="hidden lg:flex items-center space-x-2 xl:space-x-4 text-[14px] font-medium text-white whitespace-nowrap shrink-0"
          >
            
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
              id="nav-admissions-wrapper"
              className="relative shrink-0"
              onMouseEnter={() => setActiveDropdown('admissions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-admissions-btn"
                type="button"
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
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 mt-2 w-[275px] bg-white dark:bg-[#071322] rounded-md shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden z-[110] font-sans"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href="https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActiveDropdown(null)}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block border-b border-[#f3f4f6] dark:border-white/10 cursor-pointer"
                    >
                      Apply Online
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveDropdown(null);
                        onOpenFee();
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block border-b border-[#f3f4f6] dark:border-white/10 cursor-pointer"
                    >
                      Fee Structure &amp; Programs
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveDropdown(null);
                        if (onOpenScholarshipsPage) onOpenScholarshipsPage();
                        else window.open('https://ucpcolleges.pgc.edu/scholarship/', '_blank', 'noopener,noreferrer');
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block border-b border-[#f3f4f6] dark:border-white/10 cursor-pointer"
                    >
                      Scholarships &amp; Concessions
                    </button>

                    <button
                      type="button"
                      onClick={() => { 
                        setActiveDropdown(null); 
                        if (onOpenProgrammesPage) onOpenProgrammesPage();
                        else onOpenInfo('merit-list'); 
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block border-b border-[#f3f4f6] dark:border-white/10 cursor-pointer"
                    >
                      Academic Programs
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveDropdown(null);
                        if (onOpenCalendar) onOpenCalendar();
                        else onOpenInfo('academic-calendar');
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block border-b border-[#f3f4f6] dark:border-white/10 cursor-pointer"
                    >
                      Academic Calendar
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
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block cursor-pointer"
                    >
                      Eligibility &amp; Criteria
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
              id="nav-about-wrapper"
              className="relative shrink-0"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-about-btn"
                type="button"
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
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 xl:left-auto xl:right-0 mt-2 w-[295px] bg-white dark:bg-[#071322] rounded-md shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden z-[110] font-sans"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      id="nav-dropdown-about-us-btn"
                      type="button"
                      onClick={() => { 
                        setActiveDropdown(null); 
                        if (onOpenAboutUsPage) {
                          onOpenAboutUsPage();
                        }
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block border-b border-[#f3f4f6] dark:border-white/10 cursor-pointer"
                    >
                      About Us (Our Story &amp; Vision)
                    </button>

                    <button
                      id="nav-dropdown-location-btn"
                      type="button"
                      onClick={() => { setActiveDropdown(null); handleNavClick('location-section'); }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block border-b border-[#f3f4f6] dark:border-white/10 cursor-pointer"
                    >
                      Our Location (Map &amp; Directions)
                    </button>

                    <button
                      type="button"
                      onClick={() => { setActiveDropdown(null); handleNavClick('leadership-section'); }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block border-b border-[#f3f4f6] dark:border-white/10 cursor-pointer"
                    >
                      Our Leadership
                    </button>

                    <button
                      type="button"
                      onClick={() => { setActiveDropdown(null); handleNavClick('vision-rankings-section'); }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block border-b border-[#f3f4f6] dark:border-white/10 cursor-pointer"
                    >
                      Vision &amp; Rankings
                    </button>

                    <button
                      id="nav-dropdown-campus-facilities-btn"
                      type="button"
                      onClick={() => { 
                        setActiveDropdown(null); 
                        if (onOpenCampusFacilitiesPage) {
                          onOpenCampusFacilitiesPage();
                        } else {
                          handleNavClick('facilities-section');
                        }
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block border-b border-[#f3f4f6] dark:border-white/10 cursor-pointer"
                    >
                      Campus Facilities
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
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block border-b border-[#f3f4f6] dark:border-white/10 cursor-pointer"
                    >
                      Campus Life &amp; Activities
                    </button>

                    <button
                      id="nav-dropdown-our-legacy-btn"
                      type="button"
                      onClick={() => { 
                        setActiveDropdown(null); 
                        if (onOpenLegacyPage) onOpenLegacyPage(); 
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block border-b border-[#f3f4f6] dark:border-white/10 cursor-pointer"
                    >
                      Our Legacy
                    </button>

                    <button
                      type="button"
                      onClick={() => { setActiveDropdown(null); onOpenInfo('harassment-policy'); }}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#C8102E] dark:hover:text-[#F3D368] transition-colors block cursor-pointer"
                    >
                      Harassment Protection Policy
                    </button>
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

          {/* Right Header Area: Minimal Search Icon (Mobile & Desktop) + Mobile Menu Toggle Icon */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Small Minimal Search Icon on top (both mobile and desktop view) */}
            <button
              id="header-search-btn"
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 active:bg-white/15 border border-white/20 hover:border-white/35 transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 shadow-xs"
              title="Search UCP Programmes & Pages (Ctrl+K)"
              aria-label="Search site"
            >
              <Search size={17} className="text-white" />
            </button>

            {/* Mobile menu toggle button — Just icon on mobile, no text */}
            {/* Mobile menu toggle button */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#0B1A3A] text-white border border-[#183a66] hover:bg-[#07152d] transition-all duration-200 focus:outline-none cursor-pointer shadow-md shrink-0 z-10 flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={18} className="text-white" />
              ) : (
                <Menu size={18} className="text-white" />
              )}
            </button>
          </div>

        </div>
      </div>
    </div>

      {/* =======================================================================
          RED SUB-HEADER (Stanford Cardinal Red Style):
          - Placed directly under the top blue header with 0px space.
          - ONLY for About Us page ('about-us') as requested.
          - Removed from other pages.
          - Zero blue part visible under the red header.
      ======================================================================= */}
      {currentPage === 'about-us' && (
        <div className="bg-[#B31B1B] text-white py-2.5 sm:py-3 px-4 sm:px-6 lg:px-12 border-b border-[#9E1818] shadow-sm select-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div 
              onClick={() => {
                if (onBackToHome) onBackToHome();
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <span className="font-['Source_Serif_4','Source_Serif_Pro','Times_New_Roman',serif] text-lg sm:text-xl font-normal text-white tracking-tight">
                UCP Bahawalpur
              </span>
              <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.14em] text-white/80 font-sans border-l border-white/30 pl-3">
                Constituent College
              </span>
            </div>

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
                  className="bg-white text-[#B31B1B] hover:bg-white/95 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-semibold uppercase tracking-[0.08em] text-[11px] transition-all cursor-pointer shadow-xs"
                >
                  Apply Online
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/60 z-[120] transition-opacity backdrop-blur-[2px]"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Full-screen drawer from right, crisp light/dark mode background, width 320px, with X close button */}
          <div 
            className="fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-white dark:bg-[#071322] text-[#0B1A3A] dark:text-white z-[125] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 border-l border-slate-200/80 dark:border-white/10"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
          >
            {/* Top of drawer: Logo, Campus identity, and close button */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-[#f3f4f6] dark:border-white/10 shrink-0 bg-white dark:bg-[#09182b]">
              <div 
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (currentPage !== 'home' && onBackToHome) {
                    onBackToHome();
                  } else {
                    handleNavClick('top');
                  }
                }}
              >
                <img
                  src="/assets/ucp-official-logo.png"
                  alt="UCP Logo"
                  className="w-9 h-9 object-contain shrink-0"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallbackTried) {
                      img.dataset.fallbackTried = 'true';
                      img.src = '/images/BVZkCkFf_e4f3a018-e327-765a-db91-e468a8c6672d-4596-F431-6479-4-D27-A36-B-9750-DA25-F303.jpg';
                    }
                  }}
                />
                <div className="flex flex-col">
                  <span 
                    className="text-[#0B1A3A] dark:text-white text-[13px] sm:text-[14px] font-normal leading-tight whitespace-nowrap"
                    style={{ fontFamily: "'UnifrakturMaguntia', 'MedievalSharp', serif" }}
                  >
                    University of Central Punjab
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold text-[8px] tracking-[0.18em] uppercase">
                    Bahawalpur Campus
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-md text-[#0B1A3A] dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X size={20} className="text-[#0B1A3A] dark:text-white" />
              </button>
            </div>

            {/* Menu Items: Crisp typography and proper high-contrast text in both light and dark mode */}
            <div className="flex-1 overflow-y-auto bg-white dark:bg-[#071322]">
              {/* Home */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (currentPage !== 'home' && onBackToHome) {
                    onBackToHome();
                  } else {
                    handleNavClick('top');
                  }
                }}
                className="w-full text-left text-[15px] font-semibold text-[#0B1A3A] dark:text-slate-100 p-4 border-b border-[#f3f4f6] dark:border-white/10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>Home</span>
              </button>

              {/* About Us (Our Story & Vision) */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAboutUsPage) {
                    onOpenAboutUsPage();
                  }
                }}
                className="w-full text-left text-[15px] font-semibold text-[#0B1A3A] dark:text-slate-100 p-4 border-b border-[#f3f4f6] dark:border-white/10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>About Us (Our Story &amp; Vision)</span>
                <ChevronRight size={16} className="text-[#6B7280] dark:text-slate-400" />
              </button>

              {/* Campus Life */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCampusLifePage) {
                    onOpenCampusLifePage();
                  } else {
                    handleNavClick('campus-section');
                  }
                }}
                className="w-full text-left text-[15px] font-semibold text-[#0B1A3A] dark:text-slate-100 p-4 border-b border-[#f3f4f6] dark:border-white/10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>Campus Life</span>
                <ChevronRight size={16} className="text-[#6B7280] dark:text-slate-400" />
              </button>

              {/* Academics & Programmes (Accordion with sub-items) */}
              <div className="border-b border-[#f3f4f6] dark:border-white/10">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion('academics')}
                  className="w-full text-left text-[15px] font-semibold text-[#0B1A3A] dark:text-slate-100 p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  aria-expanded={openMobileAccordions.academics}
                >
                  <span>Academics &amp; Programmes</span>
                  <ChevronRight 
                    size={16} 
                    className={`text-[#6B7280] dark:text-slate-400 transition-transform duration-200 ${
                      openMobileAccordions.academics ? 'rotate-90 text-[#0B1A3A] dark:text-amber-400' : ''
                    }`} 
                  />
                </button>

                {openMobileAccordions.academics && (
                  <div className="bg-slate-50/80 dark:bg-[#0a182c] border-t border-[#f3f4f6] dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onOpenProgrammesPage) onOpenProgrammesPage('bs-business-analytics');
                      }}
                      className="w-full text-left text-[13.5px] font-medium text-slate-600 dark:text-slate-300 py-3 pl-8 pr-4 hover:text-[#0B1A3A] dark:hover:text-amber-300 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors cursor-pointer block border-b border-[#f3f4f6]/60 dark:border-white/5"
                    >
                      BS Programmes (4-Year Degrees)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onOpenProgrammesPage) onOpenProgrammesPage('adp-psychology');
                      }}
                      className="w-full text-left text-[13.5px] font-medium text-slate-600 dark:text-slate-300 py-3 pl-8 pr-4 hover:text-[#0B1A3A] dark:hover:text-amber-300 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors cursor-pointer block border-b border-[#f3f4f6]/60 dark:border-white/5"
                    >
                      ADP / ADS Programmes (2-Year Degrees)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onOpenProgrammesPage) onOpenProgrammesPage();
                        else handleNavClick('finder-section');
                      }}
                      className="w-full text-left text-[13.5px] font-medium text-slate-600 dark:text-slate-300 py-3 pl-8 pr-4 hover:text-[#0B1A3A] dark:hover:text-amber-300 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors cursor-pointer block border-b border-[#f3f4f6]/60 dark:border-white/5"
                    >
                      Curriculum &amp; Program Roadmaps
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onOpenScholarshipsPage) onOpenScholarshipsPage();
                        else window.open('https://ucpcolleges.pgc.edu/scholarship/', '_blank', 'noopener,noreferrer');
                      }}
                      className="w-full text-left text-[13.5px] font-medium text-slate-600 dark:text-slate-300 py-3 pl-8 pr-4 hover:text-[#0B1A3A] dark:hover:text-amber-300 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors cursor-pointer block border-b border-[#f3f4f6]/60 dark:border-white/5"
                    >
                      Scholarships &amp; Concessions (1.3B PKR)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenFee();
                      }}
                      className="w-full text-left text-[13.5px] font-medium text-slate-600 dark:text-slate-300 py-3 pl-8 pr-4 hover:text-[#0B1A3A] dark:hover:text-amber-300 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors cursor-pointer block border-b border-[#f3f4f6]/60 dark:border-white/5"
                    >
                      Fee Structure &amp; Tuition Schedules
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onOpenProgrammesPage) onOpenProgrammesPage();
                        else onOpenInfo('merit-list');
                      }}
                      className="w-full text-left text-[13.5px] font-medium text-slate-600 dark:text-slate-300 py-3 pl-8 pr-4 hover:text-[#0B1A3A] dark:hover:text-amber-300 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors cursor-pointer block"
                    >
                      Academic Programs Directory
                    </button>
                  </div>
                )}
              </div>

              {/* Our Faculty */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenFacultyPage) {
                    onOpenFacultyPage();
                  } else {
                    handleNavClick('faculty-section');
                  }
                }}
                className="w-full text-left text-[15px] font-semibold text-[#0B1A3A] dark:text-slate-100 p-4 border-b border-[#f3f4f6] dark:border-white/10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>Our Faculty</span>
                <ChevronRight size={16} className="text-[#6B7280] dark:text-slate-400" />
              </button>

              {/* Academic Calendar */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCalendar) onOpenCalendar();
                  else onOpenInfo('academic-calendar');
                }}
                className="w-full text-left text-[15px] font-semibold text-[#0B1A3A] dark:text-slate-100 p-4 border-b border-[#f3f4f6] dark:border-white/10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>Academic Calendar (Official)</span>
                <ChevronRight size={16} className="text-[#6B7280] dark:text-slate-400" />
              </button>

              {/* Campus Facilities */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCampusFacilitiesPage) {
                    onOpenCampusFacilitiesPage();
                  } else {
                    handleNavClick('facilities-section');
                  }
                }}
                className="w-full text-left text-[15px] font-semibold text-[#0B1A3A] dark:text-slate-100 p-4 border-b border-[#f3f4f6] dark:border-white/10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>Campus Facilities</span>
                <ChevronRight size={16} className="text-[#6B7280] dark:text-slate-400" />
              </button>

              {/* Our Location */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('location-section');
                }}
                className="w-full text-left text-[15px] font-semibold text-[#0B1A3A] dark:text-slate-100 p-4 border-b border-[#f3f4f6] dark:border-white/10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>Our Location</span>
                <ChevronRight size={16} className="text-[#6B7280] dark:text-slate-400" />
              </button>

              {/* Our Leadership */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('leadership-section');
                }}
                className="w-full text-left text-[15px] font-semibold text-[#0B1A3A] dark:text-slate-100 p-4 border-b border-[#f3f4f6] dark:border-white/10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>Our Leadership</span>
                <ChevronRight size={16} className="text-[#6B7280] dark:text-slate-400" />
              </button>

              {/* Vision & Rankings */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('vision-rankings-section');
                }}
                className="w-full text-left text-[15px] font-semibold text-[#0B1A3A] dark:text-slate-100 p-4 border-b border-[#f3f4f6] dark:border-white/10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>Vision &amp; Rankings</span>
                <ChevronRight size={16} className="text-[#6B7280] dark:text-slate-400" />
              </button>

              {/* Our Legacy */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenLegacyPage) onOpenLegacyPage();
                }}
                className="w-full text-left text-[15px] font-semibold text-[#0B1A3A] dark:text-slate-100 p-4 border-b border-[#f3f4f6] dark:border-white/10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>Our Legacy</span>
                <ChevronRight size={16} className="text-[#6B7280] dark:text-slate-400" />
              </button>
            </div>

            {/* Bottom of drawer: 2 buttons - Student Portal and Admissions Portal */}
            <div className="p-4 border-t border-[#f3f4f6] dark:border-white/10 space-y-2.5 bg-white dark:bg-[#09182b] shrink-0">
              <a
                href="https://mcom.pgc.edu.pk/Student/StdLogin.jsp"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 bg-[#0B1A3A] hover:bg-[#07152d] dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg font-semibold text-[14px] flex items-center justify-center gap-2 shadow-xs transition-colors border border-transparent dark:border-white/15 cursor-pointer"
              >
                <span>Student Portal</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className="w-full py-2.5 px-4 bg-[#C8102E] hover:bg-[#A51C30] text-white rounded-lg font-semibold text-[14px] flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Admissions Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          GLOBAL SEARCH MODAL (Spotlight / Command Palette style)
          ========================================================================= */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-[130] bg-black/70 backdrop-blur-xs flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-6 animate-in fade-in duration-150"
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
