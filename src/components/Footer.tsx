import React from 'react';
import { 
  MapPin, Phone, Mail, Globe
} from 'lucide-react';
import { UcpLogo } from './UcpLogo';
import { UCP_CONTACT } from '../data/ucpData';
import { InfoModalType } from './UcpInfoModal';

interface FooterProps {
  onOpenApply: () => void;
  onOpenFee: () => void;
  onOpenPortal: () => void;
  onOpenInfo: (type: InfoModalType) => void;
  onScrollTo: (sectionId: string) => void;
  onSelectFaculty: (facultyId: string) => void;
  onOpenLegacyPage?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenApply,
  onOpenFee,
  onOpenPortal,
  onOpenInfo,
  onScrollTo,
  onSelectFaculty,
  onOpenLegacyPage,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="footer-section" 
      className="relative bg-[#06182e] text-white pt-14 pb-8 overflow-hidden border-t border-[#13335c] select-none"
    >
      {/* Anchor alias for Contact navigation */}
      <div id="contact-section" className="absolute -top-12" aria-hidden="true" />

      {/* CAD Blueprint Drafting Coordinate Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 bg-[#06182e] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#0284c7_0%,transparent_70%)] opacity-25 z-0" />

        <svg 
          className="absolute inset-0 w-full h-full opacity-15 z-0 pointer-events-none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="footer-blueprint-grid-minor" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#7dd3fc" strokeWidth="0.5" strokeOpacity="0.18" />
            </pattern>
            <pattern id="footer-blueprint-grid-major" width="96" height="96" patternUnits="userSpaceOnUse">
              <rect width="96" height="96" fill="url(#footer-blueprint-grid-minor)" />
              <path d="M 96 0 L 0 0 0 96" fill="none" stroke="#7dd3fc" strokeWidth="1" strokeOpacity="0.32" />
              <path d="M -4 0 L 4 0 M 0 -4 L 0 4" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-blueprint-grid-major)" />
        </svg>

        <div className="absolute inset-0 bg-gradient-to-b from-[#06182e]/95 via-[#07192f]/70 to-[#06182e]/60 z-2 pointer-events-none" />

        {/* Architectural Title Block & Coordinate Stamp */}
        <div className="absolute right-4 sm:right-8 bottom-3 sm:bottom-4 pointer-events-none z-3 flex items-center gap-3 opacity-60 font-mono text-[9px] text-white">
          <span className="hidden md:inline tracking-wider font-semibold text-cyan-200">UCP CAMPUS BAHAWALPUR</span>
          <span className="hidden sm:inline text-cyan-400/50">|</span>
          <span className="tracking-wider text-white/90">AIRPORT ROAD, BAHAWALPUR</span>
          <span className="hidden sm:inline text-cyan-400/50">|</span>
          <span className="text-cyan-300">CAMPUS BLUEPRINT</span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Main 3-Column Grid - Official Clean Text Style Without Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-8 items-start">
          
          {/* Left Column: Brand Identity, Slogan & Facebook Page (Clean Text Style) */}
          <div className="md:col-span-12 lg:col-span-5 space-y-4 pr-2 lg:pr-6">
            <UcpLogo 
              variant="footer"
              onClick={scrollToTop}
            />

            <p className="text-xs text-slate-300 font-mono uppercase tracking-[0.12em] pt-1">
              UCP DEGREES IN YOUR CITY · BS &amp; ADP PROGRAMS
            </p>

            {/* Official Facebook Link (Clean Text Style, No Box) */}
            <div className="pt-1">
              <a 
                href="https://facebook.com/UCPofficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-200 hover:text-white transition-colors"
                title="Official Facebook Page"
              >
                <svg className="w-4 h-4 fill-[#1877F2] shrink-0" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
                <span className="font-medium hover:underline">
                  UNIVERSITY OF CENTRAL PUNJAB BAHAWALPUR CAMPUS
                </span>
              </a>
            </div>

