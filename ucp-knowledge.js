/**
 * UCP Bahawalpur Campus - Offline Trained Knowledge Base
 * Complete knowledge base containing all official campus information, programs,
 * admissions, fee structures, scholarships, leadership messages, faculty, and facilities.
 */

/**
 * @typedef {Object} KnowledgeItem
 * @property {string} id
 * @property {string} question
 * @property {string} answer
 * @property {string[]} keywords
 * @property {string} category
 * @property {{ label: string, url: string }} [actionLink]
 * @property {string[]} [suggestions]
 * @property {boolean} [isAdmissionRelated]
 * @property {boolean} [isDeveloperRelated]
 */

export const UCP_KNOWLEDGE_BASE = [
  // 1. DEVELOPER / CREATOR (CRITICAL: Only trigger when asked who made / developed it)
  {
    id: "developer-info",
    question: "who is your developer / who made you / who made this website / who is founder of this website",
    answer: "I and this entire website of UCP Bahawalpur campus were developed and built by Asifa, a student of AI at UCP Bahawalpur! 🎓✨",
    keywords: [
      "who made you",
      "who is your developer",
      "who developed you",
      "who created you",
      "who built you",
      "who designed you",
      "who is your creator",
      "who is developer",
      "developer name",
      "your maker",
      "who coded you",
      "who made this website",
      "who developed this website",
      "who built this website",
      "who created this website",
      "developer of this website",
      "developer of website",
      "website developer",
      "website creator",
      "who made the website",
      "who built the website",
      "who developed the website",
      "founder of this website",
      "founder of website",
      "who is founder of this website",
      "who is the founder of this website"
    ],
    category: "creator",
    isDeveloperRelated: true,
    suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Admissions 📝"]
  },

  // 2. BOT IDENTITY & NAME
  {
    id: "bot-identity",
    question: "what is your name / who are you",
    answer: "Hello! I'm UCP Assistant, your official guide for UCP Bahawalpur! 🎓 How can I help you today?",
    keywords: [
      "who are you",
      "what is your name",
      "your name",
      "who you are",
      "tell me about yourself",
      "ucp assistant",
      "ucp bot",
      "what can you do",
      "assistant"
    ],
    category: "identity",
    suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Scholarships 🏆", "How to Apply 📝"]
  },

  // 3. GREETINGS & CASUAL HELLOS
  {
    id: "greetings",
    question: "greetings and hello",
    answer: "Hey there! Welcome to UCP Bahawalpur. I'm UCP Assistant 🎓 How can I assist you today?",
    keywords: [
      "hi",
      "hello",
      "hey",
      "salam",
      "assalam",
      "assalam o alaikum",
      "aoa",
      "greetings",
      "good morning",
      "good afternoon",
      "good evening",
      "subha bakhair"
    ],
    category: "greetings",
    suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Scholarships 🏆", "Admissions 📝"]
  },

  // 4. HOW ARE YOU
  {
    id: "how-are-you",
    question: "how are you doing",
    answer: "I'm doing great, thank you! Ready to help you with everything about UCP Bahawalpur. What would you like to know?",
    keywords: [
      "how are you",
      "how do you do",
      "kese ho",
      "kaise ho",
      "are you fine",
      "what's up",
      "how is it going"
    ],
    category: "greetings",
    suggestions: ["Degree Programmes 🎓", "Admissions 📝", "Fee Structure 💰"]
  },

  // 5. ALL ACADEMIC PROGRAMMES OVERVIEW
  {
    id: "all-programs",
    question: "what programs / courses / degrees are offered at UCP Bahawalpur",
    answer: "UCP Bahawalpur offers 4-year BS degrees (BSCS, BBA, Business Analytics, Accounting & Finance, English, Psychology, Biotech, Biochem, Chemistry, Physics, Math, Zoology) and 2-year Associate Degrees (ADP AI, ADP CS, ADP SE, ADP Cyber Security, ADP Data Science, ADP Business, ADS Pre-Medical, ADS Math/Physics) 🎓.",
    keywords: [
      "programs",
      "programmes",
      "courses",
      "degrees",
      "what programs",
      "what degrees",
      "degrees offered",
      "all programs",
      "list of programs",
      "which programs",
      "what courses"
    ],
    category: "academics",
    actionLink: { label: "Explore All Programmes 📚", url: "#programmes" },
    suggestions: ["BS Computer Science 💻", "ADP AI 🤖", "BBA 📊", "Fee Structure 💰"]
  },

  // 6. ADMISSIONS & HOW TO APPLY (WITH ADMISSION FORM QUESTION)
  {
    id: "admissions-general",
    question: "how to apply for admission / admission criteria and process",
    answer: "Admissions are currently open for Fall & Spring sessions! You need minimum 50% marks in Intermediate (FSc, ICS, FA, I.Com, or A-Levels). Would you like me to open admission form?",
    keywords: [
      "admission",
      "admissions",
      "apply",
      "how to apply",
      "admission process",
      "admission procedure",
      "enroll",
      "enrollment",
      "admission form",
      "apply online",
      "apply now",
      "registration",
      "last date to apply"
    ],
    category: "admissions",
    isAdmissionRelated: true,
    actionLink: { label: "Open Admission Form 📝", url: "https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F" },
    suggestions: ["Open Admission Form 📝", "Eligibility Criteria 📋", "Fee Structure 💰", "Scholarships 🏆"]
  },

  // 7. ADMISSION ELIGIBILITY & REQUIREMENTS
  {
    id: "admission-eligibility",
    question: "what is the admission eligibility / requirements",
    answer: "Eligibility is minimum 50% marks in Intermediate (HSSC / FSC / ICS / FA / I.Com / A-Levels) or equivalent. Required documents: Matric & Inter result cards, CNIC/B-Form, and photos. Would you like me to open admission form?",
    keywords: [
      "eligibility",
      "criteria",
      "requirements",
      "marks required",
      "percentage required",
      "minimum marks",
      "documents required",
      "qualification required"
    ],
    category: "admissions",
    isAdmissionRelated: true,
    actionLink: { label: "Open Admission Form 📝", url: "https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F" },
    suggestions: ["Open Admission Form 📝", "BS Computer Science 💻", "Fee Details 💰"]
  },

  // 8. COMPUTER SCIENCE & BSCS
  {
    id: "program-bscs",
    question: "tell me about BS Computer Science (BSCS)",
    answer: "BS Computer Science is a 4-year degree (132 Credit Hours) covering programming, software engineering, AI, algorithms, and cloud computing with advanced GPU lab facilities 💻. Would you like me to open admission form?",
    keywords: [
      "bscs",
      "bs cs",
      "bs computer science",
      "computer science",
      "cs program",
      "computing"
    ],
    category: "academics",
    isAdmissionRelated: true,
    actionLink: { label: "View BSCS Details 💻", url: "#programmes?category=Computing%20%26%20Technology&program=bs-computer-science" },
    suggestions: ["BSCS Fee 💰", "ADP Computer Science 🖥️", "Open Admission Form 📝"]
  },

  // 9. ARTIFICIAL INTELLIGENCE & ADP AI
  {
    id: "program-adp-ai",
    question: "tell me about ADP Artificial Intelligence",
    answer: "ADP Artificial Intelligence is a 2-year associate degree (75 Credit Hours) focusing on machine learning, Python, neural networks, and computer vision with direct progression to 4-year BS degrees 🤖!",
    keywords: [
      "ai",
      "artificial intelligence",
      "adp ai",
      "adp artificial intelligence",
      "adp artificial",
      "machine learning"
    ],
    category: "academics",
    actionLink: { label: "View ADP AI Curriculum 🤖", url: "#programmes?category=Computing%20%26%20Technology&program=adp-artificial-intelligence" },
    suggestions: ["ADP AI Fee 💰", "BS Computer Science 💻", "How to Apply 📝"]
  },

  // 10. SOFTWARE ENGINEERING & ADP SE
  {
    id: "program-adp-se",
    question: "tell me about Software Engineering / ADP SE",
    answer: "ADP Software Engineering is a 2-year practical degree (74 Credit Hours) covering full-stack development, mobile apps, database design, and agile quality assurance 🚀.",
    keywords: [
      "software engineering",
      "adp se",
      "adp software engineering",
      "software engineer",
      "se program"
    ],
    category: "academics",
    actionLink: { label: "View ADP SE Details 💻", url: "#programmes?category=Computing%20%26%20Technology&program=adp-software-engineering" },
    suggestions: ["Computing Fee 💰", "BSCS Details 💻", "Admissions 📝"]
  },

  // 11. CYBER SECURITY & DATA SCIENCE
  {
    id: "program-cyber-data-science",
    question: "tell me about Cyber Security and Data Science programs",
    answer: "We offer 2-year Associate Degrees in Cyber Security (75 CH, ethical hacking & network defense) and Data Science (78 CH, big data analytics & statistical computing) 🛡️📊.",
    keywords: [
      "cyber security",
      "cybersecurity",
      "data science",
      "adp cyber security",
      "adp data science",
      "big data"
    ],
    category: "academics",
    actionLink: { label: "Explore Computing Programs 💻", url: "#programmes?category=Computing%20%26%20Technology" },
    suggestions: ["Fee Structure 💰", "BS Computer Science 💻", "Apply Now 📝"]
  },

  // 12. BUSINESS ADMINISTRATION & BBA
  {
    id: "program-bba",
    question: "tell me about BBA (Bachelor of Business Administration)",
    answer: "BBA (Honors) is a prestigious 4-year degree (132 Credit Hours) covering corporate finance, digital marketing, strategic leadership, and supply chain with direct internship linkages 📈. Would you like me to open admission form?",
    keywords: [
      "bba",
      "bba honors",
      "business administration",
      "business degree",
      "management studies",
      "fms"
    ],
    category: "academics",
    isAdmissionRelated: true,
    actionLink: { label: "View BBA Curriculum 📊", url: "#programmes?category=Business&program=bba" },
    suggestions: ["BBA Fee 💰", "Accounting & Finance 📊", "Open Admission Form 📝"]
  },

  // 13. ACCOUNTING & FINANCE
  {
    id: "program-accounting-finance",
    question: "tell me about Accounting & Finance",
    answer: "We offer BS Accounting & Finance (4 years, 126 CH) and ADP Accounting & Finance (2 years, 66 CH) aligned with ACCA/CA accreditation and financial management 💼.",
    keywords: [
      "accounting",
      "finance",
      "accounting and finance",
      "bs accounting and finance",
      "adp accounting and finance",
      "bs af",
      "adp af",
      "acca"
    ],
    category: "academics",
    actionLink: { label: "View Accounting & Finance 💼", url: "#programmes?category=Business&program=bs-accounting-finance" },
    suggestions: ["Fee Structure 💰", "BBA Details 📊", "Apply Online 📝"]
  },

  // 14. BUSINESS ANALYTICS
  {
    id: "program-business-analytics",
    question: "tell me about Business Analytics",
    answer: "BS Business Analytics (4 years, 133 CH) and ADP Business Analytics (2 years, 64 CH) blend data analytics, predictive modeling, and business management for tech-driven business careers 📉.",
    keywords: [
      "business analytics",
      "bs business analytics",
      "adp business analytics",
      "analytics"
    ],
    category: "academics",
    actionLink: { label: "View Business Analytics 📉", url: "#programmes?category=Business&program=bs-business-analytics" },
    suggestions: ["Fee Breakdown 💰", "BBA 📊", "Apply Now 📝"]
  },

  // 15. NATURAL SCIENCES (BIOTECH, BIOCHEM, CHEMISTRY, PHYSICS, ZOOLOGY, MATH)
  {
    id: "program-sciences",
    question: "tell me about Science programs (Biotech, Chemistry, Physics, Zoology)",
    answer: "Faculty of Science & Technology offers BS in Biotechnology, Biochemistry, Chemistry, Physics, Mathematics, and Zoology, plus 2-year ADS degrees in Pre-Medical and Math/Physics with cutting-edge labs 🧬🧪.",
    keywords: [
      "biotechnology",
      "biotech",
      "biochemistry",
      "chemistry",
      "physics",
      "zoology",
      "mathematics",
      "math",
      "science programs",
      "fost",
      "ads",
      "pre medical"
    ],
    category: "academics",
    actionLink: { label: "View Science Degrees 🧬", url: "#programmes?category=Science" },
    suggestions: ["Biotech Details 🧬", "Science Fee 💰", "Admissions 📝"]
  },

  // 16. HUMANITIES, ENGLISH & PSYCHOLOGY
  {
    id: "program-humanities",
    question: "tell me about English and Psychology programs",
    answer: "We offer 4-year BS and 2-year ADP degrees in English Language & Literature and Psychology, featuring dedicated clinical assessment and speech laboratories 📚🧠.",
    keywords: [
      "english",
      "bs english",
      "psychology",
      "bs psychology",
      "adp english",
      "adp psychology",
      "fhss",
      "humanities",
      "social sciences"
    ],
    category: "academics",
    actionLink: { label: "View Humanities Degrees 📚", url: "#programmes?category=Humanities%20%26%20Social%20Sciences" },
    suggestions: ["BS Psychology 🧠", "BS English 📖", "Fee Details 💵"]
  },

  // 17. LAW PROGRAM GUIDANCE
  {
    id: "program-law",
    question: "does UCP offer Law / LLB",
    answer: "For Law degrees (such as 5-year LLB), UCP main campus in Lahore offers an accredited Faculty of Law. Our Bahawalpur admissions team can guide you on transfer pathways and criteria ⚖️! Call 062-2202030 for full guidance.",
    keywords: [
      "law",
      "llb",
      "law degree",
      "legal studies",
      "faculty of law",
      "law program"
    ],
    category: "academics",
    suggestions: ["Contact Helpline 📞", "All Programs 🎓", "Admissions 📝"]
  },

  // 18. FEE STRUCTURE
  {
    id: "fee-structure",
    question: "what is the fee structure / tuition fee",
    answer: "Tuition is Rs. 4,100 to Rs. 6,800 per credit hour. Admission fee is Rs. 9,000 and registration is Rs. 2,500 (one-time). Associate degrees total ~Rs. 2.8L-5.4L, BS degrees total ~Rs. 6.4L-8.8L with easy semester installment plans 💰.",
    keywords: [
      "fee",
      "fees",
      "fee structure",
      "tuition",
      "cost",
      "charges",
      "expenses",
      "per semester",
      "per credit",
      "installment",
      "how much fee",
      "dues"
    ],
    category: "fee",
    actionLink: { label: "Official Fee Structure", url: "#fee-structure" },
    suggestions: ["Scholarships 🏆", "PGC Discount 🎓", "Open Admission Form 📝"]
  },

  // 19. SCHOLARSHIPS & CONCESSIONS
  {
    id: "scholarships",
    question: "what scholarships and fee concessions are available",
    answer: "UCP Bahawalpur offers up to 50% Merit Scholarships based on intermediate marks, a 25% fee concession for PGC alumni, 25% kinship discount for siblings, and generous need-based aid 🏆!",
    keywords: [
      "scholarship",
      "scholarships",
      "financial aid",
      "discount",
      "concession",
      "pgc concession",
      "merit scholarship",
      "kinship",
      "fee waiver",
      "free education"
    ],
    category: "scholarships",
    actionLink: { label: "View Scholarships Details", url: "#scholarships" },
    suggestions: ["Eligibility for 50% 🏅", "Fee Structure 💰", "Apply Now 📝"]
  },

  // 20. LOCATION & ADDRESS
  {
    id: "campus-location",
    question: "where is UCP Bahawalpur located / address",
    answer: "UCP Bahawalpur is located at: Constituent College, UCP Campus, Airport Road, Bahawalpur, Punjab, Pakistan 📍. Dedicated air-conditioned student buses cover all major routes!",
    keywords: [
      "location",
      "address",
      "where is",
      "where located",
      "airport road",
      "campus address",
      "directions",
      "map",
      "city"
    ],
    category: "campus",
    actionLink: { label: "Open in Google Maps", url: "https://maps.app.goo.gl/ud9Sz3ZLR7zt9aiT7" },
    suggestions: ["Transport System 🚌", "Contact Helpline 📞", "Apply for Admission 📝"]
  },

  // 21. CONTACT NUMBERS & EMAIL
  {
    id: "contact-details",
    question: "what are the contact numbers / phone / email / helpline",
    answer: "You can reach UCP Bahawalpur by phone at 062-2202030 or 062-2202050, toll-free at 0800-00827, and email at info@ucp.edu.pk 📞. Office hours are Monday to Friday, 9 AM to 5 PM.",
    keywords: [
      "contact",
      "phone",
      "number",
      "mobile",
      "telephone",
      "email",
      "helpline",
      "call",
      "whatsapp",
      "office hours",
      "timing",
      "support"
    ],
    category: "contact",
    suggestions: ["Admissions Office 🏫", "Fee Breakdown 💰", "Programs Offered 🎓"]
  },

  // 22. VC & CHAIRMAN MESSAGE (MIAN AMER MAHMOOD)
  {
    id: "chairman-vc-message",
    question: "who is the Chairman / VC message / Mian Amer Mahmood",
    answer: "Mian Amer Mahmood is the Founder & Chairman of Punjab Group of Colleges (PGC) and UCP. His vision is to provide world-class, accessible education in Southern Punjab and empower youth with critical skills and character 🏛️.",
    keywords: [
      "chairman",
      "vc",
      "vice chancellor",
      "mian amer",
      "mian amir",
      "mian amer mahmood",
      "chairman message",
      "founder",
      "owner"
    ],
    category: "leadership",
    actionLink: { label: "Read Chairman's Message", url: "#welcome-ucp-section" },
    suggestions: ["Director Message 👔", "Campus Overview 🏛️", "Degree Roadmaps 📚"]
  },

  // 23. DIRECTOR MESSAGE (PROF. HAMID IQBAL)
  {
    id: "director-message",
    question: "who is the Director / Director message / Prof. Hamid Iqbal",
    answer: "Prof. Hamid Iqbal is the Director of PGC & UCP Bahawalpur Cluster. He emphasizes student-centric learning, academic discipline, impactful research, and grooming graduates for modern industry success 👔.",
    keywords: [
      "director",
      "director message",
      "hamid iqbal",
      "prof hamid iqbal",
      "prof hamid",
      "campus director"
    ],
    category: "leadership",
    actionLink: { label: "View Director Profile", url: "#our-campus-section" },
    suggestions: ["Principal Message 🎓", "Leadership Profiles 👔", "Admissions 📝"]
  },

  // 24. PRINCIPAL MESSAGE (PROF. DR. AURANGZAIB VIRK)
  {
    id: "principal-message",
    question: "who is the Principal / Principal message / Dr. Aurangzaib Virk",
    answer: "Dr. Aurangzaib Virk is the Principal of UCP Bahawalpur Campus. He holds a PhD in Strategic Management and is dedicated to environmental sustainability, strong student mentorship, and academic excellence 🎓.",
    keywords: [
      "principal",
      "principal message",
      "aurangzaib",
      "aurangzeb",
      "prof aurangzaib",
      "dr aurangzaib virk",
      "head of campus"
    ],
    category: "leadership",
    suggestions: ["Faculty Details 👨‍🏫", "Degree Programs 🎓", "Contact Office 📞"]
  },

  // 25. EXECUTIVE DIRECTOR MESSAGE (PROF. SOHAIL AFZAL)
  {
    id: "executive-director-message",
    question: "who is Prof. Sohail Afzal / Executive Director message",
    answer: "Prof. Sohail Afzal is Executive Director of PGC (UCP) and Member BoG. His message: \"At UCP we are a family that cares, grooms, and helps unlock the true potential of our students so they shine in every aspect of life.\" ✨",
    keywords: [
      "sohail afzal",
      "prof sohail",
      "executive director",
      "sohail afzal message"
    ],
    category: "leadership",
    suggestions: ["Chairman Message 🏛️", "Director Message 👔", "Apply Now 🚀"]
  },

  // 26. FACULTY & TEACHERS
  {
    id: "faculty-members",
    question: "tell me about the faculty and teachers at UCP Bahawalpur",
    answer: "Our faculty includes experienced PhDs and MPhil scholars across Computing, Business, Sciences, and Humanities, committed to interactive teaching, modern research, and personalized student guidance 👨‍🏫👩‍🏫.",
    keywords: [
      "faculty",
      "teachers",
      "professors",
      "staff",
      "lecturers",
      "academic staff",
      "who teaches"
    ],
    category: "faculty",
    actionLink: { label: "Meet the Faculty", url: "#faculty" },
    suggestions: ["All Programs 🎓", "Computing Faculty 💻", "Admissions 📝"]
  },

  // 27. CAMPUS LIFE & STUDENT ACTIVITIES
  {
    id: "campus-life-activities",
    question: "what is campus life like / events and student societies",
    answer: "Campus life is vibrant with 22+ annual events! Students participate in sports galas, documentary competitions, AI symposiums, project expos, music & cultural nights, and active student-led societies 🎪⚽.",
    keywords: [
      "campus life",
      "activities",
      "societies",
      "events",
      "sports",
      "clubs",
      "student life",
      "extracurricular",
      "culture",
      "galas"
    ],
    category: "campus",
    actionLink: { label: "Explore Campus Life", url: "#campus-life" },
    suggestions: ["Facilities 🏛️", "Northern Tour 🏔️", "Admissions 📝"]
  },

  // 27b. TRIP TO NORTHERN AREA (2026 EVENT)
  {
    id: "trip-northern-area",
    question: "tell me about trip to northern area / tour / excursion",
    answer: "The Trip to Northern Area is an alpine expedition in our 2026 events! Students explore Shogran, Siri Paye, and Kaghan Valley with team-building, bonfires, and mountain photography 🏔️🏕️.",
    keywords: [
      "northern area",
      "northern trip",
      "northern tour",
      "shogran",
      "siri paye",
      "kaghan",
      "trip",
      "tour",
      "excursion",
      "mountains"
    ],
    category: "campus",
    actionLink: { label: "View Campus Life", url: "/campus-life" },
    suggestions: ["Campus Life 🎪", "Events 2026 📅", "Student Societies 🤝"]
  },

  // 28. FACILITIES, LABS & INFRASTRUCTURE
  {
    id: "facilities-infrastructure",
    question: "what facilities and labs are available on campus",
    answer: "Our purpose-built campus features GPU-powered AI and computer labs, specialized biotech & chemistry labs, a high-tech digital library, sports grounds, modern cafeteria, and university transport 🏛️.",
    keywords: [
      "facilities",
      "labs",
      "laboratories",
      "library",
      "transport",
      "bus",
      "cafeteria",
      "grounds",
      "infrastructure",
      "hostel"
    ],
    category: "campus",
    actionLink: { label: "View Campus Facilities", url: "#facilities" },
    suggestions: ["Transport Routes 🚍", "Location Map 📍", "Admissions 📝"]
  },

  // 29. CONTINUATION / LATERAL ENTRY FROM ADP TO BS
  {
    id: "adp-to-bs-progression",
    question: "can I transfer or continue from ADP to 5th semester BS",
    answer: "Yes! After completing your 2-year Associate Degree (ADP), you can smoothly progress directly into the 5th semester of the corresponding 4-year BS degree (e.g. ADP AI into BSCS) under HEC guidelines 🎓.",
    keywords: [
      "adp to bs",
      "lateral entry",
      "5th semester",
      "progression",
      "credit transfer",
      "after adp",
      "convert adp to bs"
    ],
    category: "academics",
    suggestions: ["ADP AI 🤖", "BS Computer Science 💻", "Fee Details 💰"]
  },

  // 30. ABOUT UCP BAHAWALPUR / HISTORY & LEGACY
  {
    id: "about-us",
    question: "tell me about UCP Bahawalpur / about us",
    answer: "UCP Bahawalpur is a constituent college of the University of Central Punjab (PGC network). We bring Lahore's top-tier academic standards, faculty, and accredited degrees right here to Airport Road, Bahawalpur 🏛️.",
    keywords: [
      "about us",
      "about ucp",
      "about campus",
      "history",
      "legacy",
      "introduction",
      "what is ucp"
    ],
    category: "about",
    actionLink: { label: "Explore Our Legacy ⭐", url: "#legacy" },
    suggestions: ["Degree Programmes 🎓", "Admissions 📝", "Location 📍"]
  },

  // 31. CAMPUS LEADERSHIP
  {
    id: "leadership-all",
    question: "who are the leaders and administrators of UCP Bahawalpur",
    answer: "UCP Bahawalpur is led by a visionary team:\n• Founder & Chairman: Mian Amer Mahmood (Punjab Group of Colleges)\n• Director PGC & UCP Cluster: Prof. Hamid Iqbal\n• Principal: Dr. Aurangzaib Virk (PhD Strategic Management)\n• Executive Director: Prof. Sohail Afzal\nThey ensure international academic standards, state-of-the-art facilities, and student growth 🏛️.",
    keywords: [
      "leadership",
      "leaders",
      "administration",
      "administrators",
      "management",
      "head of campus",
      "who runs ucp",
      "campus leaders",
      "leadership team"
    ],
    category: "leadership",
    actionLink: { label: "View Leadership Profiles 👔", url: "#leadership" },
    suggestions: ["Principal Message 🎓", "Faculty Details 👨‍🏫", "Admissions 📝"]
  },

  // 32. LEGACY & HERITAGE
  {
    id: "legacy-heritage",
    question: "tell me about the legacy and history of UCP and Punjab Group of Colleges",
    answer: "UCP Bahawalpur carries the proud legacy of Pakistan's largest educational network — Punjab Group of Colleges (PGC), founded in 1985 by Mian Amer Mahmood. With over 2,000,000 alumni worldwide and 40+ years of academic excellence, UCP is the premier destination for higher education in South Punjab ⭐.",
    keywords: [
      "legacy",
      "history",
      "heritage",
      "legacy of ucp",
      "history of ucp",
      "pgc legacy",
      "punjab group history",
      "achievements",
      "background"
    ],
    category: "about",
    actionLink: { label: "Explore Campus Legacy ⭐", url: "#legacy" },
    suggestions: ["Campus Leadership 🏛️", "Degree Programmes 🎓", "Admissions 📝"]
  },

  // 33. FACILITIES & CAMPUS INFRASTRUCTURE
  {
    id: "facilities-campus",
    question: "what facilities, computing labs, buses, and library are available",
    answer: "UCP Bahawalpur boasts modern, purpose-built campus facilities:\n• High-Performance GPU Computing Labs for AI & Software Engineering\n• Specialized Physics, Chemistry, and Biotech Research Labs\n• High-Tech Digital Library with international journal access\n• Dedicated Fleet of Air-Conditioned Buses covering all Bahawalpur routes\n• Cafeteria, Sports Grounds, and 24/7 CCTV-secured campus 🔬🚌.",
    keywords: [
      "facilities",
      "facility",
      "campus facilities",
      "computing labs",
      "computer labs",
      "labs",
      "library",
      "transport",
      "buses",
      "bus service",
      "cafeteria",
      "sports grounds",
      "gym",
      "infrastructure"
    ],
    category: "campus",
    actionLink: { label: "Explore Campus Facilities 🚌", url: "#facilities" },
    suggestions: ["Degree Programmes 🎓", "Admissions 📝", "Contact Campus 📞"]
  },

  // 34. SCOPE OF ALL PROGRAMMES
  {
    id: "program-scope",
    question: "what is the career scope and future demand for all programmes",
    answer: "All UCP Bahawalpur degrees offer exceptional industry demand:\n• Computing & AI (BSCS, ADP AI, SE, Cyber, Data Science): High-paying careers in AI development, cloud architecture, cybersecurity defense, and remote global tech roles.\n• Business (BBA, Business Analytics, Accounting): Rapid growth in corporate banking, fintech, and multinational management.\n• Sciences (Biotech, Biochemistry, Physics, Math): Flourishing pathways in pharma R&D, clinical testing, and overseas master's scholarships.\n• Humanities (Psychology, English): High demand in clinical counseling, corporate HR, digital strategy, and civil services (CSS/PMS) 📈✨.",
    keywords: [
      "scope",
      "career scope",
      "scope of all programmes",
      "future demand",
      "career opportunities",
      "job market",
      "jobs",
      "careers",
      "scope of degrees",
      "market demand"
    ],
    category: "academics",
    actionLink: { label: "Explore Degree Catalog 🚀", url: "#programmes" },
    suggestions: ["Degree Programmes 🎓", "Eligibility Criteria 📋", "Open Admission Form 📝"]
  }
];

