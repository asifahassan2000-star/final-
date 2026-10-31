/**
 * Automated Media Optimization Pipeline for UCP Bahawalpur Campus Web App
 * Converts all images to optimized WebP format with responsive sizing,
 * quality compression, and handles video streaming optimizations (WebM/MP4).
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'auto' | 'avif' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  dpr?: number;
}

export interface VideoOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webm' | 'mp4' | 'auto';
}

const IMAGEKIT_HOST = 'ik.imagekit.io';

/**
 * Optimizes an image URL by appending ImageKit transformation directives
 * for WebP format conversion, compression quality, and responsive dimensions.
 */
export function optimizeImageUrl(
  url?: string | null,
  options: ImageOptimizationOptions = {}
): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Only transform ImageKit CDN URLs
  if (!trimmed.includes(IMAGEKIT_HOST)) {
    return trimmed;
  }

  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    dpr
  } = options;

  const transformParts: string[] = [];

  // WebP format conversion
  if (format) {
    transformParts.push(`f-${format}`);
  }

  // Quality compression (80 produces great balance of sharp clarity and tiny payload)
  if (quality) {
    transformParts.push(`q-${quality}`);
  }

  // Responsive width & height
  if (width && width > 0) {
    transformParts.push(`w-${Math.round(width)}`);
  }
  if (height && height > 0) {
    transformParts.push(`h-${Math.round(height)}`);
  }

  // Device pixel ratio
  if (dpr && dpr > 0) {
    transformParts.push(`dpr-${dpr}`);
  }

  if (transformParts.length === 0) {
    return trimmed;
  }

  const transformString = `tr=${transformParts.join(',')}`;

  // If URL already has existing query parameters
  if (trimmed.includes('?')) {
    // If it already has a tr parameter, update or append
    if (trimmed.includes('tr=')) {
      return trimmed.replace(/tr=[^&]+/, transformString);
    }
    return `${trimmed}&${transformString}`;
  }

  return `${trimmed}?${transformString}`;
}

/**
 * Generates responsive srcset string for high-DPI displays and varying viewport sizes.
 */
export function getImageSrcSet(
  url?: string | null,
  widths: number[] = [360, 640, 800, 1080],
  baseOptions: Omit<ImageOptimizationOptions, 'width'> = {}
): string {
  if (!url || typeof url !== 'string' || !url.includes(IMAGEKIT_HOST)) return '';

  return widths
    .map((w) => `${optimizeImageUrl(url, { ...baseOptions, width: w })} ${w}w`)
    .join(', ');
}

/**
 * Optimizes video URLs via ImageKit transformation directives (e.g. WebM/MP4, compression, width).
 */
export function optimizeVideoUrl(
  url?: string | null,
  options: VideoOptimizationOptions = {}
): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  if (!trimmed.includes(IMAGEKIT_HOST)) {
    return trimmed;
  }

  const {
    width,
    height,
    quality = 75,
    format = 'mp4'
  } = options;

  const transformParts: string[] = [];

  if (format) {
    transformParts.push(`f-${format}`);
  }
  if (quality) {
    transformParts.push(`q-${quality}`);
  }
  if (width && width > 0) {
    transformParts.push(`w-${Math.round(width)}`);
  }
  if (height && height > 0) {
    transformParts.push(`h-${Math.round(height)}`);
  }

  if (transformParts.length === 0) return trimmed;

  const transformString = `tr=${transformParts.join(',')}`;

  if (trimmed.includes('?')) {
    if (trimmed.includes('tr=')) {
      return trimmed.replace(/tr=[^&]+/, transformString);
    }
    return `${trimmed}&${transformString}`;
  }

  return `${trimmed}?${transformString}`;
}

/**
 * Returns optimized dual video sources (<source>) for browser compatibility:
 * First WebM (modern ultra-lightweight open video format), followed by MP4.
 */
export function getVideoSources(
  url: string,
  options: VideoOptimizationOptions = {}
): { src: string; type: string }[] {
  if (!url) return [];

  // For ImageKit videos, provide WebM first, then MP4 fallback
  if (url.includes(IMAGEKIT_HOST)) {
    return [
      {
        src: optimizeVideoUrl(url, { ...options, format: 'webm' }),
        type: 'video/webm'
      },
      {
        src: optimizeVideoUrl(url, { ...options, format: 'mp4' }),
        type: 'video/mp4'
      }
    ];
  }

  // Fallback for non-ImageKit URLs
  const isWebm = url.toLowerCase().endsWith('.webm');
  return [
    {
      src: url,
      type: isWebm ? 'video/webm' : 'video/mp4'
    }
  ];
}
