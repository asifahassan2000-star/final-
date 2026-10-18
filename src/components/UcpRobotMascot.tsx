import React from 'react';

export interface UcpRobotMascotProps {
  size?: number | string;
  className?: string;
  isWaving?: boolean;
  isBlinking?: boolean;
  isThinking?: boolean;
  isHappy?: boolean;
  showTorso?: boolean;
}

export const UcpRobotMascot: React.FC<UcpRobotMascotProps> = ({
  size = 72,
  className = '',
  isWaving = false,
  isBlinking = false,
  isThinking = false,
  isHappy = false,
  showTorso = true,
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 110 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-md"
      >
        <defs>
          {/* Subtle metallic linear gradient for robot head chassis */}
          <linearGradient id="ucpRobotChassis" x1="20" y1="20" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.6" stopColor="#F8FAFC" />
            <stop offset="1" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Deep obsidian visor gradient */}
          <linearGradient id="ucpRobotVisor" x1="30" y1="32" x2="80" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0B1A30" />
            <stop offset="0.5" stopColor="#071326" />
            <stop offset="1" stopColor="#030A14" />
          </linearGradient>

          {/* Antenna ruby beacon glow */}
          <radialGradient id="ucpRedBeaconGlow" cx="0.4" cy="0.4" r="0.7">
            <stop stopColor="#FF4D6D" />
            <stop offset="0.4" stopColor="#C8102E" />
            <stop offset="1" stopColor="#7F0919" />
          </radialGradient>

          {/* Digital Cyan Eye Glow */}
          <filter id="ucpEyeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#38BDF8" floodOpacity="0.8" />
          </filter>

          {/* Beacon pulse filter */}
          <filter id="ucpBeaconGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#EF4444" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* ===================================================================
            1. ANTENNA & BEACON
            =================================================================== */}
        <g className={isThinking ? 'animate-pulse' : ''}>
          {/* Antenna Stalk */}
          <rect x="52.5" y="14" width="5" height="13" rx="2.5" fill="#475569" stroke="#1E293B" strokeWidth="1" />
          
          {/* Antenna Mount Ring */}
          <rect x="50" y="24" width="10" height="3.5" rx="1.5" fill="#C8102E" />

          {/* Glowing Red LED Beacon Bulb */}
          <circle 
            cx="55" 
            cy="12" 
            r="5.5" 
            fill="url(#ucpRedBeaconGlow)" 
            filter="url(#ucpBeaconGlow)"
            className={isThinking ? 'animate-ping' : ''}
          />
          <circle cx="53.5" cy="10" r="1.8" fill="#FFFFFF" opacity="0.85" />
        </g>

        {/* ===================================================================
            2. TORSO / BODY (If enabled)
            =================================================================== */}
        {showTorso && (
          <g>
            {/* Robot Neck */}
            <rect x="46" y="66" width="18" height="6" rx="2" fill="#334155" />
            <rect x="48" y="68" width="14" height="2" rx="1" fill="#64748B" />

            {/* Robot Chest / Chassis Base */}
            <path
              d="M 33 72 C 33 70, 77 70, 77 72 L 80 94 C 80 98, 76 101, 71 101 L 39 101 C 34 101, 30 98, 30 94 Z"
              fill="url(#ucpRobotChassis)"
              stroke="#CBD5E1"
              strokeWidth="2"
            />

            {/* UCP Core Emblem / Chest Gem (Red & Gold) */}
            <rect x="48" y="77" width="14" height="12" rx="3.5" fill="#0A1931" stroke="#E5A823" strokeWidth="1.2" />
            <circle cx="55" cy="83" r="3.2" fill="#C8102E" />
            <circle cx="54.2" cy="82" r="1" fill="#FFFFFF" opacity="0.9" />

            {/* Left Resting Arm */}
            <g>
              <path
                d="M 30 74 C 23 78, 22 88, 25 93 C 27 96, 31 96, 32 92 C 34 87, 34 81, 32 75 Z"
                fill="url(#ucpRobotChassis)"
                stroke="#CBD5E1"
                strokeWidth="1.6"
              />
            </g>
          </g>
        )}

        {/* ===================================================================
            3. EARS / AUDIO SENSORS
            =================================================================== */}
        {/* Left Ear Sensor */}
        <g>
          <rect x="18" y="38" width="7" height="16" rx="3.5" fill="#0A1931" stroke="#CBD5E1" strokeWidth="1.2" />
          <circle cx="21.5" cy="46" r="2" fill="#C8102E" />
        </g>

        {/* Right Ear Sensor */}
        <g>
          <rect x="85" y="38" width="7" height="16" rx="3.5" fill="#0A1931" stroke="#CBD5E1" strokeWidth="1.2" />
          <circle cx="88.5" cy="46" r="2" fill="#C8102E" />
        </g>

        {/* ===================================================================
            4. HEAD & VISOR
            =================================================================== */}
        {/* Main Robot Head Chassis */}
        <rect
          x="23"
          y="25"
          width="64"
          height="43"
          rx="17"
          fill="url(#ucpRobotChassis)"
          stroke="#94A3B8"
          strokeWidth="2.2"
        />

        {/* Glossy Obsidian Screen Visor */}
        <rect
          x="29"
          y="31"
          width="52"
          height="31"
          rx="12"
          fill="url(#ucpRobotVisor)"
          stroke="#1E293B"
          strokeWidth="1.6"
        />

        {/* Visor Specular Glass Reflection Arc */}
        <path
          d="M 32 37 C 32 34, 38 33, 44 33 L 73 33 C 70 34, 62 36, 44 37 C 36 37.5, 33 39, 32 37 Z"
          fill="#FFFFFF"
          opacity="0.18"
        />

        {/* ===================================================================
            5. EXPRESSIVE DIGITAL EYES & CUTE SMILE
            =================================================================== */}
        {isHappy ? (
          /* Cheerful Happy Crescent Eyes ^ ^ */
          <g filter="url(#ucpEyeGlow)">
            <path
              d="M 39 48 C 39 42, 49 42, 49 48"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M 61 48 C 61 42, 71 42, 71 48"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </g>
        ) : isThinking ? (
          /* Analytical Thinking Eyes with Digital Scan Pulse */
          <g filter="url(#ucpEyeGlow)">
            <ellipse cx="44" cy="45" rx="5" ry="3.5" fill="#38BDF8" />
            <ellipse cx="66" cy="43" rx="5.5" ry="3.5" fill="#38BDF8" />
            {/* Thinking dots in center */}
            <circle cx="55" cy="46" r="1.5" fill="#38BDF8" className="animate-ping" />
          </g>
        ) : isBlinking ? (
          /* Eyes Mid-Blink (Flat line) */
          <g>
            <line x1="39" y1="46" x2="49" y2="46" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="61" y1="46" x2="71" y2="46" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" />
          </g>
        ) : (
          /* Default Expressive Large Eyes with Catchlights */
          <g filter="url(#ucpEyeGlow)">
            {/* Left Eye */}
            <ellipse cx="44" cy="45" rx="5.2" ry="7.2" fill="#38BDF8" />
            <ellipse cx="44" cy="45.5" rx="3.5" ry="5.2" fill="#0A1931" />
            <circle cx="42.5" cy="42.5" r="2.2" fill="#FFFFFF" />
            <circle cx="45.5" cy="46.8" r="1" fill="#FFFFFF" />

            {/* Right Eye */}
            <ellipse cx="66" cy="45" rx="5.2" ry="7.2" fill="#38BDF8" />
            <ellipse cx="66" cy="45.5" rx="3.5" ry="5.2" fill="#0A1931" />
            <circle cx="64.5" cy="42.5" r="2.2" fill="#FFFFFF" />
            <circle cx="67.5" cy="46.8" r="1" fill="#FFFFFF" />
          </g>
        )}

        {/* Cute Soft Blush Pips */}
        <ellipse cx="34" cy="51" rx="3" ry="1.6" fill="#FB7185" opacity="0.55" />
        <ellipse cx="76" cy="51" rx="3" ry="1.6" fill="#FB7185" opacity="0.55" />

        {/* Sweet Digital Smile */}
        <path
          d="M 50.5 53.5 Q 55 57 59.5 53.5"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2.2"
          strokeLinecap="round"
          filter="url(#ucpEyeGlow)"
        />

        {/* ===================================================================
            6. WAVING RIGHT ARM & HAND
            =================================================================== */}
        {/* Arm group with dynamic rotation around shoulder pivot (75px, 73px) */}
        <g
          className={isWaving ? 'ucp-waving-arm-active' : 'ucp-arm-rest'}
          style={{
            transformOrigin: '76px 74px',
            transformBox: 'view-box',
          }}
        >
          {isWaving ? (
            /* Raised Cute Waving Arm & Hand */
            <g>
              {/* Upper arm raised */}
              <path
                d="M 76 72 C 82 66, 92 56, 94 44"
                stroke="url(#ucpRobotChassis)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M 76 72 C 82 66, 92 56, 94 44"
                stroke="#CBD5E1"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />

              {/* Hand / Glove Palm */}
              <circle cx="94" cy="38" r="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />

              {/* Cute Waving Fingers */}
              <rect x="89" y="27" width="3" height="7" rx="1.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
              <rect x="93" y="25" width="3.2" height="8.5" rx="1.6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
              <rect x="97" y="27" width="3" height="7.5" rx="1.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
              {/* Thumb */}
              <path d="M 88 38 C 84 39, 85 43, 89 42 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
              
              {/* Cute palm sensor dot */}
              <circle cx="94" cy="38" r="2" fill="#C8102E" />
            </g>
          ) : (
            /* Idle Resting Right Arm */
            <g>
              <path
                d="M 77 74 C 84 78, 85 88, 82 93 C 80 96, 76 96, 75 92 C 73 87, 73 81, 75 75 Z"
                fill="url(#ucpRobotChassis)"
                stroke="#CBD5E1"
                strokeWidth="1.6"
              />
              <circle cx="80" cy="91" r="2.2" fill="#E2E8F0" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

export default UcpRobotMascot;
