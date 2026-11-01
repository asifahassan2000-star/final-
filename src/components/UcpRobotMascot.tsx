import React, { useState, useEffect, useRef } from 'react';

export type RobotAnimationState = 
  | 'idle' 
  | 'typing' 
  | 'thinking' 
  | 'listening' 
  | 'responding' 
  | 'success' 
  | 'unavailable';

export interface UcpRobotMascotProps {
  size?: number | string;
  className?: string;
  state?: RobotAnimationState;
  isWaving?: boolean;
  isBlinking?: boolean;
  isThinking?: boolean;
  isHappy?: boolean;
  isListening?: boolean;
  isResponding?: boolean;
  isUnavailable?: boolean;
  showTorso?: boolean;
}

export const UcpRobotMascot: React.FC<UcpRobotMascotProps> = ({
  size = 72,
  className = '',
  state,
  isWaving = false,
  isBlinking: externalBlinking,
  isThinking = false,
  isHappy = false,
  isListening = false,
  isResponding = false,
  isUnavailable = false,
  showTorso = true,
}) => {
  // Determine effective animation state with backward-compatibility
  const effectiveState: RobotAnimationState = state || (
    isUnavailable ? 'unavailable' :
    isHappy ? 'success' :
    isResponding ? 'responding' :
    isThinking ? 'thinking' :
    isListening ? 'listening' :
    'idle'
  );

  // Micro-expression states for organic, natural "alive" behavior
  const [internalBlink, setInternalBlink] = useState(false);
  const [gazeShift, setGazeShift] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [microHeadTilt, setMicroHeadTilt] = useState(0);

  const blinkTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gazeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tiltTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Natural Varied Blinking (with occasional realistic double-blinks)
  useEffect(() => {
    let isMounted = true;

    const scheduleNextBlink = () => {
      // Natural varied intervals between 2.8s and 5.4s
      const delay = Math.random() * 2600 + 2800;

      blinkTimerRef.current = setTimeout(() => {
        if (!isMounted) return;

        // 25% chance of a double-blink (saccadic realism)
        const isDoubleBlink = Math.random() < 0.25;

        setInternalBlink(true);
        setTimeout(() => {
          if (!isMounted) return;
          setInternalBlink(false);

          if (isDoubleBlink) {
            setTimeout(() => {
              if (!isMounted) return;
              setInternalBlink(true);
              setTimeout(() => {
                if (!isMounted) return;
                setInternalBlink(false);
                scheduleNextBlink();
              }, 130);
            }, 90);
          } else {
            scheduleNextBlink();
          }
        }, 160);
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      isMounted = false;
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, []);

  // 2. Natural Micro Eye Movement (Gaze Saccades) & Keystroke Tracking
  useEffect(() => {
    let isMounted = true;

    if (effectiveState === 'typing') {
      // While user types: attentive eyes looking slightly down towards input, tracking softly
      setGazeShift({ x: 0.4, y: 1.4 });
      const trackInterval = setInterval(() => {
        if (!isMounted) return;
        setGazeShift(prev => ({
          x: prev.x > 0 ? -0.5 : 0.6,
          y: 1.3
        }));
      }, 750);
      return () => {
        isMounted = false;
        clearInterval(trackInterval);
      };
    }

    if (effectiveState === 'thinking') {
      // In thinking: looking upward thoughtfully and slightly to the right
      setGazeShift({ x: 1.8, y: -2.4 });
      return;
    }

    if (effectiveState === 'listening') {
      // In listening: wide, attentive, looking directly center-forward
      setGazeShift({ x: 0, y: 0 });
      return;
    }

    if (effectiveState === 'unavailable') {
      // In unavailable: slightly downcast / questioning
      setGazeShift({ x: -0.8, y: 0.8 });
      return;
    }

    if (effectiveState === 'success') {
      setGazeShift({ x: 0, y: 0 });
      return;
    }

    // In Idle: Occasional subtle eye saccades every 5.5s to 8.5s
    const scheduleNextGaze = () => {
      const delay = Math.random() * 3000 + 5500;
      gazeTimerRef.current = setTimeout(() => {
        if (!isMounted) return;
        const options = [-1.4, 0, 1.4];
        const nextX = options[Math.floor(Math.random() * options.length)];
        setGazeShift({ x: nextX, y: 0 });

        // Settle back to center after 1.6s
        setTimeout(() => {
          if (!isMounted) return;
          setGazeShift({ x: 0, y: 0 });
          scheduleNextGaze();
        }, 1600);
      }, delay);
    };

    scheduleNextGaze();

    return () => {
      isMounted = false;
      if (gazeTimerRef.current) clearTimeout(gazeTimerRef.current);
    };
  }, [effectiveState]);

  // 3. Natural Micro Head Tilts in Idle
  useEffect(() => {
    let isMounted = true;

    if (effectiveState !== 'idle') {
      setMicroHeadTilt(0);
      return;
    }

    const scheduleNextTilt = () => {
      const delay = Math.random() * 4000 + 7000;
      tiltTimerRef.current = setTimeout(() => {
        if (!isMounted) return;
        const tilts = [-2, 0, 2.2];
        const nextTilt = tilts[Math.floor(Math.random() * tilts.length)];
        setMicroHeadTilt(nextTilt);

        // Return to upright after 2.4s
        setTimeout(() => {
          if (!isMounted) return;
          setMicroHeadTilt(0);
          scheduleNextTilt();
        }, 2400);
      }, delay);
    };

    scheduleNextTilt();

    return () => {
      isMounted = false;
      if (tiltTimerRef.current) clearTimeout(tiltTimerRef.current);
    };
  }, [effectiveState]);

  // Effective blink decision: external prop takes precedence if provided, else natural internal blink
  const isBlinkingNow = externalBlinking !== undefined ? externalBlinking : internalBlink;

  // Head transform configuration per state
  let headTransform = `rotate(${microHeadTilt}deg)`;
  let headClassName = 'transition-transform duration-300 ease-out';

  if (effectiveState === 'thinking') {
    headTransform = 'rotate(4.2deg)';
  } else if (effectiveState === 'unavailable') {
    headTransform = 'rotate(-3.5deg)';
  } else if (effectiveState === 'responding') {
    headClassName = 'ucp-robot-responding';
    headTransform = 'rotate(0deg)';
  } else if (effectiveState === 'success') {
    headClassName = 'ucp-robot-success-nod';
    headTransform = 'rotate(0deg)';
  }

  // Base eye center coordinates + gaze offset
  const leftEyeCx = 44 + gazeShift.x;
  const leftEyeCy = 45 + gazeShift.y;
  const rightEyeCx = 66 + gazeShift.x;
  const rightEyeCy = 45 + gazeShift.y;

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

          {/* Listening State: Soft Navy Visor Aura */}
          <filter id="ucpNavyAura" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.2" floodColor="#1E3A66" floodOpacity="0.9" />
            <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#38BDF8" floodOpacity="0.45" />
          </filter>

          {/* Unavailable State: Gentle Muted Slate/Amber Aura */}
          <filter id="ucpUnavailableAura" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#64748B" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* ===================================================================
            1. ANTENNA & BEACON (Reacts to Thinking, Responding, Listening)
            =================================================================== */}
        <g 
          className={
            effectiveState === 'thinking' || effectiveState === 'responding' 
              ? 'animate-pulse' 
              : ''
          }
          style={{
            transformOrigin: '55px 25px',
            transform: effectiveState === 'thinking' ? 'rotate(4deg)' : 'none',
            transition: 'transform 0.3s ease-out'
          }}
        >
          {/* Antenna Stalk */}
          <rect x="52.5" y="14" width="5" height="13" rx="2.5" fill="#475569" stroke="#1E293B" strokeWidth="1" />
          
          {/* Antenna Mount Ring */}
          <rect x="50" y="24" width="10" height="3.5" rx="1.5" fill="#C8102E" />

          {/* Glowing Red LED Beacon Bulb */}
          <circle 
            cx="55" 
            cy="12" 
            r="5.5" 
            fill={effectiveState === 'unavailable' ? '#94A3B8' : 'url(#ucpRedBeaconGlow)'} 
            filter={effectiveState === 'unavailable' ? undefined : 'url(#ucpBeaconGlow)'}
            className={
              effectiveState === 'thinking' 
                ? 'animate-ping' 
                : effectiveState === 'responding' 
                ? 'animate-pulse' 
                : ''
            }
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
            <circle cx="55" cy="83" r="3.2" fill={effectiveState === 'listening' ? '#38BDF8' : '#C8102E'} />
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
            3. EARS / AUDIO SENSORS (Navy/Gold Accent on Listening)
            =================================================================== */}
        {/* Left Ear Sensor */}
        <g>
          <rect x="18" y="38" width="7" height="16" rx="3.5" fill="#0A1931" stroke="#CBD5E1" strokeWidth="1.2" />
          <circle cx="21.5" cy="46" r="2" fill={effectiveState === 'listening' ? '#38BDF8' : '#C8102E'} />
        </g>

        {/* Right Ear Sensor */}
        <g>
          <rect x="85" y="38" width="7" height="16" rx="3.5" fill="#0A1931" stroke="#CBD5E1" strokeWidth="1.2" />
          <circle cx="88.5" cy="46" r="2" fill={effectiveState === 'listening' ? '#38BDF8' : '#C8102E'} />
        </g>

        {/* ===================================================================
            4. HEAD & VISOR GROUP (Smooth Head Tilts & Natural Micro-Gestures)
            Pivot point is at the neck joint (55px, 68px)
            =================================================================== */}
        <g 
          className={headClassName}
          style={{
            transformOrigin: '55px 68px',
            transform: headTransform,
          }}
        >
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

          {/* Glossy Obsidian Screen Visor (With Soft Navy Glow during Listening) */}
          <rect
            x="29"
            y="31"
            width="52"
            height="31"
            rx="12"
            fill="url(#ucpRobotVisor)"
            stroke={effectiveState === 'listening' ? '#38BDF8' : '#1E293B'}
            strokeWidth={effectiveState === 'listening' ? '1.8' : '1.6'}
            filter={effectiveState === 'listening' ? 'url(#ucpNavyAura)' : undefined}
            className={effectiveState === 'listening' ? 'ucp-robot-listening-aura' : ''}
          />

          {/* Visor Specular Glass Reflection Arc */}
          <path
            d="M 32 37 C 32 34, 38 33, 44 33 L 73 33 C 70 34, 62 36, 44 37 C 36 37.5, 33 39, 32 37 Z"
            fill="#FFFFFF"
            opacity="0.18"
          />

          {/* ===================================================================
              5. EXPRESSIVE DIGITAL EYES & FACIAL EXPRESSIONS
              States: Idle, Typing, Thinking, Listening, Responding, Success, Unavailable
              =================================================================== */}
          {isBlinkingNow ? (
            /* Eyes Mid-Blink (Flat line across current eye center) */
            <g>
              <line 
                x1={leftEyeCx - 5} 
                y1={leftEyeCy} 
                x2={leftEyeCx + 5} 
                y2={leftEyeCy} 
                stroke="#38BDF8" 
                strokeWidth="2.8" 
                strokeLinecap="round" 
              />
              <line 
                x1={rightEyeCx - 5} 
                y1={rightEyeCy} 
                x2={rightEyeCx + 5} 
                y2={rightEyeCy} 
                stroke="#38BDF8" 
                strokeWidth="2.8" 
                strokeLinecap="round" 
              />
            </g>
          ) : effectiveState === 'success' || (isWaving && isHappy) ? (
            /* SUCCESS / GREETING: Cheerful Happy Crescent Eyes ^ ^ */
            <g filter="url(#ucpEyeGlow)">
              <path
                d="M 39 48 C 39 41.5, 49 41.5, 49 48"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M 61 48 C 61 41.5, 71 41.5, 71 48"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </g>
          ) : effectiveState === 'unavailable' ? (
            /* UNAVAILABLE: Gentle Concerned / Empathetic Expression */
            <g filter="url(#ucpUnavailableAura)">
              {/* Left Eye (Gentle concerned slope) */}
              <path
                d="M 39 44 Q 44 47 49 44"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <circle cx="44" cy="46" r="2.2" fill="#38BDF8" opacity="0.8" />

              {/* Right Eye */}
              <path
                d="M 61 44 Q 66 47 71 44"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <circle cx="66" cy="46" r="2.2" fill="#38BDF8" opacity="0.8" />
            </g>
          ) : effectiveState === 'thinking' ? (
            /* THINKING: Analytical Eyes Looking Upward with Digital Scan Pulse */
            <g filter="url(#ucpEyeGlow)">
              <ellipse cx={leftEyeCx} cy={leftEyeCy} rx="4.8" ry="4" fill="#38BDF8" />
              <ellipse cx={leftEyeCx} cy={leftEyeCy + 0.3} rx="3" ry="2.8" fill="#0A1931" />
              <circle cx={leftEyeCx - 1.2} cy={leftEyeCy - 1.2} r="1.5" fill="#FFFFFF" />

              <ellipse cx={rightEyeCx} cy={rightEyeCy} rx="4.8" ry="4" fill="#38BDF8" />
              <ellipse cx={rightEyeCx} cy={rightEyeCy + 0.3} rx="3" ry="2.8" fill="#0A1931" />
              <circle cx={rightEyeCx - 1.2} cy={rightEyeCy - 1.2} r="1.5" fill="#FFFFFF" />

              {/* Subtle digital thinking scan pulse in visor center */}
              <circle cx="55" cy="46" r="1.6" fill="#38BDF8" className="ucp-thinking-scan" />
            </g>
          ) : effectiveState === 'listening' ? (
            /* LISTENING: Attentive Eyes with Soft Navy Glow & Focused Catchlights */
            <g filter="url(#ucpEyeGlow)">
              {/* Left Eye (Attentive and open) */}
              <ellipse cx={leftEyeCx} cy={leftEyeCy} rx="5.6" ry="7.6" fill="#38BDF8" />
              <ellipse cx={leftEyeCx} cy={leftEyeCy} rx="3.6" ry="5.4" fill="#0A1931" />
              <circle cx={leftEyeCx - 1.5} cy={leftEyeCy - 2.5} r="2.4" fill="#FFFFFF" />
              <circle cx={leftEyeCx + 1.5} cy={leftEyeCy + 2} r="1.1" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx={rightEyeCx} cy={rightEyeCy} rx="5.6" ry="7.6" fill="#38BDF8" />
              <ellipse cx={rightEyeCx} cy={rightEyeCy} rx="3.6" ry="5.4" fill="#0A1931" />
              <circle cx={rightEyeCx - 1.5} cy={rightEyeCy - 2.5} r="2.4" fill="#FFFFFF" />
              <circle cx={rightEyeCx + 1.5} cy={rightEyeCy + 2} r="1.1" fill="#FFFFFF" />
            </g>
          ) : effectiveState === 'typing' ? (
            /* TYPING: Attentive Forward-Downward Focus Tracking Input */
            <g filter="url(#ucpEyeGlow)">
              {/* Left Eye */}
              <ellipse cx={leftEyeCx} cy={leftEyeCy} rx="5" ry="6.4" fill="#38BDF8" />
              <ellipse cx={leftEyeCx} cy={leftEyeCy + 0.4} rx="3.2" ry="4.5" fill="#0A1931" />
              <circle cx={leftEyeCx - 1.2} cy={leftEyeCy - 1.8} r="2" fill="#FFFFFF" />
              <circle cx={leftEyeCx + 1.2} cy={leftEyeCy + 1.6} r="0.9" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx={rightEyeCx} cy={rightEyeCy} rx="5" ry="6.4" fill="#38BDF8" />
              <ellipse cx={rightEyeCx} cy={rightEyeCy + 0.4} rx="3.2" ry="4.5" fill="#0A1931" />
              <circle cx={rightEyeCx - 1.2} cy={rightEyeCy - 1.8} r="2" fill="#FFFFFF" />
              <circle cx={rightEyeCx + 1.2} cy={rightEyeCy + 1.6} r="0.9" fill="#FFFFFF" />
            </g>
          ) : (
            /* IDLE / RESPONDING: Default Expressive Eyes with Living Gaze Catchlights */
            <g filter="url(#ucpEyeGlow)">
              {/* Left Eye */}
              <ellipse cx={leftEyeCx} cy={leftEyeCy} rx="5.2" ry="7.2" fill="#38BDF8" />
              <ellipse cx={leftEyeCx} cy={leftEyeCy + 0.5} rx="3.5" ry="5.2" fill="#0A1931" />
              <circle cx={leftEyeCx - 1.5} cy={leftEyeCy - 2.5} r="2.2" fill="#FFFFFF" />
              <circle cx={leftEyeCx + 1.5} cy={leftEyeCy + 1.8} r="1" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx={rightEyeCx} cy={rightEyeCy} rx="5.2" ry="7.2" fill="#38BDF8" />
              <ellipse cx={rightEyeCx} cy={rightEyeCy + 0.5} rx="3.5" ry="5.2" fill="#0A1931" />
              <circle cx={rightEyeCx - 1.5} cy={rightEyeCy - 2.5} r="2.2" fill="#FFFFFF" />
              <circle cx={rightEyeCx + 1.5} cy={rightEyeCy + 1.8} r="1" fill="#FFFFFF" />
            </g>
          )}

          {/* Cute Soft Blush Pips (Glows brighter during Success and Waving) */}
          <ellipse 
            cx="34" 
            cy="51" 
            rx="3" 
            ry="1.6" 
            fill="#FB7185" 
            opacity={effectiveState === 'success' || isWaving ? 0.75 : 0.5} 
          />
          <ellipse 
            cx="76" 
            cy="51" 
            rx="3" 
            ry="1.6" 
            fill="#FB7185" 
            opacity={effectiveState === 'success' || isWaving ? 0.75 : 0.5} 
          />

          {/* Responsive Digital Smile / Mouth Curvature per State */}
          {effectiveState === 'unavailable' ? (
            /* Concerned gentle mouth curve */
            <path
              d="M 52 55.5 Q 55 53.5 58 55.5"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : effectiveState === 'thinking' ? (
            /* Thoughtful slight mouth line */
            <path
              d="M 51.5 54 Q 55 54.8 58.5 54"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#ucpEyeGlow)"
            />
          ) : effectiveState === 'success' ? (
            /* Broad happy smile */
            <path
              d="M 49.5 53 Q 55 58.5 60.5 53"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.4"
              strokeLinecap="round"
              filter="url(#ucpEyeGlow)"
            />
          ) : effectiveState === 'responding' ? (
            /* Communicative cadence mouth */
            <path
              d="M 50.5 53.5 Q 55 56.5 59.5 53.5"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.2"
              strokeLinecap="round"
              filter="url(#ucpEyeGlow)"
            />
          ) : (
            /* Standard sweet digital smile */
            <path
              d="M 50.5 53.5 Q 55 57 59.5 53.5"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.2"
              strokeLinecap="round"
              filter="url(#ucpEyeGlow)"
            />
          )}
        </g>

        {/* ===================================================================
            6. WAVING RIGHT ARM & HAND
            Preserves the exact opening greeting wave and idle resting arm
            =================================================================== */}
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
