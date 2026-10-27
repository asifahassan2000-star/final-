/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';

// Core Above-The-Fold Components for Instant LCP & First Paint
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { ThemeToggle } from './components/ThemeToggle';
import { ClickGlowManager } from './components/ClickGlowManager';
import { ScrollRevealManager } from './components/ScrollReveal';
import type { InfoModalType } from './components/UcpInfoModal';
import { Program, NewsEventItem } from './types';
import { FACULTIES, UCP_CONTACT } from './data/ucpData';

// Synchronously imported Homepage Sections for instant, zero-delay initial paint (<0.2s)
import { WelcomeUcpSection } from './components/WelcomeUcpSection';
import { FacultiesGrid } from './components/FacultiesGrid';
import { WhatWeOfferAccordion } from './components/WhatWeOfferAccordion';
import { FacultySection } from './components/FacultySection';
import { AboutCampusSection } from './components/AboutCampusSection';
import { StatisticsSection } from './components/StatisticsSection';
import { CampusFacilitiesPreview } from './components/CampusFacilitiesPreview';
import { OurLeadershipSection } from './components/OurLeadershipSection';
import { LeadershipImpactSection } from './components/LeadershipImpactSection';
import { CampusLife } from './components/CampusLife';
import { NewsAndEvents } from './components/NewsAndEvents';
import { AdmissionsExperienceSection } from './components/AdmissionsExperienceSection';
import { ClosingDramaticSection } from './components/ClosingDramaticSection';
import { Footer } from './components/Footer';
import { FloatingSideRibbons } from './components/FloatingSideRibbons';

// Lazy-loaded Subpage Loaders with Preload Capability for Instant Page Transitions
const loadFacultyPage = () => import('./components/FacultyPage').then(m => ({ default: m.FacultyPage }));
const loadAcademicProgrammesPage = () => import('./components/AcademicProgrammesPage').then(m => ({ default: m.AcademicProgrammesPage }));
const loadOurLegacyPage = () => import('./components/OurLegacyPage').then(m => ({ default: m.OurLegacyPage }));
const loadScholarshipsPage = () => import('./components/ScholarshipsPage').then(m => ({ default: m.ScholarshipsPage }));
const loadFeeStructurePage = () => import('./components/FeeStructurePage').then(m => ({ default: m.FeeStructurePage }));
const loadCampusLifePage = () => import('./components/CampusLifePage').then(m => ({ default: m.CampusLifePage }));
const loadCnnAcademyPage = () => import('./components/CnnAcademyPage').then(m => ({ default: m.CnnAcademyPage }));
const loadAcademicCalendarSection = () => import('./components/AcademicCalendarSection').then(m => ({ default: m.AcademicCalendarSection }));
const loadCampusFacilitiesPage = () => import('./components/CampusFacilitiesPage').then(m => ({ default: m.CampusFacilitiesPage }));
const loadAboutUsPage = () => import('./components/AboutUsPage').then(m => ({ default: m.AboutUsPage }));
const loadAsifaSecretPage = () => import('./components/AsifaSecretPage').then(m => ({ default: m.AsifaSecretPage }));

const FacultyPage = React.lazy(loadFacultyPage);
const AcademicProgrammesPage = React.lazy(loadAcademicProgrammesPage);
const OurLegacyPage = React.lazy(loadOurLegacyPage);
const ScholarshipsPage = React.lazy(loadScholarshipsPage);
const FeeStructurePage = React.lazy(loadFeeStructurePage);
const CampusLifePage = React.lazy(loadCampusLifePage);
const CnnAcademyPage = React.lazy(loadCnnAcademyPage);
const AcademicCalendarSection = React.lazy(loadAcademicCalendarSection);
const CampusFacilitiesPage = React.lazy(loadCampusFacilitiesPage);
const AboutUsPage = React.lazy(loadAboutUsPage);
const AsifaSecretPage = React.lazy(loadAsifaSecretPage);

export const preloadSubpages = () => {
  loadAcademicProgrammesPage();
  loadFacultyPage();
  loadOurLegacyPage();
  loadScholarshipsPage();
  loadFeeStructurePage();
  loadCampusLifePage();
  loadAcademicCalendarSection();
  loadCampusFacilitiesPage();
  loadAboutUsPage();
};

