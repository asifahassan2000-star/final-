import React from 'react';
import { BAHAWALPUR_PROGRAMS, BahawalpurProgram } from '../data/bahawalpurPrograms';

interface BahawalpurRoadmapProps {
  programSlug?: string;
  programData?: BahawalpurProgram;
}

export const BahawalpurRoadmap: React.FC<BahawalpurRoadmapProps> = ({
  programSlug = 'bba',
  programData,
}) => {
  const currentProgram =
    programData ||
    BAHAWALPUR_PROGRAMS.find((p) => p.slug === programSlug) ||
    BAHAWALPUR_PROGRAMS[0];

  if (!currentProgram) return null;

  return (
    <div className="w-full max-w-[1000px] mx-auto bg-white py-10 px-6 font-sans">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0A1931] tracking-tight">
          {currentProgram.name} — Scheme of Studies
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Total Credit Hours:{' '}
          <span className="font-semibold text-[#0A1931]">
            {currentProgram.total_ch} CH
          </span>
        </p>
      </div>

      <div className="space-y-6">
        {currentProgram.semesters.map((sem, sIdx) => (
          <div
            key={sIdx}
            className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] mb-6"
          >
            {/* Semester Header */}
            <div className="bg-[#0A1931] h-12 flex items-center justify-between px-5">
              <span className="text-white font-bold text-[15px] tracking-wide">
                {sem.name}
              </span>
              <span className="bg-[#FFC700] text-[#0A1931] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                Total: {sem.total} Cr Hr
              </span>
            </div>

            {/* Course Rows */}
            <div className="divide-y divide-[#F3F4F6]">
              {sem.courses.map((course, cIdx) => (
                <div
                  key={cIdx}
                  className="flex items-center justify-between py-3.5 px-5 hover:bg-[#F9FAFB] transition-colors gap-4"
                >
                  <span className="text-sm text-[#1F2937] font-normal leading-normal tracking-[0.2px]">
                    {course.title}
                  </span>
                  <span className="inline-flex items-center justify-center min-w-[36px] h-[26px] px-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-md text-center text-[13px] font-bold text-[#374151] flex-shrink-0 tabular-nums">
                    {course.cr}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BahawalpurRoadmap;
