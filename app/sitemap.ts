import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = 'https://ucp-bahawalpur-campus.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date('2026-10-29T00:00:00+00:00');

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/campus-life`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/campus-facilities`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/programmes`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/faculty`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/fee-structure`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${BASE_URL}/scholarships`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/legacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/calendar`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${BASE_URL}/cnn-academy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.80,
    },
  ];

  const programSlugs = [
    'bs-computer-science', 'bba', 'bs-business-analytics', 'bs-accounting-finance',
    'bs-biotechnology', 'bs-biochemistry', 'bs-chemistry', 'bs-physics',
    'bs-mathematics', 'bs-zoology', 'bs-english', 'bs-psychology',
    'adp-artificial-intelligence', 'adp-software-engineering', 'adp-cyber-security',
    'adp-data-science', 'adp-computer-science', 'adp-business-administration',
    'adp-business-analytics', 'adp-accounting-finance', 'adp-biotechnology',
    'adp-english', 'adp-psychology', 'ads-math-physics', 'ads-zoology-botany-chemistry'
  ];

  const programRoutes: MetadataRoute.Sitemap = programSlugs.map((slug) => ({
    url: `${BASE_URL}/programmes?program=${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.88,
  }));

  const facultyIds = [
    'prof-uzma-zulqurnai', 'dr-abdul-kareem', 'dr-abbas-haider', 'prof-abeer-aslam',
    'dr-mushtaq', 'dr-abdul-raouf', 'dr-m-tahir', 'prof-khizer-hayat', 'prof-ali-shan'
  ];

  const facultyRoutes: MetadataRoute.Sitemap = facultyIds.map((id) => ({
    url: `${BASE_URL}/faculty?id=${id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.82,
  }));

  return [...coreRoutes, ...programRoutes, ...facultyRoutes];
}