export type PageId = 'home' | 'faculty' | 'programmes' | 'legacy' | 'campus-life' | 'scholarships' | 'fee-structure' | 'cnn-academy' | 'calendar' | 'campus-facilities' | 'about-us' | 'developer';

const getPageFromHash = (): PageId => {
  if (typeof window === 'undefined') return 'home';
  const pathname = (window.location.pathname || '').replace(/^\/+|\/+$/g, '').toLowerCase();
  if (pathname === 'developer' || pathname === 'asifa' || pathname.startsWith('developer') || pathname.startsWith('asifa')) return 'developer';
  if (pathname === 'campus-facilities' || pathname === 'facilities') return 'campus-facilities';
  if (pathname === 'about-us' || pathname === 'about') return 'about-us';
  
  const rawHash = (window.location.hash || '').replace(/^#\/?/, '').toLowerCase();
  // Strip query parameters if present (e.g. #programmes?category=...)
  const hash = rawHash.split('?')[0].split('#')[0].trim();
  
  if (hash === 'developer' || hash === 'asifa') return 'developer';
  if (hash === 'campus-facilities' || hash === 'facilities' || hash === 'facility' || hash === 'labs') return 'campus-facilities';
  if (hash === 'about-us' || hash === 'about') return 'about-us';
  if (hash === 'programmes' || hash === 'programs' || hash === 'academics' || hash === 'academic' || hash === 'courses' || hash === 'degrees') return 'programmes';
  if (hash === 'faculty' || hash === 'teachers' || hash === 'professors') return 'faculty';
  if (hash === 'legacy' || hash === 'history') return 'legacy';
  if (hash === 'campus-life' || hash === 'campuslife' || hash === 'student-life') return 'campus-life';
  if (hash === 'scholarships' || hash === 'scholarship') return 'scholarships';
  if (hash === 'fee-structure' || hash === 'fees' || hash === 'fee' || hash === 'fee-calculator' || hash === 'tuition') return 'fee-structure';
  if (hash === 'calendar' || hash === 'academic-calendar') return 'calendar';
  if (hash === 'cnn-academy') return 'cnn-academy';
  return 'home';
};

// Lazy-loaded Modals & Chatbot for zero upfront overhead
const ApplyModal = React.lazy(() => import('./components/ApplyModal').then(m => ({ default: m.ApplyModal })));
const FeeCalculatorModal = React.lazy(() => import('./components/FeeCalculatorModal').then(m => ({ default: m.FeeCalculatorModal })));
const StudentPortalModal = React.lazy(() => import('./components/StudentPortalModal').then(m => ({ default: m.StudentPortalModal })));
const ProgramDetailModal = React.lazy(() => import('./components/ProgramDetailModal').then(m => ({ default: m.ProgramDetailModal })));
const ArticleModal = React.lazy(() => import('./components/ArticleModal').then(m => ({ default: m.ArticleModal })));
const UcpInfoModal = React.lazy(() => import('./components/UcpInfoModal').then(m => ({ default: m.UcpInfoModal })));
const UcpChatbot = React.lazy(() => import('./components/UcpChatbot').then(m => ({ default: m.UcpChatbot })));

export default function App() {
  // Navigation / Page state initialized from URL hash for direct access and refresh
  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);
  const [facultyCategory, setFacultyCategory] = useState<string>('all');
  const [selectedProgrammeId, setSelectedProgrammeId] = useState<string | null>(null);
  const [selectedProgrammeCategory, setSelectedProgrammeCategory] = useState<string | null>(null);
  const [scholarshipSectionId, setScholarshipSectionId] = useState<string | null>(null);

  // Modal states
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isFeeOpen, setIsFeeOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [selectedInfoModal, setSelectedInfoModal] = useState<InfoModalType | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsEventItem | null>(null);
  const [preselectedProgramName, setPreselectedProgramName] = useState<string>('');
  const [mountChat, setMountChat] = useState(false);

  // Idle preloader: Delay warming subpage bundles until after initial render is fully idle
  useEffect(() => {
    (window as any).__preloadSubpages = preloadSubpages;
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(preloadSubpages);
      } else {
        preloadSubpages();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Defer chatbot mount to keep critical first paint completely free
  useEffect(() => {
    const timer = setTimeout(() => setMountChat(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Lenis ref to programmatically control smooth scrolling during route transitions
  const lenisRef = useRef<any>(null);

  // 1. Lenis Smooth Scroll Initialization (Deferred after first paint, desktop mouse wheel only)
  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024);
    if (isTouch) {
      return;
    }

    let isMounted = true;
    let rafId: number;

    const timer = setTimeout(() => {
      Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger')
      ]).then(([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
        if (!isMounted) return;
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
        });

        lenisRef.current = lenis;
        (window as any).__appLenis = lenis;

        lenis.on('scroll', () => {
          ScrollTrigger.update();
        });

        function raf(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);
      });
    }, 800);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      delete (window as any).__appLenis;
    };
  }, []);

  // Universal Instant Scroll-To-Top Helper for Seamless Page Transitions
  const scrollToTopInstant = () => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Crucial: Whenever currentPage switches (e.g. to 'campus-life'), strictly force scroll to top (0)
  useEffect(() => {
    scrollToTopInstant();
    const rAF = requestAnimationFrame(() => {
      scrollToTopInstant();
    });
    const timer = setTimeout(() => {
      scrollToTopInstant();
    }, 60);

    return () => {
      cancelAnimationFrame(rAF);
      clearTimeout(timer);
    };
  }, [currentPage]);

  // Helper to sync page and history hash for instant client navigation
  const navigateToPage = (newPage: PageId) => {
    scrollToTopInstant();
    setCurrentPage(newPage);
    if (newPage === 'home') {
      window.history.pushState(null, '', '/');
    } else if (newPage === 'developer') {
      window.history.pushState(null, '', '/developer');
    } else if (newPage === 'campus-facilities') {
      window.history.pushState(null, '', '/campus-facilities');
    } else {
      window.history.pushState(null, '', `#${newPage}`);
    }
    requestAnimationFrame(() => scrollToTopInstant());
  };

  // Secret shortcut: typing "developer" or "asifa" anywhere on the keyboard navigates to /developer
  useEffect(() => {
    let keyBuffer = '';
    const handleSecretTyping = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (!e.key || e.key.length !== 1) return;

      keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-15);
      if (keyBuffer.endsWith('developer') || keyBuffer.endsWith('/developer') || keyBuffer.endsWith('asifa')) {
        keyBuffer = '';
        navigateToPage('developer');
      }
    };

    window.addEventListener('keydown', handleSecretTyping);
    return () => window.removeEventListener('keydown', handleSecretTyping);
  }, []);

  const handleOpenProgrammesPage = (progId?: string, category?: string) => {
    setSelectedProgrammeId(progId || null);
    setSelectedProgrammeCategory(category || null);
    navigateToPage('programmes');
  };

  const handleOpenProgrammesFromFaculty = (facultyId?: string) => {
    let cat: string | undefined;
    if (facultyId === 'foit') cat = 'Computing & Technology';
    else if (facultyId === 'fms') cat = 'Business';
    else if (facultyId === 'fost') cat = 'Science';
    else if (facultyId === 'fhss') cat = 'Humanities & Social Sciences';

    handleOpenProgrammesPage(undefined, cat);
  };

  const handleOpenCampusLifePage = () => {
    setSelectedProgrammeId(null);
    navigateToPage('campus-life');
  };

  const handleOpenScholarshipsPage = (sectionId?: string) => {
    setSelectedProgrammeId(null);
    setScholarshipSectionId(sectionId || null);
    navigateToPage('scholarships');
  };

  const handleOpenFeeStructurePage = () => {
    setSelectedProgrammeId(null);
    navigateToPage('fee-structure');
  };

  const handleOpenCnnAcademyPage = () => {
    setSelectedProgrammeId(null);
    navigateToPage('cnn-academy');
  };

  const handleOpenCalendarPage = () => {
    setSelectedProgrammeId(null);
    navigateToPage('calendar');
  };

  const handleOpenCampusFacilitiesPage = () => {
    setSelectedProgrammeId(null);
    navigateToPage('campus-facilities');
  };

  const handleOpenAboutUsPage = () => {
    setSelectedProgrammeId(null);
    navigateToPage('about-us');
  };

  const handleOpenFacultyPage = (cat: string = 'all') => {
    setFacultyCategory(cat);
    setSelectedProgrammeId(null);
    navigateToPage('faculty');
  };

  const handleOpenLegacyPage = () => {
    setSelectedProgrammeId(null);
    navigateToPage('legacy');
  };

  const handleBackToHome = () => {
    setSelectedProgrammeId(null);
    navigateToPage('home');
  };

  const handleScrollTo = (sectionId: string) => {
    if (currentPage !== 'home') {
      navigateToPage('home');
      setSelectedProgrammeId(null);
      setTimeout(() => {
        if (sectionId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenApply = (progName?: string) => {
    if (progName) {
      setPreselectedProgramName(progName);
    }
    window.open(
      'https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleOpenFee = () => {
    handleOpenFeeStructurePage();
  };

  const handleUniversalNavigate = (target: string, options?: { programId?: string; category?: string; sectionId?: string }) => {
    if (!target) return;
    const cleanTarget = target.trim();

    // External URL
    if (cleanTarget.startsWith('http://') || cleanTarget.startsWith('https://')) {
      window.open(cleanTarget, '_blank', 'noopener,noreferrer');
      return;
    }

    // Parse path or hash
    const rawTarget = cleanTarget.replace(/^#\/?/, '').replace(/^\/+/, '');
    const [baseTarget, queryStr] = rawTarget.split('?');
    const params = new URLSearchParams(queryStr || '');
    const progId = options?.programId || params.get('program') || params.get('prog') || undefined;
    const category = options?.category || params.get('category') || params.get('cat') || undefined;
    const norm = baseTarget.toLowerCase();

    if (['programmes', 'programs', 'academics', 'academic', 'courses', 'degrees'].includes(norm)) {
      handleOpenProgrammesPage(progId, category);
      return;
    }

    if (['fee-structure', 'fees', 'fee', 'tuition', 'fee-calculator'].includes(norm)) {
      handleOpenFeeStructurePage();
      return;
    }

    if (['scholarships', 'scholarship'].includes(norm)) {
      handleOpenScholarshipsPage(options?.sectionId);
      return;
    }

    if (['faculty', 'teachers', 'professors'].includes(norm)) {
      handleOpenFacultyPage('all');
      return;
    }

    if (['campus-facilities', 'facilities', 'facility', 'labs'].includes(norm)) {
      handleOpenCampusFacilitiesPage();
      return;
    }

    if (['campus-life', 'campuslife', 'student-life'].includes(norm)) {
      handleOpenCampusLifePage();
      return;
    }

    if (['legacy', 'history'].includes(norm)) {
      handleOpenLegacyPage();
      return;
    }

    if (['calendar', 'academic-calendar'].includes(norm)) {
      handleOpenCalendarPage();
      return;
    }

    if (['about-us', 'about'].includes(norm)) {
      handleOpenAboutUsPage();
      return;
    }

    if (['developer', 'asifa'].includes(norm)) {
      navigateToPage('developer');
      return;
    }

    if (['leadership', 'leadership-section', 'chairman', 'chairman-section'].includes(norm)) {
      handleScrollTo('leadership-section');
      return;
    }

    if (['admissions', 'admissions-section'].includes(norm)) {
      handleScrollTo('admissions-section');
      return;
    }

    if (['apply', 'admission-form', 'portal'].includes(norm)) {
      handleOpenApply();
      return;
    }

    // General scroll fallback to matching DOM element
    handleScrollTo(baseTarget);
  };

  // Synchronize browser history and hash for back/forward navigation and direct refreshes
  useEffect(() => {
    const handleHashSync = () => {
      const rawHash = (window.location.hash || '').replace(/^#\/?/, '');
      const [baseHash, queryStr] = rawHash.split('?');
      const params = new URLSearchParams(queryStr || '');
      const prog = params.get('program') || params.get('prog');
      const cat = params.get('category') || params.get('cat');

      if (prog) setSelectedProgrammeId(prog);
      if (cat) setSelectedProgrammeCategory(cat);

      const pageFromHash = getPageFromHash();
      setCurrentPage(pageFromHash);
      scrollToTopInstant();

      const norm = baseHash.toLowerCase();
      if (norm === 'leadership' || norm === 'leadership-section') {
        setTimeout(() => {
          document.getElementById('leadership-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (norm === 'admissions' || norm === 'admissions-section') {
        setTimeout(() => {
          document.getElementById('admissions-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    };

    const handleCustomNavigate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent?.detail;
      if (!detail) return;
      const target = typeof detail === 'string' ? detail : detail.url;
      handleUniversalNavigate(target, typeof detail === 'object' ? detail : undefined);
    };

    (window as any).__ucpNavigate = handleUniversalNavigate;
    window.addEventListener('hashchange', handleHashSync);
    window.addEventListener('popstate', handleHashSync);
    window.addEventListener('ucp-navigate', handleCustomNavigate);

    return () => {
      window.removeEventListener('hashchange', handleHashSync);
      window.removeEventListener('popstate', handleHashSync);
      window.removeEventListener('ucp-navigate', handleCustomNavigate);
      delete (window as any).__ucpNavigate;
    };
  }, []);

  const handleOpenPortal = () => {
    window.open(
      'https://mcom.pgc.edu.pk/Student/StdLogin.jsp',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleOpenInfo = (type: InfoModalType) => {
    if (type === 'academic-calendar') {
      handleOpenCalendarPage();
      return;
    }
    if (type === 'fee-structure') {
      handleOpenFeeStructurePage();
      return;
    }
    if (type === 'rules-regulations') {
      window.open('https://ucp.edu.pk/rules-regulations/', '_blank', 'noopener,noreferrer');
      return;
    }
    if (type === 'exam-office') {
      window.open('https://ucp.edu.pk/exam-office/', '_blank', 'noopener,noreferrer');
      return;
    }
    if (type === 'harassment-policy') {
      window.open('https://ucp.edu.pk/inc/uploads/2019/01/SEXUALHARASSMENT-POLICY.pdf', '_blank', 'noopener,noreferrer');
      return;
    }
    if (type === 'scholarships') {
      handleOpenScholarshipsPage();
      return;
    }
    if (type === 'jobs') {
      window.open('https://ucp.edu.pk/jobs/career-opportunities/', '_blank', 'noopener,noreferrer');
      return;
    }
    if (type === 'verify-student') {
      window.open('https://horizon.ucp.edu.pk/verify?_gl=1*1jdpsum*_gcl_au*MTgzMjA3ODQ4MC4xNzkwMDEyMzQ5*_ga*MTk1MTM4Njg4MS4xNzkwMDEyMzQ5*_ga_9BBZL6TFYQ*czE3OTAxNzk2OTYkbzYkZzEkdDE3OTAxODAxMjQkajU5JGwwJGg0NzM0NDM5MzA.', '_blank', 'noopener,noreferrer');
      return;
    }
    if (type === 'faqs') {
      window.open('https://ucp.edu.pk/faqs/', '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedInfoModal(type);
  };

  const handleSelectFaculty = (facultyId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setSelectedProgrammeId(null);
    }
    setTimeout(() => {
      handleScrollTo('faculties-section');
      const facElem = document.getElementById(`faculty-card-${facultyId}`);
      if (facElem) {
        facElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        facElem.classList.add('ring-4', 'ring-[#a30f16]', 'transition-all');
        setTimeout(() => {
          facElem.classList.remove('ring-4', 'ring-[#a30f16]');
        }, 2500);
      }
    }, 150);
  };


  return (
    <div id="top" className="min-h-screen bg-white text-slate-900 dark:bg-[#080f1d] dark:text-[#f8fafc] font-sans selection:bg-[#a30f16] selection:text-white transition-colors duration-200 overflow-x-hidden w-full max-w-full">
      {/* Interactive Click Glow & Highlight Manager for all text and images */}
      <ClickGlowManager />
      
      {/* High-Performance Institutional Scroll Reveal Animation Manager */}
      <ScrollRevealManager />
      
      {/* Official University Light / Dark Mode Toggle on Website Lower Left Corner */}
      {currentPage !== 'developer' && <ThemeToggle variant="floating" />}

      {/* 2. Main Navigation Bar */}
      {currentPage !== 'developer' && (
        <Navbar
          onOpenApply={() => handleOpenApply()}
          onOpenFee={handleOpenFee}
          onOpenPortal={handleOpenPortal}
          onOpenInfo={handleOpenInfo}
          onSelectFaculty={handleSelectFaculty}
          onScrollTo={handleScrollTo}
          onOpenFacultyPage={() => handleOpenFacultyPage('all')}
          onOpenProgrammesPage={handleOpenProgrammesPage}
          onOpenLegacyPage={handleOpenLegacyPage}
          onOpenCampusLifePage={handleOpenCampusLifePage}
          onOpenScholarshipsPage={handleOpenScholarshipsPage}
          onOpenCnnAcademyPage={handleOpenCnnAcademyPage}
          onOpenCalendar={handleOpenCalendarPage}
          onOpenCampusFacilitiesPage={handleOpenCampusFacilitiesPage}
          onOpenAboutUsPage={handleOpenAboutUsPage}
          onBackToHome={handleBackToHome}
          currentPage={currentPage}
        />
      )}

      <main className="w-full max-w-full overflow-x-hidden">
        {currentPage === 'developer' ? (
          <Suspense fallback={null}>
            <AsifaSecretPage onBackToHome={handleBackToHome} />
          </Suspense>
        ) : currentPage === 'home' ? (
          <>
            {/* 1. HERO — Renders instantly on first paint (<0.2s) without waiting for any lazy chunk */}
            <HeroSlider
              onOpenApply={() => handleOpenApply()}
              onOpenFee={handleOpenFee}
              onScrollTo={handleScrollTo}
              onSelectFaculty={handleSelectFaculty}
              onOpenProgrammesPage={handleOpenProgrammesPage}
              onOpenLegacyPage={handleOpenLegacyPage}
              onOpenCampusLifePage={handleOpenCampusLifePage}
              onOpenPortal={handleOpenPortal}
            />

            {/* Below-the-fold content rendered synchronously for instant paint */}
            {/* WELCOME UCP — Executive Welcome Section with GSAP Sticky Stacking Cards & Official Blue Background */}
              <div className="w-full">
                <WelcomeUcpSection 
                  onOpenLegacyPage={handleOpenLegacyPage}
                  onOpenProgrammesPage={handleOpenProgrammesPage}
                  onOpenAboutUsPage={handleOpenAboutUsPage}
                  onScrollTo={handleScrollTo}
                />
              </div>

              {/* 3. INSTITUTIONAL LEADERSHIP — Vision, Governance & Executive Guidance */}
              <div className="w-full">
                <OurLeadershipSection 
                  onOpenApply={() => handleOpenApply()}
                  onScrollTo={handleScrollTo}
                />
              </div>

              {/* INSTITUTIONAL GOVERNANCE, UN SDGs & FACULTY LEADERSHIP */}
              <div className="w-full">
                <LeadershipImpactSection 
                  onScrollTo={handleScrollTo}
                />
              </div>

              {/* 4. ACADEMIC FACULTIES & DISCIPLINES — Core Educational Search Intent */}
              <div className="w-full">
                <FacultiesGrid
                  onSelectFaculty={handleSelectFaculty}
                  onExploreFacultyPrograms={handleOpenProgrammesFromFaculty}
                  onOpenProgrammesPage={() => handleOpenProgrammesPage()}
                  onOpenCalendar={handleOpenCalendarPage}
                />
              </div>

              {/* 5. WHAT WE OFFER FOR YOU — Expanding Interactive Academic Offerings */}
              <div className="w-full">
                <WhatWeOfferAccordion
                  onOpenApply={() => handleOpenApply()}
                  onOpenProgrammesPage={() => handleOpenProgrammesPage()}
                  onOpenCampusLifePage={handleOpenCampusLifePage}
                  onOpenScholarshipsPage={handleOpenScholarshipsPage}
                  onOpenLegacyPage={handleOpenLegacyPage}
                  onOpenFacultyPage={() => handleOpenFacultyPage('all')}
                  onOpenFacilitiesPage={handleOpenCampusFacilitiesPage}
                  onScrollTo={handleScrollTo}
                />
              </div>

              {/* 6. DISTINGUISHED FACULTY SHOWCASE — Faculty Profiles, Mentors & PhD Researchers */}
              <div className="w-full">
                <FacultySection 
                  onViewAllFaculty={handleOpenFacultyPage}
                />
              </div>

              {/* 7. OUR CAMPUS — Architectural Presence & Scholarly Roots */}
              <div className="w-full">
                <AboutCampusSection
                  onOpenApply={() => handleOpenApply()}
                  onOpenLegacyPage={handleOpenLegacyPage}
                  onScrollTo={handleScrollTo}
                />
              </div>

              {/* 8. CAMPUS FACILITIES PREVIEW — Purpose-Built Laboratories & Learning Infrastructure */}
              <div className="w-full">
                <CampusFacilitiesPreview 
                  onOpenFacilitiesPage={handleOpenCampusFacilitiesPage}
                  onOpenFacultyPage={() => handleOpenFacultyPage('all')}
                  onScrollTo={handleScrollTo}
                />
              </div>

              {/* 9. CAMPUS LIFE — Student Life, Courtyard Gathering & Campus Culture */}
              <div className="w-full">
                <CampusLife 
                  onOpenCampusLifePage={handleOpenCampusLifePage}
                />
              </div>

              {/* 11. NEWS & EVENTS — Timely Updates, Academic Symposia & Campus Happenings */}
              <div className="w-full">
                <NewsAndEvents
                  onSelectArticle={(article) => setSelectedArticle(article)}
                />
              </div>

              {/* 12. ADMISSIONS EXPERIENCE — Red Carpet Welcome & Campus Visit Guidance */}
              <div className="w-full">
                <AdmissionsExperienceSection
                  onOpenApply={() => handleOpenApply()}
                  onOpenFee={handleOpenFee}
                />
              </div>

              {/* 13. CLOSING DRAMATIC FINALE — Strategic Perspective & Application Anchors */}
              <div className="w-full">
                <ClosingDramaticSection
                  onOpenApply={() => handleOpenApply()}
                  onOpenProgrammesPage={() => handleOpenProgrammesPage()}
                  onScrollTo={handleScrollTo}
                />
              </div>

              {/* 14. UCP BAHAWALPUR MOVING LINE (Ticker Tape at end of website before footer) */}
              <div className="w-full">
                <StatisticsSection />
              </div>
          </>
        ) : (
          <Suspense fallback={null}>
            {currentPage === 'programmes' ? (
              /* Official UCP Bahawalpur Academic Programmes Experience */
              <AcademicProgrammesPage 
                onBackToHome={handleBackToHome}
                onOpenApply={handleOpenApply}
                onOpenFee={handleOpenFee}
                onOpenCalendar={handleOpenCalendarPage}
                initialSelectedId={selectedProgrammeId}
                initialCategory={selectedProgrammeCategory}
              />
            ) : currentPage === 'faculty' ? (
              /* Separate Dedicated Faculty Page with 20 Slots & Department Views */
              <FacultyPage 
                onBackToHome={handleBackToHome}
                initialCategory={facultyCategory}
              />
            ) : currentPage === 'legacy' ? (
              /* Dedicated Official Our Legacy Page */
              <OurLegacyPage
                onBackToHome={handleBackToHome}
                onOpenApply={handleOpenApply}
                onOpenProgrammesPage={handleOpenProgrammesPage}
                onOpenFee={handleOpenFee}
              />
            ) : currentPage === 'campus-life' ? (
              /* Dedicated Official Premium Campus Life Page — “Life Beyond the Classroom” */
              <CampusLifePage
                onBackToHome={handleBackToHome}
                onOpenApply={() => handleOpenApply()}
                onOpenProgrammesPage={handleOpenProgrammesPage}
                onOpenFee={handleOpenFee}
              />
            ) : currentPage === 'scholarships' ? (
              /* Dedicated Official Scholarships & Concessions Page */
              <ScholarshipsPage
                onBackToHome={handleBackToHome}
                onOpenApply={() => handleOpenApply()}
                onOpenProgrammesPage={handleOpenProgrammesPage}
                onOpenFee={handleOpenFee}
                initialSectionId={scholarshipSectionId || undefined}
              />
            ) : currentPage === 'fee-structure' ? (
              /* Dedicated Official Fee Structure & Tuition Schedules Page */
              <FeeStructurePage
                onBackToHome={handleBackToHome}
                onOpenApply={(progName?: string) => handleOpenApply(progName)}
                onOpenProgrammesPage={handleOpenProgrammesPage}
                onOpenScholarshipsPage={handleOpenScholarshipsPage}
              />
            ) : currentPage === 'cnn-academy' ? (
              /* Dedicated Official CNN Academy Strategic Collaboration & Guidance Page */
              <CnnAcademyPage
                onBackToHome={handleBackToHome}
                onOpenPortal={handleOpenPortal}
                onOpenProgrammesPage={handleOpenProgrammesPage}
              />
            ) : currentPage === 'calendar' ? (
              /* Dedicated Official Academic Calendar Page */
              <AcademicCalendarSection
                isStandalone={true}
                onBackToHome={handleBackToHome}
              />
            ) : currentPage === 'campus-facilities' ? (
              /* Dedicated Official Campus Facilities Page — Learning Environment, Central Library & Labs */
              <CampusFacilitiesPage 
                onBackToHome={handleBackToHome}
                onOpenApply={() => handleOpenApply()}
                onOpenCampusLifePage={handleOpenCampusLifePage}
                onOpenFacultyPage={() => handleOpenFacultyPage('all')}
              />
            ) : currentPage === 'about-us' ? (
              /* Dedicated Official About Us Page — Success Story, Leadership, Vision & Values */
              <AboutUsPage
                onBackToHome={handleBackToHome}
                onOpenApply={() => handleOpenApply()}
                onOpenProgrammesPage={handleOpenProgrammesPage}
                onOpenFacilitiesPage={handleOpenCampusFacilitiesPage}
                onOpenCampusLifePage={handleOpenCampusLifePage}
                onOpenLegacyPage={handleOpenLegacyPage}
                onOpenFacultyPage={() => handleOpenFacultyPage('all')}
              />
            ) : null}
          </Suspense>
        )}
      </main>

      {/* 10. Official Comprehensive Footer & Floating Ribbons */}
      {currentPage !== 'developer' && (
        <>
          <Footer
            onOpenApply={() => handleOpenApply()}
            onOpenFee={handleOpenFee}
            onOpenPortal={handleOpenPortal}
            onOpenInfo={handleOpenInfo}
            onScrollTo={handleScrollTo}
            onSelectFaculty={handleSelectFaculty}
            onOpenLegacyPage={handleOpenLegacyPage}
            onOpenAboutUsPage={handleOpenAboutUsPage}
          />

          {/* Right Edge Floating Ribbons & WhatsApp Button */}
          <FloatingSideRibbons
            onOpenApply={() => handleOpenApply()}
            onOpenInfo={handleOpenInfo}
            onOpenLegacyPage={handleOpenLegacyPage}
            onOpenCampusLifePage={handleOpenCampusLifePage}
            onOpenProgrammesPage={() => handleOpenProgrammesPage()}
            onOpenScholarshipsPage={handleOpenScholarshipsPage}
            onOpenFeeStructurePage={handleOpenFeeStructurePage}
            onOpenPortal={handleOpenPortal}
          />
        </>
      )}

      {/* Official 24/7 UCP Bot (Instant Knowledge + Gemini AI) & Modals */}
      <Suspense fallback={null}>
        {currentPage !== 'developer' && mountChat && (
          <UcpChatbot onNavigate={handleUniversalNavigate} />
        )}

        {/* Modal Dialogs */}
        <ApplyModal
          isOpen={isApplyOpen}
          onClose={() => setIsApplyOpen(false)}
          preselectedProgram={preselectedProgramName}
        />

        <FeeCalculatorModal
          isOpen={isFeeOpen}
          onClose={() => setIsFeeOpen(false)}
          onOpenApply={() => handleOpenApply()}
        />

        <StudentPortalModal
          isOpen={isPortalOpen}
          onClose={() => setIsPortalOpen(false)}
        />

        <UcpInfoModal
          type={selectedInfoModal}
          onClose={() => setSelectedInfoModal(null)}
          onOpenApply={() => handleOpenApply()}
          onOpenPortal={handleOpenPortal}
          onOpenProgrammesPage={() => handleOpenProgrammesPage()}
        />

        <ProgramDetailModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
          onApply={(progName?: string) => handleOpenApply(progName)}
          onOpenFee={handleOpenFee}
        />

        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      </Suspense>

      {/* Vercel Web Analytics */}
      <Analytics />


    </div>
  );
}
