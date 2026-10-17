import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ArrowLeft, Upload, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { PROGRAMS, FACULTIES } from '../data/ucpData';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProgram?: string;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  preselectedProgram,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    cnic: '',
    email: '',
    phone: '',
    gender: 'Male',
    city: 'Lahore',
    previousDegree: 'Intermediate (F.Sc / ICS / I.Com)',
    percentage: '82',
    isPgcAlumni: false,
    selectedFaculty: 'foit',
    selectedProgram: preselectedProgram || 'BS Computer Science',
    testCenter: 'UCP Campus Lahore',
  });

  const [applicationId, setApplicationId] = useState('');

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as any);
    } else if (step === 3) {
      // Generate realistic reference ID
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      setApplicationId(`UCP-FALL-2026-${randomNum}`);
      setStep(4);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep((prev) => (prev - 1) as any);
  };

  const programsForSelectedFaculty = PROGRAMS.filter(
    (p) => p.facultyId === formData.selectedFaculty
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#112c4f] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-rose-400 font-bold border border-white/15">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                UCP Online Admission Portal
              </h3>
              <p className="text-xs text-slate-300">
                Application for Fall 2026 Academic Session
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Official Portal Banner */}
        <div className="bg-amber-50 px-5 py-2.5 border-b border-amber-200 flex items-center justify-between gap-3 text-xs">
          <div className="text-amber-950 font-medium truncate">
            Official Portal: <span className="font-mono text-slate-600">admissions.ucpcolleges.pgc.edu</span>
          </div>
          <a
            href="https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#b8121a] hover:bg-[#9a0f16] text-white px-3 py-1 rounded-lg font-bold shrink-0 shadow-xs"
          >
            Open Official Portal ↗
          </a>
        </div>

        {/* Stepper Progress Bar */}
        {step < 4 && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span className={step >= 1 ? 'text-[#b8121a] font-bold' : ''}>
              1. Personal Details
            </span>
            <span>→</span>
            <span className={step >= 2 ? 'text-[#b8121a] font-bold' : ''}>
              2. Academic Credentials
            </span>
            <span>→</span>
            <span className={step >= 3 ? 'text-[#b8121a] font-bold' : ''}>
              3. Program Preference
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#112c4f] uppercase tracking-wider">
                Applicant Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name (as per Matric/O-Levels) *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Muhammad Ali Khan"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#112c4f] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CNIC / B-Form Number *
                  </label>
                  <input
                    type="text"
                    value={formData.cnic}
                    onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                    placeholder="35201-XXXXXXX-X"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#112c4f] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#112c4f] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile / WhatsApp Contact *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#112c4f] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City of Residence</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Lahore"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Academic Background */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#112c4f] uppercase tracking-wider">
                Prior Education & Eligibility
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Completed Qualification *
                  </label>
                  <select
                    value={formData.previousDegree}
                    onChange={(e) => setFormData({ ...formData, previousDegree: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="Intermediate F.Sc Pre-Engineering">Intermediate (F.Sc Pre-Engineering)</option>
                    <option value="Intermediate F.Sc Pre-Medical">Intermediate (F.Sc Pre-Medical)</option>
                    <option value="Intermediate ICS">Intermediate (ICS Computer Science)</option>
                    <option value="Intermediate I.Com / General">Intermediate (I.Com / FA / General)</option>
                    <option value="A-Levels / Cambridge">A-Levels / Cambridge Assessment</option>
                    <option value="Bachelor Degree (14 or 16 Years)">Bachelor Degree (BS / BA / B.Sc)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Aggregate / Obtained Marks Percentage (%) *
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="40"
                      max="100"
                      value={formData.percentage}
                      onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                      className="w-32 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    />
                    <span className="text-xs text-slate-500">
                      {Number(formData.percentage) >= 70
                        ? 'Eligible for UCP Merit Scholarship Tier!'
                        : 'Eligible for Standard Admission.'}
                    </span>
                  </div>
                </div>

                {/* PGC Alumni discount checkbox */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="pgc-alumni-check"
                    checked={formData.isPgcAlumni}
                    onChange={(e) => setFormData({ ...formData, isPgcAlumni: e.target.checked })}
                    className="mt-0.5 rounded text-[#b8121a] focus:ring-[#b8121a]"
                  />
                  <label htmlFor="pgc-alumni-check" className="text-xs text-amber-900 cursor-pointer">
                    <strong>I am a Punjab Group of Colleges (PGC / Concordia) Graduate</strong>
                    <span className="block text-amber-800 text-[11px]">
                      Entitles applicant to a 50% tuition fee concession throughout study duration.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Program Preference */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#112c4f] uppercase tracking-wider">
                Select Your Degree Program
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Faculty *
                  </label>
                  <select
                    value={formData.selectedFaculty}
                    onChange={(e) => {
                      const newFac = e.target.value;
                      const firstProg = PROGRAMS.find((p) => p.facultyId === newFac)?.name || '';
                      setFormData({
                        ...formData,
                        selectedFaculty: newFac,
                        selectedProgram: firstProg,
                      });
                    }}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    {FACULTIES.map((fac) => (
                      <option key={fac.id} value={fac.id}>
                        {fac.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Degree Program Choice *
                  </label>
                  <select
                    value={formData.selectedProgram}
                    onChange={(e) => setFormData({ ...formData, selectedProgram: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold text-[#112c4f]"
                  >
                    {programsForSelectedFaculty.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.degree} - {p.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Admission Test Center
                  </label>
                  <select
                    value={formData.testCenter}
                    onChange={(e) => setFormData({ ...formData, testCenter: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="UCP Campus Lahore">UCP Main Campus, Johar Town Lahore</option>
                    <option value="Online Proctored Test">Online Home-Proctored Test (Remote)</option>
                    <option value="Rawalpindi Center">PGC Rawalpindi Regional Center</option>
                    <option value="Multan Center">PGC Multan Regional Center</option>
                  </select>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                    <FileText size={14} className="text-[#b8121a]" /> Document Checklist Required Upon Verification:
                  </div>
                  <ul className="text-[11px] list-disc list-inside space-y-0.5 text-slate-500">
                    <li>Copy of CNIC / B-Form & Father/Guardian CNIC</li>
                    <li>Matric / O-Levels Marksheet & Certificate</li>
                    <li>Intermediate / A-Levels Result Card or Hope Certificate</li>
                    <li>4 Passport-sized Photographs (Blue Background)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation & Voucher */}
          {step === 4 && (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle size={36} />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-emerald-600 tracking-wider">
                  Application Submitted Successfully
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#112c4f] mt-1">
                  Welcome to the UCP Family!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Your online application for <strong>{formData.selectedProgram}</strong> has been registered with the UCP Admissions Office.
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4 max-w-sm mx-auto text-left">
                <div className="text-xs text-slate-500">Application Reference ID:</div>
                <div className="text-lg font-black text-[#b8121a] tracking-wider select-all">
                  {applicationId}
                </div>
                <div className="text-xs text-slate-600 mt-2 space-y-1">
                  <div><strong>Applicant:</strong> {formData.fullName || 'Registered Student'}</div>
                  <div><strong>Degree:</strong> {formData.selectedProgram}</div>
                  <div><strong>Test Center:</strong> {formData.testCenter}</div>
                  <div><strong>Processing Fee:</strong> PKR 2,000 (Payable online or bank)</div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                A confirmation SMS and email with your test schedule and voucher have been dispatched. For queries, contact <strong>0800-00-827</strong>.
              </p>

              <button
                onClick={onClose}
                className="bg-[#112c4f] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow"
              >
                Close & Return to Website
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={handlePrev}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-3 py-2 rounded-lg"
              >
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <span className="text-xs text-slate-400">Step 1 of 3</span>
            )}

            <button
              onClick={handleNext}
              className="bg-[#b8121a] hover:bg-[#960f15] text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow"
            >
              {step === 3 ? 'Submit Application' : 'Proceed'}
              <ArrowRight size={14} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
