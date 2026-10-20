export interface CampusEventImage {
  src: string;
  fallbackSrc?: string;
  alt: string;
  caption?: string;
}

export interface CampusEvent {
  id: string;
  number: number;
  title: string;
  year: '2025' | '2026';
  date: string;
  category: string;
  badge: string;
  description: string;
  highlights: string[];
  images: CampusEventImage[];
}

export const CAMPUS_EVENTS_DATA: CampusEvent[] = [
  // =========================================================================
  // 2025 EVENTS (ON TOP AS REQUESTED)
  // =========================================================================
  {
    id: 'alumni-reunion-2025',
    number: 1,
    title: 'Alumni Reunion 2025',
    year: '2025',
    date: 'November 2025',
    category: 'Alumni & Heritage',
    badge: 'Sangat-e-Dostaan Gala',
    description: 'The premier Sangat-e-Dostaan Alumni Reunion brought together distinguished graduates, university leaders, and faculty for an evening of nostalgic tributes, professional networking, and institutional celebration under the grand campus illuminations.',
    highlights: [
      '500+ Alumni & Faculty Attendees',
      'Distinguished Alumni Shield Presentations',
      'Nostalgic Campus Memory Walkway',
      'Live Classical Musical Accompaniment'
    ],
    images: [
      {
        src: '/assets/hero/sangat-dostaan-alumni-reunion.jpg',
        fallbackSrc: 'https://i.ibb.co/C5mNqmHn/sangat-dostaan-alumni-reunion.jpg',
        alt: 'UCP Bahawalpur Alumni Reunion 2025 Sangat-e-Dostaan gathering on main campus lawn',
        caption: 'Alumni Reunion 2025 — Grand Sangat-e-Dostaan gathering celebrating generational excellence'
      },
      {
        src: '/assets/campus-life-new/campus-new-d.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Distinguished alumni group and faculty leadership at UCP Bahawalpur reunion ceremony',
        caption: 'University leadership welcoming returning graduates back to their alma mater'
      },
      {
        src: '/assets/campus-life-new/campus-new-a.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Evening stage celebration and musical performances during Alumni Reunion 2025',
        caption: 'Festive musical performance and lighting setup on the main outdoor auditorium stage'
      },
      {
        src: '/assets/campus-life-new/campus-15.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Alumni reconnecting with professors and junior batch delegates across the decorated campus quad',
        caption: 'Heartfelt reconnecting moments between alumni mentors and current students'
      },
      {
        src: '/assets/campus-life-new/campus-26.jpg',
        fallbackSrc: 'https://i.ibb.co/Hfkk9bSJ/Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'Commemorative shields and excellence awards distributed at Alumni Reunion 2025',
        caption: 'Presentation of honorary shields to prominent alumni industry leaders'
      },
      {
        src: '/assets/campus-life-new/campus-30.jpg',
        fallbackSrc: 'https://i.ibb.co/20TtTtdG/Whats-App-Image-2026-10-05-at-2-38-58-AM-1.jpg',
        alt: 'Formal banquet dinner and student musical ensemble closing the 2025 Alumni Reunion',
        caption: 'Grand banquet dinner bringing together graduates from across Pakistan'
      }
    ]
  },
  {
    id: 'trip-northern-area',
    number: 2,
    title: 'Trip to Northern Area',
    year: '2025',
    date: 'August 2025',
    category: 'Tours & Excursions',
    badge: 'Alpine Adventure Excursion',
    description: 'An unforgettable multi-day alpine expedition across Shogran, Siri Paye, and Kaghan Valley. Students and faculty mentors explored breathtaking glaciers, alpine meadows, and mountain culture while building lifelong camaraderie.',
    highlights: [
      'Expedition to Shogran & Siri Paye Meadows',
      'Campfire Leadership & Team-Building Circles',
      'Scenic Photography Workshops',
      'Supervised Alpine Safety Protocols'
    ],
    images: [
      {
        src: '/assets/campus-life/shogran-valley-tour-1.jpg',
        fallbackSrc: 'https://i.ibb.co/0j944vNC/image-8.jpg',
        alt: 'UCP Bahawalpur students exploring Shogran Valley alpine meadows during Northern tour',
        caption: 'Shogran Valley Alpine Expedition — Students and faculty amidst lush mountain vistas'
      },
      {
        src: '/assets/campus-life-new/campus-37.jpg',
        fallbackSrc: 'https://i.ibb.co/20TtTtdG/Whats-App-Image-2026-10-05-at-2-38-58-AM-1.jpg',
        alt: 'Trekking through Pine forests and panoramic mountain ridges in Kaghan Valley',
        caption: 'Pine trail trekking and team orientation high in the Northern highlands'
      },
      {
        src: '/assets/campus-life-new/campus-4.jpg',
        fallbackSrc: 'https://i.ibb.co/Hfkk9bSJ/Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'Student group photograph at mountain summit overlook during northern excursion',
        caption: 'Summit group milestone — Celebrating collegiate adventure together'
      },
      {
        src: '/assets/campus-life-new/campus-7.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Jeep safari across rugged high-altitude passes to Siri Paye meadows',
        caption: 'Thrill of the off-road mountain jeep safari across rugged terrain'
      },
      {
        src: '/assets/campus-life-new/campus-12.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Evening campfire gathering and acoustic singing circle under starlit mountain skies',
        caption: 'Evening bonfire circles sharing stories, folk songs, and warm tea'
      },
      {
        src: '/assets/campus-life-new/campus-23.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Faculty supervisors and students celebrating successful completion of northern tour',
        caption: 'Safe return and memorable group photo at the final excursion basecamp'
      }
    ]
  },
  {
    id: 'orientation-day',
    number: 3,
    title: 'Orientation Day',
    year: '2025',
    date: 'October 2025',
    category: 'Academic Orientation',
    badge: 'Academic Induction',
    description: 'The official academic welcome introducing freshmen to UCP Bahawalpur\'s world-class facilities, degree curricula, code of conduct, and vibrant campus societies. Deans, Directors, and Student Ambassadors guided students into university life.',
    highlights: [
      'Deans & Directors Welcome Address',
      'Campus Facilities & Lab Tours',
      'Society Registrations & Student Guilds',
      'Academic Kit & Welcome Dossier Distribution'
    ],
    images: [
      {
        src: '/assets/campus/orientation-day-celebration.jpg',
        fallbackSrc: 'https://i.ibb.co/7tL25pD8/Whats-App-Image-2026-10-18-at-1-24-42-AM.jpg',
        alt: 'UCP Bahawalpur Orientation Day central auditorium welcome session with freshmen',
        caption: 'Orientation Day 2025 — Freshmen inducted into the UCP academic tradition'
      },
      {
        src: '/assets/campus/student-classroom-presentation-1.jpg',
        fallbackSrc: 'https://i.ibb.co/C5mNqmHn/sangat-dostaan-alumni-reunion.jpg',
        alt: 'Academic briefing and curriculum roadmaps presented in modern lecture theatre',
        caption: 'Faculty presentation outlining semester milestones and learning objectives'
      },
      {
        src: '/assets/campus/student-gathering-ground-1.jpg',
        fallbackSrc: 'https://i.ibb.co/0j944vNC/image-8.jpg',
        alt: 'New students exploring the campus courtyard and society registration kiosks',
        caption: 'Student society registration booths buzzing with enthusiastic new members'
      },
      {
        src: '/assets/facilities/grand_staircase_central_atrium.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Guided campus orientation tour through the grand central academic atrium',
        caption: 'Guided architectural tour across the campus central atrium and learning wings'
      },
      {
        src: '/assets/campus-life-new/campus-1.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Student ambassadors handing out university starter packs and welcome pins',
        caption: 'Senior UCP student ambassadors welcoming incoming students with starter kits'
      },
      {
        src: '/assets/campus-life-new/campus-6.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Freshmen batch celebrating their maiden university day on the main lawn',
        caption: 'First group milestone — The beginning of an extraordinary university journey'
      }
    ]
  },
  {
    id: '1st-day-welcome',
    number: 4,
    title: '1st Day Welcome',
    year: '2025',
    date: 'October 2025',
    category: 'Campus Tradition',
    badge: 'Campus Arrival & Greeting',
    description: 'A red-carpet festive entrance greeting new UCPians on their maiden day on campus. Senior student mentors and administrative faculty handed out welcome badges, university roadmaps, and celebratory refreshments across the decorated grand foyer.',
    highlights: [
      'Red Carpet Grand Entrance Way',
      'Welcome Desks & Student Help Centers',
      'First-Day Commemorative Photo Booths',
      'Campus Director Morning Greeting'
    ],
    images: [
      {
        src: '/assets/campus/4_admissions_entrance_red_carpet.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Red carpet ceremonial entrance welcoming students on their first day at UCP Bahawalpur',
        caption: '1st Day Welcome — Red carpet campus reception greeting new students'
      },
      {
        src: '/assets/campus/student-gathering-ground-2.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'New students congregating in the sunlit central lawn before first morning lectures',
        caption: 'Morning buzz as students meet classmates for their initial lectures'
      },
      {
        src: '/assets/campus-life/campus-activity-1.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Student help desk providing course schedules, portal credentials, and campus maps',
        caption: 'Information desks assisting students with course enrollment and portal logins'
      },
      {
        src: '/assets/campus-life-new/campus-2.jpg',
        fallbackSrc: 'https://i.ibb.co/Hfkk9bSJ/Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'First day commemorative photograph booth with UCP official backdrop',
        caption: 'Commemorative first-day photo booth capturing proud university moments'
      },
      {
        src: '/assets/campus-life-new/campus-5.jpg',
        fallbackSrc: 'https://i.ibb.co/20TtTtdG/Whats-App-Image-2026-10-05-at-2-38-58-AM-1.jpg',
        alt: 'Faculty members interacting with students in the decorated main corridors',
        caption: 'Faculty mentors welcoming freshmen warmly outside academic lecture halls'
      },
      {
        src: '/assets/campus-life-new/campus-8.jpg',
        fallbackSrc: 'https://i.ibb.co/0j944vNC/image-8.jpg',
        alt: 'Students enjoying complimentary refreshments and celebration sweets on campus lawn',
        caption: 'Celebratory sweets and warm greetings distributed across the campus grounds'
      }
    ]
  },
  {
    id: 'welcome-party-2025',
    number: 5,
    title: 'Welcome Party 2025',
    year: '2025',
    date: 'November 2025',
    category: 'Student Celebrations',
    badge: 'Grand Freshmen Gala',
    description: 'The premier collegiate social evening of the semester featuring theatrical drama skits, parody roasts, musical band performances, and a formal banquet under starlit campus decorations, celebrating the incoming class in royal Bahawalpur fashion.',
    highlights: [
      'Live Musical Performances & Battle of the Bands',
      'Theatrical Skits & Stand-up Comedy',
      'Mr. & Ms. Freshmen Titles',
      'Buffet Dinner & Executive Stage Lighting'
    ],
    images: [
      {
        src: '/assets/campus-life-new/campus-new-a.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Grand Welcome Party 2025 stage performance with dynamic laser lighting and live band',
        caption: 'Welcome Party 2025 — Electrifying stage performance on the grand campus lawn'
      },
      {
        src: '/assets/campus/campus-concert-live-music.png',
        fallbackSrc: 'https://i.ibb.co/dwVXXsjv/image-11.png',
        alt: 'Live musical night concert crowd cheering under vibrant campus stage illumination',
        caption: 'Vibrant crowd of freshmen and seniors enjoying high-energy musical sets'
      },
      {
        src: '/assets/campus-life-new/campus-36.jpg',
        fallbackSrc: 'https://i.ibb.co/20TtTtdG/Whats-App-Image-2026-10-05-at-2-38-58-AM-1.jpg',
        alt: 'Theatrical drama presentation and humorous student skits on main stage',
        caption: 'Dramatic arts society presenting hilarious parody skits and roasts'
      },
      {
        src: '/assets/campus-life-new/campus-new-b.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Presentation of Mr. & Ms. Freshmen titles and sashes during the gala evening',
        caption: 'Awarding the coveted Mr. & Ms. Freshmen 2025 titles to student winners'
      },
      {
        src: '/assets/campus-life-new/campus-11.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Formal seated dinner and culinary arrangements under starlit festive tents',
        caption: 'Sumptuous multi-course gala dinner served under grand canopy lighting'
      },
      {
        src: '/assets/campus-life-new/campus-19.jpg',
        fallbackSrc: 'https://i.ibb.co/Hfkk9bSJ/Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'Closing ensemble photo of organizing committee and student council members',
        caption: 'Student executive council celebrating the resounding success of Welcome 2025'
      }
    ]
  },
  {
    id: 'tutorial-lectures',
    number: 6,
    title: 'Tutorial Lectures',
    year: '2025',
    date: 'Ongoing Fall 2025',
    category: 'Skill Development',
    badge: 'Academic Masterclasses & Skill Labs',
    description: 'Structured interactive learning labs and peer mentoring sessions designed to bridge theoretical concepts with hands-on practice. Students engage in digital skills development, programming clinics, scientific demonstrations, and competitive problem solving.',
    highlights: [
      'Hands-on Python & Computing Workshops',
      'Peer Tutoring & Conceptual Problem Solving',
      'Interactive Digital Smartboard Demos',
      'Academic Mentorship by Senior Faculty'
    ],
    images: [
      {
        src: '/assets/campus-life/tutorial-lecture-2.jpg',
        fallbackSrc: 'https://i.ibb.co/k20Sp6Gq/Whats-App-Image-2026-10-08-at-12-46-42-AM-3.jpg',
        alt: 'UCP Bahawalpur tutorial lecture session with interactive faculty instruction',
        caption: 'Interactive Tutorial Lectures — Deep-dive problem solving and conceptual clarity'
      },
      {
        src: '/assets/campus-life/tutorial-lecture-3.jpg',
        fallbackSrc: 'https://i.ibb.co/JYCmfbX/Whats-App-Image-2026-10-08-at-12-46-43-AM.jpg',
        alt: 'Students engaged in collaborative group exercises during academic tutorial session',
        caption: 'Collaborative small-group study clinics focused on academic excellence'
      },
      {
        src: '/assets/campus-life/tutorial-lecture-4.jpg',
        fallbackSrc: 'https://i.ibb.co/rKVgFRvy/Whats-App-Image-2026-10-08-at-12-46-42-AM.jpg',
        alt: 'Faculty mentor guiding students through analytical problem solving on whiteboard',
        caption: 'Individualized mentor guidance ensuring thorough understanding of course modules'
      },
      {
        src: '/assets/campus-life/student-digital-skills-lab.jpg',
        fallbackSrc: 'https://i.ibb.co/5x6v5v8X/image-1.jpg',
        alt: 'Hands-on digital skills laboratory training in high-tech computer lab',
        caption: 'Computer science & AI students coding hands-on in the modern computing lab'
      },
      {
        src: '/assets/campus-life/student-recreational-gaming-tutorial.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Esports, algorithmic game development, and logic reasoning workshop session',
        caption: 'Algorithmic game development and logic puzzles during recreational skill clinics'
      },
      {
        src: '/assets/facilities/comp-lab-1.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'High-speed GPU computing workstations utilized during programming tutorials',
        caption: 'Equipped with cutting-edge software suites for advanced coding and analytics'
      }
    ]
  },

  // =========================================================================
  // 2026 EVENTS (FOLLOWING 2025 EVENTS)
  // =========================================================================
  {
    id: 'isaiss-2026-symposium',
    number: 7,
    title: 'ISAISS 2026 (Symposium)',
    year: '2026',
    date: 'January 2026',
    category: 'Academic Symposium',
    badge: 'International AI & Security Conference',
    description: 'A premier international symposium bringing together global AI researchers, cybersecurity professionals, and university faculty. Keynotes explored ethical AI, neural architectures, quantum cryptography, and practical industry deployment.',
    highlights: [
      'International Keynote Speakers & Academicians',
      '30+ Peer-Reviewed Research Presentations',
      'Panel Discussion on Cybersecurity & Generative AI',
      'IEEE & HEC Academic Recognition'
    ],
    images: [
      {
        src: '/assets/events/international-symposium-ai.jpg',
        fallbackSrc: 'https://i.ibb.co/Z6gCjzm9/Whats-App-Image-2026-10-11-at-11-08-09-PM.jpg',
        alt: 'ISAISS 2026 International Symposium on AI and Secure Systems main conference hall',
        caption: 'ISAISS 2026 — Global researchers convening on AI and Cybersecurity at UCP'
      },
      {
        src: '/assets/events/international-symposium-ai-2.jpg',
        fallbackSrc: 'https://i.ibb.co/DPc3whkY/Whats-App-Image-2026-10-11-at-11-06-29-PM.jpg',
        alt: 'Keynote speaker delivering address on advanced deep learning and quantum cryptography',
        caption: 'Keynote paper presentation addressing breakthroughs in neural architectures'
      },
      {
        src: '/assets/events/international-symposium-ai-3.jpg',
        fallbackSrc: 'https://i.ibb.co/JWgxKLmW/Whats-App-Image-2026-10-11-at-11-08-23-PM.jpg',
        alt: 'Panel session on industrial AI adoption with technology delegates and professors',
        caption: 'Distinguished panel exploring data security protocols in financial systems'
      },
      {
        src: '/assets/events/symposium-ai-secure-systems-1.jpg',
        fallbackSrc: 'https://i.ibb.co/1t5rZr61/Whats-App-Image-2026-10-11-at-11-09-58-PM.jpg',
        alt: 'Audience of postgraduate scholars, researchers, and engineers at ISAISS 2026',
        caption: 'Packed auditorium of computing scholars, industry engineers, and faculty delegates'
      },
      {
        src: '/assets/events/symposium-ai-secure-systems-2.jpg',
        fallbackSrc: 'https://i.ibb.co/wFy5dC60/Whats-App-Image-2026-10-11-at-11-09-33-PM.jpg',
        alt: 'Presentation of symposium proceedings and honorary crests to international delegates',
        caption: 'Distribution of symposium proceedings and honorary crests by the Campus Director'
      },
      {
        src: '/assets/events/seminar-comm-keynote-large.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Closing plenary session on future-ready computing and student innovation grants',
        caption: 'Closing plenary affirming UCP Bahawalpur as a hub for scientific research'
      }
    ]
  },
  {
    id: 'ucp-elite-student-network',
    number: 8,
    title: 'UCP Elite student Network campaign',
    year: '2026',
    date: 'January - February 2026',
    category: 'Student Leadership',
    badge: 'Merit & Leadership Showcase',
    description: 'An official campus-wide campaign spotlighting top academic achievers, merit scholarship recipients, and society presidents. The network fosters leadership development, career mentoring, and corporate networking for high-performing UCPians.',
    highlights: [
      '100% Merit Scholarship Achievers Recognized',
      'Executive Mentoring by Corporate Leaders',
      'Campus Brand Ambassador Induction',
      'Professional Development & Public Speaking Bootcamps'
    ],
    images: [
      {
        src: '/assets/elite-network-new/elite-1.jpg',
        fallbackSrc: 'https://i.ibb.co/4RGfzpX8/image-2.jpg',
        alt: 'UCP Elite Student Network campaign launch featuring academic scholars and ambassadors',
        caption: 'UCP Elite Student Network — Celebrating academic excellence and campus leadership'
      },
      {
        src: '/assets/elite-network-new/elite-2.jpg',
        fallbackSrc: 'https://i.ibb.co/5x6v5v8X/image-1.jpg',
        alt: 'Top academic achievers receiving official UCP Elite lapel pins and certificates',
        caption: 'Top rankers across Computer Science and Business inducted into the Elite Circle'
      },
      {
        src: '/assets/elite-network-new/elite-3.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Executive round-table discussion between student leaders and visiting industry CEOs',
        caption: 'Executive networking roundtable bridging student talent with corporate leadership'
      },
      {
        src: '/assets/elite-network-new/elite-4.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Public speaking and corporate leadership masterclass for Elite Network scholars',
        caption: 'Masterclasses in corporate communication, personal branding, and venture leadership'
      },
      {
        src: '/assets/elite-network-new/elite-7.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Elite Network ambassadors presenting campus community outreach programs',
        caption: 'Student ambassadors spearheading youth development and mentorship initiatives'
      },
      {
        src: '/assets/elite-network-new/elite-11.jpg',
        fallbackSrc: 'https://i.ibb.co/Hfkk9bSJ/Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'Official group portrait of UCP Bahawalpur Elite Student Network cohort',
        caption: 'The inspiring faces of academic distinction and future leadership at UCP'
      }
    ]
  },
  {
    id: 'state-bank-session-2026',
    number: 9,
    title: 'State bank Session 2026',
    year: '2026',
    date: 'February 2026',
    category: 'Corporate & Finance',
    badge: 'Central Banking & Financial Literacy',
    description: 'An executive financial awareness session led by delegates from the State Bank of Pakistan. Topics encompassed monetary policy, fintech innovations, digital payment gateways (Raast), and emerging careers in commercial banking.',
    highlights: [
      'State Bank of Pakistan Executive Delegation',
      'Discussions on Fintech, Raast & Digital Economy',
      'Interactive Q&A on Banking Career Pathways',
      'Certification of Financial Literacy for Attendees'
    ],
    images: [
      {
        src: '/assets/events/seminar-speaker-session.jpg',
        fallbackSrc: 'https://i.ibb.co/wFy5dC60/Whats-App-Image-2026-10-11-at-11-09-33-PM.jpg',
        alt: 'State Bank of Pakistan senior director addressing UCP Bahawalpur business and IT students',
        caption: 'State Bank Session 2026 — Central bank executives elucidating monetary policy'
      },
      {
        src: '/assets/events/seminar-audience-delegates.jpg',
        fallbackSrc: 'https://i.ibb.co/1t5rZr61/Whats-App-Image-2026-10-11-at-11-09-58-PM.jpg',
        alt: 'Students and finance faculty actively taking notes during the State Bank briefing',
        caption: 'Auditorium of BBA and Accounting students absorbing insights on digital banking'
      },
      {
        src: '/assets/events/seminar-stage-panel.jpg',
        fallbackSrc: 'https://i.ibb.co/Z6gCjzm9/Whats-App-Image-2026-10-11-at-11-08-09-PM.jpg',
        alt: 'Panel discussion on Islamic banking, digital currency, and fintech entrepreneurship',
        caption: 'Interactive dialogue regarding entrepreneurship capital and SME financing'
      },
      {
        src: '/assets/events/seminar-overview-1.jpg',
        fallbackSrc: 'https://i.ibb.co/DPc3whkY/Whats-App-Image-2026-10-11-at-11-06-29-PM.jpg',
        alt: 'Wide view of the seminar hall with official SBP banners and digital display',
        caption: 'Comprehensive seminar overview highlighting Pakistan’s financial inclusion agenda'
      },
      {
        src: '/assets/events/seminar-overview-2.jpg',
        fallbackSrc: 'https://i.ibb.co/JWgxKLmW/Whats-App-Image-2026-10-11-at-11-08-23-PM.jpg',
        alt: 'Q&A session with students asking questions about SBP internships and exam schemes',
        caption: 'Direct engagement: Students clarifying banking exam schemes and internship routes'
      },
      {
        src: '/assets/events/seminar-comm-keynote-large.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Shield exchange ceremony honoring State Bank of Pakistan guest dignitaries',
        caption: 'UCP Director presenting honorary institution memento to SBP regional leadership'
      }
    ]
  },
  {
    id: 'teaching-excellence-360',
    number: 10,
    title: 'Teaching excellence 360°',
    year: '2026',
    date: 'February 2026',
    category: 'Faculty Development',
    badge: 'Faculty Pedagogy & Innovation',
    description: 'An intensive professional development symposium empowering faculty across all departments with modern pedagogical strategies, active student engagement methodologies, and digital learning assessment toolkits.',
    highlights: [
      'Interactive Pedagogy Workshops',
      'Curriculum Modernization & Assessment Rubrics',
      'Faculty Peer Review & Micro-teaching Labs',
      'Keynotes by Senior Educationists'
    ],
    images: [
      {
        src: '/assets/campus/teacher-training-presentation.jpg',
        fallbackSrc: 'https://i.ibb.co/KxnwgN6v/Whats-App-Image-2026-10-05-at-1-17-53-AM-4-Copy.jpg',
        alt: 'Teaching Excellence 360 workshop presentation by senior education specialist',
        caption: 'Teaching Excellence 360° — Faculty mastering student-centric pedagogies'
      },
      {
        src: '/assets/faculty/faculty-in-action-presentation.jpg',
        fallbackSrc: 'https://i.ibb.co/bRWh39Z1/Whats-App-Image-2026-10-11-at-11-07-35-PM.jpg',
        alt: 'Professor demonstrating innovative classroom technology and digital assessment tools',
        caption: 'Live demonstration of digital learning toolkits and active feedback loops'
      },
      {
        src: '/assets/events/workshop-endnote-shahid-amin.jpg',
        fallbackSrc: 'https://i.ibb.co/hxJ4v4xv/Whats-App-Image-2026-10-11-at-11-30-43-PM.jpg',
        alt: 'Research citation and scientific publishing workshop led by Dr. Shahid Amin',
        caption: 'Research methodology and EndNote bibliographic masterclass for research faculty'
      },
      {
        src: '/assets/campus/student-classroom-presentation-2.jpg',
        fallbackSrc: 'https://i.ibb.co/W4CphPKd/Whats-App-Image-2026-10-11-at-11-31-06-PM.jpg',
        alt: 'Micro-teaching breakout group evaluating rubric-based academic grading',
        caption: 'Departmental roundtables refining modern outcome-based education (OBE) rubrics'
      },
      {
        src: '/assets/facilities/comp-lab-2.jpg',
        fallbackSrc: 'https://i.ibb.co/chjWx2NR/Whats-App-Image-2026-10-13-at-1-06-35-AM.jpg',
        alt: 'Faculty computer lab session practicing LMS portal integration and digital exams',
        caption: 'Hands-on training in learning management portals and computerized exam evaluation'
      },
      {
        src: '/assets/facilities/science_lab_1.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Science laboratory safety and experiential experimentation standards review',
        caption: 'Science faculty reviewing advanced laboratory safety and investigative standards'
      }
    ]
  },
  {
    id: 'documentary-reel-competition',
    number: 11,
    title: 'Documentary and reel competition',
    year: '2026',
    date: 'February 2026',
    category: 'Media & Arts',
    badge: 'Visual Storytelling & Cinema',
    description: 'A thrilling creative contest celebrating student filmmakers, reel creators, and visual journalists. Competitors showcased short documentaries on local heritage, environmental conservation, campus life, and social impact before an expert media jury.',
    highlights: [
      '40+ Competing Short Documentaries & Creative Reels',
      'Jury Panel of Media Producers & Journalists',
      'Cash Prizes & Official Trophies for Winners',
      'Campus Screening & Gala Audience Choice Vote'
    ],
    images: [
      {
        src: '/assets/events/documentary-competition-1.jpg',
        fallbackSrc: 'https://i.ibb.co/Z6gCjzm9/Whats-App-Image-2026-10-11-at-11-08-09-PM.jpg',
        alt: 'Documentary and Reel Competition main screening hall at UCP Bahawalpur',
        caption: 'Documentary & Reel Competition — Cinematic student films on the big screen'
      },
      {
        src: '/assets/events/documentary-competition-2.jpg',
        fallbackSrc: 'https://i.ibb.co/DPc3whkY/Whats-App-Image-2026-10-11-at-11-06-29-PM.jpg',
        alt: 'Student directors presenting creative rationale and cinematography techniques to jury',
        caption: 'Filmmaking teams pitching creative concepts and documentary narratives to judges'
      },
      {
        src: '/assets/events/documentary-competition-3.jpg',
        fallbackSrc: 'https://i.ibb.co/JWgxKLmW/Whats-App-Image-2026-10-11-at-11-08-23-PM.jpg',
        alt: 'Audience applauding winning short film during gala screening ceremony',
        caption: 'Auditorium audience reacting enthusiastically to inspiring reel storylines'
      },
      {
        src: '/assets/events/documentary-competition-judges.jpg',
        fallbackSrc: 'https://i.ibb.co/wFy5dC60/Whats-App-Image-2026-10-11-at-11-09-33-PM.jpg',
        alt: 'Distinguished panel of professional film directors and media anchors judging entries',
        caption: 'Expert media jury critically assessing cinematography, editing, and sound design'
      },
      {
        src: '/assets/events/documentary-competition-awards.jpg',
        fallbackSrc: 'https://i.ibb.co/1t5rZr61/Whats-App-Image-2026-10-11-at-11-09-58-PM.jpg',
        alt: 'Award ceremony presenting cash prizes, trophies, and certificates to winning students',
        caption: 'Trophy presentation celebrating the champion student documentary creators'
      },
      {
        src: '/assets/campus-life/movie-day-addition.jpg',
        fallbackSrc: 'https://i.ibb.co/pjpRGkzG/Whats-App-Image-2026-10-11-at-11-24-05-PM.jpg',
        alt: 'Creative post-production editing showcase and student filmmaker group portrait',
        caption: 'Student content creators, visual storytellers, and media club coordinators'
      }
    ]
  },
  {
    id: 'village-tour',
    number: 12,
    title: 'Village Tour',
    year: '2026',
    date: 'February 2026',
    category: 'Tours & Excursions',
    badge: 'Rural Heritage & Social Fieldwork',
    description: 'An experiential community immersion tour connecting students with rural agricultural life, historical artisanal crafts, and Southern Punjab village culture. Students conducted fieldwork on community development and sustainable farming.',
    highlights: [
      'Traditional Cholistani & Saraiki Rural Hospitality',
      'Field Research on Sustainable Agriculture',
      'Artisanal Pottery & Handloom Craft Demonstrations',
      'Interactive Community Dialogues'
    ],
    images: [
      {
        src: '/assets/campus-life/village-tour-1.jpg',
        fallbackSrc: 'https://i.ibb.co/KxnwgN6v/Whats-App-Image-2026-10-05-at-1-17-53-AM-4-Copy.jpg',
        alt: 'UCP Bahawalpur students arriving in rural Southern Punjab village on heritage excursion',
        caption: 'Village Tour 2026 — Experiencing authentic agrarian traditions and rural warmth'
      },
      {
        src: '/assets/campus-life/village-tour-2.jpg',
        fallbackSrc: 'https://i.ibb.co/bRWh39Z1/Whats-App-Image-2026-10-11-at-11-07-35-PM.jpg',
        alt: 'Students learning traditional pottery techniques from master village artisans',
        caption: 'Hands-on clay pottery and ceramic crafts workshop with local master artisans'
      },
      {
        src: '/assets/campus-life/village-tour-3.jpg',
        fallbackSrc: 'https://i.ibb.co/hxJ4v4xv/Whats-App-Image-2026-10-11-at-11-30-43-PM.jpg',
        alt: 'Agricultural field research examining organic crop farming and canal irrigation',
        caption: 'Students analyzing crop cycles, drip irrigation, and rural agro-economics'
      },
      {
        src: '/assets/campus-life/village-tour-4.jpg',
        fallbackSrc: 'https://i.ibb.co/W4CphPKd/Whats-App-Image-2026-10-11-at-11-31-06-PM.jpg',
        alt: 'Traditional village courtyard gathering with village elders and organic rural dining',
        caption: 'Enjoying traditional rural tandoori dining and folkloric tales with village elders'
      },
      {
        src: '/assets/campus-life/campus-activity-2.jpg',
        fallbackSrc: 'https://i.ibb.co/chjWx2NR/Whats-App-Image-2026-10-13-at-1-06-35-AM.jpg',
        alt: 'Students interacting with local schoolchildren and distributing books during village tour',
        caption: 'Social impact initiative: Sharing educational storybooks with village school pupils'
      },
      {
        src: '/assets/campus-life-new/campus-14.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Commemorative group photo of students and faculty with village community hosts',
        caption: 'Heartfelt group memory capturing rich cultural heritage and community gratitude'
      }
    ]
  },
  {
    id: 'spring-festival',
    number: 13,
    title: 'Spring Festival',
    year: '2026',
    date: 'March 2026',
    category: 'Cultural Fest',
    badge: 'Jashn-e-Baharan Festivities',
    description: 'The iconic Jashn-e-Baharan campus carnival adorned with blooming floral arrangements, ethnic clothing pavilions, food stalls representing all four provinces, kite decorations, and folk instrumental melodies celebrating the arrival of spring.',
    highlights: [
      'Provincial Cultural Kiosks & Traditional Attire',
      'Live Folk Instrumental & Dhol Performances',
      'Food Streets with Authentic Regional Cuisines',
      'Inter-Department Floral Exhibition & Contests'
    ],
    images: [
      {
        src: '/assets/campus-life/campus-life-culture-1.jpg',
        fallbackSrc: 'https://i.ibb.co/q3FMgJQ6/Whats-App-Image-2026-10-18-at-1-23-07-AM.jpg',
        alt: 'UCP Bahawalpur Spring Festival campus celebrations with vibrant cultural displays',
        caption: 'Spring Festival 2026 — Jashn-e-Baharan blooming across the campus quads'
      },
      {
        src: '/assets/campus-life/campus-life-culture-2.jpg',
        fallbackSrc: 'https://i.ibb.co/7tL25pD8/Whats-App-Image-2026-10-18-at-1-24-42-AM.jpg',
        alt: 'Students dressed in colorful regional attire celebrating cultural harmony on campus',
        caption: 'Celebrating provincial unity with Sindhi, Balochi, Pashto, and Punjabi traditions'
      },
      {
        src: '/assets/campus-life-new/campus-new-c.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Folk musicians performing classical melodies and energetic dhol beats during carnival',
        caption: 'Live dhol rhythms and folk instrumental performances energizing the student crowd'
      },
      {
        src: '/assets/campus-life-new/campus-30.jpg',
        fallbackSrc: 'https://i.ibb.co/20TtTtdG/Whats-App-Image-2026-10-05-at-2-38-58-AM-1.jpg',
        alt: 'Floral garden exhibition and student landscaping competitions on the campus lawn',
        caption: 'Artistic floral arrangements and garden exhibits curated by student societies'
      },
      {
        src: '/assets/campus-life-new/campus-17.jpg',
        fallbackSrc: 'https://i.ibb.co/Hfkk9bSJ/Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'Regional food stalls serving Gol Gappay, Biryani, Sajji, and traditional sweets',
        caption: 'Bustling student food kiosks serving authentic traditional treats and cuisines'
      },
      {
        src: '/assets/campus-life-new/campus-20.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Joyful group of university students celebrating spring festivities in the sunshine',
        caption: 'Infectious smiles and cherished youth memories celebrating springtime in Bahawalpur'
      }
    ]
  },
  {
    id: '21-jeep-rally-2026',
    number: 14,
    title: '21 Jeep rally 2026',
    year: '2026',
    date: 'February - March 2026',
    category: 'Motorsports & Culture',
    badge: 'TDCP Desert Motorsports Event',
    description: 'Official university partnership and student contingent at the historic 21st Cholistan Desert Jeep Rally. UCP students experienced high-octane 4x4 desert racing, cultural nights at Derawar Fort, and event management hospitality alongside TDCP.',
    highlights: [
      'VIP Student Access to Derawar Fort Race Track',
      'Official TDCP Media & Event Volunteers',
      'Desert Camping, Bonfires & Traditional Music',
      'Technical Insights into Automotive Engineering'
    ],
    images: [
      {
        src: '/assets/campus-life/jeep-rally-main.jpg',
        fallbackSrc: 'https://i.ibb.co/PshpBWGn/Whats-App-Image-2026-10-05-at-2-39-14-AM.jpg',
        alt: '21st Cholistan Jeep Rally racing vehicles roaring past desert sand dunes',
        caption: '21st Cholistan Jeep Rally 2026 — High-octane motorsport across golden dunes'
      },
      {
        src: '/assets/campus-life/jeep-rally-meeting-1.jpg',
        fallbackSrc: 'https://i.ibb.co/PGGS4ZQ0/Whats-App-Image-2026-10-05-at-1-23-51-AM-1.jpg',
        alt: 'UCP Bahawalpur leadership and TDCP officials organizing rally coordination meeting',
        caption: 'Strategic rally planning meeting between UCP leadership and TDCP authorities'
      },
      {
        src: '/assets/campus-life/jeep-rally-meeting-2.jpg',
        fallbackSrc: 'https://i.ibb.co/VcMt0mZx/Whats-App-Image-2026-10-05-at-1-23-52-AM.jpg',
        alt: 'Student volunteer orientation for hospitality and media coverage at Derawar Fort',
        caption: 'Orientation for UCP student event managers and media reporters at the rally'
      },
      {
        src: '/assets/events/mou-haveli-cholistan-jeep-rally.jpg',
        fallbackSrc: 'https://i.ibb.co/chjWx2NR/Whats-App-Image-2026-10-13-at-1-06-35-AM.jpg',
        alt: 'UCP official desert camp and pavilion setup near the iconic Derawar Fort',
        caption: 'UCP hospitality pavilion welcoming racers, tourists, and university delegates'
      },
      {
        src: '/assets/campus-life-new/campus-3.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Students witnessing live desert track qualifiers and modified 4x4 vehicles',
        caption: 'Firsthand thrill of watching modified rally trucks conquer desert terrain'
      },
      {
        src: '/assets/campus-life-new/campus-9.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Nighttime desert cultural festival with lanterns and folk songs at Derawar Fort',
        caption: 'Mesmerizing desert night festivities beneath the illuminated walls of Derawar Fort'
      }
    ]
  },
  {
    id: 'ice-throne-event',
    number: 15,
    title: 'Ice Throne event',
    year: '2026',
    date: 'January 2026',
    category: 'Themed Celebrations',
    badge: 'Thematic Winter Gala',
    description: 'A spectacle of theatrical staging and winter decor! The Ice Throne event featured elaborate fantasy costume pageants, interactive roleplay tournaments, creative photography setups, and an energetic youth festival on campus.',
    highlights: [
      'Elaborate Hand-Sculpted Ice Throne Stage',
      'Cosplay & Fantasy Theatrical Competitions',
      'Interactive Student Gaming & Trivia Quests',
      'Hot Chocolate & Winter Street Food Kiosks'
    ],
    images: [
      {
        src: '/assets/campus-life-new/campus-36.jpg',
        fallbackSrc: 'https://i.ibb.co/20TtTtdG/Whats-App-Image-2026-10-05-at-2-38-58-AM-1.jpg',
        alt: 'Grand Ice Throne themed stage structure illuminated in ice blue and crystal decor',
        caption: 'Ice Throne Event — Magnificent crystalline stage decor and fantasy atmosphere'
      },
      {
        src: '/assets/campus-life-new/campus-37.jpg',
        fallbackSrc: 'https://i.ibb.co/Hfkk9bSJ/Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'Students participating in dramatic roleplay tournaments and fantasy cosplays',
        caption: 'Creative students competing in the theatrical fantasy costume showcase'
      },
      {
        src: '/assets/campus-life-new/campus-40.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Interactive crowd participation in winter trivia quests and gaming challenges',
        caption: 'Audience cheering interactive trivia tournaments and stage challenges'
      },
      {
        src: '/assets/campus-life-new/campus-45.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Nighttime illumination with fog effects and laser beams around the Ice Throne',
        caption: 'Spectacular atmospheric fog effects and illumination lighting up the quad'
      },
      {
        src: '/assets/campus-life-new/campus-46.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Students posing on the Ice Throne during commemorative photo sessions',
        caption: 'Students capturing unforgettable memories on the royal Ice Throne set'
      },
      {
        src: '/assets/campus-life-new/campus-47.jpg',
        fallbackSrc: 'https://i.ibb.co/0j944vNC/image-8.jpg',
        alt: 'Warm beverage kiosks serving hot cocoa and winter snacks during festival',
        caption: 'Cozy winter refreshments and sweet delicacies keeping spirits high'
      }
    ]
  },
  {
    id: 'mou-signing-tdcp-cholistan',
    number: 16,
    title: 'MOU signing (TDCP, MOU meeting,Haveli Cholistan)',
    year: '2026',
    date: 'February 2026',
    category: 'Strategic Partnerships',
    badge: 'Tourism & Industry Alliances',
    description: 'Formal signing of landmark Memorandums of Understanding between UCP Bahawalpur, the Tourism Development Corporation of Punjab (TDCP), and Haveli Cholistan to facilitate student internships, cultural research, eco-tourism, and desert heritage projects.',
    highlights: [
      'Bilateral MoU Execution with TDCP Dignitaries',
      'Guaranteed Student Internship Quotas',
      'Joint Heritage Preservation Research',
      'Ceremonial Exchange of Corporate Gifts'
    ],
    images: [
      {
        src: '/assets/campus-life/mou-signing-ceremony.jpg',
        fallbackSrc: 'https://i.ibb.co/chjWx2NR/Whats-App-Image-2026-10-13-at-1-06-35-AM.jpg',
        alt: 'Historic MOU signing ceremony between UCP Bahawalpur Director and TDCP officials',
        caption: 'MOU Signing Ceremony — Sealing strategic partnerships for student opportunities'
      },
      {
        src: '/assets/events/mou-haveli-cholistan-jeep-rally.jpg',
        fallbackSrc: 'https://i.ibb.co/PshpBWGn/Whats-App-Image-2026-10-05-at-2-39-14-AM.jpg',
        alt: 'Delegates from Haveli Cholistan and university administration finalizing collaboration documents',
        caption: 'Collaborative pact with Haveli Cholistan promoting eco-tourism and cultural research'
      },
      {
        src: '/assets/leadership/director-faculty-handshake.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Campus Director shaking hands with regional tourism dignitaries following agreement',
        caption: 'Ceremonial handshake solidifying institutional alliances and academic linkages'
      },
      {
        src: '/assets/leadership/leadership-official-gathering.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Official executive committee reviewing internship placements for hospitality students',
        caption: 'University executive committee delineating internship placements and project scopes'
      },
      {
        src: '/assets/campus-life/campus-collaboration-1.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Tourism officials presenting commemorative plaques to UCP faculty coordinators',
        caption: 'Commemorative plaques presented celebrating public-private academic partnership'
      },
      {
        src: '/assets/campus-life/campus-collaboration-2.jpg',
        fallbackSrc: 'https://i.ibb.co/Hfkk9bSJ/Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'Joint delegation group portrait marking commitment to Southern Punjab heritage development',
        caption: 'Historic delegation group portrait inaugurating multi-year collaboration'
      }
    ]
  },
  {
    id: 'mothers-day',
    number: 17,
    title: 'Mothers day',
    year: '2026',
    date: 'May 2026',
    category: 'Annual Tributes',
    badge: 'Tribute to Maternal Devotion',
    description: 'An emotionally resonant gathering honoring the pivotal role of mothers in student success. Featuring poignant poetry recitations, student speeches, floral bouquet presentations, and heartwarming video tributes thanking mothers for their selfless dedication.',
    highlights: [
      'Heartfelt Student Speeches & Video Dedications',
      'Special Guest Mothers Honored on Stage',
      'Poetry Recitations & Commemorative Shields',
      'Campus-Wide Flower Bouquet Distribution'
    ],
    images: [
      {
        src: '/assets/campus-life/mothers-day-historic-tribute-1.jpg',
        fallbackSrc: 'https://i.ibb.co/pjcYnN2B/Whats-App-Image-2026-10-05-at-2-39-19-AM-2.jpg',
        alt: 'Mother\'s Day celebration at UCP Bahawalpur with mothers honored on main stage',
        caption: 'Mothers Day 2026 — Celebrating maternal sacrifice, guidance, and endless love'
      },
      {
        src: '/assets/campus-life/mothers-day-tribute-replacement.jpg',
        fallbackSrc: 'https://i.ibb.co/HTqzJNjb/Whats-App-Image-2026-10-05-at-1-12-46-AM.jpg',
        alt: 'Students presenting personalized floral bouquets and gratitude letters to mothers',
        caption: 'Students presenting hand-crafted floral bouquets and heartfelt letters of thanks'
      },
      {
        src: '/assets/campus-life-new/campus-18.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Emotional video screening highlighting mother-student journeys through university',
        caption: 'Auditorium screening of touching student video diaries and family milestones'
      },
      {
        src: '/assets/campus-life-new/campus-22.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Distinguished mother delivering address on encouraging children toward higher education',
        caption: 'Guest mothers addressing the auditorium with inspiring words on resilience'
      },
      {
        src: '/assets/campus-life-new/campus-25.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Presentation of commemorative shields honoring exemplary mothers of academic scholars',
        caption: 'Campus Director presenting honorary crests to exemplary mothers of scholars'
      },
      {
        src: '/assets/campus-life-new/campus-28.jpg',
        fallbackSrc: 'https://i.ibb.co/Hfkk9bSJ/Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'Family photographs and celebration tea hosted in the decorated central campus courtyard',
        caption: 'Joyous family photo sessions in the festively adorned central campus courtyard'
      }
    ]
  },
  {
    id: 'arts-and-carnival-festival',
    number: 18,
    title: 'Arts and carnival festival',
    year: '2026',
    date: 'March 2026',
    category: 'Arts & Culture',
    badge: 'Fine Arts, Crafts & Carnival Games',
    description: 'A vibrant multi-day festival celebrating artistic expression. The campus grounds were converted into a bustling carnival of oil paintings, calligraphy exhibits, pottery wheels, VR game booths, face painting, and open-mic acoustic sessions.',
    highlights: [
      'Live Calligraphy & Acrylic Canvas Painting',
      'Interactive Carnival Game Booths & Prizes',
      'Handmade Jewelry & Artisan Kiosks',
      'Open Mic Acoustic Music & Spoken Word'
    ],
    images: [
      {
        src: '/assets/campus-life-new/campus-15.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Arts and Carnival Festival visual art exhibition along the main campus walkway',
        caption: 'Arts & Carnival Festival 2026 — Student canvases, calligraphy, and creative crafts'
      },
      {
        src: '/assets/campus-life-new/campus-26.jpg',
        fallbackSrc: 'https://i.ibb.co/Hfkk9bSJ/Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'Students creating live acrylic paintings and sketches during open-air arts competition',
        caption: 'Live speed-painting and canvas portraits executed in real time by fine arts students'
      },
      {
        src: '/assets/campus-life-new/campus-41.jpg',
        fallbackSrc: 'https://i.ibb.co/20TtTtdG/Whats-App-Image-2026-10-05-at-2-38-58-AM-1.jpg',
        alt: 'Carnival games area with dart boards, ring toss, and prizes buzzing with students',
        caption: 'Exciting carnival game booths and prize giveaways drawing enthusiastic crowds'
      },
      {
        src: '/assets/campus-life-new/campus-42.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Handmade cultural crafts, calligraphy prints, and ceramic ornaments on display',
        caption: 'Exquisite traditional calligraphy and craft pavilions curated by youth artisans'
      },
      {
        src: '/assets/campus-life-new/campus-48.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Open mic acoustic stage with student singers and guitarists performing live',
        caption: 'Acoustic musical jam and spoken-word poetry under shaded garden canopies'
      },
      {
        src: '/assets/campus-life-new/campus-49.jpg',
        fallbackSrc: 'https://i.ibb.co/0j944vNC/image-8.jpg',
        alt: 'Awards ceremony for best creative painting, sculpture, and carnival exhibit',
        caption: 'Awarding trophies and artistic grants to standout student creative contributors'
      }
    ]
  },
  {
    id: 'farewell-party-2026',
    number: 19,
    title: 'Farewell party 2026',
    year: '2026',
    date: 'May 2026',
    category: 'Senior Send-Off',
    badge: 'Senior Batch Valedictory Gala',
    description: 'A momentous and nostalgic evening celebrating the graduating batch. Juniors presented formal titles, humorous video retrospectives, and musical dedications, followed by an elegant farewell dinner and words of wisdom from faculty mentors.',
    highlights: [
      'Graduating Senior Title Presentations',
      'Emotional Batch Retrospective Video Premiere',
      'Formal Black-Tie Banquet Dinner',
      'Faculty Mentors\' Farewell Blessing Speeches'
    ],
    images: [
      {
        src: '/assets/campus-life-new/campus-new-d.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Farewell Party 2026 formal stage ceremony with graduating seniors and faculty',
        caption: 'Farewell Party 2026 — Celebrating the indelible legacy of graduating seniors'
      },
      {
        src: '/assets/campus-life-new/campus-new-f.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Presentation of personalized honorary titles and sashes to graduating students',
        caption: 'Honoring senior achievers with bespoke sashes, titles, and mementos'
      },
      {
        src: '/assets/campus-life-new/campus-new-g.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Emotional video projection documenting four years of university memories and laughter',
        caption: 'Nostalgic documentary screening reliving four unforgettable collegiate years'
      },
      {
        src: '/assets/campus-life-new/campus-new-h.jpg',
        fallbackSrc: 'https://i.ibb.co/Hfkk9bSJ/Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'Formal candlelight banquet dinner arranged across the decorated university garden',
        caption: 'Sumptuous banquet dinner in an enchanting outdoor candlelight setting'
      },
      {
        src: '/assets/campus-life-new/campus-39.jpg',
        fallbackSrc: 'https://i.ibb.co/20TtTtdG/Whats-App-Image-2026-10-05-at-2-38-58-AM-1.jpg',
        alt: 'Faculty mentors delivering inspiring parting advice to outgoing professionals',
        caption: 'Professors imparting final words of wisdom and professional blessings'
      },
      {
        src: '/assets/campus-life-new/campus-29.jpg',
        fallbackSrc: 'https://i.ibb.co/0j944vNC/image-8.jpg',
        alt: 'Final graduating batch group portrait under festive fireworks display',
        caption: 'Final batch milestone — Stepping forward with pride, resilience, and lifelong friendships'
      }
    ]
  },
  {
    id: 'qawwali-night',
    number: 20,
    title: 'Qawwali Night',
    year: '2026',
    date: 'February 2026',
    category: 'Musical Traditions',
    badge: 'Traditional Sufi Musical Gala',
    description: 'A spiritually captivating night of classical Sufi Qawwali under the moonlit campus lawn. Renowned ensemble musicians performed timeless verses of Rumi, Bulleh Shah, and Amir Khusro, uniting the entire student community in cultural reverence.',
    highlights: [
      'Acclaimed Qawwal Ensemble Performance',
      'Traditional Persian Carpet & Lantern Seating',
      'Soulful Recitations of Classical Sufi Poetry',
      'Night-Long Kashmiri Chai & Jalebi Hospitality'
    ],
    images: [
      {
        src: '/assets/campus/haveli_cholistan_student_singing.jpg',
        fallbackSrc: 'https://i.ibb.co/7dwzJ7HH/Whats-App-Image-2026-10-11-at-11-12-56-PM.jpg',
        alt: 'Qawwali Night performance with ensemble musicians and lead vocalists in full flow',
        caption: 'Qawwali Night 2026 — Mesmerizing classical Sufi melodies echoing through campus'
      },
      {
        src: '/assets/campus-life/student-singing-vocal-performance.jpg',
        fallbackSrc: 'https://i.ibb.co/4RGfzpX8/image-2.jpg',
        alt: 'Student vocalists performing classical harmonies alongside traditional harmonium',
        caption: 'Harmonium and tabla rhythms accompanied by soaring vocal crescendos'
      },
      {
        src: '/assets/campus/campus-concert-live-music.png',
        fallbackSrc: 'https://i.ibb.co/dwVXXsjv/image-11.png',
        alt: 'Audience immersed in clapping and spiritual ecstasy during peak qawwali verses',
        caption: 'Enthralled audience clapping rhythmically to timeless devotional poetry'
      },
      {
        src: '/assets/campus-life-new/campus-new-a.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Elaborate traditional stage decor with antique lanterns and heritage rugs',
        caption: 'Traditional oriental rugs, lantern pathways, and heritage stage ambience'
      },
      {
        src: '/assets/campus-life-new/campus-36.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Campus lawn illuminated by ambient fairy lights and brass torches',
        caption: 'Fairy lights and brass torches casting an enchanting glow over the gathering'
      },
      {
        src: '/assets/campus-life-new/campus-31.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Students enjoying hot Kashmiri chai and sweets during the musical intermissions',
        caption: 'Traditional pink Kashmiri tea and warm jalebis shared in festive fellowship'
      }
    ]
  },
  {
    id: 'annual-project-exhibition-2026',
    number: 21,
    title: 'Annual project exhibition 2026',
    year: '2026',
    date: 'March 2026',
    category: 'Innovation & Tech',
    badge: 'Engineering, Computing & Business Innovation',
    description: 'The premier showcase of graduating capstone innovations! Over 80 student teams displayed cutting-edge AI prototypes, cyber-defense systems, IoT automation, fintech platforms, and biomedical research devices before industrial judges and investors.',
    highlights: [
      '80+ Live Interactive Tech & Business Demos',
      'Corporate Evaluators from IT & Banking Industry',
      'Spot Job Offers & Seed Grant Nominations',
      'Annual Innovation Trophy & Cash Awards'
    ],
    images: [
      {
        src: '/assets/events/project-exhibition-top.jpg',
        fallbackSrc: 'https://i.ibb.co/Z6gCjzm9/Whats-App-Image-2026-10-11-at-11-08-09-PM.jpg',
        alt: 'Annual Project Exhibition 2026 exhibition hall buzzing with student tech prototypes',
        caption: 'Annual Project Exhibition 2026 — Pioneering technological innovations on display'
      },
      {
        src: '/assets/events/project-exhibition.jpg',
        fallbackSrc: 'https://i.ibb.co/DPc3whkY/Whats-App-Image-2026-10-11-at-11-06-29-PM.jpg',
        alt: 'Student team demonstrating hardware robotics and autonomous drone control systems',
        caption: 'Robotics and autonomous drone demonstration before tech industry evaluators'
      },
      {
        src: '/assets/events/project-exhibition-2.jpg',
        fallbackSrc: 'https://i.ibb.co/JWgxKLmW/Whats-App-Image-2026-10-11-at-11-08-23-PM.jpg',
        alt: 'Software engineering team presenting cloud healthcare analytics platform',
        caption: 'Full-stack AI healthcare platform pitched by senior computer science students'
      },
      {
        src: '/assets/events/project-exhibition-3.jpg',
        fallbackSrc: 'https://i.ibb.co/1t5rZr61/Whats-App-Image-2026-10-11-at-11-09-58-PM.jpg',
        alt: 'Business analytics students showing predictive market forecasting dashboards',
        caption: 'Financial forecasting models and predictive business analytics dashboards'
      },
      {
        src: '/assets/events/project-exhibition-4.jpg',
        fallbackSrc: 'https://i.ibb.co/wFy5dC60/Whats-App-Image-2026-10-11-at-11-09-33-PM.jpg',
        alt: 'Biotechnology capstone researchers presenting novel antimicrobial compounds',
        caption: 'Biotechnology research posters detailing biological synthesis breakthroughs'
      },
      {
        src: '/assets/events/project-exhibition-5.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Award ceremony honoring best capstone projects with innovation shields and cash prizes',
        caption: 'Distribution of annual excellence trophies and cash awards to winning teams'
      }
    ]
  },
  {
    id: 'inovista-cholistan-movie-day',
    number: 22,
    title: 'Inovista Cholistan movie day',
    year: '2026',
    date: 'March 2026',
    category: 'Entertainment & Media',
    badge: 'Desert Cinema & Entertainment',
    description: 'An outdoor cinema retreat at Haveli Cholistan featuring a massive projector screen under the desert stars. Students enjoyed curated film screenings, live acoustic musical jams, bonfire conversations, and traditional Cholistani BBQ.',
    highlights: [
      'Giant Outdoor Desert Cinema Projection',
      'Acoustic Sing-along Sessions around the Bonfire',
      'Stargazing over the Pristine Cholistan Night Sky',
      'Traditional Barbecue & Desert Hospitality'
    ],
    images: [
      {
        src: '/assets/campus-life/innovista-cholistan-movie-singing.jpg',
        fallbackSrc: 'https://i.ibb.co/F4M5mF0r/Whats-App-Image-2026-10-11-at-11-23-40-PM.jpg',
        alt: 'Inovista Cholistan Movie Day students singing around campfire at Haveli Cholistan',
        caption: 'Inovista Cholistan Movie Day — Outdoor cinema and musical campfire in the desert'
      },
      {
        src: '/assets/campus-life/movie-day-addition.jpg',
        fallbackSrc: 'https://i.ibb.co/pjpRGkzG/Whats-App-Image-2026-10-11-at-11-24-05-PM.jpg',
        alt: 'Giant outdoor cinema screen setup against the historic architecture of Haveli Cholistan',
        caption: 'Open-air cinema screening under the pristine, star-filled Cholistani sky'
      },
      {
        src: '/assets/campus/haveli_cholistan_student_singing.jpg',
        fallbackSrc: 'https://i.ibb.co/7dwzJ7HH/Whats-App-Image-2026-10-11-at-11-12-56-PM.jpg',
        alt: 'Acoustic jam session with students singing popular songs by the desert fire pit',
        caption: 'Acoustic guitar sing-alongs and laughter echoing through the desert night'
      },
      {
        src: '/assets/campus-life-new/campus-new-i.jpg',
        fallbackSrc: 'https://i.ibb.co/ks8XD1L6/Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Delicious Cholistani barbecue and earthen-pot chai served to university students',
        caption: 'Authentic Cholistani barbecue and matka chai served around the desert campsite'
      },
      {
        src: '/assets/campus-life-new/campus-new-j.jpg',
        fallbackSrc: 'https://i.ibb.co/QF79SG2D/Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Students stargazing with telescope and enjoying telescope astronomy tutorials',
        caption: 'Desert astronomy and stargazing tutorials in the clean night atmosphere'
      },
      {
        src: '/assets/campus-life-new/campus-new-k.jpg',
        fallbackSrc: 'https://i.ibb.co/d0RFqWwY/Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Group celebration photo of Inovista Cholistan movie day attendees and faculty',
        caption: 'Unforgettable collegiate memories blending desert serenity and student joy'
      }
    ]
  }
];

export const EVENTS_2025 = CAMPUS_EVENTS_DATA.filter((e) => e.year === '2025');
export const EVENTS_2026 = CAMPUS_EVENTS_DATA.filter((e) => e.year === '2026');
