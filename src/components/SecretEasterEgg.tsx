import React, { useState, useEffect, useRef } from 'react';

const SECRET_TEXT = "Built & Designed by Asifa — ADP Artificial Intelligence — UCP Bahawalpur —10/2026";

export const SecretEasterEgg: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyBufferRef = useRef<string>('');

  const triggerToast = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setVisible(true);
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  useEffect(() => {
    // Trigger 1: Keyboard — types "asifa" anywhere on site (any page)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (!e.key || e.key.length !== 1) return;

      keyBufferRef.current = (keyBufferRef.current + e.key.toLowerCase()).slice(-10);
      if (keyBufferRef.current.endsWith('asifa')) {
        keyBufferRef.current = '';
        triggerToast();
      }
    };

    // Trigger 2: 5 fast clicks on UCP Logo within 3 seconds
    const handleCustomEvent = () => {
      triggerToast();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('show-ucp-secret-toast', handleCustomEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('show-ucp-secret-toast', handleCustomEvent);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[99999] pointer-events-none select-none transition-all duration-300 ease-out"
    >
      <div className="bg-black/95 text-white text-[12px] font-medium px-4 py-2 rounded-full border border-white/15 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6)] backdrop-blur-md flex items-center gap-2 whitespace-nowrap">
        <span>{SECRET_TEXT}</span>
      </div>
    </div>
  );
};
