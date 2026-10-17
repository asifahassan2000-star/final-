import React, { useEffect, useRef } from 'react';

export type RevealVariant = 'heading' | 'text' | 'image' | 'card' | 'fade-up';

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: RevealVariant;
  delay?: number; // in milliseconds
  staggerIndex?: number;
  staggerBase?: number;
  staggerInterval?: number;
  children: React.ReactNode;
}

/**
 * ScrollRevealManager:
 * A lightweight, high-performance observer singleton that activates
 * scroll-reveal animations across all [data-reveal] elements on the page.
 * 
 * - Single shared IntersectionObserver instance (GPU compositor friendly)
 * - Triggers at 15% viewport entrance
 * - Runs strictly ONCE per element (unobserves immediately upon reveal)
 * - Safe progressive enhancement (elements remain 100% visible if JS fails)
 * - Strict compliance with prefers-reduced-motion
 * - Auto-detects newly mounted items (page transitions, tab switches) via MutationObserver
 */
export const ScrollRevealManager: React.FC = () => {
  useEffect(() => {
    // 1. Accessibility & Mobile Check: If touch/mobile or prefers reduced motion, reveal everything immediately
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024);
    
    if (motionQuery.matches || isTouch) {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
        el.setAttribute('data-revealed', 'true');
      });
      return;
    }

    // 2. Mark document ready for progressive enhancement
    document.documentElement.classList.add('reveal-ready');

    // 3. Create single shared IntersectionObserver with proactive trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('is-revealed');
            target.setAttribute('data-revealed', 'true');
            // Strict rule: Animate only once
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.01, // Triggers immediately as element enters proximity
        rootMargin: '160px 0px 80px 0px', // Pre-triggers ahead of viewport so content is already present
      }
    );

    // 4. Function to scan and observe all unrevealed elements
    const observeAll = () => {
      const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)');
      elements.forEach((el) => {
        // Any image or element in proximity reveals immediately without waiting
        if (el.getAttribute('data-reveal') === 'image') {
          el.classList.add('is-revealed');
          el.setAttribute('data-revealed', 'true');
          return;
        }

        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 1.15) {
          // In immediate or proximate viewport
          el.classList.add('is-revealed');
          el.setAttribute('data-revealed', 'true');
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial scan
    observeAll();

    // 5. Lightweight debounced MutationObserver for dynamic page switches / tabs
    let timeoutId: number | null = null;
    const mutationObserver = new MutationObserver(() => {
      if (timeoutId) cancelAnimationFrame(timeoutId);
      timeoutId = requestAnimationFrame(() => {
        observeAll();
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 6. Cleanup
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      if (timeoutId) cancelAnimationFrame(timeoutId);
    };
  }, []);

  return null;
};

/**
 * Reusable ScrollReveal wrapper component
 * Can be used as a JSX wrapper or direct data attributes.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  as: Component = 'div',
  variant = 'fade-up',
  delay,
  staggerIndex,
  staggerBase = 0,
  staggerInterval = 30,
  className = '',
  style,
  children,
  ...rest
}) => {
  // Compute delay: if staggerIndex is supplied, calculate sequential stagger
  let computedDelay = delay;
  if (computedDelay === undefined && staggerIndex !== undefined) {
    computedDelay = staggerBase + staggerIndex * staggerInterval;
  }

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(computedDelay !== undefined ? { transitionDelay: `${computedDelay}ms` } : {}),
  };

  return (
    <Component
      data-reveal={variant}
      data-reveal-delay={computedDelay}
      style={combinedStyle}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
};
