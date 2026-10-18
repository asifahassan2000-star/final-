import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, Search, GraduationCap, Building2, 
  Award, Globe, Newspaper, PhoneCall, BookOpen, Compass,
  Sparkles, CheckCircle2, User, ExternalLink, ShieldCheck,
  Video, Laptop, Lightbulb, FileText, ArrowRight, Calendar,
  Home, MapPin
} from 'lucide-react';
import { UcpLogo } from './UcpLogo';
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
  onOpenScholarshipsPage?: () => void;
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

  type NavItemId = 'home' | 'about' | 'programs' | 'campus-life' | 'facilities' | 'admissions' | 'contact';
  const [activeNav, setActiveNav] = useState<NavItemId>('home');

  const bsProgrammes = OFFICIAL_BAHAWALPUR_PROGRAMMES.filter((p) => p.level === 'Undergraduate');
  const adpProgrammes = OFFICIAL_BAHAWALPUR_PROGRAMMES.filter((p) => p.level === 'Associate Degree');

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
          <nav className="hidden lg:flex items-center space-x-1.5 xl:space-x-3 text-[14px] font-medium text-white">
            
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
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 hover:text-white hover:bg-white/10 focus:outline-none cursor-pointer ${
                currentPage === 'home' ? 'text-white bg-white/15 font-bold shadow-xs' : 'text-white font-medium'
              }`}
            >
              <Home size={15} className="text-white shrink-0" />
              <span className="text-white">Home</span>
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
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 hover:text-white hover:bg-white/10 focus:outline-none cursor-pointer ${
                currentPage === 'programmes' ? 'text-white bg-white/15 font-bold shadow-xs' : 'text-white font-medium'
              }`}
            >
              <GraduationCap size={15} className="text-white shrink-0" />
              <span className="text-white">Academics</span>
            </button>

            {/* 2. Admissions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('admissions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-admissions-btn"
                onClick={() => {
                  setActiveDropdown(activeDropdown === 'admissions' ? null : 'admissions');
                }}
                className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 hover:text-white hover:bg-white/10 focus:outline-none cursor-pointer ${
                  activeDropdown === 'admissions' ? 'text-white bg-white/15 font-bold shadow-xs' : 'text-white font-medium'
                }`}
              >
                <span>Admissions</span>
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

                    <a
                      href="https://ucp.edu.pk/rules-regulations/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActiveDropdown(null)}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] flex items-center justify-between text-[#333333]"
                    >
                      <span>Rules & Regulations</span>
                      <span className="text-[11px] text-[#666666]">↗</span>
                    </a>

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
                        if (onOpenProgrammesPage) onOpenProgrammesPage();
                        else handleNavClick('finder-section'); 
                      }}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] flex items-center justify-between text-[#333333] cursor-pointer"
                    >
                      <span>Eligibility & Criteria</span>
                    </button>

                    <a
                      href="https://ucp.edu.pk/faqs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActiveDropdown(null)}
                      className="w-full text-left py-[8px] px-[14px] rounded-[6px] hover:bg-[#F5F5F5] flex items-center justify-between text-[#333333]"
                    >
                      <span>Admissions & Campus FAQs</span>
                      <span className="text-[11px] text-[#666666]">↗</span>
                    </a>
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
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 hover:text-white hover:bg-white/10 focus:outline-none font-medium cursor-pointer ${
                currentPage === 'faculty' ? 'text-white bg-white/15 font-bold shadow-xs' : 'text-white'
              }`}
            >
              <span>Our Faculty</span>
            </button>

            {/* 3b. Our Legacy (UCP Bahawalpur) - Dedicated Page */}
            <button
              id="nav-legacy-btn"
              onClick={() => {
                if (onOpenLegacyPage) {
                  onOpenLegacyPage();
                }
              }}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 hover:text-white hover:bg-white/10 focus:outline-none font-medium cursor-pointer ${
                currentPage === 'legacy' ? 'text-white bg-white/15 font-bold shadow-xs' : 'text-white'
              }`}
            >
              <span>Our Legacy</span>
            </button>

            {/* 4. About Dropdown (All items organized in this folder) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-about-btn"
                onClick={() => {
                  setActiveDropdown(activeDropdown === 'about' ? null : 'about');
                }}
                className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 hover:text-white hover:bg-white/10 focus:outline-none cursor-pointer ${
                  activeDropdown === 'about' ? 'text-white bg-white/15 font-bold shadow-xs' : 'text-white font-medium'
                }`}
              >
                <span>About</span>
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
                      onClick={() => { setActiveDropdown(null); handleNavClick('stats-section'); }}
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

            {/* 4. Student Login Portal (mcom.pgc.edu.pk) */}
            <a
              id="nav-myucp-btn"
              href="https://mcom.pgc.edu.pk/Student/StdLogin.jsp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg hover:text-amber-300 hover:bg-white/5 transition-colors focus:outline-none font-medium flex items-center gap-1.5 text-white"
            >
              <User size={14} className="text-emerald-400" />
              <span>Portal Login</span>
            </a>

          </nav>

          {/* Right Header Area: Search & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              id="header-search-btn"
              onClick={() => handleNavClick('finder-section')}
              className="p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden sm:flex items-center justify-center focus:outline-none cursor-pointer"
              title="Search Courses & Degrees"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Mobile menu toggle button — Clean official university style */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-white/10 hover:bg-white/15 active:bg-white/20 text-white border border-white/20 transition-all duration-200 focus:outline-none cursor-pointer shadow-xs"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <>
                  <X size={16} className="text-amber-300" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase font-sans">Close</span>
                </>
              ) : (
                <>
                  <Menu size={16} className="text-white" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase font-sans">Menu</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071b34] border-t border-slate-700/70 px-5 pt-4 pb-6 text-sm text-slate-100 space-y-3.5 shadow-2xl animate-in slide-in-from-top-3">
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
              <span>• BS Programmes (12 Degrees)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenProgrammesPage) onOpenProgrammesPage('adp-psychology');
              }}
              className="w-full text-left py-1 text-slate-300 hover:text-white text-xs pl-2 flex items-center justify-between"
            >
              <span>• ADP / ADS Programmes (13 Degrees)</span>
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
            <a
              href="https://ucp.edu.pk/rules-regulations/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left py-1 text-slate-300 hover:text-white text-xs pl-2 flex items-center justify-between"
            >
              <span>• Rules & Regulations</span>
              <span className="text-amber-300">↗</span>
            </a>
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
                if (onOpenLegacyPage) onOpenLegacyPage(); 
              }}
              className="w-full text-left py-1.5 text-slate-200 hover:text-amber-300 flex items-center justify-between"
            >
              <span>Our Legacy</span>
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
          </div>
        </div>
      )}
    </header>
  );
};
