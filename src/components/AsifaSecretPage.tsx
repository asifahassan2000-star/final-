import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface AsifaSecretPageProps {
  onBackToHome?: () => void;
}

const SIDE_LOGS_LEFT = [
  'root@asifa:~# scanning...',
  'root@asifa:~# init_probe --port 443',
  'root@asifa:~# socket_connected ucp.edu.pk',
  'root@asifa:~# latency: 13ms // 0% loss',
  'root@asifa:~# verify TLS_AES_256_GCM',
  'root@asifa:~# sitemap.xml crawler active',
  'root@asifa:~# indexing meta canonicals',
  'root@asifa:~# scanning buffer overflows...',
  'root@asifa:~# 0 anomalies registered',
  'root@asifa:~# route LHE-ISB accelerated',
  'root@asifa:~# sys_integrity = 99.8%',
  'root@asifa:~# ddos_shield: running',
  'root@asifa:~# rootkit scan: clean',
  'root@asifa:~# packet stream verified',
  'root@asifa:~# memory footprint: 28MB',
  'root@asifa:~# telemetry heartbeat 200 OK',
];

const SIDE_LOGS_RIGHT = [
  'status: monitor_active',
  'pkts_scanned: 284,920',
  'ddos_guard: active_mitigation',
  'quic_stream_id: 0x4a9b',
  'edge_node: LHE-ISB-PK',
  'audit_score: 100/100',
  'schema_type: EducationalOrg',
  'meta_robots: noindex,nofollow',
  'payload_filter: 0 injections',
  'threat_level: 0_nominal',
  'cpu_governor: performance',
  'integrity_daemon: pid_8812',
  'syn_cookies: enabled',
  'root@asifa:~# loop_completed',
  'root@asifa:~# scanning next sector...',
  'root@asifa:~# handshake encrypted',
];

