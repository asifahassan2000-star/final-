import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Search, Calculator, Download, Filter, 
  HelpCircle, CheckCircle2, ChevronDown, ChevronUp, 
  Building2, GraduationCap, Percent, PhoneCall, ExternalLink,
  BookOpen, FileSpreadsheet, ShieldCheck, Printer, ArrowRight
} from 'lucide-react';
import { OFFICIAL_BAHAWALPUR_PROGRAMMES, BahawalpurProgramme } from '../data/bahawalpurProgrammesData';
import { UCP_CONTACT } from '../data/ucpData';

interface FeeStructurePageProps {
  onBackToHome: () => void;
  onOpenApply: (progName?: string) => void;
  onOpenProgrammesPage: (progId?: string) => void;
  onOpenScholarshipsPage: () => void;
}

type FilterCategory = 'all' | 'undergraduate' | 'adp' | 'Computing & Technology' | 'Business' | 'Science' | 'Humanities & Social Sciences';

export const FeeStructurePage: React.FC<FeeStructurePageProps> = ({
  onBackToHome,
  onOpenApply,
  onOpenProgrammesPage,
  onOpenScholarshipsPage,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProgDetail, setSelectedProgDetail] = useState<BahawalpurProgramme | null>(null);

  // Calculator state
  const [calcProgramId, setCalcProgramId] = useState<string>('bs-computer-science');
  const [calcConcession, setCalcConcession] = useState<number>(0); // percentage 0, 25, 50
  const [calcConcessionLabel, setCalcConcessionLabel] = useState<string>('Standard Fee (0% Concession)');

  // Format currency helper
  const formatPKR = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(amount).replace('PKR', 'PKR ');
  };

  // Filter programmes
  const filteredProgrammes = useMemo(() => {
    return OFFICIAL_BAHAWALPUR_PROGRAMMES.filter((p) => {
      // Category filter
      if (selectedFilter === 'undergraduate' && p.level !== 'Undergraduate') return false;
      if (selectedFilter === 'adp' && p.level !== 'Associate Degree') return false;
      if (
        selectedFilter !== 'all' && 
        selectedFilter !== 'undergraduate' && 
        selectedFilter !== 'adp' && 
        p.category !== selectedFilter
      ) {
        return false;
      }

      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDegree = p.degree.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        return matchesName || matchesDegree || matchesCategory;
      }

      return true;
    });
  }, [selectedFilter, searchQuery]);

  // Selected program for calculation
  const calcProgramme = useMemo(() => {
    return OFFICIAL_BAHAWALPUR_PROGRAMMES.find((p) => p.id === calcProgramId) || OFFICIAL_BAHAWALPUR_PROGRAMMES[0];
  }, [calcProgramId]);

  // Calculation figures
  const totalSemesters = calcProgramme.level === 'Undergraduate' ? 8 : 4;
  const tuitionOnlyTotal = calcProgramme.feePerCreditHour * calcProgramme.creditHours;
  const concessionAmount = Math.round((tuitionOnlyTotal * calcConcession) / 100);
  const netTuitionTotal = tuitionOnlyTotal - concessionAmount;
  const netTotalDegreeFee = calcProgramme.admissionFee + calcProgramme.registrationFee + netTuitionTotal;
  const netSemesterEst = Math.round(netTotalDegreeFee / totalSemesters);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1F2937] font-['Inter',sans-serif] selection:bg-[#0F2C52] selection:text-white">
      
      {/* =========================================================================
          1. HEADER & BREADCRUMBS SECTION
          ========================================================================= */}
      <section className="bg-[#FFFFFF] pt-12 pb-10 border-b border-[#E5E7EB]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#E5E7EB]">
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
              <span>Admissions</span>
              <span className="text-[#9CA3AF]">/</span>
              <span className="text-[#0F2C52] font-semibold">Fee Structure</span>
            </div>
          </div>

          {/* Official Accreditation Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F8FAFC] text-[#0F2C52] border border-[#CBD5E1] text-[11px] uppercase font-semibold tracking-[0.5px] rounded-[4px] px-[14px] py-[6px] mb-4">
            <ShieldCheck size={14} className="text-[#0F2C52]" />
            <span>Official University Fee Schedule — Academic Year 2026–2027</span>
          </div>

          {/* Page Title */}
          <h1 className="text-3xl sm:text-[40px] font-bold text-[#111827] leading-[1.2] tracking-tight">
            <span className="text-[#0F2C52]">Fee Structure</span> & Tuition Schedules
          </h1>

          {/* Description */}
          <p className="mt-4 text-[15px] text-[#4B5563] leading-[1.7] max-w-[850px] font-normal">
            University of Central Punjab Bahawalpur Campus maintains an authentic, transparent, and HEC-compliant fee policy.
            All degree programs are structured with standardized credit hour rates, transparent one-time admission and registration charges, 
            and extensive scholarship waivers of up to <strong className="text-[#0F2C52] font-semibold">50%</strong> for eligible candidates.
          </p>

          {/* 4 Clean Metric Cards (Decent official style, no heavy borders) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] p-5">
              <span className="text-[11px] uppercase font-semibold text-[#6B7280] tracking-[0.5px] block">
                Total Accredited Programs
              </span>
              <div className="text-[26px] font-bold text-[#0F2C52] mt-1.5">
                26 Degrees
              </div>
              <span className="text-[12px] text-[#4B5563] mt-0.5 block">
                13 BS/BBA & 13 ADP/ADS Programs
              </span>
            </div>

            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] p-5">
              <span className="text-[11px] uppercase font-semibold text-[#6B7280] tracking-[0.5px] block">
                Tuition Fee Concessions
              </span>
              <div className="text-[26px] font-bold text-[#a30f16] mt-1.5">
                Up to 50%
              </div>
              <span className="text-[12px] text-[#4B5563] mt-0.5 block">
                Merit & PGC Alumni Privileges
              </span>
            </div>

            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] p-5">
              <span className="text-[11px] uppercase font-semibold text-[#6B7280] tracking-[0.5px] block">
                Credit Hour Rates
              </span>
              <div className="text-[26px] font-bold text-[#0F2C52] mt-1.5">
                PKR 4,400+
              </div>
              <span className="text-[12px] text-[#4B5563] mt-0.5 block">
                Standardized Semester Billing
              </span>
            </div>

            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] p-5">
              <span className="text-[11px] uppercase font-semibold text-[#6B7280] tracking-[0.5px] block">
                Installment Facility
              </span>
              <div className="text-[26px] font-bold text-[#0F2C52] mt-1.5">
                0% Surcharge
              </div>
              <span className="text-[12px] text-[#4B5563] mt-0.5 block">
                Bank of Punjab Easy Plan
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. FILTER & SEARCH TOOLBAR
          ========================================================================= */}
      <section className="bg-[#FFFFFF] py-6 border-b border-[#E5E7EB] sticky top-0 z-20 shadow-xs">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedFilter === 'all'
                    ? 'bg-[#0F2C52] text-white'
                    : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'
                }`}
              >
                All Programs (26)
              </button>
              <button
                onClick={() => setSelectedFilter('undergraduate')}
                className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedFilter === 'undergraduate'
                    ? 'bg-[#0F2C52] text-white'
                    : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'
                }`}
              >
                BS & BBA (13)
              </button>
              <button
                onClick={() => setSelectedFilter('adp')}
                className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedFilter === 'adp'
                    ? 'bg-[#0F2C52] text-white'
                    : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'
                }`}
              >
                ADP & ADS (13)
              </button>
              <button
                onClick={() => setSelectedFilter('Computing & Technology')}
                className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedFilter === 'Computing & Technology'
                    ? 'bg-[#0F2C52] text-white'
                    : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'
                }`}
              >
                Computing & IT
              </button>
              <button
                onClick={() => setSelectedFilter('Business')}
                className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedFilter === 'Business'
                    ? 'bg-[#0F2C52] text-white'
                    : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'
                }`}
              >
                Business
              </button>
              <button
                onClick={() => setSelectedFilter('Science')}
                className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedFilter === 'Science'
                    ? 'bg-[#0F2C52] text-white'
                    : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'
                }`}
              >
                Sciences
              </button>
              <button
                onClick={() => setSelectedFilter('Humanities & Social Sciences')}
                className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedFilter === 'Humanities & Social Sciences'
                    ? 'bg-[#0F2C52] text-white'
                    : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'
                }`}
              >
                Humanities
              </button>
            </div>

            {/* Search Input & Actions */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F9FAFB] border border-[#D1D5DB] rounded-[4px] focus:outline-none focus:border-[#0F2C52] text-[#111827]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#9CA3AF] hover:text-[#4B5563]"
                  >
                    ✕
                  </button>
                )}
              </div>

              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#374151] bg-[#F3F4F6] hover:bg-[#E5E7EB] border border-[#D1D5DB] rounded-[4px] transition-colors cursor-pointer"
                title="Print Fee Schedule"
              >
                <Printer size={14} />
                <span>Print</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. OFFICIAL FEE MASTER TABLE (EXCEL / DESCENT RECTANGLE STYLE)
          ========================================================================= */}
      <section className="py-10 bg-[#FFFFFF]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Table Toolbar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E7EB]">
            <div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={18} className="text-[#0F2C52]" />
                <h2 className="text-lg font-bold text-[#111827]">
                  Approved Institutional Tuition Schedules
                </h2>
              </div>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Showing {filteredProgrammes.length} of {OFFICIAL_BAHAWALPUR_PROGRAMMES.length} academic programs. All amounts in PKR.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#6B7280]">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#0F2C52]"></span>
                <span>4-Year BS: 8 Semesters</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#A51C30]"></span>
                <span>2-Year ADP: 4 Semesters</span>
              </span>
            </div>
          </div>

          {/* Excel-Style Table Container */}
          <div className="mt-4 border border-[#D1D5DB] rounded-[6px] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[#334155] border-b border-[#CBD5E1] font-semibold text-[11px] tracking-[0.3px] uppercase">
                    <th className="py-3 px-3 w-12 text-center border-r border-[#E2E8F0]">S#</th>
                    <th className="py-3 px-4 border-r border-[#E2E8F0]">Degree & Program Title</th>
                    <th className="py-3 px-3 border-r border-[#E2E8F0]">Faculty</th>
                    <th className="py-3 px-3 text-center border-r border-[#E2E8F0]">Duration</th>
                    <th className="py-3 px-3 text-center border-r border-[#E2E8F0]">Credit Hrs</th>
                    <th className="py-3 px-3 text-right border-r border-[#E2E8F0]">Admission Fee</th>
                    <th className="py-3 px-3 text-right border-r border-[#E2E8F0]">Registration</th>
                    <th className="py-3 px-3 text-right border-r border-[#E2E8F0]">Per Credit Hr</th>
                    <th className="py-3 px-3 text-right border-r border-[#E2E8F0] bg-[#F1F5F9] font-bold text-[#0F2C52]">Est. / Sem</th>
                    <th className="py-3 px-4 text-right border-r border-[#E2E8F0] bg-[#EFF6FF] font-bold text-[#0F2C52]">Total Degree Fee</th>
                    <th className="py-3 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {filteredProgrammes.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="py-12 text-center text-[#6B7280]">
                        No academic programs found matching your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredProgrammes.map((prog, index) => {
                      const semCount = prog.level === 'Undergraduate' ? 8 : 4;
                      const estPerSem = Math.round(prog.totalFee / semCount);

                      return (
                        <tr 
                          key={prog.id}
                          className={`hover:bg-[#F8FAFC] transition-colors ${
                            index % 2 === 1 ? 'bg-[#FAFAFA]' : 'bg-[#FFFFFF]'
                          }`}
                        >
                          {/* S# */}
                          <td className="py-3 px-3 text-center text-[#6B7280] font-mono border-r border-[#E5E7EB]">
                            {String(index + 1).padStart(2, '0')}
                          </td>

                          {/* Program Name */}
                          <td className="py-3 px-4 border-r border-[#E5E7EB]">
                            <div className="font-semibold text-[#111827] text-[13px]">
                              {prog.name}
                            </div>
                            <div className="text-[11px] text-[#6B7280]">
                              {prog.level} • {prog.degree}
                            </div>
                          </td>

                          {/* Faculty */}
                          <td className="py-3 px-3 text-[#4B5563] border-r border-[#E5E7EB]">
                            {prog.category}
                          </td>

                          {/* Duration */}
                          <td className="py-3 px-3 text-center border-r border-[#E5E7EB]">
                            <span className="inline-block px-1.5 py-0.5 rounded text-[11px] font-medium bg-[#F3F4F6] text-[#374151]">
                              {prog.level === 'Undergraduate' ? '4 Yrs (8 Sem)' : '2 Yrs (4 Sem)'}
                            </span>
                          </td>

                          {/* Credit Hours */}
                          <td className="py-3 px-3 text-center font-medium text-[#111827] border-r border-[#E5E7EB]">
                            {prog.creditHours}
                          </td>

                          {/* Admission Fee */}
                          <td className="py-3 px-3 text-right text-[#4B5563] font-mono border-r border-[#E5E7EB]">
                            PKR {prog.admissionFee.toLocaleString()}
                          </td>

                          {/* Registration Fee */}
                          <td className="py-3 px-3 text-right text-[#4B5563] font-mono border-r border-[#E5E7EB]">
                            PKR {prog.registrationFee.toLocaleString()}
                          </td>

                          {/* Per Credit Hour */}
                          <td className="py-3 px-3 text-right font-medium text-[#111827] font-mono border-r border-[#E5E7EB]">
                            PKR {prog.feePerCreditHour.toLocaleString()}
                          </td>

                          {/* Est. Semester Fee */}
                          <td className="py-3 px-3 text-right font-bold text-[#0F2C52] font-mono border-r border-[#E5E7EB] bg-[#F8FAFC]">
                            PKR {estPerSem.toLocaleString()}
                          </td>

                          {/* Total Degree Fee */}
                          <td className="py-3 px-4 text-right font-bold text-[#0F2C52] font-mono border-r border-[#E5E7EB] bg-[#F0F7FF]">
                            PKR {prog.totalFee.toLocaleString()}
                          </td>

                          {/* Action */}
                          <td className="py-3 px-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => setSelectedProgDetail(prog)}
                                className="px-2 py-1 text-[11px] font-medium text-[#0F2C52] bg-[#EBF3FC] hover:bg-[#D7E8F9] rounded-[4px] transition-colors cursor-pointer"
                                title="View Breakdown"
                              >
                                Details
                              </button>
                              <button
                                onClick={() => {
                                  setCalcProgramId(prog.id);
                                  const calcSection = document.getElementById('fee-calculator-section');
                                  if (calcSection) calcSection.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="px-2 py-1 text-[11px] font-medium text-[#374151] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-[4px] transition-colors cursor-pointer"
                                title="Calculate Net Fee"
                              >
                                Calculate
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Notes */}
            <div className="bg-[#F8FAFC] px-4 py-2.5 border-t border-[#CBD5E1] text-[11px] text-[#6B7280] flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                * Admission fee and registration fee are one-time charges payable only at initial enrollment.
              </div>
              <div className="font-medium text-[#0F2C52]">
                Official UCP Bahawalpur Academic Accounts Directorate
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. INTERACTIVE FEE & SCHOLARSHIP NET ESTIMATOR (OFFICIAL CALCULATOR)
          ========================================================================= */}
      <section id="fee-calculator-section" className="py-12 bg-[#F9FAFB] border-t border-b border-[#E5E7EB]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2C52] uppercase tracking-[0.5px] mb-2">
              <Calculator size={16} />
              <span>Institutional Cost Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
              Calculate Your Net Payable Fee with Scholarship Concessions
            </h2>
            <p className="text-sm text-[#4B5563] mt-2">
              Select your intended degree programme and applicable merit or kinship concession to calculate your exact net semester and total payable fees.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#D1D5DB] rounded-[8px] p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Inputs Column */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Select Program */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.5px] text-[#374151] mb-2">
                    1. Select Academic Degree Program
                  </label>
                  <select
                    value={calcProgramId}
                    onChange={(e) => setCalcProgramId(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D1D5DB] rounded-[6px] py-2.5 px-3 text-sm text-[#111827] focus:outline-none focus:border-[#0F2C52] font-medium"
                  >
                    <optgroup label="Undergraduate (4-Year BS & BBA)">
                      {OFFICIAL_BAHAWALPUR_PROGRAMMES.filter(p => p.level === 'Undergraduate').map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.creditHours} Cr. Hrs)
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Associate Degrees (2-Year ADP & ADS)">
                      {OFFICIAL_BAHAWALPUR_PROGRAMMES.filter(p => p.level === 'Associate Degree').map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.creditHours} Cr. Hrs)
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* 2. Select Scholarship / Concession Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.5px] text-[#374151] mb-2">
                    2. Applicable Scholarship / Concession Tier
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    
                    <button
                      type="button"
                      onClick={() => {
                        setCalcConcession(0);
                        setCalcConcessionLabel('Standard Fee (0% Concession)');
                      }}
                      className={`p-3 text-left border rounded-[6px] transition-all cursor-pointer ${
                        calcConcession === 0
                          ? 'border-[#0F2C52] bg-[#F0F7FF] text-[#0F2C52]'
                          : 'border-[#E5E7EB] bg-[#FFFFFF] text-[#4B5563] hover:border-[#D1D5DB]'
                      }`}
                    >
                      <div className="font-bold text-xs">Standard Enrollment</div>
                      <div className="text-[11px] text-[#6B7280] mt-0.5">No concession (0% waiver)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCalcConcession(50);
                        setCalcConcessionLabel('50% Merit Scholarship (Intermediate Marks ≥ 80% / 75%)');
                      }}
                      className={`p-3 text-left border rounded-[6px] transition-all cursor-pointer ${
                        calcConcession === 50 && calcConcessionLabel.includes('Merit')
                          ? 'border-[#0F2C52] bg-[#F0F7FF] text-[#0F2C52]'
                          : 'border-[#E5E7EB] bg-[#FFFFFF] text-[#4B5563] hover:border-[#D1D5DB]'
                      }`}
                    >
                      <div className="font-bold text-xs text-[#a30f16]">50% Merit Scholarship</div>
                      <div className="text-[11px] text-[#6B7280] mt-0.5">Intermediate ≥ 80% (Group A) or ≥ 75% (Group B)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCalcConcession(50);
                        setCalcConcessionLabel('50% PGC Alumni Privilege (Punjab Colleges Graduate)');
                      }}
                      className={`p-3 text-left border rounded-[6px] transition-all cursor-pointer ${
                        calcConcession === 50 && calcConcessionLabel.includes('PGC')
                          ? 'border-[#0F2C52] bg-[#F0F7FF] text-[#0F2C52]'
                          : 'border-[#E5E7EB] bg-[#FFFFFF] text-[#4B5563] hover:border-[#D1D5DB]'
                      }`}
                    >
                      <div className="font-bold text-xs text-[#0F2C52]">50% PGC Alumni Concession</div>
                      <div className="text-[11px] text-[#6B7280] mt-0.5">For graduates of Punjab Group of Colleges</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCalcConcession(25);
                        setCalcConcessionLabel('25% Kinship / Defense / Govt Employee Concession');
                      }}
                      className={`p-3 text-left border rounded-[6px] transition-all cursor-pointer ${
                        calcConcession === 25
                          ? 'border-[#0F2C52] bg-[#F0F7FF] text-[#0F2C52]'
                          : 'border-[#E5E7EB] bg-[#FFFFFF] text-[#4B5563] hover:border-[#D1D5DB]'
                      }`}
                    >
                      <div className="font-bold text-xs text-[#0F2C52]">25% Kinship / Service Concession</div>
                      <div className="text-[11px] text-[#6B7280] mt-0.5">Sibling enrolled or Armed Forces / Teacher child</div>
                    </button>

                  </div>
                </div>

                {/* Policy note */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[6px] p-3 text-xs text-[#4B5563] flex items-start gap-2">
                  <ShieldCheck size={16} className="text-[#0F2C52] shrink-0 mt-0.5" />
                  <span>
                    Concessions apply directly to the <strong>tuition fee</strong> portion. One-time admission and registration charges remain constant. In compliance with UCP regulations, students receive the single highest applicable concession.
                  </span>
                </div>

              </div>

              {/* Net Output Column */}
              <div className="lg:col-span-5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-[8px] p-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#6B7280] block">
                  Official Calculation Breakdown
                </span>

                <h3 className="text-base font-bold text-[#111827] mt-1">
                  {calcProgramme.name}
                </h3>
                <div className="text-xs text-[#6B7280] mt-0.5">
                  {calcProgramme.level} • {totalSemesters} Semesters • {calcProgramme.creditHours} Total Credits
                </div>

                <hr className="my-4 border-[#E2E8F0]" />

                {/* Line items */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[#4B5563]">
                    <span>Gross Tuition Fee ({calcProgramme.creditHours} cr × {calcProgramme.feePerCreditHour})</span>
                    <span className="font-mono font-medium">{formatPKR(tuitionOnlyTotal)}</span>
                  </div>

                  <div className="flex justify-between text-[#4B5563]">
                    <span>One-Time Admission Fee</span>
                    <span className="font-mono font-medium">{formatPKR(calcProgramme.admissionFee)}</span>
                  </div>

                  <div className="flex justify-between text-[#4B5563]">
                    <span>One-Time Registration Fee</span>
                    <span className="font-mono font-medium">{formatPKR(calcProgramme.registrationFee)}</span>
                  </div>

                  {calcConcession > 0 && (
                    <div className="flex justify-between text-[#a30f16] font-semibold bg-[#FFF1F2] px-2 py-1.5 rounded-[4px]">
                      <span>Less: {calcConcession}% Tuition Concession</span>
                      <span className="font-mono">- {formatPKR(concessionAmount)}</span>
                    </div>
                  )}
                </div>

                <hr className="my-4 border-[#CBD5E1]" />

                {/* Big Net Figures */}
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] uppercase font-semibold text-[#6B7280] tracking-[0.5px] block">
                      Estimated Net Per Semester
                    </span>
                    <div className="text-2xl font-bold text-[#0F2C52] font-mono mt-0.5">
                      {formatPKR(netSemesterEst)}
                    </div>
                    <span className="text-[11px] text-[#6B7280] block mt-0.5">
                      Average per semester across {totalSemesters} semesters
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] uppercase font-semibold text-[#6B7280] tracking-[0.5px] block">
                      Total Net Payable Degree Fee
                    </span>
                    <div className="text-xl font-bold text-[#111827] font-mono mt-0.5">
                      {formatPKR(netTotalDegreeFee)}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => onOpenApply(calcProgramme.name)}
                    className="w-full py-2.5 px-4 bg-[#a30f16] hover:bg-[#860c12] text-white font-semibold text-xs rounded-[4px] transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Apply for {calcProgramme.degree} Admission</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={onOpenScholarshipsPage}
                    className="w-full py-2 px-4 bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#0F2C52] border border-[#CBD5E1] font-medium text-xs rounded-[4px] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>View Detailed Scholarship Policies</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. OFFICIAL REGULATORY POLICIES & FINANCIAL RULES
          ========================================================================= */}
      <section className="py-12 bg-[#FFFFFF]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-2">
            Institutional Financial Regulations & Policies
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] max-w-3xl mb-8">
            The University of Central Punjab adheres strictly to Higher Education Commission guidelines and university statutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[6px] p-5">
              <h3 className="text-sm font-bold text-[#0F2C52] mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#0F2C52]" />
                <span>1. Semester Installments</span>
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Semester dues may be deposited in structured installments as facilitated through the Bank of Punjab campus branch with prior approval from Accounts Office.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[6px] p-5">
              <h3 className="text-sm font-bold text-[#0F2C52] mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#0F2C52]" />
                <span>2. Scholarship Retention</span>
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                All scholarship recipients must maintain a minimum CGPA of 2.75 for continuing full concession, or qualifying Dean’s Honor criteria in subsequent semesters.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[6px] p-5">
              <h3 className="text-sm font-bold text-[#0F2C52] mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#0F2C52]" />
                <span>3. HEC Refund Policy</span>
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Tuition fee refund requests are handled according to HEC National Policy: 100% within 1st week of classes, 50% within 2nd week, and no refund thereafter.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[6px] p-5">
              <h3 className="text-sm font-bold text-[#0F2C52] mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#0F2C52]" />
                <span>4. Single Policy Rule</span>
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Scholarships and fee concessions are non-stackable. In cases where a student qualifies for multiple categories, the single highest benefit is awarded.
              </p>
            </div>

          </div>

          {/* Contact & Helpdesk Banner */}
          <div className="mt-10 bg-[#F8FAFC] border border-[#CBD5E1] rounded-[8px] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-bold text-[#111827]">
                Need Clarification on Fee Schedules or Chalan Generation?
              </h4>
              <p className="text-xs text-[#4B5563] mt-1">
                The Campus Accounts Directorate and Admissions Guidance Cell are available Monday to Saturday (8:00 AM – 4:00 PM).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${UCP_CONTACT.tollFree}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F2C52] hover:bg-[#07172b] text-white text-xs font-semibold rounded-[4px] transition-colors"
              >
                <PhoneCall size={14} />
                <span>UAN: {UCP_CONTACT.tollFree}</span>
              </a>

              <button
                onClick={() => onOpenApply()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#a30f16] hover:bg-[#860c12] text-white text-xs font-semibold rounded-[4px] transition-colors cursor-pointer"
              >
                <span>Apply for Admission</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          PROGRAMME BREAKDOWN DETAIL MODAL
          ========================================================================= */}
      {selectedProgDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-[8px] max-w-lg w-full p-6 border border-[#CBD5E1] shadow-xl animate-in fade-in duration-200">
            
            <div className="flex items-start justify-between pb-3 border-b border-[#E5E7EB]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#0F2C52]">
                  {selectedProgDetail.level} Degree
                </span>
                <h3 className="text-lg font-bold text-[#111827]">
                  {selectedProgDetail.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProgDetail(null)}
                className="text-[#6B7280] hover:text-[#111827] text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="bg-[#F8FAFC] p-3 rounded-[6px] border border-[#E2E8F0]">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[#6B7280] block text-[11px]">Total Credit Hours:</span>
                    <span className="font-bold text-[#111827] text-sm">{selectedProgDetail.creditHours}</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block text-[11px]">Program Duration:</span>
                    <span className="font-bold text-[#111827] text-sm">
                      {selectedProgDetail.level === 'Undergraduate' ? '4 Years (8 Semesters)' : '2 Years (4 Semesters)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block text-[11px]">Per Credit Hour Fee:</span>
                    <span className="font-bold text-[#0F2C52] text-sm">PKR {selectedProgDetail.feePerCreditHour.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block text-[11px]">Est. Semester Fee:</span>
                    <span className="font-bold text-[#0F2C52] text-sm">
                      PKR {Math.round(selectedProgDetail.totalFee / (selectedProgDetail.level === 'Undergraduate' ? 8 : 4)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex justify-between border-b border-[#F3F4F6] pb-1.5">
                  <span className="text-[#4B5563]">One-Time Admission Fee:</span>
                  <span className="font-semibold text-[#111827]">PKR {selectedProgDetail.admissionFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#F3F4F6] pb-1.5">
                  <span className="text-[#4B5563]">One-Time Registration Fee:</span>
                  <span className="font-semibold text-[#111827]">PKR {selectedProgDetail.registrationFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#F3F4F6] pb-1.5">
                  <span className="text-[#4B5563]">Total Tuition Fee ({selectedProgDetail.creditHours} cr):</span>
                  <span className="font-semibold text-[#111827]">PKR {(selectedProgDetail.feePerCreditHour * selectedProgDetail.creditHours).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#0F2C52] pt-1">
                  <span>Total Degree Fee:</span>
                  <span>PKR {selectedProgDetail.totalFee.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
              <button
                onClick={() => {
                  setSelectedProgDetail(null);
                  setCalcProgramId(selectedProgDetail.id);
                  const calcSection = document.getElementById('fee-calculator-section');
                  if (calcSection) calcSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 text-xs font-medium text-[#0F2C52] bg-[#F0F7FF] hover:bg-[#E0EFFE] rounded-[4px] cursor-pointer"
              >
                Apply Scholarship
              </button>
              <button
                onClick={() => {
                  const progName = selectedProgDetail.name;
                  setSelectedProgDetail(null);
                  onOpenApply(progName);
                }}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#a30f16] hover:bg-[#860c12] rounded-[4px] cursor-pointer"
              >
                Apply Online
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
