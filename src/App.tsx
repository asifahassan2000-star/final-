/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Register GSAP ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { StatisticsSection } from './components/StatisticsSection';
import { WelcomeUcpSection } from './components/WelcomeUcpSection';
import { FacultiesGrid } from './components/FacultiesGrid';
import { ClickGlowManager } from './components/ClickGlowManager';
import { ScrollRevealManager } from './components/ScrollReveal';
import type { InfoModalType } from './components/UcpInfoModal';
import { Program, NewsEventItem } from './types';
import { FACULTIES, UCP_CONTACT } from './data/ucpData';

// Direct static imports for instant initial paint and zero loading waterfall
import { WhatWeOfferAccordion } from './components/WhatWeOfferAccordion';
import { FacultySection } from './components/FacultySection';
import { AboutCampusSection } from './components/AboutCampusSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { OurLeadershipSection } from './components/OurLeadershipSection';
import { LeadershipImpactSection } from './components/LeadershipImpactSection';
import { CampusLife } from './components/CampusLife';
import { BeyondTheClassroomSection } from './components/BeyondTheClassroomSection';
import { NewsAndEvents } from './components/NewsAndEvents';
import { AdmissionsExperienceSection } from './components/AdmissionsExperienceSection';
import { ClosingDramaticSection } from './components/ClosingDramaticSection';
import { Footer } from './components/Footer';
import { FloatingSideRibbons } from './components/FloatingSideRibbons';

// Lazy-loaded Subpages for instant page loading and fast compilation
const FacultyPage = React.lazy(() => import('./components/FacultyPage').then(m => ({ default: m.FacultyPage })));
const AcademicProgrammesPage = React.lazy(() => import('./components/AcademicProgrammesPage').then(m => ({ default: m.AcademicProgrammesPage })));
const OurLegacyPage = React.lazy(() => import('./components/OurLegacyPage').then(m => ({ default: m.OurLegacyPage })));
const ScholarshipsPage = React.lazy(() => import('./components/ScholarshipsPage').then(m => ({ default: m.ScholarshipsPage })));
const FeeStructurePage = React.lazy(() => import('./components/FeeStructurePage').then(m => ({ default: m.FeeStructurePage })));
const CampusLifePage = React.lazy(() => import('./components/CampusLifePage').then(m => ({ default: m.CampusLifePage })));
const CnnAcademyPage = React.lazy(() => import('./components/CnnAcademyPage').then(m => ({ default: m.CnnAcademyPage })));
const AcademicCalendarSection = React.lazy(() => import('./components/AcademicCalendarSection').then(m => ({ default: m.AcademicCalendarSection })));

// Lazy-loaded Modals & Chatbot for zero upfront overhead
const ApplyModal = React.lazy(() => import('./components/ApplyModal').then(m => ({ default: m.ApplyModal })));
const FeeCalculatorModal = React.lazy(() => import('./components/FeeCalculatorModal').then(m => ({ default: m.FeeCalculatorModal })));
const StudentPortalModal = React.lazy(() => import('./components/StudentPortalModal').then(m => ({ default: m.StudentPortalModal })));
const ProgramDetailModal = React.lazy(() => import('./components/ProgramDetailModal').then(m => ({ default: m.ProgramDetailModal })));
const ArticleModal = React.lazy(() => import('./components/ArticleModal').then(m => ({ default: m.ArticleModal })));
const UcpInfoModal = React.lazy(() => import('./components/UcpInfoModal').then(m => ({ default: m.UcpInfoModal })));
const UcpChatbot = React.lazy(() => import('./components/UcpChatbot').then(m => ({ default: m.UcpChatbot })));