const STOP_WORDS = new Set([
  'what', 'is', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'do', 'does',
  'did', 'can', 'could', 'would', 'will', 'tell', 'me', 'about', 'how', 'why', 'who', 'which',
  'where', 'when', 'there', 'here', 'are', 'was', 'were', 'it', 'its', 'you', 'your', 'i', 'my',
  'we', 'our', 'give', 'show', 'please', 'know', 'want', 'like', 'some', 'any', 'that', 'this',
  'much', 'many', 'good', 'day'
]);

// Campus & domain specific root keywords to prevent general world questions from false-matching
const UCP_DOMAIN_KEYWORDS = [
  'ucp', 'bahawalpur', 'bwp', 'punjab group', 'pgc',
  'program', 'programs', 'programme', 'programmes', 'degree', 'degrees',
  'admission', 'admissions', 'apply', 'applying', 'enroll', 'enrollment', 'eligibility',
  'fee', 'fees', 'tuition', 'installment', 'installments', 'dues', 'view fee',
  'scholarship', 'scholarships', 'concession', 'concessions', 'kinship',
  'bscs', 'bs cs', 'bba', 'adp', 'ads', 'fms', 'foit', 'fost', 'fhss', 'llb',
  'bs english', 'bs psychology', 'bs physics', 'bs math', 'bs chemistry', 'bs biotech', 'bs zoology',
  'adp ai', 'adp cs', 'adp se', 'adp cyber', 'adp data',
  'director', 'principal', 'chairman', 'mian amer', 'mian amir', 'hamid iqbal', 'aurangzaib', 'aurangzeb', 'sohail afzal',
  'faculty', 'faculty members', 'professors', 'professor', 'teachers', 'lecturers', 'instructor',
  'leadership', 'leaders', 'administration', 'administrators', 'management',
  'legacy', 'heritage', 'history',
  'facilities', 'facility', 'labs', 'lab', 'computing', 'transport', 'bus', 'buses', 'library', 'cafeteria', 'sports',
  'scope', 'career', 'careers', 'jobs', 'demand',
  'airport road', 'helpline', '062-2202030', '0800-00827',
  'developer', 'founder'
];

