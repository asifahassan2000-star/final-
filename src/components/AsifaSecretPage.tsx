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
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] uppercase tracking-widest text-neutral-400">SYSTEM ARCHITECT</span>
        </div>
      </header>

      {/* Center: Apple-Style Bold Typographic Poster */}
      <main className="relative z-10 w-full max-w-4xl my-auto flex flex-col items-center text-center py-8 sm:py-12">
        {/* Main Title: 80px+ bold Apple-style display */}
        <h1 
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[96px] font-black tracking-[-0.04em] leading-[0.95] text-white uppercase"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro", "Helvetica Neue", sans-serif',
            textShadow: '0 0 60px rgba(255, 255, 255, 0.18)',
          }}
        >
          ASIFA
        </h1>

        {/* Subtitle: 24px white 70% */}
        <p className="mt-4 sm:mt-5 text-lg sm:text-xl md:text-[24px] text-white/70 font-light tracking-[-0.01em] max-w-2xl">
          UCP BWP — ADP Artificial Intelligence — Batch 2025
        </p>

        {/* Line 2: 20px developer identity */}
        <div className="mt-4 sm:mt-5 space-y-1 text-base sm:text-lg md:text-[20px] text-white/90 font-normal leading-relaxed">
          <p className="tracking-tight font-medium text-white">Architect of UCP BWP Campus Portal</p>
          <p className="text-white/60 font-light text-sm sm:text-base md:text-[18px]">Full Stack Developer | AI Student</p>
        </div>

        {/* Contact box: minimal white border */}
        <div 
          onClick={handleWhatsAppClick}
          className="mt-8 sm:mt-10 w-full max-w-md border border-white/20 hover:border-white/70 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 group cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center relative overflow-hidden"
        >
          {/* Subtle hover gleam line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:via-white/70 transition-all duration-500" />

          <p className="text-white/80 text-sm sm:text-[15px] font-light tracking-wide mb-3 leading-snug">
            Need a website? Guidance for building websites?
          </p>

          {/* Interactive WhatsApp CTA */}
          <div className="inline-flex items-center justify-center gap-2.5 bg-white text-black hover:bg-neutral-100 font-semibold text-sm sm:text-[15px] px-5 py-2.5 rounded-full transition-transform duration-200 group-hover:scale-[1.02] shadow-lg">
            <MessageSquare size={16} className="fill-black" />
            <span>WhatsApp: 03166126926</span>
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>

          {/* Direct click-to-copy button for quick access */}
          <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-white/50 hover:text-white transition-colors">
            <button
              onClick={handleCopyPhone}
              type="button"
              className="inline-flex items-center gap-1.5 hover:underline focus:outline-none"
              title="Copy number to clipboard"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied 03166126926!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Click to chat or copy: 03166126926</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Developer terminal stamp note */}
        <div className="mt-8 flex items-center gap-2 text-[11px] font-mono text-neutral-600 uppercase tracking-widest">
          <span>SEC_ID: ASIFA_PORTAL_CORE</span>
          <span>•</span>
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

        <a
          href="https://wa.me/923166126926"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1 underline underline-offset-4"
        >
          wa.me/923166126926
          <ArrowUpRight size={12} />
        </a>
      </footer>
    </div>
  );
};
