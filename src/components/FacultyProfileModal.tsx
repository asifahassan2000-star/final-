import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Award, BookOpen, GraduationCap, CheckCircle2, 
  Briefcase, ShieldCheck, Trophy, Sparkles, Terminal, 
  Cpu, FileText, Check, ChevronRight, UserCheck
} from 'lucide-react';
import { FacultyMemberData } from '../data/facultyData';

export type FacultyProfileModalData = FacultyMemberData;

interface FacultyProfileModalProps {
  faculty: FacultyProfileModalData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FacultyProfileModal: React.FC<FacultyProfileModalProps> = ({
  faculty,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'qualifications' | 'experience' | 'skills' | 'achievements'>('profile');

  // Reset tab when modal opens or faculty changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab('profile');
    }
  }, [isOpen, faculty?.id]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!faculty) return null;

  // Derive concise 3 left bullets (Education & Expertise)
  const degreeBullet = faculty.highestDegree;
  const specializationBullet = faculty.specialization 
    ? faculty.specialization 
    : faculty.intro
    ? faculty.intro.replace(/^(Specializes in|Focuses on|Conducts advanced investigations into|Supervises|Researches|Expert in)\s+/i, '').split('.')[0]
    : 'Advanced Higher Education Pedagogy';
  const divisionBullet = faculty.department || 'Academic Division of Advanced Studies';

  // Derive concise 3 right bullets (Experience & Research)
  const expString = faculty.experienceYears || '10+ Years Academic Leadership';

  const hasQualifications = faculty.qualifications && faculty.qualifications.length > 0;
  const hasExperience = (faculty.experienceDetails && faculty.experienceDetails.length > 0) || (faculty.academicAdministration && faculty.academicAdministration.length > 0);
  const hasSkills = (faculty.coreTechnicalSkills && faculty.coreTechnicalSkills.length > 0) || (faculty.programmingSkills && faculty.programmingSkills.length > 0) || (faculty.managementLeadershipSkills && faculty.managementLeadershipSkills.length > 0);
  const hasAchievements = (faculty.achievements && faculty.achievements.length > 0) || (faculty.researchPublications && faculty.researchPublications.length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, y: 16, opacity: 0 }}
            animate={{ 
              scale: 1, 
              y: 0, 
              opacity: 1,
              transition: { type: 'spring', damping: 26, stiffness: 300 } 
            }}
            exit={{ 
              scale: 0.94, 
              y: 16, 
              opacity: 0,
              transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } 
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[880px] max-h-[90vh] bg-white rounded-[26px] shadow-2xl z-10 overflow-y-auto border border-slate-100 p-5 sm:p-8 md:p-10 text-slate-800"
            role="dialog"
            aria-modal="true"
            aria-labelledby="faculty-modal-name"
          >
            {/* Close button top right */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer z-20 group shadow-xs"
            >
              <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* Modal Heading Eyebrow */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-5 h-[1.5px] bg-[#C5A059]" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-[#C5A059]">
                Official Faculty Dossier • UCP Bahawalpur
              </span>
              <span className="w-5 h-[1.5px] bg-[#C5A059]" />
            </div>

            {/* 3-Column Header Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7 items-center pt-1 pb-6 border-b border-slate-100">
              
              {/* LEFT COLUMN: Education & Expertise */}
              <div className="space-y-3 text-left order-2 md:order-1 bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-200/60">
                  <GraduationCap size={13} className="text-[#C5A059]" />
                  <h4 className="text-[10.5px] font-bold tracking-wider uppercase text-slate-500 font-mono">
                    Academic Pillar
                  </h4>
                </div>

                <ul className="space-y-2.5 font-sans text-xs text-slate-600 leading-snug">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1" />
                    <span className="font-medium text-slate-800">{degreeBullet}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1" />
                    <span>{divisionBullet}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1" />
                    <span className="line-clamp-2">{specializationBullet}</span>
                  </li>
                </ul>
              </div>

              {/* CENTER COLUMN: Portrait, Name, Designation */}
              <div className="flex flex-col items-center text-center order-1 md:order-2 px-1">
                <div className="w-[140px] h-[140px] sm:w-[155px] sm:h-[155px] rounded-2xl overflow-hidden shadow-lg ring-3 ring-[#C5A059]/40 ring-offset-4 ring-offset-white bg-slate-100 shrink-0">
                  <img
                    src={faculty.photoUrl}
                    alt={faculty.name}
                    className={`w-full h-full object-cover ${faculty.objectPosition || 'object-top'}`}
                    loading="eager"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = faculty.fallbackPhotoUrl;
                    }}
                  />
                </div>

                <h3 
                  id="faculty-modal-name"
                  className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold text-[#0F2C61] mt-3.5 tracking-tight leading-snug"
                >
                  {faculty.name}
                </h3>

                <div className="mt-1.5">
                  <span className="inline-flex items-center px-3 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#C5A059]/15 text-[#8C6D23] border border-[#C5A059]/30">
                    {faculty.designation}
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: Experience & Tenure */}
              <div className="space-y-3 text-left order-3 bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-200/60">
                  <Briefcase size={13} className="text-[#0F2C61]" />
                  <h4 className="text-[10.5px] font-bold tracking-wider uppercase text-slate-500 font-mono">
                    Tenure & Focus
                  </h4>
                </div>

                <ul className="space-y-2.5 font-sans text-xs text-slate-600 leading-snug">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C61] shrink-0 mt-1" />
                    <span className="font-semibold text-[#0F2C61]">{expString}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C61] shrink-0 mt-1" />
                    <span>Higher Education Pedagogy & Research</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C61] shrink-0 mt-1" />
                    <span>Scholarly Inquiry & Student Mentorship</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Navigation Tabs for Neat Professional Dossier Sections */}
            <div className="mt-6 flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-100">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer shrink-0 ${
                  activeTab === 'profile'
                    ? 'bg-[#0F2C61] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Professional Profile
              </button>

              {hasQualifications && (
                <button
                  onClick={() => setActiveTab('qualifications')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer shrink-0 ${
                    activeTab === 'qualifications'
                      ? 'bg-[#0F2C61] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Qualifications
                </button>
              )}

              {hasExperience && (
                <button
                  onClick={() => setActiveTab('experience')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer shrink-0 ${
                    activeTab === 'experience'
                      ? 'bg-[#0F2C61] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Experience & Administration
                </button>
              )}

              {hasSkills && (
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer shrink-0 ${
                    activeTab === 'skills'
                      ? 'bg-[#0F2C61] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Skills & Expertise
                </button>
              )}

              {hasAchievements && (
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer shrink-0 ${
                    activeTab === 'achievements'
                      ? 'bg-[#0F2C61] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Achievements & Awards
                </button>
              )}
            </div>

            {/* TAB CONTENT PANELS */}
            <div className="pt-6">
              
              {/* 1. PROFESSIONAL PROFILE (Overview) */}
              {activeTab === 'profile' && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Executive Overview */}
                  <div className="bg-[#FAF8F5] border border-amber-200/60 rounded-2xl p-5 sm:p-6 shadow-2xs">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Sparkles size={15} className="text-[#a30f16]" />
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a30f16]">
                        Executive Academic Overview
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                      {faculty.intro || `${faculty.name} is a distinguished faculty member at the University of Central Punjab Bahawalpur Campus, contributing to research excellence, curriculum development, and student academic success.`}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Academic Department
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[#0F2C61]">
                        {faculty.department}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Highest Academic Credential
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[#0F2C61]">
                        {faculty.highestDegree}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Professional Experience
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[#0F2C61]">
                        {faculty.experienceYears || '10+ Years in Higher Education'}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Core Academic Specialization
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[#0F2C61]">
                        {faculty.specialization || 'Academic Pedagogy & Research'}
                      </p>
                    </div>
                  </div>

                  {/* Areas of Interest (if present) */}
                  {faculty.areaOfInterest && faculty.areaOfInterest.length > 0 && (
                    <div className="p-4 sm:p-5 rounded-xl border border-slate-200/80 bg-slate-50/50">
                      <h4 className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#0F2C61] mb-2.5">
                        Areas of Academic Interest
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {faculty.areaOfInterest.map((interest, idx) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white text-[#0F2C61] border border-slate-200 shadow-2xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* 2. QUALIFICATIONS */}
              {activeTab === 'qualifications' && hasQualifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap size={16} className="text-[#0F2C61]" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2C61]">
                      Academic Qualifications & Educational History
                    </h4>
                  </div>

                  <div className="space-y-2.5">
                    {faculty.qualifications?.map((qual, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-lg bg-[#0F2C61]/10 text-[#0F2C61] flex items-center justify-center shrink-0 mt-0.5 font-mono text-[11px] font-bold">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                            {qual}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 3. EXPERIENCE & ADMINISTRATION */}
              {activeTab === 'experience' && hasExperience && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Teaching & Academic Experience */}
                  {faculty.experienceDetails && faculty.experienceDetails.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen size={16} className="text-[#0F2C61]" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2C61]">
                          Teaching & Academic Experience
                        </h4>
                      </div>

                      <div className="space-y-2">
                        {faculty.experienceDetails.map((exp, idx) => (
                          <div 
                            key={idx}
                            className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100 bg-white text-xs text-slate-700"
                          >
                            <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{exp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Academic Administration & Examination */}
                  {faculty.academicAdministration && faculty.academicAdministration.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <ShieldCheck size={16} className="text-[#a30f16]" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a30f16]">
                          Examination & Academic Administration
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {faculty.academicAdministration.map((adminItem, idx) => (
                          <div 
                            key={idx}
                            className="flex items-start gap-2.5 p-3 rounded-lg border border-amber-100 bg-amber-50/40 text-xs text-slate-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#a30f16] shrink-0 mt-1.5" />
                            <span>{adminItem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* 4. SKILLS & EXPERTISE */}
              {activeTab === 'skills' && hasSkills && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Core Technical Skills */}
                  {faculty.coreTechnicalSkills && faculty.coreTechnicalSkills.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Cpu size={16} className="text-[#0F2C61]" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2C61]">
                          Core Technical & Subject Competencies
                        </h4>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {faculty.coreTechnicalSkills.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200/80 shadow-2xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Programming & Development Languages */}
                  {faculty.programmingSkills && faculty.programmingSkills.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <Terminal size={16} className="text-[#0F2C61]" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2C61]">
                          Programming & Software Technologies
                        </h4>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {faculty.programmingSkills.map((prog, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#0F2C61]/10 text-[#0F2C61] border border-[#0F2C61]/20"
                          >
                            {prog}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Management & Leadership Skills */}
                  {faculty.managementLeadershipSkills && faculty.managementLeadershipSkills.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <UserCheck size={16} className="text-[#C5A059]" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C6D23]">
                          Management & Academic Leadership
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {faculty.managementLeadershipSkills.map((mgmt, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200/60 bg-white text-xs text-slate-700"
                          >
                            <Check size={13} className="text-[#C5A059] shrink-0" />
                            <span>{mgmt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Networking & Cyber Security (if applicable) */}
                  {faculty.networkingSecuritySkills && faculty.networkingSecuritySkills.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Networking, IoT & Cyber Systems
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {faculty.networkingSecuritySkills.map((net, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
                          >
                            {net}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* 5. ACHIEVEMENTS & AWARDS */}
              {activeTab === 'achievements' && hasAchievements && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Institutional Achievements & Awards */}
                  {faculty.achievements && faculty.achievements.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy size={16} className="text-amber-500" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2C61]">
                          Honors, Awards & Key Milestones
                        </h4>
                      </div>

                      <div className="space-y-2.5">
                        {faculty.achievements.map((ach, idx) => (
                          <div 
                            key={idx}
                            className="flex items-start gap-3 p-3.5 rounded-xl border border-amber-200/80 bg-amber-50/30"
                          >
                            <Award size={15} className="text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                              {ach}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Research & Publications */}
                  {faculty.researchPublications && faculty.researchPublications.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText size={16} className="text-[#0F2C61]" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2C61]">
                          Research & Academic Publications
                        </h4>
                      </div>

                      <div className="space-y-2">
                        {faculty.researchPublications.map((pub, idx) => (
                          <div 
                            key={idx}
                            className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C61] shrink-0 mt-1.5" />
                            <span>{pub}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

            </div>

            {/* Bottom Subtle Note */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 font-sans">
              <span>University of Central Punjab • Bahawalpur Campus</span>
              <span>Official Academic Registry Dossier</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
