/**
 * Shared Scroll Animation Specifications
 * Strict adherence to design constraints:
 * - Movement: 28–36px upward (32px standard)
 * - Duration: 700–850ms (780ms standard)
 * - Easing: Smooth cubic-bezier(0.22, 1, 0.36, 1)
 * - Opacity: Fade from 0 to 1 alongside movement
 * - Trigger: Start when element enters ~85% of viewport height (rootMargin: '0px 0px -15% 0px')
 * - Stagger: 100–140ms (120ms standard) between separate headings, paragraphs, or content blocks
 * - Text grouping: Animate each complete heading or paragraph as one unit, never line by line
 * - Repeat: Play once per page visit (once: true); avoid distracting replays while scrolling
 * - Performance: Use transform and opacity; avoid layout shifts
 * - Reduced motion: Fully respect prefers-reduced-motion
 */

export const SCROLL_ANIMATION = {
  movementY: 32,
  duration: 0.78,
  durationMs: 780,
  ease: [0.22, 1, 0.36, 1] as const,
  easeCss: 'cubic-bezier(0.22, 1, 0.36, 1)',
  stagger: 0.12,
  staggerMs: 120,
  viewport: {
    once: true,
    margin: '0px 0px -15% 0px',
  },
};

/**
 * Standard Framer Motion variants for scroll entrance
 */
export const scrollFadeUpUnit = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: [0.22, 1, 0.36, 1],
      delay: customDelay,
    },
  }),
};

/**
 * Standard Framer Motion viewport options
 */
export const scrollViewportOnce = {
  once: true,
  margin: '0px 0px -15% 0px' as const,
};
