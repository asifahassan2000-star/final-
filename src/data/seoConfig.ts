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
export const DEFAULT_OG_IMAGE = 'https://ucp-bahawalpur-campus.vercel.app/assets/campus/hero_campus_night_flagship.webp';

export const SEO_PAGES_CONFIG: Record<string, PageSeoConfig> = {
  home: {
    title: 'UCP Bahawalpur Campus | University of Central Punjab',
    description: 'Explore the University of Central Punjab (UCP) Bahawalpur Campus, including academic programs, admissions, fee structure, campus facilities, student life and contact information.',
    keywords: 'ucp bahawalpur campus, ucp bwp, university of central punjab bahawalpur, ucp admissions, ucp fee structure, ucp scholarships, constituent college ucp campus bahawalpur, bs computer science bahawalpur, adp artificial intelligence bahawalpur, best university in bahawalpur',
    canonicalPath: '/',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'UCP Bahawalpur Campus Flagship Building Night Illumination',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['CollegeOrUniversity', 'EducationalOrganization'],
          '@id': `${BASE_SITE_URL}/#university`,
          name: 'University of Central Punjab Bahawalpur Campus',
          legalName: 'University of Central Punjab Bahawalpur Campus',
          alternateName: [
            'UCP Bahawalpur',
            'UCP Bahawalpur Campus',
            'UCP BWP',
            'Constituent College UCP Campus Bahawalpur',
            'University of Central Punjab Bahawalpur'
          ],
          url: BASE_SITE_URL,
          logo: `${BASE_SITE_URL}/assets/ucp-official-logo.png`,
          image: DEFAULT_OG_IMAGE,
          description: 'Official UCP Bahawalpur Campus (Constituent College) offering HEC-recognized undergraduate BS and Associate Degree (ADP) programs under the University of Central Punjab and Punjab Group of Colleges.',
          parentOrganization: {
            '@type': 'CollegeOrUniversity',
            name: 'University of Central Punjab',
            alternateName: 'UCP Lahore',
            url: 'https://ucp.edu.pk',
            parentOrganization: {
              '@type': 'EducationalOrganization',
              name: 'Punjab Group of Colleges',
              alternateName: 'PGC',
              url: 'https://pgc.edu'
            }
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Constituent College, UCP Campus, Airport Road',
            addressLocality: 'Bahawalpur',
            addressRegion: 'Punjab',
            postalCode: '63100',
            addressCountry: 'PK'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '29.3544',
            longitude: '71.6918'
          },
          telephone: '+92-62-2202030',
          email: 'Principal.bahawalpur@ucp.edu.pk',
          sameAs: [
            'https://www.facebook.com/profile.php?id=61583228356324',
            'https://maps.app.goo.gl/ud9Sz3ZLR7zt9aiT7',
            'https://ucp.edu.pk'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': `${BASE_SITE_URL}/#website`,
          url: BASE_SITE_URL,
          name: 'UCP Bahawalpur Campus | University of Central Punjab',
          publisher: {
            '@id': `${BASE_SITE_URL}/#university`
          },
          inLanguage: 'en-PK'
        }
      ]
    }
  },

  programmes: {
    title: 'Academic Programmes (BS & ADP) | UCP Bahawalpur Campus',
    description: 'Explore accredited undergraduate BS and Associate Degree (ADP) programs at UCP Bahawalpur Campus across Computing, Business, Sciences, and Social Sciences.',
    keywords: 'ucp bahawalpur programmes, bs computer science bahawalpur, bba bahawalpur, adp computer science bahawalpur, degree programs ucp bwp, artificial intelligence bahawalpur',
    canonicalPath: '/programmes',
    ogType: 'website',
    ogImage: `${BASE_SITE_URL}/assets/campus/computer_science_ai_lab.webp`,
    ogImageAlt: 'UCP Bahawalpur Computing and Artificial Intelligence Lab',
    robots: 'index, follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_SITE_URL}/programmes#webpage`,
      name: 'Academic Programmes (BS & ADP) | UCP Bahawalpur Campus',
      url: `${BASE_SITE_URL}/programmes`,
      description: 'Undergraduate BS and Associate Degree programs in Artificial Intelligence, Computer Science, Software Engineering, Business, and Sciences at UCP Bahawalpur Campus.',
      isPartOf: {
        '@id': `${BASE_SITE_URL}/#website`
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Academic Programmes', item: `${BASE_SITE_URL}/programmes` }
        ]
      },
      mainEntity: {
        '@type': 'ItemList',
        name: 'Degree Programmes Offered at UCP Bahawalpur Campus',
        itemListElement: [
          {
            '@type': 'EducationalOccupationalProgram',
            name: 'BS Computer Science',
            educationalProgramMode: 'Full-time',
            timeToComplete: 'P4Y',
            provider: { '@id': `${BASE_SITE_URL}/#university` }
          },
          {
            '@type': 'EducationalOccupationalProgram',
            name: 'BS Software Engineering',
            educationalProgramMode: 'Full-time',
            timeToComplete: 'P4Y',
            provider: { '@id': `${BASE_SITE_URL}/#university` }
          },
          {
            '@type': 'EducationalOccupationalProgram',
            name: 'BS Artificial Intelligence',
            educationalProgramMode: 'Full-time',
            timeToComplete: 'P4Y',
            provider: { '@id': `${BASE_SITE_URL}/#university` }
          },
          {
            '@type': 'EducationalOccupationalProgram',
            name: 'Bachelor of Business Administration (BBA Honors)',
            educationalProgramMode: 'Full-time',
            timeToComplete: 'P4Y',
            provider: { '@id': `${BASE_SITE_URL}/#university` }
          },
          {
            '@type': 'EducationalOccupationalProgram',
            name: 'BS Biotechnology',
            educationalProgramMode: 'Full-time',
            timeToComplete: 'P4Y',
            provider: { '@id': `${BASE_SITE_URL}/#university` }
          }
        ]
      }
    }
  },

  faculty: {
    title: 'Faculty Directory & Professors | UCP Bahawalpur Campus',
    description: 'Meet the distinguished faculty, PhD professors, and academic mentors at UCP Bahawalpur Campus dedicated to cutting-edge research, teaching excellence, and career guidance.',
    keywords: 'ucp bahawalpur faculty, professors ucp bwp, computer science teachers bahawalpur, faculty directory ucp bahawalpur',
    canonicalPath: '/faculty',
    ogType: 'website',
    ogImage: `${BASE_SITE_URL}/assets/campus/faculty_office_mentorship.webp`,
    ogImageAlt: 'UCP Bahawalpur Faculty Mentorship and Academic Guidance',
    robots: 'index, follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${BASE_SITE_URL}/faculty#webpage`,
      name: 'UCP Bahawalpur Faculty Directory',
      url: `${BASE_SITE_URL}/faculty`,
      description: 'Qualified and experienced academic leaders and instructors at UCP Bahawalpur.',
      isPartOf: { '@id': `${BASE_SITE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Faculty Directory', item: `${BASE_SITE_URL}/faculty` }
        ]
      }
    }
  },

  'campus-life': {
    title: 'Campus Life, Student Societies & Events | UCP Bahawalpur Campus',
    description: 'Experience vibrant campus life at UCP Bahawalpur Campus. Discover 15+ student societies, sports galas, academic hackathons, cultural festivals, and community welfare initiatives.',
    keywords: 'ucp bahawalpur campus life, student societies ucp bwp, sports gala bahawalpur, university events bahawalpur, student club ucp',
    canonicalPath: '/campus-life',
    ogType: 'website',
    ogImage: `${BASE_SITE_URL}/assets/campus-life/jeep-rally-main.jpg`,
    ogImageAlt: 'UCP Bahawalpur Campus Life and Student Activities',
    robots: 'index, follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_SITE_URL}/campus-life#webpage`,
      name: 'Campus Life, Student Societies & Events | UCP Bahawalpur Campus',
      url: `${BASE_SITE_URL}/campus-life`,
      description: 'Vibrant student life, 15+ student societies, annual Cholistan sports galas, academic workshops, and student development at UCP Bahawalpur Campus.',
      isPartOf: { '@id': `${BASE_SITE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Campus Life', item: `${BASE_SITE_URL}/campus-life` }
        ]
      }
    }
  },

  scholarships: {
    title: 'Scholarships & Merit Fee Concessions | UCP Bahawalpur Campus',
    description: 'Explore up to 50% merit-based scholarships, 25% PGC alumni concessions, kinship support, and need-based financial aid for undergraduate students at UCP Bahawalpur Campus.',
    keywords: 'ucp bahawalpur scholarships, merit scholarship bahawalpur, pgc alumni fee concession, financial aid ucp bwp',
    canonicalPath: '/scholarships',
    ogType: 'website',
    ogImage: `${BASE_SITE_URL}/assets/campus/convocation_hall_ceremony.webp`,
    ogImageAlt: 'UCP Bahawalpur Scholarships and Academic Honors',
    robots: 'index, follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_SITE_URL}/scholarships#webpage`,
      name: 'Scholarships & Merit Fee Concessions | UCP Bahawalpur Campus',
      url: `${BASE_SITE_URL}/scholarships`,
      description: 'Academic scholarships covering up to 50% tuition, 25% PGC alumni concession, kinship discounts, sports talent, and financial aid at UCP Bahawalpur Campus.',
      isPartOf: { '@id': `${BASE_SITE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Scholarships', item: `${BASE_SITE_URL}/scholarships` }
        ]
      },
      mainEntity: {
        '@type': 'Grant',
        name: 'UCP Bahawalpur Merit Scholarships & Tuition Concessions',
        funder: { '@id': `${BASE_SITE_URL}/#university` },
        description: 'Merit-based fee concessions based on Intermediate percentage and semester CGPA, PGC alumni discount, kinship aid, and talent scholarships.'
      }
    }
  },

  'fee-structure': {
    title: 'Official Fee Structure & Tuition | UCP Bahawalpur Campus',
    description: 'Transparent semester tuition fees, credit hour charges, admission costs, and flexible installment plans for all BS and ADP degree programs at UCP Bahawalpur Campus.',
    keywords: 'ucp bahawalpur fee structure, bs tuition fees bahawalpur, adp fees ucp bwp, university fee installment bahawalpur',
    canonicalPath: '/fee-structure',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'UCP Bahawalpur Official Tuition Fee Guidelines',
    robots: 'index, follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_SITE_URL}/fee-structure#webpage`,
      name: 'Official Fee Structure & Tuition | UCP Bahawalpur Campus',
      url: `${BASE_SITE_URL}/fee-structure`,
      description: 'Transparent credit-hour based fee structure, admission fees, and installment schedules for BS and ADP programs at UCP Bahawalpur Campus.',
      isPartOf: { '@id': `${BASE_SITE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Fee Structure', item: `${BASE_SITE_URL}/fee-structure` }
        ]
      },
      mainEntity: {
        '@type': 'PriceSpecification',
        name: 'UCP Bahawalpur Tuition Fee Structure',
        priceCurrency: 'PKR',
        description: 'Per-credit-hour tuition pricing (Rs. 4,100 to Rs. 6,800/credit hr), semester registration fees, and transparent fee installment structures.'
      }
    }
  },

  legacy: {
    title: 'Institutional Legacy & 40-Year Heritage | UCP Bahawalpur Campus',
    description: 'Learn about the four-decade educational excellence of Punjab Group of Colleges (PGC) and the historic foundation of University of Central Punjab Bahawalpur Campus.',
    keywords: 'ucp bahawalpur legacy, punjab group of colleges history, ucp lahore constituent college, pgc education heritage',
    canonicalPath: '/legacy',
    ogType: 'website',
    ogImage: `${BASE_SITE_URL}/assets/campus/historic_founders_hall.webp`,
    ogImageAlt: 'UCP Bahawalpur Institutional Heritage and Academic Founders',
    robots: 'index, follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${BASE_SITE_URL}/legacy#webpage`,
      name: 'Institutional Legacy & 40-Year Heritage | UCP Bahawalpur Campus',
      url: `${BASE_SITE_URL}/legacy`,
      description: 'Historical foundation, 40-year legacy of Punjab Group of Colleges (PGC), and the establishment of UCP Bahawalpur Campus.',
      isPartOf: { '@id': `${BASE_SITE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Our Legacy', item: `${BASE_SITE_URL}/legacy` }
        ]
      }
    }
  },

  'cnn-academy': {
    title: 'CNN Academy International Partnership | UCP Bahawalpur Campus',
    description: 'UCP Bahawalpur Campus collaboration with CNN Academy, providing journalism, media, and digital communications students global masterclasses and live newsroom training.',
    keywords: 'cnn academy ucp, journalism masterclass bahawalpur, media studies partnership ucp bahawalpur, cnn news training',
    canonicalPath: '/cnn-academy',
    ogType: 'website',
    ogImage: `${BASE_SITE_URL}/assets/campus/broadcast_media_studio.webp`,
    ogImageAlt: 'UCP Bahawalpur Broadcast Studio and CNN Academy Partnership',
    robots: 'index, follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_SITE_URL}/cnn-academy#webpage`,
      name: 'CNN Academy International Partnership | UCP Bahawalpur Campus',
      url: `${BASE_SITE_URL}/cnn-academy`,
      description: 'Strategic international media partnership with CNN Academy providing masterclasses, verification journalism, and broadcast training for UCP Bahawalpur students.',
      isPartOf: { '@id': `${BASE_SITE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'CNN Academy Partnership', item: `${BASE_SITE_URL}/cnn-academy` }
        ]
      }
    }
  },

  calendar: {
    title: 'Official Academic Calendar | UCP Bahawalpur Campus',
    description: 'Fall & Spring academic schedules at UCP Bahawalpur Campus. Important dates for semester enrollment, midterm examinations, final exams, convocation, and student breaks.',
    keywords: 'ucp bahawalpur academic calendar, semester dates ucp bwp, exams schedule bahawalpur, admission deadline ucp',
    canonicalPath: '/calendar',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'UCP Bahawalpur Academic Calendar and Examination Schedule',
    robots: 'index, follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_SITE_URL}/calendar#webpage`,
      name: 'Official Academic Calendar | UCP Bahawalpur Campus',
      url: `${BASE_SITE_URL}/calendar`,
      description: 'Official semester dates, class commencement, midterm and final examination schedules at UCP Bahawalpur Campus.',
      isPartOf: { '@id': `${BASE_SITE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Academic Calendar', item: `${BASE_SITE_URL}/calendar` }
        ]
      }
    }
  },

  'campus-facilities': {
    title: 'Campus Facilities, Central Library & Tech Labs | UCP Bahawalpur Campus',
    description: 'Explore the modern purpose-built UCP Bahawalpur Campus: digital research library, high-performance computing labs, sports arena, cafeteria, and air-conditioned shuttle transport.',
    keywords: 'ucp bahawalpur campus facilities, library ucp bwp, computer labs bahawalpur, transport facility ucp bahawalpur',
    canonicalPath: '/campus-facilities',
    ogType: 'website',
    ogImage: `${BASE_SITE_URL}/assets/campus/central_library_modern.webp`,
    ogImageAlt: 'UCP Bahawalpur Modern Central Library and Study Spaces',
    robots: 'index, follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_SITE_URL}/campus-facilities#webpage`,
      name: 'Campus Facilities, Central Library & Tech Labs | UCP Bahawalpur Campus',
      url: `${BASE_SITE_URL}/campus-facilities`,
      description: 'Purpose-built facilities including advanced computing labs, science laboratories, central digital library, sports facilities, and transport fleet at UCP Bahawalpur Campus.',
      isPartOf: { '@id': `${BASE_SITE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Campus Facilities', item: `${BASE_SITE_URL}/campus-facilities` }
        ]
      },
      mainEntity: {
        '@type': 'Place',
        name: 'UCP Bahawalpur Campus Facilities',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Constituent College, UCP Campus, Airport Road',
          addressLocality: 'Bahawalpur',
          addressRegion: 'Punjab',
          postalCode: '63100',
          addressCountry: 'PK'
        }
      }
    }
  },

  'about-us': {
    title: 'About Us — Leadership, Vision & Mission | UCP Bahawalpur Campus',
    description: 'Discover UCP Bahawalpur Campus: our leadership council, HEC recognized academic charters, state-of-the-art campus infrastructure, and dedication to South Punjab development.',
    keywords: 'about ucp bahawalpur, ucp bwp vision and mission, university leadership bahawalpur, punjab university constituent campus',
    canonicalPath: '/about-us',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'UCP Bahawalpur Campus Leadership and Administration',
    robots: 'index, follow',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${BASE_SITE_URL}/about-us#webpage`,
      name: 'About UCP Bahawalpur Campus',
      url: `${BASE_SITE_URL}/about-us`,
      description: 'Educational history, leadership, accreditations, charter status, and mission of UCP Bahawalpur Campus.',
      isPartOf: { '@id': `${BASE_SITE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: `${BASE_SITE_URL}/about-us` }
        ]
      }
    }
  },

  developer: {
    title: 'Developer & Architect — Asifa | UCP Bahawalpur',
    description: 'Developer information and secret portfolio of Asifa — Student of Artificial Intelligence at UCP Bahawalpur and portal architect.',
    keywords: 'developer, builder, asifa, ucp bahawalpur, artificial intelligence, portal architect',
    canonicalPath: '/developer',
    ogType: 'profile',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'Asifa Developer & Portal Architect',
    robots: 'noindex, nofollow'
  },

  asifa: {
    title: 'Asifa — Portal Architect & AI Student | UCP Bahawalpur',
    description: 'Secret portfolio of Asifa — Student of Artificial Intelligence at UCP Bahawalpur and architect of the UCP Bahawalpur portal.',
    keywords: 'asifa, developer, builder, ucp bahawalpur, artificial intelligence, portal architect',
    canonicalPath: '/developer',
    ogType: 'profile',
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'Asifa Portal Architect Profile',
    robots: 'noindex, nofollow'
  }
};
