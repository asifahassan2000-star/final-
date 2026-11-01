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
  // 1. DEVELOPER / CREATOR / REPRESENTATIVE ATTRIBUTIONS
  {
    id: "website-developer",
    question: "who developed this website / who designed this website",
    answer: "This website was designed and developed by Asifa, an AI student at UCP Bahawalpur.",
    keywords: [
      "who developed this website",
      "who designed this website",
      "who built this website",
      "who made this website",
      "who created this website",
      "who coded this website",
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
  {
    id: "who-created-you",
    question: "who created you / who made you",
    answer: "I’m the UCP Bahawalpur AI Assistant, developed by Asifa to help visitors access campus information quickly and easily.",
    keywords: [
      "who created you",
      "who made you",
      "who built you",
      "who designed you",
      "who coded you",
      "who invented you",
      "who is your creator",
      "who is your maker"
    ],
    category: "creator",
    isDeveloperRelated: true,
    suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Admissions 📝"]
  },
  {
    id: "who-is-your-developer",
    question: "who is your developer / who developed you",
    answer: "My developer is Asifa, an AI student at UCP Bahawalpur.",
    keywords: [
      "who is your developer",
      "who's your developer",
      "who is the developer",
      "your developer",
      "who developed you",
      "who is your author",
      "developer name",
      "who is developer"
    ],
    category: "creator",
    isDeveloperRelated: true,
    suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Admissions 📝"]
  },
  {
    id: "who-made-chatbot",
    question: "who made this chatbot / who created this bot",
    answer: "This AI chatbot was created by Asifa to provide helpful information and assistance to UCP Bahawalpur visitors.",
    keywords: [
      "who made this chatbot",
      "who made the chatbot",
      "who made chatbot",
      "who created this chatbot",
      "who developed this chatbot",
      "who built this chatbot",
      "who designed this chatbot",
      "who coded this chatbot",
      "who made this bot",
      "who created this bot",
      "who developed this bot",
      "who built this bot",
      "chatbot developer",
      "bot developer",
      "bot maker"
    ],
    category: "creator",
    isDeveloperRelated: true,
    suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Admissions 📝"]
  },
  {
    id: "official-representative",
    question: "are you an official ucp representative / are you a human",
    answer: "I’m an AI assistant for the UCP Bahawalpur Campus website. I provide information to help visitors, but I’m not a human university representative.",
    keywords: [
      "are you an official ucp representative",
      "are you an official representative",
      "are you official representative",
      "are you official",
      "are you official ucp",
      "are you a human",
      "are you a real person",
      "are you a real human",
      "are you human",
      "are you a human representative",
      "official representative",
      "official ucp representative"
    ],
    category: "identity",
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

  // 28b. LIBRARY CARD & MEMBERSHIP PROCEDURE
  {
    id: "library-card-procedure",
    question: "How can I get a library card at UCP Bahawalpur? / Library Membership Registration",
    answer: "To get your Library Card at UCP Bahawalpur:\n1. Visit the Photoshop shop located at UCP Bahawalpur and ask for the Library Membership Form.\n2. Fill out the form with your required information.\n3. Bring two recent passport-size photographs. Attach one to the form.\n4. Submit the completed form to the Chairman of the Library at the university library.\n5. Give your second photograph separately to the Chairman.\n6. The Chairman will provide your library card with your photograph on it.\n\nImportant: Bring both passport-size photographs. One is attached to the form, and the other is submitted separately.\n\nSource: UCP Bahawalpur – Student-provided library card procedure.",
    keywords: [
      "library card",
      "get a library card",
      "how can i get a library card",
      "how can i get a library card at ucp bahawalpur",
      "make my library card",
      "how can i make my library card",
      "library membership form",
      "where can i get a library membership form",
      "library card kahan se banega",
      "library card banwane ka kya procedure hai",
      "library card procedure",
      "i want to become a library member",
      "become a library member",
      "where do i submit my library card form",
      "submit my library card form",
      "how many passport-size photographs are required",
      "passport-size photographs",
      "photographs required",
      "can i get a library card as a ucp student",
      "register for the university library",
      "how do i register for the university library",
      "library registration",
      "library card banwane ke liye kya documents chahiye",
      "library documents",
      "photoshop shop",
      "chairman of the library"
    ],
    category: "Library & Student Services",
    actionLink: { label: "Campus Facilities 📚", url: "#facilities" },
    suggestions: ["Book Borrowing Rules 📚", "How many books can I borrow? 📖", "Campus Facilities 🔬"]
  },

  // 28c. BOOK BORROWING RULES & REGULATIONS
  {
    id: "library-borrowing-rules",
    question: "Book Borrowing Rules / Library Membership & Book Borrowing – UCP Bahawalpur",
    answer: "Library Membership & Book Borrowing – UCP Bahawalpur\n\nStudents can obtain their library card by following the library registration procedure.\n\nBook borrowing rules:\n• A maximum of two books can be borrowed at a time.\n• All borrowed books must be returned at the end of each semester.\n• Books must be returned in their original condition without damage.\n• Students are responsible for keeping borrowed books safe and maintaining their condition.\n\nImportant: Make sure to return all borrowed books before the semester ends.",
    keywords: [
      "book borrowing",
      "book borrowing rules",
      "library borrowing",
      "how many books can i borrow",
      "how many books can i borrow at once",
      "can i issue three books from the library",
      "do i have to return books after every semester",
      "when should i return my library books",
      "can i keep library books during semester breaks",
      "what happens if i damage a library book",
      "damage a library book",
      "library se aik waqt mein kitni books mil sakti hain",
      "semester khatam hone par books wapas karni hoti hain",
      "books wapas",
      "library rules",
      "borrow two books",
      "maximum of two books",
      "return all borrowed books"
    ],
    category: "Library & Student Services",
    actionLink: { label: "Campus Facilities 📚", url: "#facilities" },
    suggestions: ["How to Get Library Card 💳", "Campus Facilities 🔬", "Degree Programmes 🎓"]
  },

  // =========================================================================
  // 28d. ACADEMIC CALENDAR FALL 2026 KNOWLEDGE BASE (OCTOBER 2026 – MARCH 2027)
  // =========================================================================
  {
    id: "calendar-fall-2026-overview",
    question: "UCP Academic Calendar Fall 2026 / Important Dates, Midterms, Finals & Schedule",
    answer: "📅 **UCP Academic Calendar – Fall 2026 (October 2026 – March 2027)**\n\n• **Registration Period**: 22 October 2026 – 14 November 2026 (No registration after 14 Nov; un-registered students cannot attend classes)\n• **Commencement of Classes**: 16 November 2026 (Monday)\n• **Midterm Examinations**: 11 January 2027 – 16 January 2027 (Makeup exams NOT allowed)\n• **Course Withdrawal Deadline**: 20 February 2027 (Saturday)\n• **Last Day of Classes**: 13 March 2027 (Saturday)\n• **Final Examinations**: 15 March 2027 – 26 March 2027\n• **Submission of Results**: 29 March 2027 (Monday)\n• **Notification of Grades**: 31 March 2027 (Wednesday)\n• **Spring 2027 Registration**: 1 April 2027 – 10 April 2027\n• **Spring 2027 Classes Begin**: 12 April 2027 (Monday)\n\n*Attendance Rule*: Minimum 80% attendance is strictly compulsory.\nSource: Official Academic Calendar Fall-2026.",
    keywords: [
      "academic calendar",
      "calendar",
      "fall 2026 calendar",
      "semester calendar",
      "dates",
      "schedule",
      "fall 2026 schedule",
      "calendar fall 2026",
      "academic schedule",
      "calendar ucp",
      "ucp calendar",
      "what is the academic calendar",
      "academic calendar fall 2026"
    ],
    category: "Academic Calendar",
    actionLink: { label: "View Academic Calendar 📅", url: "#calendar" },
    suggestions: ["Midterms Schedule 📝", "Final Exams Schedule 📑", "Attendance Requirement 📋"]
  },

  {
    id: "calendar-semester-dates",
    question: "When does Fall 2026 semester begin, start of classes, and registration period?",
    answer: "📅 **Fall 2026 Semester Dates & Registration**:\n• **Classes Commence**: 16 November 2026 (Monday).\n• **Registration Period**: 22 October 2026 to 14 November 2026.\n• **Last Date for Registration**: 14 November 2026.\n• **Late Registration**: Registration after 14 November 2026 is strictly NOT allowed.\n• **Class Attendance**: Students without registration are not allowed to attend classes.\n• **Semester Period**: October 2026 to March 2027.\n\nSource: Academic Calendar Fall-2026, lines 4–7.",
    keywords: [
      "when does fall 2026 semester begin",
      "when do classes start",
      "fall 2026 classes start",
      "fall semester ki classes kab start hongi",
      "classes kab start hongi",
      "classes start date",
      "commence of classes",
      "fall 2026 registration",
      "registration start",
      "registration ki last date kya hai",
      "last date for registration",
      "late registration ho sakti hai",
      "can i register after 14 november",
      "attend classes without registration",
      "semester dates",
      "what is the fall 2026 semester period",
      "classes ka last day kab hai",
      "when is the last day of fall 2026 classes"
    ],
    category: "Academic Calendar",
    actionLink: { label: "View Academic Calendar 📅", url: "#calendar" },
    suggestions: ["Midterm Exams 📝", "Final Exams 📑", "Spring 2027 Registration 🌱"]
  },

  {
    id: "calendar-midterm-exams",
    question: "When will Fall 2026 midterm exams start and what is the schedule?",
    answer: "📝 **Fall 2026 Midterm Examinations**:\n• **Midterm Exam Period**: 11 January 2027 (Monday) to 16 January 2027 (Saturday).\n• **Examination Schedule**: 11–16 January 2027.\n• **Makeup Examinations**: Makeup examinations are strictly NOT allowed according to the official academic calendar. If you miss your midterm, contact your academic administration/department for clarification regarding your situation.\n\nSource: Academic Calendar Fall-2026, lines 9 and 37–38.",
    keywords: [
      "midterm exams",
      "midterm examination",
      "mids kab honge",
      "midterm dates",
      "when will midterm exams start",
      "when will midterm exams end",
      "when will fall 2026 midterm exams start",
      "what is the midterm examination schedule",
      "midterm schedule",
      "makeup exam",
      "makeup exams",
      "makeup exam de sakte hain",
      "can i take a makeup exam if i miss my midterm",
      "are makeup examinations allowed",
      "missed midterm",
      "makeup examinations",
      "mids dates",
      "mids"
    ],
    category: "Academic Calendar",
    actionLink: { label: "View Academic Calendar 📅", url: "#calendar" },
    suggestions: ["Final Exams Schedule 📑", "Attendance Policy 📋", "Results Announcement 📊"]
  },

  {
    id: "calendar-final-exams",
    question: "When will final examinations start and what is the final exam schedule?",
    answer: "📑 **Fall 2026 Final Examinations**:\n• **Final Exam Period**: 15 March 2027 (Monday) to 26 March 2027 (Friday).\n• **Examination Schedule**: 15–26 March 2027.\n• **Last Day of Classes**: 13 March 2027 (Saturday).\n• **Makeup Examinations**: Makeup examinations are strictly NOT allowed according to the official academic calendar. Contact the academic administration for clarification.\n\nSource: Academic Calendar Fall-2026, lines 14 and 37–38.",
    keywords: [
      "final examinations",
      "finals kis date se hain",
      "final exams start",
      "when will final examinations start",
      "when will final examinations end",
      "what is the final examination period",
      "finals dates",
      "aur finals",
      "finals kab hain",
      "makeup exam final",
      "can i take a makeup exam if i miss my final",
      "final exam schedule",
      "when does the final examination period finish"
    ],
    category: "Academic Calendar",
    actionLink: { label: "View Academic Calendar 📅", url: "#calendar" },
    suggestions: ["Results Date 📊", "Midterm Exams 📝", "Spring 2027 Registration 🌱"]
  },

  {
    id: "calendar-attendance",
    question: "What is the minimum attendance requirement and is 80% attendance compulsory?",
    answer: "📋 **Attendance Policy & Requirements**:\n• **Minimum Attendance Required**: Students must maintain at least 80% attendance throughout the semester.\n• **Is 80% Compulsory?**: Yes. A minimum of 80% attendance is strictly compulsory.\n• **Attendance Tracking**: Students are responsible for keeping track of their own attendance.\n• **Exam Eligibility**: The academic calendar specifies an 80% minimum attendance threshold. Contact your department administration for clarification about individual eligibility.\n\nSource: Academic Calendar Fall-2026, lines 33–35.",
    keywords: [
      "attendance requirement",
      "minimum attendance requirement",
      "attendance kitni honi chahiye",
      "80 percent attendance zaroori hai",
      "80% attendance",
      "is 80% attendance compulsory",
      "is attendance compulsory",
      "how much attendance should i maintain",
      "who is responsible for tracking attendance",
      "can i attend exams with less than 80% attendance",
      "attendance policy",
      "attendance rules",
      "attendance"
    ],
    category: "Academic Calendar",
    actionLink: { label: "View Academic Calendar 📅", url: "#calendar" },
    suggestions: ["Midterms Schedule 📝", "Course Withdrawal ⚠️", "Final Exams 📑"]
  },

  {
    id: "calendar-holidays",
    question: "What are the important holidays during Fall 2026 semester?",
    answer: "🏖️ **Official Holidays – Fall 2026 Semester**:\n• **Quaid-e-Azam Day**: 25 December 2026 (Friday)\n• **Kashmir Day**: 5 February 2027 (Friday)\n• **Eid Holidays**: 10–12 March 2027 (Wednesday–Friday - No classes)\n• **Pakistan Resolution Day**: 23 March 2027 (Tuesday)\n• **Government Holidays**: Gazetted holidays will be observed according to official government announcements.\n\nSource: Academic Calendar Fall-2026, lines 8–15 and 21.",
    keywords: [
      "holidays",
      "quaid-e-azam day",
      "when is quaid-e-azam day",
      "kashmir day",
      "when is kashmir day",
      "kashmir day ki chutti kab hai",
      "eid holidays",
      "when are eid holidays",
      "eid ki chuttiyan kab hain",
      "will there be classes during eid holidays",
      "pakistan resolution day",
      "when is pakistan resolution day",
      "are government holidays included in the academic calendar",
      "chuttiyan",
      "gazetted holidays"
    ],
    category: "Academic Calendar",
    actionLink: { label: "View Academic Calendar 📅", url: "#calendar" },
    suggestions: ["Semester Dates 📅", "Midterm Exams 📝", "Final Exams 📑"]
  },

  {
    id: "calendar-course-withdrawal",
    question: "When is the last date to withdraw a course in Fall 2026?",
    answer: "⚠️ **Course Withdrawal Deadline**:\n• **Last Date to Withdraw a Course**: 20 February 2027 (Saturday).\n• Please make sure to consult your academic advisor before withdrawing from any course.\n\nSource: Academic Calendar Fall-2026, line 11.",
    keywords: [
      "withdraw a course",
      "course withdrawal",
      "when is the last date to withdraw a course",
      "last date to withdraw a course",
      "course withdraw karne ki last date kya hai",
      "course drop",
      "withdraw deadline"
    ],
    category: "Academic Calendar",
    actionLink: { label: "View Academic Calendar 📅", url: "#calendar" },
    suggestions: ["Attendance Policy 📋", "Final Exams 📑", "Results Date 📊"]
  },

  {
    id: "calendar-results-grades",
    question: "When will Fall 2026 results and grades be announced?",
    answer: "📊 **Fall 2026 Results & Grade Notifications**:\n• **Last Day of Classes**: 13 March 2027 (Saturday)\n• **Final Examination Period Finishes**: 26 March 2027\n• **Submission of Results**: 29 March 2027 (Monday)\n• **Notification / Announcement of Grades**: 31 March 2027 (Wednesday)\n• **Students Receive Grades**: The official grade notification date is 31 March 2027.\n\nSource: Academic Calendar Fall-2026, lines 13–17.",
    keywords: [
      "result kab announce hoga",
      "grades kab upload honge",
      "when will fall 2026 results be submitted",
      "when will grades be announced",
      "when will students receive their grades",
      "grade notification date",
      "submission of results",
      "results announcement",
      "fall 2026 result",
      "grades"
    ],
    category: "Academic Calendar",
    actionLink: { label: "View Academic Calendar 📅", url: "#calendar" },
    suggestions: ["Spring 2027 Registration 🌱", "Final Exams Schedule 📑", "Academic Calendar 📅"]
  },

  {
    id: "calendar-spring-2027",
    question: "When does Spring 2027 semester begin and when is registration?",
    answer: "🌱 **Spring 2027 Semester Schedule**:\n• **Spring 2027 Registration**: 1 April 2027 to 10 April 2027.\n• **Registration Closes**: 10 April 2027.\n• **Spring 2027 Classes Commence**: 12 April 2027 (Monday).\n\nSource: Academic Calendar Fall-2026, lines 18–19.",
    keywords: [
      "spring 2027",
      "spring semester kab start hoga",
      "when does the spring 2027 semester begin",
      "when is spring 2027 registration",
      "when does spring 2027 registration close",
      "when do spring 2027 classes commence",
      "spring semester dates",
      "spring registration"
    ],
    category: "Academic Calendar",
    actionLink: { label: "View Academic Calendar 📅", url: "#calendar" },
    suggestions: ["Fall 2026 Results 📊", "Academic Calendar 📅", "Fee Structure 💰"]
  },

  {
    id: "calendar-working-days",
    question: "How many total days and teaching days are in the Fall 2026 semester schedule?",
    answer: "🗓️ **Fall 2026 Semester Working Schedule**:\n• **Total Days in Working Schedule**: 118 days\n• **Sundays Included**: 16 Sundays\n• **Holidays in Working Schedule**: 5 holidays\n• **Total Teaching Days**: 97 teaching days\n  - November 2026: 13 teaching days\n  - December 2026: 26 teaching days\n  - January 2027: 26 teaching days\n  - February 2027: 23 teaching days\n  - March 2027: 9 teaching days\n\nSource: Academic Calendar Fall-2026, Semester Working Table, lines 23–30.",
    keywords: [
      "working days",
      "teaching days",
      "semester mein kitne teaching days hain",
      "how many total days are included in the semester working schedule",
      "how many sundays are included",
      "how many holidays are listed in the working schedule",
      "how many total teaching days are there",
      "how many teaching days are in november",
      "how many teaching days are in december",
      "how many teaching days are in january",
      "how many teaching days are in february",
      "how many teaching days are in march",
      "semester working schedule"
    ],
    category: "Academic Calendar",
    actionLink: { label: "View Academic Calendar 📅", url: "#calendar" },
    suggestions: ["Semester Dates 📅", "Midterm Exams 📝", "Holidays 🏖️"]
  },

  {
    id: "calendar-university-instructions",
    question: "What are the university policies on campus trips, extracurriculars and makeup classes?",
    answer: "🏛️ **University Activities & Special Instructions**:\n• **Student Trips & Extracurriculars**: Student trips and extracurricular activities should NOT be arranged at the expense of scheduled classes. Scheduled teaching sessions must be completed.\n• **Missed Sessions**: If campus activities are arranged, the Campus Principal is responsible for completing the required sessions through makeup classes.\n• **Calendar Modifications**: The calendar states that there will be no change in the calendar for any individual campus.\n\nSource: Academic Calendar Fall-2026, lines 42–44.",
    keywords: [
      "can campuses arrange student trips during classes",
      "can extracurricular activities replace regular classes",
      "who is responsible for completing missed sessions",
      "can the academic calendar be changed for an individual campus",
      "student trips during classes",
      "extracurricular activities classes",
      "makeup classes principal",
      "university instructions calendar"
    ],
    category: "Academic Calendar",
    actionLink: { label: "View Academic Calendar 📅", url: "#calendar" },
    suggestions: ["Attendance Policy 📋", "Semester Dates 📅", "Campus Life 🎪"]
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
  'library card', 'library membership', 'membership form', 'borrow', 'borrowing', 'photoshop', 'photographs', 'books', 'book',
  'calendar', 'academic calendar', 'midterm', 'midterms', 'mids', 'final exam', 'final exams', 'finals', 'quaid-e-azam day', 'kashmir day', 'eid holidays', 'pakistan resolution day', 'resolution day', 'attendance', '80%', '80 percent', 'spring 2027', 'course withdraw', 'withdraw a course', 'teaching days', 'working days', 'semester dates',
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

  // 1. SPECIFIC CHECK: Developer / Creator / Representative
  // Official representative
  if (/official (ucp )?representative|an official representative|official representative|are you (an? )?official|are you officially|are you a (real )?human|are you a (real )?person|are you human|real human|real person/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "official-representative");
    if (item) return { match: item, confidence: 100 };
  }

  // Who made this chatbot?
  if (/who (made|developed|created|built|coded|designed) (this |the )?(chatbot|chat bot|bot)|(chatbot|chat bot|bot) (developer|creator|maker)|who is the (developer|creator) of (this |the )?(chatbot|chat bot|bot)/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "who-made-chatbot");
    if (item) return { match: item, confidence: 100 };
  }

  // Who developed this website?
  if (/who (developed|designed|built|made|created|coded) (this |the )?website|who (developed|designed|built|made|created|coded) this site|developer of (this |the )?website|website developer|website creator|founder of (this |the )?website|who founded this website/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "website-developer");
    if (item) return { match: item, confidence: 100 };
  }

  // Who is your developer?
  if (/who is (your|the) developer|who (is|are) your developers|your developer|who developed you|my developer|developer name/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "who-is-your-developer");
    if (item) return { match: item, confidence: 100 };
  }

  // Who created you?
  if (/who (created|made|built|designed|coded|invented) you|who is your (creator|maker|founder)/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "who-created-you");
    if (item) return { match: item, confidence: 100 };
  }

  const isDeveloperQuery = /who (made|developed|created|built|coded|designed) (you|this website|the website|website)|who is (your|the) (developer|creator|maker|founder)|developer of (this )?website|website developer|founder of (this )?website|who founded this website/i.test(cleanQuery);
  if (isDeveloperQuery) {
    const devItem = UCP_KNOWLEDGE_BASE.find(item => item.id === "who-is-your-developer" || item.id === "website-developer");
    if (devItem) return { match: devItem, confidence: 100 };
  }

  // Check Library Card / Membership procedure
  const isLibraryCardQuery = /library card|membership form|library member|library registration|library form|card kahan se banega|card banwane|photographs.*library|documents.*library card|library card form/i.test(cleanQuery);
  if (isLibraryCardQuery) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "library-card-procedure");
    if (item) return { match: item, confidence: 100 };
  }

  // Check Library Book Borrowing rules
  const isLibraryBorrowQuery = (/borrow|borrowing|how many books|issue.*books|return.*books|books.*return|damage.*book|kitni books|books wapas/i.test(cleanQuery) && (cleanQuery.includes('library') || cleanQuery.includes('book') || cleanQuery.includes('semester'))) ||
    /library.*rules|rules.*library/i.test(cleanQuery);
  if (isLibraryBorrowQuery) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "library-borrowing-rules");
    if (item) return { match: item, confidence: 100 };
  }

  // =========================================================================
  // ACADEMIC CALENDAR FALL 2026 DIRECT MATCHER (English, Urdu & Roman Urdu)
  // =========================================================================

  // 1. Midterm exams & makeup midterms
  if (/(midterm|mid-term|mids kab|mid exam|mids dates|mids honge|when will.*midterm|midterm examination|makeup exam|makeup examinations|miss.*midterm)/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "calendar-midterm-exams");
    if (item) return { match: item, confidence: 100 };
  }

  // 2. Final exams & exam period
  if (/(final exam|final exams|finals kis date|finals kab|aur finals|final schedule|when will final|final examination period|when will final examinations start|when will final examinations end|makeup exam.*final|miss my final)/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "calendar-final-exams");
    if (item) return { match: item, confidence: 100 };
  }

  // 3. Attendance policy & 80% rule
  if (/(attendance|80 percent attendance|80% attendance|attendance kitni|attendance compulsory|minimum attendance|tracking attendance|attendance requirement|80 percent attendance zaroori hai)/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "calendar-attendance");
    if (item) return { match: item, confidence: 100 };
  }

  // 4. Results & grade announcement
  if (/(result kab|grades kab|grades upload|results announced|grade notification|grade.*notif|when will.*grades|submission of results|receive.*grades|when will.*results|result announcement|grades be notified)/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "calendar-results-grades");
    if (item) return { match: item, confidence: 100 };
  }

  // 5. Holidays (Eid, Kashmir Day, Quaid-e-Azam Day, Pakistan Day, Public/Gazetted Holidays)
  if (/(holiday|holidays|public holiday|gazetted holiday|eid ki chutti|kashmir day|quaid-e-azam day|eid holidays|resolution day|pakistan resolution day|chuttiyan|kashmir day ki chutti|when are eid holidays|classes during eid|chutti kab hai)/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "calendar-holidays");
    if (item) return { match: item, confidence: 100 };
  }

  // 6. Course withdrawal deadline
  if (/(course withdraw|withdraw a course|course drop|withdraw karne ki last date|last date to withdraw a course|last date.*withdraw|withdraw.*deadline)/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "calendar-course-withdrawal");
    if (item) return { match: item, confidence: 100 };
  }

  // 7. Spring 2027 semester & registration
  if (/(spring 2027|spring semester kab|spring semester start|spring 2027 registration|spring 2027 classes|when is spring 2027)/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "calendar-spring-2027");
    if (item) return { match: item, confidence: 100 };
  }

  // 8. Teaching & working days count
  if (/(teaching days|working days|working schedule|kitne teaching days|how many sundays|total days.*working schedule|teaching days are in|how many total working days)/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "calendar-working-days");
    if (item) return { match: item, confidence: 100 };
  }

  // 9. University activities, student trips & makeup classes
  if (/(student trips|trips during classes|extracurricular.*classes|makeup classes.*principal|calendar be changed for an individual campus|student tours)/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "calendar-university-instructions");
    if (item) return { match: item, confidence: 100 };
  }

  // 10. Semester dates, commencement of classes & registration
  if (/(classes.*start|classes.*commence|start.*classes|semester period|register after 14 november|registration.*last date|last date.*registration|registration start|late registration|attend classes without registration|classes ka last day|last day of.*classes|semester begin|fall 2026 semester begin|when does.*semester)/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "calendar-semester-dates");
    if (item) return { match: item, confidence: 100 };
  }

  // 11. General academic calendar overview
  if (/(academic calendar|ucp calendar|fall 2026 calendar|semester calendar|fall calendar)/i.test(cleanQuery)) {
    const item = UCP_KNOWLEDGE_BASE.find(i => i.id === "calendar-fall-2026-overview");
    if (item) return { match: item, confidence: 100 };
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
