import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = 'https://ucp-bahawalpur-campus.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date('2026-10-29T00:00:00+00:00'),
      changeFrequency: 'daily',
      priority: 1.0,
      images: [
        `${BASE_URL}/assets/campus/hero_campus_night_flagship.webp`,
        `${BASE_URL}/assets/ucp-official-logo.png`,
      ],
    },
  ];
}
