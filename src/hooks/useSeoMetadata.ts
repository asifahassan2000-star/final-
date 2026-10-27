import { useEffect } from 'react';
import {
  SEO_PAGES_CONFIG,
  BASE_SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  PageSeoConfig,
} from '../data/seoConfig';

/**
 * Custom hook to dynamically manage document head SEO tags:
 * - document.title
 * - meta description & keywords
 * - robots (index/noindex)
 * - OpenGraph (title, description, url, image, type, site_name)
 * - Twitter card tags
 * - Canonical link
 * - Route-specific JSON-LD Schema.org structured data
 *
 * @param pageId The identifier of the current active page
 * @param overrides Optional custom SEO overrides for dynamic detail views (e.g., program modal or article)
 */
export function useSeoMetadata(pageId: string, overrides?: Partial<PageSeoConfig>): PageSeoConfig {
  const baseConfig = SEO_PAGES_CONFIG[pageId] || SEO_PAGES_CONFIG.home;
  const config: PageSeoConfig = {
    ...baseConfig,
    ...overrides,
  };

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // 1. Update Document Title
    document.title = config.title;

    // Helper: Find or create standard <meta name="..."> tag
    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper: Find or create standard <meta property="..."> tag for OpenGraph
    const setPropertyTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Description & Keywords
    setMetaTag('description', config.description);
    if (config.keywords) {
      setMetaTag('keywords', config.keywords);
    }

    // 3. Robots directive (e.g. noindex for secret route)
    const robotsContent = config.robots || 'index, follow';
    setMetaTag('robots', robotsContent);

    // 4. Canonical URL resolution
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const origin = window.location.origin && window.location.origin !== 'null'
      ? window.location.origin
      : BASE_SITE_URL;
    const cleanPath = config.canonicalPath.startsWith('/')
      ? config.canonicalPath
      : `/${config.canonicalPath}`;
    const fullCanonicalUrl = `${origin}${cleanPath === '/' ? '' : cleanPath}`;
    canonical.setAttribute('href', fullCanonicalUrl);

    // 5. OpenGraph Tags
    setPropertyTag('og:site_name', SITE_NAME);
    setPropertyTag('og:title', config.title);
    setPropertyTag('og:description', config.description);
    setPropertyTag('og:type', config.ogType || 'website');
    setPropertyTag('og:url', fullCanonicalUrl);

    const ogImg = config.ogImage || DEFAULT_OG_IMAGE;
    const resolvedOgImg = ogImg.startsWith('http')
      ? ogImg
      : `${origin}${ogImg.startsWith('.') ? ogImg.slice(1) : ogImg.startsWith('/') ? ogImg : `/${ogImg}`}`;
    setPropertyTag('og:image', resolvedOgImg);
    if (config.ogImageAlt) {
      setPropertyTag('og:image:alt', config.ogImageAlt);
    }

    // 6. Twitter Card Tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', config.title);
    setMetaTag('twitter:description', config.description);
    setMetaTag('twitter:image', resolvedOgImg);
    if (config.ogImageAlt) {
      setMetaTag('twitter:image:alt', config.ogImageAlt);
    }

    // 7. Route-specific Schema.org JSON-LD Script
    const SCRIPT_ID = 'ucp-route-dynamic-schema';
    let scriptElement = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (config.schema) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = SCRIPT_ID;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.text = JSON.stringify(config.schema);
    } else if (scriptElement) {
      scriptElement.remove();
    }
  }, [
    config.title,
    config.description,
    config.keywords,
    config.canonicalPath,
    config.ogType,
    config.ogImage,
    config.ogImageAlt,
    config.robots,
    JSON.stringify(config.schema),
  ]);

  return config;
}
