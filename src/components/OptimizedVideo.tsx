import React, { useRef, useState, useEffect } from 'react';
import { optimizeVideoUrl, optimizeImageUrl, getVideoSources, VideoOptimizationOptions } from '../utils/mediaOptimizer';

export interface OptimizedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  quality?: number;
  lazy?: boolean;
}

export const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  poster,
  width,
  height,
  quality = 75,
  lazy = true,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  className = '',
  preload = 'metadata',
  ...rest
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(!lazy);

  useEffect(() => {
    if (!lazy) return;

    const currentEl = videoRef.current;
    if (!currentEl) return;

    // Use IntersectionObserver with 200px rootMargin to start loading before user scrolls into it
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [lazy]);

  const videoOptions: VideoOptimizationOptions = {
    width,
    height,
    quality
  };

  const sources = getVideoSources(src, videoOptions);
  const optimizedPoster = poster
    ? optimizeImageUrl(poster, { format: 'webp', quality: 80, width: width || 1280 })
    : undefined;

  return (
    <video
      ref={videoRef}
      poster={optimizedPoster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      controls={controls}
      preload={preload}
      className={className}
      {...rest}
    >
      {isInView && (
        <>
          {sources.map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))}
          {/* Direct optimized mp4 fallback if browser doesn't match sources */}
          Your browser does not support the video tag.
        </>
      )}
    </video>
  );
};
