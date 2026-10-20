import React, { useState } from 'react';

interface StatisticsSectionProps {
  onOpenScholarshipsPage?: () => void;
  onOpenProgrammesPage?: () => void;
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = () => {
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Authentic facts strictly about UCP Bahawalpur Campus (Undergraduate degrees only)
  const tickerItems = [
    { label: 'UCP Bahawalpur', text: 'Constituent Campus on Airport Road, Bahawalpur' },
    { label: 'Undergraduate Degrees', text: 'Exclusively Offering 4-Year BS & 2-Year Associate Degree (ADP/ADS) Programmes' },
    { label: 'Undergraduate Focus', text: 'Exclusively Dedicated to Undergraduate Education (No Graduate / Masters Degrees Offered)' },
    { label: 'Merit Scholarships', text: 'Up to 50% Tuition Fee Concessions Based on Intermediate Marks' },
    { label: 'PGC Concession', text: '25% Tuition Fee Concession for Punjab College Alumni' },
    { label: 'Computing & AI', text: 'Advanced Computer Science, Software Engineering & AI Development Labs' },
    { label: 'Natural Sciences', text: 'Specialized Biotechnology, Chemistry, Zoology & Physics Laboratories' },
    { label: 'ADP to BS Pathway', text: 'Direct Progression Route into 5th Semester of 4-Year BS Degrees' },
    { label: 'Campus Transport', text: 'Dedicated Air-Conditioned Shuttle Fleet across Bahawalpur City & Districts' },
    { label: 'Campus Location', text: 'Airport Road, Bahawalpur · Phone: 062-2202030 / 062-2202050 · Toll-Free: 0800-00827' },
  ];

  return (
    <section 
      id="vision-rankings-section" 
      aria-label="UCP Bahawalpur Campus Highlights"
      className="w-full bg-[#081d38] text-white border-t border-[#183a66] border-b border-[#051428] relative select-none overflow-hidden"
    >
      {/* Anchor alias for quick navigation */}
      <div id="stats-section" className="absolute -top-16" aria-hidden="true" />

      {/* Marquee Moving Line (Ticker Tape) */}
      <div 
        className="w-full h-[46px] sm:h-[48px] overflow-hidden flex items-center relative ticker-wrap"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label="UCP Bahawalpur verified ticker"
      >
        {/* Ticker Track 1 */}
        <div 
          className="flex items-center shrink-0 animate-ticker"
          style={{
            gap: '36px',
            paddingRight: '36px',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {tickerItems.map((item, idx) => (
            <span 
              key={`track1-${idx}`} 
              className="text-[12.5px] sm:text-[13px] font-medium text-slate-200 tracking-wide whitespace-nowrap font-['Inter',sans-serif] flex items-center gap-2"
            >
              <span className="font-bold text-[#E5A823] uppercase text-[10.5px] sm:text-[11px] tracking-wider px-2 py-0.5 bg-white/10 rounded-sm">
                {item.label}
              </span>
              <span className="text-white font-normal">{item.text}</span>
              <span className="text-[#C8102E] mx-1 font-bold">•</span>
            </span>
          ))}
        </div>

        {/* Ticker Track 2: Duplicate Clone for Continuous Seamless Loop */}
        <div 
          className="flex items-center shrink-0 animate-ticker"
          aria-hidden="true"
          style={{
            gap: '36px',
            paddingRight: '36px',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {tickerItems.map((item, idx) => (
            <span 
              key={`track2-${idx}`} 
              className="text-[12.5px] sm:text-[13px] font-medium text-slate-200 tracking-wide whitespace-nowrap font-['Inter',sans-serif] flex items-center gap-2"
            >
              <span className="font-bold text-[#E5A823] uppercase text-[10.5px] sm:text-[11px] tracking-wider px-2 py-0.5 bg-white/10 rounded-sm">
                {item.label}
              </span>
              <span className="text-white font-normal">{item.text}</span>
              <span className="text-[#C8102E] mx-1 font-bold">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