export default function App() {
  // Navigation / Page state
  const [currentPage, setCurrentPage] = useState<'home' | 'faculty' | 'programmes' | 'legacy' | 'campus-life' | 'scholarships' | 'fee-structure' | 'cnn-academy' | 'calendar'>('home');
  const [facultyCategory, setFacultyCategory] = useState<string>('all');
  const [selectedProgrammeId, setSelectedProgrammeId] = useState<string | null>(null);
  const [selectedProgrammeCategory, setSelectedProgrammeCategory] = useState<string | null>(null);

  // Modal states
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isFeeOpen, setIsFeeOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [selectedInfoModal, setSelectedInfoModal] = useState<InfoModalType | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsEventItem | null>(null);
  const [preselectedProgramName, setPreselectedProgramName] = useState<string>('');

  // Lenis ref to programmatically control smooth scrolling during route transitions
  const lenisRef = useRef<Lenis | null>(null);

  // 1. Lenis Smooth Scroll Initialization (Desktop mouse wheel only, native fast scrolling on mobile)
  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024);
    if (isTouch) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    (window as any).__appLenis = lenis;

    // Synchronize Lenis scroll with GSAP ScrollTrigger globally
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
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

  const handleOpenProgrammesPage = (progId?: string, category?: string) => {
    scrollToTopInstant();
    setSelectedProgrammeId(progId || null);
    setSelectedProgrammeCategory(category || null);
    setCurrentPage('programmes');
    requestAnimationFrame(() => scrollToTopInstant());
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
    scrollToTopInstant();
    setSelectedProgrammeId(null);
    setCurrentPage('campus-life');
    requestAnimationFrame(() => scrollToTopInstant());
  };

  const handleOpenScholarshipsPage = () => {
    scrollToTopInstant();
    setSelectedProgrammeId(null);
    setCurrentPage('scholarships');
    requestAnimationFrame(() => scrollToTopInstant());
  };

  const handleOpenFeeStructurePage = () => {
    scrollToTopInstant();
    setSelectedProgrammeId(null);
    setCurrentPage('fee-structure');
    requestAnimationFrame(() => scrollToTopInstant());
  };

  const handleOpenCnnAcademyPage = () => {
    scrollToTopInstant();
    setSelectedProgrammeId(null);
    setCurrentPage('cnn-academy');
    requestAnimationFrame(() => scrollToTopInstant());
  };

  const handleOpenCalendarPage = () => {
    scrollToTopInstant();
    setSelectedProgrammeId(null);
    setCurrentPage('calendar');
    requestAnimationFrame(() => scrollToTopInstant());
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
    if (type === 'blog') {
      window.open(
        'https://ucp.edu.pk/blog/?_gl=1*g7icau*_gcl_au*mtgzmja3odq4mc4xnzkwmdeymzq5li0uls4xnzkwmtgwndm0ljy0mta5mdayni4xnzkwmtgwndm0lje3otaxoda0mzq.*_ga*mtk1mtm4njg4ms4xnzkwmdeymzq5*_ga_9bbzl6tfyq*cze3otaxnzk2otykbzykzzekdde3otaxoda0otckajywjgwwjgg0nzm0ndm5mza.',
        '_blank',
        'noopener,noreferrer'
      );
      return;
    }
    if (type === 'oric') {
      window.open(
        'https://oric.ucp.edu.pk/?_gl=1%2A1038nq8%2A_gcl_au%2AMTgzMjA3ODQ4MC4xNzkwMDEyMzQ5Li0uLS4xNzkwMTgwNDM0LjY0MTA5MDAyNi4xNzkwMTgwNDM0LjE3OTAxODA0MzQ.%2A_ga%2AMTk1MTM4Njg4MS4xNzkwMDEyMzQ5%2A_ga_9BBZL6TFYQ%2AczE3OTAxNzk2OTYkbzYkZzEkdDE3OTAxODA1MTUkajQyJGwwJGg0NzM0NDM5MzA.',
        '_blank',
        'noopener,noreferrer'
      );
      return;
    }
    setSelectedInfoModal(type);
  };

  const handleOpenFacultyPage = (cat: string = 'all') => {
    scrollToTopInstant();
    setFacultyCategory(cat);
    setCurrentPage('faculty');
    requestAnimationFrame(() => scrollToTopInstant());
  };

  const handleOpenLegacyPage = () => {
    scrollToTopInstant();
    setCurrentPage('legacy');
    setSelectedProgrammeId(null);
    requestAnimationFrame(() => scrollToTopInstant());
  };

  const handleBackToHome = () => {
    scrollToTopInstant();
    setCurrentPage('home');
    setSelectedProgrammeId(null);
    requestAnimationFrame(() => scrollToTopInstant());
  };

  const handleScrollTo = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
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
    <div id="top" className="min-h-screen bg-white text-slate-900 dark:bg-[#080f1d] dark:text-[#f8fafc] font-sans selection:bg-[#a30f16] selection:text-white transition-colors duration-200">
      {/* Interactive Click Glow & Highlight Manager for all text and images */}
      <ClickGlowManager />
      
      {/* High-Performance Institutional Scroll Reveal Animation Manager */}
      <ScrollRevealManager />
      
      {/* 1. Official Top Emergency Ticker & Contact Strip */}
      <TopBar 
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenFee={handleOpenFee}
        onOpenApply={() => handleOpenApply()}
        onOpenCnnAcademyPage={handleOpenCnnAcademyPage}
      />

      {/* 2. Main Navigation Bar */}
      <Navbar
        onOpenApply={() => handleOpenApply()}
        onOpenFee={handleOpenFee}
        onOpenPortal={() => setIsPortalOpen(true)}
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
        onBackToHome={handleBackToHome}
        currentPage={currentPage}
      />

      <main>
        <Suspense fallback={
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#FAF8F5]">
            <div className="w-10 h-10 border-3 border-[#0A1931]/20 border-t-[#C8102E] rounded-full animate-spin mb-4" />
            <p className="text-xs uppercase font-bold tracking-widest text-[#0A1931]/70">Loading view...</p>
          </div>
        }>
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
            onOpenPortal={() => setIsPortalOpen(true)}
            onOpenProgrammesPage={handleOpenProgrammesPage}
          />
        ) : currentPage === 'calendar' ? (
          /* Dedicated Official Academic Calendar Page */
          <AcademicCalendarSection
            isStandalone={true}
            onBackToHome={handleBackToHome}
          />
        ) : (
          /* Main Homepage Sections following World-Class SEO and Institutional Information Architecture */
          <>
            {/* 1. HERO — Flagship Sunset Campus Photograph (IMAGE 13) */}
            <HeroSlider
              onOpenApply={() => handleOpenApply()}
              onOpenFee={handleOpenFee}
              onScrollTo={handleScrollTo}
              onSelectFaculty={handleSelectFaculty}
              onOpenProgrammesPage={handleOpenProgrammesPage}
              onOpenLegacyPage={handleOpenLegacyPage}
              onOpenCampusLifePage={handleOpenCampusLifePage}
            />

            {/* 2. INSTITUTIONAL METRICS & ACCREDITATIONS — Immediate Proof & Quantitative Authority */}
            <div className="w-full">
              <StatisticsSection onOpenScholarshipsPage={handleOpenScholarshipsPage} />
            </div>

            {/* WELCOME UCP — Executive Welcome Section with GSAP Sticky Stacking Cards & Official Blue Background */}
            <div className="w-full">
              <WelcomeUcpSection 
                onOpenLegacyPage={handleOpenLegacyPage}
                onOpenProgrammesPage={handleOpenProgrammesPage}
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

            {/* 8. WORLD-CLASS FACILITIES — Purpose-Built Laboratories & Learning Infrastructure */}
            <div className="w-full">
              <FacilitiesSection 
                onOpenApply={() => handleOpenApply()}
                onOpenCampusLifePage={handleOpenCampusLifePage}
              />
            </div>

            {/* 9. CAMPUS LIFE — Student Life, Courtyard Gathering & Campus Culture */}
            <div className="w-full">
              <CampusLife 
                onOpenCampusLifePage={handleOpenCampusLifePage}
              />
            </div>

            {/* 10. BEYOND THE CLASSROOM — Student Engagement & Experiential Learning */}
            <div className="w-full">
              <BeyondTheClassroomSection
                onScrollToCampusLife={() => handleScrollTo('campus-section')}
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
          </>
        )}
        </Suspense>
      </main>

      {/* 10. Official Comprehensive Footer & Floating Ribbons */}
      <Footer
        onOpenApply={() => handleOpenApply()}
        onOpenFee={handleOpenFee}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenInfo={handleOpenInfo}
        onScrollTo={handleScrollTo}
        onSelectFaculty={handleSelectFaculty}
        onOpenLegacyPage={handleOpenLegacyPage}
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
      />

      {/* Official 24/7 UCP Bot (Instant Knowledge + Gemini AI) & Modals */}
      <Suspense fallback={null}>
        <UcpChatbot />

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
          onOpenPortal={() => setIsPortalOpen(true)}
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

    </div>
  );
}
