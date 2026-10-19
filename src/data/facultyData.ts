export interface FacultyMemberData {
  id: string;
  numericId: number;
  name: string;
  designation: string;
  department: string;
  highestDegree: string;
  experienceYears?: string;
  specialization?: string;
  intro?: string;
  photoUrl: string;
  fallbackPhotoUrl: string;
  objectPosition?: string;
  // Professional Profile Dossier Fields
  qualifications?: string[];
  experienceDetails?: string[];
  academicAdministration?: string[];
  researchPublications?: string[];
  certificationsTraining?: string[];
  coreTechnicalSkills?: string[];
  managementLeadershipSkills?: string[];
  achievements?: string[];
  areaOfInterest?: string[];
  programmingSkills?: string[];
  networkingSecuritySkills?: string[];
}

/**
 * Rank weight helper ensuring strict sequence:
 * 1. Professor
 * 2. Associate Professor
 * 3. Assistant Professor
 * 4. Lecturer
 */
export const getFacultyRankWeight = (designation: string): number => {
  const des = designation.toLowerCase();
  if (des.includes('associate professor')) return 2;
  if (des.includes('assistant professor')) return 3;
  if (des.includes('lecturer')) return 4;
  if (des.includes('professor')) return 1;
  return 5;
};

/**
 * Master List of UCP Bahawalpur Faculty Members
 * Sequenced strictly: Professor -> Associate Professor -> Assistant Professor -> Lecturer
 */
