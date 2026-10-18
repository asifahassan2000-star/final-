import React, { useEffect } from 'react';
import { SCROLL_ANIMATION } from '../utils/scrollAnimation';

export type RevealVariant = 'heading' | 'paragraph' | 'text' | 'image' | 'card' | 'fade-up' | 'label';

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
 * A lightweight, high-performance IntersectionObserver singleton that activates
 * smooth scroll-reveal animations across all [data-reveal] elements on the page.
 * 
 * Animation Specifications:
 * - Movement: 28–36px upward (32px standard)
 * - Duration: 700–850ms (780ms standard)
 * - Easing: Smooth cubic-bezier(0.22, 1, 0.36, 1)
 * - Opacity: Fade from 0 to 1 alongside movement
 * - Trigger: Start when element enters ~85% of viewport height (rootMargin: '0px 0px -15% 0px')
 * - Stagger: 100–140ms (120ms standard) between separate headings, paragraphs, or content blocks
 * - Text grouping: Animate each complete heading or paragraph as one unit, never line by line
 * - Repeat: Strictly play ONCE per page visit (unobserves immediately upon reveal)
 * - Performance: GPU-accelerated transform and opacity; no layout shifts
 * - Reduced motion: Complete respect for prefers-reduced-motion
 * - Universal: Smooth and glitch-free across desktop and mobile
 */
export const ScrollRevealManager: React.FC = () => {
  useEffect(() => {
    // 1. Accessibility Check: If user prefers reduced motion, reveal everything immediately
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (motionQuery.matches) {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
        el.setAttribute('data-revealed', 'true');
      });
      return;
    }

    // 2. Mark document ready for progressive enhancement
    document.documentElement.classList.add('reveal-ready');

    // 3. Create IntersectionObserver triggering when element enters ~85% of viewport height
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('is-revealed');
            target.setAttribute('data-revealed', 'true');
            // Strict rule: Animate only once per page visit
            observer.unobserve(target);
          }
        });
      },
      {
        root: null,
        // -15% at bottom ensures trigger activates when element enters ~85% of viewport height
        rootMargin: SCROLL_ANIMATION.viewport.margin,
        threshold: 0,
      }
    );

    // 4. Function to scan and observe all unrevealed elements
    const observeAll = () => {
      const viewportTriggerLine = window.innerHeight * 0.85;
      const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)');
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already above or within 85% viewport (e.g. initial view above fold)
        if (rect.top <= viewportTriggerLine) {
          el.classList.add('is-revealed');
          el.setAttribute('data-revealed', 'true');
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial scan on mount
    observeAll();

    // 5. Lightweight debounced MutationObserver for dynamic page transitions & tab changes
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

    // 6. Cleanup on unmount
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
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  as: Component = 'div',
  variant = 'fade-up',
  delay,
  staggerIndex,
  staggerBase = 0,
  staggerInterval = SCROLL_ANIMATION.staggerMs,
  className = '',
  style,
  children,
  ...rest
}) => {
  // Compute delay: if staggerIndex is supplied, calculate sequential stagger (120ms intervals)
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
