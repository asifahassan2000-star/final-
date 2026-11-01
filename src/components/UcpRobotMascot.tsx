import React, { useState, useEffect, useRef } from 'react';

export type RobotAnimationState = 
  | 'idle' 
  | 'typing' 
  | 'thinking' 
  | 'listening' 
  | 'responding' 
  | 'success' 
  | 'unavailable';

export type RobotMood = 
  | 'idle'
  | 'alert'
  | 'excited_wave'
  | 'playful_touch'
  | 'farewell';

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
  interactive?: boolean;
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
  interactive = true,
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
  const [isSlowBlink, setIsSlowBlink] = useState(false);
  const [gazeShift, setGazeShift] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [microHeadTilt, setMicroHeadTilt] = useState(0);

  // High-level interactive mood states (updated only on state transitions, not per mousemove)
  const [robotMood, setRobotMood] = useState<RobotMood>('idle');
  const [isHoverTwoHandWaving, setIsHoverTwoHandWaving] = useState(false);
  const [isFarewell, setIsFarewell] = useState(false);

  const blinkTimerRef = useRef<NodeJS.Timeout | null>(null);
  const slowBlinkTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gazeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tiltTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hoverWaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const farewellTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasGreetedHoverSessionRef = useRef(false);

  // DOM and Animation Refs (Zero React re-renders on pointer movement)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const interactiveHeadRef = useRef<SVGGElement | null>(null);
  const eyesRef = useRef<SVGGElement | null>(null);
  const leftHandReachRef = useRef<SVGGElement | null>(null);
  const rightHandReachRef = useRef<SVGGElement | null>(null);
  const leftArmGroupRef = useRef<SVGGElement | null>(null);
  const rightArmGroupRef = useRef<SVGGElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const isApproachingRef = useRef(false);
  const isVisibleRef = useRef(true);

  // Mutable animation state lerped via requestAnimationFrame with spring physics
  const animStateRef = useRef({
    // Eyes & gaze
    targetEyeX: 0,
    targetEyeY: 0,
    currEyeX: 0,
    currEyeY: 0,
    targetEyeScaleY: 1.0,
    currEyeScaleY: 1.0,
    // Head tilt and turn
    targetHeadTilt: 0,
    targetHeadX: 0,
    targetHeadY: 0,
    currHeadTilt: 0,
    currHeadX: 0,
    currHeadY: 0,
    // Right hand reach
    targetRightReachX: 0,
    targetRightReachY: 0,
    targetRightReachRot: 0,
    currRightReachX: 0,
    currRightReachY: 0,
    currRightReachRot: 0,
    // Left hand reach
    targetLeftReachX: 0,
    targetLeftReachY: 0,
    targetLeftReachRot: 0,
    currLeftReachX: 0,
    currLeftReachY: 0,
    currLeftReachRot: 0,
  });

  // 1. Natural Varied Blinking (Quick blinks & occasional double-blinks)
  useEffect(() => {
    let isMounted = true;

    const scheduleNextBlink = () => {
      const delay = Math.random() * 2600 + 3000;

      blinkTimerRef.current = setTimeout(() => {
        if (!isMounted) return;
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
              }, 120);
            }, 80);
          } else {
            scheduleNextBlink();
          }
        }, 150);
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      isMounted = false;
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, []);

  // Occasional longer content eye closure in Idle (~400ms sleepy/peaceful blink every 14s)
  useEffect(() => {
    let isMounted = true;

    const scheduleSlowBlink = () => {
      const delay = Math.random() * 4000 + 13000;
      slowBlinkTimerRef.current = setTimeout(() => {
        if (!isMounted) return;
        // Only do slow blink if in idle
        if (!isHoveringRef.current && !isApproachingRef.current && effectiveState === 'idle') {
          setIsSlowBlink(true);
          setTimeout(() => {
            if (!isMounted) return;
            setIsSlowBlink(false);
            scheduleSlowBlink();
          }, 420);
        } else {
          scheduleSlowBlink();
        }
      }, delay);
    };

    scheduleSlowBlink();

    return () => {
      isMounted = false;
      if (slowBlinkTimerRef.current) clearTimeout(slowBlinkTimerRef.current);
    };
  }, [effectiveState]);

  // 2. Natural Micro Eye Movement (Gaze Saccades) & Keystroke Tracking
  useEffect(() => {
    let isMounted = true;

    if (effectiveState === 'typing') {
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
      setGazeShift({ x: 1.8, y: -2.4 });
      return;
    }

    if (effectiveState === 'listening') {
      setGazeShift({ x: 0, y: 0 });
      return;
    }

    if (effectiveState === 'unavailable') {
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
        if (!isHoveringRef.current && !isApproachingRef.current) {
          const options = [-1.4, 0, 1.4];
          const nextX = options[Math.floor(Math.random() * options.length)];
          setGazeShift({ x: nextX, y: 0 });

          setTimeout(() => {
            if (!isMounted) return;
            setGazeShift({ x: 0, y: 0 });
            scheduleNextGaze();
          }, 1600);
        } else {
          scheduleNextGaze();
        }
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
        if (!isHoveringRef.current && !isApproachingRef.current) {
          const tilts = [-2, 0, 2.2];
          const nextTilt = tilts[Math.floor(Math.random() * tilts.length)];
          setMicroHeadTilt(nextTilt);

          setTimeout(() => {
            if (!isMounted) return;
            setMicroHeadTilt(0);
            scheduleNextTilt();
          }, 2400);
        } else {
          scheduleNextTilt();
        }
      }, delay);
    };

    scheduleNextTilt();

    return () => {
      isMounted = false;
      if (tiltTimerRef.current) clearTimeout(tiltTimerRef.current);
    };
  }, [effectiveState]);

  // Spring-based continuous requestAnimationFrame runner
  const startAnimLoop = () => {
    if (rafIdRef.current !== null) return;

    const tick = () => {
      if (!isVisibleRef.current) {
        rafIdRef.current = null;
        return;
      }

      const s = animStateRef.current;
      // Responsive spring-like lerp factors
      const lerpEye = 0.18;
      const lerpHead = 0.14;
      const lerpHand = 0.16;

      s.currEyeX += (s.targetEyeX - s.currEyeX) * lerpEye;
      s.currEyeY += (s.targetEyeY - s.currEyeY) * lerpEye;
      s.currEyeScaleY += (s.targetEyeScaleY - s.currEyeScaleY) * lerpEye;

      s.currHeadTilt += (s.targetHeadTilt - s.currHeadTilt) * lerpHead;
      s.currHeadX += (s.targetHeadX - s.currHeadX) * lerpHead;
      s.currHeadY += (s.targetHeadY - s.currHeadY) * lerpHead;

      s.currRightReachX += (s.targetRightReachX - s.currRightReachX) * lerpHand;
      s.currRightReachY += (s.targetRightReachY - s.currRightReachY) * lerpHand;
      s.currRightReachRot += (s.targetRightReachRot - s.currRightReachRot) * lerpHand;

      s.currLeftReachX += (s.targetLeftReachX - s.currLeftReachX) * lerpHand;
      s.currLeftReachY += (s.targetLeftReachY - s.currLeftReachY) * lerpHand;
      s.currLeftReachRot += (s.targetLeftReachRot - s.currLeftReachRot) * lerpHand;

      // Apply transforms directly to DOM elements (composite only, 0 layout reflows)
      if (eyesRef.current) {
        eyesRef.current.style.transform = `translate(${s.currEyeX.toFixed(2)}px, ${s.currEyeY.toFixed(2)}px) scaleY(${s.currEyeScaleY.toFixed(2)})`;
      }
      if (interactiveHeadRef.current) {
        interactiveHeadRef.current.style.transform = `rotate(${s.currHeadTilt.toFixed(2)}deg) translate(${s.currHeadX.toFixed(2)}px, ${s.currHeadY.toFixed(2)}px)`;
      }
      if (rightHandReachRef.current) {
        rightHandReachRef.current.style.transform = `translate(${s.currRightReachX.toFixed(2)}px, ${s.currRightReachY.toFixed(2)}px) rotate(${s.currRightReachRot.toFixed(2)}deg)`;
      }
      if (leftHandReachRef.current) {
        leftHandReachRef.current.style.transform = `translate(${s.currLeftReachX.toFixed(2)}px, ${s.currLeftReachY.toFixed(2)}px) rotate(${s.currLeftReachRot.toFixed(2)}deg)`;
      }

      // Check if settled back to idle
      const isSettled =
        !isHoveringRef.current &&
        !isApproachingRef.current &&
        Math.abs(s.currEyeX) < 0.02 &&
        Math.abs(s.currEyeY) < 0.02 &&
        Math.abs(s.currEyeScaleY - 1.0) < 0.01 &&
        Math.abs(s.currHeadTilt) < 0.03 &&
        Math.abs(s.currRightReachX) < 0.02 &&
        Math.abs(s.currRightReachY) < 0.02 &&
        Math.abs(s.currLeftReachX) < 0.02 &&
        Math.abs(s.currLeftReachY) < 0.02;

      if (isSettled) {
        s.currEyeX = 0;
        s.currEyeY = 0;
        s.currEyeScaleY = 1.0;
        s.currHeadTilt = 0;
        s.currHeadX = 0;
        s.currHeadY = 0;
        s.currRightReachX = 0;
        s.currRightReachY = 0;
        s.currRightReachRot = 0;
        s.currLeftReachX = 0;
        s.currLeftReachY = 0;
        s.currLeftReachRot = 0;

        if (eyesRef.current) eyesRef.current.style.transform = '';
        if (interactiveHeadRef.current) interactiveHeadRef.current.style.transform = '';
        if (rightHandReachRef.current) rightHandReachRef.current.style.transform = '';
        if (leftHandReachRef.current) leftHandReachRef.current.style.transform = '';

        rafIdRef.current = null;
      } else {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  };

  // Coordinated cursor calculation logic (Approach, Hover, and Playful hand proximity)
  const processPointerCoordinates = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distFromCenter = Math.hypot(clientX - centerX, clientY - centerY);

    const prefersReducedMotion = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Normalizing coordinates from -1 to 1 relative to robot radius
    const rawRelX = (clientX - centerX) / (rect.width / 2);
    const rawRelY = (clientY - centerY) / (rect.height / 2);
    const relX = Math.max(-1.5, Math.min(1.5, rawRelX));
    const relY = Math.max(-1.5, Math.min(1.5, rawRelY));

    const s = animStateRef.current;

    // 1. CURSOR APPROACH: Detected within ~240px
    const inApproachZone = distFromCenter <= 240;
    const inHoverZone = distFromCenter <= (rect.width * 0.72) || isHoveringRef.current;

    if (!inApproachZone && !inHoverZone) {
      if (isApproachingRef.current) {
        handlePointerDeparture();
      }
      return;
    }

    isApproachingRef.current = true;

    // Smooth limited eye pupil tracking (up to ±2.8px)
    s.targetEyeX = relX * 2.6;
    s.targetEyeY = relY * 2.2;

    // Expressive eye opening: wide alert eyes on approach (scaleY 1.14)
    s.targetEyeScaleY = inHoverZone ? 1.05 : 1.15;

    // Head tilt towards cursor
    if (prefersReducedMotion) {
      s.targetHeadTilt = 0;
      s.targetHeadX = 0;
      s.targetHeadY = 0;
    } else {
      s.targetHeadTilt = relX * 3.8;
      s.targetHeadX = relX * 1.0;
      s.targetHeadY = relY * 0.8;
    }

    // 2. PLAYFUL HAND INTERACTION (Near Left or Right Hand)
    // Left hand center ~ (-0.71, -0.31); Right hand center ~ (0.71, -0.31)
    const leftHandRelX = -0.71;
    const leftHandRelY = -0.31;
    const rightHandRelX = 0.71;
    const rightHandRelY = -0.31;

    const distToLeft = Math.hypot(relX - leftHandRelX, relY - leftHandRelY);
    const distToRight = Math.hypot(relX - rightHandRelX, relY - rightHandRelY);

    if (!prefersReducedMotion && (distToLeft < 0.75 || distToRight < 0.75)) {
      setRobotMood('playful_touch');

      // Right hand reaches towards cursor if near right quadrant
      if (distToRight < 0.75) {
        const factor = Math.pow(Math.max(0, 1 - distToRight / 0.75), 1.2);
        s.targetRightReachX = (relX - rightHandRelX) * 6.0 * factor;
        s.targetRightReachY = (relY - rightHandRelY) * 6.0 * factor;
        s.targetRightReachRot = (relX - rightHandRelX) * 14.0 * factor;
      } else {
        s.targetRightReachX = 0;
        s.targetRightReachY = 0;
        s.targetRightReachRot = 0;
      }

      // Left hand reaches towards cursor if near left quadrant
      if (distToLeft < 0.75) {
        const factor = Math.pow(Math.max(0, 1 - distToLeft / 0.75), 1.2);
        s.targetLeftReachX = (relX - leftHandRelX) * 6.0 * factor;
        s.targetLeftReachY = (relY - leftHandRelY) * 6.0 * factor;
        s.targetLeftReachRot = (relX - leftHandRelX) * 14.0 * factor;
      } else {
        s.targetLeftReachX = 0;
        s.targetLeftReachY = 0;
        s.targetLeftReachRot = 0;
      }
    } else {
      s.targetRightReachX = 0;
      s.targetRightReachY = 0;
      s.targetRightReachRot = 0;
      s.targetLeftReachX = 0;
      s.targetLeftReachY = 0;
      s.targetLeftReachRot = 0;

      if (!isHoverTwoHandWaving) {
        setRobotMood(inHoverZone ? 'excited_wave' : 'alert');
      }
    }

    startAnimLoop();
  };

  // Hover Entry (CURSOR HOVER / TOUCH): Excited welcoming two-hand wave
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || e.pointerType === 'touch') return;
    isHoveringRef.current = true;

    // Trigger excited two-hand wave once per hover session (not replaying continuously)
    if (!hasGreetedHoverSessionRef.current && !isWaving) {
      hasGreetedHoverSessionRef.current = true;
      setIsHoverTwoHandWaving(true);
      setRobotMood('excited_wave');

      if (hoverWaveTimerRef.current) clearTimeout(hoverWaveTimerRef.current);
      hoverWaveTimerRef.current = setTimeout(() => {
        setIsHoverTwoHandWaving(false);
        setRobotMood('alert');
      }, 1150);
    }

    processPointerCoordinates(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || e.pointerType === 'touch') return;
    processPointerCoordinates(e.clientX, e.clientY);
  };

  // Departure (CURSOR LEAVES): farewell gesture, smooth return to idle
  const handlePointerDeparture = () => {
    isHoveringRef.current = false;
    isApproachingRef.current = false;

    if (hoverWaveTimerRef.current) clearTimeout(hoverWaveTimerRef.current);
    setIsHoverTwoHandWaving(false);

    // Give a sweet farewell wrist flutter before returning to calm idle
    setIsFarewell(true);
    setRobotMood('farewell');
    if (farewellTimerRef.current) clearTimeout(farewellTimerRef.current);
    farewellTimerRef.current = setTimeout(() => {
      setIsFarewell(false);
      setRobotMood('idle');
      // Reset session flag so subsequent separate hover session triggers greeting fresh
      hasGreetedHoverSessionRef.current = false;
    }, 500);

    const s = animStateRef.current;
    s.targetEyeX = 0;
    s.targetEyeY = 0;
    s.targetEyeScaleY = 1.0;
    s.targetHeadTilt = 0;
    s.targetHeadX = 0;
    s.targetHeadY = 0;
    s.targetRightReachX = 0;
    s.targetRightReachY = 0;
    s.targetRightReachRot = 0;
    s.targetLeftReachX = 0;
    s.targetLeftReachY = 0;
    s.targetLeftReachRot = 0;

    startAnimLoop();
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || e.pointerType === 'touch') return;
    handlePointerDeparture();
  };

  // Window pointer listener for CURSOR APPROACH zone detection
  useEffect(() => {
    if (!interactive || typeof window === 'undefined') return;

    const handleWindowPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      processPointerCoordinates(e.clientX, e.clientY);
    };

    window.addEventListener('pointermove', handleWindowPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
    };
  }, [interactive]);

  // Pause loop when off-screen to preserve performance
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || !containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      if (!entry.isIntersecting && rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      } else if (entry.isIntersecting && (isHoveringRef.current || isApproachingRef.current)) {
        startAnimLoop();
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (hoverWaveTimerRef.current) clearTimeout(hoverWaveTimerRef.current);
      if (farewellTimerRef.current) clearTimeout(farewellTimerRef.current);
    };
  }, []);

  // Effective blink decision: external prop takes precedence if provided, else natural internal blink
  const isBlinkingNow = externalBlinking !== undefined ? externalBlinking : (internalBlink || isSlowBlink);

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

  // Arm states:
  // - Right arm rises when waving (initial visitor greeting), or during hover, or during farewell
  const isRightArmRaised = isWaving || (interactive && (isHoverTwoHandWaving || isHoveringRef.current || isFarewell));
  // - Left arm rises together during two-hand hover wave and hover interaction
  const isLeftArmRaised = interactive && (isHoverTwoHandWaving || isHoveringRef.current || isFarewell);

  const rightArmClass = isWaving
    ? 'ucp-waving-arm-active'
    : isHoverTwoHandWaving
    ? 'ucp-two-hand-wave-right'
    : isFarewell
    ? 'ucp-farewell-right'
    : 'ucp-arm-rest';

  const leftArmClass = isHoverTwoHandWaving
    ? 'ucp-two-hand-wave-left'
    : isFarewell
    ? 'ucp-farewell-left'
    : 'ucp-arm-rest-left';

  const isExcitedSmiling = robotMood === 'excited_wave' || robotMood === 'playful_touch' || isHoverTwoHandWaving;

  return (
    <div 
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
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
            2. TORSO / BODY (Subtle Organic Breathing Motion in Idle)
            =================================================================== */}
        {showTorso && (
          <g className="ucp-robot-breathe">
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
          </g>
        )}

        {/* ===================================================================
            2B. INDEPENDENT LEFT ARM (Raises with Right Arm on Hover Wave)
            Shoulder Pivot: (34px, 74px)
            =================================================================== */}
        {showTorso && (
          <g
            ref={leftArmGroupRef}
            className={leftArmClass}
            style={{
              transformOrigin: '34px 74px',
              transformBox: 'view-box',
            }}
          >
            {isLeftArmRaised ? (
              /* Raised Left Waving & Reaching Arm */
              <g>
                <path
                  d="M 34 72 C 28 66, 18 56, 16 44"
                  stroke="url(#ucpRobotChassis)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  d="M 34 72 C 28 66, 18 56, 16 44"
                  stroke="#CBD5E1"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Left hand & fingers with spring reach */}
                <g ref={leftHandReachRef} style={{ transformOrigin: '16px 38px' }}>
                  {/* Glove Palm */}
                  <circle cx="16" cy="38" r="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />

                  {/* Left Fingers (Symmetrical to right hand) */}
                  <rect x="10" y="27" width="3" height="7.5" rx="1.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
                  <rect x="13.8" y="25" width="3.2" height="8.5" rx="1.6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
                  <rect x="18" y="27" width="3" height="7" rx="1.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
                  
                  {/* Thumb */}
                  <path d="M 22 38 C 26 39, 25 43, 21 42 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />

                  {/* Palm sensor dot */}
                  <circle cx="16" cy="38" r="2" fill="#C8102E" />
                </g>
              </g>
            ) : (
              /* Left Idle Resting Arm */
              <g>
                <path
                  d="M 30 74 C 23 78, 22 88, 25 93 C 27 96, 31 96, 32 92 C 34 87, 34 81, 32 75 Z"
                  fill="url(#ucpRobotChassis)"
                  stroke="#CBD5E1"
                  strokeWidth="1.6"
                />
                <circle cx="30" cy="91" r="2.2" fill="#E2E8F0" />
              </g>
            )}
          </g>
        )}

        {/* ===================================================================
            3. EARS / AUDIO SENSORS (Navy/Gold Accent on Listening)
            =================================================================== */}
        <g>
          <rect x="18" y="38" width="7" height="16" rx="3.5" fill="#0A1931" stroke="#CBD5E1" strokeWidth="1.2" />
          <circle cx="21.5" cy="46" r="2" fill={effectiveState === 'listening' ? '#38BDF8' : '#C8102E'} />
        </g>
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
          <g
            ref={interactiveHeadRef}
            style={{
              transformOrigin: '55px 68px',
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

            {/* Glossy Obsidian Screen Visor */}
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
                Wrapped in interactive ref for smooth pupil tracking & scale
                =================================================================== */}
            <g ref={eyesRef}>
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
              ) : isHoverTwoHandWaving || effectiveState === 'success' || (isWaving && isHappy) ? (
                /* EXCITED HOVER WAVE / SUCCESS: Cheerful Happy Crescent Eyes ^ ^ */
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
              ) : robotMood === 'playful_touch' ? (
                /* PLAYFUL INTERACTION: Wide Wonder Sparkle Eyes with Dilated Pupils */
                <g filter="url(#ucpEyeGlow)">
                  <ellipse cx={leftEyeCx} cy={leftEyeCy} rx="5.6" ry="8.2" fill="#38BDF8" />
                  <ellipse cx={leftEyeCx} cy={leftEyeCy + 0.4} rx="3.8" ry="6.0" fill="#0A1931" />
                  <circle cx={leftEyeCx - 1.6} cy={leftEyeCy - 2.8} r="2.5" fill="#FFFFFF" />
                  <circle cx={leftEyeCx + 1.6} cy={leftEyeCy + 2.2} r="1.3" fill="#FFFFFF" />

                  <ellipse cx={rightEyeCx} cy={rightEyeCy} rx="5.6" ry="8.2" fill="#38BDF8" />
                  <ellipse cx={rightEyeCx} cy={rightEyeCy + 0.4} rx="3.8" ry="6.0" fill="#0A1931" />
                  <circle cx={rightEyeCx - 1.6} cy={rightEyeCy - 2.8} r="2.5" fill="#FFFFFF" />
                  <circle cx={rightEyeCx + 1.6} cy={rightEyeCy + 2.2} r="1.3" fill="#FFFFFF" />
                </g>
              ) : effectiveState === 'unavailable' ? (
                /* UNAVAILABLE: Gentle Concerned Expression */
                <g filter="url(#ucpUnavailableAura)">
                  <path
                    d="M 39 44 Q 44 47 49 44"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                  <circle cx="44" cy="46" r="2.2" fill="#38BDF8" opacity="0.8" />

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

                  <circle cx="55" cy="46" r="1.6" fill="#38BDF8" className="ucp-thinking-scan" />
                </g>
              ) : effectiveState === 'listening' ? (
                /* LISTENING: Attentive Eyes with Soft Navy Glow */
                <g filter="url(#ucpEyeGlow)">
                  <ellipse cx={leftEyeCx} cy={leftEyeCy} rx="5.6" ry="7.6" fill="#38BDF8" />
                  <ellipse cx={leftEyeCx} cy={leftEyeCy} rx="3.6" ry="5.4" fill="#0A1931" />
                  <circle cx={leftEyeCx - 1.5} cy={leftEyeCy - 2.5} r="2.4" fill="#FFFFFF" />
                  <circle cx={leftEyeCx + 1.5} cy={leftEyeCy + 2} r="1.1" fill="#FFFFFF" />

                  <ellipse cx={rightEyeCx} cy={rightEyeCy} rx="5.6" ry="7.6" fill="#38BDF8" />
                  <ellipse cx={rightEyeCx} cy={rightEyeCy} rx="3.6" ry="5.4" fill="#0A1931" />
                  <circle cx={rightEyeCx - 1.5} cy={rightEyeCy - 2.5} r="2.4" fill="#FFFFFF" />
                  <circle cx={rightEyeCx + 1.5} cy={rightEyeCy + 2} r="1.1" fill="#FFFFFF" />
                </g>
              ) : effectiveState === 'typing' ? (
                /* TYPING: Attentive Forward-Downward Focus */
                <g filter="url(#ucpEyeGlow)">
                  <ellipse cx={leftEyeCx} cy={leftEyeCy} rx="5" ry="6.4" fill="#38BDF8" />
                  <ellipse cx={leftEyeCx} cy={leftEyeCy + 0.4} rx="3.2" ry="4.5" fill="#0A1931" />
                  <circle cx={leftEyeCx - 1.2} cy={leftEyeCy - 1.8} r="2" fill="#FFFFFF" />
                  <circle cx={leftEyeCx + 1.2} cy={leftEyeCy + 1.6} r="0.9" fill="#FFFFFF" />

                  <ellipse cx={rightEyeCx} cy={rightEyeCy} rx="5" ry="6.4" fill="#38BDF8" />
                  <ellipse cx={rightEyeCx} cy={rightEyeCy + 0.4} rx="3.2" ry="4.5" fill="#0A1931" />
                  <circle cx={rightEyeCx - 1.2} cy={rightEyeCy - 1.8} r="2" fill="#FFFFFF" />
                  <circle cx={rightEyeCx + 1.2} cy={rightEyeCy + 1.6} r="0.9" fill="#FFFFFF" />
                </g>
              ) : (
                /* IDLE / ALERT / APPROACH: Living Eyes with Dynamic Alert Gaze */
                <g filter="url(#ucpEyeGlow)">
                  <ellipse cx={leftEyeCx} cy={leftEyeCy} rx="5.2" ry="7.2" fill="#38BDF8" />
                  <ellipse cx={leftEyeCx} cy={leftEyeCy + 0.5} rx="3.5" ry="5.2" fill="#0A1931" />
                  <circle cx={leftEyeCx - 1.5} cy={leftEyeCy - 2.5} r="2.2" fill="#FFFFFF" />
                  <circle cx={leftEyeCx + 1.5} cy={leftEyeCy + 1.8} r="1" fill="#FFFFFF" />

                  <ellipse cx={rightEyeCx} cy={rightEyeCy} rx="5.2" ry="7.2" fill="#38BDF8" />
                  <ellipse cx={rightEyeCx} cy={rightEyeCy + 0.5} rx="3.5" ry="5.2" fill="#0A1931" />
                  <circle cx={rightEyeCx - 1.5} cy={rightEyeCy - 2.5} r="2.2" fill="#FFFFFF" />
                  <circle cx={rightEyeCx + 1.5} cy={rightEyeCy + 1.8} r="1" fill="#FFFFFF" />
                </g>
              )}
            </g>

            {/* Cute Soft Blush Pips (Glows brighter during Success, Waving, Hover or Playful Interaction) */}
            <ellipse 
              cx="34" 
              cy="51" 
              rx="3" 
              ry="1.6" 
              fill="#FB7185" 
              opacity={isExcitedSmiling || effectiveState === 'success' || isWaving ? 0.85 : 0.5} 
            />
            <ellipse 
              cx="76" 
              cy="51" 
              rx="3" 
              ry="1.6" 
              fill="#FB7185" 
              opacity={isExcitedSmiling || effectiveState === 'success' || isWaving ? 0.85 : 0.5} 
            />

            {/* Responsive Digital Smile / Mouth Curvature per State & Mood */}
            {effectiveState === 'unavailable' ? (
              <path
                d="M 52 55.5 Q 55 53.5 58 55.5"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : effectiveState === 'thinking' ? (
              <path
                d="M 51.5 54 Q 55 54.8 58.5 54"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#ucpEyeGlow)"
              />
            ) : robotMood === 'playful_touch' ? (
              /* Delighted / Surprised Curious Mouth Curve */
              <path
                d="M 51.5 53.5 Q 55 58 58.5 53.5"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.4"
                strokeLinecap="round"
                filter="url(#ucpEyeGlow)"
              />
            ) : isExcitedSmiling || effectiveState === 'success' ? (
              /* Broad Happy Welcoming Smile */
              <path
                d="M 49.5 53 Q 55 58.5 60.5 53"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.4"
                strokeLinecap="round"
                filter="url(#ucpEyeGlow)"
              />
            ) : effectiveState === 'responding' ? (
              <path
                d="M 50.5 53.5 Q 55 56.5 59.5 53.5"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.2"
                strokeLinecap="round"
                filter="url(#ucpEyeGlow)"
              />
            ) : (
              /* Standard Sweet Digital Smile */
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
        </g>

        {/* ===================================================================
            6. INDEPENDENT RIGHT ARM & HAND
            Preserves opening single-hand wave, enthusiastic two-hand hover wave,
            playful hand reach and idle resting arm
            Shoulder Pivot: (76px, 74px)
            =================================================================== */}
        <g
          ref={rightArmGroupRef}
          className={rightArmClass}
          style={{
            transformOrigin: '76px 74px',
            transformBox: 'view-box',
          }}
        >
          {isRightArmRaised ? (
            /* Raised Right Waving & Reaching Arm */
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

              {/* Hand & fingers wrapped in interactive reach ref */}
              <g ref={rightHandReachRef} style={{ transformOrigin: '94px 38px' }}>
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

