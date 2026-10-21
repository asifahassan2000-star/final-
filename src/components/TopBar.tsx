import React, { useState, useEffect } from 'react';
import { Phone, Mail, Calendar, FileText, UserCheck, AlertCircle, ChevronRight } from 'lucide-react';
import { UCP_CONTACT } from '../data/ucpData';
import { ThemeToggle } from './ThemeToggle';

interface TopBarProps {
  onOpenPortal: () => void;
  onOpenFee: () => void;
  onOpenApply: () => void;
  onOpenCnnAcademyPage?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenPortal, onOpenFee, onOpenApply, onOpenCnnAcademyPage }) => {
  const announcements = [
    'Admissions Open for Fall 2026 Semester – Apply Online Today!',
    'Official Merit Lists (1st & 2nd) are now live on UCP Portal.',
    'Two-Day National Symposium on Lab Safety & Research Ethics (Sept 2026).',
    'Up to 50% Merit Scholarships & 25% PGC Alumni Fee Concession available.',
    'Campus Tours & Admissions Advisory available Monday to Saturday.',
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div id="ucp-topbar" className="bg-[#0b1c33] text-slate-300 text-xs border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-1.5 gap-2">
          
          {/* Announcement Ticker */}
          <div className="flex items-center gap-2 overflow-hidden w-full md:w-auto">
            <span className="bg-[#b8121a] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 shrink-0 animate-pulse">
              <AlertCircle size={12} /> Notice
            </span>
            <div 
              className="truncate font-medium text-slate-200 hover:text-white transition-colors cursor-pointer" 
              onClick={onOpenApply}
            >
              <span>{announcements[currentIdx]}</span>
            </div>
          </div>

          {/* Quick links & contact info */}
          <div className="flex items-center flex-wrap justify-end gap-x-4 gap-y-1 text-[11px] shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <Phone size={12} className="text-[#b8121a]" />
              <span>Phone:</span>
              <a 
                href="tel:0622202030" 
                className="text-white hover:text-amber-300 transition-colors font-bold cursor-pointer"
                title="Call 062-2202030"
              >
                062-2202030
              </a>
              <span className="text-slate-500">/</span>
              <a 
                href="tel:0622202050" 
                className="text-white hover:text-amber-300 transition-colors font-bold cursor-pointer"
                title="Call 062-2202050"
              >
                062-2202050
              </a>
            </div>

            <button 
              id="topbar-fee-btn"
              onClick={onOpenFee}
              className="hover:text-white transition-colors flex items-center gap-1 text-slate-300 cursor-pointer"
            >
              <FileText size={12} /> Fee Structure
            </button>

            <a 
              id="topbar-portal-btn"
              href="https://mcom.pgc.edu.pk/Student/StdLogin.jsp"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-white px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1 transition-colors"
            >
              <UserCheck size={12} className="text-emerald-400" /> Student Portal
            </a>

            <ThemeToggle variant="topbar" />

            <a
              id="topbar-apply-fast-btn"
              href="https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#b8121a] hover:bg-[#9a0f16] text-white px-2.5 py-0.5 rounded font-semibold transition-colors flex items-center gap-1 shadow-sm"
            >
              Apply Online <ChevronRight size={11} />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
