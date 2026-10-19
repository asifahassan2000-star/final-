import React, { useState } from 'react';
import { 
  Building2, Cpu, BookOpen, Microscope, ArrowRight, Maximize2, X
} from 'lucide-react';

interface FacilitiesSectionProps {
  onOpenApply?: () => void;
  onOpenCampusLifePage?: () => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
  onOpenApply,
  onOpenCampusLifePage,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'environment' | 'library' | 'computer' | 'science'>('all');
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(false);
  const [isComputerExpanded, setIsComputerExpanded] = useState(false);
  const [isScienceExpanded, setIsScienceExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    fallback?: string;
    title: string;
    caption?: string;
  } | null>(null);

  return (
    <section 
      id="facilities-section"
      className="py-20 sm:py-24 lg:py-28 bg-[#FAFAF8] dark:bg-[#080f1d] border-b border-slate-200 dark:border-white/10 transition-colors duration-200"
      aria-labelledby="facilities-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header 
          data-reveal="heading"
          data-reveal-delay="0"
          className="max-w-3xl mb-8 sm:mb-10"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
            Campus Facilities
          </span>
          <h2
            id="facilities-heading"
            className="text-2xl sm:text-3xl font-serif font-semibold text-slate-900 dark:text-white tracking-tight"
          >
            Learning Environment, Library & Laboratories
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            Explore the academic spaces, central library, computer labs, and science facilities at UCP Bahawalpur.
          </p>

          {/* Minimal Category Tabs */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All' },
              { id: 'environment', label: 'Learning Environment' },
              { id: 'library', label: 'Central Library' },
              { id: 'computer', label: 'Computer Labs' },
              { id: 'science', label: 'Science Labs' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 font-semibold'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 dark:bg-[#0d1e38] dark:text-slate-300 dark:border-[#1e3256] dark:hover:bg-[#142646] dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* 1. LEARNING ENVIRONMENT */}
        {(activeTab === 'all' || activeTab === 'environment') && (
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-200 dark:border-white/10">
              <Building2 size={16} className="text-slate-600 dark:text-amber-400" />
              <h3 className="text-base sm:text-lg font-serif font-semibold text-slate-900 dark:text-white">
                Learning Environment & Campus Architecture
              </h3>
            </div>

            {/* Main Grand Staircase Card (Full Bleed 16:9, Edge-to-Edge) */}
            <div className="bg-white dark:bg-[#0d1e38] rounded-xl border border-slate-200 dark:border-[#1e3256] overflow-hidden mb-6 shadow-xs transition-colors">
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900">
                <img decoding="async" src="/assets/facilities/grand_staircase_central_atrium.jpg"
                  alt="Campus Grand Staircase and Central Atrium"
                  loading="lazy"
                  className="w-full h-full object-cover object-center block"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://i.ibb.co/tPJpr2Hc/image-13.jpg';
                  }}
                />
              </div>
              <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-white/10">
                <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                  Grand Staircase & Central Atrium
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed font-sans">
                  Open multi-level architectural staircase and spacious central atrium designed with natural light.
                </p>
              </div>
            </div>

            {/* 2 Grid Cards: Campus Reception Hall and Vertical Corridor (Full Size Visible) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Reception Hall Card (Clean image, wording removed, full size visible) */}
              <div 
                className="bg-white dark:bg-[#0d1e38] rounded-xl border border-slate-200 dark:border-[#1e3256] overflow-hidden shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => setSelectedImage({
                  src: '/assets/campus/campus-reception-hall.jpg',
                  fallback: 'https://i.ibb.co/Z9LT1K2/image-34.jpg',
                  title: 'Campus Reception & Central Hall'
                })}
              >
                <div className="relative w-full aspect-[880/1189] overflow-hidden bg-slate-950">
                  <img decoding="async" src="/assets/campus/campus-reception-hall.jpg"
                    alt="Campus Reception & Central Hall"
                    loading="lazy"
                    className="w-full h-full object-cover object-center block group-hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://i.ibb.co/Z9LT1K2/image-34.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                </div>
              </div>