/**
 * Intelligent keyword and semantic matcher for UCP Knowledge Base.
 * Returns the best matching entry if confidence is high, or null if out-of-scope (so Gemini handles it).
 */
export function searchUcpKnowledge(query) {
  if (!query || typeof query !== 'string') {
    return { match: null, confidence: 0 };
  }

  const cleanQuery = query.toLowerCase().trim();

  // 1. SPECIFIC CHECK: Developer / Creator
  // Rule: ONLY trigger if specifically asked who made/developed/created you or the website!
  const isDeveloperQuery = /who (made|developed|created|built|coded|designed) (you|this website|the website|website)|who is (your|the) (developer|creator|maker|founder)|developer of (this )?website|website developer|founder of (this )?website|who founded this website/i.test(cleanQuery);
  if (isDeveloperQuery) {
    const devItem = UCP_KNOWLEDGE_BASE.find(item => item.id === "developer-info");
    if (devItem) return { match: devItem, confidence: 100 };
  }

  // 2. Exact match for basic greetings
  if (/^(hi|hello|hey|salam|assalam|assalam o alaikum|aoa|hola|good morning|good afternoon|good evening|subha bakhair)$/i.test(cleanQuery)) {
    const greetingItem = UCP_KNOWLEDGE_BASE.find(item => item.id === "greetings");
    if (greetingItem) return { match: greetingItem, confidence: 80 };
  }

  // 3. Exact match for "how are you"
  if (/^(how are you|how do you do|kese ho|kaise ho|are you fine|how is it going)$/i.test(cleanQuery)) {
    const howAreYouItem = UCP_KNOWLEDGE_BASE.find(item => item.id === "how-are-you");
    if (howAreYouItem) return { match: howAreYouItem, confidence: 80 };
  }

  // 4. Exact match for bot identity
  if (/^(who are you|what is your name|your name|what can you do|who you are)$/i.test(cleanQuery)) {
    const identityItem = UCP_KNOWLEDGE_BASE.find(item => item.id === "bot-identity");
    if (identityItem) return { match: identityItem, confidence: 80 };
  }

  // 5. DOMAIN FILTER: If the query does not contain ANY campus/UCP terms,
  // it is a general world question (e.g. quantum physics, general math, geography, coding, jokes)
  // Let Gemini answer it!
  const hasDomainKeyword = UCP_DOMAIN_KEYWORDS.some(k => cleanQuery.includes(k));
  if (!hasDomainKeyword) {
    return { match: null, confidence: 0 };
  }

  const allTokens = cleanQuery.split(/[\s,?.!/\\-]+/).filter(t => t.length > 1);
  const meaningfulTokens = allTokens.filter(t => !STOP_WORDS.has(t));

  if (meaningfulTokens.length === 0) {
    return { match: null, confidence: 0 };
  }

  let bestMatch = null;
  let highestScore = 0;

  for (const item of UCP_KNOWLEDGE_BASE) {
    if (item.isDeveloperRelated && !isDeveloperQuery) {
      continue;
    }

    let score = 0;

    // Check exact keyword phrases
    for (const kw of item.keywords) {
      const cleanKw = kw.toLowerCase();
      if (cleanQuery === cleanKw) {
        score += 60; // exact match
      } else if (cleanKw.length >= 4 && cleanQuery.includes(cleanKw)) {
        score += 25 + cleanKw.length; // substring phrase match
      }
    }

    // Check meaningful token overlaps
    for (const token of meaningfulTokens) {
      for (const kw of item.keywords) {
        const kwParts = kw.toLowerCase().split(/\s+/);
        if (kwParts.includes(token)) {
          score += 8;
        }
      }
      if (item.question.toLowerCase().includes(token)) {
        score += 5;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // Confidence threshold: at least 20 points
  if (bestMatch && highestScore >= 20) {
    return { match: bestMatch, confidence: highestScore };
  }

  return { match: null, confidence: 0 };
}
