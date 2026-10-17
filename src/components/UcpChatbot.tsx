import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Send, RefreshCw, Bot, 
  ExternalLink, Zap, ChevronRight
} from 'lucide-react';
import { getInstantBotResponse } from '../utils/ucpBotKnowledge';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actionLink?: { label: string; url: string };
  suggestions?: string[];
  isStreaming?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: "👋 Assalam-o-Alaikum! I'm **UCP Bot**, your official assistant for **UCP Bahawalpur Campus** 🎓.\n\nAsk me anything about our 27 degree programs, fee plans, admissions, eligibility, or scholarships — I respond instantly with verified campus information!",
    time: 'Just now',
    suggestions: [
      "Degree Programs 🎓",
      "ADP Artificial Intelligence 🤖",
      "Fee Structure 💰",
      "Scholarships 🏆",
      "Admission Eligibility 📋",
      "Contact & Location 📍"
    ]
  }
];

// Typewriter / Typing animation component for smooth, visible text reveal
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

    // Fast typing speed: 3-5 chars every 14ms for brisk, responsive ChatGPT-like feel
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
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasPromptTooltip, setHasPromptTooltip] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Auto-dismiss tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPromptTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    setInputValue('');
    setHasPromptTooltip(false);

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

    let botReplyText = '';
    let actionLink: { label: string; url: string } | undefined;
    let suggestions: string[] | undefined;

    // Fast call with 2.8 second timeout fallback so user NEVER waits
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2800);

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
        }
      }
    } catch {
      // Immediate silent fallback to instant campus knowledge engine
    }

    // Local instant knowledge fallback if server is slow or offline
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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* =========================================================================
          1. CHAT WINDOW MODAL (Clean, neat rectangle ChatGPT-style, official colors)
          ========================================================================= */}
      {isOpen && (
        <div 
          className="fixed bottom-22 right-4 sm:right-6 z-50 w-[94vw] sm:w-[410px] h-[550px] max-h-[82vh] bg-white rounded-2xl shadow-[0_20px_60px_rgba(10,25,49,0.22)] border border-slate-300/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 select-text"
          role="dialog"
          aria-label="UCP Bot Assistant"
        >
          {/* Header - Official UCP Navy, minimal and decent */}
          <div className="bg-[#0A1931] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#A51C30]/40">
            <div className="flex items-center gap-2.5">
              {/* Minimal Bot Icon */}
              <div className="w-8 h-8 rounded-lg bg-[#142C4E] border border-slate-700/60 flex items-center justify-center text-[#C5A880]">
                <Bot size={18} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white tracking-tight">UCP Bot</h3>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/15 text-emerald-400 text-[10px] font-mono rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Official Bahawalpur Campus Assistant
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Restart chat"
                aria-label="Restart conversation"
              >
                <RefreshCw size={14} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-0.5"
                title="Close chat"
                aria-label="Close Chat"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAFBFD] text-xs">
            {messages.map((msg, index) => {
              const isLatestBot = msg.sender === 'bot' && index === messages.length - 1 && msg.isStreaming;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                >
                  {/* Sender & Timestamp */}
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1 font-sans">
                    <span className="font-medium text-slate-500">
                      {msg.sender === 'bot' ? 'UCP Bot' : 'You'}
                    </span>
                    <span>•</span>
                    <span>{msg.time}</span>
                  </div>

                  {/* Message Bubble - Neat Rectangle ChatGPT-style */}
                  <div
                    className={`max-w-[88%] rounded-xl px-3.5 py-2.5 leading-relaxed whitespace-pre-wrap break-words text-[13px] ${
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
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A51C30] hover:underline"
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
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                          <span>{sug}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Fast loading indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs px-2 py-1">
                <div className="w-5 h-5 rounded-md bg-[#0A1931] flex items-center justify-center text-white">
                  <Bot size={13} className="animate-spin" />
                </div>
                <span className="font-sans text-[11px] text-slate-500">
                  UCP Bot is typing...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Pill Strip */}
          <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            <span className="text-slate-400 flex items-center gap-1 flex-shrink-0 text-[10px] font-mono">
              <Zap size={11} className="text-[#C5A880]" /> Quick:
            </span>
            <button
              onClick={() => handleSendMessage("What degree programs are offered?")}
              className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md whitespace-nowrap hover:bg-slate-100 cursor-pointer font-sans"
            >
              Programs
            </button>
            <button
              onClick={() => handleSendMessage("Tell me about ADP Artificial Intelligence")}
              className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md whitespace-nowrap hover:bg-slate-100 cursor-pointer font-sans"
            >
              ADP AI
            </button>
            <button
              onClick={() => handleSendMessage("What is the fee structure?")}
              className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md whitespace-nowrap hover:bg-slate-100 cursor-pointer font-sans"
            >
              Fees
            </button>
            <button
              onClick={() => handleSendMessage("How much scholarship can I get?")}
              className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md whitespace-nowrap hover:bg-slate-100 cursor-pointer font-sans"
            >
              Scholarships
            </button>
            <button
              onClick={() => handleSendMessage("What is the admission eligibility?")}
              className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md whitespace-nowrap hover:bg-slate-100 cursor-pointer font-sans"
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
                placeholder="Message UCP Bot..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#0A1931] focus:bg-white text-slate-800 placeholder-slate-400 font-sans transition-all"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-[#0A1931] hover:bg-[#142C4E] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs disabled:cursor-not-allowed flex-shrink-0 active:scale-95"
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
          2. FLOATING BOT LAUNCHER BUTTON (Bottom-Right, Under Contact/WhatsApp Icon)
          ========================================================================= */}
      <div className="fixed bottom-5 right-5 sm:right-6 z-50 flex items-center">
        {/* Tooltip on First Visit */}
        {hasPromptTooltip && !isOpen && (
          <div className="mr-3 bg-[#0A1931] text-white text-xs px-3.5 py-2 rounded-xl shadow-xl border border-slate-700 font-medium flex items-center gap-2 animate-in fade-in slide-in-from-right-3 duration-200">
            <span className="text-sm">👋</span>
            <div>
              <p className="font-semibold text-white text-[11px] leading-tight">UCP Bot</p>
              <p className="text-[10px] text-slate-300">Ask about programs & admissions</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasPromptTooltip(false);
              }}
              className="text-slate-400 hover:text-white p-0.5 ml-1 cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* Small beautiful cute button: neat, decent, official color */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasPromptTooltip(false);
          }}
          className={`group relative w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center shadow-[0_6px_24px_rgba(10,25,49,0.3)] transition-all duration-200 cursor-pointer focus:outline-none ${
            isOpen 
              ? 'bg-[#A51C30] text-white rotate-90 scale-95' 
              : 'bg-[#0A1931] hover:bg-[#142C4E] text-[#C5A880] hover:scale-105 active:scale-95 border border-[#C5A880]/60'
          }`}
          aria-label="Open UCP Bot Chat"
          title="UCP Bot — Campus Assistant"
        >
          {isOpen ? (
            <X size={20} className="relative z-10" />
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <Bot size={22} className="text-[#C5A880]" />
              <span className="absolute -top-2 -right-2 px-1 py-0.2 bg-[#A51C30] text-white text-[8px] font-bold rounded font-mono shadow-xs">
                BOT
              </span>
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default UcpChatbot;
