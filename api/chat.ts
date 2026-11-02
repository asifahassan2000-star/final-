import { GoogleGenAI } from '@google/genai';
// @ts-ignore
import { UCP_KNOWLEDGE_BASE } from '../ucp-knowledge.js';
// @ts-ignore
import { getAttributionResponse, getInstantBotResponse, QUICK_ACTION_RESPONSES } from '../src/utils/ucpBotKnowledge.js';

const BASE_SYSTEM_PROMPT = `You are UCP Assistant, an intelligent, helpful, fast, and comprehensive AI Assistant powered by Google Gemini for the UCP Bahawalpur Campus website. You answer questions instantly, thoroughly, and accurately.

KNOWLEDGE CAPABILITIES:
You can answer ANY and ALL questions on ANY topic, including:
- STUDY & ASSIGNMENT HELP: Step-by-step homework solutions, assignment guidance, coding problem solving, mathematical problem solving, physics numericals, chemistry equations, biology questions, exam preparation strategies, essay outlines, literature analysis, and conceptual tutoring.
- Computer Science & Programming: Python, C++, Java, JavaScript, TypeScript, HTML/CSS, React, Next.js, SQL, data structures, algorithms, AI/ML, data science, networking, and cybersecurity.
- Mathematics & Natural Sciences: Calculus, linear algebra, statistics, discrete math, physics (mechanics, electromagnetism, quantum), organic & inorganic chemistry, genetics, cell biology.
- Business, Finance & Humanities: Accounting entries, financial analysis, business analytics, marketing strategy, psychology case studies, English grammar and creative writing.
- General Knowledge, world affairs, history, geography, arts, and everyday advice.
- University of Central Punjab (UCP) Bahawalpur Campus information, admissions, degree programmes, fees, merit scholarships, campus facilities, library rules, and academic calendar.

CRITICAL DEVELOPER, CREATOR & OFFICIAL REPRESENTATIVE ATTRIBUTION RULES:
When someone asks these specific questions or related questions about the developer, creator, website, chatbot, or official status, give the EXACT corresponding response:

1. Who developed this website? (or questions asking who designed/built/made/created this website or the site's developer):
"This website was designed and developed by Asifa, an AI student at UCP Bahawalpur."

2. Who created you? (or questions asking who made/built/created you):
"I’m the UCP Bahawalpur AI Assistant, developed by Asifa to help visitors access campus information quickly and easily."

3. Who is your developer? (or questions asking who is your developer/coder):
"My developer is Asifa, an AI student at UCP Bahawalpur."

4. Who made this chatbot? (or questions asking who made/developed/built this chatbot or bot):
"This AI chatbot was created by Asifa to provide helpful information and assistance to UCP Bahawalpur visitors."

5. Are you an official UCP representative? (or questions asking if you are official, a real person, or human university representative):
"I’m an AI assistant for the UCP Bahawalpur Campus website. I provide information to help visitors, but I’m not a human university representative."

- STRICT ATTRIBUTION RULE: ONLY mention Asifa when someone specifically asks who built/developed/created you, this chatbot, or this website. In all other conversations and general questions (programming, math, science, world facts, admissions, programs, campus life, fees, faculty, assignments, etc.), NEVER mention Asifa or bring up the developer unprompted.

RESPONSE FORMATTING & PRESENTATION RULES:
1. Provide clear, accurate, direct, and comprehensive answers immediately.
2. Use clear Markdown headings (## or ###) whenever an answer contains multiple topics or steps.
3. Highlight key terms, concepts, percentages, dates, and important takeaways using **bold text**.
4. Use bullet points (- item) for lists, advantages, features, and key points.
5. Use numbered lists (1. item) for step-by-step procedures, tutorials, or problem-solving steps.
6. Use syntax-highlighted code blocks (\`\`\`python, \`\`\`javascript, \`\`\`cpp, etc.) whenever sharing code snippets.
7. Use Markdown tables when comparing information, fee structures or schedules.
8. Keep answers well-structured and easy to read without unnecessary fluff. Maintain an encouraging and distinguished tone.`;

