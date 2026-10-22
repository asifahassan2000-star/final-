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
        src: 'https://ik.imagekit.io/Muffins/image%20(18).jpg',
        alt: 'UCP Bahawalpur Alumni Reunion 2025 opening reception',
        caption: 'Alumni Reunion 2025 — Welcome reception and campus gathering'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%203.00.11%20AM%20(3).png',
        alt: 'Alumni Reunion 2025 special commemoration moments',
        caption: 'Alumni Reunion 2025 — Celebratory moments and distinguished delegates'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(48).png',
        alt: 'UCP Bahawalpur Alumni Reunion 2025 Sangat-e-Dostaan gathering',
        caption: 'Alumni Reunion 2025 — Grand Sangat-e-Dostaan gathering celebrating generational excellence'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(44).png',
        alt: 'Distinguished alumni group and guests at UCP Bahawalpur reunion ceremony',
        caption: 'Distinguished alumni and guests gathered at UCP Bahawalpur campus'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(46).png',
        alt: 'Alumni celebration and networking at UCP Bahawalpur',
        caption: 'Alumni networking and reconnecting across campus'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(45).png',
        alt: 'Evening stage celebration and honors during Alumni Reunion 2025',
        caption: 'Evening celebration ceremony and special honors on the main stage'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(52).png',
        alt: 'Alumni reunion attendees and campus festivities',
        caption: 'Celebrating shared campus memories and generational milestones'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(50).png',
        alt: 'University leadership welcoming returning graduates back to their alma mater',
        caption: 'University leadership welcoming returning graduates back to UCP'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(51).png',
        alt: 'Alumni reconnecting across decorated campus grounds',
        caption: 'Warm moments of reconnection among alumni batches'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(43).png',
        alt: 'Campus presentations and alumni celebration moments',
        caption: 'Honoring prominent alumni achievements and campus traditions'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(47).png',
        alt: 'Commemorative shields and excellence recognitions at Alumni Reunion 2025',
        caption: 'Presentation of honorary shields to distinguished alumni'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%203.00.11%20AM.jpeg',
        alt: 'Special guest delegation at Alumni Reunion 2025',
        caption: 'Distinguished guests and alumni delegation at Sangat-e-Dostaan 2025'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(49).png',
        alt: 'Grand alumni gathering and commemorative group photo',
        caption: 'Grand group photograph commemorating Alumni Reunion 2025'
      }
    ]
  },
  {
    id: 'orientation-day',
    number: 2,
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
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-21%20at%2011.28.10%20PM%20(1).png',
        fallbackSrc: '/assets/campus/orientation-day-celebration.jpg',
        alt: 'UCP Bahawalpur Orientation Day central auditorium welcome ceremony with freshmen',
        caption: 'Orientation Day 2025 — Incoming students inducted into the UCP academic tradition'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-21%20at%2011.28.10%20PM%20(3).png',
        fallbackSrc: '/assets/campus/student-classroom-presentation-1.jpg',
        alt: 'Deans and faculty addressing new students during the academic orientation session',
        caption: 'Leadership address: Deans and Directors sharing academic guidance and values'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-21%20at%2011.28.10%20PM%20(2).png',
        fallbackSrc: '/assets/campus/student-gathering-ground-1.jpg',
        alt: 'Freshmen batch receiving university guidance and curriculum roadmaps',
        caption: 'Curriculum overview and roadmap presentation in the university auditorium'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-21%20at%2011.28.10%20PM%20(4).png',
        fallbackSrc: '/assets/facilities/grand_staircase_central_atrium.jpg',
        alt: 'Interactive Q&A and student mentorship session during Orientation Day',
        caption: 'Senior student mentors guiding freshmen through campus resources and societies'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-21%20at%2011.37.33%20PM%20(2).png',
        fallbackSrc: '/assets/campus-life-new/campus-1.jpg',
        alt: 'Student society registration booths and campus engagement stalls',
        caption: 'Student societies and co-curricular clubs welcoming enthusiastic new members'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(64).png',
        fallbackSrc: '/assets/campus-life-new/campus-6.jpg',
        alt: 'Guided campus tour through academic wings and state-of-the-art facilities',
        caption: 'Guided orientation tours exploring modern computer labs, library, and lecture theatres'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-21%20at%2011.28.10%20PM.png',
        fallbackSrc: '/assets/campus/orientation-day-celebration.jpg',
        alt: 'Student ambassadors distributing academic kits, welcome dossiers, and university pins',
        caption: 'Ambassadors welcoming fresh entrants with personalized academic kits and badges'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-21%20at%2011.37.33%20PM%20(1).png',
        fallbackSrc: '/assets/campus-life-new/campus-1.jpg',
        alt: 'New students bonding in the campus courtyard and lawn areas',
        caption: 'New UCPians connecting with peers across university courtyards and green lawns'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-21%20at%2011.37.33%20PM.png',
        fallbackSrc: '/assets/campus-life-new/campus-6.jpg',
        alt: 'Commemorative photo moments and photo frame celebration on Orientation Day',
        caption: 'Capturing maiden university memories at the official Orientation Day photo spots'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(63).png',
        fallbackSrc: '/assets/campus/orientation-day-celebration.jpg',
        alt: 'Freshmen batch ensemble celebration marking the start of university life',
        caption: 'A celebratory welcome celebrating the beginning of an extraordinary academic journey'
      }
    ]
  },
  {
    id: '1st-day-welcome',
    number: 3,
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
        src: 'https://ik.imagekit.io/Muffins/image%20(56).png',
        alt: '1st Day Welcome red carpet entrance at UCP Bahawalpur',
        caption: '1st Day Welcome — Red carpet campus reception greeting new students'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.06%20AM%20(1).jpeg',
        alt: 'Students and faculty welcoming new arrivals on the first day',
        caption: 'Warm greetings and arrival moments as freshmen enter campus'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(54).png',
        alt: 'First day campus atmosphere and welcome activities',
        caption: 'Vibrant first day atmosphere across campus hallways and courtyard'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(55).png',
        alt: 'Faculty and student ambassadors greeting incoming students',
        caption: 'Faculty mentors and student ambassadors welcoming new students'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(57).png',
        alt: 'Student gathering and campus welcome activities',
        caption: 'New students congregating and celebrating their first university day'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(53).png',
        alt: 'First day welcome smiles and memorable moments',
        caption: 'Memorable first-day moments capturing the beginning of university life'
      }
    ]
  },
  {
    id: 'welcome-party-2025',
    number: 4,
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
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%202.32.52%20AM%20(3).jpeg?updatedAt=1792580312746',
        fallbackSrc: '/assets/campus-life-new/campus-new-a.jpg',
        alt: 'UCP Bahawalpur Welcome Party 2025 grand celebration stage and student gathering',
        caption: 'Welcome Party 2025 — Grand collegiate gala celebrating the incoming batch with electrifying performances'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%201.36.47%20AM.jpeg?updatedAt=1792580301241',
        fallbackSrc: '/assets/campus/campus-concert-live-music.png',
        alt: 'Students enjoying Welcome Party 2025 festivities and interactive segments',
        caption: 'Freshmen and senior students sharing memorable moments during the Welcome 2025 festivities'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%202.32.52%20AM%20(6).jpeg?updatedAt=1792580309892',
        fallbackSrc: '/assets/campus-life-new/campus-36.jpg',
        alt: 'Welcome Party 2025 live performance on the illuminated campus stage',
        caption: 'Live musical night performance under vibrant campus lighting and festive decor'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%202.32.53%20AM.jpeg?updatedAt=1792580310894',
        fallbackSrc: '/assets/campus-life-new/campus-new-b.jpg',
        alt: 'UCP Bahawalpur students celebrating together at Welcome Party 2025',
        caption: 'Enthusiastic audience cheering during theatrical drama skits and musical sets'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%202.32.52%20AM%20(5).jpeg?updatedAt=1792580308508',
        fallbackSrc: '/assets/campus-life-new/campus-11.jpg',
        alt: 'Welcome Party 2025 stage presentations and student recognition',
        caption: 'Honoring outstanding talent and presentations during the Welcome Gala evening'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%202.32.52%20AM%20(9).jpeg?updatedAt=1792580309558',
        fallbackSrc: '/assets/campus-life-new/campus-19.jpg',
        alt: 'Vibrant student crowd celebrating Welcome Party 2025',
        caption: 'Dynamic festive atmosphere across the decorated UCP Bahawalpur campus grounds'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%202.32.52%20AM%20(2).jpeg?updatedAt=1792580299843',
        fallbackSrc: '/assets/campus-life-new/campus-10.jpg',
        alt: 'Welcome Party 2025 campus celebrations and student group photography',
        caption: 'Students capturing unforgettable memories at the Welcome 2025 photo booth and lawn decor'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%202.32.53%20AM%20(1).jpeg?updatedAt=1792580307331',
        fallbackSrc: '/assets/campus-life-new/campus-12.jpg',
        alt: 'Stage lights and live musical beats at Welcome Party 2025',
        caption: 'Live band performance and cultural presentations entertaining the campus community'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%202.32.52%20AM%20(7).jpeg?updatedAt=1792580298134',
        fallbackSrc: '/assets/campus-life-new/campus-13.jpg',
        alt: 'Executive dinner and social gathering at Welcome Party 2025',
        caption: 'Formal banquet dinner and collegiate bonding under starlit Bahawalpur evening'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%202.32.52%20AM%20(8).jpeg?updatedAt=1792580312727',
        fallbackSrc: '/assets/campus-life-new/campus-14.jpg',
        alt: 'Student organizing committee and attendees celebrating Welcome Party 2025 finale',
        caption: 'Grand closing ceremony celebrating the triumphant success of Welcome Party 2025'
      }
    ]
  },
  {
    id: 'tutorial-lectures',
    number: 5,
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
        fallbackSrc: '/images/k20Sp6Gq_Whats-App-Image-2026-10-08-at-12-46-42-AM-3.jpg',
        alt: 'UCP Bahawalpur tutorial lecture session with interactive faculty instruction',
        caption: 'Interactive Tutorial Lectures — Deep-dive problem solving and conceptual clarity'
      },
      {
        src: '/assets/campus-life/tutorial-lecture-3.jpg',
        fallbackSrc: '/images/JYCmfbX_Whats-App-Image-2026-10-08-at-12-46-43-AM.jpg',
        alt: 'Students engaged in collaborative group exercises during academic tutorial session',
        caption: 'Collaborative small-group study clinics focused on academic excellence'
      },
      {
        src: '/assets/campus-life/tutorial-lecture-4.jpg',
        fallbackSrc: '/images/rKVgFRvy_Whats-App-Image-2026-10-08-at-12-46-42-AM.jpg',
        alt: 'Faculty mentor guiding students through analytical problem solving on whiteboard',
        caption: 'Individualized mentor guidance ensuring thorough understanding of course modules'
      },
      {
        src: '/assets/campus-life/student-digital-skills-lab.jpg',
        fallbackSrc: '/images/5x6v5v8X_image-1.jpg',
        alt: 'Hands-on digital skills laboratory training in high-tech computer lab',
        caption: 'Computer science & AI students coding hands-on in the modern computing lab'
      },
      {
        src: '/assets/campus-life/student-recreational-gaming-tutorial.jpg',
        fallbackSrc: '/images/d0RFqWwY_Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Esports, algorithmic game development, and logic reasoning workshop session',
        caption: 'Algorithmic game development and logic puzzles during recreational skill clinics'
      },
      {
        src: '/assets/facilities/comp-lab-1.jpg',
        fallbackSrc: '/images/ks8XD1L6_Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
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
    number: 6,
    title: 'ISAISS 2026 (Symposium and Seminar)',
    year: '2026',
    date: 'January 2026',
    category: 'Academic Symposium',
    badge: 'International AI & Security Conference',
    description: 'A premier international symposium and academic seminar bringing together global AI researchers, cybersecurity professionals, university faculty, and industry speakers. Alongside research tracks exploring ethical AI, neural architectures, and quantum cryptography, the event featured an intensive seminar on professional communication skills and leadership.',
    highlights: [
      'International Keynote Speakers & Academicians',
      'Seminar on Professional Communication Skills',
      '30+ Peer-Reviewed Research Presentations',
      'Panel Discussion on Cybersecurity & Generative AI'
    ],
    images: [
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-12%20at%203.51.10%20AM.jpeg',
        fallbackSrc: '/assets/events/international-symposium-ai.jpg',
        alt: 'ISAISS 2026 International Symposium on AI and Secure Systems conference session',
        caption: 'ISAISS 2026 — International Symposium on Artificial Intelligence & Secure Systems'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-12%20at%203.49.32%20AM.jpeg',
        fallbackSrc: '/assets/events/international-symposium-ai-2.jpg',
        alt: 'Keynote speakers and research scholars addressing ISAISS 2026 plenary',
        caption: 'Distinguished researchers presenting advances in neural networks and cybersecurity'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-12%20at%203.48.34%20AM.jpeg',
        fallbackSrc: '/assets/events/international-symposium-ai-3.jpg',
        alt: 'Panel discussion on generative AI governance and ethical intelligent systems',
        caption: 'Expert panel session exploring ethical AI frameworks and quantum-safe cryptography'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-12%20at%203.50.32%20AM.jpeg',
        fallbackSrc: '/assets/events/symposium-ai-secure-systems-1.jpg',
        alt: 'Auditorium audience of computing scholars, industry engineers, and university faculty',
        caption: 'Engaged academic assembly of researchers, delegates, and postgraduate students'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.14.54%20PM.jpeg',
        fallbackSrc: '/assets/events/symposium-ai-secure-systems-2.jpg',
        alt: 'Presentation of symposium crests and commemorative shields to guest speakers',
        caption: 'Conferring honorary shields and certificates to keynote speakers and scholars'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.02.58%20PM.jpeg',
        fallbackSrc: '/assets/events/seminar-comm-keynote-large.jpg',
        alt: 'Seminar on Communication Skills: Keynote speaker addressing UCP students on public speaking',
        caption: 'Seminar on Communication Skills — Developing articulate presentation and rhetoric mastery'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.04.13%20PM.jpeg',
        fallbackSrc: '/assets/campus/student-classroom-presentation-2.jpg',
        alt: 'Interactive workshop on verbal fluency, interview techniques, and interpersonal leadership',
        caption: 'Interactive communication workshop focusing on corporate pitching and executive presence'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(15).png',
        fallbackSrc: '/assets/events/symposium-ai-secure-systems-2.jpg',
        alt: 'Commemorative certificate and token of appreciation presented to communication seminar trainer',
        caption: 'Conferring honorary shields to communication trainers and symposium session chairs'
      }
    ]
  },
  {
    id: 'ucp-elite-student-network',
    number: 7,
    title: 'UCP Elite student Network campaign',
    year: '2026',
    date: 'January - February 2026',
    category: 'Student Leadership',
    badge: 'Merit & Leadership Showcase',
    description: 'An official campus-wide campaign spotlighting top academic achievers, merit scholarship recipients, and society presidents. The network fosters leadership development, career mentoring, and corporate networking for high-performing UCPians.',
    highlights: [
      'Up to 50% Merit Scholarship Achievers Recognized',
      'Executive Mentoring by Corporate Leaders',
      'Campus Brand Ambassador Induction',
      'Professional Development & Public Speaking Bootcamps'
    ],
    images: [
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%2011.54.53%20PM.jpeg',
        fallbackSrc: '/assets/elite-network-new/elite-1.jpg',
        alt: 'UCP Elite Student Network scholars and student leadership council',
        caption: 'UCP Elite Student Network — Dedicated scholars and emerging campus leaders'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%201.36.45%20AM.jpeg?updatedAt=1792580286666',
        fallbackSrc: '/assets/elite-network-new/elite-1.jpg',
        alt: 'UCP Elite Student Network top scholars and student ambassadors celebrating excellence',
        caption: 'UCP Elite Student Network — Inspiring student scholars and campus ambassadors'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-08%20at%2012.41.42%20AM.jpeg',
        fallbackSrc: '/assets/elite-network-new/elite-1.jpg',
        alt: 'UCP Elite Student Network scholars and student brand ambassadors in campus lounge',
        caption: 'UCP Elite Student Network — Empowering top academic achievers and student ambassadors'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-08%20at%2012.44.21%20AM%20(8).jpeg',
        fallbackSrc: '/assets/elite-network-new/elite-2.jpg',
        alt: 'Elite Student Network leadership conference and peer mentorship session',
        caption: 'Scholars participating in executive leadership and collaborative mentorship discussions'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-08%20at%2012.44.21%20AM%20(7).jpeg',
        fallbackSrc: '/assets/elite-network-new/elite-3.jpg',
        alt: 'UCP Elite Student Network certificate and recognition ceremony',
        caption: 'Recognizing academic distinction and leadership contributions across faculties'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-08%20at%2012.43.08%20AM%20(3).jpeg',
        fallbackSrc: '/assets/elite-network-new/elite-4.jpg',
        alt: 'Elite student ambassadors presenting university initiatives and community projects',
        caption: 'Elite ambassadors spearheading impactful community and academic engagement projects'
      },
      {
        src: '/assets/elite-network-new/elite-1.jpg',
        fallbackSrc: '/images/4RGfzpX8_image-2.jpg',
        alt: 'UCP Elite Student Network campaign launch featuring academic scholars and ambassadors',
        caption: 'UCP Elite Student Network — Celebrating academic excellence and campus leadership'
      },
      {
        src: '/assets/elite-network-new/elite-2.jpg',
        fallbackSrc: '/images/5x6v5v8X_image-1.jpg',
        alt: 'Top academic achievers receiving official UCP Elite lapel pins and certificates',
        caption: 'Top rankers across Computer Science and Business inducted into the Elite Circle'
      },
      {
        src: '/assets/elite-network-new/elite-3.jpg',
        fallbackSrc: '/images/ks8XD1L6_Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Executive round-table discussion between student leaders and visiting industry CEOs',
        caption: 'Executive networking roundtable bridging student talent with corporate leadership'
      },
      {
        src: '/assets/elite-network-new/elite-4.jpg',
        fallbackSrc: '/images/QF79SG2D_Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Public speaking and corporate leadership masterclass for Elite Network scholars',
        caption: 'Masterclasses in corporate communication, personal branding, and venture leadership'
      },
      {
        src: '/assets/elite-network-new/elite-7.jpg',
        fallbackSrc: '/images/d0RFqWwY_Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Elite Network ambassadors presenting campus community outreach programs',
        caption: 'Student ambassadors spearheading youth development and mentorship initiatives'
      },
      {
        src: '/assets/elite-network-new/elite-11.jpg',
        fallbackSrc: '/images/Hfkk9bSJ_Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'Official group portrait of UCP Bahawalpur Elite Student Network cohort',
        caption: 'The inspiring faces of academic distinction and future leadership at UCP'
      }
    ]
  },
  {
    id: 'state-bank-session-2026',
    number: 8,
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
        fallbackSrc: '/images/wFy5dC60_Whats-App-Image-2026-10-11-at-11-09-33-PM.jpg',
        alt: 'State Bank of Pakistan senior director addressing UCP Bahawalpur business and IT students',
        caption: 'State Bank Session 2026 — Central bank executives elucidating monetary policy'
      },
      {
        src: '/assets/events/seminar-audience-delegates.jpg',
        fallbackSrc: '/images/1t5rZr61_Whats-App-Image-2026-10-11-at-11-09-58-PM.jpg',
        alt: 'Students and finance faculty actively taking notes during the State Bank briefing',
        caption: 'Auditorium of BBA and Accounting students absorbing insights on digital banking'
      },
      {
        src: '/assets/events/seminar-stage-panel.jpg',
        fallbackSrc: '/images/Z6gCjzm9_Whats-App-Image-2026-10-11-at-11-08-09-PM.jpg',
        alt: 'Panel discussion on Islamic banking, digital currency, and fintech entrepreneurship',
        caption: 'Interactive dialogue regarding entrepreneurship capital and SME financing'
      },
      {
        src: '/assets/events/seminar-overview-1.jpg',
        fallbackSrc: '/images/DPc3whkY_Whats-App-Image-2026-10-11-at-11-06-29-PM.jpg',
        alt: 'Wide view of the seminar hall with official SBP banners and digital display',
        caption: 'Comprehensive seminar overview highlighting Pakistan’s financial inclusion agenda'
      },
      {
        src: '/assets/events/seminar-overview-2.jpg',
        fallbackSrc: '/images/JWgxKLmW_Whats-App-Image-2026-10-11-at-11-08-23-PM.jpg',
        alt: 'Q&A session with students asking questions about SBP internships and exam schemes',
        caption: 'Direct engagement: Students clarifying banking exam schemes and internship routes'
      },
      {
        src: '/assets/events/seminar-comm-keynote-large.jpg',
        fallbackSrc: '/images/ks8XD1L6_Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Shield exchange ceremony honoring State Bank of Pakistan guest dignitaries',
        caption: 'UCP Director presenting honorary institution memento to SBP regional leadership'
      }
    ]
  },
  {
    id: 'teaching-excellence-360',
    number: 9,
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
        src: 'https://ik.imagekit.io/Muffins/image%20(66).png',
        fallbackSrc: '/assets/campus/teacher-training-presentation.jpg',
        alt: 'Teaching Excellence 360 faculty development seminar in session',
        caption: 'Teaching Excellence 360° — Faculty mastering modern student-centric pedagogies'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(68).png',
        fallbackSrc: '/assets/faculty/faculty-in-action-presentation.jpg',
        alt: 'Keynote lecture on transformative teaching and active learning strategies',
        caption: 'Keynote presentation on outcome-based education and transformative curricula'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(65).png',
        fallbackSrc: '/assets/events/workshop-endnote-shahid-amin.jpg',
        alt: 'Interactive faculty workshop with practical teaching exercises',
        caption: 'Faculty collaborative workshop refining classroom engagement and instructional rubrics'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(70).png',
        fallbackSrc: '/assets/campus/student-classroom-presentation-2.jpg',
        alt: 'Professors participating in interactive digital learning and pedagogy breakout group',
        caption: 'Departmental breakout sessions discussing interactive assessment frameworks'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(67).png',
        fallbackSrc: '/assets/facilities/comp-lab-2.jpg',
        alt: 'Senior educationist presenting research-informed instructional methodologies',
        caption: 'Senior educationists demonstrating research-backed classroom pedagogies'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(69).png',
        fallbackSrc: '/assets/facilities/science_lab_1.jpg',
        alt: 'Faculty attendees actively participating in pedagogical debate and discussion',
        caption: 'Faculty discourse on advancing student engagement and innovative learning techniques'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(71).png',
        fallbackSrc: '/assets/campus/teacher-training-presentation.jpg',
        alt: 'Presentation of training certificates to faculty cohort members',
        caption: 'Awarding certificates of completion to faculty participants for pedagogical excellence'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-21%20at%2011.42.04%20PM%20(1).png',
        fallbackSrc: '/assets/faculty/faculty-in-action-presentation.jpg',
        alt: 'Faculty hands-on training session on learning technology and digital classrooms',
        caption: 'Hands-on training integrating digital classroom tools and modern LMS portals'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-21%20at%2011.42.04%20PM.png',
        fallbackSrc: '/assets/campus/teacher-training-presentation.jpg',
        alt: 'Commemorative group photograph of UCP faculty and trainers at Teaching Excellence 360',
        caption: 'Faculty cohort group portrait concluding the Teaching Excellence 360° symposium'
      }
    ]
  },
  {
    id: 'documentary-reel-competition',
    number: 10,
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
        fallbackSrc: '/images/Z6gCjzm9_Whats-App-Image-2026-10-11-at-11-08-09-PM.jpg',
        alt: 'Documentary and Reel Competition main screening hall at UCP Bahawalpur',
        caption: 'Documentary & Reel Competition — Cinematic student films on the big screen'
      },
      {
        src: '/assets/events/documentary-competition-2.jpg',
        fallbackSrc: '/images/DPc3whkY_Whats-App-Image-2026-10-11-at-11-06-29-PM.jpg',
        alt: 'Student directors presenting creative rationale and cinematography techniques to jury',
        caption: 'Filmmaking teams pitching creative concepts and documentary narratives to judges'
      },
      {
        src: '/assets/events/documentary-competition-3.jpg',
        fallbackSrc: '/images/JWgxKLmW_Whats-App-Image-2026-10-11-at-11-08-23-PM.jpg',
        alt: 'Audience applauding winning short film during gala screening ceremony',
        caption: 'Auditorium audience reacting enthusiastically to inspiring reel storylines'
      },
      {
        src: '/assets/events/documentary-competition-judges.jpg',
        fallbackSrc: '/images/wFy5dC60_Whats-App-Image-2026-10-11-at-11-09-33-PM.jpg',
        alt: 'Distinguished panel of professional film directors and media anchors judging entries',
        caption: 'Expert media jury critically assessing cinematography, editing, and sound design'
      },
      {
        src: '/assets/events/documentary-competition-awards.jpg',
        fallbackSrc: '/images/1t5rZr61_Whats-App-Image-2026-10-11-at-11-09-58-PM.jpg',
        alt: 'Award ceremony presenting cash prizes, trophies, and certificates to winning students',
        caption: 'Trophy presentation celebrating the champion student documentary creators'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.08.45%20PM.jpeg',
        fallbackSrc: '/assets/campus-life/movie-day-addition.jpg',
        alt: 'Student filmmakers and content creators showcasing creative video productions',
        caption: 'Creative post-production editing showcase and student filmmaker presentations'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.09.06%20PM.jpeg',
        fallbackSrc: '/images/1Y1Q7MxY_Whats-App-Image-2026-10-11-at-11-12-31-PM.jpg',
        alt: 'Documentary and Reel Competition showcase ceremony and director group photo',
        caption: 'Student content creators, visual storytellers, and media coordinators celebrating cinematic excellence'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.07.35%20PM.jpeg',
        fallbackSrc: '/assets/events/documentary-competition-1.jpg',
        alt: 'Student filmmakers and visual artists showcasing documentary storytelling',
        caption: 'Inspiring visual journalism, documentary screenings, and creative student cinema'
      }
    ]
  },
  {
    id: 'village-tour',
    number: 11,
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
        fallbackSrc: '/images/KxnwgN6v_Whats-App-Image-2026-10-05-at-1-17-53-AM-4-Copy.jpg',
        alt: 'UCP Bahawalpur students arriving in rural Southern Punjab village on heritage excursion',
        caption: 'Village Tour 2026 — Experiencing authentic agrarian traditions and rural warmth'
      },
      {
        src: '/assets/campus-life/village-tour-3.jpg',
        fallbackSrc: '/images/hxJ4v4xv_Whats-App-Image-2026-10-11-at-11-30-43-PM.jpg',
        alt: 'Agricultural field research examining organic crop farming and canal irrigation',
        caption: 'Students analyzing crop cycles, drip irrigation, and rural agro-economics'
      },
      {
        src: '/assets/campus-life/village-tour-4.jpg',
        fallbackSrc: '/images/W4CphPKd_Whats-App-Image-2026-10-11-at-11-31-06-PM.jpg',
        alt: 'Traditional village courtyard gathering with village elders and organic rural dining',
        caption: 'Enjoying traditional rural tandoori dining and folkloric tales with village elders'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.17.53%20AM%20(12).jpeg',
        fallbackSrc: '/assets/campus-life/campus-activity-2.jpg',
        alt: 'Students exploring rural architectural heritage and village lifestyle',
        caption: 'Field immersion in rural crafts, community interactions, and cultural heritage'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.17.53%20AM%20(1)%20-%20Copy.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-14.jpg',
        alt: 'Students and faculty during rural community study session',
        caption: 'Experiential learning and field observations with local farming families'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.17.53%20AM%20(5)%20-%20Copy.jpeg',
        fallbackSrc: '/images/PvhQzQgn_Whats-App-Image-2026-10-05-at-1-17-53-AM-5-Copy.jpg',
        alt: 'Field observations and ecological insights in rural Bahawalpur outskirts',
        caption: 'Studying sustainable agriculture, traditional irrigation, and village ecology'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.17.53%20AM%20(8).jpeg',
        fallbackSrc: '/images/tpSrPtDC_Whats-App-Image-2026-10-05-at-1-17-53-AM-1-Copy.jpg',
        alt: 'Village community interaction and experiential rural culture tour',
        caption: 'Experiencing warm rural hospitality and cultural storytelling with local elders'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.17.53%20AM%20(3)%20-%20Copy.jpeg',
        fallbackSrc: '/images/rfQMzVZ6_Whats-App-Image-2026-10-05-at-1-17-53-AM-3-Copy.jpg',
        alt: 'Traditional rural homesteads and agricultural fieldwork study',
        caption: 'Fieldwork documenting regional pastoral customs, agrarian crafts, and rural life'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.17.53%20AM%20(6)%20-%20Copy.jpeg',
        fallbackSrc: '/images/dJXJwCKk_Whats-App-Image-2026-10-05-at-1-17-53-AM-7-Copy.jpg',
        alt: 'Student cohort visiting rural artisans and cottage enterprises',
        caption: 'Exploring artisanal cottage industries and traditional craftsmanship in the village'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.17.53%20AM%20-%20Copy.jpeg',
        fallbackSrc: '/images/yn90BQCV_Whats-App-Image-2026-10-05-at-1-17-53-AM-Copy.jpg',
        alt: 'Authentic village landscape and traditional mud-brick courtyards',
        caption: 'Documenting architectural heritage and serene rural surroundings in Southern Punjab'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.17.53%20AM%20(2)%20-%20Copy.jpeg',
        fallbackSrc: '/images/8D3ZbPGK_Whats-App-Image-2026-10-05-at-1-17-53-AM-2-Copy.jpg',
        alt: 'Students experiencing traditional rural practices and livestock farming',
        caption: 'Hands-on agricultural insights into organic farming and rural livelihoods'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.17.53%20AM%20(13).jpeg',
        fallbackSrc: '/images/wF7fbh1h_Whats-App-Image-2026-10-05-at-1-17-53-AM-13-Copy.jpg',
        alt: 'Village tour memorable encounters and friendly local receptions',
        caption: 'Warm community reception reflecting timeless Cholistani and Saraiki culture'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.17.53%20AM%20(11).jpeg',
        fallbackSrc: '/images/MxkcXbzY_Whats-App-Image-2026-10-05-at-1-17-53-AM-11.jpg',
        alt: 'Commemorative group photograph of students and community members',
        caption: 'A memorable village excursion fostering cultural empathy and community solidarity'
      }
    ]
  },
  {
    id: 'spring-festival',
    number: 12,
    title: 'Spring Festival',
    year: '2026',
    date: 'March 2026',
    category: 'Cultural Fest',
    badge: 'Jashn-e-Baharan at Haveli Cholistan',
    description: 'Hosted in the heart-warming, regal ambiance of Haveli Cholistan, this festive Spring celebration immersed students in the timeless cultural charm of Bahawalpur\'s historic Nawabi heritage. Amidst classic architectural arches, festive floral courtyard decor, soul-stirring folk music, authentic regional culinary feasts, and vibrant traditional attire, students spent an unforgettable time experiencing the warmth, elegance, and living history of the princely state of Bahawalpur.',
    highlights: [
      'Regal Nawabi-Style Ambience at Haveli Cholistan',
      'Live Folk Instrumental, Dhol & Classical Recitals',
      'Authentic Regional Delicacies & Royal Feast Kiosks',
      'Provincial Cultural Pavilions & Traditional Attire Showcase'
    ],
    images: [
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.05%20AM%20(1).jpeg',
        fallbackSrc: '/assets/campus-life/campus-life-culture-1.jpg',
        alt: 'Spring Festival Jashn-e-Baharan celebration at Haveli Cholistan in grand Nawabi style',
        caption: 'Spring Festival 2026 — Jashn-e-Baharan at Haveli Cholistan celebrating Bahawalpur’s Nawabi heritage'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.13.40%20PM.jpeg',
        fallbackSrc: '/assets/campus-life/campus-life-culture-2.jpg',
        alt: 'Students dressed in colorful provincial attire representing Pakistan cultural diversity',
        caption: 'Celebrating provincial unity with Sindhi, Balochi, Pashto, and Punjabi traditions'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.05%20AM%20(2).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-new-c.jpg',
        alt: 'Live folk instrumental performances and energetic dhol rhythms',
        caption: 'Live dhol rhythms and folk instrumental melodies energizing the student crowd'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.04%20AM%20(1).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-30.jpg',
        alt: 'Floral exhibitions, garden designs, and blooming flower competitions',
        caption: 'Artistic floral arrangements and garden exhibits curated by student societies'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.04%20AM%20(2).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-17.jpg',
        alt: 'Food street pavilions serving authentic traditional regional cuisines',
        caption: 'Bustling student food kiosks serving authentic traditional treats and cuisines'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.05%20AM.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-20.jpg',
        alt: 'Students participating in kite flying traditions and festive campus games',
        caption: 'Traditional spring festivities, cultural games, and campus camaraderie'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.12.31%20PM.jpeg',
        fallbackSrc: '/assets/campus-life/campus-life-culture-1.jpg',
        alt: 'Regional cultural pavilions showcasing artisanal embroidery and crafts',
        caption: 'Cultural exhibition showcasing regional handicrafts, Ajraks, and shawls'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.11.08%20PM.jpeg',
        fallbackSrc: '/assets/campus-life/campus-life-culture-2.jpg',
        alt: 'Live student theatrical performance on spring themes and cultural unity',
        caption: 'Stage performances, theatrical sketches, and cultural recitals on the main lawn'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.05%20AM%20(3).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-new-c.jpg',
        alt: 'Campus quad decorated with colorful ribbons, kites, and spring motifs',
        caption: 'Vibrant quad decor and celebratory campus atmosphere welcoming spring'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.04%20AM.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-30.jpg',
        alt: 'Students enjoying music, laughter, and springtime festivities together',
        caption: 'Memorable youth moments and joyous student celebrations under sunny skies'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-19%20at%202.10.10%20AM.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-17.jpg',
        alt: 'Award ceremony for best floral arrangement and provincial stall decoration',
        caption: 'Honoring outstanding student society stalls and creative cultural presentations'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-19%20at%202.10.09%20AM.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-20.jpg',
        alt: 'Grand group celebration of UCP Bahawalpur students and faculty at Spring Festival',
        caption: 'Grand ensemble photograph celebrating the resounding success of Spring Festival 2026'
      }
    ]
  },
  {
    id: '21-jeep-rally-2026',
    number: 13,
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
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.12%20AM%20(1).jpeg',
        fallbackSrc: '/assets/campus-life/jeep-rally-main.jpg',
        alt: '21st Cholistan Desert Jeep Rally 2026 race track excitement and vehicle lineup',
        caption: '21st Cholistan Jeep Rally 2026 — Roaring engines and racing excitement across desert dunes'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.14%20AM%20(1).jpeg',
        fallbackSrc: '/assets/campus-life/jeep-rally-meeting-1.jpg',
        alt: 'UCP Bahawalpur students and organizers at Cholistan Jeep Rally track',
        caption: 'UCP student contingents experiencing the high-speed thrills at the Derawar Fort circuit'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.13%20AM%20(2).jpeg',
        fallbackSrc: '/assets/campus-life/jeep-rally-meeting-2.jpg',
        alt: '4x4 desert racing vehicles conquering tough Cholistan sand terrain',
        caption: 'High-octane 4x4 rally vehicles maneuvering the challenging desert dunes'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.14%20AM%20(3).jpeg',
        fallbackSrc: '/assets/events/mou-haveli-cholistan-jeep-rally.jpg',
        alt: 'Spectators and students enjoying the Cholistan rally festivities and atmosphere',
        caption: 'Vibrant festival atmosphere welcoming automotive enthusiasts and student volunteers'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.12%20AM%20(2).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-3.jpg',
        alt: 'Desert landscape and rally racing checkpoint near Derawar Fort',
        caption: 'Scenic desert checkpoints highlighting the grandeur of Derawar Fort and Cholistan'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.15%20AM.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-9.jpg',
        alt: 'UCP students and rally team members sharing memorable moments at the camp',
        caption: 'Camp hospitality and cultural camaraderie during the annual desert motorsport festival'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.14%20AM%20(2).jpeg',
        fallbackSrc: '/assets/campus-life/jeep-rally-main.jpg',
        alt: 'Rally drivers and custom 4x4 vehicles preparing at the starting grid',
        caption: 'Technical vehicle inspections and adrenaline-filled race starts on the desert course'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(4).png',
        fallbackSrc: '/assets/events/mou-haveli-cholistan-jeep-rally.jpg',
        alt: 'Official commemorative visual for the 21st Cholistan Jeep Rally 2026',
        caption: 'Celebrating sportsmanship, adventure tourism, and cultural heritage at Cholistan Rally 2026'
      }
    ]
  },
  {
    id: 'ice-throne-event',
    number: 14,
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
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%2012.30.03%20AM.jpeg?updatedAt=1792580311292',
        fallbackSrc: '/assets/campus-life-new/campus-36.jpg',
        alt: 'Ice Throne Event grand thematic stage and student celebration',
        caption: 'Ice Throne Event — Magnificent crystalline stage decor and fantasy atmosphere'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%2012.30.46%20AM.jpeg?updatedAt=1792580312465',
        fallbackSrc: '/assets/campus-life-new/campus-37.jpg',
        alt: 'Students enjoying the Ice Throne themed festivities and character performances',
        caption: 'Theatrical winter gala with cosplay pageants and character performances'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%2012.32.16%20AM.jpeg?updatedAt=1792580286865',
        fallbackSrc: '/assets/campus-life-new/campus-40.jpg',
        alt: 'Vibrant student crowd celebrating around the Ice Throne setup',
        caption: 'Students gathering around the illuminated Ice Throne centerpiece'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%2012.32.04%20AM.jpeg?updatedAt=1792580289029',
        fallbackSrc: '/assets/campus-life-new/campus-45.jpg',
        alt: 'Atmospheric stage lighting and winter fantasy decor on campus',
        caption: 'Spectacular atmospheric lighting and winter wonderland decor'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%2012.28.17%20AM.jpeg?updatedAt=1792580308464',
        fallbackSrc: '/assets/campus-life-new/campus-46.jpg',
        alt: 'Cosplay competition participants posing at the Ice Throne',
        caption: 'Cosplay tournament participants displaying imaginative fantasy attire'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%2012.31.54%20AM.jpeg?updatedAt=1792580286851',
        fallbackSrc: '/assets/campus-life-new/campus-47.jpg',
        alt: 'Students sharing memorable photo moments during the Ice Throne gala',
        caption: 'Cherished student memories and photography at the winter gala'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.17%20AM%20(2)%20-%20Copy%20-%20Copy.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-36.jpg',
        alt: 'Interactive gaming and student activities at the Ice Throne festival',
        caption: 'Interactive quests, gaming challenges, and stage trivia competitions'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.15%20AM%20(2)%20-%20Copy.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-37.jpg',
        alt: 'Festive student group celebration and cheerful moments',
        caption: 'Dynamic campus enthusiasm and cheerful group festivities'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.06.21%20AM%20(1)%20-%20Copy.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-40.jpg',
        alt: 'Evening illuminations and ambient winter festival stalls',
        caption: 'Evening festivities with warm winter beverage kiosks and food stalls'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.16%20AM%20(1)%20-%20Copy%20-%20Copy.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-45.jpg',
        alt: 'Student performers and theatrical enactments at the Ice Throne',
        caption: 'Student artists delivering high-energy theatrical acts and skits'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.16%20AM%20-%20Copy.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-46.jpg',
        alt: 'Students posing with the royal Ice Throne crown and props',
        caption: 'Royal Ice Throne photo sessions and interactive student pageantry'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.06.21%20AM%20(2)%20-%20Copy.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-47.jpg',
        alt: 'Grand ensemble celebration and memorable moments of Ice Throne event',
        caption: 'A celebratory closing to one of the winter semester’s most creative spectacles'
      }
    ]
  },
  {
    id: 'mou-signing-tdcp-cholistan',
    number: 15,
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
        fallbackSrc: '/images/chjWx2NR_Whats-App-Image-2026-10-13-at-1-06-35-AM.jpg',
        alt: 'Historic MOU signing ceremony between UCP Bahawalpur Director and TDCP officials',
        caption: 'MOU Signing Ceremony — Sealing strategic partnerships for student opportunities'
      },
      {
        src: '/assets/events/mou-haveli-cholistan-jeep-rally.jpg',
        fallbackSrc: '/images/PshpBWGn_Whats-App-Image-2026-10-05-at-2-39-14-AM.jpg',
        alt: 'Delegates from Haveli Cholistan and university administration finalizing collaboration documents',
        caption: 'Collaborative pact with Haveli Cholistan promoting eco-tourism and cultural research'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.23.52%20AM.jpeg',
        fallbackSrc: '/assets/leadership/director-faculty-handshake.jpg',
        alt: 'Strategic MoU coordination meeting between UCP leadership, TDCP, and Haveli Cholistan',
        caption: 'Strategic MoU discussions between UCP administrative leadership and tourism authorities'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.23.51%20AM%20(2).jpeg',
        fallbackSrc: '/assets/leadership/leadership-official-gathering.jpg',
        alt: 'Signing of collaboration documents and partnership agreements at Haveli Cholistan',
        caption: 'Execution of collaboration pacts fostering tourism development and academic research'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%201.23.51%20AM.jpeg',
        fallbackSrc: '/assets/campus-life/campus-collaboration-1.jpg',
        alt: 'Delegation meeting discussing student internships and cultural research initiatives',
        caption: 'Delegation review detailing student internships, desert heritage tours, and field research'
      },
      {
        src: '/assets/campus-life/campus-collaboration-2.jpg',
        fallbackSrc: '/images/Hfkk9bSJ_Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'Joint delegation group portrait marking commitment to Southern Punjab heritage development',
        caption: 'Historic delegation group portrait inaugurating multi-year collaboration'
      }
    ]
  },
  {
    id: 'mothers-day',
    number: 16,
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
        fallbackSrc: '/images/pjcYnN2B_Whats-App-Image-2026-10-05-at-2-39-19-AM-2.jpg',
        alt: 'Mother\'s Day celebration at UCP Bahawalpur with mothers honored on main stage',
        caption: 'Mothers Day 2026 — Celebrating maternal sacrifice, guidance, and endless love'
      },
      {
        src: '/assets/campus-life/mothers-day-tribute-replacement.jpg',
        fallbackSrc: '/images/HTqzJNjb_Whats-App-Image-2026-10-05-at-1-12-46-AM.jpg',
        alt: 'Students presenting personalized floral bouquets and gratitude letters to mothers',
        caption: 'Students presenting hand-crafted floral bouquets and heartfelt letters of thanks'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%201.30.57%20AM%20(1).jpeg?updatedAt=1792580309872',
        fallbackSrc: '/assets/campus-life-new/campus-18.jpg',
        alt: 'Poignant poetry recitations and speeches dedicated to mothers at UCP Bahawalpur',
        caption: 'Students reciting touching tributes and poetic verses honoring maternal affection'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%201.34.21%20AM.jpeg?updatedAt=1792580312645',
        fallbackSrc: '/assets/campus-life-new/campus-22.jpg',
        alt: 'Honoring mothers of academic achievers with honorary shields and tokens',
        caption: 'Recognizing and honoring exemplary mothers for supporting student milestones'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%201.31.13%20AM.jpeg?updatedAt=1792580312027',
        fallbackSrc: '/assets/campus-life-new/campus-25.jpg',
        alt: 'Auditorium screening of student video tributes and family journeys',
        caption: 'Emotional reflections and student video dedications highlighting maternal dedication'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-20%20at%201.35.18%20AM.jpeg?updatedAt=1792580311777',
        fallbackSrc: '/assets/campus-life-new/campus-28.jpg',
        alt: 'Students and families celebrating Mothers Day together in decorated campus hall',
        caption: 'Family celebrations and heartwarming bonding moments during the annual tribute'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(61).png',
        fallbackSrc: '/assets/campus-life-new/campus-18.jpg',
        alt: 'Floral presentations and celebratory souvenirs given to guest mothers',
        caption: 'Floral arrangements, souvenir gifts, and commemorative tokens presented to mothers'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(62).png',
        fallbackSrc: '/assets/campus-life-new/campus-22.jpg',
        alt: 'Auditorium audience of students, faculty, and mothers applauding tribute speeches',
        caption: 'Campus community and families united in expressing gratitude and reverence'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(60).png',
        fallbackSrc: '/assets/campus-life-new/campus-25.jpg',
        alt: 'Commemorative group portrait of students, mothers, and university leadership',
        caption: 'Grand ensemble photograph concluding Mothers Day 2026 celebration in Bahawalpur'
      }
    ]
  },
  {
    id: 'arts-and-carnival-festival',
    number: 17,
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
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.38.57%20AM%20(1).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-15.jpg',
        alt: 'Arts and Carnival Festival vibrant campus venue and student stalls',
        caption: 'Arts & Carnival Festival 2026 — Creative student art displays and bustling carnival setup'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.01%20AM.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-26.jpg',
        alt: 'Live painting and creative sketching by fine arts students on campus',
        caption: 'Fine arts students demonstrating live acrylic painting and portrait techniques'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.01%20AM%20(2).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-41.jpg',
        alt: 'Calligraphy masterpieces and traditional Islamic art gallery',
        caption: 'Traditional calligraphy and geometric arabesque artworks curated by student artists'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.38.59%20AM.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-42.jpg',
        alt: 'Interactive carnival games area with ring toss and amusement booths',
        caption: 'Interactive carnival games, challenges, and prize giveaways drawing large crowds'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.38.57%20AM%20(2).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-48.jpg',
        alt: 'Handcrafted jewelry, pottery wheels, and artisanal craft kiosks',
        caption: 'Handmade crafts, pottery demonstrations, and decorative accessories on display'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.03%20AM.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-49.jpg',
        alt: 'Open-mic music stage and live acoustic jam in the garden quad',
        caption: 'Live acoustic music and spoken-word performances under decorated garden canopies'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.03%20AM%20(1).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-15.jpg',
        alt: 'Students enjoying food streets and carnival treats on the campus lawn',
        caption: 'Festive street food kiosks and dessert stalls keeping students energized'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.38.59%20AM%20(1).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-26.jpg',
        alt: 'Photography exhibition and visual storytelling pavilion',
        caption: 'Student visual journalism and photography prints showcasing regional heritage'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.03%20AM%20(2).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-41.jpg',
        alt: 'Cultural performances and lively student flashmob on the central quad',
        caption: 'Dynamic cultural performances and celebratory ensemble acts in the central courtyard'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.02%20AM%20(1).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-42.jpg',
        alt: 'Creative sculpture, modeling, and 3D architectural craft exhibits',
        caption: 'Sculptures, recycled art models, and architectural dioramas exhibited by students'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.02%20AM.jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-48.jpg',
        alt: 'Art competition judging and faculty review of student portfolios',
        caption: 'Expert jury evaluating student artworks and offering professional critiques'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.39.02%20AM%20(2).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-49.jpg',
        alt: 'Prize distribution ceremony honoring winners of art and carnival contests',
        caption: 'Awarding trophies and cash prizes to champions of the art and carnival competitions'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.38.59%20AM%20(2).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-15.jpg',
        alt: 'Cheerful group celebrations and memorable moments at the photo booth',
        caption: 'Students capturing unforgettable moments at the themed carnival photo corners'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-05%20at%202.38.58%20AM%20(1).jpeg',
        fallbackSrc: '/assets/campus-life-new/campus-26.jpg',
        alt: 'Grand festival finale with student organizing committee and faculty',
        caption: 'Organizing committee celebrating the resounding success of the Arts & Carnival Festival'
      }
    ]
  },
  {
    id: 'farewell-party-2026',
    number: 18,
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
        fallbackSrc: '/images/ks8XD1L6_Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Farewell Party 2026 formal stage ceremony with graduating seniors and faculty',
        caption: 'Farewell Party 2026 — Celebrating the indelible legacy of graduating seniors'
      },
      {
        src: '/assets/campus-life-new/campus-new-f.jpg',
        fallbackSrc: '/images/QF79SG2D_Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Presentation of personalized honorary titles and sashes to graduating students',
        caption: 'Honoring senior achievers with bespoke sashes, titles, and mementos'
      },
      {
        src: '/assets/campus-life-new/campus-new-g.jpg',
        fallbackSrc: '/images/d0RFqWwY_Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Emotional video projection documenting four years of university memories and laughter',
        caption: 'Nostalgic documentary screening reliving four unforgettable collegiate years'
      },
      {
        src: '/assets/campus-life-new/campus-new-h.jpg',
        fallbackSrc: '/images/Hfkk9bSJ_Whats-App-Image-2026-10-05-at-2-39-03-AM-1.jpg',
        alt: 'Formal candlelight banquet dinner arranged across the decorated university garden',
        caption: 'Sumptuous banquet dinner in an enchanting outdoor candlelight setting'
      },
      {
        src: '/assets/campus-life-new/campus-39.jpg',
        fallbackSrc: '/images/20TtTtdG_Whats-App-Image-2026-10-05-at-2-38-58-AM-1.jpg',
        alt: 'Faculty mentors delivering inspiring parting advice to outgoing professionals',
        caption: 'Professors imparting final words of wisdom and professional blessings'
      },
      {
        src: '/assets/campus-life-new/campus-29.jpg',
        fallbackSrc: '/images/0j944vNC_image-8.jpg',
        alt: 'Final graduating batch group portrait under festive fireworks display',
        caption: 'Final batch milestone — Stepping forward with pride, resilience, and lifelong friendships'
      }
    ]
  },
  {
    id: 'qawwali-night',
    number: 19,
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
        fallbackSrc: '/images/7dwzJ7HH_Whats-App-Image-2026-10-11-at-11-12-56-PM.jpg',
        alt: 'Qawwali Night performance with ensemble musicians and lead vocalists in full flow',
        caption: 'Qawwali Night 2026 — Mesmerizing classical Sufi melodies echoing through campus'
      },
      {
        src: '/assets/campus-life/student-singing-vocal-performance.jpg',
        fallbackSrc: '/images/4RGfzpX8_image-2.jpg',
        alt: 'Student vocalists performing classical harmonies alongside traditional harmonium',
        caption: 'Harmonium and tabla rhythms accompanied by soaring vocal crescendos'
      },
      {
        src: '/assets/campus/campus-concert-live-music.png',
        fallbackSrc: '/images/dwVXXsjv_image-11.png',
        alt: 'Audience immersed in clapping and spiritual ecstasy during peak qawwali verses',
        caption: 'Enthralled audience clapping rhythmically to timeless devotional poetry'
      },
      {
        src: '/assets/campus-life-new/campus-new-a.jpg',
        fallbackSrc: '/images/QF79SG2D_Whats-App-Image-2026-10-05-at-2-38-56-AM-3.jpg',
        alt: 'Elaborate traditional stage decor with antique lanterns and heritage rugs',
        caption: 'Traditional oriental rugs, lantern pathways, and heritage stage ambience'
      },
      {
        src: '/assets/campus-life-new/campus-36.jpg',
        fallbackSrc: '/images/ks8XD1L6_Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Campus lawn illuminated by ambient fairy lights and brass torches',
        caption: 'Fairy lights and brass torches casting an enchanting glow over the gathering'
      },
      {
        src: '/assets/campus-life-new/campus-31.jpg',
        fallbackSrc: '/images/d0RFqWwY_Whats-App-Image-2026-10-08-at-12-46-41-AM-1.jpg',
        alt: 'Students enjoying hot Kashmiri chai and sweets during the musical intermissions',
        caption: 'Traditional pink Kashmiri tea and warm jalebis shared in festive fellowship'
      }
    ]
  },
  {
    id: 'annual-project-exhibition-2026',
    number: 20,
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
        fallbackSrc: '/images/Z6gCjzm9_Whats-App-Image-2026-10-11-at-11-08-09-PM.jpg',
        alt: 'Annual Project Exhibition 2026 exhibition hall buzzing with student tech prototypes',
        caption: 'Annual Project Exhibition 2026 — Pioneering technological innovations on display'
      },
      {
        src: '/assets/events/project-exhibition.jpg',
        fallbackSrc: '/images/DPc3whkY_Whats-App-Image-2026-10-11-at-11-06-29-PM.jpg',
        alt: 'Student team demonstrating hardware robotics and autonomous drone control systems',
        caption: 'Robotics and autonomous drone demonstration before tech industry evaluators'
      },
      {
        src: '/assets/events/project-exhibition-2.jpg',
        fallbackSrc: '/images/JWgxKLmW_Whats-App-Image-2026-10-11-at-11-08-23-PM.jpg',
        alt: 'Software engineering team presenting cloud healthcare analytics platform',
        caption: 'Full-stack AI healthcare platform pitched by senior computer science students'
      },
      {
        src: '/assets/events/project-exhibition-3.jpg',
        fallbackSrc: '/images/1t5rZr61_Whats-App-Image-2026-10-11-at-11-09-58-PM.jpg',
        alt: 'Business analytics students showing predictive market forecasting dashboards',
        caption: 'Financial forecasting models and predictive business analytics dashboards'
      },
      {
        src: '/assets/events/project-exhibition-4.jpg',
        fallbackSrc: '/images/wFy5dC60_Whats-App-Image-2026-10-11-at-11-09-33-PM.jpg',
        alt: 'Biotechnology capstone researchers presenting novel antimicrobial compounds',
        caption: 'Biotechnology research posters detailing biological synthesis breakthroughs'
      },
      {
        src: '/assets/events/project-exhibition-5.jpg',
        fallbackSrc: '/images/ks8XD1L6_Whats-App-Image-2026-10-05-at-2-38-52-AM-2.jpg',
        alt: 'Award ceremony honoring best capstone projects with innovation shields and cash prizes',
        caption: 'Distribution of annual excellence trophies and cash awards to winning teams'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-06%20at%2012.11.15%20AM.jpeg',
        fallbackSrc: '/assets/events/project-exhibition-top.jpg',
        alt: 'Students demonstrating capstone engineering project models to industrial evaluators',
        caption: 'Interactive student presentations of practical engineering and software prototypes'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-06%20at%2012.11.14%20AM.jpeg',
        fallbackSrc: '/assets/events/project-exhibition.jpg',
        alt: 'Faculty evaluators and students reviewing capstone research posters and hardware exhibits',
        caption: 'Faculty reviews and industry expert evaluations of senior capstone innovations'
      }
    ]
  },
  {
    id: 'inovista-cholistan-movie-day',
    number: 21,
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
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.24.05%20PM.jpeg',
        fallbackSrc: '/assets/campus-life/movie-day-addition.jpg',
        alt: 'Giant outdoor cinema projection setup at Haveli Cholistan under desert night skies',
        caption: 'Inovista Cholistan Movie Day — Giant outdoor cinema screening under the stars at Haveli Cholistan'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-11%20at%2011.23.40%20PM.jpeg',
        fallbackSrc: '/assets/campus-life/innovista-cholistan-movie-singing.jpg',
        alt: 'Students enjoying live acoustic singing and campfire fellowship in the desert',
        caption: 'Acoustic musical jam, campfire fellowship, and heartwarming desert hospitality'
      }
    ]
  },
  {
    id: 'trip-northern-area',
    number: 22,
    title: 'Trip to Northern Area',
    year: '2026',
    date: 'August 2026',
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
        src: 'https://ik.imagekit.io/Muffins/WhatsApp%20Image%202026-10-19%20at%202.11.37%20AM.jpeg',
        fallbackSrc: '/assets/campus-life/shogran-valley-tour-1.jpg',
        alt: 'UCP students and faculty on alpine mountain excursion across northern valleys',
        caption: 'Trip to Northern Area — Students exploring picturesque alpine valleys and scenic mountain vistas'
      },
      {
        src: 'https://ik.imagekit.io/Muffins/image%20(14).png',
        fallbackSrc: '/assets/campus-life-new/campus-4.jpg',
        alt: 'Commemorative group portrait of students and faculty during Northern Area excursion',
        caption: 'A memorable milestone celebrating collegiate friendship, nature exploration, and mountain adventure'
      }
    ]
  }
];

export const EVENTS_2025 = CAMPUS_EVENTS_DATA.filter((e) => e.year === '2025');
export const EVENTS_2026 = CAMPUS_EVENTS_DATA.filter((e) => e.year === '2026');
