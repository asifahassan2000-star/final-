export interface FacultyMemberData {
  id: string;
  numericId: number;
  name: string;
  designation: string;
  cardDesignation?: string;
  department: string;
  highestDegree: string;
  experienceYears?: string;
  specialization?: string;
  intro?: string;
  photoUrl: string;
  fallbackPhotoUrl: string;
  objectPosition?: string;
  imageTransform?: string;
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
    fallbackPhotoUrl: '/images/KpHwQ29z_Whats-App-Image-2026-10-12-at-9-45-57-PM.jpg',
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
    department: 'Department of Social Sciences',
    highestDegree: 'Ph.D. in History',
    experienceYears: 'Eight Years',
    specialization: 'Historical Research, South Asian History & Social Sciences',
    intro: 'Assistant Professor in Social Sciences with 8 years of university teaching and scholarly research in history.',
    photoUrl: 'https://ik.imagekit.io/Muffins/image%20-%202026-10-22T163817.930.png',
    fallbackPhotoUrl: 'https://ik.imagekit.io/Muffins/image%20-%202026-10-22T163817.930.png',
    objectPosition: 'object-top',
    qualifications: [
      'Ph.D. in History',
      'M.Phil in History',
      'Master of Arts (M.A.) in History'
    ],
    experienceDetails: [
      'Eight Years of University Teaching and Social Sciences Research'
    ],
    coreTechnicalSkills: [
      'Historical Research & Historiography',
      'Social Sciences & Regional History',
      'Archival Analysis & Academic Pedagogy'
    ]
  },

  // =========================================================================
  // 3. ASSISTANT PROFESSORS
  // =========================================================================
  {
    id: 'prof-uzma-zulqurnai',
    numericId: 1,
    name: 'Prof. Uzma Zulqurnain',
    designation: 'Assistant Professor | Academic & Event Management Lead',
    cardDesignation: 'Assistant Professor | Academic & Event Management Lead',
    department: 'Department of Humanities & Social Sciences',
    highestDegree: 'PhD Scholar (Education) - PhD in Progress',
    experienceYears: '27 Years',
    specialization: 'Academic Coordination, Event Management, Faculty Affairs, Institutional Operation',
    intro: 'Ms. Uzma Zulqarnain is an Assistant Professor and a PhD Scholar in Education with 27 years of rich academic and administrative experience. She is the backbone of academic coordination at UCP Bahawalpur, efficiently managing university-wide events, faculty affairs, and academic operations. Known for her exceptional organizational skills and dedication, she plays a pivotal role in ensuring smooth academic and institutional excellence.',
    photoUrl: '/assets/faculty/prof_uzma_zulqurnain.webp',
    fallbackPhotoUrl: '/images/20rgrjKf_image-40.jpg',
    objectPosition: 'object-center',
    imageTransform: 'scale-[1.28] origin-center',
    qualifications: [
      'PhD Scholar (Education) - PhD in Progress',
      'M.Phil in Education',
      'Master of Arts (M.A.)'
    ],
    experienceDetails: [
      '27 Years of Rich Academic and Administrative Experience',
      'Backbone of Academic Coordination at UCP Bahawalpur',
      'Managing University-Wide Events, Faculty Affairs, and Academic Operations',
      'Ensuring Smooth Academic and Institutional Excellence'
    ],
    academicAdministration: [
      'Academic Coordination & University-Wide Event Management',
      'Faculty Affairs & Academic Operations Leadership',
      'Institutional Excellence & Program Execution'
    ],
    coreTechnicalSkills: [
      'Academic Coordination',
      'Event Management',
      'Faculty Affairs',
      'Institutional Operation'
    ],
    managementLeadershipSkills: [
      'Academic Coordination',
      'Event Management',
      'Faculty Affairs',
      'Institutional Operation'
    ],
    areaOfInterest: [
      'Academic Coordination',
      'Event Management',
      'Faculty Affairs',
      'Institutional Operation'
    ]
  },
  {
    id: 'prof-abeer-aslam',
    numericId: 12,
    name: 'Prof. Abeer Aslam',
    designation: 'Assistant Professor',
    department: 'Department of English & Humanities',
    highestDegree: 'PhD Scholar English Linguistics (contd)',
    experienceYears: '15+ Years',
    specialization: 'Applied Linguistics, English Pedagogy, Reading, Academic Writing & Web-Based Research',
    intro: 'And language and literature at UCP, currently PhD scholar in linguistics. Professional experience 15+. Specialized in university-level English teaching, functional English communication skills, reading comprehension, essay structuring, and advanced linguistic studies.',
    photoUrl: '/assets/faculty/prof-abeer-aslam.jpg',
    fallbackPhotoUrl: '/images/My6FmnQm_image-22.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'PhD Scholar English Linguistics (contd)',
      'M.Phil in English Linguistics',
      'M.A in English Language Teaching',
      'Diploma in Phonetics and Phonology',
      'M.A in English Literature',
      'B.Ed'
    ],
    experienceDetails: [
      '9+ Years of Teaching Experience as Faculty in English at UCP Bahawalpur Campus',
      '5+ Years Instruction in Functional English, Communication Skills, and Advanced Linguistic Studies',
      '15+ Years in Student Mentoring in Scholarly Reading, Essay Structuring, and Professional Communication'
    ],
    academicAdministration: [
      '9+ Years of Teaching Experience as Faculty in English at UCP Bahawalpur Campus',
      '5+ Years Instruction in Functional English, Communication Skills, and Advanced Linguistic Studies',
      '15+ Years in Student Mentoring in Scholarly Reading, Essay Structuring, and Professional Communication'
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
    name: 'Prof. Mushtaq Ahmad',
    designation: 'Assistant Professor • Entry Test Specialist',
    cardDesignation: 'Assistant Professor',
    department: 'Department of Mathematics & Quantitative Sciences',
    highestDegree: 'Ph.D. in Mathematics',
    experienceYears: '20 Years',
    specialization: 'Applied Mathematics, Entry Test Pedagogy, Calculus & Quantitative Problem Solving',
    intro: 'Distinguished mathematician and premier Entry Test Specialist with 20 years of higher education teaching excellence. Author of 2 peer-reviewed mathematical research publications and legendary mentor for competitive entrance exams across Punjab.',
    photoUrl: '/assets/faculty/dr-mushtaq.jpg',
    fallbackPhotoUrl: '/images/mVDvc6n7_Whats-App-Image-2026-10-09-at-1-11-15-AM.jpg',
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
    fallbackPhotoUrl: '/images/q3shvZ1g_image-29.jpg',
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
    fallbackPhotoUrl: '/images/pT1Mdp1_image-39.jpg',
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
    cardDesignation: 'Assistant Professor',
    department: 'Faculty of Management Sciences (Commerce & Business Studies)',
    highestDegree: 'Ph.D. Scholar (Commerce) • M.Phil Management Sciences (Finance)',
    experienceYears: 'Over 25 Years',
    specialization: 'Accounting, Corporate Finance, Strategic Marketing & Commerce',
    intro: 'Accomplished Commerce & Business Studies educator with over 25 years of distinguished teaching tenure, academic administration, and sports leadership at UCP and PGC Bahawalpur. Two-time recipient of the Chief Minister Punjab Best Teacher Cash Prize.',
    photoUrl: '/assets/faculty/prof-khizer-hayat.jpg',
    fallbackPhotoUrl: '/images/wN3FYgTw_Whats-App-Image-2026-10-14-at-8-11-53-AM.jpg',
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
    fallbackPhotoUrl: '/images/Hf1sx73S_Whats-App-Image-2026-10-14-at-8-12-50-AM.jpg',
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
    designation: 'Lecturer',
    department: 'Faculty of Science & Technology • Department of Mathematics',
    highestDegree: 'M.Phil in Mathematics',
    experienceYears: '10 Years',
    specialization: 'Applied Mathematics, Advanced Calculus, Linear Algebra & Analytical Problem Solving',
    intro: 'Dedicated Mathematics Lecturer with 10 years of academic teaching and pedagogical experience at UCP Bahawalpur. Specializing in pure and applied mathematics, calculus, and mathematical modeling, committed to nurturing rigorous analytical thought and academic excellence.',
    photoUrl: '/assets/faculty/prof-malik-allah-rakha.jpg',
    fallbackPhotoUrl: '/images/jk3H0PVK_Whats-App-Image-2026-10-15-at-10-47-55-PM.jpg',
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
    fallbackPhotoUrl: '/images/zVHGmSrW_Whats-App-Image-2026-10-05-at-2-39-09-AM-2.jpg',
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
    fallbackPhotoUrl: '/images/7xV0RjTJ_image-21.jpg',
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
    name: 'Prof. Syed M. Usman Ali Kazmi',
    designation: 'Lecturer',
    department: 'Department of Computer Science & Information Technology',
    highestDegree: 'MSCS (Master of Science in Computer Science)',
    experienceYears: '12+ Years',
    specialization: 'Computer Science, Systems Operations, CMS Leadership & Project Management',
    intro: 'Lecturer holding an MSCS with comprehensive academic teaching, institutional project management, and campus CMS administrative leadership across premier educational institutions.',
    photoUrl: '/assets/faculty/prof-usman-kazmi.jpg',
    fallbackPhotoUrl: '/images/NRMsLPh_image-28.jpg',
    objectPosition: 'object-top',
    qualifications: [
      'MSCS — Master of Science in Computer Science (Last Degree)',
      'BS in Computer Science / Information Technology'
    ],
    experienceDetails: [
      '2014 to Present: Punjab Group of Colleges (PGC) — CMS Officer & Lecturer (2014–2020 as CMS Officer & Lecturer; 2020 to Present as Lecturer)',
      '2 Years Experience as Project Manager at "Govt. Degree College for Women" Dubai Mahal Road, Bahawalpur',
      '2 Years Experience as Lecturer at Dera Nawab Degree College'
    ],
    coreTechnicalSkills: [
      'Computer Science Pedagogy & Practical Labs',
      'CMS (Campus Management System) Administration',
      'Academic Project Management & Institutional Coordination',
      'Student Mentorship & Information Technology Leadership'
    ]
  },
  {
    id: 'prof-marriam-gill',
    numericId: 13,
    name: 'Prof. Marriam Gill',
    designation: 'Lecturer',
    department: 'Department of Computer Science',
    highestDegree: 'MSCS (Computer Science) • Ph.D. Scholar (Islamia University Bahawalpur)',
    experienceYears: '3 Years (IUB, UE & CTI)',
    specialization: 'Web Technologies (HTML/CSS), Project Management, Complex Problem Solving & E-Commerce',
    intro: 'Lecturer in Computer Science Department at UCP Bahawalpur. Holds an MSCS in Computer Science and is pursuing Ph.D. at The Islamia University of Bahawalpur. Academic experience across IUB, University of Education, and CTI.',
    photoUrl: '/assets/faculty/prof-marriam-gill.jpg',
    fallbackPhotoUrl: '/images/JRFr4LLF_image-31.jpg',
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
    fallbackPhotoUrl: '/images/tPkwz4Ly_Whats-App-Image-2026-10-14-at-8-13-35-AM.jpg',
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
    designation: 'Lecturer',
    department: 'Department of English & Humanities',
    highestDegree: 'M. Phil English',
    experienceYears: '3 Years',
    specialization: 'English Language, Literature & Communication Skills',
    intro: 'Dedicated English Lecturer at UCP Bahawalpur holding an M.Phil in English with 3 years of academic teaching experience.',
    photoUrl: '/assets/faculty/prof-huzaira-akram.jpg',
    fallbackPhotoUrl: '/images/gZ5ZH99L_Whats-App-Image-2026-10-14-at-8-11-35-AM.jpg',
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
    fallbackPhotoUrl: '/images/7JVX7DYr_Whats-App-Image-2026-10-15-at-10-32-37-PM.jpg',
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
    fallbackPhotoUrl: '/images/vvTJ4GPy_Whats-App-Image-2026-10-17-at-3-27-42-AM.jpg',
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
    fallbackPhotoUrl: '/images/MkL1TDt1_Whats-App-Image-2026-10-15-at-10-47-27-PM.jpg',
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
  officeHours: 'Monday – Friday: 8:00 AM – 4:00 PM',
  portalUrl: 'https://mcom.pgc.edu.pk/Student/StdLogin.jsp'
};

