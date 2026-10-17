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

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

const SYSTEM_INSTRUCTION = `You are 'UCP Bot', the official, friendly, and knowledgeable AI assistant for University of Central Punjab (UCP) Bahawalpur Campus.

STYLE & PERSONALITY:
- Warm, welcoming, helpful, effective, and polite.
- Always keep messages SHORT, CONCISE, and straight to the point (2 to 4 sentences or brief bullet points). Never give overwhelming long walls of text.
- Use relevant friendly emojis (🎓, 🏛️, 📍, 💰, 📞, 💡, ✨, 🚀, 🤖) naturally.
- Introduce yourself as "UCP Bot" when greeted.

CAMPUS KNOWLEDGE:
- Institution: University of Central Punjab (UCP) Bahawalpur Campus, a constituent college network of UCP Lahore (Punjab Group of Colleges).
- Degrees Offered (27 total):
  • Bachelors (4-Yr): BBA (132 CH), BS Computer Science (132 CH), BS Business Analytics (133 CH), BS Accounting & Finance (126 CH), BS English (132 CH), BS Psychology (132 CH), BS Mathematics (126 CH), BS Physics (127 CH), BS Chemistry (128 CH), BS Biochemistry (128 CH), BS Biotechnology (128 CH), BS Zoology (126 CH), BS Economics (129 CH).
  • Associate Degrees (2-Yr, 4 Semesters): ADP Artificial Intelligence (75 CH), ADP Computer Science (75 CH), ADP Software Engineering (74 CH), ADP Cyber Security (75 CH), ADP Data Science (78 CH), ADP Business Administration (66 CH), ADP Accounting & Finance (66 CH), ADP Business Analytics (64 CH), ADP Psychology (63 CH), ADP English (66 CH), ADP Biotechnology (70 CH), ADP Biochemistry (70 CH), ADS Botany/Chemistry/Zoology (71 CH), ADS Double Maths & Physics (70 CH).
- ADP Artificial Intelligence: 75 Credit Hours, machine learning, intelligent systems, evolutionary computing, big data analytics, robotics & AI firmware career pathways.
- Admissions: Open for Fall/Spring sessions. Eligibility: Minimum 50% in Intermediate / HSSC / ICS / A-Levels / FA.
- Scholarships: Up to 100% Merit Scholarships, 25%-50% PGC Alumni Fee Concession, Kinship waiver (25%), Sports & Need-Based concessions.
- Facilities: Modern computing labs, AI research centers, science laboratories, digital library, air-conditioned buses across Bahawalpur, sports complexes, cafeteria.
- Contacts: Constituent College, UCP Campus, Airport Road, Bahawalpur. Phone: 062-2202030 / 062-2202050, Toll-Free: 0800-00827, Email: info@ucp.edu.pk, Website: bit.ly/ucpbahawalpur, Office Hours: Mon-Fri 9:00 AM - 5:00 PM.
- Leadership: Founder & Chairman Mian Amir Mahmood, Campus Director Prof. Hamid Iqbal and Principal Prof. Dr. Aurangzaib Virk.

If asked general questions or topics outside UCP, answer nicely, concisely, and accurately with emojis, while warmly offering to help with UCP admissions or degree queries.`;

// 1. Health & Status endpoint
app.get('/api/chat/status', (req, res) => {
  const hasEnvKey = !!process.env.GEMINI_API_KEY;
  res.json({
    status: 'ok',
    hasKey: hasEnvKey,
    model: 'gemini-3.8-flash',
    botName: 'UCP Bot'
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
      return res.status(400).json({
        error: 'No Gemini API key available. The bot can still answer instantly via local knowledge engine.'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

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

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          maxOutputTokens: 800
        }
      });
    } catch (primaryErr: any) {
      console.warn('Primary model error, attempting fast fallback gemini-3.1-flash-lite:', primaryErr.message);
      response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          maxOutputTokens: 800
        }
      });
    }

    const replyText = response.text || "I'm here to assist you with UCP Bahawalpur! 🎓";

    return res.json({
      success: true,
      reply: replyText
    });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate response'
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
