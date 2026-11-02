import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = 'https://ucp-bahawalpur-campus.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/developer', '/asifa', '/api/'],
      },
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Bingbot',
          'Applebot',
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
      `${BASE_URL}/sitemap-ucp.xml`,
    ],
  };
}
