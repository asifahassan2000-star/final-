import React, { useState } from 'react';
import { X, UserCheck, Key, Shield, BookOpen, Clock, Award, CheckCircle2, LogIn, AlertCircle } from 'lucide-react';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({ isOpen, onClose }) => {
  const [role, setRole] = useState<'student' | 'faculty'>('student');
  const [identifier, setIdentifier] = useState('L1F22BSCS0142');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = 'https://mcom.pgc.edu.pk/Student/StdLogin.jsp';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0c2340] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 font-bold border border-white/15">
              <UserCheck size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                PGC Student Login Portal
              </h3>
              <p className="text-xs text-slate-300">
                Official Campus Portal (mcom.pgc.edu.pk)
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

        {/* Body */}
        <div className="p-6">
          {!isLoggedIn ? (
            <div>
              {/* Official Direct Portal Alert & Direct Redirect Link */}
              <div className="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#092242] block">
                    Official Student Portal Login
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 truncate block">
                    https://mcom.pgc.edu.pk/Student/StdLogin.jsp
                  </span>
                </div>
                <a
                  href="https://mcom.pgc.edu.pk/Student/StdLogin.jsp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#a30f16] hover:bg-[#850c12] text-white text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 transition-colors flex items-center gap-1 shadow-sm"
                >
                  <LogIn size={13} /> Open Now
                </a>
              </div>
              {/* Role Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    role === 'student'
                      ? 'bg-white text-[#112c4f] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Student Portal Login
                </button>
                <button
                  type="button"
                  onClick={() => setRole('faculty')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    role === 'faculty'
                      ? 'bg-white text-[#112c4f] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Faculty / Staff Login
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {role === 'student' ? 'Student Registration / Roll No' : 'Official Faculty Email'}
                  </label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={role === 'student' ? 'e.g. L1F22BSCS0142' : 'faculty@ucp.edu.pk'}
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#112c4f] font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Portal Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#112c4f]"
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-[#112c4f]" />
                    <span>Remember on this device</span>
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset instruction sent to your registered UCP email.'); }} className="text-[#b8121a] hover:underline font-semibold">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#112c4f] hover:bg-[#0c2340] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  <LogIn size={16} /> Login to PGC Student Portal (mcom.pgc.edu.pk)
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                <span className="text-[11px] text-slate-500">
                  Experiencing login difficulties? Contact UCP IT Helpdesk: <strong>ithelpdesk@ucp.edu.pk</strong>
                </span>
              </div>
            </div>
          ) : (
            /* Logged-In Demo Dashboard */
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#112c4f] text-white font-bold flex items-center justify-center text-sm shadow">
                    AK
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#112c4f]">Ali Khan (Student)</h4>
                    <span className="text-xs font-mono text-slate-500">{identifier}</span>
                    <span className="block text-[10px] text-emerald-600 font-bold uppercase mt-0.5">
                      ● Active • BS Computer Science (Semester 5)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-xs text-slate-500 hover:text-red-600 font-semibold px-2 py-1 rounded bg-slate-200"
                >
                  Logout
                </button>
              </div>

              {/* Quick Academic Metric Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Current CGPA</span>
                  <span className="text-xl font-black text-[#112c4f]">3.82</span>
                  <span className="text-[9px] text-emerald-600 font-semibold block">Dean's Honor Roll</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Attendance</span>
                  <span className="text-xl font-black text-emerald-600">94%</span>
                  <span className="text-[9px] text-slate-400 font-semibold block">Satisfactory</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Fee Status</span>
                  <span className="text-sm font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                    Clear
                  </span>
                  <span className="text-[9px] text-slate-400 font-semibold block mt-1">Challan Paid</span>
                </div>
              </div>

              {/* Registered Courses */}
              <div>
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Enrolled Courses (Fall 2026):
                </h5>
                <div className="space-y-2 text-xs">
                  {[
                    { code: 'CS-301', name: 'Design and Analysis of Algorithms', time: '10:00 AM (Room B-204)' },
                    { code: 'CS-305', name: 'Artificial Intelligence & Neural Nets', time: '11:30 AM (Lab 5)' },
                    { code: 'CS-310', name: 'Database Management Systems', time: '02:00 PM (Room C-102)' },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <div>
                        <strong className="text-[#112c4f]">{c.code}:</strong> {c.name}
                      </div>
                      <span className="text-[11px] text-slate-500">{c.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => alert('Opening full LMS (Learning Management System)...')}
                  className="flex-1 bg-[#112c4f] text-white py-2 rounded-xl text-xs font-bold hover:bg-slate-800"
                >
                  Open UCP LMS Portal
                </button>
                <button
                  onClick={onClose}
                  className="px-4 bg-slate-200 text-slate-700 py-2 rounded-xl text-xs font-bold hover:bg-slate-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