const UCP_CAMPUS_FACTS = `
UCP Bahawalpur Campus Knowledge:
- Location: Constituent College, UCP Campus, Airport Road, Bahawalpur, Punjab, Pakistan.
- Degrees Offered: BS Computer Science, ADP Artificial Intelligence (75 CH), ADP Software Engineering, ADP Cyber Security, ADP Data Science, BBA (Honors), BS Business Analytics, BS Accounting & Finance, BS Biotechnology, BS Biochemistry, BS Chemistry, BS Physics, BS Mathematics, BS Zoology, BS English, BS Psychology, ADS Pre-Medical, ADS Math/Physics. Note: 5-year LLB is offered at parent UCP Lahore campus with guidance available here.
- Eligibility: Minimum 50% marks in Intermediate (FSc Pre-Medical, FSc Pre-Engineering, ICS, FA, I.Com, A-Levels).
- Fee Structure: Tuition Rs. 4,100 to Rs. 6,800/credit hour. Admission fee Rs. 9,000, Registration fee Rs. 2,500. Easy semester installment plans.
- Scholarships: Up to 50% Merit Scholarships based on intermediate marks, 25% PGC alumni discount, 25% kinship discount for siblings, sports and need-based financial aid.
- Leadership: Founder & Chairman Mian Amer Mahmood; Director PGC & UCP Bahawalpur Cluster Prof. Hamid Iqbal; Principal Dr. Aurangzaib Virk; Executive Director Prof. Sohail Afzal.
- Faculty & Academics: Distinguished PhD and MPhil faculty members, published researchers, and seasoned industry mentors across Computing, Business, Natural Sciences, and Humanities faculties dedicated to interactive learning and practical projects.
- Legacy & Heritage: UCP Bahawalpur is a constituent campus of the University of Central Punjab and Pakistan's largest educational network — Punjab Group of Colleges (PGC), serving with academic excellence since 1985 with over 2,000,000 alumni worldwide.
- Facilities: GPU computing labs, science labs, high-tech digital library, air-conditioned bus transport across Bahawalpur, sports grounds, cafeteria.
- Library & Student Services (UCP Bahawalpur Library):
  * How to get a Library Card:
    1. Visit the Photoshop shop located at UCP Bahawalpur and ask for the Library Membership Form.
    2. Fill out the form with your required information.
    3. Bring two recent passport-size photographs. Attach one to the form.
    4. Submit the completed form to the Chairman of the Library at the university library.
    5. Give your second photograph separately to the Chairman.
    6. The Chairman will provide your library card with your photograph on it.
  * Book Borrowing Rules: Maximum 2 books at a time. All books must be returned at the end of each semester in good condition.
- Academic Calendar (Fall 2026 – October 2026 to March 2027):
  * Registration: 22 October 2026 to 14 November 2026 (strictly no late registration allowed).
  * Classes Commencement: 16 November 2026 (Monday).
  * Midterm Examinations: 11 January 2027 to 16 January 2027 (Makeup exams strictly NOT allowed).
  * Attendance: Minimum 80% attendance is strictly compulsory.
  * Holidays: Quaid Day (25 Dec), Kashmir Day (5 Feb), Eid Holidays (10–12 Mar), Pakistan Resolution Day (23 Mar).
  * Course Withdrawal Deadline: 20 February 2027.
  * Last Day of Classes: 13 March 2027.
  * Final Exams: 15 March 2027 to 26 March 2027.
  * Results & Grades: Results submission 29 March 2027; Grades notification 31 March 2027.
  * Spring 2027: Registration 1–10 April 2027; Classes commence 12 April 2027.
- Online Admission Portal: https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F
`;

function isUcpSpecificQuery(text: string): boolean {
  if (!text) return false;
  const t = text.toLowerCase();
  const ucpTerms = [
    'ucp', 'bahawalpur', 'bwp', 'campus', 'admission', 'apply', 'applying',
    'eligibility', 'intermediate', 'fsc', 'ics', 'fee', 'fees', 'tuition',
    'installment', 'scholarship', 'merit', 'kinship', 'pgc', 'punjab group',
    'mian amer', 'aurangzaib', 'hamid iqbal', 'sohail afzal', 'adp', 'adp ai',
    'adp cs', 'adp se', 'degree', 'transport', 'hostel', 'cafeteria', 'library',
    'library card', 'membership form', 'borrow', 'borrowing', 'books', 'book', 'photoshop',
    'calendar', 'academic calendar', 'midterm', 'midterms', 'mids', 'final exam', 'final exams',
    'finals', 'attendance', '80%', 'quaid-e-azam', 'kashmir day', 'eid holidays', 'resolution day',
    'course withdraw', 'withdraw', 'teaching days', 'working days', 'spring 2027', 'grades', 'results',
    'principal', 'faculty', 'constituent college', 'airport road',
    'who made this website', 'who built this website', 'who developed this website',
    'developer of website', 'website developer', 'founder of this website', 'who built you',
    'who made you', 'who created you', 'who developed you', 'who is your developer',
    'who made this chatbot', 'who made the chatbot', 'who created this chatbot',
    'official ucp representative', 'official representative', 'are you official', 'are you human',
    'leadership', 'legacy', 'scope', 'professors', 'professor', 'teachers', 'programmes', 'programs'
  ];
  return ucpTerms.some(term => t.includes(term));
}

