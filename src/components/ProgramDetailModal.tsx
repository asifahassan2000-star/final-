import React from 'react';
import { X, Clock, Award, CheckCircle2, ArrowRight, BookOpen, GraduationCap, Building2, Briefcase } from 'lucide-react';
import { Program, Faculty } from '../types';
import { FACULTIES } from '../data/ucpData';
import { SemesterCurriculumTable } from './SemesterCurriculumTable';

interface ProgramDetailModalProps {
  program: Program | null;
  onClose: () => void;
  onOpenFee: () => void;
  onApply?: (progName?: string) => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  onClose,
  onOpenFee,
  onApply,
}) => {
  if (!program) return null;

  const faculty = FACULTIES.find((f) => f.id === program.facultyId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Modal Top */}
        <div className="bg-[#112c4f] text-white p-6 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-rose-300 tracking-wider">
              {faculty?.name || 'Academic Degree'}
            </span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
            {program.name}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-4">
            <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
              <Clock size={14} className="text-rose-400" /> {program.duration}
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
              <Award size={14} className="text-amber-400" /> {program.creditHours} Total Credit Hours
            </span>
            <span className="bg-[#b8121a] text-white font-bold px-2.5 py-1 rounded-lg uppercase text-[10px]">
              {program.degree} Degree
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Program Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {program.description}
            </p>
          </div>

          {/* Scheme of Studies / Semester Roadmap Table (Excel Style) */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Scheme of Studies & Course Roadmap
            </h3>
            <SemesterCurriculumTable
              programId={program.id}
              programName={program.name}
              level={program.degree}
            />
          </div>

          {/* Eligibility Criteria */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-[#112c4f] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#b8121a]" /> Admission Eligibility Requirements
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {program.eligibility}
            </p>
          </div>

          {/* Career Prospects */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Briefcase size={14} className="text-[#112c4f]" /> Career Opportunities & Pathways
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {program.careerOutcomes.map((career, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#b8121a]" />
                  <span>{career}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty Dean note */}
          {faculty && (
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Department: <strong>{faculty.shortName}</strong></span>
              <span>Dean: <strong>{faculty.dean}</strong></span>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenFee();
            }}
            className="text-xs font-bold text-[#112c4f] hover:underline"
          >
            Calculate Fee & Scholarships
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2"
            >
              Close
            </button>
            {onApply && (
              <button
                onClick={() => {
                  onClose();
                  onApply(program.name);
                }}
                className="bg-[#b8121a] hover:bg-[#960f15] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shadow flex items-center gap-1.5"
              >
                Apply Online <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
