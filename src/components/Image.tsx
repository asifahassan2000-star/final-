import React, { useState } from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  unoptimized?: boolean;
  onLoadingComplete?: (img: HTMLImageElement) => void;
  fallbackSrc?: string;
}

/**
 * Next.js-compatible Image component
 * Provides high-performance responsive image optimization,
 * native lazy-loading, priority preloading, and robust error fallback.
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className = '',
  style,
  loading,
  fallbackSrc = '/assets/campus/student-classroom-presentation-1.jpg',
  onError,
  onLoad,
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // In Next.js image specs: priority implies eager loading and high fetch priority
  const computedLoading = priority ? 'eager' : (loading || 'lazy');
  // Use HTML fetchpriority attribute
  const fetchPriority = priority ? 'high' : 'auto';

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
    if (onError) onError(e);
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  if (fill) {
    return (
      <img
        src={currentSrc}
        alt={alt}
        sizes={sizes}
        loading={computedLoading}
        // @ts-ignore
        fetchpriority={fetchPriority}
        decoding="async"
        onError={handleError}
        onLoad={handleLoad}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-90'
        } ${className}`}
        style={{
          ...style,
        }}
        {...rest}
      />
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={computedLoading}
      // @ts-ignore
      fetchpriority={fetchPriority}
      decoding="async"
      onError={handleError}
      onLoad={handleLoad}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-95'} ${className}`}
      style={style}
      {...rest}
    />
  );
};

export default Image;
