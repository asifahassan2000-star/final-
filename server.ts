import express from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BotResponse {
  reply: string;
  suggestions?: string[];
  actionLink?: { label: string; url: string };
}

function getInstantBotResponse(userQuery: string): BotResponse {
  const q = (userQuery || '').toLowerCase().trim();

  // 1. Greetings & Friendly Small Talk
  if (/^(hi|hello|hey|salam|assalam|aoa|greetings|hola|subha bakhair|good morning|good evening|good afternoon)/i.test(q)) {
    return {
      reply: "👋 Hello and welcome to UCP Bahawalpur! I'm **UCP Assistant** 🎓.\n\nHow can I help your academic journey today? Feel free to ask about our degree programmes, fee structure, scholarships up to 100%, admissions, or campus facilities!",
      suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Scholarships 🏆", "How to Apply 📝"]
    };
  }

  // 2. Bot Identity & Capabilities
  if (/who are you|what is your name|your name|ucp bot|ucp assistant|what can you do|about you/i.test(q)) {
    return {
      reply: "🤖 I'm **UCP Assistant**, your official 24/7 smart guide for the **University of Central Punjab (UCP) Bahawalpur Campus**! I can provide verified details on all degree programmes, fee structures, admissions eligibility, scholarships, and campus facilities ✨.",
      suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Helpline Numbers 📞"]
    };
  }

  // 3. How are you / Pleasantries
  if (/how are you|how do you do|kese ho|kaise ho/i.test(q)) {
    return {
      reply: "😊 I'm doing great, thank you for asking! Ready to guide you through everything at UCP Bahawalpur. What would you like to explore today?",
      suggestions: ["Degree Programmes 🎓", "Admissions 📝", "Fee Details 💰"]
    };
  }

  // 4. Artificial Intelligence / ADP AI / BS AI
  if (/artificial intelligence|\bai\b|adp ai|adp artificial/i.test(q)) {
    return {
      reply: "🤖 **ADP Artificial Intelligence** is a flagship 2-year associate degree program (4 semesters, **75 Total Credit Hours**)!\n\n• **Core Areas**: Machine learning, algorithmic problem solving, Python programming, neural networks, computer vision, and intelligent firmware.\n• **Pathway**: Direct progression route into 4-year BS AI / BS Computer Science degrees 🚀.",
      suggestions: ["ADP AI Subjects 📚", "Computing Fee 💵", "Eligibility Criteria 📋", "Apply Online 📝"],
      actionLink: { label: "View ADP AI Curriculum", url: "#academics" }
    };
  }

  // 5. Computer Science & Computing Faculty
  if (/computer science|\bcs\b|bs cs|adp cs|software engineering|\bse\b|cyber security|data science|computing|it\b|information technology/i.test(q)) {
    return {
      reply: "💻 **Faculty of Information Technology at UCP Bahawalpur**:\n\n• **BS Computer Science** (4 Years, 132 CH)\n• **ADP Computer Science** (2 Years, 75 CH)\n• **ADP Software Engineering** (2 Years, 74 CH)\n• **ADP Cyber Security** (2 Years, 75 CH)\n• **ADP Data Science** (2 Years, 78 CH)\n• **ADP Artificial Intelligence** (2 Years, 75 CH)\n\nEquipped with cutting-edge software & AI development GPU labs ⚡!",
      suggestions: ["BS CS Details 💻", "ADP CS Details 🖥️", "Computing Fee 💰", "Eligibility Criteria 📋"],
      actionLink: { label: "Explore Computing Faculty", url: "#academics" }
    };
  }

  // 6. Business & Management / BBA / Accounting / Finance / Analytics
  if (/bba|business administration|accounting|finance|analytics|business analytics|commerce|marketing/i.test(q)) {
    return {
      reply: "📊 **Faculty of Management Studies at UCP Bahawalpur**:\n\n• **BBA (Honors)** (4 Years, 132 CH)\n• **BS Business Analytics** (4 Years, 133 CH)\n• **BS Accounting & Finance** (4 Years, 126 CH)\n• **ADP Business Administration** (2 Years, 66 CH)\n• **ADP Accounting & Finance** (2 Years, 66 CH)\n• **ADP Business Analytics** (2 Years, 64 CH)\n\nDesigned with corporate case studies and direct corporate internship linkages 📈!",
      suggestions: ["BBA Roadmap 📊", "BS Analytics 📉", "Business Fee 💳", "Apply Now 🚀"],
      actionLink: { label: "View Business Programs", url: "#academics" }
    };
  }

  // 7. Natural Sciences & Bio (Biotech, Biochem, Chemistry, Physics, Math, Zoology, ADS)
  if (/biotechnology|biochem|biochemistry|biology|zoology|chemistry|physics|math|mathematics|botany|\bads\b|pre-medical|pre medical/i.test(q)) {
    return {
      reply: "🔬 **Faculty of Science & Technology at UCP Bahawalpur**:\n\n• **BS Biotechnology** (128 CH) & **BS Biochemistry** (128 CH)\n• **BS Chemistry** (128 CH), **BS Physics** (127 CH), **BS Mathematics** (126 CH), **BS Zoology** (126 CH)\n• **ADS Zoology, Botany & Chemistry** (71 CH)\n• **ADS Double Maths & Physics** (70 CH)\n• **ADP Biotech & Biochem** (70 CH each)\n\nFeaturing advanced research laboratories, laminar flow units, and spectrophotometry facilities 🧬!",
      suggestions: ["BS Biotechnology 🧬", "ADS Pre-Medical 🧪", "Science Fees 💰", "Apply Now 📝"],
      actionLink: { label: "Explore Science Faculty", url: "#academics" }
    };
  }

  // 8. Humanities / English / Psychology
  if (/english|psychology|humanities|social sciences/i.test(q)) {
    return {
      reply: "📚 **Faculty of Humanities & Social Sciences**:\n\n• **BS English Language & Literature** (132 CH)\n• **BS Psychology** (132 CH) with psychological assessment laboratory\n• **ADP English** (66 CH)\n• **ADP Psychology** (63 CH)\n\nHigh-demand pathways in clinical counseling, digital media, corporate communications, and teaching 🌟!",
      suggestions: ["BS Psychology 🧠", "BS English 📖", "Fee Details 💵"]
    };
  }

  // 9. All Programs List (CRITICAL: NEVER mention numbers like 27 or 25)
  if (/all programs|all courses|which programs|list of programs|degrees offered|what programs|what degrees|programmes|degree programs/i.test(q)) {
    return {
      reply: "🎓 **Degree Programmes Offered at UCP Bahawalpur**:\n\n• **Undergraduate Bachelors (4-Yr)**:\n  BBA, BS Computer Science, BS Business Analytics, BS Accounting & Finance, BS English, BS Psychology, BS Mathematics, BS Physics, BS Chemistry, BS Biochemistry, BS Biotechnology, BS Zoology.\n\n• **Associate Degree Programmes (2-Yr)**:\n  ADP Artificial Intelligence, ADP Computer Science, ADP Software Engineering, ADP Cyber Security, ADP Data Science, ADP Business Administration, ADP Accounting & Finance, ADP Business Analytics, ADP Psychology, ADP English, ADP Biotechnology, ADP Biochemistry, ADS Botany/Chemistry/Zoology, ADS Double Maths & Physics 🏛️!",
      suggestions: ["ADP Degrees 📜", "BS Degrees 🎓", "Fee Structure 💰", "Apply Now 🚀"],
      actionLink: { label: "Browse All Programmes", url: "#academics" }
    };
  }

  // 10. Fee Structure / Fees / Cost / Price / Installment
  if (/fee|fees|cost|tuition|charges|dues|price|expensive|installment|per credit/i.test(q)) {
    return {
      reply: "💰 **Fee Structure Highlights at UCP Bahawalpur**:\n\n• **Admission Fee**: Rs. 9,000 (one-time upon enrollment)\n• **Registration Fee**: Rs. 2,500 (one-time)\n• **Tuition per Credit Hour**: Rs. 4,100 to Rs. 6,800 (program dependent)\n• **Associate Degrees (2-Yr)**: Approx. Rs. 2.8 Lakh to Rs. 5.4 Lakh total\n• **Bachelors (4-Yr)**: Approx. Rs. 6.4 Lakh to Rs. 8.8 Lakh total\n• **Installment Plan**: Fee can be paid in convenient semester installments ✨\n\n*Generous merit and PGC alumni fee concessions significantly reduce your actual payable fee!*",
      suggestions: ["Check Scholarships 🏆", "PGC Discount 🎓", "Calculate Fee 🧮"],
      actionLink: { label: "Official Fee Breakdown", url: "#fee-structure" }
    };
  }

  // 11. Scholarships & Financial Aid
  if (/scholarship|concession|discount|financial aid|kinship|pgc student|merit|free education/i.test(q)) {
    return {
      reply: "🏆 **Scholarships & Fee Concessions at UCP Bahawalpur**:\n\n• **Merit Scholarships**: Up to 100% tuition waiver awarded based on intermediate marks!\n• **PGC Alumni Concession**: 25% to 50% tuition waiver for students from Punjab Group of Colleges 🎓\n• **Kinship Concession**: 25% waiver for real siblings concurrently enrolled\n• **Sports & Co-Curricular**: Full tuition waivers for national/provincial athletes\n• **Need-Based Aid**: Dedicated financial assistance through the campus Student Aid Committee ✨!",
      suggestions: ["Eligibility for 100% 🏅", "PGC Discount 🎒", "Apply for Admission 📝"],
      actionLink: { label: "View Scholarships Details", url: "#scholarships" }
    };
  }

  // 12. Admission / Eligibility / Requirements / How to apply
  if (/admission|apply|eligibility|criteria|requirement|last date|deadline|how to apply|documents/i.test(q)) {
    return {
      reply: "📝 **Admissions are Open for UCP Bahawalpur!**\n\n• **Eligibility**: Minimum 50% marks in Intermediate (HSSC, FSC, ICS, FA, ICOM, A-Levels) or equivalent.\n• **Required Documents**: Matric & Inter result cards, CNIC or B-Form, and passport photographs.\n• **How to Apply**: Click 'Apply Now' to submit online, or visit the Admissions Office on Airport Road, Bahawalpur 🏛️!",
      suggestions: ["Online Apply Form 🚀", "Helpline Numbers 📞", "Fee Structure 💰"],
      actionLink: { label: "Launch Online Application", url: "#admissions" }
    };
  }

  // 13. Location / Address / Campus
  if (/location|address|where is|map|situated|campus address|directions|city/i.test(q)) {
    return {
      reply: "📍 **UCP Bahawalpur Campus Location**:\nConstituent College, UCP Campus, Airport Road, Bahawalpur, Punjab, Pakistan.\n\n• Dedicated air-conditioned transport shuttles connect Bahawalpur City, Satellite Town, Model Town, Cantt, and neighboring districts 🚌!",
      suggestions: ["Transport Routes 🚍", "Contact Helpline 📞", "Apply Now 📝"]
    };
  }

  // 14. Contact numbers / Phone / WhatsApp / Email / Helpline
  if (/contact|phone|number|mobile|telephone|call|email|whatsapp|helpline|support/i.test(q)) {
    return {
      reply: "📞 **Official UCP Bahawalpur Contact Channels**:\n\n• **Campus Phone**: 062-2202030 / 062-2202050\n• **Helpline**: 0800-00827 (Toll-Free)\n• **Email**: info@ucp.edu.pk\n• **Campus Location**: Airport Road, Bahawalpur\n• **Office Hours**: Monday to Friday, 9:00 AM – 5:00 PM ⏰!",
      suggestions: ["Admissions Office 🏫", "Degree Roadmaps 📚", "Fee Breakdown 💰"]
    };
  }

  // 15. Facilities / Labs / Library / Transport / Hostel
  if (/facilities|lab|labs|library|transport|bus|hostel|cafeteria|sports|ground/i.test(q)) {
    return {
      reply: "🏛️ **Campus Facilities at UCP Bahawalpur**:\n\n• **Computing & GPU AI Labs**: Modern workstations with high-speed development toolchains\n• **Science Laboratories**: Specialized Biotech, Chemistry, Physics, and Zoology labs\n• **Digital Library**: Complete access to HEC digital database & international research repositories\n• **Transport System**: University buses covering all major zones across Bahawalpur\n• **Sports & Student Life**: Multi-sports grounds, active student societies, and dining cafeteria ⚽!",
      suggestions: ["Explore Campus Life 🌿", "Admissions Help 📝", "Contact Office 📞"]
    };
  }

  // 16. Leadership & Affiliation
  if (/leader|leadership|chairman|rector|director|mian amir|aurangzaib|hamid iqbal|principal|owner/i.test(q)) {
    return {
      reply: "👔 **Executive Leadership at UCP Bahawalpur**:\n\n• **Prof. Hamid Iqbal**: Director, UCP Bahawalpur Campus\n• **Prof. Dr. Aurangzaib Virk**: Head / Principal, UCP Bahawalpur Campus\n• **Mian Amir Mahmood**: Founder, University of Central Punjab & Punjab Group of Colleges (PGC)\n\nDedicated to academic integrity, world-class curricula, and student empowerment 🌟!",
      suggestions: ["Campus Mission 🎯", "Browse Degrees 🎓", "Admissions 📝"]
    };
  }

  // 17. Continuation from ADP to BS
  if (/after adp|adp to bs|transition|progression|lateral entry|credit transfer/i.test(q)) {
    return {
      reply: "🔄 **Progression from ADP to BS**:\n\nYes! After completing your 2-year Associate Degree (ADP), you can smoothly transition into the 5th semester of the corresponding 4-year BS degree (e.g., from ADP AI or ADP CS into BS Computer Science) subject to academic eligibility and HEC guidelines 🎓!",
      suggestions: ["ADP Degrees 📜", "BS Degrees 💻", "Eligibility Criteria 📋"]
    };
  }

  // 18. Default Conversational Engine (Rich, Friendly, Helpful, Concise)
  return {
    reply: `💡 I'm here to assist with everything regarding **UCP Bahawalpur**! You can ask me about:\n\n• Degree programmes in Computing, Business, Natural Sciences, or Humanities\n• Tuition fee schedules and installment plans\n• Merit & PGC scholarships up to 100%\n• Admission eligibility (minimum 50% in Intermediate)\n• Campus facilities, laboratories, and transport 🎓\n\nHow can I help you today? Feel free to call our campus helpline at 062-2202030 / 062-2202050! 😊`,
    suggestions: [
      "ADP Artificial Intelligence 🤖",
      "BS Computer Science 💻",
      "Fee & Scholarships 💰",
      "Admission Eligibility 📋",
      "Contact Helpline 📞"
    ]
  };
}

