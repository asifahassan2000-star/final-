import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://asifahassan2000-star.github.io/final';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Bingbot',
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'Applebot-Extended',
          'cohere-ai',
          'OAI-SearchBot',
        ],
        allow: '/',
      },
    ],
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      'https://ucp.edu.pk/sitemap.xml',
    ],
  };
}
