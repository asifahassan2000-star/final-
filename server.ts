import express from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { searchUcpKnowledge, UCP_KNOWLEDGE_BASE } from './ucp-knowledge.js';
import { getInstantBotResponse } from './src/utils/ucpBotKnowledge.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
// Port 3000 is required by the environment; Nginx reverse proxy listens on 8080 and forwards to 3000
const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Security headers aligning with vercel.json for Grade A+ security rating (CSP, HSTS, X-Frame-Options, etc.)
app.use((_req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https: blob:; font-src 'self' data: https:; connect-src 'self' https:; frame-src 'self' https: https://*.google.com https://*.openstreetmap.org; object-src 'none'; base-uri 'self';"
  );
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// In development, prevent stale caching so changes reflect immediately on screen; in production, use edge caching
app.use((req, res, next) => {
  if (isProd) {
    if (req.path.startsWith('/images/') || req.path.startsWith('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (!req.path.startsWith('/api/')) {
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
    }
  } else {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  next();
});

// Serve local public/images with high performance immutable caching
app.use('/images', express.static(path.resolve(__dirname, 'public/images'), {
  maxAge: '365d',
  immutable: true,
  etag: true,
}));

// Serve local public/assets with immutable caching
app.use('/assets', express.static(path.resolve(__dirname, 'public/assets'), {
  maxAge: '365d',
  immutable: true,
  etag: true,
}));

// Healthcheck endpoints for Cloud Run & container orchestrators
app.get('/healthz', (_req, res) => res.status(200).send('OK'));
app.get('/api/health', (_req, res) => res.status(200).json({ status: 'ok', time: new Date().toISOString() }));

// Search Engine & AI / LLM Context endpoints (llms.txt standard)
app.get('/llms.txt', (_req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.sendFile(path.resolve(__dirname, 'public/llms.txt'));
});

app.get('/llms-full.txt', (_req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.sendFile(path.resolve(__dirname, 'public/llms-full.txt'));
});

app.get('/robots.txt', (_req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.sendFile(path.resolve(__dirname, 'public/robots.txt'));
});

app.get('/sitemap.xml', (_req, res) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.sendFile(path.resolve(__dirname, 'public/sitemap.xml'));
});

const BASE_SYSTEM_PROMPT = `You are UCP Assistant, official AI assistant for UCP Bahawalpur (University of Central Punjab, Bahawalpur Campus). You are fast, helpful, friendly and concise. Answer instantly. You have extensive knowledge about UCP Bahawalpur campus. For general knowledge questions, answer from your Gemini intelligence directly without mentioning sources.

CRITICAL DEVELOPER & WEBSITE BUILDER ATTRIBUTION:
- When someone asks who made this website, who developed this website, who built this website, who created this website, who is the founder or developer of this website, OR asks who made/developed/built you (the AI assistant), answer:
"I and this entire website of UCP Bahawalpur campus were developed and built by Asifa, a student of AI at UCP Bahawalpur! 🎓✨"
- STRICT RULE: ONLY mention Asifa's name when someone specifically asks who built/developed you or who built/developed/founded this website. In all other conversations and questions (admissions, programs, campus life, fees, faculty, general knowledge, etc.), NEVER mention Asifa or bring up the developer unprompted.`;

const UCP_CAMPUS_FACTS = `
UCP Bahawalpur Campus Knowledge:
- Location: Constituent College, UCP Campus, Airport Road, Bahawalpur, Punjab, Pakistan.
- Degrees Offered: BS Computer Science, ADP Artificial Intelligence (75 CH), ADP Software Engineering, ADP Cyber Security, ADP Data Science, BBA (Honors), BS Business Analytics, BS Accounting & Finance, BS Biotechnology, BS Biochemistry, BS Chemistry, BS Physics, BS Mathematics, BS Zoology, BS English, BS Psychology, ADS Pre-Medical, ADS Math/Physics. Note: 5-year LLB is offered at parent UCP Lahore campus with guidance available here.
- Eligibility: Minimum 50% marks in Intermediate (FSc Pre-Medical, FSc Pre-Engineering, ICS, FA, I.Com, A-Levels).
- Fee Structure: Tuition Rs. 4,100 to Rs. 6,800/credit hour. Admission fee Rs. 9,000, Registration fee Rs. 2,500. Easy semester installment plans.
- Scholarships: Up to 50% Merit Scholarships based on intermediate marks, 25% PGC alumni discount, 25% kinship discount for siblings, sports and need-based financial aid.
- Leadership: Founder & Chairman Mian Amer Mahmood; Director PGC & UCP Bahawalpur Cluster Prof. Hamid Iqbal; Principal Prof. Dr. Aurangzaib Virk; Executive Director Prof. Sohail Afzal.
- Faculty & Academics: Distinguished PhD and MPhil faculty members, published researchers, and seasoned industry mentors across Computing, Business, Natural Sciences, and Humanities faculties dedicated to interactive learning and practical projects.
- Legacy & Heritage: UCP Bahawalpur is a constituent campus of the University of Central Punjab and Pakistan's largest educational network — Punjab Group of Colleges (PGC), serving with academic excellence since 1985 with over 2,000,000 alumni worldwide.
- Scope of All Programmes:
  * Computing & AI (BSCS, ADP AI, ADP SE, Cyber Security, Data Science): Exceptional industry demand in software engineering, machine learning, cloud architecture, cybersecurity defense, and remote global tech careers.
  * Business & Management (BBA, Business Analytics, Accounting & Finance): High-growth pathways in commercial banking, corporate finance, market intelligence, fintech, and entrepreneurship.
  * Natural & Life Sciences (Biotech, Biochemistry, Chemistry, Physics, Math, Zoology): Flourishing opportunities in pharmaceutical research, clinical pathology, environmental testing, scientific laboratories, and postgraduate academia.
  * Humanities & Social Sciences (English, Psychology): Rewarding career paths in clinical counseling, corporate HR, digital content strategy, civil services (CSS/PMS), and educational leadership.
- Facilities: GPU computing labs, science labs, high-tech digital library, air-conditioned bus transport across Bahawalpur, sports grounds, cafeteria.
- Exact Navigation Links: When recommending or providing links, use the exact routes:
  * Degree Programmes: #programmes (e.g. [Explore Programmes](#programmes))
  * Fee Structure: #fee-structure (e.g. [Fee Structure](#fee-structure))
  * Scholarships: #scholarships (e.g. [Scholarships](#scholarships))
  * Faculty: #faculty (e.g. [Meet Faculty](#faculty))
  * Campus Facilities: #facilities (e.g. [Campus Facilities](#facilities))
  * Legacy & Heritage: #legacy (e.g. [Our Legacy](#legacy))
  * Campus Life: #campus-life (e.g. [Campus Life](#campus-life))
  * Online Admission Portal: https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F
- Admissions rule: If asking about admissions, mention online admission portal is open and offer guidance.
- Developer & Website Builder rule: ONLY when someone asks who built/made you or who made/built/developed/founded this website, state: "I and this entire website of UCP Bahawalpur campus were developed and built by Asifa, a student of AI at UCP Bahawalpur! 🎓✨". Never mention Asifa unless specifically asked.
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
    'principal', 'faculty', 'constituent college', 'airport road',
    'who made this website', 'who built this website', 'who developed this website',
    'developer of website', 'website developer', 'founder of this website', 'who built you',
    'who made you', 'who created you', 'who developed you', 'who is your developer',
    'leadership', 'legacy', 'scope', 'professors', 'professor', 'teachers', 'programmes', 'programs'
  ];
  return ucpTerms.some(term => t.includes(term));
}

// 1. Health & Status endpoint
app.get('/api/chat/status', (_req, res) => {
  const hasEnvKey = !!(process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.VITE_GEMINI_API_KEY);
  res.json({
    status: 'ok',
    hasKey: hasEnvKey,
    model: 'gemini-flash',
    botName: 'UCP Assistant'
  });
});

// 2. High-speed SSE Streaming endpoint (Instant token streaming like ChatGPT)
app.post('/api/chat/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  if (typeof (res as any).flushHeaders === 'function') {
    (res as any).flushHeaders();
  }

  const { message, history } = req.body;
  if (!message || typeof message !== 'string') {
    res.write(`data: ${JSON.stringify({ error: 'Message is required' })}\n\n`);
    res.write('data: [DONE]\n\n');
    return res.end();
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    const instantFallback = getInstantBotResponse(message);
    res.write(`data: ${JSON.stringify({ text: instantFallback.reply, suggestions: instantFallback.suggestions, actionLink: instantFallback.actionLink })}\n\n`);
    res.write('data: [DONE]\n\n');
    return res.end();
  }

  // Only augment with offline campus knowledge if user specifically asks about UCP Bahawalpur
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

  // Ultra-fast Flash-Lite models for lowest latency (<1.5s)
  const candidateModels = ['gemini-flash-lite-latest', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'];
  let streamedSuccessfully = false;

  for (const model of candidateModels) {
    try {
      // Race stream initialization with 3.5s timeout so user never waits long
      const responseStreamPromise = ai.models.generateContentStream({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Model response timeout after 3500ms')), 3500)
      );

      const responseStream = await Promise.race([responseStreamPromise, timeoutPromise]);

      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          res.write(`data: ${JSON.stringify({ text })}\n\n`);
          if (typeof (res as any).flush === 'function') {
            (res as any).flush();
          }
        }
      }
      streamedSuccessfully = true;
      break;
    } catch (err: any) {
      console.warn(`[Gemini stream with ${model} warning]:`, err?.message || err);
    }
  }

  if (!streamedSuccessfully) {
    const instantFallback = getInstantBotResponse(message);
    res.write(`data: ${JSON.stringify({ text: instantFallback.reply, suggestions: instantFallback.suggestions, actionLink: instantFallback.actionLink })}\n\n`);
  }

  res.write('data: [DONE]\n\n');
  res.end();
});

// 3. Fallback Standard JSON Chat completion endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, apiKey: customKey } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = customKey || process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      const instantRes = getInstantBotResponse(message);
      return res.json({
        success: true,
        reply: instantRes.reply,
        suggestions: instantRes.suggestions,
        actionLink: instantRes.actionLink
      });
    }

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

    const candidateModels = ['gemini-flash-lite-latest', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'];
    let replyText = '';

    for (const model of candidateModels) {
      try {
        const responsePromise = ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Model timeout after 3500ms')), 3500)
        );
        const response = await Promise.race([responsePromise, timeoutPromise]);
        if (response?.text) {
          replyText = response.text;
          break;
        }
      } catch (callErr: any) {
        console.warn(`[Gemini JSON with ${model} warning]:`, callErr?.message || callErr);
      }
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
  } catch (_err) {
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

  // High-Performance Cached Static Asset Serving with Cache-Control headers
  app.use('/images', express.static(path.resolve(__dirname, 'public/images'), {
    maxAge: '365d',
    immutable: true,
    etag: true,
    lastModified: true,
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('Timing-Allow-Origin', '*');
    }
  }));

  app.use('/assets', express.static(path.resolve(__dirname, 'public/assets'), {
    maxAge: '365d',
    immutable: true,
    etag: true,
    lastModified: true,
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('Timing-Allow-Origin', '*');
    }
  }));

  app.use(express.static(path.resolve(__dirname, 'public'), {
    maxAge: '30d',
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      if (/\.(jpg|jpeg|png|webp|svg|gif|ico|woff2?|ttf)$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));

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
