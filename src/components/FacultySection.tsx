import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FacultyProfileModal } from './FacultyProfileModal';
import { FacultyStickyGallery } from './FacultyStickyGallery';
import { ALL_FACULTY_MEMBERS, FacultyMemberData } from '../data/facultyData';

export type FacultyMember = FacultyMemberData;
export const FACULTY_MEMBERS = ALL_FACULTY_MEMBERS;

interface FacultySectionProps {
  onViewAllFaculty?: (category?: string) => void;
}

// Featured Faculty on Homepage in Strict Sequence: Professor -> Associate Professor -> Assistant Professor
const FEATURED_FACULTY_HOMEPAGE_IDS = [
  'dr-abdul-kareem',     // 1. Professor: Dr. Abdul Kareem
  'dr-abbas-haider',     // 2. Associate Professor: Prof. Dr. Abbas Haider
  'prof-uzma-zulqurnai', // 3. Assistant Professor: Prof. Uzma Zulqurnain
  'prof-abeer-aslam',    // 4. Assistant Professor: Prof. Abeer Aslam (shown on homepage in place of Prof. Malik Allah Rakha)
];

const MobileFacultyCarousel: React.FC<{
  onSelect: (faculty: FacultyMemberData) => void;
}> = ({ onSelect }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerView = 3;
  const total = ALL_FACULTY_MEMBERS.length;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + itemsPerView >= total ? 0 : prev + itemsPerView));
    }, 3200);
    return () => clearInterval(timer);
  }, [total]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - itemsPerView < 0 ? Math.max(0, total - itemsPerView) : prev - itemsPerView));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + itemsPerView >= total ? 0 : prev + itemsPerView));
  };

  // 3 items visible at once
  const visibleFaculty: FacultyMemberData[] = [];
  for (let i = 0; i < itemsPerView; i++) {
    const idx = (startIndex + i) % total;
    visibleFaculty.push(ALL_FACULTY_MEMBERS[idx]);
  }

  const totalPages = Math.ceil(total / itemsPerView);
  const currentPage = Math.floor(startIndex / itemsPerView);

  return (
    <div className="md:hidden w-full">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {visibleFaculty.map((faculty) => (
          <div
            key={faculty.id}
            onClick={() => onSelect(faculty)}
            className="group flex flex-col items-center text-center cursor-pointer transition-transform duration-300"
          >
            <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 border border-slate-200/90 shadow-2xs relative">
              <img
                src={faculty.photoUrl}
                alt={faculty.name}
                className={`w-full h-full object-cover ${faculty.objectPosition || 'object-top'}`}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = faculty.fallbackPhotoUrl;
                }}
              />
            </div>
            <div className="mt-1.5 px-0.5 w-full text-center">
              <h3 className="font-['Playfair_Display',serif] text-[11px] font-bold text-[#0F2C61] line-clamp-1 leading-tight">
                {faculty.name}
              </h3>
              <p className="text-[9px] text-slate-500 font-sans mt-0.5 font-medium line-clamp-1">
                {faculty.designation}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 px-1">
        <button
          onClick={handlePrev}
          aria-label="Previous faculty"
          className="text-xs font-bold text-slate-500 hover:text-[#0F2C61] px-1 py-0.5 cursor-pointer"
        >
          ← Prev
        </button>
        <div className="flex gap-1 items-center">
          {Array.from({ length: totalPages }).map((_, pIdx) => (
            <button
              key={pIdx}
              onClick={() => setStartIndex(pIdx * itemsPerView)}
              aria-label={`Go to faculty slide ${pIdx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                pIdx === currentPage ? 'w-4 bg-[#a30f16]' : 'w-1.5 bg-slate-200'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          aria-label="Next faculty"
          className="text-xs font-bold text-slate-500 hover:text-[#0F2C61] px-1 py-0.5 cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export const FacultySection: React.FC<FacultySectionProps> = ({
  onViewAllFaculty
}) => {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMemberData | null>(null);

  // Featured faculty members in strict rank sequence for desktop
  const featuredFaculty: FacultyMemberData[] = FEATURED_FACULTY_HOMEPAGE_IDS.map(id => 
    ALL_FACULTY_MEMBERS.find(f => f.id === id)
  ).filter((f): f is FacultyMemberData => !!f);

  return (
    <section 
      id="faculty-section" 
      className="bg-white py-20 sm:py-24 lg:py-28 border-b border-slate-200 text-[#0F2C61] relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-[2px] bg-[#C5A059]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
                Distinguished Faculty
              </span>
            </div>
            
            <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl lg:text-4xl font-normal text-[#0F2C61] tracking-tight">
              Our Faculty
            </h2>
          </div>

          {onViewAllFaculty && (
            <button
              onClick={() => onViewAllFaculty('all')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0F2C61] hover:text-[#a30f16] group transition-colors cursor-pointer self-start sm:self-end shrink-0"
            >
              <span>View All {ALL_FACULTY_MEMBERS.length} Faculty Profiles</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Mobile: Horizontal Moving Line (3 small images at once that move and continue moving others) */}
        <MobileFacultyCarousel onSelect={(faculty) => setSelectedFaculty(faculty)} />

        {/* 
          Desktop: 4 Top Professors with original prominent card & portrait aspect ratio (aspect-[4/5])
          100% same desktop layout
        */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredFaculty.map((faculty, index) => {
            const isProfessor = faculty.designation.toLowerCase().includes('professor') && !faculty.designation.toLowerCase().includes('associate') && !faculty.designation.toLowerCase().includes('assistant');
            const isAssociate = faculty.designation.toLowerCase().includes('associate');
            const isAssistant = faculty.designation.toLowerCase().includes('assistant');
            const isLecturer = faculty.designation.toLowerCase().includes('lecturer');
            const rankLabel = isProfessor ? 'Professor' : isAssociate ? 'Associate Professor' : isAssistant ? 'Assistant Professor' : isLecturer ? 'Lecturer' : faculty.designation;

            return (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.2 }}
                onClick={() => setSelectedFaculty(faculty)}
                className="group flex flex-col items-center text-center cursor-pointer"
              >
                {/* Prominent, Crisp Portrait Frame (aspect-[4/5]) */}
                <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-2xs group-hover:shadow-md group-hover:border-[#C5A059] transition-all duration-300 relative">
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
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Rank Tag, Name & Designation */}
                <div className="mt-3 px-1 w-full text-center">
                  <div className="mb-1">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#C5A059] font-sans">
                      {rankLabel}
                    </span>
                  </div>
                  <h3 className="font-['Playfair_Display',serif] text-sm sm:text-base lg:text-lg font-bold text-[#0F2C61] group-hover:text-[#a30f16] transition-colors leading-snug">
                    {faculty.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-sans mt-0.5 font-medium">
                    {faculty.designation}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Faculty in Action: Cinematic Gallery (zero solo portraits) */}
      <div className="mt-12 border-t border-slate-100">
        <FacultyStickyGallery />
      </div>

      {/* Full Faculty Profile Dossier Modal */}
      <FacultyProfileModal
        faculty={selectedFaculty}
        isOpen={!!selectedFaculty}
        onClose={() => setSelectedFaculty(null)}
      />
    </section>
  );
};

export default FacultySection;
