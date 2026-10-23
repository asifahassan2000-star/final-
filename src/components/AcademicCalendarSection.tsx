import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Info
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
      className={`relative w-full overflow-x-hidden bg-[#FFFFFF] dark:bg-[#080f1d] text-[#0A1931] dark:text-[#f8fafc] scroll-mt-20 ${
        isStandalone ? 'pt-8 pb-24' : 'py-12 sm:py-16 md:py-20 lg:py-24 border-t border-slate-200 dark:border-slate-800'
      }`}
      aria-labelledby="academic-calendar-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        
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
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 md:pb-8 mb-6 sm:mb-8 md:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
            <div>
              {/* Institution and Campus */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E] font-sans">
                  {cal.institution}
                </span>
                <span className="text-slate-300 hidden sm:inline" aria-hidden="true">|</span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase text-slate-600 dark:text-slate-400 font-sans">
                  {cal.campusAffiliation}
                </span>
              </div>

              {/* Main Heading — text-xl md:text-3xl */}
              <h1
                id="academic-calendar-heading"
                className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-xl md:text-3xl lg:text-4xl font-bold text-[#0A1931] dark:text-white tracking-tight leading-tight"
              >
                {cal.title}
              </h1>

              {/* Term and Academic Year */}
              <div className="mt-2.5 flex items-center gap-2.5 sm:gap-3">
                <div className="h-[2px] sm:h-[2.5px] w-8 sm:w-12 bg-[#C8102E]" aria-hidden="true" />
                <p className="text-xs sm:text-sm md:text-base font-semibold text-[#0A1931] dark:text-slate-200 font-sans">
                  {cal.term} <span className="font-normal text-slate-500 dark:text-slate-400">({cal.academicYear})</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            2. TOP 4 SUMMARY CARDS (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
            On mobile each card full width, p-4, font text-sm, gap-4
            =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 sm:mb-10">
          {/* Card 1 */}
          <div className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-[#0A1931] dark:border-l-cyan-500 shadow-sm rounded-lg">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-sans">
              Academic Term
            </span>
            <div className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base md:text-lg font-bold text-[#0A1931] dark:text-white mt-1">
              Fall 2026
            </div>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 block mt-0.5 font-sans">
              Oct 2026 – Mar 2027
            </span>
          </div>

          {/* Card 2 */}
          <div className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-[#0A1931] dark:border-l-indigo-500 shadow-sm rounded-lg">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-sans">
              Instructional Days
            </span>
            <div className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base md:text-lg font-bold text-[#0A1931] dark:text-white mt-1">
              90 Teaching Days
            </div>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 block mt-0.5 font-sans">
              Total 114 Semester Days
            </span>
          </div>

          {/* Card 3 */}
          <div className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-[#C8102E] shadow-sm rounded-lg">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C8102E] block font-sans">
              Examination Periods
            </span>
            <div className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base md:text-lg font-bold text-[#0A1931] dark:text-white mt-1">
              Mid &amp; Final Terms
            </div>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 block mt-0.5 font-sans">
              Mid: Jan 11 | Final: Mar 15
            </span>
          </div>

          {/* Card 4 */}
          <div className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-[#0A1931] dark:border-l-amber-500 shadow-sm rounded-lg">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-sans">
              Attendance Minimum
            </span>
            <div className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-base md:text-lg font-bold text-[#0A1931] dark:text-white mt-1">
              80% Required
            </div>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 block mt-0.5 font-sans">
              Strict Policy Enforced
            </span>
          </div>
        </div>

        {/* ===================================================================
            3. TABLE FILTER CHIPS
            =================================================================== */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 mb-4 font-sans text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 whitespace-nowrap transition-colors cursor-pointer border rounded-md font-semibold text-xs ${
                selectedCategory === cat.id
                  ? 'bg-[#0A1931] text-white border-[#0A1931]'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ===================================================================
            4. MAIN ACADEMIC SCHEDULE:
               DESKTOP: Semantic Table (hidden md:block, hidden md:table)
               MOBILE: Card List (block md:hidden, rounded-lg, mb-3, p-4, shadow-sm)
            =================================================================== */}

        {/* A. DESKTOP TABLE VIEW (hidden md:block) */}
        <div className="hidden md:block w-full border border-slate-300 dark:border-slate-700 shadow-xs bg-white dark:bg-slate-900 mb-6">
          <div className="overflow-x-auto">
            <table className="hidden md:table w-full text-left border-collapse text-xs md:text-sm font-sans min-w-[620px]">
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
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredEvents.map((event, idx) => {
                  const isEven = idx % 2 === 1;
                  const isHoliday = event.isHoliday;
                  const isExam = event.isExam;

                  return (
                    <tr
                      key={event.id}
                      className={`transition-colors hover:bg-slate-100/80 dark:hover:bg-slate-800/60 ${
                        isEven ? 'bg-[#F8FAFC] dark:bg-slate-900/60' : 'bg-white dark:bg-slate-900'
                      }`}
                    >
                      {/* Numerical Column */}
                      <td className="py-3.5 px-4 sm:px-6 text-center text-xs text-slate-400 font-mono">
                        {idx + 1}
                      </td>

                      {/* Activity Name */}
                      <td className="py-3.5 px-4 sm:px-6 text-[#0A1931] dark:text-white">
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
                              className="inline-block w-2 h-2 bg-[#0A1931] dark:bg-cyan-400 shrink-0"
                              title="Examination Period"
                              aria-label="Examination Period"
                            />
                          )}
                          <span
                            className={`${
                              isExam
                                ? 'font-bold text-[#0A1931] dark:text-cyan-300'
                                : isHoliday
                                ? 'font-semibold text-slate-800 dark:text-rose-300'
                                : 'text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {event.activity}
                          </span>
                        </div>
                      </td>

                      {/* Date Column */}
                      <td className="py-3.5 px-4 sm:px-6 text-[#0A1931] dark:text-white font-medium whitespace-nowrap">
                        <span className={event.highlight ? 'font-bold text-[#0A1931] dark:text-white' : 'text-slate-700 dark:text-slate-300'}>
                          {event.date}
                        </span>
                      </td>

                      {/* Day Column */}
                      <td className="py-3.5 px-4 sm:px-6 text-center text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap">
                        <span className="inline-block px-2.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
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
                          <span className="inline-block text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
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

          {/* Gazetted Note under Desktop Table */}
          <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2.5 font-sans">
            <Info size={15} className="text-[#C8102E] shrink-0" />
            <span>{cal.gazettedNote}</span>
          </div>
        </div>

        {/* B. MOBILE CARD LIST (<768px: block md:hidden) */}
        <div className="block md:hidden space-y-3 mb-6 font-sans">
          {filteredEvents.map((event) => {
            const isHoliday = event.isHoliday;
            const isExam = event.isExam;

            return (
              <div
                key={event.id}
                className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg mb-3 shadow-sm"
              >
                {/* Activity title bold on top */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-[#0A1931] dark:text-white leading-snug">
                    {event.activity}
                  </h3>
                  {isExam ? (
                    <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#0A1931] text-white shrink-0 rounded">
                      Exam
                    </span>
                  ) : isHoliday ? (
                    <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-rose-50 text-[#C8102E] border border-rose-200 shrink-0 rounded">
                      Holiday *
                    </span>
                  ) : event.isDeadline ? (
                    <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 shrink-0 rounded">
                      Deadline
                    </span>
                  ) : null}
                </div>

                {/* Date with icon below */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5 font-semibold text-[#0A1931] dark:text-white">
                    <CalendarIcon size={14} className="text-[#C8102E] shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-[11px] rounded">
                    {event.day}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Gazetted Note under Mobile Card List */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <Info size={14} className="text-[#C8102E] shrink-0" />
            <span>{cal.gazettedNote}</span>
          </div>
        </div>

        {/* ===================================================================
            5. SEMESTER WORKING BREAKDOWN TABLE:
               DESKTOP: Semantic Table (hidden md:block)
               MOBILE: Card List (block md:hidden)
            =================================================================== */}
        <div className="mt-10 sm:mt-12 md:mt-16 pt-8 md:pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="mb-5 sm:mb-6">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C8102E] font-sans">
                STATISTICAL BREAKDOWN
              </span>
              <div className="h-[1.5px] w-8 bg-[#C8102E]" aria-hidden="true" />
            </div>
            <h2 className="font-['Source_Serif_4','Source_Serif_Pro','Georgia',serif] text-xl md:text-3xl font-bold text-[#0A1931] dark:text-white">
              Semester – Working
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans mt-1">
              Monthly allocation of days, Sundays, gazetted holidays, and effective instructional periods.
            </p>
          </div>

          {/* A. DESKTOP STATISTICAL BREAKDOWN TABLE (hidden md:block) */}
          <div className="hidden md:block border border-slate-300 dark:border-slate-700 overflow-hidden shadow-xs bg-white dark:bg-slate-900 mb-4">
            <div className="overflow-x-auto">
              <table className="hidden md:table w-full text-left border-collapse text-xs md:text-sm font-sans min-w-[560px]">
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
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {cal.workingBreakdown.map((item, idx) => {
                    const isEven = idx % 2 === 1;
                    return (
                      <tr
                        key={item.month}
                        className={`transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/60 ${
                          isEven ? 'bg-[#F8FAFC] dark:bg-slate-900/60' : 'bg-white dark:bg-slate-900'
                        }`}
                      >
                        <td className="py-3 px-4 sm:px-6 font-semibold text-[#0A1931] dark:text-white">
                          {item.month}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center text-slate-700 dark:text-slate-300 font-mono">
                          {String(item.days).padStart(2, '0')}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center text-slate-700 dark:text-slate-300 font-mono">
                          {String(item.sundays).padStart(2, '0')}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center text-slate-700 dark:text-slate-300 font-mono">
                          {String(item.holidays).padStart(2, '0')}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center text-slate-500 dark:text-slate-400 font-mono">
                          {item.examResultDays}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center font-bold text-[#0A1931] dark:text-cyan-300 font-mono bg-slate-50/80 dark:bg-slate-800/80">
                          {String(item.teachingDays).padStart(2, '0')}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Total Row matching official calendar */}
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
                    <td className="py-3.5 px-4 sm:px-6 text-center font-mono text-slate-300">
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

          {/* B. MOBILE STATISTICAL BREAKDOWN CARDS (<768px: block md:hidden) */}
          <div className="block md:hidden space-y-3 mb-6 font-sans">
            {cal.workingBreakdown.map((item) => (
              <div
                key={item.month}
                className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg mb-3 shadow-sm"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-sm text-[#0A1931] dark:text-white">
                    {item.month}
                  </span>
                  <span className="text-xs font-bold text-[#0A1931] dark:text-cyan-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded font-mono">
                    {String(item.teachingDays).padStart(2, '0')} Teaching Days
                  </span>
                </div>
                <div className="mt-2.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Total Days:</span>
                    <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{String(item.days).padStart(2, '0')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Sundays:</span>
                    <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{String(item.sundays).padStart(2, '0')} Sundays</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Holidays:</span>
                    <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{String(item.holidays).padStart(2, '0')} Holidays</span>
                  </div>
                  {item.examResultDays !== '--' && (
                    <div className="flex justify-between items-center text-[#C8102E] font-medium pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span>Exam / Result Days:</span>
                      <span className="font-mono font-bold">{item.examResultDays}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Total Row Card for Mobile */}
            <div className="w-full p-4 bg-[#0A1931] text-white rounded-lg mb-3 shadow-md">
              <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                <span className="font-bold text-sm uppercase tracking-wider">
                  Total Semester Working
                </span>
                <span className="text-xs font-bold text-amber-300 font-mono bg-white/10 px-2.5 py-0.5 rounded">
                  {cal.workingTotal.teachingDays} Teaching Days
                </span>
              </div>
              <div className="mt-2.5 space-y-1.5 text-xs text-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Semester Days:</span>
                  <span className="font-mono font-bold text-white">{cal.workingTotal.days} Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Sundays:</span>
                  <span className="font-mono text-white">{cal.workingTotal.sundays} Sundays</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Gazetted Holidays:</span>
                  <span className="font-mono text-white">{String(cal.workingTotal.holidays).padStart(2, '0')} Holidays</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Exam / Result Days:</span>
                  <span className="font-mono text-amber-300 font-bold">{cal.workingTotal.examResultDays} Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            6. OFFICIAL POLICIES, ATTENDANCE & EXAMINATION RULES
            =================================================================== */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 font-sans">
          {/* Attendance Rule */}
          <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xs">
            <h4 className="font-bold text-sm sm:text-base text-[#0A1931] dark:text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
              <span>Attendance Rule</span>
            </h4>
            <ol className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
              {cal.attendanceRules.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ol>
          </div>

          {/* Make Up Exams */}
          <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xs">
            <h4 className="font-bold text-sm sm:text-base text-[#0A1931] dark:text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A1931] dark:bg-cyan-400" />
              <span>Make Up Exams</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
              {cal.makeUpExamRules.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Administrative Notice Note */}
        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
          <strong className="text-[#0A1931] dark:text-white uppercase tracking-wider font-bold">NOTE: — </strong>
          {cal.administrativeNotice.replace('NOTE: - ', '')}
        </div>

      </div>
    </section>
  );
};

export default AcademicCalendarSection;
