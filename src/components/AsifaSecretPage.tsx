import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Copy, Check, ArrowUpRight, ArrowLeft, Terminal } from 'lucide-react';

interface AsifaSecretPageProps {
  onBackToHome?: () => void;
}

export const AsifaSecretPage: React.FC<AsifaSecretPageProps> = ({ onBackToHome }) => {
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Enforce noindex, nofollow and custom title for secret page
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'ASIFA — Architect';

    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const createdMeta = !metaRobots;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    const prevRobots = metaRobots.content;
    metaRobots.content = 'noindex, nofollow, noarchive';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Allow Escape key to seamlessly return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onBackToHome) {
        onBackToHome();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.title = originalTitle;
      window.removeEventListener('keydown', handleKeyDown);
      if (createdMeta && metaRobots) {
        metaRobots.remove();
      } else if (metaRobots) {
        metaRobots.content = prevRobots || 'all';
      }
    };
  }, [onBackToHome]);

  // Subtle interactive mouse spotlight for high-end developer poster vibe
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText('03166126926');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/923166126926', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#000000] text-white flex flex-col justify-between items-center px-4 sm:px-6 md:px-12 py-6 sm:py-10 select-none overflow-x-hidden font-sans"
      style={{
        backgroundImage: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.08), transparent 60%)`,
      }}
    >
      {/* Background Subtle Designer Grid Texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top Bar: Discreet Navigation & Developer Status */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between text-xs font-mono tracking-widest text-neutral-400">
        {onBackToHome ? (
          <button
            onClick={onBackToHome}
            className="group flex items-center gap-2 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
            title="Return to UCP Bahawalpur Portal"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="uppercase tracking-wider">ucp.edu.pk</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-neutral-400">
            <Terminal size={14} />
            <span>DEV // SEC_01</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
          <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-mono font-bold">SYSTEM SECURE // CYBER ARCHITECT</span>
        </div>
      </header>

      {/* Center: Elite Hacker & Developer Typographic Showcase */}
      <main className="relative z-10 w-full max-w-4xl my-auto flex flex-col items-center text-center py-8 sm:py-12">
        {/* Main Title: 80px+ bold display with iridescent cyber glow */}
        <h1 
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[96px] font-black tracking-[-0.04em] leading-[0.95] text-white uppercase bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro", "Helvetica Neue", sans-serif',
            filter: 'drop-shadow(0 0 25px rgba(56, 189, 248, 0.35)) drop-shadow(0 0 50px rgba(255, 255, 255, 0.2))',
          }}
        >
          ASIFA
        </h1>

        {/* Subtitle: Student of Artificial Intelligence (Kept unique here) */}
        <p className="mt-4 sm:mt-5 text-lg sm:text-xl md:text-[22px] text-white/80 font-light tracking-[-0.01em] max-w-2xl">
          <span className="text-white font-medium">UCP BWP</span> — <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent font-medium drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">Student of Artificial Intelligence</span> — <span className="text-white/70 font-mono text-sm sm:text-base">Batch 2025</span>
        </p>

        {/* Line 2: Hacker Terminal Identity with Luminous Cyber Sheen */}
        <div className="mt-5 sm:mt-6 space-y-2.5 text-base sm:text-lg md:text-[20px] text-white/90 font-normal leading-relaxed">
          <p className="tracking-tight font-medium text-white flex items-center justify-center gap-2">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.4)]">
              root@asifa:~#
            </span>
            <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent font-semibold drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
              Architect of UCP BWP Campus Portal
            </span>
          </p>
          <p className="font-mono text-xs sm:text-sm md:text-[15px] text-white/90 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 py-1">
            <span className="text-cyan-300 font-semibold drop-shadow-[0_0_12px_rgba(6,182,212,0.6)] bg-cyan-950/60 border border-cyan-500/40 px-3 py-1 rounded-md shadow-[0_0_15px_rgba(6,182,212,0.25)] flex items-center gap-1.5">
              <span className="text-cyan-400 font-bold">⚡</span> Full-Stack Developer
            </span>
            <span className="text-emerald-300 font-semibold drop-shadow-[0_0_12px_rgba(16,185,129,0.6)] bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-md shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">🔍</span> Website SEO Specialist
            </span>
            <span className="text-sky-300 font-semibold drop-shadow-[0_0_12px_rgba(56,189,248,0.6)] bg-sky-950/60 border border-sky-500/40 px-3 py-1 rounded-md shadow-[0_0_15px_rgba(56,189,248,0.25)] flex items-center gap-1.5">
              <span className="text-sky-400 font-bold">🛡️</span> Web Protection &amp; Cyber Defense
            </span>
          </p>
        </div>

        {/* Contact box: Cyber Hacker Glassmorphic Panel with glowing border */}
        <div 
          onClick={handleWhatsAppClick}
          className="mt-8 sm:mt-10 w-full max-w-md border border-cyan-500/30 hover:border-cyan-400 bg-black/60 hover:bg-cyan-950/20 rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 group cursor-pointer shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_50px_rgba(6,182,212,0.3)] text-center relative overflow-hidden ring-1 ring-cyan-500/20"
        >
          {/* Subtle hover gleam line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 group-hover:opacity-100 transition-all duration-500" />

          <p className="text-white/85 text-sm sm:text-[15px] font-mono tracking-wide mb-3 leading-snug">
            Need a high-performance website? Full-stack development or SEO consultation?
          </p>

          {/* Interactive WhatsApp CTA */}
          <div className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-400 via-emerald-400 to-sky-400 text-black font-bold text-sm sm:text-[15px] px-6 py-2.5 rounded-full transition-transform duration-200 group-hover:scale-[1.03] shadow-[0_0_20px_rgba(52,211,153,0.4)]">
            <MessageSquare size={16} className="fill-black" />
            <span>WhatsApp: 03166126926</span>
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>

          {/* Direct click-to-copy button for quick access */}
          <div className="mt-3.5 flex items-center justify-center gap-2 text-[12px] text-cyan-300/70 hover:text-cyan-200 font-mono transition-colors">
            <button
              onClick={handleCopyPhone}
              type="button"
              className="inline-flex items-center gap-1.5 hover:underline focus:outline-none cursor-pointer"
              title="Copy number to clipboard"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied 03166126926 to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Direct Copy: 03166126926</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Developer terminal stamp note with hacker vibe */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-cyan-400/80 uppercase tracking-widest">
          <Terminal size={12} className="text-emerald-400" />
          <span>SEC_ID: ASIFA_PORTAL_CORE</span>
          <span className="text-neutral-700">•</span>
          <span className="text-emerald-400">STATUS: VERIFIED &amp; ENCRYPTED</span>
          <span className="text-neutral-700">•</span>
          <span>PROD VER 2026.10</span>
        </div>
      </main>

      {/* Small Footer: 14px gray */}
      <footer className="relative z-10 w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-2 text-[14px] text-neutral-500 font-mono tracking-wide border-t border-white/5 pt-5">
        <div className="flex items-center gap-2">
          <span>Built October 2026 — </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="text-white/60">Asifa</span>
        </div>

        <div className="text-xs text-neutral-500 font-mono tracking-wider uppercase">
          UCP Bahawalpur Campus Portal
        </div>
      </footer>
    </div>
  );
};
