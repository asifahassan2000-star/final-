import React, { useEffect } from 'react';

/**
 * ClickGlowManager handles subtle text and image highlights when clicked,
 * without intrusive circular ripple/ring animations.
 */
export const ClickGlowManager: React.FC = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Check if an image was clicked
      const imgTarget = target.closest('img') || (target.tagName.toLowerCase() === 'img' ? target : null);
      if (imgTarget) {
        imgTarget.classList.remove('img-click-glow');
        void imgTarget.offsetWidth;
        imgTarget.classList.add('img-click-glow');

        setTimeout(() => {
          imgTarget.classList.remove('img-click-glow');
        }, 900);
        return;
      }

      // 2. Check if text was clicked
      const textTags = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'li', 'a', 'b', 'strong', 'em', 'i'];
      const isTextElement = textTags.includes(target.tagName.toLowerCase());
      const closestText = isTextElement ? target : target.closest('p, h1, h2, h3, h4, h5, h6, blockquote, li, span');

      if (closestText) {
        const elem = closestText as HTMLElement;
        elem.classList.remove('text-click-glow');
        void elem.offsetWidth;
        elem.classList.add('text-click-glow');

        setTimeout(() => {
          elem.classList.remove('text-click-glow');
        }, 950);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
};
