import React, { useState } from 'react';

interface UcpLogoProps {
  variant?: 'header' | 'footer' | 'compact';
  className?: string;
  onClick?: () => void;
}

export const UcpLogo: React.FC<UcpLogoProps> = ({ variant = 'header', className = '', onClick }) => {
  const isFooter = variant === 'footer';
  const isCompact = variant === 'compact';
  const [hasError, setHasError] = useState(false);

  // Official uploaded UCP logo permanent static asset path
  const officialLogoPath = '/assets/ucp-official-logo.png';
  const fallbackUrl = 'https://i.ibb.co/BVZkCkFf/e4f3a018-e327-765a-db91-e468a8c6672d-4596-F431-6479-4-D27-A36-B-9750-DA25-F303.jpg';

  return (
    <div 
      className={`flex items-center gap-3 sm:gap-3.5 md:gap-4 select-none cursor-pointer group shrink-0 ${className}`}
      onClick={onClick}
      title="University of Central Punjab Bahawalpur Campus"
    >
      {/* Official UCP Logo Asset - Authentic Uploaded Brand Image */}
      <div className="relative shrink-0 flex items-center justify-center">
        {!hasError ? (
          <img
            src={officialLogoPath}
            alt="University of Central Punjab (UCP) Official Logo"
            className={`transition-transform duration-300 group-hover:scale-[1.01] ${
              isFooter 
                ? 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24' 
                : isCompact
                ? 'w-10 h-10'
                : 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-[84px] xl:h-[84px]'
            }`}
            style={{ 
              objectFit: 'contain',
              aspectRatio: '1 / 1',
            }}
            onError={(e) => {
              const imgElement = e.target as HTMLImageElement;
              if (imgElement.src !== fallbackUrl && !imgElement.dataset.fallbackTried) {
                imgElement.dataset.fallbackTried = 'true';
                imgElement.src = fallbackUrl;
              } else {
                setHasError(true);
              }
            }}
          />
        ) : (
          /* Simple text fallback as instructed: "UCP" */
          <span className="text-xl sm:text-2xl font-bold tracking-wider text-white">
            UCP
          </span>
        )}
      </div>

      {/* Typography: Official, Balanced Academic Wordmark */}
      {!isCompact && (
        <div className="flex flex-col justify-center select-none">
          <span 
            className={`text-white font-bold leading-tight tracking-[0.06em] sm:tracking-[0.08em] lg:tracking-[0.09em] uppercase transition-colors duration-200 group-hover:text-amber-200 ${
              isFooter
                ? 'text-lg sm:text-xl lg:text-2xl'
                : 'text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18.5px]'
            }`}
            style={{
              fontFamily: "'Cinzel', 'Playfair Display', Georgia, 'Times New Roman', serif",
              letterSpacing: '0.07em',
              fontWeight: 700,
            }}
          >
            University of Central Punjab
          </span>

          <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
            <span className="h-[1px] w-3 sm:w-5 bg-gradient-to-r from-transparent to-amber-400/80" />
            <span 
              className={`text-amber-400 font-semibold tracking-[0.24em] sm:tracking-[0.28em] uppercase transition-colors duration-200 group-hover:text-amber-300 ${
                isFooter 
                  ? 'text-xs sm:text-sm' 
                  : 'text-[9px] sm:text-[10px] lg:text-[10.5px] xl:text-[11px]'
              }`}
              style={{
                fontFamily: "'Cinzel', 'Poppins', -apple-system, sans-serif",
                letterSpacing: '0.26em',
                fontWeight: 600,
              }}
            >
              Bahawalpur Campus
            </span>
            <span className="h-[1px] w-3 sm:w-5 bg-gradient-to-l from-transparent to-amber-400/80" />
          </div>
        </div>
      )}
    </div>
  );
};
