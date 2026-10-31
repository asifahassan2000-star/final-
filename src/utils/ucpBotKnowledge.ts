/**
 * UCP Assistant Intelligent Knowledge Engine
 * Connects directly to ucp-knowledge.js for fast offline keyword-based answers,
 * maintaining a friendly, senior-student tone with short 2-3 line answers.
 */

// @ts-ignore
import { UCP_KNOWLEDGE_BASE, searchUcpKnowledge } from '../../ucp-knowledge.js';

export interface KnowledgeItem {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  category: string;
  actionLink?: { label: string; url: string };
  suggestions?: string[];
  isAdmissionRelated?: boolean;
  isDeveloperRelated?: boolean;
}

export { UCP_KNOWLEDGE_BASE, searchUcpKnowledge };

export interface BotResponse {
  reply: string;
  suggestions?: string[];
  actionLink?: { label: string; url: string };
  isOfflineMatch?: boolean;
}

/**
 * Dedicated instant answers for Quick Action buttons (0ms instant resolution)
 */
export const QUICK_ACTION_RESPONSES: Record<string, BotResponse> = {
  fee: {
    reply: "💰 **UCP Bahawalpur Fee Structure & Installments**:\n• **Tuition**: Rs. 4,100 to Rs. 6,800 per credit hour depending on your degree programme.\n• **Admission Fee**: Rs. 9,000 (one-time) | **Registration**: Rs. 2,500.\n• **Semester Average**: ~Rs. 75,000 to Rs. 98,000 for standard 15–18 credit hours.\n• **Installment Plan**: Easy 3-part monthly installments available per semester to assist families! ✨",
    actionLink: { label: "Calculate Fee & Details 💰", url: "#fee-structure" },
    suggestions: ["Scholarships 🏆", "Open Admission Form 📝", "Degree Programmes 🎓"],
    isOfflineMatch: true
  },
  admissions: {
    reply: "📝 **UCP Bahawalpur Admissions Process**:\nAdmissions are currently **OPEN**! The process is fast & simple:\n1. Register online on the official UCP portal.\n2. Submit Matric/Inter marks & upload required documents.\n3. Verify your eligibility and deposit the admission voucher.\n\nWould you like me to open admission form?",
    actionLink: { label: "Open Admission Portal 🚀", url: "https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F" },
    suggestions: ["Eligibility Criteria 📋", "Fee Structure 💰", "View Scholarships 🏆"],
    isOfflineMatch: true
  },
  faculty: {
    reply: "👨‍🏫 **Distinguished Faculty at UCP Bahawalpur**:\nOur faculty consists of experienced PhDs, MPhil researchers, and industry specialists across Computing & AI, Business & Economics, Natural Sciences, and Humanities. They are committed to modern practical projects, interactive mentorship, and personalized academic guidance!",
    actionLink: { label: "Meet the Faculty 👥", url: "#faculty" },
    suggestions: ["Degree Programmes 🎓", "Leadership 🏛️", "Eligibility 📋"],
    isOfflineMatch: true
  },
  leadership: {
    reply: "🏛️ **Campus Leadership & Administration**:\n• **Founder & Chairman**: Mian Amer Mahmood (Punjab Group of Colleges)\n• **Director PGC & UCP Cluster**: Prof. Hamid Iqbal\n• **Principal UCP Bahawalpur**: Dr. Aurangzaib Virk (PhD Strategic Management)\n• **Executive Director**: Prof. Sohail Afzal\nOur visionary leaders are committed to elevating higher education standards across South Punjab!",
    actionLink: { label: "View Campus Leadership 👔", url: "#leadership" },
    suggestions: ["Principal Message 🎓", "Faculty Details 👨‍🏫", "Admissions 📝"],
    isOfflineMatch: true
  },
  programmes: {
    reply: "🎓 **Degree Programmes at UCP Bahawalpur**:\n• **Computing & IT**: BS Computer Science, ADP Artificial Intelligence (75 CH), ADP Software Engineering, ADP Cyber Security, ADP Data Science.\n• **Business**: BBA (Honors), BS Business Analytics, BS Accounting & Finance.\n• **Life & Natural Sciences**: BS Biotechnology, BS Biochemistry, BS Chemistry, BS Physics, BS Mathematics, BS Zoology, ADS Pre-Medical.\n• **Humanities**: BS English, BS Psychology.",
    actionLink: { label: "Explore All Programmes 📚", url: "#programmes" },
    suggestions: ["ADP AI 🤖", "Fee Structure 💰", "Eligibility Criteria 📋"],
    isOfflineMatch: true
  },
  scholarship: {
    reply: "🏆 **Scholarships & Financial Aid**:\n• **Merit Scholarships**: Up to **50% tuition waiver** based on Intermediate marks!\n• **PGC Alumni Concession**: **25% discount** for Punjab College graduates.\n• **Kinship Discount**: **25% concession** for real siblings enrolled simultaneously.\n• **Need-Based Aid & Sports Quota**: Available upon application to the financial committee.",
    actionLink: { label: "View Scholarship Details 🏆", url: "#scholarships" },
    suggestions: ["View Fee 💰", "Eligibility Criteria 📋", "Open Admission Form 📝"],
    isOfflineMatch: true
  },
  scope: {
    reply: "📈 **Career Scope of All Programmes**:\n• **Computing & AI (BSCS, ADP AI, SE, Cyber)**: High industry demand in AI engineering, cloud computing, cybersecurity defense, and remote global freelancing.\n• **Business & Analytics (BBA, FinTech)**: Leadership tracks in corporate banking, multinational finance, market research, and startup ventures.\n• **Sciences (Biotech, Chemistry, Physics)**: Rapidly expanding roles in pharma R&D, clinical laboratories, quality assurance, and foreign postgraduate scholarships.\n• **Humanities (Psychology, English)**: Rewarding careers in clinical counseling, corporate HR, digital strategy, and civil services (CSS/PMS)!",
    actionLink: { label: "Explore Degree Catalog 🚀", url: "#programmes" },
    suggestions: ["Degree Programmes 🎓", "ADP AI 🤖", "Open Admission Form 📝"],
    isOfflineMatch: true
  },
  eligibility: {
    reply: "📋 **Admission Eligibility Criteria**:\n• **Minimum Requirement**: 50% marks in Intermediate (HSSC / 12th grade) or equivalent A-Levels / DAE.\n• **Computing & AI (BSCS, ADP AI)**: FSc Pre-Engineering, ICS, General Science, or FSc Pre-Medical (with math deficiency course).\n• **Business & Management (BBA, BS A&F)**: FA, FSc, I.Com, ICS (all groups eligible with min 50%).\n• **Life Sciences**: FSc Pre-Medical or relevant science background (min 50%).",
    actionLink: { label: "Apply for Admission 🚀", url: "https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F" },
    suggestions: ["Fee Structure 💰", "Scholarships 🏆", "Degree Programmes 🎓"],
    isOfflineMatch: true
  },
  legacy: {
    reply: "⭐ **Legacy of UCP & Punjab Group of Colleges**:\nUCP Bahawalpur is a constituent campus of the University of Central Punjab and the prestigious Punjab Group of Colleges (PGC) network — Pakistan's largest educational family since 1985. With over 2,000,000 proud alumni leading across the globe, we bring world-class academic heritage to Bahawalpur!",
    actionLink: { label: "Explore Our Legacy 🏛️", url: "#legacy" },
    suggestions: ["Leadership 🏛️", "Degree Programmes 🎓", "Admissions 📝"],
    isOfflineMatch: true
  },
  'adp-ai': {
    reply: "🤖 **ADP Artificial Intelligence (2 Years / 75 Credit Hours)**:\n• **Focus**: Hands-on Python programming, Machine Learning, Neural Networks, Computer Vision, and Natural Language Processing.\n• **Progression**: Smooth direct lateral transfer into the 5th semester of BS Computer Science or AI.\n• **Career Paths**: Junior AI Engineer, Machine Learning Associate, Data Specialist, Automation Developer.",
    actionLink: { label: "View ADP AI Curriculum 🤖", url: "#programmes?category=Computing%20%26%20Technology&program=adp-artificial-intelligence" },
    suggestions: ["Fee Structure 💰", "Eligibility Criteria 📋", "Open Admission Form 📝"],
    isOfflineMatch: true
  },
  facilities: {
    reply: "🔬 **Campus Facilities & Infrastructure**:\n• **Computing Labs**: Advanced GPU-powered computer labs equipped for AI and software development.\n• **Research Labs**: State-of-the-art physics, chemistry, and biotechnology facilities.\n• **Digital Library**: Comprehensive digital collection with access to international journals.\n• **Transport**: Dedicated fleet of air-conditioned buses covering all Bahawalpur routes.\n• **Student Life**: Cafeteria, sports grounds, and round-the-clock secure campus!",
    actionLink: { label: "Explore Campus Facilities 🚌", url: "#facilities" },
    suggestions: ["Degree Programmes 🎓", "Admissions 📝", "Contact Helpline 📞"],
    isOfflineMatch: true
  }
};