const app = express();
// Port 3000 is required by the environment; Nginx reverse proxy listens on 8080 and forwards to 3000
const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production' || (!process.env.NODE_ENV && fs.existsSync(path.resolve(__dirname, 'dist', 'index.html')));

app.use(express.json());

// Healthcheck endpoints for Cloud Run & container orchestrators
app.get('/healthz', (_req, res) => res.status(200).send('OK'));
app.get('/api/health', (_req, res) => res.status(200).json({ status: 'ok', time: new Date().toISOString() }));

const SYSTEM_INSTRUCTION = `You are 'UCP Assistant', the official, friendly, and knowledgeable AI assistant for University of Central Punjab (UCP) Bahawalpur Campus.

STYLE & PERSONALITY:
- Warm, welcoming, helpful, concise, and polite.
- Always keep messages SHORT, CONCISE, and straight to the point (2 to 4 sentences or brief bullet points). Never give overwhelming long walls of text.
- Use relevant friendly emojis (🎓, 🏛️, 📍, 💰, 📞, 💡, ✨, 🚀, 🤖) naturally.
- Introduce yourself as "UCP Assistant" when greeted.
- Answer all questions accurately and helpfully! You can answer campus questions as well as general academic, educational, and general knowledge questions.

IMPORTANT RULE:
- NEVER state an exact number or count of programmes (NEVER say "27 programs" or "25 programs" or any number). Keep the phrasing natural and simply refer to them as "degree programmes", "undergraduate BS programmes", and "associate degree (ADP) programmes".

CAMPUS KNOWLEDGE:
- Institution: University of Central Punjab (UCP) Bahawalpur Campus, a constituent college of UCP Lahore (Punjab Group of Colleges).
- Degrees Offered:
  • Bachelors (4-Yr): BBA, BS Computer Science, BS Business Analytics, BS Accounting & Finance, BS English, BS Psychology, BS Mathematics, BS Physics, BS Chemistry, BS Biochemistry, BS Biotechnology, BS Zoology, BS Economics.
  • Associate Degrees (2-Yr, 4 Semesters): ADP Artificial Intelligence, ADP Computer Science, ADP Software Engineering, ADP Cyber Security, ADP Data Science, ADP Business Administration, ADP Accounting & Finance, ADP Business Analytics, ADP Psychology, ADP English, ADP Biotechnology, ADP Biochemistry, ADS Botany/Chemistry/Zoology, ADS Double Maths & Physics.
- ADP Artificial Intelligence: 75 Credit Hours, machine learning, intelligent systems, evolutionary computing, big data analytics, robotics & AI firmware career pathways.
- Admissions: Open for Fall/Spring sessions. Eligibility: Minimum 50% in Intermediate / HSSC / ICS / A-Levels / FA.
- Scholarships: Up to 100% Merit Scholarships, 25%-50% PGC Alumni Fee Concession, Kinship waiver (25%), Sports & Need-Based concessions.
- Facilities: Modern computing labs, AI research centers, science laboratories, digital library, air-conditioned buses across Bahawalpur, sports complexes, cafeteria.
- Contacts: Constituent College, UCP Campus, Airport Road, Bahawalpur. Phone: 062-2202030 / 062-2202050, Helpline: 0800-00827, Email: info@ucp.edu.pk, Website: bit.ly/ucpbahawalpur, Facebook: https://www.facebook.com/profile.php?id=61583228356324, Office Hours: Mon-Fri 9:00 AM - 5:00 PM.
- Leadership: Founder & Chairman Mian Amir Mahmood, Campus Director Prof. Hamid Iqbal, Head/Principal Prof. Dr. Aurangzaib Virk.

If asked general questions or topics outside UCP, answer nicely, concisely, and accurately with emojis, while warmly offering to help with UCP admissions or degree queries.`;

