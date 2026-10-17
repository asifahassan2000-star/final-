import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  BookOpen, 
  Award, 
  Globe2, 
  Video, 
  CheckCircle, 
  HelpCircle, 
  ChevronRight, 
  Layers, 
  MapPin, 
  FileText,
  Calendar,
  Building,
  Mail,
  GraduationCap
} from 'lucide-react';

interface CnnAcademyPageProps {
  onBackToHome: () => void;
  onOpenPortal?: () => void;
  onOpenProgrammesPage?: () => void;
}

export const CnnAcademyPage: React.FC<CnnAcademyPageProps> = ({
  onBackToHome,
  onOpenPortal,
  onOpenProgrammesPage,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bahawalpur' | 'curriculum' | 'guidance' | 'faq'>('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How can students enrolled at UCP Bahawalpur access CNN Academy modules?',
      a: 'Through UCP’s centralized academic network, all registered undergraduate and postgraduate students at the Bahawalpur campus have equal access to CNN Academy’s digital learning modules, webinars, and masterclasses streamed from CNN international bureaus. Selected student fellows are also sponsored for cross-campus physical production bootcamps at the main campus broadcast studios.',
    },
    {
      q: 'Is CNN Academy participation restricted only to Media and Journalism students?',
      a: 'No. While managed under the Faculty of Media and Mass Communication (FMMC), CNN Academy programs are interdisciplinary. Students studying Computer Science (AI in media & automated fact-checking), Business Administration (corporate communications & PR), and English/Humanities (narrative writing & investigative research) are actively encouraged to apply.',
    },
    {
      q: 'Do students receive an official certificate from CNN Academy?',
      a: 'Yes. Students who successfully complete the coursework, practical simulation assignments, and capstone reporting project receive an official Certificate of Completion co-issued by CNN Academy and the University of Central Punjab, recognized internationally across newsrooms and corporate media houses.',
    },
    {
      q: 'Are there any extra tuition fees charged to UCP Bahawalpur students for this fellowship?',
      a: 'Enrolled UCP students who are shortlisted through the merit and editorial screening process participate under university-subsidized fellowships, with no additional tuition fees for the standard online coursework and simulated newsroom curriculum.',
    },
    {
      q: 'What is the duration of the fellowship and when do cohorts begin?',
      a: 'Each training cohort spans 8 to 12 weeks during the regular academic semester (Fall and Spring intakes). A schedule of weekly virtual masterclasses, interactive simulation labs, and self-paced practical assignments is published at the beginning of each cycle.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1E293B] font-sans">
      
      {/* 1. Official Top Institutional Breadcrumb Strip (Classic WordPress / Academic Header) */}
      <div className="bg-[#FFFFFF] border-b border-[#E2E8F0] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-mono">
            <button 
              onClick={onBackToHome}
              className="hover:text-[#0A1931] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portal Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">About UCP</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#0A1931] font-semibold">CNN Academy Strategic Partnership</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="hidden sm:inline">Official University Document</span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="font-mono text-[11px] text-[#A51C30] font-semibold bg-[#A51C30]/5 px-2 py-0.5 border border-[#A51C30]/20">
              ACADEMIC COLLABORATION
            </span>
          </div>
        </div>
      </div>

      {/* 2. Official Editorial Page Header (Minimal, Dignified, Rectangular Style) */}
      <header className="bg-[#FFFFFF] border-b border-[#E2E8F0] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E2E8F0] pb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#A51C30] border-l-2 border-[#A51C30] pl-2">
                  Faculty of Media & Mass Communication (FMMC)
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-mono">Verified Institutional Partnership</span>
              </div>
              
              <h1 
                className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0A1931] tracking-tight leading-snug"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                CNN Academy at University of Central Punjab
              </h1>
              
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-light">
                Official institutional collaboration with CNN International, establishing Pakistan’s first university-based CNN Academy simulation training center and comprehensive academic pathway for students across all campuses.
              </p>
            </div>

            {/* Official Institutional Badge Card */}
            <div className="border border-[#CBD5E1] bg-[#F8FAFC] p-4 text-left sm:w-72 flex-shrink-0">
              <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                Partner Entity
              </div>
              <div className="font-serif font-bold text-base text-[#0A1931]">
                CNN Academy (Warner Bros. Discovery)
              </div>
              <div className="text-xs text-slate-600 mt-1">
                International Training Center: Abu Dhabi & Atlanta
              </div>
              <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Campus Eligibility:</span>
                <span className="font-bold text-[#0A1931]">Lahore & Bahawalpur</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Rectangular Tabs */}
          <div className="flex items-center gap-1 pt-6 overflow-x-auto text-xs font-semibold">
            {[
              { id: 'overview', label: '1. Official Overview' },
              { id: 'bahawalpur', label: '2. Bahawalpur Campus Benefits' },
              { id: 'curriculum', label: '3. Curriculum & Modules' },
              { id: 'guidance', label: '4. Student Guidance & Intake' },
              { id: 'faq', label: '5. Frequently Asked Questions' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  px-4 py-2.5 whitespace-nowrap border-b-2 font-mono transition-colors cursor-pointer text-left
                  ${activeTab === tab.id
                    ? 'border-[#0A1931] text-[#0A1931] bg-slate-100/60'
                    : 'border-transparent text-slate-500 hover:text-[#0A1931] hover:border-slate-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 3. Main Content Container (Classic WordPress Academic Layout) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* ====================================================================
            TAB 1: OFFICIAL OVERVIEW
            ==================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            {/* Lead Narrative Block */}
            <div className="border border-[#E2E8F0] bg-[#FFFFFF] p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1931] mb-4">
                The First University in Pakistan to Partner with CNN Academy
              </h2>
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-normal">
                <p>
                  The University of Central Punjab (UCP) established a historic, formal collaboration with <strong>CNN Academy</strong>, the global educational and talent development arm of CNN International. This partnership bridges international newsroom excellence directly into the academic framework of higher education in Pakistan.
                </p>
                <p>
                  Through this alliance, UCP students study under a dynamic syllabus vetted by CNN’s senior correspondents, producers, and digital strategists. The program combines simulated live-breaking newsroom exercises, open-source intelligence (OSINT), ethical reporting protocols, and multiplatform broadcast journalism.
                </p>
                <p>
                  While hosted operationally by the <strong>Faculty of Media and Mass Communication (FMMC)</strong>, the university extends this learning ecosystem across the entire collegiate network—ensuring students in <strong>Bahawalpur</strong> receive direct access to global masterclasses, faculty training, and credentialing.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 border border-slate-200 bg-slate-50">
                  <div className="font-mono text-xl font-bold text-[#0A1931]">100% Verified</div>
                  <div className="text-xs text-slate-500 mt-1">Official CNN Curriculum Framework</div>
                </div>
                <div className="p-3 border border-slate-200 bg-slate-50">
                  <div className="font-mono text-xl font-bold text-[#0A1931]">Global Bureau Access</div>
                  <div className="text-xs text-slate-500 mt-1">Direct Masterclasses from Atlanta & Abu Dhabi</div>
                </div>
                <div className="p-3 border border-slate-200 bg-slate-50">
                  <div className="font-mono text-xl font-bold text-[#0A1931]">Dual Certification</div>
                  <div className="text-xs text-slate-500 mt-1">Recognized Worldwide by Media Employers</div>
                </div>
              </div>
            </div>

            {/* Core Pillars Grid */}
            <div>
              <h3 className="text-lg font-serif font-bold text-[#0A1931] mb-4">
                Institutional Framework & Pillars
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border border-slate-200 bg-white p-5 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 bg-slate-100 flex items-center justify-center text-[#0A1931] mb-3">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-[#0A1931] mb-2">Curriculum Integration</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      CNN’s proprietary newsroom instructional modules are integrated into university degree outlines, covering verification, ethics, and multi-format production.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 font-mono text-[11px] text-slate-400">
                    ACCREDITED SYLLABUS
                  </div>
                </div>

                <div className="border border-slate-200 bg-white p-5 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 bg-slate-100 flex items-center justify-center text-[#0A1931] mb-3">
                      <Video className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-[#0A1931] mb-2">Live Newsroom Simulations</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Students engage in real-time, time-pressured reporting simulations that replicate international newsdesk deadlines, breaking news verification, and live crosses.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 font-mono text-[11px] text-slate-400">
                    SIMULATION LABS
                  </div>
                </div>

                <div className="border border-slate-200 bg-white p-5 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 bg-slate-100 flex items-center justify-center text-[#0A1931] mb-3">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-[#0A1931] mb-2">Correspondent Masterclasses</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Exclusive live interactive sessions delivered by senior CNN journalists, technical directors, photojournalists, and digital editors worldwide.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 font-mono text-[11px] text-slate-400">
                    GLOBAL LECTURERS
                  </div>
                </div>

                <div className="border border-slate-200 bg-white p-5 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 bg-slate-100 flex items-center justify-center text-[#0A1931] mb-3">
                      <Award className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-[#0A1931] mb-2">Faculty Training Programs</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      UCP educators participate in specialized Training of Trainers (ToT) workshops to continuously update pedagogical techniques to modern standards.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 font-mono text-[11px] text-slate-400">
                    FACULTY EXCELLENCE
                  </div>
                </div>
              </div>
            </div>

            {/* Official Quote Notice */}
            <div className="border-l-4 border-[#0A1931] bg-white p-6 border-y border-r border-slate-200">
              <blockquote className="text-sm font-serif italic text-slate-700 leading-relaxed">
                “This collaboration with CNN Academy is a decisive milestone for Pakistani academia. It affords our students unprecedented access to world-class storytelling methodologies and ensures our graduates stand shoulder-to-shoulder with international media practitioners.”
              </blockquote>
              <div className="mt-3 text-xs font-mono text-slate-500">
                — Office of the Pro-Rector, University of Central Punjab
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 2: BAHAWALPUR CAMPUS BENEFITS & ACCESS
            ==================================================================== */}
        {activeTab === 'bahawalpur' && (
          <div className="space-y-8">
            <div className="border border-[#E2E8F0] bg-white p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#A51C30] uppercase font-bold">
                <MapPin className="w-4 h-4" />
                <span>Regional Impact & Student Guidance</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1931] mb-4">
                How UCP Bahawalpur Students Benefit from CNN Academy
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Students often wonder whether partnerships established by the central university in Lahore are accessible in Bahawalpur. <strong>Yes, absolutely.</strong> As a fully integrated constituent campus of UCP, Bahawalpur students enjoy direct structural access to CNN Academy opportunities under the institutional framework below:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Benefit 1 */}
                <div className="border border-slate-200 p-5 bg-[#F8FAFC]">
                  <div className="font-mono text-xs text-[#0A1931] font-bold uppercase tracking-wider mb-2">
                    01. Hybrid Learning Network
                  </div>
                  <h3 className="font-bold text-sm text-[#0A1931] mb-2">
                    Direct Live Virtual Newsroom Access
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bahawalpur scholars participate in real-time CNN Academy webinars, specialized digital masterclasses, and interactive modules via the university’s dedicated learning portal without having to relocate.
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="border border-slate-200 p-5 bg-[#F8FAFC]">
                  <div className="font-mono text-xs text-[#0A1931] font-bold uppercase tracking-wider mb-2">
                    02. Cross-Campus Residencies
                  </div>
                  <h3 className="font-bold text-sm text-[#0A1931] mb-2">
                    Studio Bootcamps in Lahore
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Shortlisted Bahawalpur student fellows are sponsored to attend physical broadcast intensives at UCP Lahore’s 4K television studios, non-linear post-production suites, and live FM 92.6 radio station.
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className="border border-slate-200 p-5 bg-[#F8FAFC]">
                  <div className="font-mono text-xs text-[#0A1931] font-bold uppercase tracking-wider mb-2">
                    03. Global Portfolio Edge
                  </div>
                  <h3 className="font-bold text-sm text-[#0A1931] mb-2">
                    Distinguished Career Credentials
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Graduating with a verified CNN Academy Certificate significantly distinguishes Bahawalpur alumni when competing for positions in corporate communications, international PR agencies, multilateral bodies, and national networks.
                  </p>
                </div>

              </div>
            </div>

            {/* Interdisciplinary Applicability Matrix */}
            <div className="border border-[#E2E8F0] bg-white p-6 sm:p-8">
              <h3 className="text-base font-serif font-bold text-[#0A1931] mb-4">
                Interdisciplinary Benefits Across Bahawalpur Faculties
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200">
                  <thead className="bg-slate-50 border-b border-slate-200 font-mono text-slate-700">
                    <tr>
                      <th className="p-3 border-r border-slate-200">Department / Faculty</th>
                      <th className="p-3 border-r border-slate-200">Key Domain Addressed</th>
                      <th className="p-3">Career & Practical Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-sans text-slate-600">
                    <tr>
                      <td className="p-3 font-semibold text-[#0A1931] border-r border-slate-200">
                        Faculty of Information Technology (FOIT)
                      </td>
                      <td className="p-3 border-r border-slate-200">
                        AI in Journalism, Data Verification & OSINT
                      </td>
                      <td className="p-3">
                        Machine-learning algorithms for detecting deepfakes, automated fact-checking pipelines, and secure digital communications.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#0A1931] border-r border-slate-200">
                        Faculty of Management Studies (FMS)
                      </td>
                      <td className="p-3 border-r border-slate-200">
                        Corporate Communications & Crisis PR
                      </td>
                      <td className="p-3">
                        Strategic reputation management, media relations under crisis, and multi-channel storytelling for corporate brands.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#0A1931] border-r border-slate-200">
                        Faculty of Humanities & Social Sciences (FHSS)
                      </td>
                      <td className="p-3 border-r border-slate-200">
                        Investigative Narrative, English & Policy
                      </td>
                      <td className="p-3">
                        Deep-form feature writing, human-rights documentation, public interest reporting, and international affairs analysis.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#0A1931] border-r border-slate-200">
                        Faculty of Science & Technology (FOST)
                      </td>
                      <td className="p-3 border-r border-slate-200">
                        Scientific Communication & Climate Journalism
                      </td>
                      <td className="p-3">
                        Translating complex scientific, biological, and environmental research into accessible public and policy broadcasts.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 3: CURRICULUM & MODULES
            ==================================================================== */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <div className="border border-[#E2E8F0] bg-white p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1931] mb-2">
                CNN Academy Academic Curriculum Breakdown
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                The curriculum is designed in alignment with international broadcast journalism standards and modern digital newsroom expectations.
              </p>

              <div className="divide-y divide-slate-200 border border-slate-200">
                
                {/* Module 1 */}
                <div className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-4 bg-white">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="font-mono text-xs text-[#A51C30] font-bold">MODULE 01 • WEEKS 1–3</div>
                    <h3 className="font-bold text-sm sm:text-base text-[#0A1931]">
                      Core Newsroom Principles, Ethics & Editorial Independence
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Fundamental CNN editorial guidelines, legal frameworks, libel prevention, source protection, conflict-of-interest rules, and unbiased reporting standards.
                    </p>
                  </div>
                  <div className="text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 self-start">
                    Theory & Case Studies
                  </div>
                </div>

                {/* Module 2 */}
                <div className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-4 bg-white">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="font-mono text-xs text-[#A51C30] font-bold">MODULE 02 • WEEKS 4–6</div>
                    <h3 className="font-bold text-sm sm:text-base text-[#0A1931]">
                      Digital Verification, Open-Source Intelligence (OSINT) & AI Fact-Checking
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Advanced geolocation tools, reverse image forensic verification, metadata analysis, algorithmic fact-checking, and combating coordinated disinformation campaigns.
                    </p>
                  </div>
                  <div className="text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 self-start">
                    Lab-Based Practical
                  </div>
                </div>

                {/* Module 3 */}
                <div className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-4 bg-white">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="font-mono text-xs text-[#A51C30] font-bold">MODULE 03 • WEEKS 7–9</div>
                    <h3 className="font-bold text-sm sm:text-base text-[#0A1931]">
                      Mobile Journalism (MoJo) & Multiplatform Production
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Solo-operator field reporting techniques, professional smartphone videography, audio capture under difficult ambient conditions, fast mobile editing, and digital packaging.
                    </p>
                  </div>
                  <div className="text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 self-start">
                    Field Production
                  </div>
                </div>

                {/* Module 4 */}
                <div className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-4 bg-white">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="font-mono text-xs text-[#A51C30] font-bold">MODULE 04 • WEEKS 10–12</div>
                    <h3 className="font-bold text-sm sm:text-base text-[#0A1931]">
                      Breaking News Simulation & Final Capstone Project
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      High-intensity newsroom simulation where student teams respond to live scenario feeds, produce breaking updates, fact-check live claims, and submit an broadcast-grade documentary package.
                    </p>
                  </div>
                  <div className="text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 self-start">
                    Graduation Capstone
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 4: STUDENT GUIDANCE & APPLICATION INTAKE
            ==================================================================== */}
        {activeTab === 'guidance' && (
          <div className="space-y-8">
            <div className="border border-[#E2E8F0] bg-white p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1931] mb-2">
                Step-by-Step Guidance for Students (Application & Intake)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Follow this official procedural sequence to submit your application for the upcoming CNN Academy cohort fellowship.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                <div className="border border-slate-200 p-4 bg-slate-50">
                  <div className="font-mono text-xs font-bold text-[#A51C30] mb-1">STEP 01</div>
                  <h4 className="font-bold text-sm text-[#0A1931] mb-2">Eligibility Verification</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must be a currently enrolled undergraduate (BS) or graduate (ADP/MS) student at UCP Bahawalpur with minimum CGPA 2.50.
                  </p>
                </div>

                <div className="border border-slate-200 p-4 bg-slate-50">
                  <div className="font-mono text-xs font-bold text-[#A51C30] mb-1">STEP 02</div>
                  <h4 className="font-bold text-sm text-[#0A1931] mb-2">Statement of Intent</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Draft a 300-word statement explaining why you seek CNN Academy certification and how it complements your chosen degree.
                  </p>
                </div>

                <div className="border border-slate-200 p-4 bg-slate-50">
                  <div className="font-mono text-xs font-bold text-[#A51C30] mb-1">STEP 03</div>
                  <h4 className="font-bold text-sm text-[#0A1931] mb-2">Editorial Screening</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Applications undergo merit review by the FMMC Academic Directorate. Shortlisted students complete a short aptitude assessment.
                  </p>
                </div>

                <div className="border border-slate-200 p-4 bg-slate-50">
                  <div className="font-mono text-xs font-bold text-[#A51C30] mb-1">STEP 04</div>
                  <h4 className="font-bold text-sm text-[#0A1931] mb-2">Portal Enrollment</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Selected fellows are issued credentials for the CNN Academy LMS portal and assigned a faculty mentor for the cohort duration.
                  </p>
                </div>

              </div>

              {/* Action Box */}
              <div className="mt-8 p-6 border border-slate-300 bg-[#F8FAFC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-[#0A1931]">Ready to apply or submit an inquiry?</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Submit inquiries directly to the UCP Academic Affairs Desk or access the Student Information Portal.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onOpenPortal}
                    className="px-4 py-2 bg-[#0A1931] hover:bg-slate-800 text-white font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Open Student Portal
                  </button>
                  <a
                    href="https://ucp.edu.pk/faculty-of-media-and-mass-communication/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-slate-300 hover:border-slate-400 text-slate-700 font-mono text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>FMMC Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 5: FREQUENTLY ASKED QUESTIONS
            ==================================================================== */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="border border-[#E2E8F0] bg-white p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1931] mb-2">
                Frequently Asked Questions for Students
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Authentic responses compiled by the UCP Directorate of Academic Programs and Faculty of Media.
              </p>

              <div className="divide-y divide-slate-200 border border-slate-200">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={index} className="bg-white">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-bold text-xs sm:text-sm text-[#0A1931]">
                          {faq.q}
                        </span>
                        <ChevronRight 
                          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${
                            isOpen ? 'rotate-90 text-[#0A1931]' : ''
                          }`} 
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed font-sans bg-slate-50 border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 4. Official Institutional Coordination Footer Block */}
        <section className="mt-12 border border-[#E2E8F0] bg-white p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div>
              <div className="font-bold text-[#0A1931] uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#A51C30]" />
                <span>Central Coordination</span>
              </div>
              <p className="leading-relaxed">
                Faculty of Media and Mass Communication (FMMC), University of Central Punjab, 1 - Khayaban-e-Jinnah, Johar Town, Lahore.
              </p>
            </div>

            <div>
              <div className="font-bold text-[#0A1931] uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A51C30]" />
                <span>Bahawalpur Liaison Desk</span>
              </div>
              <p className="leading-relaxed">
                Academic Affairs Coordination Office, UCP Bahawalpur Campus, Main Airport Road / University Network Liaison.
              </p>
            </div>

            <div>
              <div className="font-bold text-[#0A1931] uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#A51C30]" />
                <span>Official Inquiries</span>
              </div>
              <p className="leading-relaxed">
                Email: info@ucp.edu.pk / admissions.bwp@ucp.edu.pk<br />
                Telephone: +92 (42) 111-000-827 / (062) UCP-BWP
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default CnnAcademyPage;