/**
 * Developer, Creator & Official Representative Attribution matcher.
 * Provides refined, precise responses based on the specific question asked.
 */
export function getAttributionResponse(userQuery: string): BotResponse | null {
  const q = (userQuery || '').toLowerCase().trim();
  const cleanQ = q.replace(/[?!.,;:()'"]/g, '').trim();

  // 5. Are you an official UCP representative?
  const isOfficialQuery = /official (ucp )?representative|an official representative|official representative|are you (an? )?official|are you officially|are you a (real )?human|are you a (real )?person|are you human|real human|real person/i.test(cleanQ);
  if (isOfficialQuery) {
    return {
      reply: "I’m an AI assistant for the UCP Bahawalpur Campus website. I provide information to help visitors, but I’m not a human university representative.",
      suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Admissions 📝"],
      isOfflineMatch: true
    };
  }

  // 4. Who made this chatbot?
  const isChatbotQuery = /who (made|developed|created|built|coded|designed) (this |the )?(chatbot|chat bot|bot)|(chatbot|chat bot|bot) (developer|creator|maker)|who is the (developer|creator) of (this |the )?(chatbot|chat bot|bot)/i.test(cleanQ);
  if (isChatbotQuery) {
    return {
      reply: "This AI chatbot was created by Asifa to provide helpful information and assistance to UCP Bahawalpur visitors.",
      suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Admissions 📝"],
      isOfflineMatch: true
    };
  }

  // 1. Who developed this website?
  const isWebsiteQuery = /who (developed|designed|built|made|created|coded) (this |the )?website|who (developed|designed|built|made|created|coded) this site|developer of (this |the )?website|website developer|website creator|founder of (this |the )?website|who founded this website/i.test(cleanQ);
  if (isWebsiteQuery) {
    return {
      reply: "This website was designed and developed by Asifa, an AI student at UCP Bahawalpur.",
      suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Admissions 📝"],
      isOfflineMatch: true
    };
  }

  // 3. Who is your developer?
  const isYourDevQuery = /who is (your|the) developer|who (is|are) your developers|your developer|who developed you|my developer|developer name/i.test(cleanQ);
  if (isYourDevQuery) {
    return {
      reply: "My developer is Asifa, an AI student at UCP Bahawalpur.",
      suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Admissions 📝"],
      isOfflineMatch: true
    };
  }

  // 2. Who created you?
  const isWhoCreatedYou = /who (created|made|built|designed|coded|invented) you|who is your (creator|maker|founder)/i.test(cleanQ);
  if (isWhoCreatedYou) {
    return {
      reply: "I’m the UCP Bahawalpur AI Assistant, developed by Asifa to help visitors access campus information quickly and easily.",
      suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Admissions 📝"],
      isOfflineMatch: true
    };
  }

  // Generic fallback if someone asks a related developer question
  const isGenericDev = /who (made|developed|created|built|coded|designed) (you|this)|(your|the) developer/i.test(cleanQ);
  if (isGenericDev) {
    return {
      reply: "My developer is Asifa, an AI student at UCP Bahawalpur.",
      suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Admissions 📝"],
      isOfflineMatch: true
    };
  }

  return null;
}

/**
 * Searches the offline trained UCP Knowledge Base.
 * Returns a short, friendly response in senior-student style.
 */
export function getInstantBotResponse(userQuery: string): BotResponse {
  const q = (userQuery || '').toLowerCase().trim();

  // 1. Check Developer / Builder / Representative queries specifically
  const attribution = getAttributionResponse(userQuery);
  if (attribution) {
    return attribution;
  }

  // 2. Direct Quick Action lookup by key or key terms
  if (q.includes('fee') || q === 'view fee') return QUICK_ACTION_RESPONSES.fee;
  if (q.includes('scholarship') || q.includes('concession')) return QUICK_ACTION_RESPONSES.scholarship;
  if (q.includes('faculty') || q.includes('professor') || q.includes('teacher')) return QUICK_ACTION_RESPONSES.faculty;
  if (q.includes('leadership') || q.includes('principal') || q.includes('director')) return QUICK_ACTION_RESPONSES.leadership;
  if (q.includes('scope') || q.includes('career scope')) return QUICK_ACTION_RESPONSES.scope;
  if (q.includes('legacy') || q.includes('heritage') || q.includes('history of ucp')) return QUICK_ACTION_RESPONSES.legacy;
  if (q.includes('adp ai') || q.includes('artificial intelligence')) return QUICK_ACTION_RESPONSES['adp-ai'];
  if (q.includes('facilities') || q.includes('facility') || q.includes('bus') || q.includes('transport') || q.includes('lab')) return QUICK_ACTION_RESPONSES.facilities;
  if (q.includes('eligibility') || q.includes('criteria') || q.includes('requirement')) return QUICK_ACTION_RESPONSES.eligibility;
  if (q.includes('program') || q.includes('degree') || q.includes('courses')) return QUICK_ACTION_RESPONSES.programmes;
  if (q.includes('admission') || q.includes('apply')) return QUICK_ACTION_RESPONSES.admissions;

  // 3. Search through trained knowledge base
  const { match, confidence } = searchUcpKnowledge(q);

  if (match && confidence >= 20) {
    let reply = match.answer;

    if (match.isAdmissionRelated && !reply.includes("open admission form")) {
      reply += "\n\nWould you like me to open admission form?";
    }

    return {
      reply,
      suggestions: match.suggestions || ["Degree Programmes 🎓", "Fee Structure 💰", "Open Admission Form 📝"],
      actionLink: match.actionLink,
      isOfflineMatch: true
    };
  }

  // 4. Fallback for greetings if query was very short
  if (/^(hi|hello|hey|salam|aoa|hola)/i.test(q)) {
    return {
      reply: "Hello! I am UCP Assistant, your official guide for UCP Bahawalpur. How can I help you today?",
      suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Scholarships 🏆", "Admissions 📝"],
      isOfflineMatch: false
    };
  }

  // 5. Direct friendly response without mentioning sources or offline knowledge
  return {
    reply: "How can I help you? Feel free to ask about degree programmes (BS Computer Science, ADP Artificial Intelligence, BBA, Sciences), fee structure, merit scholarships, or admissions at UCP Bahawalpur.",
    suggestions: [
      "BS Computer Science 💻",
      "ADP Artificial Intelligence 🤖",
      "Fee & Scholarships 💰",
      "Open Admission Form 📝"
    ],
    actionLink: { label: "Explore Programmes 🎓", url: "#programmes" },
    isOfflineMatch: false
  };
}
