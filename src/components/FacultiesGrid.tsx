import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface FacultiesGridProps {
  onSelectFaculty: (facultyId: string) => void;
  onExploreFacultyPrograms: (facultyId: string) => void;
  onOpenProgrammesPage?: () => void;
  onOpenCalendar?: () => void;
}

interface FacultyCardItem {
  id: string;
  name: string;
  shortName: string;
  subTitle: string;
  keyDegrees: string;
  programCount: string;
  graphicImage: string;
  accentColor: string;
}

const BAHAWALPUR_FACULTIES: FacultyCardItem[] = [
  {
    id: 'foit',
    name: 'Faculty of Information Technology',
    shortName: 'FOIT',
    subTitle: 'Computing & Artificial Intelligence',
    keyDegrees: 'BS Computer Science • ADP AI, Cyber Security & Data Science',
    programCount: '6 Programmes',
    graphicImage: '/assets/faculties/graphic_foit.jpg',
    accentColor: '#0284c7',
  },
  {
    id: 'fms',
    name: 'Faculty of Management Sciences',
    shortName: 'FMS',
    subTitle: 'Business Administration & Analytics',
    keyDegrees: 'BBA (Honours) • BS Business Analytics • BS Accounting & Finance',
    programCount: '6 Programmes',
    graphicImage: '/assets/faculties/graphic_fms.jpg',
    accentColor: '#b45309',
  },
  {
    id: 'fost',
    name: 'Faculty of Science & Technology',
    shortName: 'FOST',
    subTitle: 'Biotechnology, Chemistry & Natural Sciences',
    keyDegrees: 'BS Biotechnology • BS Biochemistry • BS Chemistry & Zoology',
    programCount: '9 Programmes',
    graphicImage: '/assets/faculties/graphic_fost.jpg',
    accentColor: '#059669',
  },
  {
    id: 'fhss',
    name: 'Faculty of Humanities & Social Sciences',
    shortName: 'FHSS',
    subTitle: 'Applied Psychology & English Linguistics',
    keyDegrees: 'BS Psychology (Clinical) • BS English Literature & Linguistics',
    programCount: '4 Programmes',
    graphicImage: '/assets/faculties/graphic_fhss.jpg',
    accentColor: '#7c3aed',
  },
];

export const FacultiesGrid: React.FC<FacultiesGridProps> = ({
  onSelectFaculty,
  onExploreFacultyPrograms,
  onOpenProgrammesPage,
  onOpenCalendar,
}) => {
  return (
    <section id="faculties-section" className="py-20 sm:py-24 lg:py-28 bg-[#f8fafc] text-[#0F2C61] border-b border-slate-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Minimal & Compact WordPress Style */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 sm:mb-8 pb-4 border-b border-slate-200/80 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#a30f16]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F2C61]">
                Academic Faculties
              </span>
            </div>
            <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl font-bold text-[#0F2C61] tracking-tight leading-snug">
              Academic Programmes
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenCalendar && (
              <button
                type="button"
                onClick={onOpenCalendar}
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0A1931] hover:text-[#C8102E] transition-colors cursor-pointer py-1.5 px-3.5 border border-slate-300 rounded-none bg-white hover:bg-slate-50 shadow-2xs font-sans"
              >
                <span>Academic Calendar</span>
                <ArrowRight size={13} className="text-[#C8102E] group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}

            <button
              type="button"
              onClick={() => onOpenProgrammesPage ? onOpenProgrammesPage() : onExploreFacultyPrograms('all')}
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#a30f16] hover:text-[#0F2C61] transition-colors cursor-pointer self-start sm:self-auto py-1.5"
            >
              <span>View all 25+ programmes</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Compact, Minimal Graphic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BAHAWALPUR_FACULTIES.map((fac, index) => {
            return (
              <motion.div
                key={fac.id}
                id={`faculty-card-${fac.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => onExploreFacultyPrograms(fac.id)}
                className="bg-white rounded-xl border border-slate-200/90 hover:border-[#0F2C61]/40 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden group cursor-pointer"
              >
                {/* 1. Sleek Graphic Design Artwork Header */}
                <div className="relative h-32 sm:h-34 w-full overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={fac.graphicImage}
                    alt={fac.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  {/* Minimal Faculty Code & Count Pill */}
                  <div className="absolute top-2.5 left-2.5 bg-slate-950/70 backdrop-blur-sm text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded border border-white/20">
                    {fac.shortName}
                  </div>

                  <div className="absolute bottom-2 left-2.5 text-white/90 text-[11px] font-semibold tracking-wide drop-shadow-sm">
                    {fac.programCount}
                  </div>
                </div>

                {/* 2. Compact, Informative Card Body */}
                <div className="p-4 flex flex-col justify-between flex-1 gap-2.5">
                  <div>
                    <h3 className="font-['Playfair_Display',Georgia,serif] text-sm sm:text-[15px] font-bold text-[#0F2C61] group-hover:text-[#a30f16] transition-colors leading-snug">
                      {fac.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#8C6D23] uppercase tracking-wide mt-0.5">
                      {fac.subTitle}
                    </p>
                    <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 mt-1.5 font-sans">
                      {fac.keyDegrees}
                    </p>
                  </div>

                  {/* Minimal Official Link Button */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0F2C61] group-hover:text-[#a30f16] transition-colors">
                    <span>Explore degrees</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FacultiesGrid;