              {/* Corridor Card: Frame adjusted to natural ~9:16 vertical image size, Full Size Visible */}
              <div 
                className="bg-white dark:bg-[#0d1e38] rounded-xl border border-slate-200 dark:border-[#1e3256] overflow-hidden shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => setSelectedImage({
                  src: '/assets/campus/corridor-portrait-9-16.jpg',
                  fallback: 'https://i.ibb.co/0jL07ssr/image-33.jpg',
                  title: 'Sunlit Campus Corridors & Walkways'
                })}
              >
                <div className="relative w-full aspect-[848/1258] overflow-hidden bg-slate-950">
                  <img decoding="async" src="/assets/campus/corridor-portrait-9-16.jpg"
                    alt="Campus Corridors and Walkways"
                    loading="lazy"
                    className="w-full h-full object-cover object-center block group-hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://i.ibb.co/0jL07ssr/image-33.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CENTRAL LIBRARY (CSS Selector 8) */}
        {(activeTab === 'all' || activeTab === 'library') && (
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-200 dark:border-white/10">
              <BookOpen size={16} className="text-slate-600 dark:text-amber-400" />
              <h3 className="text-base sm:text-lg font-serif font-semibold text-slate-900 dark:text-white">
                Central Library
              </h3>
            </div>

            {/* Official University Institutional Profile — Central Library */}
            <div className="bg-[#FAF8F5] dark:bg-[#0d1e38] border border-slate-200/90 dark:border-[#1e3256] rounded-2xl p-6 sm:p-7 mb-6 shadow-xs transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3.5 h-[2px] bg-[#a30f16] dark:bg-amber-400" aria-hidden="true" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#a30f16] dark:text-amber-400">
                  Academic Sanctuary & Scholarly Repository
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                The Central Library of the University of Central Punjab Bahawalpur Campus serves as the intellectual cornerstone and scholarly sanctuary for our students, faculty, and visiting researchers. Purpose-built to support rigorous undergraduate and postgraduate scholarship across computing, business analytics, applied biological sciences, and the humanities, the library houses an extensive physical collection exceeding thousands of catalogued curriculum textbooks, authoritative reference encyclopedias, scholarly monographs, and national research periodicals.
              </p>

              {isLibraryExpanded && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans pt-3 mt-3 border-t border-slate-200/70 dark:border-white/10">
                  Integrated directly into the Higher Education Commission (HEC) National Digital Library program, scholars enjoy instantaneous high-speed digital connectivity to more than 75,000 peer-reviewed international scientific journals, IEEE Xplore, ScienceDirect, and world-class citation indices. Designed with expansive quiet reading halls, private study carrels, high-speed digital cataloging terminals, and personalized reference guidance from professional academic librarians, the library cultivates an environment of deep concentration, scholarly dialogue, and intellectual breakthrough.
                </p>
              )}

              <button
                onClick={() => setIsLibraryExpanded(!isLibraryExpanded)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] dark:text-cyan-400 hover:text-[#1d4ed8] dark:hover:text-cyan-300 cursor-pointer"
              >
                <span>{isLibraryExpanded ? 'Show less' : 'Learn more'}</span>
                <span className={`transform transition-transform duration-200 ${isLibraryExpanded ? 'rotate-90' : ''}`}>→</span>
              </button>
            </div>

            {/* Main Library Reading Area Card (Full Size, Uncropped) */}
            <div className="bg-white dark:bg-[#0d1e38] rounded-xl border border-slate-200 dark:border-[#1e3256] overflow-hidden mb-6 shadow-xs group transition-colors">
              <div 
                className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900 cursor-pointer"
                onClick={() => setSelectedImage({
                  src: '/assets/facilities/library-main-large-new.jpg',
                  fallback: 'https://i.ibb.co/q3RfST0D/Whats-App-Image-2026-10-12-at-4-10-57-AM.jpg',
                  title: 'Central Library Main Reading Hall',
                  caption: 'Spacious quiet reading hall equipped with dedicated study tables and reference materials.'
                })}
              >
                <img decoding="async" src="/assets/facilities/library-main-large-new.jpg"
                  alt="Central Library Main Reading Hall"
                  loading="lazy"
                  className="w-full h-full object-cover object-center block transition-transform duration-500 ease-out group-hover:scale-102"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://i.ibb.co/q3RfST0D/Whats-App-Image-2026-10-12-at-4-10-57-AM.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5">
                  <span className="text-white text-xs font-mono flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs">
                    <Maximize2 size={12} /> View Full
                  </span>
                  <span className="text-white/80 text-[11px] font-mono">
                    MAIN READING HALL
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-white/10">
                <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                  Main Reading Hall
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed font-sans">
                  Spacious quiet reading hall equipped with dedicated study tables and reference materials.
                </p>
              </div>
            </div>

            {/* 2 Grid Cards: Study Desks & Book Stacks (Full Size Vertical 9:16 Frames) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="bg-white dark:bg-[#0d1e38] rounded-xl border border-slate-200 dark:border-[#1e3256] overflow-hidden shadow-xs group transition-colors">
                <div 
                  className="relative w-full aspect-[9/16] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setSelectedImage({
                    src: '/assets/facilities/library-reading-2.jpg',
                    fallback: 'https://i.ibb.co/369CDwy/Whats-App-Image-2026-10-09-at-3-42-32-AM.jpg',
                    title: 'Individual Study Areas',
                    caption: 'Quiet seating arrangements for individual reading, exam revision, and research work.'
                  })}
                >
                  <img decoding="async" src="/assets/facilities/library-reading-2.jpg"
                    alt="Quiet Study Desks"
                    loading="lazy"
                    className="w-full h-full object-cover object-center block transition-transform duration-500 ease-out group-hover:scale-102"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://i.ibb.co/369CDwy/Whats-App-Image-2026-10-09-at-3-42-32-AM.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                    <span className="text-white text-xs font-mono flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs">
                      <Maximize2 size={12} /> View Full
                    </span>
                    <span className="text-white/80 text-[10px] font-mono">
                      QUIET STUDY
                    </span>
                  </div>
                </div>
                <div className="p-4 border-t border-slate-100 dark:border-white/10">
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    Individual Study Areas
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed font-sans">
                    Quiet seating arrangements for individual reading, exam revision, and research work.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#0d1e38] rounded-xl border border-slate-200 dark:border-[#1e3256] overflow-hidden shadow-xs group transition-colors">
                <div 
                  className="relative w-full aspect-[9/16] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setSelectedImage({
                    src: '/assets/facilities/library-stacks-new-2.jpg',
                    fallback: 'https://i.ibb.co/G3P4PsnZ/Whats-App-Image-2026-10-12-at-5-10-51-AM.jpg',
                    title: 'Book Stacks & Collections',
                    caption: 'Organized shelves with curriculum textbooks, reference guides, and journals.'
                  })}
                >
                  <img decoding="async" src="/assets/facilities/library-stacks-new-2.jpg"
                    alt="Central Library Reference Section and Book Collections"
                    loading="lazy"
                    className="w-full h-full object-cover object-center block transition-transform duration-500 ease-out group-hover:scale-102"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://i.ibb.co/G3P4PsnZ/Whats-App-Image-2026-10-12-at-5-10-51-AM.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                    <span className="text-white text-xs font-mono flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs">
                      <Maximize2 size={12} /> View Full
                    </span>
                    <span className="text-white/80 text-[10px] font-mono">
                      BOOK STACKS
                    </span>
                  </div>
                </div>
                <div className="p-4 border-t border-slate-100 dark:border-white/10">
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    Book Stacks & Collections
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed font-sans">
                    Organized shelves with curriculum textbooks, reference guides, and journals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. COMPUTER LABS (CSS Selector 9) */}
        {(activeTab === 'all' || activeTab === 'computer') && (
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-200 dark:border-white/10">
              <Cpu size={16} className="text-slate-600 dark:text-amber-400" />
              <h3 className="text-base sm:text-lg font-serif font-semibold text-slate-900 dark:text-white">
                Computer Laboratories
              </h3>
            </div>

            {/* Official University Institutional Profile — Computer Laboratories */}
            <div className="bg-[#FAF8F5] dark:bg-[#0d1e38] border border-slate-200/90 dark:border-[#1e3256] rounded-2xl p-6 sm:p-7 mb-6 shadow-xs transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3.5 h-[2px] bg-[#a30f16] dark:bg-amber-400" aria-hidden="true" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#a30f16] dark:text-amber-400">
                  High-Performance Computing & Artificial Intelligence Infrastructure
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                The Computing and Artificial Intelligence Laboratories at the University of Central Punjab Bahawalpur Campus represent a high-performance technological epicenter designed to empower the next generation of software engineers, data scientists, and systems architects. Engineered to support intensive computational workloads across computer science, artificial intelligence, software engineering, and business analytics, our computing suites provide dedicated multi-terminal workstation environments.
              </p>

              {isComputerExpanded && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans pt-3 mt-3 border-t border-slate-200/70 dark:border-white/10">
                  Equipped with enterprise-grade multi-core desktop workstations, dedicated graphic processing units (GPUs), high-speed gigabit optical fiber local networking, and uninterruptible power architectures, students engage directly in full-stack software development, neural network training, algorithm optimization, cloud infrastructure deployment, and cybersecurity vulnerability analysis. Standardized with industry-grade development platforms, Linux and Windows multi-boot environments, licensed database engines, and modern compiler toolchains, our computer laboratories provide the foundational infrastructure for competitive coding, senior capstone engineering projects, and high-impact computational research under experienced faculty guidance.
                </p>
              )}

              <button
                onClick={() => setIsComputerExpanded(!isComputerExpanded)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] dark:text-cyan-400 hover:text-[#1d4ed8] dark:hover:text-cyan-300 cursor-pointer"
              >
                <span>{isComputerExpanded ? 'Show less' : 'Learn more'}</span>
                <span className={`transform transition-transform duration-200 ${isComputerExpanded ? 'rotate-90' : ''}`}>→</span>
              </button>
            </div>

            {/* 2 Grid Cards: Computer Lab 1 (Landscape) & Computer Lab 2 (Vertical 9:16 Frame) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="bg-white dark:bg-[#0d1e38] rounded-xl border border-slate-200 dark:border-[#1e3256] overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900">
                  <img decoding="async" src="/assets/facilities/comp-lab-1.jpg"
                    alt="Computer Laboratory Workstations"
                    loading="lazy"
                    className="w-full h-full object-cover object-center block"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://i.ibb.co/XZypYYCk/Whats-App-Image-2026-10-09-at-6-42-28-AM.jpg';
                    }}
                  />
                </div>
                <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#a30f16] dark:text-amber-400">
                      Software Engineering Lab
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-[#14284c] px-2 py-0.5 rounded-full border border-slate-200 dark:border-[#1e3256]">
                      Workstation Lab 1
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    Software Development & Algorithmic Computing Suite
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    High-density workstation laboratory dedicated to object-oriented programming, data structures, enterprise application development, and database architecture with gigabit campus networking.
                  </p>

                  {/* Additional Lab Photo: Student Workstation Suite */}
                  <div className="pt-3.5 mt-3.5 border-t border-slate-100 dark:border-white/10">
                    <div 
                      className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 border border-slate-200 dark:border-[#1e3256] shadow-2xs group cursor-pointer"
                      onClick={() => setSelectedImage({
                        src: '/assets/facilities/comp-lab-3.jpg',
                        fallback: 'https://i.ibb.co/PZ48d5XF/Whats-App-Image-2026-10-17-at-3-35-03-AM.jpg',
                        title: 'Computer Laboratory & Student Workstation Suite',
                        caption: 'High-density computational workstations equipped for advanced programming, software development, and machine learning.'
                      })}
                    >
                      <img decoding="async" src="/assets/facilities/comp-lab-3.jpg"
                        alt="High-Performance Computing Lab Workstations"
                        loading="lazy"
                        className="w-full h-full object-cover object-center block group-hover:scale-102 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://i.ibb.co/PZ48d5XF/Whats-App-Image-2026-10-17-at-3-35-03-AM.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span>COMPUTING SUITE</span>
                      <span className="text-[#a30f16] dark:text-amber-400 font-medium">STUDENT WORKSTATIONS</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#0d1e38] rounded-xl border border-slate-200 dark:border-[#1e3256] overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-[9/16] overflow-hidden bg-slate-900">
                  <img decoding="async" src="/assets/facilities/comp-lab-2.jpg"
                    alt="IT and Computing Lab"
                    loading="lazy"
                    className="w-full h-full object-cover object-center block"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://i.ibb.co/JwR6L6CZ/Whats-App-Image-2026-10-09-at-6-51-57-AM.jpg';
                    }}
                  />
                </div>
                <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#a30f16] dark:text-amber-400">
                      AI & Data Science Suite
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-[#14284c] px-2 py-0.5 rounded-full border border-slate-200 dark:border-[#1e3256]">
                      Workstation Lab 2
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    Artificial Intelligence, Cloud & Cyber Defense Lab
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    Specialized computational laboratory configured for machine learning pipelines, deep neural network training, cybersecurity simulations, and scalable cloud-connected software environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. SCIENCE LABS */}
        {(activeTab === 'all' || activeTab === 'science') && (
          <div className="mb-10 sm:mb-12">
            <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-200 dark:border-white/10">
              <Microscope size={16} className="text-slate-600 dark:text-amber-400" />
              <h3 className="text-base sm:text-lg font-serif font-semibold text-slate-900 dark:text-white">
                Science Laboratories
              </h3>
            </div>

            {/* Official University Institutional Profile — Science Laboratories */}
            <div className="bg-[#FAF8F5] dark:bg-[#0d1e38] border border-slate-200/90 dark:border-[#1e3256] rounded-2xl p-6 sm:p-7 mb-6 shadow-xs transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3.5 h-[2px] bg-[#a30f16] dark:bg-amber-400" aria-hidden="true" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#a30f16] dark:text-amber-400">
                  Empirical Inquiry & Applied Scientific Discovery
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                The Science Laboratories at the University of Central Punjab Bahawalpur Campus provide an advanced empirical learning ecosystem where foundational scientific principles translate seamlessly into hands-on research and discovery. Constructed in strict adherence to Higher Education Commission (HEC) biosafety and laboratory standards, our multi-disciplinary facilities house dedicated experimental wings for Biotechnology, Chemistry, Biochemistry, Zoology, and Applied Physics.
              </p>

              {isScienceExpanded && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans pt-3 mt-3 border-t border-slate-200/70 dark:border-white/10">
                  Outfitted with calibrated precision analytical balances, spectrophotometers, high-resolution binocular optical microscopes, fume-extraction systems, and sterile culture zones, undergraduate scholars engage directly in qualitative chemical assays, biochemical investigations, and molecular syntheses. Supervised by accomplished doctoral faculty and qualified laboratory technologists, our science suites cultivate empirical accuracy, investigative methodology, and laboratory safety protocols essential for future researchers, biotechnologists, and healthcare leaders.
                </p>
              )}

              <button
                onClick={() => setIsScienceExpanded(!isScienceExpanded)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] dark:text-cyan-400 hover:text-[#1d4ed8] dark:hover:text-cyan-300 cursor-pointer"
              >
                <span>{isScienceExpanded ? 'Show less' : 'Learn more'}</span>
                <span className={`transform transition-transform duration-200 ${isScienceExpanded ? 'rotate-90' : ''}`}>→</span>
              </button>
            </div>

            {/* 2 Grid Cards: Science Lab 1 (Ratio 1408:1279) & Science Lab 2 (Ratio 1600:892) in Full Size Proper Ratio */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="bg-white dark:bg-[#0d1e38] rounded-xl border border-slate-200 dark:border-[#1e3256] overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-[1408/1279] overflow-hidden bg-slate-950">
                  <img decoding="async" src="/assets/facilities/science_lab_1.jpg"
                    alt="Advanced Experimental Chemistry and Physical Science Laboratory"
                    loading="lazy"
                    className="w-full h-full object-cover object-center block"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://i.ibb.co/Mksk66Y7/image-9.jpg';
                    }}
                  />
                </div>
                <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#a30f16] dark:text-amber-400">
                      Experimental Chemistry & Physics
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-[#14284c] px-2 py-0.5 rounded-full border border-slate-200 dark:border-[#1e3256]">
                      Authentic Lab View
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    Chemical Synthesis & Instrumental Analysis Laboratory
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    Equipped with dedicated workstation benches, analytical balances, specialized titration apparatus, and fume extraction systems. Designed to facilitate precision chemical syntheses, qualitative testing, and experimental physics coursework under rigorous HEC safety compliance.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#0d1e38] rounded-xl border border-slate-200 dark:border-[#1e3256] overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-[1600/892] overflow-hidden bg-slate-950">
                  <img decoding="async" src="/assets/facilities/science_lab_2.jpg"
                    alt="Life Sciences, Biotechnology and Molecular Biology Research Laboratory"
                    loading="lazy"
                    className="w-full h-full object-cover object-center block"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://i.ibb.co/jPMt5k22/image-10.jpg';
                    }}
                  />
                </div>
                <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#a30f16] dark:text-amber-400">
                      Life Sciences & Biotechnology
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-[#14284c] px-2 py-0.5 rounded-full border border-slate-200 dark:border-[#1e3256]">
                      Authentic Lab View
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    Biotechnology, Cell Genetics & Diagnostic Microscopy Suite
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    Outfitted with high-resolution binocular optical microscopes, digital centrifuges, thermocyclers, and sterile incubation zones. Empowers undergraduate scholars in molecular biology, biotechnology assays, and microbiology specimen cultures through guided hands-on investigation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Minimal Bottom Action Strip */}
        <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <span>Explore campus facilities or apply online for admissions.</span>
          <div className="flex items-center gap-3">
            {onOpenCampusLifePage && (
              <button
                onClick={onOpenCampusLifePage}
                className="px-3.5 py-1.5 bg-white dark:bg-[#0d1e38] hover:bg-slate-50 dark:hover:bg-[#14284c] text-slate-700 dark:text-slate-200 font-medium rounded border border-slate-200 dark:border-[#1e3256] transition-colors cursor-pointer"
              >
                Campus Life
              </button>
            )}
            {onOpenApply && (
              <button
                onClick={onOpenApply}
                className="px-3.5 py-1.5 bg-[#a30f16] hover:bg-[#850c12] text-white font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Apply Now</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Full Image Inspection */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white dark:bg-[#0d1e38] text-slate-900 dark:text-white rounded-xl overflow-hidden shadow-2xl border border-white/20 dark:border-[#1e3256]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#12284c]">
              <span className="text-xs font-mono font-bold text-[#a30f16] dark:text-amber-400 uppercase tracking-wider">
                {selectedImage.title}
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-[#183460] transition-colors text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white cursor-pointer"
                aria-label="Close photo preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative bg-slate-950 max-h-[70vh] flex items-center justify-center overflow-hidden">
              <img loading="lazy" decoding="async" src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
                onError={(e) => {
                  if (selectedImage.fallback) {
                    (e.target as HTMLImageElement).src = selectedImage.fallback;
                  }
                }}
              />
            </div>

            {selectedImage.caption && (
              <div className="p-4 bg-white dark:bg-[#0d1e38] border-t border-slate-100 dark:border-white/10">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  {selectedImage.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default FacilitiesSection;

