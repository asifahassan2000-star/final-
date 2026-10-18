import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Search, Phone, ChevronRight, Building
} from 'lucide-react';
import { FacultyProfileModal } from './FacultyProfileModal';
import { FacultyStickyGallery } from './FacultyStickyGallery';
import { 
  ALL_FACULTY_MEMBERS, 
  ADMINISTRATION_MEMBERS, 
  FacultyMemberData 
} from '../data/facultyData';

export type FacultySlot = FacultyMemberData;
export const OFFICIAL_FACULTY_MEMBERS = ALL_FACULTY_MEMBERS;

interface FacultyPageProps {
  onBackToHome: () => void;
  initialCategory?: string;
}

export const FacultyPage: React.FC<FacultyPageProps> = ({ 
  onBackToHome,
  initialCategory
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'faculty' | 'administration'>(
    initialCategory === 'administration' ? 'administration' : 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMemberData | null>(null);

  const getRankWeight = (f: FacultyMemberData): number => {
    const des = f.designation.toLowerCase();
    if (des.includes('associate professor')) return 2;
    if (des.includes('assistant professor')) return 3;
    if (des.includes('lecturer')) return 4;
    if (des.includes('professor')) return 1;
    return 5;
  };

  const filteredFaculty = ALL_FACULTY_MEMBERS
    .filter(faculty => {
      const q = searchQuery.toLowerCase();
      return searchQuery === '' || 
        faculty.name.toLowerCase().includes(q) ||
        faculty.designation.toLowerCase().includes(q) ||
        faculty.department.toLowerCase().includes(q) ||
        (faculty.highestDegree && faculty.highestDegree.toLowerCase().includes(q)) ||
        (faculty.specialization && faculty.specialization.toLowerCase().includes(q));
    })
    .sort((a, b) => getRankWeight(a) - getRankWeight(b));

  const filteredAdmins = ADMINISTRATION_MEMBERS
    .filter(admin => {
      const q = searchQuery.toLowerCase();
      return searchQuery === '' ||
        admin.name.toLowerCase().includes(q) ||
        admin.designation.toLowerCase().includes(q) ||
        admin.department.toLowerCase().includes(q) ||
        (admin.highestDegree && admin.highestDegree.toLowerCase().includes(q)) ||
        (admin.specialization && admin.specialization.toLowerCase().includes(q));
    });

  return (
    <div className="bg-white min-h-screen text-slate-800">
      
      {/* 1. Sub-Header Banner & Institutional Breadcrumb */}
      <div className="bg-[#092242] text-white border-b border-[#14325a] py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            {/* Return to Home Button */}
            <button
              id="back-to-home-btn"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-amber-300 transition-colors bg-white/10 hover:bg-white/15 px-3.5 py-1.5 rounded-lg border border-white/15 cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>

            {/* Eyebrow badge */}
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Official Directory • UCP Bahawalpur
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Faculty &amp; Administration
              </h1>
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Distinguished professors, academic mentors, and key administrative officers at UCP Bahawalpur.
              </p>
            </div>

            {/* Search Input Bar */}
            <div className="relative shrink-0 w-full sm:w-72">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or role..."
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-white/20 bg-white/10 text-white placeholder-slate-300 focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-300 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Directory Navigation Tabs without mentioning numbers */}
          <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-white/10">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-white/10 text-slate-200 hover:bg-white/15'
              }`}
            >
              All Directory
            </button>
            <button
              onClick={() => setActiveTab('faculty')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'faculty'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-white/10 text-slate-200 hover:bg-white/15'
              }`}
            >
              Academic Faculty
            </button>
            <button
              onClick={() => setActiveTab('administration')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'administration'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-white/10 text-slate-200 hover:bg-white/15'
              }`}
            >
              <Building size={13} />
              <span>Campus Administration</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
        
        {/* =========================================================================
            SECTION A: CAMPUS ADMINISTRATION
            Visible when activeTab is 'all' or 'administration'
            Clean presentation: just image, name & designation, with data in View Dossier
            Neat contact number without heavy highlighted borders
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'administration') && (
          <section id="campus-administration-section" className="scroll-mt-12">
            
            {/* Administration Section Header: Clean, without extra red text or heavy boxes */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
              <div>
                <h2 
                  className="text-2xl sm:text-3xl font-serif font-bold text-[#092242] tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Campus Administration
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Key administrative leaders dedicated to student academic follow-up, creative visual communications, and portal management at UCP Bahawalpur.
                </p>
              </div>

              {/* Neat contact numbers for admin queries without heavy highlighted borders */}
              <div className="flex items-center gap-2 text-xs text-slate-600 font-sans shrink-0 self-start sm:self-auto pt-1">
                <Phone size={13} className="text-[#092242]" />
                <span className="text-slate-500 font-medium">Phone:</span>
                <a href="tel:0622202030" className="font-semibold text-[#092242] hover:text-[#a30f16] hover:underline transition-colors">
                  062-2202030
                </a>
                <span className="text-slate-300">/</span>
                <a href="tel:0622202050" className="font-semibold text-[#092242] hover:text-[#a30f16] hover:underline transition-colors">
                  062-2202050
                </a>
              </div>
            </div>

            {/* Administration Member Cards: Just Image, Name & Designation, Details in View Dossier */}
            {filteredAdmins.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-sm text-slate-600">No administration members matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 items-stretch">
                {filteredAdmins.map((admin, idx) => (
                  <motion.div
                    key={admin.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true, amount: 0.15 }}
                    onClick={() => setSelectedFaculty(admin)}
                    className="group flex flex-col items-center text-center cursor-pointer p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-slate-50/70 border border-slate-100 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all duration-300 justify-between"
                  >
                    <div className="w-full">
                      {/* Photo Container: EXACT SAME 4:5 IMAGE RATIO & SIZING AS FACULTY */}
                      <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-2xs group-hover:shadow-xs group-hover:border-[#C5A059]/60 transition-all duration-300 relative">
                        <img
                          src={admin.photoUrl}
                          alt={admin.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = admin.fallbackPhotoUrl;
                          }}
                        />
                        {/* Subtle elegant gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>

                      {/* Name & Designation only (clean, to-the-point) */}
                      <div className="mt-3 px-1 text-center w-full">
                        <h3 
                          className="font-['Playfair_Display',serif] text-sm sm:text-base lg:text-lg font-bold text-[#0F2C61] group-hover:text-[#b8121a] transition-colors leading-snug"
                        >
                          {admin.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#a30f16] uppercase tracking-wider mt-0.5 font-mono">
                          {admin.designation}
                        </p>
                        <p className="text-[11px] text-slate-500 font-sans mt-0.5 font-medium">
                          {admin.department}
                        </p>
                      </div>
                    </div>

                    {/* View Dossier Action Bar */}
                    <div className="mt-3 pt-2 w-full border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#092242] group-hover:text-[#a30f16] transition-colors">
                      <span className="text-[11px] font-mono uppercase tracking-wider">View Dossier</span>
                      <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </section>
        )}

        {/* =========================================================================
            SECTION B: ACADEMIC FACULTY DIRECTORY
            Visible when activeTab is 'all' or 'faculty'
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'faculty') && (
          <section id="academic-faculty-section" className="scroll-mt-12">
            
            {/* Faculty Section Header without count numbers */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
              <div>
                <h2 
                  className="text-2xl sm:text-3xl font-serif font-bold text-[#092242] tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Academic Faculty Directory
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Sequenced strictly by academic rank: Professors, Associate Professors, Assistant Professors, and Lecturers.
                </p>
              </div>
            </div>

            {/* Faculty Grid */}
            {filteredFaculty.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-sm text-slate-600">No faculty members found matching "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs font-semibold text-[#092242] underline hover:text-[#b8121a] cursor-pointer"
                >
                  Clear search filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
                {filteredFaculty.map((faculty, index) => (
                  <motion.div
                    key={faculty.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (index % 4) * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true, amount: 0.15 }}
                    onClick={() => setSelectedFaculty(faculty)}
                    className="group flex flex-col items-center text-center cursor-pointer p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-slate-50/70 border border-slate-100 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all duration-300"
                  >
                    {/* Official Portrait Frame */}
                    <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-2xs group-hover:shadow-xs group-hover:border-[#C5A059]/60 transition-all duration-300 relative">
                      <img
                        src={faculty.photoUrl}
                        alt={faculty.name}
                        className={`w-full h-full object-cover ${faculty.objectPosition || 'object-top'} transition-transform duration-500 ease-out group-hover:scale-105`}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = faculty.fallbackPhotoUrl;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* Name & Designation: Crisp, official university typography */}
                    <div className="mt-3 px-1 w-full text-center">
                      <h3 className="font-['Playfair_Display',serif] text-sm sm:text-base lg:text-lg font-bold text-[#0F2C61] group-hover:text-[#b8121a] transition-colors leading-snug">
                        {faculty.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-sans mt-0.5 font-medium">
                        {faculty.designation}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </section>
        )}

      </main>

      {/* 3. Our Faculty Glimpse — Apple-Style Sticky Scroll */}
      <FacultyStickyGallery />

      {/* 4. Bottom Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#092242] hover:text-[#a30f16] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Return to Main Campus Homepage</span>
          </button>

          <p className="text-xs text-slate-500 font-sans">
            University of Central Punjab · Bahawalpur Campus
          </p>
        </div>
      </div>

      {/* Official Faculty & Administration Profile Modal */}
      <FacultyProfileModal
        faculty={selectedFaculty}
        isOpen={!!selectedFaculty}
        onClose={() => setSelectedFaculty(null)}
      />

    </div>
  );
};

export default FacultyPage;
