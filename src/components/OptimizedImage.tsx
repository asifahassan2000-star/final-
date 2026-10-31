import React, { useState } from 'react';
import { optimizeImageUrl, getImageSrcSet, ImageOptimizationOptions } from '../utils/mediaOptimizer';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'auto' | 'avif' | 'jpeg' | 'png';
  responsive?: boolean;
  widths?: number[];
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  fallbackSrc,
  width,
  height,
  quality = 80,
  format = 'webp',
  responsive = false,
  widths,
  loading = 'lazy',
  decoding = 'async',
  alt = '',
  className = '',
  style,
  onError,
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(() =>
    optimizeImageUrl(src, { width, height, quality, format })
  );
  const [hasError, setHasError] = useState(false);

  // Update src when prop changes
  React.useEffect(() => {
    setCurrentSrc(optimizeImageUrl(src, { width, height, quality, format }));
    setHasError(false);
  }, [src, width, height, quality, format]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    } else if (!hasError && currentSrc !== src) {
      // Try raw unoptimized src as secondary fallback
      setHasError(true);
      setCurrentSrc(src);
    }
    if (onError) onError(e);
  };

  const srcSet = responsive && !hasError
    ? getImageSrcSet(src, widths, { quality, format })
    : undefined;

  return (
    <img
      src={currentSrc}
      srcSet={srcSet}
      alt={alt}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      className={className}
      style={style}
      {...rest}
    />
  );
};
