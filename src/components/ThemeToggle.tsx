import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'header' | 'topbar' | 'drawer' | 'floating';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'header', className = '' }) => {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();

  if (variant === 'topbar') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-slate-700/60 ${className}`}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
        aria-label={`Toggle theme (currently ${theme})`}
      >
        {isDark ? (
          <>
            <Sun size={12} className="text-amber-300 animate-spin-slow" />
            <span className="hidden sm:inline">Light Mode</span>
          </>
        ) : (
          <>
            <Moon size={12} className="text-sky-300" />
            <span className="hidden sm:inline">Dark Mode</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'drawer') {
    return (
      <div className={`pt-2 border-t border-slate-700/60 ${className}`}>
        <div className="flex items-center justify-between text-xs text-slate-300 mb-2 font-medium">
          <span>Appearance Mode</span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
            {isDark ? '🌙 Dark Active' : '☀️ Light Active'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 bg-slate-900/60 p-1 rounded-lg border border-slate-700/70">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-medium transition-all ${
              !isDark
                ? 'bg-white text-slate-900 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sun size={14} className={!isDark ? 'text-amber-500' : 'text-slate-400'} />
            <span>Light</span>
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-medium transition-all ${
              isDark
                ? 'bg-[#1e293b] text-amber-300 shadow-md font-semibold border border-amber-400/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Moon size={14} className={isDark ? 'text-amber-300' : 'text-slate-400'} />
            <span>Dark</span>
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`fixed bottom-6 left-6 z-40 p-3 rounded-full bg-[#0a192f] text-slate-100 dark:bg-[#152542] dark:text-amber-300 border border-slate-700 dark:border-amber-400/40 shadow-2xl shadow-black/50 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center group ${className}`}
        title={`Click to switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        aria-label={`Toggle Theme (${theme})`}
      >
        {isDark ? (
          <Sun size={18} className="text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Moon size={18} className="text-sky-300 group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </button>
    );
  }

  // Default: Header Official university icon button
  return (
    <button
      id="theme-toggle-header-btn"
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all duration-200 flex items-center justify-center focus:outline-none cursor-pointer border border-white/10 hover:border-white/20 shadow-xs ${className}`}
      title={isDark ? 'Switch to Light Mode (☀️)' : 'Switch to Dark Mode (🌙)'}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? (
        <Sun size={17} className="text-amber-300 hover:text-amber-200 transition-transform duration-300 rotate-0 hover:rotate-90" />
      ) : (
        <Moon size={17} className="text-slate-200 hover:text-amber-200 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
