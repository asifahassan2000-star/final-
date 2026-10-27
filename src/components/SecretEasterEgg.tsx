import React, { useState, useEffect, useRef } from 'react';

export const SecretEasterEgg: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyBufferRef = useRef<string>('');

  const triggerShowcase = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);

    setIsExiting(false);
    setVisible(true);

    // Smooth cinematic exit fade begins at 3.5s
    exitTimerRef.current = setTimeout(() => {
      setIsExiting(true);
    }, 3500);

    // Complete auto-dismiss at 4 seconds
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setIsExiting(false);
    }, 4000);
  };

  useEffect(() => {
    // Trigger 1: Keyboard typing "asifa" anywhere on site
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && visible) {
        setVisible(false);
        setIsExiting(false);
        return;
      }
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (!e.key || e.key.length !== 1) return;

      keyBufferRef.current = (keyBufferRef.current + e.key.toLowerCase()).slice(-10);
      if (keyBufferRef.current.endsWith('asifa')) {
        keyBufferRef.current = '';
        triggerShowcase();
      }
    };

    // Trigger 2: 5 rapid clicks on the main UCP logo
    const handleCustomEvent = () => {
      triggerShowcase();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('show-ucp-secret-toast', handleCustomEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('show-ucp-secret-toast', handleCustomEvent);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={() => {
        setVisible(false);
        setIsExiting(false);
      }}
      className={`fixed inset-0 z-[999999] flex items-center justify-center p-6 select-none overflow-hidden transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        // Website background stays visible but blurred through ultra-modern frosted glass
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        background:
          'radial-gradient(circle at center, rgba(10, 18, 38, 0.52) 0%, rgba(2, 6, 23, 0.78) 100%)',
      }}
    >
      {/* 1. Futuristic Developer Cybernetic Dot Matrix Grid (masked to center) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(255, 255, 255, 0.45) 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, transparent 75%)',
        }}
      />

      {/* 2. Top Developer-Grade Mindblowing Aurora Plasma Orbs */}
      {/* Aurora Orb 1: Electric Cyan & Indigo */}
      <div
        aria-hidden="true"
        className="absolute w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full pointer-events-none -top-10 -left-10 animate-dev-aurora-1"
        style={{
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.38) 0%, rgba(99, 102, 241, 0.22) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Aurora Orb 2: Neon Purple & Sapphire */}
      <div
        aria-hidden="true"
        className="absolute w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full pointer-events-none -bottom-10 -right-10 animate-dev-aurora-2"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 85, 247, 0.32) 0%, rgba(59, 130, 246, 0.24) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 3. Central Luminous Core & Specular Back-Light */}
      <div
        aria-hidden="true"
        className="absolute w-[320px] h-[320px] sm:w-[540px] sm:h-[540px] rounded-full pointer-events-none animate-apple-egg-glow"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(147, 197, 253, 0.25) 30%, rgba(255, 255, 255, 0.08) 55%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* 4. Sweeping Laser Beam Flash across the blurred website */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-36 pointer-events-none animate-dev-beam"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 35%, rgba(255, 255, 255, 0.45) 50%, rgba(147, 197, 253, 0.6) 55%, transparent 100%)',
          filter: 'blur(10px)',
        }}
      />

      {/* 5. Floating Developer Particles / Sparkles */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#38bdf8] pointer-events-none animate-dev-particle-1"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_16px_#ffffff] pointer-events-none animate-dev-particle-2"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-indigo-300 shadow-[0_0_14px_#818cf8] pointer-events-none animate-dev-particle-3"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_10px_#fde047] pointer-events-none animate-dev-particle-1"
      />

      {/* 6. Centered Content — STRICTLY ZERO BORDER, Apple-Style Developer Typography */}
      <div className="relative z-20 max-w-4xl mx-auto text-center px-4 animate-apple-egg-pop flex flex-col items-center">
        {/* Top Developer Badge Tag */}
        <div className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] uppercase text-white/90">
            PORTAL ARCHITECT // AI ENGINEER
          </span>
        </div>

        {/* Big Apple-Style Shiny Headline with liquid light shimmer */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] apple-egg-shimmer-text">
          Built &amp; Designed by Asifa
        </h1>

        {/* Apple Keynote Subtitle with high-tech clarity */}
        <p className="mt-4 sm:mt-5 text-xl sm:text-3xl md:text-4xl font-light tracking-wide text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          Student of Artificial Intelligence
        </p>

        {/* Campus & Date Stamp */}
        <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base font-mono tracking-[0.2em] uppercase text-slate-200/80">
          <span className="text-sky-300 font-semibold">UCP BAHAWALPUR</span>
          <span className="text-white/30">•</span>
          <span>10/2026</span>
        </div>

        {/* Auto-closing indication */}
        <div className="mt-8 flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-white/40">
          <span>[ AUTO-CLOSING IN 4S ]</span>
          <span>•</span>
          <span>TAP ANYWHERE TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};
