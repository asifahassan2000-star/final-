import React, { useState } from 'react';

interface StatisticsSectionProps {
  onOpenScholarshipsPage?: () => void;
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({ onOpenScholarshipsPage }) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Official statistics & alumni achievements content present in this section
  const tickerItems = [
    { value: '29,000+', label: 'Alumni Network across Leading Professional & Corporate Sectors' },
    { value: '37%+', label: 'Students on Financial Aid & Merit Concessions' },
    { value: '1.3B+', label: 'PKR Scholarships Disbursed' },
    { value: '#362', label: 'QS Asia University Ranking' },
    { value: '#206', label: 'UI GreenMetric World Ranking' },
    { value: '91.3', label: 'HEC Quality Enhancement Cell (QEC) Score' },
    { value: '130+', label: 'PhD Faculty & Academic Mentors' },
    { value: '100%', label: 'Apex Institutional & Program Accreditations' },
    { value: '33+', label: 'Undergraduate BS Degree Programs' },
    { value: '34+', label: 'Postgraduate MS Degree Programs' },
    { value: '19', label: 'Doctoral PhD Research Disciplines' },
    { value: '1,620', label: 'ADP Programs & Disciplines' },
    { value: '165', label: 'Merit Scholarships Awarded Annually' },
    { value: '45+', label: 'Active Student Forums & Activities' },
    { value: '42%', label: 'Women Academic Leadership Representation' },
    { value: '25', label: 'BWP Campus Specialized Degrees' },
  ];

  return (
    <section 
      id="stats-section" 
      className="py-8 sm:py-10 bg-[#FAF8F5] dark:bg-[#080f1d] text-[#0A1931] dark:text-[#f8fafc] border-b border-transparent dark:border-white/10 relative transition-colors duration-200"
      aria-label="Institutional Key Facts and Statistics"
    >
      <div className="w-full">

        {/* Marquee Ticker Tape Container:
            Full width 100%, Height 42px only (small, not poster), Background #F2F3F5 light gray, Border top/bottom 1px #E5E7EB
            Animation: Infinite Seamless Horizontal Marquee - Ticker Tape (35s linear infinite)
            Pause on hover, auto-resume on mouse leave */}
        <div 
          className="w-full h-[42px] bg-[#F2F3F5] dark:bg-[#0c182c] border-y border-[#E5E7EB] dark:border-[#1e3256] overflow-hidden flex items-center relative select-none ticker-wrap"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Institutional achievements ticker tape"
        >
          {/* Ticker Track 1 */}
          <div 
            className="flex items-center shrink-0 animate-ticker"
            style={{
              gap: '40px',
              paddingRight: '40px',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {tickerItems.map((item, idx) => (
              <span 
                key={`track1-${idx}`} 
                className="text-[13px] font-medium text-[#4B5563] dark:text-slate-300 tracking-[0.2px] whitespace-nowrap font-['Inter',sans-serif] flex items-center gap-1.5"
              >
                <span className="font-semibold text-[#1F2937] dark:text-amber-400">{item.value}</span>
                <span className="text-[#4B5563] dark:text-slate-300">{item.label}</span>
              </span>
            ))}
          </div>

          {/* Ticker Track 2: Seamless Duplicate Clone (2x for continuous seamless loop with no break) */}
          <div 
            className="flex items-center shrink-0 animate-ticker"
            aria-hidden="true"
            style={{
              gap: '40px',
              paddingRight: '40px',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {tickerItems.map((item, idx) => (
              <span 
                key={`track2-${idx}`} 
                className="text-[13px] font-medium text-[#4B5563] dark:text-slate-300 tracking-[0.2px] whitespace-nowrap font-['Inter',sans-serif] flex items-center gap-1.5"
              >
                <span className="font-semibold text-[#1F2937] dark:text-amber-400">{item.value}</span>
                <span className="text-[#4B5563] dark:text-slate-300">{item.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