export default async function handler(req: any, res: any) {
  // Set open CORS headers allowing live websites and GitHub Pages to make requests
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      hasKey: !!(process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.VITE_GEMINI_API_KEY),
      model: 'gemini-3.5-flash-lite',
      botName: 'UCP Assistant'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const isStream = req.query?.stream === 'true' || 
                   req.query?.stream === '1' || 
                   req.headers?.accept?.includes('text/event-stream') ||
                   (typeof req.url === 'string' && req.url.includes('stream'));

  try {
    const { message, history, apiKey: customKey } = req.body || {};

    if (!message || typeof message !== 'string') {
      if (isStream) {
        res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
        res.write(`data: ${JSON.stringify({ error: 'Message is required' })}\n\n`);
        res.write('data: [DONE]\n\n');
        return res.end();
      }
      return res.status(400).json({ error: 'Message is required' });
    }

    // 1. Check Creator / Developer Attribution first
    const attribution = getAttributionResponse(message);
    if (attribution) {
      if (isStream) {
        res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
        res.write(`data: ${JSON.stringify({ text: attribution.reply, suggestions: attribution.suggestions, actionLink: attribution.actionLink })}\n\n`);
        res.write('data: [DONE]\n\n');
        return res.end();
      }
      return res.status(200).json({
        success: true,
        reply: attribution.reply,
        suggestions: attribution.suggestions,
        actionLink: attribution.actionLink
      });
    }

    // 2. Check offline campus knowledge match
    const instantCheck = getInstantBotResponse(message);
    if (instantCheck && instantCheck.isOfflineMatch) {
      if (isStream) {
        res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
        res.write(`data: ${JSON.stringify({ text: instantCheck.reply, suggestions: instantCheck.suggestions, actionLink: instantCheck.actionLink })}\n\n`);
        res.write('data: [DONE]\n\n');
        return res.end();
      }
      return res.status(200).json({
        success: true,
        reply: instantCheck.reply,
        suggestions: instantCheck.suggestions,
        actionLink: instantCheck.actionLink
      });
    }

    // 3. Obtain API key
    const apiKey = customKey || process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      if (isStream) {
        res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
        res.write(`data: ${JSON.stringify({ text: instantCheck.reply, suggestions: instantCheck.suggestions, actionLink: instantCheck.actionLink })}\n\n`);
        res.write('data: [DONE]\n\n');
        return res.end();
      }
      return res.status(200).json({
        success: true,
        reply: instantCheck.reply,
        suggestions: instantCheck.suggestions,
        actionLink: instantCheck.actionLink
      });
    }

    // 4. Set appropriate system instruction
    const isUcp = isUcpSpecificQuery(message);
    const systemInstruction = isUcp
      ? `${BASE_SYSTEM_PROMPT}\n\n${UCP_CAMPUS_FACTS}`
      : BASE_SYSTEM_PROMPT;

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
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Primary: gemini-3.5-flash-lite (fastest, <600ms latency), fallback: gemini-flash-latest, gemini-3.8-flash
    const candidateModels = ['gemini-3.5-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];

    if (isStream) {
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');
      if (typeof res.flushHeaders === 'function') {
        res.flushHeaders();
      }

      let streamedSuccessfully = false;

      for (const model of candidateModels) {
        try {
          const streamPromise = ai.models.generateContentStream({
            model,
            contents,
            config: {
              systemInstruction,
            }
          });
          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Model timeout after 8000ms')), 8000)
          );
          const responseStream = await Promise.race([streamPromise, timeoutPromise]);

          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
              res.write(`data: ${JSON.stringify({ text })}\n\n`);
              if (typeof res.flush === 'function') {
                res.flush();
              }
            }
          }
          streamedSuccessfully = true;
          break;
        } catch (err: any) {
          console.warn(`[Vercel SSE Gemini with ${model} warning]:`, err?.message || err);
        }
      }

      if (!streamedSuccessfully) {
        res.write(`data: ${JSON.stringify({ text: instantCheck.reply, suggestions: instantCheck.suggestions, actionLink: instantCheck.actionLink })}\n\n`);
      }

      res.write('data: [DONE]\n\n');
      return res.end();
    }

    // Standard JSON Response
    let replyText = '';

    for (const model of candidateModels) {
      try {
        const responsePromise = ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction,
          }
        });
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Model timeout after 8000ms')), 8000)
        );
        const response = await Promise.race([responsePromise, timeoutPromise]);
        if (response?.text) {
          replyText = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`[Vercel JSON Gemini with ${model} warning]:`, err?.message || err);
      }
    }

    if (!replyText || replyText.trim().length === 0) {
      replyText = instantCheck.reply;
    }

    return res.status(200).json({
      success: true,
      reply: replyText,
      suggestions: instantCheck.suggestions,
      actionLink: instantCheck.actionLink
    });
  } catch (error: any) {
    console.error('[Vercel API chat handler error]:', error);
    const instantFallback = getInstantBotResponse(req.body?.message || '');
    if (isStream) {
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.write(`data: ${JSON.stringify({ text: instantFallback.reply, suggestions: instantFallback.suggestions, actionLink: instantFallback.actionLink })}\n\n`);
      res.write('data: [DONE]\n\n');
      return res.end();
    }
    return res.status(200).json({
      success: true,
      reply: instantFallback.reply,
      suggestions: instantFallback.suggestions,
      actionLink: instantFallback.actionLink
    });
  }
}
