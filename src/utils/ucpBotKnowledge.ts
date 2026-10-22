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
 * Searches the offline trained UCP Knowledge Base.
 * Returns a short, friendly response in senior-student style.
 */
export function getInstantBotResponse(userQuery: string): BotResponse {
  const q = (userQuery || '').toLowerCase().trim();

  // Search through trained knowledge base
  const { match, confidence } = searchUcpKnowledge(q);

  if (match && confidence >= 20) {
    let reply = match.answer;

    // If query is admission related and doesn't already have the question prompt, ensure it asks:
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

  // Fallback for greetings if query was very short
  if (/^(hi|hello|hey|salam|aoa|hola)/i.test(q)) {
    return {
      reply: "Hey there! Welcome to UCP Bahawalpur. I'm UCP Assistant 🎓 How can I help your academic journey today?",
      suggestions: ["Degree Programmes 🎓", "Fee Structure 💰", "Scholarships 🏆", "Admissions 📝"],
      isOfflineMatch: true
    };
  }

  // General friendly senior-student fallback
  return {
    reply: "I'm using my offline knowledge! You can ask me about degrees (BSCS, BBA, ADP AI, Sciences), fee structure, scholarships up to 50%, or admissions at UCP Bahawalpur 😊",
    suggestions: [
      "BS Computer Science 💻",
      "ADP Artificial Intelligence 🤖",
      "Fee & Scholarships 💰",
      "Open Admission Form 📝"
    ],
    actionLink: { label: "Explore Programmes", url: "#academics" },
    isOfflineMatch: false
  };
}