// 1. Health & Status endpoint
app.get('/api/chat/status', (req, res) => {
  const hasEnvKey = !!process.env.GEMINI_API_KEY;
  res.json({
    status: 'ok',
    hasKey: hasEnvKey,
    model: 'gemini-3.8-flash',
    botName: 'UCP Assistant'
  });
});

// 2. Chat completion endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, apiKey: customKey } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = customKey || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      const instantRes = getInstantBotResponse(message);
      return res.json({
        success: true,
        reply: instantRes.reply,
        suggestions: instantRes.suggestions,
        actionLink: instantRes.actionLink
      });
    }

    const withTimeout = (promise: Promise<any>, ms: number) => {
      let timeoutId: NodeJS.Timeout;
      return Promise.race([
        promise,
        new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('AI response timed out')), ms);
        })
      ]).finally(() => clearTimeout(timeoutId));
    };

    let replyText = '';

    try {
      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Format multi-turn conversation contents
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-6)) {
          if (item.role === 'user' || item.role === 'model') {
            contents.push({
              role: item.role,
              parts: [{ text: item.text }]
            });
          }
        }
      }

      // Add current user message
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      // Standard model call with responsive 4-second timeout to avoid long hangs
      const response = await withTimeout(ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      }), 4000);

      replyText = response?.text || '';
    } catch {
      // Graceful instant fallback upon timeout, quota exhaustion, or rate limit
    }

    if (!replyText || replyText.trim().length === 0) {
      const instantFallback = getInstantBotResponse(message);
      return res.json({
        success: true,
        reply: instantFallback.reply,
        suggestions: instantFallback.suggestions,
        actionLink: instantFallback.actionLink
      });
    }

    return res.json({
      success: true,
      reply: replyText
    });
  } catch {
    const instantFallback = getInstantBotResponse(req.body?.message || '');
    return res.json({
      success: true,
      reply: instantFallback.reply,
      suggestions: instantFallback.suggestions,
      actionLink: instantFallback.actionLink
    });
  }
});

async function startServer() {
  const httpServer = http.createServer(app);

  if (!isProd) {
    const { createLogger } = await import('vite');
    const customLogger = createLogger();
    const origError = customLogger.error.bind(customLogger);
    const origWarn = customLogger.warn.bind(customLogger);
    customLogger.error = (msg, options) => {
      if (typeof msg === 'string' && (msg.includes('WebSocket') || msg.includes('ws') || msg.includes('closed without opened') || msg.includes('failed to connect'))) {
        return;
      }
      origError(msg, options);
    };
    customLogger.warn = (msg, options) => {
      if (typeof msg === 'string' && (msg.includes('WebSocket') || msg.includes('ws') || msg.includes('closed without opened') || msg.includes('failed to connect'))) {
        return;
      }
      origWarn(msg, options);
    };

    const vite = await createViteServer({
      customLogger,
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false as any,
        watch: null,
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath, { maxAge: '7d', etag: true }));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`UCP Bahawalpur Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
