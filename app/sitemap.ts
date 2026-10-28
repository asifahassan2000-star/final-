import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://asifahassan2000-star.github.io/final';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Core Static & Institutional Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/?page=programmes`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/?page=faculty`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/?page=fee-structure`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${BASE_URL}/?page=scholarships`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${BASE_URL}/?page=campus-life`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${BASE_URL}/?page=legacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/?page=calendar`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${BASE_URL}/?page=cnn-academy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${BASE_URL}/llms.txt`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/llms-full.txt`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.80,
    },
  ];

  // Academic Degree Programs (BS & ADP)
  const programSlugs = [
    'bs-computer-science',
    'bba',
    'bs-business-analytics',
    'bs-accounting-finance',
    'bs-biotechnology',
    'bs-biochemistry',
    'bs-chemistry',
    'bs-physics',
    'bs-mathematics',
    'bs-zoology',
    'bs-english',
    'bs-psychology',
    'adp-artificial-intelligence',
    'adp-software-engineering',
    'adp-cyber-security',
    'adp-data-science',
    'adp-computer-science',
    'adp-business-administration',
    'adp-business-analytics',
    'adp-accounting-finance',
    'adp-biotechnology',
    'adp-english',
    'adp-psychology',
    'ads-math-physics',
    'ads-zoology-botany-chemistry',
  ];

  const programPages: MetadataRoute.Sitemap = programSlugs.map((slug) => ({
    url: `${BASE_URL}/?page=programmes&program=${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.88,
  }));

  // Key Faculty Profiles
  const facultySlugs = [
    'prof-uzma-zulqurnai',
    'dr-abdul-kareem',
    'dr-abbas-haider',
    'prof-abeer-aslam',
    'dr-mushtaq',
    'dr-abdul-raouf',
    'dr-m-tahir',
    'prof-khizer-hayat',
    'prof-ali-shan',
    'prof-malik-allah-rakha',
    'prof-aliya-batool',
    'prof-iqra-shabbir',
    'prof-usman-kazmi',
    'prof-marriam-gill',
    'prof-humra-owj',
    'prof-huzaira-akram',
  ];

  const facultyPages: MetadataRoute.Sitemap = facultySlugs.map((slug) => ({
    url: `${BASE_URL}/?page=faculty&id=${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.82,
  }));

  // Campus Life Signature Events
  const campusLifeEvents: MetadataRoute.Sitemap = [
    'ucp-elite-student-network',
    'village-tour',
    'spring-festival',
    'alumni-reunion-2025',
  ].map((hash) => ({
    url: `${BASE_URL}/?page=campus-life#${hash}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.82,
  }));

  return [...staticPages, ...programPages, ...facultyPages, ...campusLifeEvents];
}