export const ALL_FACULTY_MEMBERS: FacultyMemberData[] = [
  // =========================================================================
  // 1. PROFESSORS
  // =========================================================================
  {
    id: 'dr-abdul-kareem',
    numericId: 2,
    name: 'Dr. Abdul Kareem',
    designation: 'Professor',
    department: 'Quality Enhancement Cell & Department of Physics',
    highestDegree: 'Ph.D. in Physics (Nuclear Medicine)',
    experienceYears: '24 Years',
    specialization: 'Diagnostic Radiology, Safe Handling of Radioactive Materials & Academic Quality Assurance',
    intro: 'Senior Professor and Head of Quality Enhancement Cell (QEC) at UCP Bahawalpur with 24 years of academic excellence. Pioneer in diagnostic radiology research, radiation safety governance, and university examinations management.',
    photoUrl: '/assets/faculty/dr-abdul-kareem.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/KpHwQ29z/Whats-App-Image-2026-10-12-at-9-45-57-PM.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'Ph.D. in Physics (Nuclear Medicine)',
      'M.Phil in Medical & Radiation Physics',
      'M.Sc. in Physics'
    ],
    achievements: [
      'High Quality Research in Diagnostic Radiology & Nuclear Medicine',
      'Best Results Appreciation Letter from Chairman, UCP Lahore',
      'Long Service Award for Distinguished Institutional Contribution',
      'Lifetime Membership, Pakistan Nuclear Society (PNS)'
    ],
    coreTechnicalSkills: [
      'Research in Diagnostic Radiology',
      'Safe Handling and Governance of Radioactive Materials',
      'University Examinations Architecture & Oversight',
      'University Management & Quality Enhancement Cell (QEC) Leadership'
    ],
    experienceDetails: [
      '24 Years of Teaching and Academic Research Experience in Higher Education',
      'Executive Leadership of Quality Enhancement Cell (QEC) ensuring HEC accreditation and institutional standards',
      'Supervision of Advanced Radiological and Medical Physics Research'
    ],
    managementLeadershipSkills: [
      'Institutional Quality Assurance & Accreditation Protocols',
      'Academic Administration & University Examination Governance',
      'Laboratory Safety and Radiation Protection Management'
    ]
  },

  // =========================================================================
  // 2. ASSOCIATE / ASSISTANT PROFESSORS
  // =========================================================================
  {
    id: 'dr-abbas-haider',
    numericId: 5,
    name: 'Prof. Dr. Abbas Haider',
    designation: 'Assistant Professor',
    department: 'Department of History & Humanities',
    highestDegree: 'Ph.D. in History',
    experienceYears: '10 Years',
    specialization: 'Historical Research, South Asian History & Historiography',
    intro: 'Assistant Professor with 10 years of university teaching and scholarly research in history and humanities.',
    photoUrl: '/assets/faculty/dr-abbas-haider.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/MDRVG6JB/image-25.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'Ph.D. in History',
      'M.Phil in History',
      'Master of Arts (M.A.) in History'
    ],
    experienceDetails: [
      '10 Years of University Teaching and Historical Research'
    ],
    coreTechnicalSkills: [
      'Historical Research & Historiography',
      'South Asian & Regional History',
      'Archival Analysis & Academic Writing'
    ]
  },

  // =========================================================================
  // 3. ASSISTANT PROFESSORS
  // =========================================================================
  {
    id: 'prof-uzma-zulqurnai',
    numericId: 1,
    name: 'Prof. Uzma Zulqurnain',
    designation: 'Assistant Professor',
    department: 'Department of Humanities & Social Sciences',
    highestDegree: 'Ph.D. in English Literature',
    experienceYears: '18+ Years',
    specialization: 'Post-Colonial Literature, Applied Linguistics & Critical Discourse',
    intro: 'Assistant Professor specializing in literary theory, research methodologies, and humanities curriculum design with extensive postgraduate mentorship.',
    photoUrl: '/assets/faculty/prof-uzma-zulqurnai.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/ds5v7H7c/image-32.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'Ph.D. in English Literature',
      'M.Phil in English Literature & Linguistics',
      'Master of Arts (M.A.) in English Literature'
    ],
    experienceDetails: [
      '18+ Years of Higher Education Teaching & Scholarly Inquiry',
      'Postgraduate Thesis Supervision in Humanities & Critical Discourse',
      'Curriculum Design for University Academic Programs'
    ],
    coreTechnicalSkills: [
      'Literary Theory & Discourse Analysis',
      'Advanced Pedagogical Design',
      'Qualitative Academic Research & Publication',
      'Student Academic Mentorship'
    ]
  },
  {
    id: 'prof-abeer-aslam',
    numericId: 12,
    name: 'Prof. Abeer Aslam',
    designation: 'Assistant Professor',
    department: 'Department of English & Humanities',
    highestDegree: 'M.Phil in Linguistics',
    experienceYears: '9+ Years',
    specialization: 'Applied Linguistics, English Pedagogy, Reading, Academic Writing & Web-Based Research',
    intro: 'Dedicated Assistant Professor of English and applied linguist at UCP Bahawalpur holding an M.Phil in Linguistics. Specialized in university-level English teaching, reading comprehension, academic writing development, and modern digital information literacy.',
    photoUrl: '/assets/faculty/prof-abeer-aslam.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/My6FmnQm/image-22.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'M.Phil in Linguistics',
      'Master of Arts (M.A.) in English Literature & Linguistics',
      'BS / B.A. in English'
    ],
    experienceDetails: [
      '9+ Years of Teaching Experience as Faculty in English at UCP Bahawalpur',
      'Instruction in Functional English, Communication Skills, and Advanced Linguistic Studies',
      'Student mentoring in scholarly reading, essay structuring, and professional communication'
    ],
    coreTechnicalSkills: [
      'University-Level English Language Teaching',
      'Applied Linguistics & Phonetics',
      'Academic Reading & Analytical Rhetoric',
      'Professional Academic Writing & Research Documentation',
      'Web-Based Research & Digital Information Literacy'
    ],
    areaOfInterest: [
      'Teaching & Pedagogy',
      'Reading & Literary Appreciation',
      'Writing & Technical Composition',
      'Web Browsing & Digital Information Literacy'
    ]
  },
  {
    id: 'dr-mushtaq',
    numericId: 6,
    name: 'Dr. Mushtaq',
    designation: 'Assistant Professor • Entry Test Specialist',
    department: 'Department of Mathematics & Quantitative Sciences',
    highestDegree: 'Ph.D. in Mathematics',
    experienceYears: '20 Years',
    specialization: 'Applied Mathematics, Entry Test Pedagogy, Calculus & Quantitative Problem Solving',
    intro: 'Distinguished mathematician and premier Entry Test Specialist with 20 years of higher education teaching excellence. Author of 2 peer-reviewed mathematical research publications and legendary mentor for competitive entrance exams across Punjab.',
    photoUrl: '/assets/faculty/dr-mushtaq.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/mVDvc6n7/Whats-App-Image-2026-10-09-at-1-11-15-AM.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'Ph.D. in Mathematics',
      'M.Phil in Applied Mathematics',
      'M.Sc. in Mathematics'
    ],
    experienceDetails: [
      '20 Years of University-Level Teaching, Academic Mentorship, and Advanced Mathematics Pedagogy',
      'Premier Entry Test Specialist for ECAT, MDCAT, NTS, and University Quantitative Examinations'
    ],
    researchPublications: [
      '2 Peer-Reviewed High-Impact Research Publications in Applied Mathematics & Analytical Optimization'
    ],
    achievements: [
      'Renowned Entry Test Specialist with extensive record of successful student admissions across Pakistan',
      '20 Years of Dedicated Scholarly Service at University of Central Punjab and Punjab Group of Colleges',
      'Publication of Mathematical Analysis Research in Recognized Academic Journals'
    ],
    coreTechnicalSkills: [
      'Advanced Differential & Integral Calculus',
      'Entry Test Specialization & Speed Analytics',
      'Linear Algebra & Numerical Computing',
      'Mathematical Modeling & Optimization',
      'Quantitative Reasoning & Standardized Test Architecture'
    ]
  },
  {
    id: 'dr-abdul-raouf',
    numericId: 7,
    name: 'Dr. Abdul Raouf',
    designation: 'Assistant Professor',
    department: 'Department of Physics & Biomedical Sciences',
    highestDegree: 'Ph.D. in Physics',
    experienceYears: '15 Years',
    specialization: 'Materials Characterization, Nanoparticles Synthesis, Cancer Diagnosis & Biomedical Applications',
    intro: 'Assistant Professor of Physics with 15 years of higher education experience. Recipient of prestigious national research honors including the HEC IRSIP Award, focusing on cutting-edge nanotechnology and oncology diagnosis.',
    photoUrl: '/assets/faculty/dr-abdul-raouf.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/q3shvZ1g/image-29.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'Ph.D. in Physics',
      'M.Phil in Physics (Solid State & Nanomaterials)',
      'M.Sc. in Physics'
    ],
    achievements: [
      'Long Service Award for Exemplary Academic and Institutional Commitment',
      'HEC Award under International Research Support Initiative Program (IRSIP)'
    ],
    coreTechnicalSkills: [
      'Information Technology (IT) in Physical Sciences',
      'Materials Characterization (XRD, SEM, TEM, UV-Vis, FTIR Spectrometry)',
      'Nanoparticles Chemical & Biological Synthesis',
      'Cancer Diagnosis Biomarkers & Biomedical Applications'
    ],
    experienceDetails: [
      '15 Years of University Teaching and Advanced Physics Laboratory Supervision',
      'Directing graduate-level research investigations into biomedical nanoparticles and oncology detection'
    ],
    managementLeadershipSkills: [
      'Advanced Scientific Laboratory Administration',
      'Research Grant Preparation and Technical Documentation',
      'Student Research Thesis Mentorship'
    ]
  },
  {
    id: 'dr-m-tahir',
    numericId: 8,
    name: 'Dr. Muhammad Tahir Akbar',
    designation: 'Assistant Professor',
    department: 'Department of Islamic Studies',
    highestDegree: 'Ph.D. in Islamic Studies (Specialization: Quran & Tafseer)',
    experienceYears: '12 Years in Teaching (06 Years BS Classes)',
    specialization: 'Quran & Tafseer, Islamic Jurisprudence & Contemporary Islamic Thought',
    intro: 'Assistant Professor of Islamic Studies with 12 years of university teaching experience, including 6 years leading BS classes. Specialized in Quran & Tafseer.',
    photoUrl: '/assets/faculty/dr-muhammad-tahir-akbar.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/pT1Mdp1/image-39.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'Ph.D. in Islamic Studies with Specialization in Quran & Tafseer',
      'M.Phil in Islamic Studies',
      'Master of Arts (M.A.) in Islamic Studies'
    ],
    experienceDetails: [
      '12 Years in Teaching (06 Years BS Classes)',
      'University Teaching and Curricular Instruction in Quran & Tafseer'
    ],
    coreTechnicalSkills: [
      'Quran & Tafseer Exegesis',
      'Islamic Research Methodologies',
      'Academic Teaching & Mentorship'
    ]
  },
  {
    id: 'prof-khizer-hayat',
    numericId: 9,
    name: 'Prof. Khizer Hayat',
    designation: 'Assistant Professor — Commerce & Business Studies',
    department: 'Faculty of Management Sciences (Commerce & Business Studies)',
    highestDegree: 'Ph.D. Scholar (Commerce) • M.Phil Management Sciences (Finance)',
    experienceYears: 'Over 25 Years',
    specialization: 'Accounting, Corporate Finance, Strategic Marketing & Commerce',
    intro: 'Accomplished Commerce & Business Studies educator with over 25 years of distinguished teaching tenure, academic administration, and sports leadership at UCP and PGC Bahawalpur. Two-time recipient of the Chief Minister Punjab Best Teacher Cash Prize.',
    photoUrl: '/assets/faculty/prof-khizer-hayat.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/wN3FYgTw/Whats-App-Image-2026-10-14-at-8-11-53-AM.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'Ph.D. Scholar in Commerce',
      'M.Phil in Management Sciences (Finance)',
      'Master of Commerce (M.Com / B.Com Honors)'
    ],
    areaOfInterest: [
      'Accounting',
      'Finance',
      'Marketing'
    ],
    achievements: [
      'Received Marketing & Business Gala, 2024 Supervision Certificate from Director Admin, UCP & PGC Bahawalpur',
      'Received Long Service Award from Director Admin, UCP & PGC Bahawalpur',
      'Received Shield from Director Campus UCP for organizing Sports Festival Summer 2k19',
      'Received Shield from Director Campus UCP & PGC Bahawalpur for organizing Technology Education Expo, 2019',
      'Received Shield from Chairman Department of Management Sciences, The Islamia University of Bahawalpur by performing as Panel Analyst, Young Entrepreneur Summit (YES) 2k18',
      'Received Cash Prize (Best Teacher) given by the Chief Minister Punjab (2011)',
      'Received Cash Prize (Best Teacher) given by the Chief Minister Punjab (2012)',
      'Won Inter-College Cricket Tournament Championship (2000)'
    ],
    experienceDetails: [
      'Over 25 Years of Higher Education Teaching in Commerce, Accounting, and Finance',
      'Patron and Chief Organizer for student business galas, technology expos, and athletic tournaments',
      'Mentorship of hundreds of finance and accounting graduates across corporate and banking careers'
    ],
    coreTechnicalSkills: [
      'Financial Accounting & Advanced Cost Accounting',
      'Corporate Finance & Portfolio Management',
      'Marketing Principles & Business Strategy',
      'Event Planning, Sports Organization & Student Leadership'
    ]
  },
  {
    id: 'prof-ali-shan',
    numericId: 10,
    name: 'Prof. Rao Ali Shan',
    designation: 'Assistant Professor',
    department: 'Department of Computer Science & Artificial Intelligence',
    highestDegree: 'Ph.D. in Artificial Intelligence (AI) — Lincoln University Malaysia, 2022 (CGPA: 3.73)',
    experienceYears: '18 Years',
    specialization: 'Artificial Intelligence, Healthcare IoT Systems, Explainable AI (XAI) & Embedded Intelligent Systems',
    intro: 'Accomplished AI researcher and Assistant Professor with 18 years of university teaching, research, and department management experience. Holds a Ph.D. in Artificial Intelligence from Lincoln University Malaysia (CGPA 3.73).',
    photoUrl: '/assets/faculty/prof-ali-shan.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/Hf1sx73S/Whats-App-Image-2026-10-14-at-8-12-50-AM.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'Ph.D. in Artificial Intelligence (AI) — Lincoln University Malaysia, 2022 (CGPA: 3.73)',
      'MS in Computer Science — University of Sargodha, 2014–2016 (CGPA: 3.68)',
      'B.Ed. — University of Sindh, 2009–2011 (Grade: B)',
      'BS in Computer Engineering — COMSATS University, 2004–2008 (CGPA: 3.34)',
      'HSSC (Pre-Engineering) — MTB Sadiqabad, 2002–2004 (Percentage: 68%)',
      'SSC (Science) — FFC Model School, 2000–2002 (Percentage: 78%)'
    ],
    achievements: [
      'Gold Medal in 2nd Semester COMSATS',
      'Served as President of the IEEE Committee at COMSATS University',
      'Participated in an IEEE Conference in Islamabad',
      'Participated in a Microsoft Conference at PC Karachi',
      'Served as Captain of the Cricket Team at COMSATS University',
      'Served as Wing Proctor of Boys Hostel (M.A. Jinnah Hall), COMSATS',
      'Served as Mess In-Charge of M.A. Jinnah Hall, managing hostel mess operations for approximately 300 students',
      'Served as an Executive Member of the Cultural and Dramatic Society at COMSATS University'
    ],
    coreTechnicalSkills: [
      'Artificial Intelligence (AI)',
      'Computer Science & IT',
      'Healthcare IoT Systems',
      'System Architecture',
      'Explainable AI (XAI)',
      'Embedded Intelligent Systems',
      'Real-Time Data Processing',
      'Wearable Computing & Smart Sensors',
      'Multi-Modal Sensor Fusion',
      'Cloud & Edge Computing'
    ],
    programmingSkills: [
      'Python',
      'C/C++',
      'Java',
      'Assembly',
      'SQL',
      'PHP',
      'WordPress',
      'TensorFlow Lite'
    ],
    managementLeadershipSkills: [
      'University-Level Teaching',
      'Academic Program Management',
      'Department Leadership',
      'Student Academic Advising',
      'Career Guidance',
      'Student Support & University Access Programs',
      'Seminar & Workshop Organization',
      'Examination Management',
      'Faculty/Teacher Portal Management',
      'Event Organization',
      'Academic Administration'
    ],
    networkingSecuritySkills: [
      'Computer Networking',
      'CCNA',
      'Cyber Security',
      'Raspberry Pi',
      'Arduino',
      'ESP32',
      'IoT Sensors'
    ],
    experienceDetails: [
      '18 Years of Higher Education Teaching, Research, and Department Leadership',
      'Supervision of Senior Capstone Engineering and Deep Learning Systems Projects'
    ]
  },

  // =========================================================================
  // 4. LECTURERS
  // =========================================================================
  {
    id: 'prof-malik-allah-rakha',
    numericId: 18,
    name: 'Prof. Malik Allah Rakha',
    designation: 'Lecturer Mathematics',
    department: 'Faculty of Science & Technology • Department of Mathematics',
    highestDegree: 'M.Phil in Mathematics',
    experienceYears: '10 Years',
    specialization: 'Applied Mathematics, Advanced Calculus, Linear Algebra & Analytical Problem Solving',
    intro: 'Dedicated Mathematics Lecturer with 10 years of academic teaching and pedagogical experience at UCP Bahawalpur. Specializing in pure and applied mathematics, calculus, and mathematical modeling, committed to nurturing rigorous analytical thought and academic excellence.',
    photoUrl: '/assets/faculty/prof-malik-allah-rakha.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/jk3H0PVK/Whats-App-Image-2026-10-15-at-10-47-55-PM.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'M.Phil in Mathematics',
      'M.Sc. in Mathematics',
      'B.Sc. (Mathematics & Physics)'
    ],
    experienceDetails: [
      '10 Years of Mathematics Teaching Experience at Higher Education & Intermediate Levels',
      'Instruction in Advanced Calculus, Multivariable Analysis, and Linear Algebra',
      'Undergraduate Academic Mentorship and Quantitative Reasoning Preparation',
      'Curriculum Delivery for Science, Computing & Engineering Mathematics Courses'
    ],
    coreTechnicalSkills: [
      'Advanced Differential & Integral Calculus',
      'Linear Algebra & Matrix Analysis',
      'Mathematical Modeling & Numerical Techniques',
      'Analytical Thinking & Quantitative Problem Solving',
      'Higher Education Pedagogy & Mentorship'
    ],
    areaOfInterest: [
      'Applied Mathematics',
      'Mathematical Physics',
      'Calculus & Analytical Geometry',
      'Higher Education Curriculum Instruction'
    ]
  },
  {
    id: 'prof-aliya-batool',
    numericId: 16,
    name: 'Prof. Aliya Batool',
    designation: 'Lecturer',
    department: 'Department of Computer Science & Information Technology',
    highestDegree: 'Ph.D. Scholar (Computer Science / IT)',
    experienceYears: '7+ Years',
    specialization: 'Computing, Information Technology, Artificial Intelligence & Programming',
    intro: 'Dedicated Computer Science / IT Lecturer with 7+ years of teaching experience in higher education. Experienced in Computing, Information Technology, Artificial Intelligence, Programming, and emerging technologies, with strong expertise in student mentoring, research, and interactive practical learning.',
    photoUrl: '/assets/faculty/prof-aliya-batool.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/zVHGmSrW/Whats-App-Image-2026-10-05-at-2-39-09-AM-2.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'Ph.D. Scholar in Computer Science / Information Technology',
      'MS in Computer Science / Information Technology',
      'BS in Computer Science / Information Technology'
    ],
    experienceDetails: [
      '7+ Years of Teaching Experience in Higher Education',
      'Teaching Computer Science, Computing, IT, Artificial Intelligence, and Programming',
      'Curriculum and lesson planning for undergraduate programs',
      'Student mentoring, assessment, and academic guidance',
      'Development and delivery of practical and technology-based learning activities'
    ],
    academicAdministration: [
      'Academic Administration & Coordination Management',
      'Planning and coordination of examinations',
      'Preparation and management of examination schedules',
      'Coordination with faculty, students, and administration',
      'Maintenance of examination records and documentation',
      'Monitoring examination procedures and academic regulations',
      'Result preparation, verification, and record management',
      'Ensuring smooth and transparent examination processes',
      'Handling examination-related student and faculty queries'
    ],
    researchPublications: [
      'Research publications available on Google Scholar',
      'Academic research and research writing experience',
      'Research interests in Artificial Intelligence, Computing, Information Technology, and Emerging Technologies',
      'Literature review, technical documentation, data analysis, and academic publication development'
    ],
    certificationsTraining: [
      '10+ Professional Trainings & Certificates',
      'Certifications and training in Computing, IT, Artificial Intelligence, Teaching & Learning, Educational Technology, and Professional Development',
      'Participation in workshops, seminars, training programs, and academic development activities',
      'Continuous professional development and technology upskilling'
    ],
    coreTechnicalSkills: [
      'Computer Science & Computing',
      'Information Technology (IT)',
      'Artificial Intelligence (AI)',
      'Python Programming',
      'Programming Fundamentals',
      'Digital & Educational Technologies',
      'Research & Academic Writing',
      'Microsoft Office & Digital Tools'
    ],
    managementLeadershipSkills: [
      'Academic & Classroom Management',
      'Examination Management',
      'Team Leadership & Coordination',
      'Event Planning & Management',
      'Project Management',
      'Student Affairs & Mentoring',
      'Faculty & Administrative Coordination',
      'Communication & Presentation',
      'Problem Solving & Decision Making',
      'Time & Resource Management',
      'Academic Activity Planning',
      'Performance Monitoring & Evaluation'
    ]
  },
  {
    id: 'prof-iqra-shabbir',
    numericId: 15,
    name: 'Prof. Iqra Shabbir',
    designation: 'Lecturer',
    department: 'Faculty of Management Sciences • Department of Economics',
    highestDegree: 'M.Phil in Economics',
    experienceYears: '8+ Years',
    specialization: 'Applied Economics, Econometrics, Quantitative Microeconomics & Macroeconomic Analysis',
    intro: 'Dedicated Economics Lecturer at UCP Bahawalpur holding an M.Phil in Economics with 8+ years of higher education teaching experience. Committed to instructing macro and micro-economic theories, financial economics, and quantitative data analysis.',
    photoUrl: '/assets/faculty/prof-iqra-shabbir.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/7xV0RjTJ/image-21.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'M.Phil in Economics',
      'M.Sc. in Economics',
      'B.Sc. in Economics'
    ],
    experienceDetails: [
      '8+ Years of Academic Economics Teaching and Research Guidance',
      'Instruction in Principles of Economics, Quantitative Econometrics, and Managerial Economics',
      'Student Mentorship in Applied Economic Studies and Quantitative Modeling'
    ],
    coreTechnicalSkills: [
      'Economic Analysis & Financial Forecasting',
      'Econometric Modeling & Quantitative Analytics',
      'Macro & Microeconomic Curriculum Instruction',
      'Statistical Data Processing'
    ],
    areaOfInterest: [
      'Development Economics',
      'Financial Econometrics',
      'Applied Microeconomics',
      'Economic Policy & Pedagogy'
    ]
  },
  {
    id: 'prof-usman-kazmi',
    numericId: 11,
    name: 'Prof. Usman Kazmi',
    designation: 'Lecturer',
    department: 'Department of Business & Media Studies',
    highestDegree: 'MS in Strategic Communication',
    experienceYears: '11+ Years',
    specialization: 'Media Strategy, Public Relations & Digital Branding',
    intro: 'Bridges corporate communication theory and hands-on media production workshops for business and media scholars.',
    photoUrl: '/assets/faculty/prof-usman-kazmi.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/NRMsLPh/image-28.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'MS in Strategic Communication',
      'BS in Mass Communication & Media Studies'
    ],
    experienceDetails: [
      '11+ Years of Media Production and Corporate Communication Teaching',
      'Directing University Media Production Labs and Digital Publishing Initiatives'
    ],
    coreTechnicalSkills: [
      'Digital Media Strategies & Public Relations',
      'Brand Storytelling & Broadcast Journalism',
      'Corporate Reputation Management'
    ]
  },
  {
    id: 'prof-marriam-gill',
    numericId: 13,
    name: 'Mam Marium Gill',
    designation: 'Lecturer in Computer Science Department',
    department: 'Department of Computer Science',
    highestDegree: 'MSCS (Computer Science) • Ph.D. Scholar (Islamia University Bahawalpur)',
    experienceYears: '3 Years (IUB, UE & CTI)',
    specialization: 'Web Technologies (HTML/CSS), Project Management, Complex Problem Solving & E-Commerce',
    intro: 'Lecturer in Computer Science Department at UCP Bahawalpur. Holds an MSCS in Computer Science and is pursuing Ph.D. at The Islamia University of Bahawalpur. Academic experience across IUB, University of Education, and CTI.',
    photoUrl: '/assets/faculty/prof-marriam-gill.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/JRFr4LLF/image-31.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'MSCS — Computer Science',
      'Ph.D. Scholar (in progress) — The Islamia University of Bahawalpur (IUB)'
    ],
    experienceDetails: [
      '1 Year Experience in Islamia University Bahawalpur (IUB)',
      '1 Year Experience in University of Education (UE)',
      'Experience as a College Teacher Intern (CTI)'
    ],
    coreTechnicalSkills: [
      'Familiar with HTML / CSS',
      'Project Management',
      'Complex Problem Solver',
      'E-Commerce'
    ]
  },
  {
    id: 'prof-humra-owj',
    numericId: 14,
    name: 'Prof. Humra Owj',
    designation: 'Lecturer',
    department: 'Department of Information Technology & Computer Science',
    highestDegree: 'MS in Information Technology • BS in Information Technology',
    experienceYears: '3 Years (2 Yrs Lecturer UCP, 1 Yr TA IUB)',
    specialization: 'Programming (C++, Java, Python), Web Development, SQL Databases & Graphic Designing',
    intro: 'Dynamic Information Technology lecturer at UCP Bahawalpur with MS and BS in IT. Combines hands-on software development, relational database engineering, and digital graphic design in undergraduate computing education.',
    photoUrl: '/assets/faculty/prof-humra-owj.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/tPkwz4Ly/Whats-App-Image-2026-10-14-at-8-13-35-AM.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'MS in Information Technology (MS IT)',
      'BS in Information Technology (BS IT)'
    ],
    experienceDetails: [
      '2 Years as Lecturer in IT at University of Central Punjab (UCP) Bahawalpur',
      '1 Year as Teaching Assistant (TA) at The Islamia University of Bahawalpur (IUB)'
    ],
    coreTechnicalSkills: [
      'Programming Languages: C++, Java, Python',
      'Web Development (Full-Stack, Responsive Design)',
      'Database Architecture & SQL Queries',
      'Microsoft Office & Digital Productivity Tools',
      'Graphic Designing & Digital Media Creation'
    ],
    programmingSkills: [
      'C++',
      'Java',
      'Python',
      'SQL',
      'HTML5 / CSS3 / JavaScript'
    ],
    managementLeadershipSkills: [
      'Laboratory Class Instruction',
      'Practical Project Supervision',
      'Technology Demonstration & Tutoring'
    ]
  },
  {
    id: 'prof-huzaira-akram',
    numericId: 17,
    name: 'Prof. Huzaira Akram',
    designation: 'English Lecturer in UCP',
    department: 'Department of English & Humanities',
    highestDegree: 'M. Phil English',
    experienceYears: '3 Years',
    specialization: 'English Language, Literature & Communication Skills',
    intro: 'Dedicated English Lecturer at UCP Bahawalpur holding an M.Phil in English with 3 years of academic teaching experience.',
    photoUrl: '/assets/faculty/prof-huzaira-akram.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/gZ5ZH99L/Whats-App-Image-2026-10-14-at-8-11-35-AM.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'M. Phil English',
      'BS / M.A. in English'
    ],
    experienceDetails: [
      '3 Years of Teaching Experience',
      'English Lecturer in UCP (University of Central Punjab) Bahawalpur'
    ],
    coreTechnicalSkills: [
      'English Language Teaching & Pedagogy',
      'Academic Writing & Communication Skills',
      'Literary Analysis & Reading Comprehension'
    ]
  }
];

