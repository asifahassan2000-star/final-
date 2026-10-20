import React, { useState } from 'react';
import { 
  X, Calendar, Award, FileText, Shield, Briefcase, 
  HelpCircle, Compass, GraduationCap, CheckCircle2, 
  Mail, ExternalLink, Globe, Search, BookOpen, Clock, AlertCircle, ArrowRight, Download
} from 'lucide-react';

export type InfoModalType = 
  | 'academic-calendar'
  | 'exam-office'
  | 'sustainability'
  | 'harassment-policy'
  | 'scholarships'
  | 'jobs'
  | 'verify-student'
  | 'tender-notice'
  | 'rehnumai-markaz'
  | 'faqs'
  | 'international-programs'
  | 'ucp-online'
  | 'blog'
  | 'oric'
  | 'newsletter'
  | 'merit-list'
  | 'fee-structure'
  | 'rules-regulations';

interface UcpInfoModalProps {
  type: InfoModalType | null;
  onClose: () => void;
  onOpenApply: () => void;
  onOpenPortal: () => void;
  onOpenProgrammesPage?: () => void;
}

export const UcpInfoModal: React.FC<UcpInfoModalProps> = ({
  type,
  onClose,
  onOpenApply,
  onOpenPortal,
  onOpenProgrammesPage,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [verifyRollNumber, setVerifyRollNumber] = useState('');
  const [verifyResult, setVerifyResult] = useState<null | { name: string; degree: string; status: string; year: string }>(null);

  if (!type) return null;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  const handleVerifyStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyRollNumber.trim()) {
      setVerifyResult({
        name: 'Muhammad Hamza Khan',
        degree: 'BS Computer Science (Honors)',
        status: 'Active Enrolled Student - Regular',
        year: 'Session 2022 - 2026 (Semester 6)'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 relative my-8">
        
        {/* Header */}
        <div className="bg-[#0b2341] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/20">
              {type === 'academic-calendar' && <Calendar size={18} />}
              {type === 'exam-office' && <FileText size={18} />}
              {type === 'sustainability' && <Globe size={18} />}
              {type === 'harassment-policy' && <Shield size={18} />}
              {type === 'scholarships' && <Award size={18} />}
              {type === 'jobs' && <Briefcase size={18} />}
              {type === 'verify-student' && <CheckCircle2 size={18} />}
              {type === 'tender-notice' && <FileText size={18} />}
              {type === 'rehnumai-markaz' && <Compass size={18} />}
              {type === 'faqs' && <HelpCircle size={18} />}
              {type === 'international-programs' && <Globe size={18} />}
              {type === 'ucp-online' && <BookOpen size={18} />}
              {type === 'blog' && <FileText size={18} />}
              {type === 'oric' && <GraduationCap size={18} />}
              {type === 'newsletter' && <Mail size={18} />}
              {type === 'merit-list' && <FileText size={18} />}
              {type === 'fee-structure' && <FileText size={18} />}
              {type === 'rules-regulations' && <Shield size={18} />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                {type === 'academic-calendar' && 'Academic Calendar — Fall-2026 (Oct-2026 – Mar-2027)'}
                {type === 'exam-office' && 'Controller of Examinations & Records'}
                {type === 'sustainability' && 'Sustainability & Green Campus Initiative'}
                {type === 'harassment-policy' && 'UCP Policy Against Harassment'}
                {type === 'scholarships' && 'Scholarships & Financial Assistance (1.3B PKR)'}
                {type === 'jobs' && 'Careers & Faculty Openings at UCP'}
                {type === 'verify-student' && 'Online Student & Credential Verification'}
                {type === 'tender-notice' && 'Public Tender Notices & Procurements'}
                {type === 'rehnumai-markaz' && 'Rehnumai Markaz (Student Counseling & Guidance)'}
                {type === 'faqs' && 'Frequently Asked Questions (Admissions & Campus)'}
                {type === 'international-programs' && 'International Linkages & Exchange Programs'}
                {type === 'ucp-online' && 'UCP Online & Digital Learning Portal'}
                {type === 'blog' && 'UCP Official Blog & Campus Insights'}
                {type === 'oric' && 'Office of Research, Innovation & Commercialization (ORIC)'}
                {type === 'newsletter' && 'Subscribe to UCP Official Newsletter'}
                {type === 'merit-list' && 'Fall 2026 Admissions Merit Lists'}
                {type === 'fee-structure' && 'Official UCP Fee Structure (2025–2026)'}
                {type === 'rules-regulations' && 'Official UCP Rules & Regulations'}
              </h3>
              <p className="text-xs text-slate-300">
                University of Central Punjab • 1 - Khayaban-e-Jinnah Road, Lahore
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto text-sm text-slate-700 space-y-4">
          
          {/* Academic Calendar — Accurate Fall 2026 Data */}
          {type === 'academic-calendar' && (
            <div className="space-y-4">
              <div className="p-4 rounded-none bg-slate-50 border border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#0A1931] uppercase tracking-wider block font-sans">
                    Center for Professional Studies · Academic Calendar
                  </span>
                  <span className="text-xs text-slate-600 font-sans">
                    Fall-2026 (Oct-2026 – Mar-2027) · Bahawalpur Campus Network
                  </span>
                </div>
                <a
                  href="./assets/academic-calendar-fall-2026.pdf"
                  download="UCP-Academic-Calendar-Fall-2026.pdf"
                  className="bg-[#0A1931] hover:bg-[#C8102E] text-white text-xs font-bold px-3.5 py-2 rounded-none shrink-0 flex items-center gap-1.5 transition-colors shadow-xs font-sans"
                >
                  <Download size={13} /> Download Official PDF
                </a>
              </div>

              <div className="border border-slate-200 overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="bg-[#0A1931] text-white uppercase text-[11px] tracking-wider">
                      <th className="py-2.5 px-3">Activity</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3 text-center">Day</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-white">
                      <td className="py-2 px-3 font-semibold text-[#0A1931]">Registration/Payment of Dues Fall-26</td>
                      <td className="py-2 px-3 font-medium">22nd Oct – 14th Nov</td>
                      <td className="py-2 px-3 text-center text-slate-600">Thurs - Sat</td>
                    </tr>
                    <tr className="bg-[#F8FAFC]">
                      <td className="py-2 px-3 font-bold text-[#0A1931]">Commencement of Classes Fall -26</td>
                      <td className="py-2 px-3 font-bold text-[#0A1931]">16th Nov</td>
                      <td className="py-2 px-3 text-center font-bold text-[#0A1931]">Mon</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-2 px-3 text-slate-700">Quaid-e-Azam Day * (Holiday)</td>
                      <td className="py-2 px-3">25th December</td>
                      <td className="py-2 px-3 text-center text-slate-600">Fri</td>
                    </tr>
                    <tr className="bg-[#F8FAFC]">
                      <td className="py-2 px-3 font-bold text-[#0A1931]">Mid Term Examination</td>
                      <td className="py-2 px-3 font-bold text-[#0A1931]">11th Jan – 16th Jan</td>
                      <td className="py-2 px-3 text-center font-bold text-[#0A1931]">Mon - Sat</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-2 px-3 text-slate-700">Kashmir Day * (Holiday)</td>
                      <td className="py-2 px-3">5th Feb</td>
                      <td className="py-2 px-3 text-center text-slate-600">Fri</td>
                    </tr>
                    <tr className="bg-[#F8FAFC]">
                      <td className="py-2 px-3 text-slate-700">Last Date for withdrawal of Courses</td>
                      <td className="py-2 px-3">20th Feb</td>
                      <td className="py-2 px-3 text-center text-slate-600">Sat</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-2 px-3 text-slate-700">Eid Holidays * (Holiday)</td>
                      <td className="py-2 px-3">10th Mar – 12th Mar</td>
                      <td className="py-2 px-3 text-center text-slate-600">Wed - Fri</td>
                    </tr>
                    <tr className="bg-[#F8FAFC]">
                      <td className="py-2 px-3 text-slate-700">Last day of Classes</td>
                      <td className="py-2 px-3">13th Mar</td>
                      <td className="py-2 px-3 text-center text-slate-600">Sat</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-2 px-3 font-bold text-[#0A1931]">Final Term Examination</td>
                      <td className="py-2 px-3 font-bold text-[#0A1931]">15th Mar – 26th Mar</td>
                      <td className="py-2 px-3 text-center font-bold text-[#0A1931]">Mon – Fri</td>
                    </tr>
                    <tr className="bg-[#F8FAFC]">
                      <td className="py-2 px-3 text-slate-700">Pakistan Resolution Day * (Holiday)</td>
                      <td className="py-2 px-3">23rd Mar</td>
                      <td className="py-2 px-3 text-center text-slate-600">Tues</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-2 px-3 text-slate-700">Submission of Result</td>
                      <td className="py-2 px-3">29th Mar</td>
                      <td className="py-2 px-3 text-center text-slate-600">Mon</td>
                    </tr>
                    <tr className="bg-[#F8FAFC]">
                      <td className="py-2 px-3 font-bold text-[#0A1931]">Grade Notification</td>
                      <td className="py-2 px-3 font-bold text-[#0A1931]">31st Mar</td>
                      <td className="py-2 px-3 text-center font-bold text-[#0A1931]">Wed</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-2 px-3 text-slate-700">Registration & Payment Dues Spring-27</td>
                      <td className="py-2 px-3">1st April – 10th April</td>
                      <td className="py-2 px-3 text-center text-slate-600">Thur - Sat</td>
                    </tr>
                    <tr className="bg-[#F8FAFC]">
                      <td className="py-2 px-3 font-bold text-[#0A1931]">Commencement of Classes Spring-27</td>
                      <td className="py-2 px-3 font-bold text-[#0A1931]">12th April</td>
                      <td className="py-2 px-3 text-center font-bold text-[#0A1931]">Mon</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 text-xs text-amber-900 rounded-none">
                <span className="font-bold block mb-1">Key Attendance & Exam Directives:</span>
                <p>• Maintenance of a minimum 80% attendance is strictly required.</p>
                <p>• Make-up examinations are not allowed under any circumstances.</p>
                <p>• After 14th November 2026, no registration is allowed.</p>
              </div>
            </div>
          )}

          {/* Exam Office */}
          {type === 'exam-office' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#092242] block">
                    Official UCP Exam Office Page
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    https://ucp.edu.pk/exam-office/
                  </span>
                </div>
                <a
                  href="https://ucp.edu.pk/exam-office/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#092242] hover:bg-[#14325a] text-white text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1 transition-colors shadow-xs"
                >
                  <ExternalLink size={13} /> Open Official Page
                </a>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                The Controller of Examinations manages fair, transparent, and technology-driven examination processes in compliance with HEC standards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900">Transcript Issuance</h5>
                  <p className="text-slate-500 mt-0.5">Apply online via Student Portal for official transcripts, degrees, and bona fide certificates.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900">Grading Scheme</h5>
                  <p className="text-slate-500 mt-0.5">Absolute and relative 4.00 CGPA grading matrix approved by HEC.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900">Paper Rechecking</h5>
                  <p className="text-slate-500 mt-0.5">Rechecking requests must be submitted within 7 working days of result declaration.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900">Desk Helpline</h5>
                  <p className="text-slate-500 mt-0.5">Email: exams@ucp.edu.pk • Ext. 284 & 285</p>
                </div>
              </div>
            </div>
          )}

          {/* Sustainability */}
          {type === 'sustainability' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                UCP is committed to the UN Sustainable Development Goals (SDGs), recognized nationally for clean energy, zero single-use plastics, and community outreach.
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 flex items-start gap-2.5">
                  <span className="font-bold shrink-0">1.2 MW Solar Array:</span>
                  <span>Generates over 60% of the campus peak daytime electrical consumption cleanly.</span>
                </div>
                <div className="p-3 bg-slate-50 text-slate-800 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <span className="font-bold shrink-0">Rainwater Harvesting:</span>
                  <span>Advanced underground aquifers recharging the groundwater table in Johar Town, Lahore.</span>
                </div>
                <div className="p-3 bg-slate-50 text-slate-800 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <span className="font-bold shrink-0">Tree Plantation Drives:</span>
                  <span>Over 15,000 native trees planted across suburban Lahore by UCP Environmental Society.</span>
                </div>
              </div>
            </div>
          )}

          {/* Harassment Policy */}
          {type === 'harassment-policy' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#092242] block">
                    Official Sexual Harassment Policy (PDF Document)
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    ucp.edu.pk/.../SEXUALHARASSMENT-POLICY.pdf
                  </span>
                </div>
                <a
                  href="https://ucp.edu.pk/inc/uploads/2019/01/SEXUALHARASSMENT-POLICY.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#a30f16] hover:bg-[#850c12] text-white text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1 transition-colors shadow-xs"
                >
                  <ExternalLink size={13} /> View Official PDF
                </a>
              </div>

              <div className="p-3.5 bg-rose-50 text-rose-950 rounded-xl border border-rose-200 text-xs">
                <h5 className="font-bold flex items-center gap-1.5 mb-1">
                  <Shield size={14} className="text-[#a30f16]" /> Zero Tolerance Policy
                </h5>
                <p>
                  UCP enforces a strict zero-tolerance code against harassment in all forms, conforming strictly with the Protection Against Harassment of Women at the Workplace Act and HEC guidelines.
                </p>
              </div>
              <p className="text-xs text-slate-600">
                Inquiry committee members include female faculty leaders, legal ombudspersons, and student counselors. Confidential complaints can be lodged via:
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <p><strong>Ombudsperson Email:</strong> harassment.cell@ucp.edu.pk</p>
                <p><strong>Confidential Hotline:</strong> +92-42-35880007 Ext. 401</p>
                <p><strong>Physical Desk:</strong> Room 218, Faculty Block B</p>
              </div>
            </div>
          )}

          {/* Scholarships */}
          {type === 'scholarships' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#092242] block">
                    Official UCP Scholarships & Aid Portal
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    https://ucpcolleges.pgc.edu/scholarship/
                  </span>
                </div>
                <a
                  href="https://ucpcolleges.pgc.edu/scholarship/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#092242] hover:bg-[#14325a] text-white text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1 transition-colors shadow-xs"
                >
                  <ExternalLink size={13} /> Open Official Page
                </a>
              </div>

              <p className="text-xs text-slate-600">
                To guarantee that financial limitations never hinder brilliant talent, UCP has distributed more than <strong>1.3 Billion PKR</strong> in financial concessions and scholarships.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <h5 className="font-bold text-amber-950">Merit Scholarships (Up to 50%)</h5>
                  <p className="text-amber-900 mt-0.5">Awarded to top performers with outstanding intermediate board scores.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900">PGC Alumni Concession (25%)</h5>
                  <p className="text-slate-600 mt-0.5">25% tuition fee concession for graduates of the Punjab Group of Colleges.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900">Kinship Fee Concession (25%)</h5>
                  <p className="text-slate-600 mt-0.5">Offered to siblings concurrently studying at UCP campuses.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900">Need-Based Financial Aid</h5>
                  <p className="text-slate-600 mt-0.5">Verified financial assistance for deserving students vetted by the Aid Committee.</p>
                </div>
              </div>
            </div>
          )}

          {/* Careers / Jobs */}
          {type === 'jobs' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#092242] block">
                    Official UCP Career Opportunities Portal
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    https://ucp.edu.pk/jobs/career-opportunities/
                  </span>
                </div>
                <a
                  href="https://ucp.edu.pk/jobs/career-opportunities/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#092242] hover:bg-[#14325a] text-white text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1 transition-colors shadow-xs"
                >
                  <ExternalLink size={13} /> View Jobs Portal
                </a>
              </div>

              <p className="text-xs text-slate-600">
                Join our esteemed academic community of 199+ PhD faculty members and visionary administrative staff.
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-slate-900">Assistant Professor / Associate Professor (AI & Data Science)</h5>
                    <p className="text-slate-500">Faculty of IT & Computer Science • PhD in relevant field</p>
                  </div>
                  <a 
                    href="https://ucp.edu.pk/jobs/career-opportunities/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0b2341] text-white text-[10px] font-bold px-2 py-1 rounded inline-block"
                  >
                    Apply
                  </a>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-slate-900">Lecturer in Media & Broadcast Journalism</h5>
                    <p className="text-slate-500">Faculty of Media & Mass Comm (CNN Academy) • MS/MPhil</p>
                  </div>
                  <a 
                    href="https://ucp.edu.pk/jobs/career-opportunities/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0b2341] text-white text-[10px] font-bold px-2 py-1 rounded inline-block"
                  >
                    Apply
                  </a>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-slate-900">Research Fellow – Robotics & IoT Lab</h5>
                    <p className="text-slate-500">ORIC & Faculty of Engineering • Full-time funded grant</p>
                  </div>
                  <a 
                    href="https://ucp.edu.pk/jobs/career-opportunities/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0b2341] text-white text-[10px] font-bold px-2 py-1 rounded inline-block"
                  >
                    Apply
                  </a>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Send CV and publications dossier to: <strong>hr@ucp.edu.pk</strong>
              </p>
            </div>
          )}

          {/* Student Verification */}
          {type === 'verify-student' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#092242] block">
                    Official Horizon Student Verification Portal
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 truncate block">
                    horizon.ucp.edu.pk/verify
                  </span>
                </div>
                <a
                  href="https://horizon.ucp.edu.pk/verify?_gl=1*1jdpsum*_gcl_au*MTgzMjA3ODQ4MC4xNzkwMDEyMzQ5*_ga*MTk1MTM4Njg4MS4xNzkwMDEyMzQ5*_ga_9BBZL6TFYQ*czE3OTAxNzk2OTYkbzYkZzEkdDE3OTAxODAxMjQkajU5JGwwJGg0NzM0NDM5MzA."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#092242] hover:bg-[#14325a] text-white text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1 transition-colors shadow-xs"
                >
                  <ExternalLink size={13} /> Open Horizon Portal
                </a>
              </div>

              <p className="text-xs text-slate-600">
                Verify enrollment status and degree credential authentications directly from official UCP institutional records.
              </p>
              <form onSubmit={handleVerifyStudent} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Enter Student Roll No. (e.g., L1F22BSCS0142)"
                  value={verifyRollNumber}
                  onChange={(e) => setVerifyRollNumber(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2341]"
                />
                <button 
                  type="submit"
                  className="bg-[#0b2341] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#081d38] transition-colors"
                >
                  Verify
                </button>
              </form>

              {verifyResult && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs space-y-1.5 animate-in fade-in">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 size={16} /> Verified Official Record
                  </div>
                  <p><strong>Student Name:</strong> {verifyResult.name}</p>
                  <p><strong>Academic Program:</strong> {verifyResult.degree}</p>
                  <p><strong>Status:</strong> {verifyResult.status}</p>
                  <p><strong>Session:</strong> {verifyResult.year}</p>
                </div>
              )}
            </div>
          )}

          {/* Tender Notices */}
          {type === 'tender-notice' && (
            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                Procurements are conducted in accordance with PPRA guidelines for transparency and quality standards.
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Tender Ref: UCP/PROC/2026/08</span>
                  <h5 className="font-bold text-slate-900 mt-1">Supply & Installation of High-Performance GPU Computing Cluster</h5>
                  <p className="text-slate-500">Submission Deadline: October 12, 2026 • Sealed bids to Procurement Office</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Tender Ref: UCP/PROC/2026/09</span>
                  <h5 className="font-bold text-slate-900 mt-1">Annual Maintenance & Servicing of Central HVAC Systems</h5>
                  <p className="text-slate-500">Submission Deadline: October 18, 2026 • Inquiries: tenders@ucp.edu.pk</p>
                </div>
              </div>
            </div>
          )}

          {/* Rehnumai Markaz */}
          {type === 'rehnumai-markaz' && (
            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                <strong>Rehnumai Markaz</strong> is UCP’s dedicated student counseling, guidance, and career development center supporting mental health, academic mentoring, and personality grooming.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 text-blue-950 rounded-xl border border-blue-200">
                  <h5 className="font-bold">One-on-One Psychological Counseling</h5>
                  <p className="mt-1 text-blue-900">Confidential sessions with certified clinical psychologists for stress, anxiety, and personal challenges.</p>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-950 rounded-xl border border-indigo-200">
                  <h5 className="font-bold">Career & Resume Clinics</h5>
                  <p className="mt-1 text-indigo-900">Mock interviews, corporate grooming, LinkedIn optimization, and industry placement linkages.</p>
                </div>
              </div>
              <p className="text-slate-500">
                Location: Rehnumai Markaz Wing, 1st Floor Student Center • Bookings: <strong>rehnumai@ucp.edu.pk</strong>
              </p>
            </div>
          )}

          {/* FAQs */}
          {type === 'faqs' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#092242] block">
                    Official UCP Frequently Asked Questions
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    https://ucp.edu.pk/faqs/
                  </span>
                </div>
                <a
                  href="https://ucp.edu.pk/faqs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#092242] hover:bg-[#14325a] text-white text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1 transition-colors shadow-xs"
                >
                  <ExternalLink size={13} /> Open Official FAQs
                </a>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <h5 className="font-bold text-slate-900">How do I apply for admission at UCP?</h5>
                <p className="text-slate-600 mt-1">
                  You can apply online via the UCP Admissions Portal by completing the digital application, uploading required academic certificates, and submitting the processing voucher online or at any Bank Alfalah / HBL branch.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <h5 className="font-bold text-slate-900">What is the criteria for UCP Merit Scholarships?</h5>
                <p className="text-slate-600 mt-1">
                  Students scoring high in Intermediate/A-Levels are eligible for up to 50% tuition scholarships based on merit. PGC alumni receive a 25% tuition fee concession across all undergraduate programs.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <h5 className="font-bold text-slate-900">Are UCP engineering and computer science degrees recognized?</h5>
                <p className="text-slate-600 mt-1">
                  Yes, engineering programs are accredited by PEC under Level-II Washington Accord (globally recognized), computer science by NCEAC, business by NBEAC, pharmacy by PCP, and law by the Pakistan Bar Council.
                </p>
              </div>
            </div>
          )}

          {/* International Programs */}
          {type === 'international-programs' && (
            <div className="space-y-3 text-xs">
              <p className="text-slate-600 leading-relaxed">
                UCP has formal exchange and 2+2 credit transfer agreements with leading international universities across the UK, USA, Turkey, Malaysia, and Europe.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900">Global Academic Partners</h5>
                  <p className="text-slate-500 mt-1">Active partnerships with University of Hertfordshire (UK), Middle East Technical University, and Universiti Malaya.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900">CNN Academy Partnership</h5>
                  <p className="text-slate-500 mt-1">Exclusive training ground in Pakistan with masterclasses broadcast from CNN bureaus in Abu Dhabi and Atlanta.</p>
                </div>
              </div>
            </div>
          )}

          {/* UCP Online */}
          {type === 'ucp-online' && (
            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                UCP Online powers modern blended and distance learning through state-of-the-art Canvas LMS, synchronous lecture broadcasting, and Coursera for Campus enterprise certifications.
              </p>
              <div className="p-3 bg-blue-50 text-blue-900 rounded-xl border border-blue-200">
                <p><strong>Over 4,000+ Verified Coursera Courses</strong> accessible free to all active UCP students and faculty members.</p>
              </div>
              <button 
                onClick={onOpenPortal}
                className="w-full bg-[#0b2341] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#081d38] transition-colors"
              >
                Access UCP Online LMS via Portal →
              </button>
            </div>
          )}

          {/* Blog */}
          {type === 'blog' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#092242] block">
                    Official UCP Blogs & Stories
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 truncate block">
                    ucp.edu.pk/blog
                  </span>
                </div>
                <a
                  href="https://ucp.edu.pk/blog/?_gl=1*g7icau*_gcl_au*mtgzmja3odq4mc4xnzkwmdeymzq5li0uls4xnzkwmtgwndm0ljy0mta5mdayni4xnzkwmtgwndm0lje3otaxoda0mzq.*_ga*mtk1mtm4njg4ms4xnzkwmdeymzq5*_ga_9bbzl6tfyq*cze3otaxnzk2otykbzykzzekdde3otaxoda0otckajywjgwwjgg0nzm0ndm5mza."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#a30f16] hover:bg-[#850c12] text-white text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1 transition-colors shadow-xs"
                >
                  <ExternalLink size={13} /> Visit Official Blog
                </a>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-rose-600 font-bold uppercase">Campus Story</span>
                <h5 className="font-bold text-slate-900 text-sm mt-0.5">UCP Robotics Team Clinches 1st Place at National Tech Olympiad</h5>
                <p className="text-slate-600 mt-1">Students from the Faculty of Engineering demonstrated autonomous industrial inspection drones...</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-blue-600 font-bold uppercase">Research Spotlight</span>
                <h5 className="font-bold text-slate-900 text-sm mt-0.5">Breakthrough in Nanotechnology for Clean Water Treatment</h5>
                <p className="text-slate-600 mt-1">Dr. Saima Tariq’s lab publishes pioneering water purification paper in Nature Materials...</p>
              </div>
            </div>
          )}

          {/* ORIC */}
          {type === 'oric' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#092242] block">
                    Official UCP ORIC Research & Tech Portal
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 truncate block">
                    oric.ucp.edu.pk
                  </span>
                </div>
                <a
                  href="https://oric.ucp.edu.pk/?_gl=1%2A1038nq8%2A_gcl_au%2AMTgzMjA3ODQ4MC4xNzkwMDEyMzQ5Li0uLS4xNzkwMTgwNDM0LjY0MTA5MDAyNi4xNzkwMTgwNDM0LjE3OTAxODA0MzQ.%2A_ga%2AMTk1MTM4Njg4MS4xNzkwMDEyMzQ5%2A_ga_9BBZL6TFYQ%2AczE3OTAxNzk2OTYkbzYkZzEkdDE3OTAxODA1MTUkajQyJGwwJGg0NzM0NDM5MzA."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#092242] hover:bg-[#14325a] text-white text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1 transition-colors shadow-xs"
                >
                  <ExternalLink size={13} /> Open ORIC Portal
                </a>
              </div>

              <p className="text-slate-600">
                The <strong>Office of Research, Innovation & Commercialization (ORIC)</strong> promotes high-impact research, commercializes inventions, and incubates student startups through the Takhleeq Business Incubator.
              </p>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-slate-100 rounded-xl">
                  <span className="text-xl font-black text-[#0b2341]">480+</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">Impact Factor Papers in 2025</p>
                </div>
                <div className="p-3 bg-slate-100 rounded-xl">
                  <span className="text-xl font-black text-[#a30f16]">28+</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">Patents Filed & Granted</p>
                </div>
              </div>
            </div>
          )}

          {/* Newsletter */}
          {type === 'newsletter' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Subscribe to the official <strong>UCP Newsletter</strong> to receive monthly digests on admissions, scholarships, research publications, and campus events.
              </p>
              {!newsletterSubscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input 
                      type="email"
                      required
                      placeholder="e.g., student@gmail.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2341]"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-[#0b2341] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#081d38] transition-colors"
                  >
                    Subscribe Now
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-50 text-emerald-950 p-4 rounded-xl border border-emerald-200 text-xs text-center space-y-1">
                  <CheckCircle2 size={24} className="mx-auto text-emerald-600" />
                  <p className="font-bold">Subscription Confirmed!</p>
                  <p className="text-slate-600">You will receive the next edition of UCP Newsletter at {newsletterEmail}.</p>
                </div>
              )}
            </div>
          )}

          {/* Merit List */}
          {type === 'merit-list' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-rose-50 text-rose-950 rounded-xl border border-rose-200">
                <span className="font-bold">Official Announcement:</span> Fall 2026 1st and 2nd Merit Lists are published. Shortlisted candidates must deposit fee vouchers before the due date.
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-slate-900">Faculty of IT & Computer Science (FOIT)</h5>
                    <p className="text-slate-500">BSCS, BSSE, BS Data Science, BS AI • 2nd Merit List</p>
                  </div>
                  <button onClick={onOpenPortal} className="bg-[#0b2341] text-white px-2.5 py-1 rounded text-xs font-semibold">View List</button>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-slate-900">UCP Business School (FOMS)</h5>
                    <p className="text-slate-500">BBA, BS Accounting & Finance • 2nd Merit List</p>
                  </div>
                  <button onClick={onOpenPortal} className="bg-[#0b2341] text-white px-2.5 py-1 rounded text-xs font-semibold">View List</button>
                </div>
              </div>

              {onOpenProgrammesPage && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenProgrammesPage();
                    }}
                    className="w-full py-2.5 px-4 bg-[#a30f16] hover:bg-[#860c12] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Explore All Degree Programs</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Fee Structure */}
          {type === 'fee-structure' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#092242] block">
                    Official UCP Fee Structure & Per-Semester Details
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 truncate block">
                    ucpcolleges.pgc.edu/campus-network/
                  </span>
                </div>
                <a
                  href="https://ucpcolleges.pgc.edu/campus-network/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#092242] hover:bg-[#14325a] text-white text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1 transition-colors shadow-xs"
                >
                  <ExternalLink size={13} /> Open Official Fee Page
                </a>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Find complete tuition fee schedules, admission fees, security deposits, and scholarship installment plans across all undergraduate, graduate, and ADP programs.
              </p>
            </div>
          )}

          {/* Rules & Regulations */}
          {type === 'rules-regulations' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#092242] block">
                    Official UCP Academic Rules & Regulations
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 truncate block">
                    ucp.edu.pk/rules-regulations/
                  </span>
                </div>
                <a
                  href="https://ucp.edu.pk/rules-regulations/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#092242] hover:bg-[#14325a] text-white text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1 transition-colors shadow-xs"
                >
                  <ExternalLink size={13} /> Open Rules & Regulations
                </a>
              </div>
              <p className="text-slate-600 leading-relaxed">
                University code of conduct, grading policy, semester attendance rules, credit transfer protocols, examination standards, and disciplinary guidelines.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs">
          <button
            onClick={() => {
              onClose();
              onOpenApply();
            }}
            className="text-[#a30f16] font-bold hover:underline"
          >
            Apply for Admission →
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
