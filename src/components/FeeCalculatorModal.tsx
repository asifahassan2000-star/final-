import React, { useState } from 'react';
import { X, Calculator, Award, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { PROGRAMS, FACULTIES } from '../data/ucpData';

interface FeeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApply: () => void;
}

export const FeeCalculatorModal: React.FC<FeeCalculatorModalProps> = ({
  isOpen,
  onClose,
  onOpenApply,
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>('bs-cs');
  const [marksPercentage, setMarksPercentage] = useState<number>(85);
  const [isPgcGraduate, setIsPgcGraduate] = useState<boolean>(false);
  const [isKinship, setIsKinship] = useState<boolean>(false);

  if (!isOpen) return null;

  const selectedProgram = PROGRAMS.find((p) => p.id === selectedProgramId) || PROGRAMS[0];

  // Base fee structure estimations
  const costPerCredit = selectedProgram.degree === 'Undergraduate' ? 9800 :
                        selectedProgram.degree === 'ADP' ? 7200 :
                        selectedProgram.degree === 'Postgraduate' ? 12500 : 14500;

  const semesterCredits = Math.round(selectedProgram.creditHours / (selectedProgram.duration.includes('5') ? 10 : selectedProgram.duration.includes('2') ? 4 : 8));
  const baseSemesterFee = costPerCredit * semesterCredits;
  const admissionFee = 25000; // One-time

  // Calculate scholarship
  let scholarshipPercent = 0;
  let scholarshipTitle = 'Standard Fee';

  if (isPgcGraduate) {
    scholarshipPercent = 50;
    scholarshipTitle = '50% PGC Alumni Fee Concession';
  } else if (marksPercentage >= 90) {
    scholarshipPercent = 100;
    scholarshipTitle = '100% Merit Scholarship (Top Tier)';
  } else if (marksPercentage >= 85) {
    scholarshipPercent = 75;
    scholarshipTitle = '75% Merit Scholarship';
  } else if (marksPercentage >= 80) {
    scholarshipPercent = 50;
    scholarshipTitle = '50% Merit Scholarship';
  } else if (marksPercentage >= 75) {
    scholarshipPercent = 25;
    scholarshipTitle = '25% Merit Scholarship';
  }

  if (isKinship && scholarshipPercent < 25) {
    scholarshipPercent = 25;
    scholarshipTitle = '25% Kinship Concession';
  }

  const discountAmount = Math.round((baseSemesterFee * scholarshipPercent) / 100);
  const netSemesterTuition = baseSemesterFee - discountAmount;
  const totalFirstSemester = netSemesterTuition + admissionFee;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#112c4f] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
              <Calculator size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                Fee & Scholarship Estimator
              </h3>
              <p className="text-xs text-slate-300">
                Official UCP Tuition & Financial Aid Calculator
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Official Fee Structure Link Banner */}
        <div className="bg-amber-50 px-5 py-2.5 border-b border-amber-200 flex items-center justify-between gap-3 text-xs">
          <div className="text-amber-950 font-medium truncate">
            Official Per-Semester Breakdown: <span className="font-mono text-slate-600">ucpcolleges.pgc.edu/campus-network</span>
          </div>
          <a
            href="https://ucpcolleges.pgc.edu/campus-network/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#092242] hover:bg-[#14325a] text-white px-3 py-1 rounded-lg font-bold shrink-0 shadow-xs"
          >
            Official Fee Structure ↗
          </a>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* Program Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Degree Program
            </label>
            <select
              value={selectedProgramId}
              onChange={(e) => setSelectedProgramId(e.target.value)}
              className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold text-[#112c4f]"
            >
              {PROGRAMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.degree} ({p.duration})
                </option>
              ))}
            </select>
          </div>

          {/* Academic percentage slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              <span>Intermediate / Degree Percentage (%)</span>
              <span className="text-base font-black text-[#b8121a]">{marksPercentage}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={marksPercentage}
              onChange={(e) => setMarksPercentage(Number(e.target.value))}
              className="w-full accent-[#b8121a] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>50% (Min)</span>
              <span>75% (25% Aid)</span>
              <span>80% (50% Aid)</span>
              <span>85% (75% Aid)</span>
              <span>90%+ (100% Free Tuition)</span>
            </div>
          </div>

          {/* Additional concessions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={isPgcGraduate}
                onChange={(e) => setIsPgcGraduate(e.target.checked)}
                className="rounded text-[#b8121a]"
              />
              <span><strong>PGC Alumni</strong> (50% Flat Off)</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={isKinship}
                onChange={(e) => setIsKinship(e.target.checked)}
                className="rounded text-[#b8121a]"
              />
              <span><strong>Kinship Concession</strong> (25% Off)</span>
            </label>
          </div>

          {/* Result Breakdown Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs text-slate-600">Base Tuition (Per Semester):</span>
              <span className="text-xs font-bold text-slate-800">
                PKR {baseSemesterFee.toLocaleString()}
              </span>
            </div>

            {scholarshipPercent > 0 && (
              <div className="flex items-center justify-between text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                <span className="text-xs font-bold flex items-center gap-1">
                  <Sparkles size={13} /> {scholarshipTitle}:
                </span>
                <span className="text-xs font-extrabold">
                  - PKR {discountAmount.toLocaleString()}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="block text-xs font-bold text-[#112c4f] uppercase tracking-wider">
                  Net Estimated Semester Tuition:
                </span>
                <span className="text-[10px] text-slate-400">
                  Excluding one-time admission dues (PKR 25,000)
                </span>
              </div>
              <span className="text-xl font-black text-[#b8121a]">
                PKR {netSemesterTuition.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="text-center pt-1">
            <a
              href="https://ucpcolleges.pgc.edu/scholarship/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#092242] hover:text-[#b8121a] hover:underline"
            >
              <Award size={14} className="text-amber-600" />
              View Official Scholarships & Concessions Portal ↗
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-5 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenApply();
            }}
            className="bg-[#b8121a] hover:bg-[#960f15] text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow"
          >
            Apply with this Estimate <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};
