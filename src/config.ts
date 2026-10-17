// Gemini API Configuration
// Read from Vite environment variables - never hardcode secrets
export const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
