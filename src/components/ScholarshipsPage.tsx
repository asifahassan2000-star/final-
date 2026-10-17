import React, { useState } from 'react';
import { 
  Award, GraduationCap, Users, ShieldCheck, ArrowLeft, ArrowRight,
  CheckCircle2, Calculator, Info, ExternalLink, Sparkles, AlertCircle,
  Building2, Percent, HelpCircle, PhoneCall, ChevronRight, BookOpen,
  FileSpreadsheet, Table, Check, Layers
} from 'lucide-react';
import { UCP_CONTACT } from '../data/ucpData';

interface ScholarshipsPageProps {
  onBackToHome: () => void;
  onOpenApply: () => void;
  onOpenProgrammesPage: (progId?: string) => void;
  onOpenFee: () => void;
}

// Subtle, neat jumping word animation component without extra borders
const JumpingWord: React.FC<{ text: string; className?: string; delay?: number }> = ({ 
  text, 
  className = '', 
  delay = 0 
}) => {
  return (
    <span 
      className={`inline-block animate-word-jump ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {text}
    </span>
  );
};

// Subtle neat jumping phrase where each word bounces with gentle stagger
const JumpingPhrase: React.FC<{ 
  phrase: string; 
  className?: string; 
  wordClassName?: string;
  baseDelay?: number;
}> = ({ 
  phrase, 
  className = '', 
  wordClassName = '',
  baseDelay = 0 
}) => {
  const words = phrase.split(' ');
  return (
    <span className={`inline-flex flex-wrap gap-x-1 items-center ${className}`}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className={`inline-block animate-word-jump ${wordClassName}`}
          style={{ animationDelay: `${baseDelay + idx * 110}ms` }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export const ScholarshipsPage: React.FC<ScholarshipsPageProps> = ({
  onBackToHome,
  onOpenApply,
  onOpenProgrammesPage,
  onOpenFee,
}) => {
  // Navigation & Category Tab state
  const [activeTab, setActiveTab] = useState<'all' | 'bs' | 'kinship' | 'adp' | 'cgpa'>('all');

  // Interactive Calculator State
  const [calcDegreeType, setCalcDegreeType] = useState<'bs' | 'adp'>('bs');
  const [calcGroup, setCalcGroup] = useState<'groupA' | 'groupB'>('groupA');
  const [calcMarks, setCalcMarks] = useState<number>(82);
  const [calcCgpa, setCalcCgpa] = useState<number>(3.6);
  const [isOldStudent, setIsOldStudent] = useState<boolean>(false);
  const [isKinshipOrArmed, setIsKinshipOrArmed] = useState<boolean>(false);
  const [calcSemesterType, setCalcSemesterType] = useState<'admission' | 'subsequent'>('admission');

  // Calculate scholarship estimate
  const computeEstimatedScholarship = (): { percent: number; rationale: string; tierTitle: string } => {
    let bestPercent = 0;
    let rationale = '';
    let tierTitle = 'Standard Admission (No Concession)';

    if (calcSemesterType === 'admission') {
      if (calcDegreeType === 'bs') {
        // BS Merit
        if (calcGroup === 'groupA') {
          if (calcMarks >= 80) {
            bestPercent = Math.max(bestPercent, 50);
            tierTitle = '50% Merit Scholarship (At Admission)';
            rationale = 'Intermediate Marks ≥ 80% for BSCS, BBA & Natural Sciences';
          }
        } else {
          if (calcMarks >= 75) {
            bestPercent = Math.max(bestPercent, 50);
            tierTitle = '50% Merit Scholarship (At Admission)';
            rationale = 'Intermediate Marks ≥ 75% for BS Accounting, Psychology, English & Economics';
          }
        }

        // Old student at admission (BS: 25%)
        if (isOldStudent && bestPercent < 25) {
          bestPercent = 25;
          tierTitle = '25% Old Student Concession';
          rationale = 'Punjab Group of Colleges (PGC) / UCP Alumni Privilege';
        }

        // Kinship or Armed Forces (BS: 25%)
        if (isKinshipOrArmed && bestPercent < 25) {
          bestPercent = 25;
          tierTitle = '25% Kinship / Defense / Govt Employee Concession';
          rationale = 'Eligible under Kinship or Public Service criteria';
        }
      } else {
        // ADP Merit
        if (calcMarks >= 75) {
          bestPercent = Math.max(bestPercent, 50);
          tierTitle = '50% Merit Scholarship (At Admission)';
          rationale = 'Intermediate Marks ≥ 75% for 2-Year Associate Degree Programs';
        }

        // ADP Old Student
        if (isOldStudent) {
          if (calcMarks >= 60) {
            if (50 > bestPercent) {
              bestPercent = 50;
              tierTitle = '50% Old Student ADP Concession';
              rationale = 'PGC Alumni with ≥ 60% Intermediate marks in ADP';
            }
          } else {
            if (25 > bestPercent) {
              bestPercent = 25;
              tierTitle = '25% Old Student ADP Concession';
              rationale = 'PGC Alumni with < 60% Intermediate marks in ADP';
            }
          }
        }

        // ADP Kinship / Armed Forces / Teacher child (25%)
        if (isKinshipOrArmed && bestPercent < 25) {
          bestPercent = 25;
          tierTitle = '25% Kinship / Service Concession';
          rationale = 'Kinship / Armed Forces / Teacher child privilege';
        }
      }
    } else {
      // Subsequent Semesters (CGPA based)
      if (calcCgpa >= 3.5) {
        bestPercent = Math.max(bestPercent, 50);
        tierTitle = '50% Dean’s Honor List Performance Scholarship';
        rationale = 'Semester CGPA ≥ 3.50 in subsequent semester';
      } else if (calcCgpa >= 3.25) {
        bestPercent = Math.max(bestPercent, 25);
        tierTitle = '25% Merit Honor List Performance Scholarship';
        rationale = 'Semester CGPA 3.25 to 3.49 in subsequent semester';
      }

      // Old student / Kinship subsequent discount
      if (calcDegreeType === 'bs') {
        if ((isOldStudent || isKinshipOrArmed) && bestPercent < 25) {
          if (calcCgpa >= 2.75) {
            bestPercent = Math.max(bestPercent, 25);
            tierTitle = '25% Subsequent Concession';
            rationale = 'Old Student / Kinship maintaining CGPA ≥ 2.75';
          } else if (calcCgpa >= 2.5) {
            bestPercent = Math.max(bestPercent, 12.5);
            tierTitle = '12.5% Subsequent Concession';
            rationale = 'Old Student / Kinship maintaining CGPA 2.50 - 2.74';
          }
        }
      } else {
        // ADP Subsequent
        if (isOldStudent && bestPercent < 50) {
          if (calcCgpa >= 2.75) {
            bestPercent = Math.max(bestPercent, 50);
            tierTitle = '50% Old Student Subsequent Concession';
            rationale = 'ADP Old Student maintaining CGPA ≥ 2.75';
          } else if (calcCgpa >= 2.5) {
            bestPercent = Math.max(bestPercent, 25);
            tierTitle = '25% Old Student Subsequent Concession';
            rationale = 'ADP Old Student maintaining CGPA 2.50 - 2.74';
          }
        } else if (isKinshipOrArmed && bestPercent < 25) {
          if (calcCgpa >= 2.75) {
            bestPercent = Math.max(bestPercent, 25);
            tierTitle = '25% Kinship Subsequent Concession';
            rationale = 'ADP Kinship / Public Service maintaining CGPA ≥ 2.75';
          } else if (calcCgpa >= 2.5) {
            bestPercent = Math.max(bestPercent, 12.5);
            tierTitle = '12.5% Kinship Subsequent Concession';
            rationale = 'ADP Kinship / Public Service maintaining CGPA 2.50 - 2.74';
          }
        }
      }
    }

    if (bestPercent === 0) {
      rationale = 'Score below standard concession threshold. Need-based review available at Admissions Office.';
    }

    return { percent: bestPercent, rationale, tierTitle };
  };

  const calculatedResult = computeEstimatedScholarship();

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1F2937] font-['Inter',sans-serif] selection:bg-[#0F2C52] selection:text-white">
      
      {/* =========================================================================
          1. HERO HEADER SECTION — CLEAN INSTITUTIONAL STYLE (NO RED BORDERS)
          ========================================================================= */}
      <section className="bg-[#FFFFFF] py-14 sm:py-18 border-b border-[#E5E7EB]">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5E7EB]">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4B5563] hover:text-[#0F2C52] transition-colors cursor-pointer group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1 text-[#6B7280] group-hover:text-[#0F2C52]" />
              <span>Back to Campus Home</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-[#6B7280] font-normal">
              <span>Home</span>
              <span className="text-[#9CA3AF]">/</span>
              <span>Financial Aid</span>
              <span className="text-[#9CA3AF]">/</span>
              <span className="text-[#0F2C52] font-semibold">Scholarships & Concessions</span>
            </div>
          </div>

          {/* Official Badge */}
          <div className="inline-block bg-[#FFF7ED] text-[#9A3412] border border-[#FED7AA] text-[11px] uppercase font-semibold tracking-[0.5px] rounded-[4px] px-[14px] py-[6px] mb-5">
            Official University Scholarships & Concession Schedules — Fall 2026
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-[40px] font-bold text-[#111827] leading-[1.2] tracking-tight">
            <span className="text-[#0F2C52]">Scholarships</span> & Academic Concessions
          </h1>

          {/* Paragraph */}
          <p className="mt-4 text-[15px] text-[#4B5563] leading-[1.7] max-w-[800px] font-normal">
            At the University of Central Punjab, education is an investment in human potential. 
            With over <strong className="text-[#0F2C52] font-semibold">PKR 1.3 Billion</strong> disbursed annually 
            across the Punjab Group network, we ensure financial accessibility for all deserving scholars through 
            transparent, merit-based tuition waivers.
          </p>

          {/* 4 Clean Metric Cards (No red borders, no selected red boxes) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            
            {/* Box 1: Merit Tier */}
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-5 transition-all hover:border-[#CBD5E1] hover:shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-[0.6px] block">
                Merit Tier
              </span>
              <div className="text-[26px] font-bold text-[#0F2C52] mt-1.5 flex items-baseline gap-1">
                <span>Up to</span>
                <JumpingWord text="50%" className="text-[#a30f16]" />
              </div>
              <span className="text-[12px] text-[#4B5563] mt-0.5 block font-medium">
                At Admission & CGPA Honors
              </span>
            </div>

            {/* Box 2: PGC Alumni */}
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-5 transition-all hover:border-[#CBD5E1] hover:shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-[0.6px] block">
                PGC Alumni
              </span>
              <div className="text-[26px] font-bold text-[#0F2C52] mt-1.5 flex items-baseline gap-1">
                <span>Up to</span>
                <JumpingWord text="50%" className="text-[#a30f16]" />
              </div>
              <span className="text-[12px] text-[#4B5563] mt-0.5 block font-medium">
                Old Student Privilege
              </span>
            </div>

            {/* Box 3: Kinship / Govt */}
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-5 transition-all hover:border-[#CBD5E1] hover:shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-[0.6px] block">
                Kinship / Govt
              </span>
              <div className="text-[26px] font-bold text-[#0F2C52] mt-1.5 flex items-baseline gap-1">
                <JumpingPhrase phrase="25% Tuition" wordClassName="text-[#0F2C52]" />
              </div>
              <span className="text-[12px] text-[#4B5563] mt-0.5 block font-medium">
                Sibling & Armed Forces
              </span>
            </div>

            {/* Box 4: Annual Fund */}
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-5 transition-all hover:border-[#CBD5E1] hover:shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-[0.6px] block">
                Annual Fund
              </span>
              <div className="text-[26px] font-bold text-[#0F2C52] mt-1.5 flex items-baseline gap-1">
                <JumpingPhrase phrase="1.3B+ PKR" wordClassName="text-[#0F2C52]" />
              </div>
              <span className="text-[12px] text-[#4B5563] mt-0.5 block font-medium">
                Total Annual Concessions
              </span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button
              onClick={onOpenApply}
              className="bg-[#0F2C52] hover:bg-[#0a1e38] text-white text-[14px] font-medium px-[22px] py-[10px] rounded-[6px] transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Apply for Admission Fall 2026</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('scholarship-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white border border-[#D1D5DB] text-[#374151] hover:bg-[#F9FAFB] text-[14px] font-medium px-[20px] py-[10px] rounded-[6px] transition-colors cursor-pointer flex items-center gap-2"
            >
              <Calculator size={16} className="text-[#4B5563]" />
              <span>Interactive Eligibility Calculator</span>
            </button>

            <button
              onClick={onOpenFee}
              className="bg-white border border-[#D1D5DB] hover:bg-[#F9FAFB] text-[#374151] text-[14px] font-medium px-[20px] py-[10px] rounded-[6px] transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>View Verified Fee Structure</span>
              <ExternalLink size={14} className="text-[#6B7280]" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. INTERACTIVE ELIGIBILITY ESTIMATOR (NO RED BORDERS, NO RED BOXES)
          ========================================================================= */}
      <section 
        id="scholarship-calculator" 
        className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden shadow-xs">
          
          {/* Top Bar (Clean Navy Header) */}
          <div className="bg-[#0F2C52] border-b border-[#0A1E38] p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-[4px] text-white">
                <FileSpreadsheet size={20} />
              </div>
              <div>
                <h3 className="text-[15px] sm:text-[16px] font-bold text-white">
                  Official Scholarship & Concession Calculator
                </h3>
                <p className="text-[12px] text-slate-300 mt-0.5">
                  Real-Time Institutional Eligibility Rule Engine • Fall 2026
                </p>
              </div>
            </div>

            {/* Semester Switcher */}
            <div className="inline-flex bg-white/10 p-1 rounded-[6px] border border-white/20">
              <button
                onClick={() => setCalcSemesterType('admission')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] transition-colors cursor-pointer ${
                  calcSemesterType === 'admission' 
                    ? 'bg-white text-[#0F2C52]' 
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                1st Semester (Intermediate Marks)
              </button>
              <button
                onClick={() => setCalcSemesterType('subsequent')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] transition-colors cursor-pointer ${
                  calcSemesterType === 'subsequent' 
                    ? 'bg-white text-[#0F2C52]' 
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                Subsequent Semesters (CGPA)
              </button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Degree Program Level */}
              <div>
                <label className="text-[11px] font-bold text-[#374151] uppercase tracking-[0.6px] block mb-2">
                  1. Degree Program Level
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCalcDegreeType('bs')}
                    className={`p-3 rounded-[6px] border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                      calcDegreeType === 'bs' 
                        ? 'border-[#0F2C52] bg-[#0F2C52]/5 text-[#0F2C52] font-semibold' 
                        : 'border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#4B5563]'
                    }`}
                  >
                    <GraduationCap className={calcDegreeType === 'bs' ? 'text-[#0F2C52]' : 'text-[#9CA3AF]'} size={20} />
                    <div>
                      <span className="text-sm block font-bold">BS Programs (4 Years)</span>
                      <span className="text-[11px] text-[#6B7280]">CS, BBA, Sciences, Arts</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setCalcDegreeType('adp')}
                    className={`p-3 rounded-[6px] border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                      calcDegreeType === 'adp' 
                        ? 'border-[#0F2C52] bg-[#0F2C52]/5 text-[#0F2C52] font-semibold' 
                        : 'border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#4B5563]'
                    }`}
                  >
                    <BookOpen className={calcDegreeType === 'adp' ? 'text-[#0F2C52]' : 'text-[#9CA3AF]'} size={20} />
                    <div>
                      <span className="text-sm block font-bold">ADP Programs (2 Years)</span>
                      <span className="text-[11px] text-[#6B7280]">Associate Degrees (13 Fields)</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Sub-discipline group for BS */}
              {calcDegreeType === 'bs' && calcSemesterType === 'admission' && (
                <div>
                  <label className="text-[11px] font-bold text-[#374151] uppercase tracking-[0.6px] block mb-2">
                    2. Academic Discipline Group
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setCalcGroup('groupA')}
                      className={`p-2.5 rounded-[6px] border text-left transition-colors cursor-pointer ${
                        calcGroup === 'groupA'
                          ? 'border-[#0F2C52] bg-[#0F2C52]/5 text-[#0F2C52] font-semibold'
                          : 'border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <span className="block font-bold">Group A: BSCS, BBA, Natural Sciences</span>
                      <span className="text-[11px] text-[#6B7280]">Phy, Chem, Math, Zoology (≥ 80% for 50%)</span>
                    </button>

                    <button
                      onClick={() => setCalcGroup('groupB')}
                      className={`p-2.5 rounded-[6px] border text-left transition-colors cursor-pointer ${
                        calcGroup === 'groupB'
                          ? 'border-[#0F2C52] bg-[#0F2C52]/5 text-[#0F2C52] font-semibold'
                          : 'border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <span className="block font-bold">Group B: BS ACC, PSY, ENG, ECO</span>
                      <span className="text-[11px] text-[#6B7280]">Psychology, English, Econ (≥ 75% for 50%)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Score Slider */}
              {calcSemesterType === 'admission' ? (
                <div className="bg-[#F9FAFB] p-4 border border-[#E5E7EB] rounded-[6px]">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-bold text-[#374151] uppercase tracking-[0.6px]">
                      Intermediate / HSSC Score Percentage:
                    </label>
                    <span className="text-xl font-bold text-[#0F2C52] font-mono">{calcMarks}%</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={100}
                    step={1}
                    value={calcMarks}
                    onChange={(e) => setCalcMarks(Number(e.target.value))}
                    className="w-full h-2 bg-[#E5E7EB] appearance-none cursor-pointer accent-[#0F2C52]"
                  />
                  <div className="flex justify-between text-[11px] text-[#6B7280] mt-1.5 font-mono">
                    <span>50%</span>
                    <span>60% (ADP Alumni)</span>
                    <span className="text-[#0F2C52] font-semibold">75% (Group B / ADP)</span>
                    <span className="text-[#0F2C52] font-semibold">80% (Group A)</span>
                    <span>100%</span>
                  </div>
                </div>
              ) : (
                <div className="bg-[#F9FAFB] p-4 border border-[#E5E7EB] rounded-[6px]">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-bold text-[#374151] uppercase tracking-[0.6px]">
                      University Semester CGPA:
                    </label>
                    <span className="text-xl font-bold text-[#0F2C52] font-mono">{calcCgpa.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={2.0}
                    max={4.0}
                    step={0.05}
                    value={calcCgpa}
                    onChange={(e) => setCalcCgpa(Number(e.target.value))}
                    className="w-full h-2 bg-[#E5E7EB] appearance-none cursor-pointer accent-[#0F2C52]"
                  />
                  <div className="flex justify-between text-[11px] text-[#6B7280] mt-1.5 font-mono">
                    <span>2.00</span>
                    <span>2.50 (Concession)</span>
                    <span>2.75 (Concession)</span>
                    <span className="text-[#0F2C52] font-semibold">3.25 (25% Merit)</span>
                    <span className="text-[#a30f16] font-semibold">3.50 (50% Merit)</span>
                    <span>4.00</span>
                  </div>
                </div>
              )}

              {/* Special Privilege Checkboxes */}
              <div className="pt-3 border-t border-[#E5E7EB] flex flex-wrap gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isOldStudent}
                    onChange={(e) => setIsOldStudent(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0F2C52] focus:ring-[#0F2C52] accent-[#0F2C52]"
                  />
                  <span className="font-medium text-[#374151]">
                    Punjab Group of Colleges (PGC) / UCP Old Student
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isKinshipOrArmed}
                    onChange={(e) => setIsKinshipOrArmed(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0F2C52] focus:ring-[#0F2C52] accent-[#0F2C52]"
                  />
                  <span className="font-medium text-[#374151]">
                    Kinship / Armed Forces / Govt Employee / Teacher Child
                  </span>
                </label>
              </div>

            </div>

            {/* Calculated Result Card (Clean styling, no red border) */}
            <div className="lg:col-span-5 border border-[#E5E7EB] bg-[#F9FAFB] rounded-[8px] p-6 flex flex-col justify-between h-full min-h-[290px]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.8px] text-[#6B7280]">
                    Calculated Concession
                  </span>
                  <span className="text-[11px] bg-[#E5E7EB] text-[#374151] px-2.5 py-0.5 rounded-[4px] font-medium">
                    {calcSemesterType === 'admission' ? 'At Admission' : 'Subsequent Semester'}
                  </span>
                </div>

                {/* Big Percentage Display with Jumping Word Animation */}
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-black text-[#a30f16] tracking-tight">
                      <JumpingWord text={`${calculatedResult.percent}%`} className="text-[#a30f16]" />
                    </span>
                    <div className="text-left">
                      <span className="text-sm font-bold text-[#111827] block">
                        Tuition Fee Waiver
                      </span>
                      <span className="text-xs text-[#a30f16] font-semibold">
                        {calculatedResult.percent > 0 ? (
                          <JumpingPhrase phrase="Official Eligible Category" baseDelay={200} />
                        ) : (
                          'Standard Evaluation'
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rationale & Tier Info */}
                <div className="mt-4 p-3.5 bg-white border border-[#E5E7EB] rounded-[6px]">
                  <h4 className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-[#0F2C52] shrink-0" />
                    <span>{calculatedResult.tierTitle}</span>
                  </h4>
                  <p className="text-[12px] text-[#4B5563] mt-1 leading-snug font-normal">
                    {calculatedResult.rationale}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E5E7EB] space-y-2">
                <button
                  onClick={onOpenApply}
                  className="w-full py-[10px] px-[20px] bg-[#0F2C52] hover:bg-[#0a1e38] text-white text-[14px] font-medium rounded-[6px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Apply Now & Claim Scholarship</span>
                  <ArrowRight size={14} />
                </button>
                <p className="text-[11px] text-center text-[#6B7280]">
                  * Policy Clause: Single highest concession applies. Official verification via transcript submission.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CATEGORY FILTER TABS
          ========================================================================= */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-[20px] font-bold text-[#111827] flex items-center gap-2">
              <Table size={18} className="text-[#0F2C52]" />
              <span>Official Institutional Concession Schedules</span>
            </h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Verified criteria for Undergraduate BS Degrees, Associate Degrees, Kinship, and Alumni.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Official Schedules' },
              { id: 'bs', label: 'BS Degree Merit' },
              { id: 'kinship', label: 'Old Student & Kinship' },
              { id: 'cgpa', label: 'CGPA Academic Honors' },
              { id: 'adp', label: 'ADP 2-Year Programs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-1.5 rounded-[6px] text-xs font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0F2C52] text-white shadow-xs'
                    : 'bg-white text-[#4B5563] hover:bg-[#F9FAFB] border border-[#E5E7EB]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. RECTANGULAR EXCEL STYLE TABLES (NO RED BORDERS, NO RED BOXES)
          ========================================================================= */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-9">

        {/* -----------------------------------------------------------------------
            SECTION 1: MERIT SCHOLARSHIPS — BS DEGREE PROGRAMS
            ----------------------------------------------------------------------- */}
        {(activeTab === 'all' || activeTab === 'bs') && (
          <div className="space-y-7">
            
            {/* Table 1.1: Group A (CSS selector 5 target) */}
            <div 
              id="sec-bs-groupa"
              className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden shadow-xs"
            >
              {/* Clean Sheet Header — NO red box with text */}
              <div className="bg-[#0F2C52] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0A1E38]">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-[16px] font-bold text-white">
                      Merit Scholarships: BSCS, BBA & Natural Sciences (Group A)
                    </h3>
                    <span className="text-[11px] text-slate-300 block">
                      Discipline: Computer Science, Business Administration, Physics, Chemistry, Mathematics, Zoology
                    </span>
                  </div>
                </div>
                <span className="text-[11px] bg-white/10 text-slate-200 px-3 py-1 rounded-[4px] self-start sm:self-auto font-medium">
                  Standard 4-Year BS
                </span>
              </div>

              <div className="p-5 space-y-6">
                
                {/* 1.1 At Admission Excel Table */}
                <div>
                  <div className="bg-[#F8FAFC] border border-[#CBD5E1] border-b-0 px-3.5 py-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E293B]">
                      Table 1.1-A: Merit Based Scholarship at the Time of Admission (1st Semester)
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">Range: HSSC Intermediate Marks</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="excel-table-grid text-sm">
                      <thead>
                        <tr className="bg-[#F1F5F9] text-[#334155] text-xs font-bold uppercase">
                          <th className="py-2.5 px-4 text-left w-12 text-[#64748B]">Col</th>
                          <th className="py-2.5 px-4 text-left">Intermediate / HSSC Percentage Score</th>
                          <th className="py-2.5 px-4 text-center">Scholarship Percentage Offered</th>
                          <th className="py-2.5 px-4 text-left">Applicability & Conditions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white hover:bg-[#F9FAFB] transition-colors">
                          <td className="py-3 px-4 text-xs font-mono text-[#64748B]">A1</td>
                          <td className="py-3 px-4 font-bold text-[#111827]">
                            80% and above in Intermediate
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-block px-3 py-1 bg-[#FFF1F2] text-[#a30f16] font-black text-base border border-[#FECDD3] rounded-[4px]">
                              <JumpingWord text="50%" className="text-[#a30f16]" />
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs text-[#4B5563]">
                            Applicable in 1st Semester on Tuition Fee upon verified transcript submission
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 1.1 Subsequent Semesters Excel Table */}
                <div>
                  <div className="bg-[#F8FAFC] border border-[#CBD5E1] border-b-0 px-3.5 py-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E293B]">
                      Table 1.1-B: Merit Based Scholarship for Subsequent Semester(s) (Semester 2 to 8)
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">Range: Semester CGPA</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="excel-table-grid text-sm">
                      <thead>
                        <tr className="bg-[#F1F5F9] text-[#334155] text-xs font-bold uppercase">
                          <th className="py-2.5 px-4 text-left w-12 text-[#64748B]">Col</th>
                          <th className="py-2.5 px-4 text-left">Semester CGPA Requirement</th>
                          <th className="py-2.5 px-4 text-center">Scholarship Percentage Offered</th>
                          <th className="py-2.5 px-4 text-left">Academic Honors Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white hover:bg-[#F9FAFB] transition-colors">
                          <td className="py-3 px-4 text-xs font-mono text-[#64748B]">B1</td>
                          <td className="py-3 px-4 font-bold text-[#111827]">
                            Greater than or equal to 3.50 (CGPA ≥ 3.50)
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-block px-3 py-1 bg-[#FFF1F2] text-[#a30f16] font-black text-base border border-[#FECDD3] rounded-[4px]">
                              <JumpingWord text="50%" className="text-[#a30f16]" />
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs text-[#4B5563]">
                            Dean’s Honor Roll — Awarded per semester upon result declaration
                          </td>
                        </tr>
                        <tr className="bg-[#F9FAFB] hover:bg-[#F1F5F9] transition-colors">
                          <td className="py-3 px-4 text-xs font-mono text-[#64748B]">B2</td>
                          <td className="py-3 px-4 font-bold text-[#111827]">
                            3.25 to less than 3.50 (3.25 ≤ CGPA &lt; 3.50)
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-block px-3 py-1 bg-slate-100 text-[#1E293B] font-bold border border-slate-300 rounded-[4px]">
                              25%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs text-[#4B5563]">
                            Merit Honor Roll — Maintained on full academic course load
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>

            {/* Table 1.2: Group B (CSS selector 4 target) */}
            <div 
              id="sec-bs-groupb"
              className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden shadow-xs"
            >
              {/* Clean Sheet Header — NO red box with text */}
              <div className="bg-[#0F2C52] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0A1E38]">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-[16px] font-bold text-white">
                      Merit Scholarships: BS Accounting, Psychology, English & Economics (Group B)
                    </h3>
                    <span className="text-[11px] text-slate-300 block">
                      Discipline: BS Accounting & Finance, BS Psychology, BS English, BS Economics
                    </span>
                  </div>
                </div>
                <span className="text-[11px] bg-white/10 text-slate-200 px-3 py-1 rounded-[4px] self-start sm:self-auto font-medium">
                  Faculty of Management & Humanities
                </span>
              </div>

              <div className="p-5 space-y-6">
                
                {/* At Admission */}
                <div>
                  <div className="bg-[#F8FAFC] border border-[#CBD5E1] border-b-0 px-3.5 py-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E293B]">
                      Table 1.2-A: Merit Based Scholarship at the Time of Admission (1st Semester)
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">Eligibility: ≥ 75% Score</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="excel-table-grid text-sm">
                      <thead>
                        <tr className="bg-[#F1F5F9] text-[#334155] text-xs font-bold uppercase">
                          <th className="py-2.5 px-4 text-left w-12 text-[#64748B]">Col</th>
                          <th className="py-2.5 px-4 text-left">Intermediate / HSSC Percentage Score</th>
                          <th className="py-2.5 px-4 text-center">Scholarship Percentage Offered</th>
                          <th className="py-2.5 px-4 text-left">Applicability</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white hover:bg-[#F9FAFB] transition-colors">
                          <td className="py-3 px-4 text-xs font-mono text-[#64748B]">C1</td>
                          <td className="py-3 px-4 font-bold text-[#111827]">
                            75% and above in Intermediate
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-block px-3 py-1 bg-[#FFF1F2] text-[#a30f16] font-black text-base border border-[#FECDD3] rounded-[4px]">
                              <JumpingWord text="50%" className="text-[#a30f16]" />
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs text-[#4B5563]">
                            Direct 50% Concession on 1st Semester Tuition Fee
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Subsequent */}
                <div>
                  <div className="bg-[#F8FAFC] border border-[#CBD5E1] border-b-0 px-3.5 py-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E293B]">
                      Table 1.2-B: Subsequent Semester CGPA Criteria
                    </span>
                    <span className="text-[10px] text-[#64748B] font-mono">Range: CGPA ≥ 3.25</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="excel-table-grid text-sm">
                      <thead>
                        <tr className="bg-[#F1F5F9] text-[#334155] text-xs font-bold uppercase">
                          <th className="py-2.5 px-4 text-left w-12 text-[#64748B]">Col</th>
                          <th className="py-2.5 px-4 text-left">Semester CGPA Requirement</th>
                          <th className="py-2.5 px-4 text-center">Scholarship Percentage Offered</th>
                          <th className="py-2.5 px-4 text-left">Requirement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white hover:bg-[#F9FAFB] transition-colors">
                          <td className="py-3 px-4 text-xs font-mono text-[#64748B]">D1</td>
                          <td className="py-3 px-4 font-bold text-[#111827]">
                            Greater than or equal to 3.50 (CGPA ≥ 3.50)
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-block px-3 py-1 bg-[#FFF1F2] text-[#a30f16] font-black text-base border border-[#FECDD3] rounded-[4px]">
                              <JumpingWord text="50%" className="text-[#a30f16]" />
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs text-[#4B5563]">
                            Semester Performance Award
                          </td>
                        </tr>
                        <tr className="bg-[#F9FAFB] hover:bg-[#F1F5F9] transition-colors">
                          <td className="py-3 px-4 text-xs font-mono text-[#64748B]">D2</td>
                          <td className="py-3 px-4 font-bold text-[#111827]">
                            3.25 to less than 3.50 (3.25 ≤ CGPA &lt; 3.50)
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="inline-block px-3 py-1 bg-slate-100 text-[#1E293B] font-bold border border-slate-300 rounded-[4px]">
                              25%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs text-[#4B5563]">
                            Merit Honor Award
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* -----------------------------------------------------------------------
            SECTION 2: OLD STUDENT & KINSHIP CONCESSIONS (ALL BS PROGRAMS)
            (CSS selector 3 target)
            ----------------------------------------------------------------------- */}
        {(activeTab === 'all' || activeTab === 'kinship') && (
          <div 
            id="sec-kinship"
            className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden shadow-xs"
          >
            {/* Clean Sheet Header — NO red box with text */}
            <div className="bg-[#0F2C52] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0A1E38]">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-[16px] font-bold text-white">
                    Scholarship & Concession Detail for All BS Programs (Old Students & Kinship)
                  </h3>
                  <span className="text-[11px] text-slate-300 block">
                    Institutional Privilege: Punjab Group of Colleges (PGC) Alumni, Siblings, and Armed Forces Children
                  </span>
                </div>
              </div>
              <span className="text-[11px] bg-white/10 text-slate-200 px-3 py-1 rounded-[4px] self-start sm:self-auto font-medium">
                Alumni & Family Privilege
              </span>
            </div>

            <div className="p-5 space-y-6">
              
              {/* At Admission */}
              <div>
                <div className="bg-[#F8FAFC] border border-[#CBD5E1] border-b-0 px-3.5 py-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E293B] flex items-center gap-2">
                    <Users size={14} className="text-[#0F2C52]" />
                    Table 2.1: At the Time of Admissions (1st Semester)
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono">Category: Admission Concession</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="excel-table-grid text-sm">
                    <thead>
                      <tr className="bg-[#F1F5F9] text-[#334155] text-xs font-bold uppercase">
                        <th className="py-2.5 px-4 text-left w-12 text-[#64748B]">Col</th>
                        <th className="py-2.5 px-4 text-left">Beneficiary Category</th>
                        <th className="py-2.5 px-4 text-center">Concession Percentage Offered</th>
                        <th className="py-2.5 px-4 text-left">Applicable Terms</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">E1</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          Old Student (PGC / UCP Alumni)
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-slate-100 text-[#0F2C52] font-bold text-base border border-slate-300 rounded-[4px]">
                            25%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          Applicable on intermediate graduates from any PGC institution
                        </td>
                      </tr>
                      <tr className="bg-[#F9FAFB] hover:bg-[#F1F5F9] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">E2</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          Kinship (Sibling enrolled in UCP / PGC)
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-slate-100 text-[#0F2C52] font-bold text-base border border-slate-300 rounded-[4px]">
                            25%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          Awarded to concurrent sibling studying across campus network
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Subsequent Semesters */}
              <div>
                <div className="bg-[#F8FAFC] border border-[#CBD5E1] border-b-0 px-3.5 py-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E293B] flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#0F2C52]" />
                    Table 2.2: Discount for Subsequent Semester(s) (Semester 2 Onwards)
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono">Retention: CGPA Retention Rules</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="excel-table-grid text-sm">
                    <thead>
                      <tr className="bg-[#F1F5F9] text-[#334155] text-xs font-bold uppercase">
                        <th className="py-2.5 px-4 text-left w-12 text-[#64748B]">Col</th>
                        <th className="py-2.5 px-4 text-left">Old Students & Kinship (CGPA Performance)</th>
                        <th className="py-2.5 px-4 text-center">Discount Percentage Offered</th>
                        <th className="py-2.5 px-4 text-left">Continuation Threshold</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">F1</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          CGPA greater than or equal to 2.75 (CGPA ≥ 2.75)
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-slate-100 text-[#0F2C52] font-bold text-base border border-slate-300 rounded-[4px]">
                            25%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          Maintains 100% of the original 25% concession
                        </td>
                      </tr>
                      <tr className="bg-[#F9FAFB] hover:bg-[#F1F5F9] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">F2</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          CGPA 2.50 to less than 2.75 (2.50 ≤ CGPA &lt; 2.75)
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-slate-100 text-[#1E293B] font-bold border border-slate-300 rounded-[4px]">
                            12.5%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          Reduced 50% concession tier for moderate standing
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------------
            SECTION 3: CGPA BASED PERFORMANCE SCHOLARSHIP (ALL PROGRAMS)
            (CSS selector 2 target)
            ----------------------------------------------------------------------- */}
        {(activeTab === 'all' || activeTab === 'cgpa') && (
          <div 
            id="sec-cgpa"
            className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden shadow-xs"
          >
            {/* Clean Sheet Header — NO red box with text */}
            <div className="bg-[#0F2C52] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0A1E38]">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-[16px] font-bold text-white">
                    CGPA Based Performance Scholarship (Open to All Academic Programs)
                  </h3>
                  <span className="text-[11px] text-slate-300 block">
                    Available to all students across Undergraduate and Associate Degrees after 1st Semester
                  </span>
                </div>
              </div>
              <span className="text-[11px] bg-white/10 text-slate-200 px-3 py-1 rounded-[4px] self-start sm:self-auto font-medium">
                University Merit Honors
              </span>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-sm text-[#4B5563]">
                Students of <strong>all programs</strong> can avail the following CGPA based Performance Scholarship after completing their <strong>1<sup>st</sup> semester</strong>:
              </p>

              <div className="overflow-x-auto">
                <table className="excel-table-grid text-sm">
                  <thead>
                    <tr className="bg-[#F1F5F9] text-[#334155] text-xs font-bold uppercase">
                      <th className="py-2.5 px-4 text-left w-12 text-[#64748B]">Col</th>
                      <th className="py-2.5 px-4 text-left">Students Having Semester CGPA</th>
                      <th className="py-2.5 px-4 text-center">Scholarship Percentage Offered</th>
                      <th className="py-2.5 px-4 text-left">Academic Distinction Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-3 px-4 text-xs font-mono text-[#64748B]">G1</td>
                      <td className="py-3 px-4 font-bold text-[#111827]">
                        Greater than or equal to 3.50 (CGPA ≥ 3.50)
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-3 py-1 bg-[#FFF1F2] text-[#a30f16] font-black text-base border border-[#FECDD3] rounded-[4px]">
                          <JumpingWord text="50%" className="text-[#a30f16]" />
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-[#4B5563]">
                        <strong>Dean’s Honor List:</strong> 50% tuition reduction in following semester
                      </td>
                    </tr>
                    <tr className="bg-[#F9FAFB] hover:bg-[#F1F5F9] transition-colors">
                      <td className="py-3 px-4 text-xs font-mono text-[#64748B]">G2</td>
                      <td className="py-3 px-4 font-bold text-[#111827]">
                        3.25 to less than 3.50 (3.25 ≤ CGPA &lt; 3.50)
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-3 py-1 bg-slate-100 text-[#1E293B] font-bold border border-slate-300 rounded-[4px]">
                          25%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-[#4B5563]">
                        <strong>Merit Honor List:</strong> 25% tuition reduction in following semester
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------------
            SECTION 4: ASSOCIATE DEGREE PROGRAMS (ADP - 2 YEARS)
            (CSS selector 1 target)
            ----------------------------------------------------------------------- */}
        {(activeTab === 'all' || activeTab === 'adp') && (
          <div 
            id="sec-adp"
            className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden shadow-xs"
          >
            {/* Clean Sheet Header — NO red box with text */}
            <div className="bg-[#0F2C52] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0A1E38]">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-[16px] font-bold text-white">
                    Associate Degree Programs: ADP-BA, ADP-AF, ADP-CS, ADP-BZC & ADP-MP
                  </h3>
                  <span className="text-[11px] text-slate-300 block">
                    All 13 Accredited 2-Year Associate Degree Programs (Computing, Business, Analytics, Sciences)
                  </span>
                </div>
              </div>
              <span className="text-[11px] bg-white/10 text-slate-200 px-3 py-1 rounded-[4px] self-start sm:self-auto font-medium">
                2-Year Degree Matrix
              </span>
            </div>

            <div className="p-5 space-y-6">
              
              {/* 4.1 ADP Merit Based */}
              <div>
                <div className="bg-[#F8FAFC] border border-[#CBD5E1] border-b-0 px-3.5 py-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E293B]">
                    Table 4.1: Merit Based Scholarship for ADP (At Admission & Subsequent)
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono">Type: Pure Merit</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="excel-table-grid text-sm">
                    <thead>
                      <tr className="bg-[#F1F5F9] text-[#334155] text-xs font-bold uppercase">
                        <th className="py-2.5 px-4 text-left w-12 text-[#64748B]">Col</th>
                        <th className="py-2.5 px-4 text-left">Academic Assessment Criteria</th>
                        <th className="py-2.5 px-4 text-center">Scholarship Percentage Offered</th>
                        <th className="py-2.5 px-4 text-left">Term Applicable</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">H1</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          75% and above marks in Intermediate (HSSC)
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-[#FFF1F2] text-[#a30f16] font-black text-base border border-[#FECDD3] rounded-[4px]">
                            <JumpingWord text="50%" className="text-[#a30f16]" />
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          At Admission (1st Semester)
                        </td>
                      </tr>
                      <tr className="bg-[#F9FAFB] hover:bg-[#F1F5F9] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">H2</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          Subsequent Semester CGPA ≥ 3.50
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-[#FFF1F2] text-[#a30f16] font-black text-base border border-[#FECDD3] rounded-[4px]">
                            <JumpingWord text="50%" className="text-[#a30f16]" />
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          Subsequent Semester(s) Performance
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">H3</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          Subsequent Semester CGPA 3.25 to less than 3.50
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-slate-100 text-[#1E293B] font-bold border border-slate-300 rounded-[4px]">
                            25%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          Subsequent Semester(s) Performance
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4.2 ADP Old Student Discounts */}
              <div>
                <div className="bg-[#F8FAFC] border border-[#CBD5E1] border-b-0 px-3.5 py-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E293B]">
                    Table 4.2: Old Student Discounts for All ADP Programs (PGC Alumni)
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono">Alumni Tier</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="excel-table-grid text-sm">
                    <thead>
                      <tr className="bg-[#F1F5F9] text-[#334155] text-xs font-bold uppercase">
                        <th className="py-2.5 px-4 text-left w-12 text-[#64748B]">Col</th>
                        <th className="py-2.5 px-4 text-left">Old Student Status & Score Criteria</th>
                        <th className="py-2.5 px-4 text-center">Concession Percentage Offered</th>
                        <th className="py-2.5 px-4 text-left">Conditions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">I1</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          60% and above marks in Intermediate (At Admission)
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-[#FFF1F2] text-[#a30f16] font-black text-base border border-[#FECDD3] rounded-[4px]">
                            <JumpingWord text="50%" className="text-[#a30f16]" />
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          PGC Alumni special privilege in 1st Semester
                        </td>
                      </tr>
                      <tr className="bg-[#F9FAFB] hover:bg-[#F1F5F9] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">I2</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          Less than 60% marks in Intermediate (At Admission)
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-slate-100 text-[#1E293B] font-bold border border-slate-300 rounded-[4px]">
                            25%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          PGC Alumni standard concession in 1st Semester
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">I3</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          Subsequent Semester CGPA greater than or equal to 2.75 (CGPA ≥ 2.75)
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-[#FFF1F2] text-[#a30f16] font-black text-base border border-[#FECDD3] rounded-[4px]">
                            <JumpingWord text="50%" className="text-[#a30f16]" />
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          Full continuation of 50% waiver in ADP subsequent terms
                        </td>
                      </tr>
                      <tr className="bg-[#F9FAFB] hover:bg-[#F1F5F9] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">I4</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          Subsequent Semester CGPA 2.50 to less than 2.75
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-slate-100 text-[#1E293B] font-bold border border-slate-300 rounded-[4px]">
                            25%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          Adjusted concession tier
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4.3 ADP Kinship & Govt Service */}
              <div>
                <div className="bg-[#F8FAFC] border border-[#CBD5E1] border-b-0 px-3.5 py-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E293B]">
                    Table 4.3: Kinship / Government / Civil / Armed Forces / Teachers Child in ADP
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono">Service & Family</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="excel-table-grid text-sm">
                    <thead>
                      <tr className="bg-[#F1F5F9] text-[#334155] text-xs font-bold uppercase">
                        <th className="py-2.5 px-4 text-left w-12 text-[#64748B]">Col</th>
                        <th className="py-2.5 px-4 text-left">Beneficiary Group</th>
                        <th className="py-2.5 px-4 text-center">Discount Percentage</th>
                        <th className="py-2.5 px-4 text-left">Retention Criteria</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">J1</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          At Admission (1st Semester)
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-slate-100 text-[#0F2C52] font-bold border border-slate-300 rounded-[4px]">
                            25%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          Proof of sibling enrollment / defense service book / teacher certificate
                        </td>
                      </tr>
                      <tr className="bg-[#F9FAFB] hover:bg-[#F1F5F9] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">J2</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          Subsequent Semester CGPA ≥ 2.75
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-slate-100 text-[#0F2C52] font-bold border border-slate-300 rounded-[4px]">
                            25%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          Maintained across semesters 2 to 4
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-[#F9FAFB] transition-colors">
                        <td className="py-3 px-4 text-xs font-mono text-[#64748B]">J3</td>
                        <td className="py-3 px-4 font-bold text-[#111827]">
                          Subsequent Semester CGPA 2.50 to less than 2.75
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-slate-100 text-[#1E293B] font-bold border border-slate-300 rounded-[4px]">
                            12.5%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4B5563]">
                          Reduced retention rate
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------------
            5. IMPORTANT OFFICIAL UNIVERSITY CONCESSION CLAUSE
            ----------------------------------------------------------------------- */}
        <div 
          id="sec-policy"
          className="bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] rounded-[10px] p-5 shadow-xs"
        >
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="text-[#B45309] shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="text-[15px] font-bold text-[#92400E]">
                Official University Concession Non-Stacking Clause
              </h4>
              <p className="text-[13px] text-[#92400E] leading-relaxed">
                <strong>NOTE:</strong> Multiple concessions <strong>cannot</strong> be availed simultaneously. 
                If a candidate qualifies for more than one concession category (such as Merit alongside Kinship or PGC Alumni privilege), 
                the candidate will be awarded the <strong>single highest applicable percentage</strong> concession. 
                Tuition fee waivers apply solely to tuition fees and exclude registration, admission, examination, and laboratory fees.
              </p>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            6. ADMISSIONS & FINANCIAL AID CONTACT HELPDESK
            ----------------------------------------------------------------------- */}
        <div 
          id="sec-contact"
          className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] uppercase font-bold tracking-[0.6px] text-[#6B7280] block">
              Financial Aid Cell • UCP Bahawalpur Campus
            </span>
            <h3 className="text-[20px] font-bold text-[#0F2C52]">
              Need Assistance with Scholarship Verification?
            </h3>
            <p className="text-[13px] text-[#4B5563] leading-relaxed">
              Visit our Admissions & Financial Aid Office at {UCP_CONTACT.address}. 
              Our counselors will evaluate your academic transcripts and apply the appropriate tuition fee waiver voucher immediately.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1.5 font-medium">
                <PhoneCall size={14} className="text-[#0F2C52]" />
                Toll Free Helpline: <strong className="text-[#111827]">(+92) 800-00827</strong>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Building2 size={14} className="text-[#0F2C52]" />
                Office Timing: <strong className="text-[#111827]">9:00 AM – 5:00 PM (Monday – Saturday)</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenApply}
              className="py-[10px] px-[22px] bg-[#0F2C52] hover:bg-[#0a1e38] text-white text-[14px] font-medium rounded-[6px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>Apply Online for Fall 2026</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => onOpenProgrammesPage()}
              className="py-[10px] px-[20px] bg-white border border-[#D1D5DB] hover:bg-[#F9FAFB] text-[#374151] text-[14px] font-semibold rounded-[6px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explore All 25 Degree Programs</span>
            </button>
          </div>
        </div>

      </main>

    </div>
  );
};
