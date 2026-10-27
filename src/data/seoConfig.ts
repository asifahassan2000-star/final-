/**
 * Centralized SEO & Social Metadata Configuration for UCP Bahawalpur Campus
 * Conforms to applet-seo skill specifications, OpenGraph, Twitter Cards & Schema.org JSON-LD standards.
 */

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  ogImageAlt?: string;
  robots?: string;
  schema?: Record<string, any>;
}

export const BASE_SITE_URL = 'https://ucp-bahawalpur-campus.vercel.app';
export const OFFICIAL_DOMAIN = 'https://ucp.edu.pk';
export const SITE_NAME = 'UCP Bahawalpur Campus | University of Central Punjab';
export const DEFAULT_OG_IMAGE = './assets/campus/hero_campus_night_flagship.webp';

export const SEO_PAGES_CONFIG: Record<string, PageSeoConfig> = {
  home: {
    title: 'Constituent College UCP Campus Bahawalpur | UCP Bahawalpur',
    description: 'Official website of Constituent College UCP Campus Bahawalpur (University of Central Punjab BWP). Explore admissions, fee structures, merit scholarships, BS & ADP academic degree programs, faculty, and vibrant campus life in Bahawalpur.',
    keywords: 'constituent college ucp campus bahawalpur, ucp bahawalpur, ucp bwp, ucp bahawalpur campus, university of central punjab bahawalpur, ucp admissions, ucp fee structure, ucp scholarships, best university in bahawalpur',
    canonicalPath: '/',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'UCP Bahawalpur Campus Flagship Building Night Illumination',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollegeOrUniversity',
      name: 'University of Central Punjab Bahawalpur Campus',
      alternateName: ['UCP Bahawalpur', 'UCP BWP', 'Constituent College UCP Campus Bahawalpur'],
      url: BASE_SITE_URL,
      logo: `${BASE_SITE_URL}/assets/ucp-official-logo.png`,
      image: `${BASE_SITE_URL}/assets/campus/hero_campus_night_flagship.webp`,
      description: 'Official UCP Bahawalpur Campus offering recognized undergraduate BS and Associate Degree (ADP) programs.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Main Campus, Baghdad-ul-Jadeed Road',
        addressLocality: 'Bahawalpur',
        addressRegion: 'Punjab',
        postalCode: '63100',
        addressCountry: 'PK',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '29.3544',
        longitude: '71.6918',
      },
      telephone: '+92-62-2889844',
      email: 'info@ucp.edu.pk',
    },
  },

  programmes: {
    title: 'Academic Programmes (BS & ADP) | UCP Bahawalpur Campus',
    description: 'Explore 25+ accredited undergraduate BS and Associate Degree (ADP) programs at UCP Bahawalpur Campus across Computing, Business, Sciences, and Social Sciences.',
    keywords: 'ucp bahawalpur programmes, bs computer science bahawalpur, bba bahawalpur, adp computer science bahawalpur, degree programs ucp bwp',
    canonicalPath: '/#programmes',
    ogType: 'website',
    ogImage: './assets/campus/computer_science_ai_lab.webp',
    ogImageAlt: 'UCP Bahawalpur Computing and Artificial Intelligence Lab',
    robots: 'index, follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'EducationalOccupationalProgram',
      name: 'Degree Programmes at UCP Bahawalpur Campus',
      description: 'Undergraduate BS and Associate Degree programs in Artificial Intelligence, Computer Science, Software Engineering, Business, and Sciences.',
      provider: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Central Punjab Bahawalpur Campus',
        url: BASE_SITE_URL,
      },
    },
  },

  faculty: {
    title: 'Faculty Directory & Professors | UCP Bahawalpur Campus',
    description: 'Meet the distinguished faculty, PhD professors, and academic mentors at UCP Bahawalpur Campus dedicated to cutting-edge research, teaching excellence, and career guidance.',
    keywords: 'ucp bahawalpur faculty, professors ucp bwp, computer science teachers bahawalpur, faculty directory ucp bahawalpur',
    canonicalPath: '/#faculty',
    ogType: 'website',
    ogImage: './assets/campus/faculty_office_mentorship.webp',
    ogImageAlt: 'UCP Bahawalpur Faculty Mentorship and Academic Guidance',
    robots: 'index, follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'UCP Bahawalpur Faculty Directory',
      description: 'Qualified and experienced academic leaders and instructors at UCP Bahawalpur.',
    },
  },

  'campus-life': {
    title: 'Campus Life, Student Societies & Events | UCP Bahawalpur Campus',
    description: 'Experience vibrant campus life at UCP Bahawalpur Campus. Discover 15+ student societies, sports galas, academic hackathons, cultural festivals, and community welfare initiatives.',
    keywords: 'ucp bahawalpur campus life, student societies ucp bwp, sports gala bahawalpur, university events bahawalpur, student club ucp',
    canonicalPath: '/#campus-life',
    ogType: 'website',
    ogImage: './assets/campus/campus_life_sports_quad.webp',
    ogImageAlt: 'UCP Bahawalpur Campus Life and Student Activities',
    robots: 'index, follow',
  },

  scholarships: {
    title: 'Scholarships & Merit Fee Concessions | UCP Bahawalpur Campus',
    description: 'Explore up to 50% merit-based scholarships, 25% PGC alumni concessions, kinship support, and need-based financial aid for undergraduate students at UCP Bahawalpur Campus.',
    keywords: 'ucp bahawalpur scholarships, merit scholarship bahawalpur, pgc alumni fee concession, financial aid ucp bwp',
    canonicalPath: '/#scholarships',
    ogType: 'website',
    ogImage: './assets/campus/convocation_hall_ceremony.webp',
    ogImageAlt: 'UCP Bahawalpur Scholarships and Academic Honors',
    robots: 'index, follow',
  },

  'fee-structure': {
    title: 'Official Fee Structure & Tuition | UCP Bahawalpur Campus',
    description: 'Transparent semester tuition fees, credit hour charges, admission costs, and flexible installment plans for all BS and ADP degree programs at UCP Bahawalpur Campus.',
    keywords: 'ucp bahawalpur fee structure, bs tuition fees bahawalpur, adp fees ucp bwp, university fee installment bahawalpur',
    canonicalPath: '/#fee-structure',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'UCP Bahawalpur Official Tuition Fee Guidelines',
    robots: 'index, follow',
  },

  legacy: {
    title: 'Institutional Legacy & 40-Year Heritage | UCP Bahawalpur Campus',
    description: 'Learn about the four-decade educational excellence of Punjab Group of Colleges (PGC) and the historic foundation of University of Central Punjab Bahawalpur Campus.',
    keywords: 'ucp bahawalpur legacy, punjab group of colleges history, ucp lahore constituent college, pgc education heritage',
    canonicalPath: '/#legacy',
    ogType: 'website',
    ogImage: './assets/campus/historic_founders_hall.webp',
    ogImageAlt: 'UCP Bahawalpur Institutional Heritage and Academic Founders',
    robots: 'index, follow',
  },

  'cnn-academy': {
    title: 'CNN Academy International Partnership | UCP Bahawalpur Campus',
    description: 'UCP Bahawalpur Campus collaboration with CNN Academy, providing journalism, media, and digital communications students global masterclasses and live newsroom training.',
    keywords: 'cnn academy ucp, journalism masterclass bahawalpur, media studies partnership ucp bahawalpur, cnn news training',
    canonicalPath: '/#cnn-academy',
    ogType: 'website',
    ogImage: './assets/campus/broadcast_media_studio.webp',
    ogImageAlt: 'UCP Bahawalpur Broadcast Studio and CNN Academy Partnership',
    robots: 'index, follow',
  },

  calendar: {
    title: 'Official Academic Calendar | UCP Bahawalpur Campus',
    description: 'Fall & Spring academic schedules at UCP Bahawalpur Campus. Important dates for semester enrollment, midterm examinations, final exams, convocation, and student breaks.',
    keywords: 'ucp bahawalpur academic calendar, semester dates ucp bwp, exams schedule bahawalpur, admission deadline ucp',
    canonicalPath: '/#calendar',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'UCP Bahawalpur Academic Calendar and Examination Schedule',
    robots: 'index, follow',
  },

  'campus-facilities': {
    title: 'Campus Facilities, Central Library & Tech Labs | UCP Bahawalpur Campus',
    description: 'Explore the modern purpose-built UCP Bahawalpur Campus: digital research library, high-performance computing labs, sports arena, cafeteria, and air-conditioned shuttle transport.',
    keywords: 'ucp bahawalpur campus facilities, library ucp bwp, computer labs bahawalpur, transport facility ucp bahawalpur',
    canonicalPath: '/campus-facilities',
    ogType: 'website',
    ogImage: './assets/campus/central_library_modern.webp',
    ogImageAlt: 'UCP Bahawalpur Modern Central Library and Study Spaces',
    robots: 'index, follow',
  },

  'about-us': {
    title: 'About Us — Leadership, Vision & Mission | UCP Bahawalpur Campus',
    description: 'Discover UCP Bahawalpur Campus: our leadership council, HEC recognized academic charters, state-of-the-art campus infrastructure, and dedication to South Punjab development.',
    keywords: 'about ucp bahawalpur, ucp bwp vision and mission, university leadership bahawalpur, punjab university constituent campus',
    canonicalPath: '/#about-us',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'UCP Bahawalpur Campus Leadership and Administration',
    robots: 'index, follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About UCP Bahawalpur Campus',
      description: 'Educational history, leadership, accreditations and mission of UCP Bahawalpur Campus.',
    },
  },

  developer: {
    title: 'Developer & Architect — Asifa | UCP Bahawalpur',
    description: 'Developer information and secret portfolio of Asifa — Student of Artificial Intelligence at UCP Bahawalpur and portal architect.',
    keywords: 'developer, builder, asifa, ucp bahawalpur, artificial intelligence, portal architect',
    canonicalPath: '/developer',
    ogType: 'profile',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'Asifa Developer & Portal Architect',
    robots: 'noindex, nofollow',
  },

  asifa: {
    title: 'Asifa — Portal Architect & AI Student | UCP Bahawalpur',
    description: 'Secret portfolio of Asifa — Student of Artificial Intelligence at UCP Bahawalpur and architect of the UCP Bahawalpur portal.',
    keywords: 'asifa, developer, builder, ucp bahawalpur, artificial intelligence, portal architect',
    canonicalPath: '/developer',
    ogType: 'profile',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'Asifa Portal Architect Profile',
    robots: 'noindex, nofollow',
  },
};

