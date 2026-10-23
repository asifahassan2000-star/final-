import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, Send, RefreshCw, Bot, 
  ExternalLink, Zap, Sparkles,
  Maximize2, Minimize2
} from 'lucide-react';
import { getInstantBotResponse, searchUcpKnowledge } from '../utils/ucpBotKnowledge';
import { UcpRobotMascot } from './UcpRobotMascot';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actionLink?: { label: string; url: string };
  suggestions?: string[];
  isStreaming?: boolean;
}

const INITIAL_MESSAGES: Message[] = [];

// Typewriter / Typing animation component for smooth text reveal
const TypingMessageText: React.FC<{
  fullText: string;
  isAnimated?: boolean;
  onDone?: () => void;
}> = ({ fullText, isAnimated = false, onDone }) => {
  const [displayedLength, setDisplayedLength] = useState(isAnimated ? 0 : fullText.length);
  const [isFinished, setIsFinished] = useState(!isAnimated);

  useEffect(() => {
    if (!isAnimated) {
      setDisplayedLength(fullText.length);
      setIsFinished(true);
      return;
    }

    setDisplayedLength(0);
    setIsFinished(false);

    // Fast typing speed: 3-5 chars every 14ms for crisp ChatGPT-like feel
    const stepSize = Math.max(3, Math.ceil(fullText.length / 50));
    const interval = setInterval(() => {
      setDisplayedLength((prev) => {
        const next = prev + stepSize;
        if (next >= fullText.length) {
          clearInterval(interval);
          setIsFinished(true);
          onDone?.();
          return fullText.length;
        }
        return next;
      });
    }, 14);

    return () => clearInterval(interval);
  }, [fullText, isAnimated, onDone]);

  const currentSlice = fullText.slice(0, displayedLength);

  return (
    <span 
      className="cursor-pointer" 
      onClick={() => {
        if (!isFinished) {
          setDisplayedLength(fullText.length);
          setIsFinished(true);
          onDone?.();
        }
      }}
      title={!isFinished ? "Click to reveal full text instantly" : undefined}
    >
      {currentSlice}
      {!isFinished && (
        <span className="inline-block w-1.5 h-3.5 bg-[#0A1931] ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  );
};

export const UcpChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mascot interactive animation states
  const [isWaving, setIsWaving] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [greetingState, setGreetingState] = useState<'hidden' | 'entering' | 'visible' | 'exiting'>('hidden');
  const [hasDismissedGreeting, setHasDismissedGreeting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const greetingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Natural blinking loop (every 3.6 to 5 seconds)
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const interval = setInterval(() => {
      // 180ms blink
      setIsBlinking(true);
      blinkTimeout = setTimeout(() => {
        setIsBlinking(false);
      }, 180);
    }, 4200);

    return () => {
      clearInterval(interval);
      clearTimeout(blinkTimeout);
    };
  }, []);

  // 2. Intelligent, Snapchat-style greeting sequence on initial entrance
  useEffect(() => {
    // Only run if not previously dismissed in session
    const sessionDismissed = typeof window !== 'undefined' && sessionStorage.getItem('ucp_greeting_seen');
    if (sessionDismissed) {
      return;
    }

    // Step 1: Mascot rises into view after initial page mount (800ms)
    const timer1 = setTimeout(() => {
      setGreetingState('entering');
    }, 850);

    // Step 2 & 3: Speech bubble pops in and Robot waves energetically (1200ms)
    const timer2 = setTimeout(() => {
      setGreetingState('visible');
      setIsWaving(true);
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 500);
    }, 1250);

    // Step 4: Settle wave after 2.4s of friendly waving
    const timer3 = setTimeout(() => {
      setIsWaving(false);
    }, 3800);

    // Step 5 & 6: Gentle bounce and smooth exit after user has had time to read (6.8s)
    const timer4 = setTimeout(() => {
      setIsBouncing(true);
      setGreetingState('exiting');
      setTimeout(() => setIsBouncing(false), 450);
    }, 7600);

    // Step 7: Settle into hidden idle
    const timer5 = setTimeout(() => {
      setGreetingState('hidden');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ucp_greeting_seen', 'true');
      }
    }, 8100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  // 3. Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // 4. Focus input when chat opens & dismiss greeting
  useEffect(() => {
    if (isOpen) {
      setGreetingState('hidden');
      setIsWaving(false);
      setIsHappy(true);
      const happyTimer = setTimeout(() => setIsHappy(false), 1400);
      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => {
        clearTimeout(happyTimer);
        clearTimeout(focusTimer);
      };
    }
  }, [isOpen]);

  // Handle manual dismissal of greeting
  const handleDismissGreeting = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setHasDismissedGreeting(true);
    setGreetingState('exiting');
    setIsWaving(false);
    if (greetingTimerRef.current) clearTimeout(greetingTimerRef.current);
    setTimeout(() => {
      setGreetingState('hidden');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ucp_greeting_seen', 'true');
      }
    }, 350);
  }, []);

  // Handle clicking speech bubble or launcher
  const handleToggleChat = () => {
    setIsOpen((prev) => !prev);
    setGreetingState('hidden');
    setIsWaving(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ucp_greeting_seen', 'true');
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    setInputValue('');
    setGreetingState('hidden');
    setIsWaving(false);

    // Mascot acknowledgement bounce when user sends a message
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);

    const userMsgId = `user-${Date.now()}`;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessages: Message[] = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: query,
        time: currentTime
      }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    const conversationHistory = newMessages.slice(-6).map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('model' as const),
      text: m.text
    }));

    // Step 1: Check for affirmative response to "Would you like me to open admission form?"
    const lowerQuery = query.toLowerCase().trim();
    const isAffirmative = /^(yes|open|open form|open admission|open admission form|yes please|sure|please open|haan|khol do|admissions form)/i.test(lowerQuery);
    const hasAdmissionContext = conversationHistory.some(m => 
      m.text.toLowerCase().includes('open admission form') || 
      m.text.toLowerCase().includes('admission')
    );

    if (isAffirmative && hasAdmissionContext) {
      if (typeof window !== 'undefined') {
        window.open('https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F', '_blank');
      }
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "Opening the official UCP online admission portal for you right now 📝✨ Best of luck with your application!",
          time: currentTime,
          actionLink: { label: "Open Admission Portal 🚀", url: "https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F" },
          suggestions: ["Eligibility Criteria 📋", "Fee Structure 💰", "Degree Programmes 🎓"],
          isStreaming: true
        }
      ]);
      setIsLoading(false);
      setIsHappy(true);
      setIsBouncing(true);
      setTimeout(() => {
        setIsHappy(false);
        setIsBouncing(false);
      }, 1500);
      return;
    }

    // Step 2: FIRST SEARCH IN ucp-knowledge.js (TRAINED LOGIC - NO API NEEDED FIRST)
    const { match, confidence } = searchUcpKnowledge(query);

    if (match && confidence >= 20) {
      let botReplyText = match.answer;
      let actionLink = match.actionLink;
      let suggestions = match.suggestions;

      // If someone asks admission, also ask "Would you like me to open admission form?"
      if (match.isAdmissionRelated && !botReplyText.includes("open admission form")) {
        botReplyText += "\n\nWould you like me to open admission form?";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botReplyText,
          time: currentTime,
          actionLink,
          suggestions,
          isStreaming: true
        }
      ]);
      setIsLoading(false);
      setIsHappy(true);
      setIsBouncing(true);
      setTimeout(() => {
        setIsHappy(false);
        setIsBouncing(false);
      }, 1500);
      return;
    }

    // Step 3: GEMINI FOR ALL WORLD QUESTIONS & BACKUP
    let botReplyText = '';
    let actionLink: { label: string; url: string } | undefined;
    let suggestions: string[] | undefined;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: conversationHistory
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.reply) {
          botReplyText = data.reply;
          suggestions = data.suggestions;
          actionLink = data.actionLink;
        }
      }
    } catch {
      // Live API call timed out or network error
    }

    // Step 4: If Gemini API fails or key breaks, show friendly message:
    if (!botReplyText) {
      const localResult = getInstantBotResponse(query);
      botReplyText = localResult.reply;
      actionLink = localResult.actionLink;
      suggestions = localResult.suggestions;
    }

    const botMsgId = `bot-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: botMsgId,
        sender: 'bot',
        text: botReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLink,
        suggestions,
        isStreaming: true
      }
    ]);
    setIsLoading(false);

    // Mascot responds happily upon receiving answer: happy eyes & joyful bounce
    setIsHappy(true);
    setIsBouncing(true);
    setTimeout(() => {
      setIsHappy(false);
      setIsBouncing(false);
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    setIsHappy(true);
    setTimeout(() => setIsHappy(false), 1200);
  };

  return (
    <>
      {/* =========================================================================
          1. CHAT WINDOW MODAL (Spacious, modern ChatGPT-style, big enough to view all text comfortably)
          ========================================================================= */}
      {isOpen && (
        <div 
          className={`fixed z-50 bg-white rounded-2xl shadow-[0_24px_64px_rgba(10,25,49,0.32)] border border-slate-300 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 select-text transition-all ${
            isExpanded
              ? 'inset-2 sm:inset-4 md:inset-8 w-auto h-auto max-h-none'
              : 'bottom-[96px] sm:bottom-[110px] right-2 sm:right-6 w-[96vw] sm:w-[620px] md:w-[740px] lg:w-[840px] h-[700px] sm:h-[750px] max-h-[88vh]'
          }`}
          role="dialog"
          aria-label="UCP Assistant Chat Window"
        >
          {/* Header - Official UCP Navy with Live Robot Mascot Header Icon */}
          <div className="bg-[#0A1931] text-white px-4 py-3 flex items-center justify-between border-b border-[#C8102E]/60 shadow-xs">
            <div className="flex items-center gap-3">
              {/* Animated Mini Mascot inside Header */}
              <div className="relative w-10 h-10 rounded-xl bg-[#071326] border border-[#1E3A66] flex items-center justify-center p-0.5 overflow-hidden shrink-0 shadow-inner">
                <UcpRobotMascot 
                  size={36} 
                  isBlinking={isBlinking} 
                  isThinking={isLoading} 
                  isHappy={isHappy} 
                  showTorso={false} 
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Inter',system-ui,-apple-system,sans-serif] text-[15px] font-bold text-white tracking-tight leading-none m-0 p-0">
                    UCP Assistant
                  </h3>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/15 text-emerald-400 text-[10px] font-mono rounded font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                  Official Bahawalpur Campus AI
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title={isExpanded ? "Collapse to standard size" : "Maximize screen size"}
                aria-label={isExpanded ? "Collapse chat" : "Maximize chat"}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Restart chat"
                aria-label="Restart conversation"
              >
                <RefreshCw size={14} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-0.5"
                title="Close chat"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Thread / Center ChatGPT Start Screen */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAFBFD] text-xs flex flex-col">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-3 text-center my-auto animate-in fade-in zoom-in-95 duration-200">
                {/* Robot Icon / Mascot */}
                <div className="relative w-15 h-15 rounded-2xl bg-gradient-to-b from-[#0F223F] to-[#0A1931] border border-slate-700/60 shadow-lg flex items-center justify-center mb-3.5 p-1">
                  <UcpRobotMascot 
                    size={48} 
                    isBlinking={isBlinking} 
                    isHappy={isHappy} 
                    showTorso={false} 
                  />
                  <div className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-[#C8102E] text-white text-[9px] font-mono font-bold rounded-full border border-white/60">
                    AI
                  </div>
                </div>

                {/* Big One Center Message like ChatGPT */}
                <h2 className="font-['Inter',system-ui,-apple-system,sans-serif] text-xl sm:text-2xl font-bold text-[#0A1931] tracking-tight leading-tight m-0">
                  Hi, how can I help you today?
                </h2>
                <p className="font-sans text-xs text-slate-500 mt-2 max-w-[310px] leading-relaxed">
                  Ask me anything about degree programs, admissions, fee structure, scholarships, or campus facilities at UCP Bahawalpur.
                </p>

                {/* ChatGPT-style Quick Prompt Cards (Responsive 4 columns on large modal) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 w-full mt-6 text-left font-sans">
                  <button
                    type="button"
                    onClick={() => handleSendMessage("What degree programs are offered?")}
                    className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0A1931] rounded-xl text-left transition-all shadow-2xs group cursor-pointer"
                  >
                    <span className="block text-sm mb-0.5">🎓</span>
                    <span className="font-semibold text-xs text-slate-800 block group-hover:text-[#0A1931] leading-tight">Degree Programs</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">BS &amp; ADP options</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage("Tell me about ADP Artificial Intelligence")}
                    className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0A1931] rounded-xl text-left transition-all shadow-2xs group cursor-pointer"
                  >
                    <span className="block text-sm mb-0.5">🤖</span>
                    <span className="font-semibold text-xs text-slate-800 block group-hover:text-[#0A1931] leading-tight">ADP AI</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">75 CH AI curriculum</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage("What is the fee structure and installments?")}
                    className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0A1931] rounded-xl text-left transition-all shadow-2xs group cursor-pointer"
                  >
                    <span className="block text-sm mb-0.5">💰</span>
                    <span className="font-semibold text-xs text-slate-800 block group-hover:text-[#0A1931] leading-tight">Fee Structure</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Installment breakdown</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage("What scholarships are available?")}
                    className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0A1931] rounded-xl text-left transition-all shadow-2xs group cursor-pointer"
                  >
                    <span className="block text-sm mb-0.5">🏆</span>
                    <span className="font-semibold text-xs text-slate-800 block group-hover:text-[#0A1931] leading-tight">Scholarships</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Up to 50% on merit</span>
                  </button>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isLatestBot = msg.sender === 'bot' && index === messages.length - 1 && msg.isStreaming;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                  >
                    {/* Sender & Timestamp */}
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1 font-sans">
                      <span className="font-semibold text-slate-500">
                        {msg.sender === 'bot' ? 'UCP Assistant' : 'You'}
                      </span>
                      <span>•</span>
                      <span>{msg.time}</span>
                    </div>

                    {/* Message Bubble - Neat Rectangle ChatGPT-style (Wide and comfortable) */}
                    <div
                      className={`max-w-[95%] sm:max-w-[92%] rounded-xl px-4 py-3 leading-relaxed whitespace-pre-wrap break-words text-[13.5px] sm:text-[14px] ${
                        msg.sender === 'user'
                          ? 'bg-[#0A1931] text-white font-sans shadow-xs'
                          : 'bg-white text-slate-800 border border-slate-200 shadow-xs font-sans'
                      }`}
                    >
                      {msg.sender === 'bot' && isLatestBot ? (
                        <TypingMessageText 
                          fullText={msg.text} 
                          isAnimated={true}
                          onDone={() => {
                            msg.isStreaming = false;
                          }} 
                        />
                      ) : (
                        msg.text
                      )}

                      {/* Action link */}
                      {msg.actionLink && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100">
                          <a
                            href={msg.actionLink.url}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#C8102E] hover:underline"
                          >
                            {msg.actionLink.label} <ExternalLink size={12} />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Suggestions Chips */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1 max-w-[92%]">
                        {msg.suggestions.map((sug, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(sug.replace(/[^\w\s&]/gi, '').trim())}
                            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 shadow-2xs hover:border-[#C8102E]"
                          >
                            <span>{sug}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Fast loading indicator with thinking robot */}
            {isLoading && (
              <div className="flex items-center gap-2.5 text-slate-500 text-xs px-2 py-1">
                <div className="w-6 h-6 rounded-md bg-[#0A1931] flex items-center justify-center text-white shrink-0">
                  <UcpRobotMascot size={22} isThinking={true} showTorso={false} />
                </div>
                <div className="flex items-center gap-1.5 font-sans text-[11px] text-slate-500">
                  <span>UCP Assistant is typing</span>
                  <span className="inline-flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#C8102E] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 rounded-full bg-[#0A1931] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 rounded-full bg-[#38BDF8] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Pill Strip */}
          <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            <span className="text-slate-400 flex items-center gap-1 shrink-0 text-[10px] font-mono font-semibold">
              <Zap size={11} className="text-[#C8102E]" /> Quick:
            </span>
            <button
              onClick={() => handleSendMessage("What degree programs are offered?")}
              className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md whitespace-nowrap hover:bg-slate-100 hover:border-[#0A1931] cursor-pointer font-sans"
            >
              Programs
            </button>
            <button
              onClick={() => handleSendMessage("Tell me about ADP Artificial Intelligence")}
              className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md whitespace-nowrap hover:bg-slate-100 hover:border-[#0A1931] cursor-pointer font-sans"
            >
              ADP AI
            </button>
            <button
              onClick={() => handleSendMessage("What is the fee structure?")}
              className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md whitespace-nowrap hover:bg-slate-100 hover:border-[#0A1931] cursor-pointer font-sans"
            >
              Fees
            </button>
            <button
              onClick={() => handleSendMessage("How much scholarship can I get?")}
              className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md whitespace-nowrap hover:bg-slate-100 hover:border-[#0A1931] cursor-pointer font-sans"
            >
              Scholarships
            </button>
            <button
              onClick={() => handleSendMessage("What is the admission eligibility?")}
              className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md whitespace-nowrap hover:bg-slate-100 hover:border-[#0A1931] cursor-pointer font-sans"
            >
              Eligibility
            </button>
          </div>

          {/* ChatGPT-style neat rectangular input bar */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message UCP Assistant..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#0A1931] focus:bg-white text-slate-800 placeholder-slate-400 font-sans transition-all"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-[#0A1931] hover:bg-[#C8102E] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs disabled:cursor-not-allowed shrink-0 active:scale-95"
                aria-label="Send Message"
              >
                <Send size={15} />
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-0.5 font-sans">
              <span>Instant Verified Responses</span>
              <span>UCP Bahawalpur</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. FLOATING ROBOT LAUNCHER & SNAPCHAT-STYLE ANIMATED GREETING BUBBLE
          ========================================================================= */}
      <div 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-7 lg:right-7 z-50 flex items-center pointer-events-auto m-2 sm:m-0"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
        }}
      >
        {/* Snapchat-Style Floating Animated Greeting Bubble */}
        {!isOpen && !hasDismissedGreeting && (greetingState === 'entering' || greetingState === 'visible' || greetingState === 'exiting') && (
          <div
            onClick={handleToggleChat}
            className={`relative mr-2.5 sm:mr-4 cursor-pointer select-none hidden sm:block ${
              greetingState === 'exiting' ? 'ucp-speech-bubble-exit' : 'ucp-speech-bubble-enter'
            }`}
            title="Click to chat with UCP Assistant"
            role="alert"
          >
            {/* Speech Bubble Container */}
            <div className="bg-white text-[#0A1931] px-4 py-3 rounded-2xl shadow-[0_12px_36px_rgba(10,25,49,0.22)] border-2 border-slate-200/90 hover:border-[#C8102E] transition-all duration-200 max-w-[230px] sm:max-w-[270px] relative group">
              
              {/* Triangular Speech Pointer Tail pointing into Robot */}
              <div 
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-t-2 border-r-2 border-slate-200/90 rotate-45 group-hover:border-[#C8102E] transition-colors"
                aria-hidden="true"
              />

              {/* Close Button */}
              <button
                type="button"
                onClick={handleDismissGreeting}
                className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-slate-100 hover:bg-[#C8102E] text-slate-500 hover:text-white border border-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                title="Dismiss greeting"
                aria-label="Dismiss greeting message"
              >
                <X size={10} />
              </button>

              {/* Greeting Content */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-[13px] text-[#0A1931] leading-tight">
                  <span>Hi there! 👋</span>
                </div>
                <p className="font-bold text-xs sm:text-[13px] text-[#0A1931] leading-snug">
                  I&apos;m your UCP Assistant!
                </p>
                <p className="text-[10.5px] sm:text-[11.5px] font-medium text-slate-500 pt-0.5 leading-tight flex items-center gap-1">
                  <Sparkles size={11} className="text-[#C8102E] shrink-0" />
                  <span>Need help exploring UCP?</span>
                </p>
              </div>

              {/* Click prompt indicator */}
              <div className="mt-1.5 pt-1 border-t border-slate-100 text-[9.5px] font-semibold text-[#C8102E] flex items-center justify-between">
                <span>Tap to start chat</span>
                <span className="font-bold">→</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            PROMINENT ENLARGED FLOATING ROBOT LAUNCHER BUTTON
            Desktop: ~84-88px diameter | Mobile: 48px diameter (w-12 h-12)
            ========================================================================= */}
        <button
          id="ucp-assistant-floating-launcher"
          onClick={handleToggleChat}
          className={`group relative rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#C8102E]/30 select-none ${
            isOpen
              ? 'w-12 h-12 sm:w-16 sm:h-16 bg-[#C8102E] hover:bg-[#A51C30] text-white shadow-[0_10px_30px_rgba(200,16,46,0.4)] rotate-90 scale-95'
              : 'w-12 h-12 sm:w-[82px] sm:h-[82px] lg:w-[88px] lg:h-[88px] bg-gradient-to-b from-[#0F223F] via-[#0A1931] to-[#061121] text-white hover:scale-105 active:scale-95 border-2 border-slate-600/80 hover:border-[#C8102E] shadow-[0_12px_40px_rgba(10,25,49,0.5)] ucp-robot-halo'
          } ${!isOpen && !isWaving ? 'ucp-robot-float' : ''} ${isBouncing ? 'ucp-robot-bounce' : ''}`}
          aria-label={isOpen ? "Close UCP Assistant" : "Open UCP Assistant — Campus AI Chatbot"}
          title={isOpen ? "Close UCP Assistant" : "Chat with UCP Assistant"}
        >
          {isOpen ? (
            /* Clean Close Cross */
            <X size={20} className="text-white drop-shadow-md" />
          ) : (
            /* Large Visible Cute Robot Mascot */
            <div className={`relative w-full h-full flex items-center justify-center p-1 sm:p-1.5 ${!isWaving ? 'ucp-robot-tilt' : ''}`}>
              
              {/* Mascot Vector Illustration peeking inside circular badge */}
              <UcpRobotMascot 
                size={74}
                className="w-8 h-8 sm:w-[74px] sm:h-[74px] lg:w-[80px] lg:h-[80px] transition-transform duration-200 group-hover:scale-105"
                isWaving={isWaving}
                isBlinking={isBlinking}
                isThinking={isLoading}
                isHappy={isHappy}
                showTorso={true}
              />

              {/* UCP Crimson AI Badge Pin on Top Right */}
              <div 
                className="absolute -top-1 -right-1 sm:top-0 sm:right-0 px-1 sm:px-2 py-0.5 bg-[#C8102E] text-white font-mono font-bold text-[7.5px] sm:text-[9px] rounded-full border border-white/70 shadow-md flex items-center gap-0.5"
                aria-hidden="true"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span>AI</span>
              </div>
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default UcpChatbot;
