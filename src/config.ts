/**
 * Application Configuration
 *
 * NOTE: Private API keys (such as GEMINI_API_KEY) must ALWAYS be kept on the
 * server-side (process.env.GEMINI_API_KEY) and NEVER exposed to the frontend
 * with a VITE_ prefix. Client requests use the server-side proxy route (/api/chat/stream).
 */
export const IS_PRODUCTION = import.meta.env.PROD;