            {/* Social Icons (Clean Outline Circles, No Yellow) */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a 
                href="https://facebook.com/UCPofficial" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-slate-300 hover:bg-white hover:text-[#06182e] hover:border-white transition-all transform hover:scale-105"
                title="UCP on Facebook"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>

              <a 
                href="https://x.com/UCPofficial" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-slate-300 hover:bg-white hover:text-[#06182e] hover:border-white transition-all transform hover:scale-105"
                title="UCP on X"
                aria-label="X / Twitter"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a 
                href="https://linkedin.com/school/university-of-central-punjab" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-slate-300 hover:bg-white hover:text-[#06182e] hover:border-white transition-all transform hover:scale-105"
                title="UCP on LinkedIn"
                aria-label="LinkedIn"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a 
                href="https://youtube.com/UCPofficial" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-slate-300 hover:bg-white hover:text-[#06182e] hover:border-white transition-all transform hover:scale-105"
                title="UCP on YouTube"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a 
                href="https://instagram.com/UCPofficial" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-slate-300 hover:bg-white hover:text-[#06182e] hover:border-white transition-all transform hover:scale-105"
                title="UCP on Instagram"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Middle Column: USEFUL LINKS (Clean Text, No Red Open Box, No Yellow) */}
          <div className="md:col-span-6 lg:col-span-3 space-y-3 lg:pl-4">
            <h4 className="text-white text-[14px] font-bold tracking-wider uppercase border-b border-white/10 pb-2">
              USEFUL LINKS
            </h4>
            
            <ul className="text-[13px] text-slate-300 space-y-2 font-sans">
              <li>
                <button 
                  onClick={onOpenApply}
                  className="group w-full text-left transition-colors duration-200 flex items-center gap-2 hover:text-white cursor-pointer"
                >
                  <span className="text-slate-400 font-bold group-hover:text-white transition-colors">›</span>
                  <span className="font-medium group-hover:underline">Apply Online (Admissions)</span>
                </button>
              </li>

              <li>
                <button 
                  onClick={onOpenFee}
                  className="group w-full text-left transition-colors duration-200 flex items-center gap-2 hover:text-white cursor-pointer"
                >
                  <span className="text-slate-400 font-bold group-hover:text-white transition-colors">›</span>
                  <span className="group-hover:underline">Programs &amp; Fee Structure</span>
                </button>
              </li>

              <li>
                <a 
                  href="https://mcom.pgc.edu.pk/Student/StdLogin.jsp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full text-left transition-colors duration-200 flex items-center gap-2 hover:text-white cursor-pointer"
                >
                  <span className="text-slate-400 font-bold group-hover:text-white transition-colors">›</span>
                  <span className="group-hover:underline">Student Portal (mcom.pgc.edu.pk)</span>
                </a>
              </li>

              <li>
                <a 
                  href="https://ucpcolleges.pgc.edu/scholarship/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full text-left transition-colors duration-200 flex items-center gap-2 hover:text-white cursor-pointer"
                >
                  <span className="text-slate-400 font-bold group-hover:text-white transition-colors">›</span>
                  <span className="group-hover:underline">Scholarships &amp; Concessions</span>
                </a>
              </li>

              <li>
                <button 
                  type="button"
                  onClick={() => onOpenInfo('academic-calendar')}
                  className="group w-full text-left transition-colors duration-200 flex items-center gap-2 hover:text-white cursor-pointer"
                >
                  <span className="text-slate-400 font-bold group-hover:text-white transition-colors">›</span>
                  <span className="group-hover:underline">Academic Calendar</span>
                </button>
              </li>

              <li>
                <a 
                  href="https://ucp.edu.pk/exam-office/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full text-left transition-colors duration-200 flex items-center gap-2 hover:text-white cursor-pointer"
                >
                  <span className="text-slate-400 font-bold group-hover:text-white transition-colors">›</span>
                  <span className="group-hover:underline">Exam Office</span>
                </a>
              </li>

              {onOpenLegacyPage && (
                <li>
                  <button 
                    onClick={onOpenLegacyPage}
                    className="group w-full text-left transition-colors duration-200 flex items-center gap-2 hover:text-white cursor-pointer"
                  >
                    <span className="text-slate-400 font-bold group-hover:text-white transition-colors">›</span>
                    <span className="group-hover:underline">Our Legacy &amp; Campus History</span>
                  </button>
                </li>
              )}

              <li>
                <a 
                  href="https://ucp.edu.pk/rules-regulations/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full text-left transition-colors duration-200 flex items-center gap-2 hover:text-white cursor-pointer"
                >
                  <span className="text-slate-400 font-bold group-hover:text-white transition-colors">›</span>
                  <span className="group-hover:underline">Rules &amp; Regulations</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: CONTACT US (Clean Text Style, Without Boxes) */}
          <div className="md:col-span-6 lg:col-span-4 space-y-3 lg:pl-6">
            <h4 className="text-white text-[14px] font-bold tracking-wider uppercase border-b border-white/10 pb-2">
              CONTACT US
            </h4>

            <div className="text-[13px] text-slate-200 space-y-3.5 pt-1">
              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin size={17} className="text-white shrink-0 mt-0.5" />
                <a 
                  href="https://maps.app.goo.gl/ud9Sz3ZLR7zt9aiT7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-medium hover:underline block leading-snug"
                >
                  CONSTITUENT COLLEGE, UCP CAMPUS<br />
                  AIRPORT ROAD, BAHAWALPUR
                </a>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-white shrink-0" />
                <div className="flex items-center gap-1.5 text-white font-medium">
                  <a href="tel:0622202030" className="hover:underline">062-2202030</a>
                  <span className="text-slate-400">/</span>
                  <a href="tel:0622202050" className="hover:underline">062-2202050</a>
                </div>
              </div>

              {/* Toll-Free */}
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-slate-300 shrink-0" />
                <a href="tel:080000827" className="text-white font-medium hover:underline">
                  0800-00827 (9:00 AM – 5:00 PM)
                </a>
              </div>

              {/* Website Link */}
              <div className="flex items-center gap-3">
                <Globe size={16} className="text-white shrink-0" />
                <a 
                  href="https://bit.ly/ucpbahawalpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-mono hover:underline"
                >
                  bit.ly/ucpbahawalpur
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-white shrink-0" />
                <a href="mailto:info@ucp.edu.pk" className="text-white hover:underline">
                  info@ucp.edu.pk
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Center TOP Button */}
        <div className="relative flex justify-center items-center py-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-700/60" />
          </div>
          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="relative bg-[#06182e] border border-white/30 hover:border-white hover:bg-white/10 text-white text-[11px] font-bold tracking-[0.2em] px-6 py-1.5 transition-all focus:outline-none cursor-pointer"
            title="Scroll to top of page"
          >
            TOP
          </button>
        </div>

      </div>
    </footer>
  );
};
