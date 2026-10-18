import React, { useState } from 'react';
import { 
  Download, 
  Calendar as CalendarIcon, 
  Info, 
  Building2, 
  Phone, 
  Mail, 
  Globe, 
  ChevronDown,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';
import { UCP_ACADEMIC_CALENDAR } from '../data/academicCalendarData';

interface AcademicCalendarSectionProps {
  id?: string;
  isStandalone?: boolean;
  onBackToHome?: () => void;
}

export const AcademicCalendarSection: React.FC<AcademicCalendarSectionProps> = ({
  id = 'academic-calendar-section',
  isStandalone = false,
  onBackToHome,
}) => {
  const cal = UCP_ACADEMIC_CALENDAR;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mobileViewMode, setMobileViewMode] = useState<'table' | 'cards'>('table');

  const categories = [
    { id: 'all', label: 'All Activities (14)' },
    { id: 'Examinations', label: 'Examinations' },
    { id: 'Gazetted Holidays', label: 'Gazetted Holidays' },
    { id: 'Registration & Enrollment', label: 'Registration & Deadlines' },
    { id: 'Instruction & Classes', label: 'Class Schedules' },
    { id: 'Grading & Results', label: 'Results & Notification' },
  ];

  const filteredEvents = selectedCategory === 'all'
    ? cal.events
    : cal.events.filter((e) => e.category === selectedCategory);

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FFFFFF] text-[#0A1931] scroll-mt-20 ${
        isStandalone ? 'pt-8 pb-24' : 'py-16 sm:py-20 lg:py-24 border-t border-slate-200'
      }`}
      aria-labelledby="academic-calendar-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation button if viewed as dedicated page */}
        {isStandalone && onBackToHome && (
          <div className="mb-6">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0A1931] hover:text-[#C8102E] transition-colors cursor-pointer py-1 font-sans"
            >
              <span>← Back to Homepage</span>
            </button>
          </div>
        )}

        {/* ===================================================================
            1. ACADEMIC CALENDAR HEADING & METADATA
            =================================================================== */}
        <div className="border-b border-slate-200 pb-8 mb-8 sm:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              {/* Institution and Campus verified from official document */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E] font-sans">
                  {cal.institution}
                </span>
                <span className="text-slate-300 hidden sm:inline" aria-hidden="true">|</span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase text-slate-600 font-sans">
                  {cal.campusAffiliation}
                </span>
              </div>

              {/* Main Heading */}
              <h1
                id="academic-calendar-heading"
                className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0A1931] tracking-tight leading-tight"
              >
                {cal.title}
              </h1>

              {/* Verified Term and Academic Year */}
              <div className="mt-3 flex items-center gap-3">
                <div className="h-[2.5px] w-12 bg-[#C8102E]" aria-hidden="true" />
                <p className="text-sm sm:text-base font-semibold text-[#0A1931] font-sans">
                  {cal.term} <span className="font-normal text-slate-600">({cal.academicYear})</span>
                </p>
              </div>
            </div>

            {/* Official Action Controls */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
              <a
                href="./assets/academic-calendar-fall-2026.pdf"
                download="UCP-Academic-Calendar-Fall-2026.pdf"
                className="inline-flex items-center gap-2 bg-[#0A1931] hover:bg-[#C8102E] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-none border border-[#0A1931] hover:border-[#C8102E] transition-colors shadow-xs cursor-pointer font-sans"
                aria-label="Download Official Academic Calendar PDF"
              >
                <Download size={15} />
                <span>Download Official Academic Calendar (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* ===================================================================
            2. EXECUTIVE SUMMARY STRIP (Institutional Key Metrics)
            =================================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          <div className="p-4 bg-white border border-slate-200 border-l-3 border-l-[#0A1931] shadow-2xs">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 block font-sans">
              Academic Term
            </span>
            <div className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg font-bold text-[#0A1931] mt-0.5">
              Fall 2026
            </div>
            <span className="text-[11px] text-slate-600 block mt-0.5 font-sans">
              Oct 2026 – Mar 2027
            </span>
          </div>

          <div className="p-4 bg-white border border-slate-200 border-l-3 border-l-[#0A1931] shadow-2xs">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 block font-sans">
              Instructional Days
            </span>
            <div className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg font-bold text-[#0A1931] mt-0.5">
              97 Teaching Days
            </div>
            <span className="text-[11px] text-slate-600 block mt-0.5 font-sans">
              Total 118 Semester Days
            </span>
          </div>

          <div className="p-4 bg-white border border-slate-200 border-l-3 border-l-[#C8102E] shadow-2xs">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C8102E] block font-sans">
              Examination Periods
            </span>
            <div className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg font-bold text-[#0A1931] mt-0.5">
              Mid &amp; Final Terms
            </div>
            <span className="text-[11px] text-slate-600 block mt-0.5 font-sans">
              Mid: Jan 11 | Final: Mar 15
            </span>
          </div>

          <div className="p-4 bg-white border border-slate-200 border-l-3 border-l-[#0A1931] shadow-2xs">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 block font-sans">
              Attendance Minimum
            </span>
            <div className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base sm:text-lg font-bold text-[#0A1931] mt-0.5">
              80% Required
            </div>
            <span className="text-[11px] text-slate-600 block mt-0.5 font-sans">
              Strict Policy Enforced
            </span>
          </div>
        </div>

        {/* ===================================================================
            3. TABLE FILTER & MOBILE VIEW TOGGLE
            =================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          {/* Category Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0 font-sans text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 whitespace-nowrap transition-colors cursor-pointer border rounded-none font-semibold ${
                  selectedCategory === cat.id
                    ? 'bg-[#0A1931] text-white border-[#0A1931]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-[#0A1931]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Mobile Display Toggle (Table View vs Stacked Cards) */}
          <div className="flex sm:hidden items-center justify-end gap-1 font-sans text-xs">
            <span className="text-slate-500 text-[11px] mr-1">View:</span>
            <button
              type="button"
              onClick={() => setMobileViewMode('table')}
              className={`p-1.5 border ${
                mobileViewMode === 'table'
                  ? 'bg-[#0A1931] text-white border-[#0A1931]'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
              title="Table view"
              aria-label="Table view"
            >
              <TableIcon size={14} />
            </button>
            <button
              type="button"
              onClick={() => setMobileViewMode('cards')}
              className={`p-1.5 border ${
                mobileViewMode === 'cards'
                  ? 'bg-[#0A1931] text-white border-[#0A1931]'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
              title="Card view"
              aria-label="Card view"
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>

        {/* ===================================================================
            4. MAIN ACADEMIC SCHEDULE TABLE
            Semantic HTML Table with Navy Header and Alternating Rows
            =================================================================== */}
        {(mobileViewMode === 'table' || (typeof window !== 'undefined' && window.innerWidth >= 640)) && (
          <div className="w-full border border-slate-300 shadow-xs bg-white mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans min-w-[620px]">
                <caption className="sr-only">
                  Academic Calendar Schedule for Fall 2026 semester at Center for Professional Studies
                </caption>
                <thead>
                  <tr className="bg-[#0A1931] text-white uppercase text-[11px] sm:text-xs tracking-wider border-b border-[#0A1931]">
                    <th scope="col" className="py-3.5 px-4 sm:px-6 font-semibold w-12 text-center text-slate-300">
                      #
                    </th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 font-semibold">
                      Activity
                    </th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 font-semibold w-48 sm:w-56">
                      Date
                    </th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 font-semibold w-32 sm:w-36 text-center">
                      Day
                    </th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 font-semibold w-40 sm:w-44 text-right">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredEvents.map((event, idx) => {
                    const isEven = idx % 2 === 1;
                    const isHoliday = event.isHoliday;
                    const isExam = event.isExam;

                    return (
                      <tr
                        key={event.id}
                        className={`transition-colors hover:bg-slate-100/80 ${
                          isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                        }`}
                      >
                        {/* Numerical Column */}
                        <td className="py-3.5 px-4 sm:px-6 text-center text-xs text-slate-400 font-mono">
                          {idx + 1}
                        </td>

                        {/* Activity Name */}
                        <td className="py-3.5 px-4 sm:px-6 text-[#0A1931]">
                          <div className="flex items-center gap-2.5">
                            {isHoliday && (
                              <span
                                className="inline-block w-2 h-2 bg-[#C8102E] shrink-0"
                                title="Gazetted Holiday"
                                aria-label="Gazetted Holiday"
                              />
                            )}
                            {isExam && (
                              <span
                                className="inline-block w-2 h-2 bg-[#0A1931] shrink-0"
                                title="Examination Period"
                                aria-label="Examination Period"
                              />
                            )}
                            <span
                              className={`${
                                isExam
                                  ? 'font-bold text-[#0A1931]'
                                  : isHoliday
                                  ? 'font-semibold text-slate-800'
                                  : 'text-slate-800'
                              }`}
                            >
                              {event.activity}
                            </span>
                          </div>
                        </td>

                        {/* Date Column */}
                        <td className="py-3.5 px-4 sm:px-6 text-[#0A1931] font-medium whitespace-nowrap">
                          <span className={event.highlight ? 'font-bold text-[#0A1931]' : 'text-slate-700'}>
                            {event.date}
                          </span>
                        </td>

                        {/* Day Column */}
                        <td className="py-3.5 px-4 sm:px-6 text-center text-slate-600 font-medium whitespace-nowrap">
                          <span className="inline-block px-2.5 py-0.5 bg-white border border-slate-200 text-xs text-slate-700">
                            {event.day}
                          </span>
                        </td>

                        {/* Category Tag */}
                        <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                          {isExam ? (
                            <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#0A1931] text-white">
                              Exam
                            </span>
                          ) : isHoliday ? (
                            <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-rose-50 text-[#C8102E] border border-rose-200">
                              Holiday *
                            </span>
                          ) : event.isDeadline ? (
                            <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200">
                              Deadline
                            </span>
                          ) : (
                            <span className="inline-block text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200">
                              Academic
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Gazetted Note under Table */}
            <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-2.5 font-sans">
              <Info size={15} className="text-[#C8102E] shrink-0" />
              <span>{cal.gazettedNote}</span>
            </div>
          </div>
        )}

        {/* Stacked Cards View for Mobile (Shown when mobileViewMode is 'cards' on small screens) */}
        {mobileViewMode === 'cards' && (
          <div className="sm:hidden space-y-3 mb-6 font-sans">
            {filteredEvents.map((event, idx) => {
              const isHoliday = event.isHoliday;
              const isExam = event.isExam;

              return (
                <div
                  key={event.id}
                  className={`p-4 border transition-colors ${
                    isExam
                      ? 'bg-slate-50 border-l-4 border-l-[#0A1931] border-slate-300'
                      : isHoliday
                      ? 'bg-rose-50/40 border-l-4 border-l-[#C8102E] border-slate-300'
                      : 'bg-white border-l-4 border-l-slate-300 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Milestone #{idx + 1}
                    </span>
                    {isExam ? (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-[#0A1931] text-white">
                        Exam
                      </span>
                    ) : isHoliday ? (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-rose-50 text-[#C8102E] border border-rose-200">
                        Holiday *
                      </span>
                    ) : event.isDeadline ? (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200">
                        Deadline
                      </span>
                    ) : null}
                  </div>

                  <h3 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base font-bold text-[#0A1931] leading-snug">
                    {event.activity}
                  </h3>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-[#0A1931]">
                      <CalendarIcon size={13} className="text-[#C8102E]" />
                      <span>{event.date}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 font-medium text-[11px]">
                      {event.day}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="p-3 bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
              <Info size={14} className="text-[#C8102E] shrink-0" />
              <span>{cal.gazettedNote}</span>
            </div>
          </div>
        )}

        {/* ===================================================================
            5. SEMESTER WORKING BREAKDOWN TABLE
            =================================================================== */}
        <div className="mt-12 sm:mt-16 pt-10 border-t border-slate-200">
          <div className="mb-6">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C8102E] font-sans">
                STATISTICAL BREAKDOWN
              </span>
              <div className="h-[1.5px] w-8 bg-[#C8102E]" aria-hidden="true" />
            </div>
            <h2 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-2xl sm:text-3xl font-bold text-[#0A1931]">
              Semester – Working
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1">
              Monthly allocation of days, Sundays, gazetted holidays, and effective instructional periods.
            </p>
          </div>

          <div className="border border-slate-300 overflow-hidden shadow-xs bg-white mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans min-w-[560px]">
                <caption className="sr-only">
                  Semester Working Days Breakdown for Fall 2026
                </caption>
                <thead>
                  <tr className="bg-[#0A1931] text-white uppercase text-[11px] sm:text-xs tracking-wider border-b border-[#0A1931]">
                    <th scope="col" className="py-3.5 px-4 sm:px-6 font-semibold">
                      Month
                    </th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 font-semibold text-center">
                      Days
                    </th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 font-semibold text-center">
                      Sundays
                    </th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 font-semibold text-center">
                      Holidays
                    </th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 font-semibold text-center">
                      Exam/Result Days
                    </th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 font-semibold text-center bg-[#071326] text-white">
                      Teaching Days
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {cal.workingBreakdown.map((item, idx) => {
                    const isEven = idx % 2 === 1;
                    return (
                      <tr
                        key={item.month}
                        className={`transition-colors hover:bg-slate-100/70 ${
                          isEven ? 'bg-[#F8FAFC]' : 'bg-white'
                        }`}
                      >
                        <td className="py-3 px-4 sm:px-6 font-semibold text-[#0A1931]">
                          {item.month}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center text-slate-700 font-mono">
                          {String(item.days).padStart(2, '0')}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center text-slate-700 font-mono">
                          {String(item.sundays).padStart(2, '0')}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center text-slate-700 font-mono">
                          {String(item.holidays).padStart(2, '0')}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center text-slate-400 font-mono">
                          {item.examResultDays}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center font-bold text-[#0A1931] font-mono bg-slate-50/80">
                          {String(item.teachingDays).padStart(2, '0')}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Total Row matching PDF */}
                  <tr className="bg-[#0A1931] text-white font-bold text-xs sm:text-sm">
                    <td className="py-3.5 px-4 sm:px-6 uppercase tracking-wider">
                      Total
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-center font-mono">
                      {cal.workingTotal.days}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-center font-mono">
                      {cal.workingTotal.sundays}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-center font-mono">
                      {String(cal.workingTotal.holidays).padStart(2, '0')}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-center font-mono text-slate-400">
                      {cal.workingTotal.examResultDays}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-center font-mono text-white bg-[#071326] underline decoration-[#C8102E] decoration-2">
                      {cal.workingTotal.teachingDays}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>



        {/* ===================================================================
            7. INSTITUTIONAL CONTACT BAR FROM OFFICIAL PDF FOOTER
            =================================================================== */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-600 font-sans">
          <div className="flex items-center gap-2">
            <Building2 size={14} className="text-slate-400 shrink-0" />
            <span>{cal.contactInfo.address}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a 
              href={`tel:${cal.contactInfo.phone}`} 
              className="hover:text-[#C8102E] transition-colors flex items-center gap-1.5"
            >
              <Phone size={13} className="text-slate-400" />
              <span>Tel: {cal.contactInfo.phone}</span>
            </a>
            <a 
              href={`mailto:${cal.contactInfo.email}`} 
              className="hover:text-[#C8102E] transition-colors flex items-center gap-1.5"
            >
              <Mail size={13} className="text-slate-400" />
              <span>{cal.contactInfo.email}</span>
            </a>
            <a 
              href={`https://${cal.contactInfo.website}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#C8102E] transition-colors flex items-center gap-1.5 font-semibold text-[#0A1931]"
            >
              <Globe size={13} className="text-slate-400" />
              <span>{cal.contactInfo.website}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
export default AcademicCalendarSection;
