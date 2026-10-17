import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number; // duration in ms, default 900ms (fast)
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  threshold?: number;
  retriggerOnView?: boolean; // whether to re-animate each time it enters viewport
}

interface ParsedNumber {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  useGrouping: boolean;
  isValid: boolean;
}

export function parseNumberString(val: string | number, overridePrefix?: string, overrideSuffix?: string, overrideDecimals?: number): ParsedNumber {
  if (typeof val === 'number') {
    return {
      prefix: overridePrefix ?? '',
      target: val,
      suffix: overrideSuffix ?? '',
      decimals: overrideDecimals !== undefined ? overrideDecimals : (val % 1 === 0 ? 0 : 1),
      useGrouping: val >= 1000,
      isValid: true,
    };
  }

  const str = String(val).trim();
  const match = str.match(/^([^\d]*?)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) {
    return {
      prefix: overridePrefix ?? '',
      target: 0,
      suffix: overrideSuffix ?? str,
      decimals: overrideDecimals ?? 0,
      useGrouping: false,
      isValid: false,
    };
  }

  const [, detectedPrefix, numStr, detectedSuffix] = match;
  const cleanNumStr = numStr.replace(/,/g, '');
  const target = parseFloat(cleanNumStr);
  const detectedDecimals = cleanNumStr.includes('.') ? cleanNumStr.split('.')[1].length : 0;
  const useGrouping = numStr.includes(',') || target >= 10000;

  return {
    prefix: overridePrefix ?? detectedPrefix,
    target: isNaN(target) ? 0 : target,
    suffix: overrideSuffix ?? detectedSuffix,
    decimals: overrideDecimals !== undefined ? overrideDecimals : detectedDecimals,
    useGrouping,
    isValid: !isNaN(target),
  };
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  className = '',
  prefix: propPrefix,
  suffix: propSuffix,
  decimals: propDecimals,
  threshold = 0.18,
  retriggerOnView = false,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const parsed = parseNumberString(value, propPrefix, propSuffix, propDecimals);
  const [displayValue, setDisplayValue] = useState<string>(() => {
    // If reduced motion is preferred, render target immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (!parsed.isValid) return String(value);
      const finalNum = parsed.decimals > 0 
        ? parsed.target.toFixed(parsed.decimals) 
        : (parsed.useGrouping ? parsed.target.toLocaleString() : String(parsed.target));
      return `${parsed.prefix}${finalNum}${parsed.suffix}`;
    }
    if (!parsed.isValid) return String(value);
    const initialNum = (0).toFixed(parsed.decimals);
    return `${parsed.prefix}${initialNum}${parsed.suffix}`;
  });

  useEffect(() => {
    if (!parsed.isValid) {
      setDisplayValue(String(value));
      return;
    }

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const finalNum = parsed.decimals > 0 
        ? parsed.target.toFixed(parsed.decimals) 
        : (parsed.useGrouping ? parsed.target.toLocaleString() : String(parsed.target));
      setDisplayValue(`${parsed.prefix}${finalNum}${parsed.suffix}`);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    let animationFrameId: number;
    let startTime: number | null = null;

    const startCountAnimation = () => {
      startTime = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);

        // Smooth institutional cubic ease-out curve (calm and deliberate landing)
        const t = 1 - rawProgress;
        const easeProgress = 1 - t * t * t;
        const currentNumber = easeProgress * parsed.target;

        let formattedNumber: string;
        if (parsed.decimals > 0) {
          formattedNumber = currentNumber.toFixed(parsed.decimals);
        } else {
          const rounded = Math.round(currentNumber);
          formattedNumber = parsed.useGrouping ? rounded.toLocaleString() : String(rounded);
        }

        setDisplayValue(`${parsed.prefix}${formattedNumber}${parsed.suffix}`);

        if (rawProgress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          // Final exact value
          let finalNumber: string;
          if (parsed.decimals > 0) {
            finalNumber = parsed.target.toFixed(parsed.decimals);
          } else {
            finalNumber = parsed.useGrouping ? parsed.target.toLocaleString() : String(parsed.target);
          }
          setDisplayValue(`${parsed.prefix}${finalNumber}${parsed.suffix}`);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCountAnimation();
            if (!retriggerOnView) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value, duration, parsed.target, parsed.prefix, parsed.suffix, parsed.decimals, parsed.useGrouping, parsed.isValid, threshold, retriggerOnView]);

  return (
    <span
      ref={containerRef}
      className={`inline-block tabular-nums ${className}`}
    >
      {displayValue}
    </span>
  );
};
