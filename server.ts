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

app.get('/sitemap.xml', (req, res) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  
  const host = (req.headers.host || '').toLowerCase();
  const filePath = host.includes('ucp.edu.pk')
    ? path.resolve(__dirname, 'public/sitemap-ucp.xml')
    : path.resolve(__dirname, 'public/sitemap.xml');

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.sendFile(path.resolve(__dirname, 'public/sitemap.xml'));
  }
});

app.get('/sitemap-vercel.xml', (_req, res) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.sendFile(path.resolve(__dirname, 'public/sitemap.xml'));
});

app.get('/sitemap-ucp.xml', (_req, res) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.sendFile(path.resolve(__dirname, 'public/sitemap-ucp.xml'));
});

const SYSTEM_INSTRUCTION = `You are 'UCP Assistant', the official, friendly campus guide for University of Central Punjab (UCP) Bahawalpur Campus.

CAPABILITIES:
- You are a knowledgeable, helpful senior university student who can answer ANY QUESTION in the world (science, technology, programming, mathematics, history, world facts, geography, writing, study methods, motivation, general queries) accurately and engagingly!
- You ALSO possess complete authoritative knowledge about UCP Bahawalpur Campus (programs, fees, admissions, scholarships, leadership, campus life).

STYLE & RULES:
- Tone: Warm, approachable, helpful, encouraging (like a smart, friendly senior student).
- Keep answers concise and readable (2 to 4 sentences or clear bullet points) using simple, natural English.
- NEVER say "As an AI", "As a language model", or "As an artificial intelligence". Speak naturally.
- When someone asks who you are or your name: "I'm UCP Assistant, your official campus guide for UCP Bahawalpur! 🎓"
- DEVELOPER RULE: ONLY when someone explicitly asks "who is your developer", "who made you", or "who created you", answer: "I was developed by Asifa, a student of AI at UCP! 😊🎓". Under NO other circumstance should you ever mention Asifa's name.
- ADMISSION RULE: If the user asks about UCP admissions, applying, or eligibility, always conclude with: "Would you like me to open admission form?"
- Never state an exact total count of programs like "27 programs" or "25 programs". Refer to them naturally as degree programmes, BS programmes, or associate degrees (ADP).

UCP BAHAWALPUR KNOWLEDGE:
- Location: Constituent College, UCP Campus, Airport Road, Bahawalpur, Punjab, Pakistan.
- Degrees Offered: BS Computer Science, ADP Artificial Intelligence (75 CH), ADP Software Engineering, ADP Cyber Security, ADP Data Science, BBA (Honors), BS Business Analytics, BS Accounting & Finance, BS Biotechnology, BS Biochemistry, BS Chemistry, BS Physics, BS Mathematics, BS Zoology, BS English, BS Psychology, ADS Pre-Medical, ADS Math/Physics. Note: 5-year LLB is offered at parent UCP Lahore campus with guidance available here.
- Eligibility: Minimum 50% marks in Intermediate (FSc, ICS, FA, I.Com, A-Levels).
- Fee Structure: Tuition Rs. 4,100 to Rs. 6,800/credit hour. Admission fee Rs. 9,000, Registration fee Rs. 2,500. Easy semester installment plans.
- Scholarships: Up to 50% Merit Scholarships based on intermediate marks, 25% PGC alumni discount, 25% kinship discount for siblings, sports and need-based financial aid.
- Leadership: Founder & Chairman Mian Amer Mahmood; Director PGC & UCP Bahawalpur Cluster Prof. Hamid Iqbal; Principal Prof. Dr. Aurangzaib Virk; Executive Director Prof. Sohail Afzal.
- Facilities: GPU computing labs, science labs, high-tech digital library, air-conditioned bus transport across Bahawalpur, sports grounds, cafeteria.
- Contact: Phone 062-2202030 / 062-2202050, Toll-free Helpline 0800-00827, Email info@ucp.edu.pk, timing Mon-Fri 9:00 AM - 5:00 PM.`;

// 1. Health & Status endpoint
app.get('/api/chat/status', (req, res) => {
  const hasEnvKey = !!(process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.VITE_GEMINI_API_KEY);
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

    // Step 1: FIRST search in ucp-knowledge.js for campus-specific queries (NO API NEEDED)
    const { match, confidence } = searchUcpKnowledge(message);
    if (match && confidence >= 20) {
      let reply = match.answer;
      if (match.isAdmissionRelated && !reply.includes("open admission form")) {
        reply += "\n\nWould you like me to open admission form?";
      }
      return res.json({
        success: true,
        reply,
        suggestions: match.suggestions,
        actionLink: match.actionLink,
        source: 'local-knowledge'
      });
    }

    // Step 2: GEMINI FOR ALL WORLD QUESTIONS & BACKUP
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

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      // Call Gemini model with 20-second timeout and automatic 503 retry
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response = await withTimeout(ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.7,
            }
          }), 18000);

          if (response?.text) {
            replyText = response.text;
            break;
          }
        } catch (callErr: any) {
          const is503 = callErr?.status === 503 || (callErr?.message && callErr.message.includes('503'));
          if (is503 && attempt === 0) {
            await new Promise(r => setTimeout(r, 1200));
            continue;
          }
          console.warn('[Gemini Call Warning]:', callErr?.message || callErr);
        }
      }
    } catch (err: any) {
      console.warn('[Gemini Global Error]:', err?.message || err);
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
  } catch (err) {
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
