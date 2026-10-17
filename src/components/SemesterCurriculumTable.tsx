import React, { useState } from 'react';
import { getProgramCurriculum, ProgramCurriculum } from '../data/programmesCurriculumData';
import { FileSpreadsheet, LayoutList, Info } from 'lucide-react';

interface SemesterCurriculumTableProps {
  programId: string;
  programName: string;
  level: string;
}

export const SemesterCurriculumTable: React.FC<SemesterCurriculumTableProps> = ({
  programId,
  programName,
  level,
}) => {
  const curriculum: ProgramCurriculum = getProgramCurriculum(programId, programName, level);
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [viewMode, setViewMode] = useState<'roadmap' | 'table'>('roadmap');

  const displayedSemesters = selectedSemester === 'all' 
    ? curriculum.semesters 
    : curriculum.semesters.filter(s => s.semester === selectedSemester);

  return (
    <div className="w-full space-y-4 font-sans text-slate-800">
      
      {/* Excel Sheet Controls & Metadata Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-slate-600" />
          <span className="font-mono font-bold text-slate-800 uppercase tracking-wide">
            Scheme of Studies / Semester Roadmap
          </span>
          <span className="text-slate-400">|</span>
          <span className="font-mono text-slate-600">
            Total Credit Hours: <strong className="text-slate-900">{curriculum.totalCreditHours} CH</strong>
          </span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="font-mono text-slate-600 hidden sm:inline">
            Semesters: <strong className="text-slate-900">{curriculum.totalSemesters}</strong>
          </span>
        </div>

        {/* View Switcher & Semester Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div className="inline-flex items-center rounded border border-slate-300 bg-white p-0.5 text-[11px] font-mono">
            <button
              onClick={() => setViewMode('roadmap')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer transition-colors ${
                viewMode === 'roadmap'
                  ? 'bg-[#0A1931] text-white font-medium'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Clean Roadmap Cards View"
            >
              <LayoutList size={12} /> Roadmap
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#0A1931] text-white font-medium'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Spreadsheet Table View"
            >
              <FileSpreadsheet size={12} /> Table
            </button>
          </div>

          {/* Semester Tab Switcher */}
          <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-mono">
            <button
              onClick={() => setSelectedSemester('all')}
              className={`px-2.5 py-1 border transition-colors cursor-pointer ${
                selectedSemester === 'all'
                  ? 'bg-white border-slate-400 font-bold text-slate-900 shadow-2xs'
                  : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-white'
              }`}
            >
              All
            </button>
            {curriculum.semesters.map((s) => (
              <button
                key={s.semester}
                onClick={() => setSelectedSemester(s.semester)}
                className={`px-2 py-1 border transition-colors cursor-pointer whitespace-nowrap ${
                  selectedSemester === s.semester
                    ? 'bg-white border-slate-400 font-bold text-slate-900 shadow-2xs'
                    : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-white'
                }`}
              >
                Sem {s.semester}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 1. ROADMAP CARDS VIEW */}
      {viewMode === 'roadmap' && (
        <div className="space-y-6">
          {displayedSemesters.map((sem) => (
            <div
              key={sem.semester}
              className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
            >
              {/* Semester Header */}
              <div className="bg-[#0A1931] h-12 flex items-center justify-between px-5">
                <span className="text-white font-bold text-[15px] tracking-wide font-sans">
                  {sem.title}
                </span>
                <span className="bg-[#FFC700] text-[#0A1931] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  Total: {sem.totalCredits} Cr Hr
                </span>
              </div>

              {/* Course Rows */}
              <div className="divide-y divide-[#F3F4F6]">
                {sem.courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3.5 px-5 hover:bg-[#F9FAFB] transition-colors gap-4"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xs font-mono text-slate-400 w-5 flex-shrink-0">
                        {idx + 1}.
                      </span>
                      <span className="text-sm text-[#1F2937] font-normal leading-normal tracking-[0.2px] truncate">
                        {course.name}
                      </span>
                      {course.type && course.type !== 'Core' && (
                        <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded">
                          {course.type}
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center justify-center min-w-[36px] h-[26px] px-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-md text-center text-[13px] font-bold text-[#374151] flex-shrink-0 tabular-nums">
                      {course.creditHours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. EXCEL STYLE DATA GRID TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="space-y-6">
          {displayedSemesters.map((sem) => (
            <div key={sem.semester} className="border border-slate-300 bg-white">
              
              {/* Semester Sub-Header */}
              <div className="bg-[#0A1931] text-white border-b border-slate-300 px-4 py-2.5 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-white uppercase tracking-wider">
                  {sem.title}
                </span>
                <span className="font-mono text-amber-300">
                  Semester Credits: <strong className="text-white">{sem.totalCredits} Cr. Hrs</strong>
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse font-sans">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-300 text-slate-700 font-mono text-[11px]">
                      <th className="py-2.5 px-3 border-r border-slate-200 w-12 text-center">#</th>
                      <th className="py-2.5 px-3 border-r border-slate-200 w-28">Course Code</th>
                      <th className="py-2.5 px-3 border-r border-slate-200">Subject / Course Title</th>
                      <th className="py-2.5 px-3 border-r border-slate-200 w-28 text-center">Course Type</th>
                      <th className="py-2.5 px-3 w-28 text-center">Credit Hours</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-sans text-slate-800">
                    {sem.courses.map((course, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2 px-3 border-r border-slate-200 text-center font-mono text-slate-500 text-[11px]">
                          {idx + 1}
                        </td>
                        <td className="py-2 px-3 border-r border-slate-200 font-mono font-medium text-slate-700 text-[11px]">
                          {course.code}
                        </td>
                        <td className="py-2 px-3 border-r border-slate-200 font-medium text-slate-900">
                          {course.name}
                        </td>
                        <td className="py-2 px-3 border-r border-slate-200 text-center font-mono text-[11px] text-slate-600">
                          <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-[10px]">
                            {course.type || 'Core'}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center font-mono font-bold text-slate-800 tabular-nums">
                          {course.creditHours}
                        </td>
                      </tr>
                    ))}
                    {/* Semester Summary Row */}
                    <tr className="bg-slate-50/60 font-mono text-slate-900 font-semibold border-t border-slate-300 text-[11px]">
                      <td colSpan={4} className="py-2 px-3 text-right border-r border-slate-200 uppercase tracking-wide">
                        Total for {sem.title}:
                      </td>
                      <td className="py-2 px-3 text-center font-bold">
                        {sem.totalCredits} Cr. Hrs
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Brief Productive Note */}
      <div className="flex items-start gap-2 p-3 border border-slate-300 bg-slate-50 text-[11px] text-slate-600 font-sans">
        <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Course offerings and sequencing follow the official Higher Education Commission (HEC) and University of Central Punjab curriculum guidelines. Elective tracks and laboratory allocations are scheduled per academic session availability.
        </p>
      </div>

    </div>
  );
};

export default SemesterCurriculumTable;