export const AsifaSecretPage: React.FC<AsifaSecretPageProps> = ({ onBackToHome }) => {
  const [copied, setCopied] = useState(false);
  const [bars, setBars] = useState([14, 20, 10, 18, 12]);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Matrix Code Rain Canvas (Low CPU, requestAnimationFrame, 30 FPS cap)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // 30 FPS for minimal CPU usage

    const chars = ['0', '1', '{', '}', '<', '>', '/', '\\', '|', '-', ':', ';', '*', '$', '#', '[', ']'];
    const fontSize = 15;
    let columns = 0;
    let drops: number[] = [];

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -35));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.982) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Subtle live fluctuation for HUD spectrum bars
  useEffect(() => {
    const interval = setInterval(() => {
      setBars([
        Math.floor(Math.random() * 12) + 8,
        Math.floor(Math.random() * 14) + 10,
        Math.floor(Math.random() * 10) + 6,
        Math.floor(Math.random() * 16) + 8,
        Math.floor(Math.random() * 12) + 7,
      ]);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

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

    window.scrollTo({ top: 0, behavior: 'instant' });

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

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText('03166126926');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/923166126926', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      className="relative min-h-screen w-full bg-[#000000] text-white flex flex-col justify-between items-center px-4 sm:px-6 md:px-12 py-6 sm:py-8 select-none overflow-x-hidden font-sans"
    >
      {/* Interactive Cursor Light Glow Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full z-[4] transition-opacity duration-150"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle, rgba(0, 255, 65, 0.12) 0%, rgba(0, 240, 255, 0.04) 40%, transparent 70%)',
        }}
      />
      {/* Keyframe animations */}
      <style>{`
        @keyframes hackerLaserScan {
          0% {
            top: -80px;
            opacity: 0;
          }
          3% {
            opacity: 1;
          }
          97% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        @keyframes sideCodeScrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>

      {/* 1. Matrix Code Rain Canvas (Opacity 0.15) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 w-full h-full z-0"
        style={{ opacity: 0.15 }}
      />

      {/* 2. Radiation Scanning Laser Line: 2px core #00FF41 + 80px tall gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 right-0 z-[2]"
        style={{
          height: '80px',
          animation: 'hackerLaserScan 8s linear infinite',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 255, 65, 0.2) 50%, transparent 100%)',
        }}
      >
        <div
          className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-[#00FF41]"
          style={{
            boxShadow: '0 0 30px #00FF41, 0 0 60px #00FF41',
          }}
        />
      </div>

      {/* 3. Subtle Green Grid Overlay (1px green grid every 40px, opacity 0.03) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          opacity: 0.03,
          backgroundImage: `linear-gradient(to right, #00FF41 1px, transparent 1px), linear-gradient(to bottom, #00FF41 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 4. Side Panels Effect: Left and right faint scrolling code columns */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 bottom-0 left-2 sm:left-4 w-44 z-[3] hidden lg:block overflow-hidden font-mono text-[10px] leading-relaxed text-[#00FF41] select-none"
        style={{ opacity: 0.08 }}
      >
        <div
          className="space-y-2 py-4"
          style={{ animation: 'sideCodeScrollUp 22s linear infinite' }}
        >
          {[...SIDE_LOGS_LEFT, ...SIDE_LOGS_LEFT].map((line, idx) => (
            <div key={idx} className="truncate tracking-wider">{line}</div>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 bottom-0 right-2 sm:right-4 w-44 z-[3] hidden lg:block overflow-hidden font-mono text-[10px] leading-relaxed text-[#00FF41] text-right select-none"
        style={{ opacity: 0.08 }}
      >
        <div
          className="space-y-2 py-4"
          style={{ animation: 'sideCodeScrollUp 25s linear infinite reverse' }}
        >
          {[...SIDE_LOGS_RIGHT, ...SIDE_LOGS_RIGHT].map((line, idx) => (
            <div key={idx} className="truncate tracking-wider">{line}</div>
          ))}
        </div>
      </div>

      {/* Top Bar: Minimal Discreet Status */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between text-[11px] font-mono text-[#888888]">
        {onBackToHome ? (
          <button
            onClick={onBackToHome}
            className="group flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer focus:outline-none"
            title="Return to UCP Bahawalpur Portal"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span className="tracking-wider">ucp.edu.pk</span>
          </button>
        ) : (
          <div className="flex items-center gap-1 text-[#666666]">
            <span>root@asifa:~#</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00FF41]" />
          <span className="text-[#888888] font-mono text-[10px] tracking-widest uppercase">SEC_01 // ACTIVE</span>
        </div>
      </header>

      {/* Center: Minimal Elite Terminal Layout */}
      <main className="relative z-10 w-full max-w-xl my-auto flex flex-col items-center text-center py-6">
        
        {/* Minimal Elite HUD Console - Completely Borderless, Pure Terminal Presentation */}
        <div className="w-full bg-black/75 backdrop-blur-md p-6 sm:p-8 flex flex-col items-center text-center select-none border-0 shadow-none">
          
          {/* 1. TOP CONTENT - Minimal Elite */}
          {/* ASIFA: font-black, size 64px, tracking-tight, white, shiny luminous drop shadow */}
          <h1 
            className="text-[64px] font-black tracking-tight leading-none bg-gradient-to-b from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent select-none transition-all duration-300"
            style={{
              filter: 'drop-shadow(0 0 16px rgba(255, 255, 255, 0.75)) drop-shadow(0 0 35px rgba(0, 255, 65, 0.45))',
            }}
          >
            ASIFA
          </h1>

          {/* All other text SMALL 11px monospace #888888 */}
          <div className="mt-3.5 space-y-1 font-mono text-[11px] text-[#888888] font-normal tracking-wide">
            <p>UCP BWP — AI — Batch 2025</p>
            <p>root@asifa Architect of UCP Portal</p>
          </div>

          {/* Tags: Full-Stack / SEO / Cyber Defense - tiny pills 10px, bg #111, border #222, glowy on hover */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="font-mono text-[10px] text-[#888888] font-normal bg-[#111111] border border-[#222222] px-2.5 py-0.5 rounded-full transition-all duration-200 cursor-pointer hover:text-[#00FF41] hover:border-[#00FF41]/80 hover:shadow-[0_0_15px_rgba(0,255,65,0.7)] hover:bg-[#00FF41]/10">
              Full-Stack
            </span>
            <span className="font-mono text-[10px] text-[#888888] font-normal bg-[#111111] border border-[#222222] px-2.5 py-0.5 rounded-full transition-all duration-200 cursor-pointer hover:text-[#00FF41] hover:border-[#00FF41]/80 hover:shadow-[0_0_15px_rgba(0,255,65,0.7)] hover:bg-[#00FF41]/10">
              SEO
            </span>
            <span className="font-mono text-[10px] text-[#888888] font-normal bg-[#111111] border border-[#222222] px-2.5 py-0.5 rounded-full transition-all duration-200 cursor-pointer hover:text-[#00FF41] hover:border-[#00FF41]/80 hover:shadow-[0_0_15px_rgba(0,255,65,0.7)] hover:bg-[#00FF41]/10">
              Cyber Defense
            </span>
          </div>

          {/* 2. THREE ABSTRACT HACKER GRAPHS (HUD elements: floating, no background, no border, opacity 0.9) */}
          <div className="my-8 flex items-center justify-center gap-7 sm:gap-10 opacity-90 select-none">
            
            {/* Graph 1 (SEO): Minimal waveform line, 80px wide, green stroke 1px, label SIG_01 99.8% in 9px */}
            <div className="flex flex-col items-center gap-2">
              <svg width="80" height="24" viewBox="0 0 80 24" fill="none" className="overflow-visible">
                <path
                  d="M0,12 L18,12 L22,4 L27,20 L32,8 L37,16 L42,12 L80,12"
                  stroke="#00FF41"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-mono text-[9px] text-[#888888] tracking-widest uppercase">SIG_01 99.8%</span>
            </div>

            {/* Graph 2 (Firewall): Hexagonal radar / honeycomb dots, pulsing center, label SHIELD_ACTIVE */}
            <div className="flex flex-col items-center gap-2">
              <svg width="36" height="24" viewBox="0 0 36 24" fill="none" className="overflow-visible">
                <polygon
                  points="18,1 34,6 34,18 18,23 2,18 2,6"
                  stroke="#00FF41"
                  strokeWidth="0.8"
                  strokeOpacity="0.5"
                  fill="none"
                />
                <circle cx="10" cy="12" r="0.9" fill="#00FF41" fillOpacity="0.4" />
                <circle cx="26" cy="12" r="0.9" fill="#00FF41" fillOpacity="0.4" />
                <circle cx="18" cy="12" r="2" fill="#00FF41" className="animate-pulse" />
              </svg>
              <span className="font-mono text-[9px] text-[#888888] tracking-widest uppercase">SHIELD_ACTIVE</span>
            </div>

            {/* Graph 3 (Latency): Vertical signal bars like audio spectrum, 5 bars random height, cyan */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-end gap-1 h-[24px]">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-[#00f0ff] rounded-none transition-all duration-300"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
              <span className="font-mono text-[9px] text-[#888888] tracking-widest uppercase">LAT_13MS</span>
            </div>

          </div>

          {/* Minimal Stealth Contact: Monospace terminal style, no AI cards */}
          <div className="flex flex-col items-center gap-2.5">
            <button
              onClick={handleWhatsAppClick}
              className="group font-mono text-[11px] text-[#888888] hover:text-[#00FF41] transition-colors cursor-pointer flex items-center gap-2 bg-[#0c0c0c] border border-[#222222] hover:border-[#00FF41]/40 px-3.5 py-1.5 rounded"
            >
              <span className="text-[#00FF41]">&gt;</span>
              <span>contact: wa.me/923166126926</span>
              <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={handleCopyPhone}
              type="button"
              className="font-mono text-[10px] text-[#555555] hover:text-[#888888] transition-colors cursor-pointer"
            >
              {copied ? '[copied 03166126926]' : '[copy: 03166126926]'}
            </button>
          </div>

          {/* Minimalist terminal stamp */}
          <div className="mt-6 font-mono text-[9px] text-[#333333] tracking-widest uppercase">
            sec_id: asifa_core // 2026.10
          </div>

        </div>
      </main>

      {/* Small Minimalist Footer: 11px gray */}
      <footer className="relative z-10 w-full max-w-4xl flex items-center justify-between text-[11px] text-[#444444] font-mono border-t border-[#141414] pt-3">
        <div>Built October 2026 — Asifa</div>
        <div className="uppercase tracking-wider text-[10px] text-[#333333]">UCP Bahawalpur</div>
      </footer>
    </div>
  );
};