/**
 * UCP Bahawalpur Campus Administration Officers
 * Dedicated administrative leadership team managing academic follow-up, student portal, and creative design.
 */
export const ADMINISTRATION_MEMBERS: FacultyMemberData[] = [
  {
    id: 'admin-faheem-fazal-qureshi',
    numericId: 101,
    name: 'Faheem Fazal Qureshi',
    designation: 'Academic Followup Incharge',
    department: 'Campus Administration & Academic Affairs',
    highestDegree: 'MBA & M.Sc (Hons) Agriculture',
    experienceYears: '13 Years',
    specialization: 'Academic Followup, Financial Operations & Institutional Coordination',
    intro: 'Experienced administrative leader with 11 years banking experience as OG-1 and 2 years at PGC Main Cluster Office, Bahawalpur. Holds MBA and M.Sc (Hons) in Agriculture.',
    photoUrl: '/assets/admin/faheem-fazal-qureshi.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/7JVX7DYr/Whats-App-Image-2026-10-15-at-10-32-37-PM.jpg',
    objectPosition: 'object-center',
    qualifications: [
      'MBA (Master of Business Administration)',
      'M.Sc (Hons) Agriculture',
      'Professional Banking & Administrative Certifications'
    ],
    experienceDetails: [
      'Academic Followup Incharge – UCP Bahawalpur Campus',
      '11 Years Professional Banking Experience as Officer Grade 1 (OG-1)',
      '2 Years Administrative Experience at Punjab Group of Colleges (PGC) Main Cluster Office, Bahawalpur',
      'Institutional operations, academic monitoring & student coordination'
    ],
    coreTechnicalSkills: [
      'Academic Followup & Progress Monitoring',
      'Banking & Financial Compliance (OG-1)',
      'Cluster Office Administration',
      'Student Academic Guidance & Records',
      'Inter-Departmental Coordination'
    ],
    managementLeadershipSkills: [
      'Institutional Operations Management',
      'Academic Followup & Student Advisory',
      'Executive Reporting & Cluster Communication',
      'Conflict Resolution & Problem Solving'
    ]
  },
  {
    id: 'admin-miss-alisha-tariq',
    numericId: 102,
    name: 'Miss Alisha Tariq',
    designation: 'Graphic Designer',
    department: 'Media, Creative Branding & Design Operations',
    highestDegree: 'Masters in Computer Science (MCS)',
    experienceYears: '5 Years',
    specialization: 'Graphic Design, Visual Branding, Digital Media & UI/UX Design',
    intro: 'Creative design professional holding a Masters in Computer Science with 5 years of rich experience in visual branding, digital assets, multimedia presentations, and campus marketing collateral.',
    photoUrl: '/assets/admin/miss-alisha-tariq.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/vvTJ4GPy/Whats-App-Image-2026-10-17-at-3-27-42-AM.jpg',
    objectPosition: 'object-center',
    qualifications: [
      'Masters in Computer Science (MCS)',
      'Advanced Visual Communication & Graphic Arts',
      'Digital Media & UI/UX Principles'
    ],
    experienceDetails: [
      '5 Years Professional Experience in Graphic Design & Media',
      'Graphic Designer – University of Central Punjab (UCP) Bahawalpur',
      'Creative visual identity, event branding & official marketing campaigns',
      'Digital social media graphics, print publications & academic brochures'
    ],
    coreTechnicalSkills: [
      'Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
      'Brand Identity & Logo Architecture',
      'Social Media Media Kits & Event Posters',
      'UI/UX Prototyping & Visual Layouts',
      'Computer Science Principles & Digital Media'
    ],
    managementLeadershipSkills: [
      'Creative Direction & Concept Development',
      'Multi-Project Design Delivery & Deadlines',
      'Cross-Functional Collaboration with Academic Faculties',
      'Print Production & Quality Assurance'
    ]
  },
  {
    id: 'admin-mr-hafiz-nadeem',
    numericId: 103,
    name: 'Mr. Hafiz Nadeem',
    designation: 'Portal Manager',
    department: 'Student Information Systems & Portal Management',
    highestDegree: 'B.Sc Sciences',
    experienceYears: '10 Years',
    specialization: 'Student Portal Management, Academic Database Administration & IT Support',
    intro: 'Senior systems and portal administrator with 10 years of proven experience managing student information systems, academic credentials, online portal services, and student technical assistance.',
    photoUrl: '/assets/admin/mr-hafiz-nadeem.jpg',
    fallbackPhotoUrl: 'https://i.ibb.co/MkL1TDt1/Whats-App-Image-2026-10-15-at-10-47-27-PM.jpg',
    objectPosition: 'object-center',
    qualifications: [
      'B.Sc Sciences',
      'Database Management & Portal Administration',
      'Student Information Systems (SIS) Certification'
    ],
    experienceDetails: [
      '10 Years Professional Experience in Portal & Systems Management',
      'Portal Manager – University of Central Punjab (UCP) Bahawalpur',
      'Supervision of Student Portal (mcom.pgc.edu.pk / UCP Portal)',
      'Academic results processing, attendance tracking & fee status verification'
    ],
    coreTechnicalSkills: [
      'Student Portal (SIS) Administration',
      'Student Login Credential Management',
      'Academic Records & Transcript Verification',
      'Portal Troubleshooting & Student Helpdesk',
      'Database Ingestion & Attendance Systems'
    ],
    managementLeadershipSkills: [
      'Portal Systems Operations & Technical Support',
      'Student Services & Inquiry Resolution',
      'Data Privacy & Record Confidentiality',
      'System Audit & Regular Maintenance'
    ]
  }
];

export const ADMINISTRATION_CONTACT = {
  title: 'Campus Administration Office',
  phone1: '062-2202030',
  phone2: '062-2202050',
  location: 'Constituent College, UCP Campus, Airport Road, Bahawalpur',
  officeHours: 'Monday – Friday: 9:00 AM – 5:00 PM',
  portalUrl: 'https://mcom.pgc.edu.pk/Student/StdLogin.jsp'
};

