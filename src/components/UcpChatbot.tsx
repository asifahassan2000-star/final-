import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, Send, RefreshCw, Bot, 
  ExternalLink, Zap, Sparkles,
  Maximize2, Minimize2, ChevronLeft, ChevronRight,
  Mic, MicOff, Square
} from 'lucide-react';
import { getInstantBotResponse, getAttributionResponse, QUICK_ACTION_RESPONSES, BotResponse } from '../utils/ucpBotKnowledge';
import { UcpRobotMascot, RobotAnimationState } from './UcpRobotMascot';
import { ChatMessageMarkdown } from './ChatMessageMarkdown';

// In-memory cache for instant repeated query responses (0ms)
const queryCache = new Map<string, BotResponse>();

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

export interface QuickActionItem {
  id: string;
  label: string;
  icon: string;
  query: string;
}

export const QUICK_ACTIONS: QuickActionItem[] = [
  { id: 'fee', label: 'View Fee', icon: '💰', query: 'What is the fee structure and semester installment breakdown at UCP Bahawalpur?' },
  { id: 'admissions', label: 'Admissions', icon: '📝', query: 'How can I apply for admission at UCP Bahawalpur and what is the process?' },
  { id: 'library', label: 'Library & Card', icon: '📚', query: 'How can I get a library card at UCP Bahawalpur and what are the book borrowing rules?' },
  { id: 'faculty', label: 'Faculty', icon: '👨‍🏫', query: 'Tell me about the faculty members, professors, and teaching staff at UCP Bahawalpur.' },
  { id: 'leadership', label: 'Leadership', icon: '🏛️', query: 'Who are the campus leaders, principal, and administrators of UCP Bahawalpur?' },
  { id: 'programmes', label: 'Programmes', icon: '🎓', query: 'What degree programmes and associate degrees are offered at UCP Bahawalpur?' },
  { id: 'scholarship', label: 'Scholarship', icon: '🏆', query: 'What merit scholarships, PGC alumni discounts, and concessions are available?' },
  { id: 'scope', label: 'Scope of All Programmes', icon: '📈', query: 'What is the career scope, future demand, and job opportunities for all programmes?' },
  { id: 'eligibility', label: 'Eligibility', icon: '📋', query: 'What is the admission eligibility criteria and minimum percentage required?' },
  { id: 'legacy', label: 'Legacy', icon: '⭐', query: 'Tell me about the legacy, history, and achievements of UCP and Punjab Group of Colleges.' },
  { id: 'adp-ai', label: 'ADP AI', icon: '🤖', query: 'Tell me about the ADP Artificial Intelligence degree programme curriculum and career paths.' },
  { id: 'calendar', label: 'Academic Calendar', icon: '📅', query: 'What are the official dates for Fall 2026 semester, midterms, finals, holidays, and results?' },
  { id: 'facilities', label: 'Facilities', icon: '🔬', query: 'What computing labs, transport buses, library, and campus facilities are available?' }
];

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

interface UcpChatbotProps {
  onNavigate?: (url: string, options?: { programId?: string; category?: string; sectionId?: string }) => void;
}

export const UcpChatbot: React.FC<UcpChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleActionClick = (url: string) => {
    if (!url) return;
    setIsOpen(false);

    if (onNavigate) {
      onNavigate(url);
      return;
    }

    if (typeof window !== 'undefined') {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        window.open(url, '_blank', 'noopener,noreferrer');
        return;
      }
      if (typeof (window as any).__ucpNavigate === 'function') {
        (window as any).__ucpNavigate(url);
      } else {
        window.dispatchEvent(new CustomEvent('ucp-navigate', { detail: { url } }));
        window.location.hash = url.startsWith('#') ? url : `#${url}`;
      }
    }
  };

  // Mascot interactive animation states
  const [isWaving, setIsWaving] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [greetingState, setGreetingState] = useState<'hidden' | 'entering' | 'visible' | 'exiting'>('hidden');
  const [hasDismissedGreeting, setHasDismissedGreeting] = useState(false);

  // Real Chatbot Status States (Listening, Typing, Thinking, Responding, Success, Unavailable)
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isStreamingActive, setIsStreamingActive] = useState(false);
  const [isSuccessState, setIsSuccessState] = useState(false);
  const [isUnavailableState, setIsUnavailableState] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Professional Voice Input & Speech Recognition States (English, Urdu & Roman Urdu)
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceLang, setVoiceLang] = useState<'en-US' | 'ur-PK'>('en-US');
  const [, setInterimTranscript] = useState('');
  const preVoiceTextRef = useRef<string>('');
  const recognitionInstanceRef = useRef<any>(null);
  const voiceErrorTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showVoiceError = (msg: string) => {
    setVoiceError(msg);
    if (voiceErrorTimerRef.current) clearTimeout(voiceErrorTimerRef.current);
    voiceErrorTimerRef.current = setTimeout(() => {
      setVoiceError(null);
    }, 6000);
  };

  const startVoiceRecording = (langOverride?: 'en-US' | 'ur-PK') => {
    const targetLang = langOverride || voiceLang;
    const SpeechRecognition = typeof window !== 'undefined'
      ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      : null;

    if (!SpeechRecognition) {
      showVoiceError("Speech recognition is not supported in this browser. Please type your query or try Google Chrome, Microsoft Edge, or Safari.");
      return;
    }

    // Stop any existing instance cleanly
    if (recognitionInstanceRef.current) {
      try {
        recognitionInstanceRef.current.abort();
      } catch {}
      recognitionInstanceRef.current = null;
    }

    setVoiceError(null);
    preVoiceTextRef.current = inputValue;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = targetLang;

      recognition.onstart = () => {
        setIsVoiceRecording(true);
        setInterimTranscript('');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = 0; i < event.results.length; i++) {
          const item = event.results[i];
          const transcriptPart = item[0]?.transcript || '';
          if (item.isFinal) {
            final += transcriptPart + ' ';
          } else {
            interim += transcriptPart;
          }
        }

        const prefix = preVoiceTextRef.current ? preVoiceTextRef.current.trim() + ' ' : '';
        const speechOutput = (final + interim).trim();
        const combined = `${prefix}${speechOutput}`.trim();
        if (combined) {
          setInputValue(combined);
          setIsUserTyping(true);
        }
        setInterimTranscript(interim);
      };

      recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          showVoiceError("Microphone access was denied. Please allow microphone permissions in your browser address bar.");
        } else if (event.error === 'no-speech') {
          showVoiceError("No speech detected. Please speak closer to your microphone.");
        } else if (event.error === 'network') {
          showVoiceError("Network issue during speech recognition. Please verify your internet connection.");
        } else if (event.error === 'audio-capture') {
          showVoiceError("No microphone found. Please connect a microphone and try again.");
        } else if (event.error !== 'aborted') {
          showVoiceError(`Voice recognition: ${event.error}. Please try again or type your message.`);
        }
        setIsVoiceRecording(false);
        setInterimTranscript('');
      };

      recognition.onend = () => {
        setIsVoiceRecording(false);
        setInterimTranscript('');
      };

      recognitionInstanceRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition start failed:', err);
      showVoiceError("Unable to activate speech recognition. Please try typing your query.");
      setIsVoiceRecording(false);
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionInstanceRef.current) {
      try {
        recognitionInstanceRef.current.stop();
      } catch {}
      recognitionInstanceRef.current = null;
    }
    setIsVoiceRecording(false);
    setInterimTranscript('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const cancelVoiceRecording = () => {
    if (recognitionInstanceRef.current) {
      try {
        recognitionInstanceRef.current.abort();
      } catch {}
      recognitionInstanceRef.current = null;
    }
    setInputValue(preVoiceTextRef.current);
    setIsVoiceRecording(false);
    setInterimTranscript('');
    setVoiceError(null);
  };

  // Derive responsive robot animation state strictly tied to actual chatbot status
  const currentRobotState: RobotAnimationState = (() => {
    if (isUnavailableState) return 'unavailable';
    if (isSuccessState || isHappy) return 'success';
    if (isStreamingActive) return 'responding';
    if (isLoading) return 'thinking';
    if (isVoiceRecording) return 'listening';
    if (isUserTyping) return 'typing';
    if (isInputFocused) return 'listening';
    return 'idle';
  })();

  // Clean up recognition sessions on unmount or chat toggle
  useEffect(() => {
    return () => {
      if (recognitionInstanceRef.current) {
        try {
          recognitionInstanceRef.current.abort();
        } catch {}
        recognitionInstanceRef.current = null;
      }
      if (voiceErrorTimerRef.current) {
        clearTimeout(voiceErrorTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen && isVoiceRecording) {
      cancelVoiceRecording();
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (val.trim().length > 0) {
      setIsUserTyping(true);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => {
        setIsUserTyping(false);
      }, 1100);
    } else {
      setIsUserTyping(false);
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const quickActionsRef = useRef<HTMLDivElement>(null);
  const greetingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleScrollQuickActions = (direction: 'left' | 'right') => {
    if (quickActionsRef.current) {
      quickActionsRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth'
      });
    }
  };

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

  // 2. Beautiful visitor entrance greeting & waving sequence on the home page (RUNS ONCE AT START)
  const hasGreetedRef = useRef(false);

  useEffect(() => {
    if (hasGreetedRef.current) return;
    hasGreetedRef.current = true;

    // Step 1: Mascot rises into view when visitor arrives (600ms)
    const timer1 = setTimeout(() => {
      setGreetingState('entering');
    }, 600);

    // Step 2: Speech bubble appears and Robot waves hand beautifully to greet visitor (950ms)
    const timer2 = setTimeout(() => {
      setGreetingState('visible');
      setIsWaving(true);
      setIsHappy(true);
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 500);
    }, 950);

    // Step 3: Welcoming wave continues for 3.6s, then arm gently rests (one-time greeting at start)
    const timer3 = setTimeout(() => {
      setIsWaving(false);
      setIsHappy(false);
    }, 4500);

    // Step 4: Gracefully fade greeting bubble after visitor has read it (8.5s)
    const timer4 = setTimeout(() => {
      setGreetingState('exiting');
    }, 8500);

    // Step 5: Settle into idle state (8.9s)
    const timer5 = setTimeout(() => {
      setGreetingState('hidden');
    }, 8950);

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

  // 4. Wave hand at start, focus input & dismiss greeting
  useEffect(() => {
    if (isOpen) {
      setGreetingState('hidden');
      setIsWaving(true);
      setIsHappy(true);
      const waveTimer = setTimeout(() => {
        setIsWaving(false);
        setIsHappy(false);
      }, 2600);
      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => {
        clearTimeout(waveTimer);
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

  const handleSendMessage = async (textToSend?: string, quickActionId?: string) => {
    if (isVoiceRecording) {
      stopVoiceRecording();
    }

    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    setInputValue('');
    setIsUserTyping(false);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    setGreetingState('hidden');
    setIsWaving(false);

    // Mascot acknowledgement bounce when user sends a message
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 350);

    const userMsgId = `user-${Date.now()}`;
    const botMsgId = `bot-${Date.now() + 1}`;
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

    const conversationHistory = newMessages.slice(-6).map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('model' as const),
      text: m.text
    }));

    const lowerQuery = query.toLowerCase().trim();

    // Helper: Stream instant response rapidly to UI (0ms network delay, smooth 200ms typewriter)
    const deliverInstantResponse = (botResponse: BotResponse) => {
      setIsLoading(false);
      setIsStreamingActive(true);
      const fullText = botResponse.reply;
      const respActionLink = botResponse.actionLink;
      const respSuggestions = botResponse.suggestions;

      // Add empty bot message
      setMessages([
        ...newMessages,
        {
          id: botMsgId,
          sender: 'bot',
          text: '',
          time: currentTime,
          isStreaming: true
        }
      ]);

      // Ultra-fast character chunk streaming (14-20 chars every 12ms)
      const step = Math.max(14, Math.ceil(fullText.length / 22));
      let currentLen = 0;

      const interval = setInterval(() => {
        currentLen += step;
        if (currentLen >= fullText.length) {
          clearInterval(interval);
          setIsStreamingActive(false);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId
                ? {
                    ...m,
                    text: fullText,
                    isStreaming: false,
                    actionLink: respActionLink,
                    suggestions: respSuggestions
                  }
                : m
            )
          );
          setIsSuccessState(true);
          setIsHappy(true);
          setIsBouncing(true);
          setTimeout(() => {
            setIsSuccessState(false);
            setIsHappy(false);
            setIsBouncing(false);
          }, 1600);
        } else {
          const slice = fullText.slice(0, currentLen);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId
                ? { ...m, text: slice, isStreaming: true }
                : m
            )
          );
        }
      }, 12);
    };

    // 1. Direct Quick Action ID or Quick Action Query matching (INSTANT 0ms)
    const matchedQuickAction = QUICK_ACTIONS.find(
      (qa) =>
        qa.id === quickActionId ||
        qa.query.toLowerCase() === lowerQuery ||
        qa.label.toLowerCase() === lowerQuery ||
        qa.id === lowerQuery
    );

    if (matchedQuickAction && QUICK_ACTION_RESPONSES[matchedQuickAction.id]) {
      deliverInstantResponse(QUICK_ACTION_RESPONSES[matchedQuickAction.id]);
      return;
    }

    // 2. Affirmative response to "Would you like me to open admission form?"
    const isAffirmative = /^(yes|open|open form|open admission|open admission form|yes please|sure|please open|haan|khol do|admissions form)/i.test(lowerQuery);
    const hasAdmissionContext = conversationHistory.some(m => 
      m.text.toLowerCase().includes('open admission form') || 
      m.text.toLowerCase().includes('admission')
    );

    if (isAffirmative && hasAdmissionContext) {
      if (typeof window !== 'undefined') {
        window.open('https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F', '_blank');
      }
      deliverInstantResponse({
        reply: "Opening the official UCP online admission portal for you right now 📝✨ Best of luck with your application!",
        actionLink: { label: "Open Admission Portal 🚀", url: "https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F" },
        suggestions: ["Eligibility Criteria 📋", "Fee Structure 💰", "Degree Programmes 🎓"],
        isOfflineMatch: true
      });
      return;
    }

    // 3. Developer / Builder / Representative attribution question (INSTANT 0ms)
    const attributionCheck = getAttributionResponse(query);
    if (attributionCheck) {
      deliverInstantResponse(attributionCheck);
      return;
    }

    // 4. Instant Knowledge Match for UCP Campus questions (INSTANT 0ms)
    const instantCheck = getInstantBotResponse(query);
    if (instantCheck.isOfflineMatch) {
      deliverInstantResponse(instantCheck);
      return;
    }

    // 5. In-memory Cache check (INSTANT 0ms for repeated queries)
    const cached = queryCache.get(lowerQuery);
    if (cached) {
      deliverInstantResponse(cached);
      return;
    }

    // 6. For open-ended general queries: Fast streaming from server with timeout protection
    setMessages([
      ...newMessages,
      {
        id: botMsgId,
        sender: 'bot',
        text: '',
        time: currentTime,
        isStreaming: true
      }
    ]);
    setIsLoading(true);

    let streamedText = '';
    let actionLink: { label: string; url: string } | undefined;
    let suggestions: string[] | undefined;

    const controller = new AbortController();
    const abortTimeout = setTimeout(() => {
      controller.abort();
    }, 4000);

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: query,
          history: conversationHistory
        })
      });

      clearTimeout(abortTimeout);

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data: ')) {
              const dataStr = trimmed.slice(6).trim();
              if (dataStr === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.text) {
                  streamedText += parsed.text;
                  setIsLoading(false); // First token arrived, stop thinking
                  setIsStreamingActive(true); // Now actively responding
                }
                if (parsed.suggestions) suggestions = parsed.suggestions;
                if (parsed.actionLink) actionLink = parsed.actionLink;
              } catch {
                if (dataStr && dataStr !== '[DONE]') {
                  streamedText += dataStr;
                  setIsLoading(false);
                  setIsStreamingActive(true);
                }
              }

              // Update the streaming message in real-time
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMsgId
                    ? { ...m, text: streamedText, isStreaming: true }
                    : m
                )
              );
            }
          }
        }
      }
    } catch (err) {
      console.warn('Streaming notice or abort timeout:', err);
      setIsUnavailableState(true);
      setTimeout(() => {
        setIsUnavailableState(false);
      }, 2200);
    } finally {
      clearTimeout(abortTimeout);
      setIsStreamingActive(false);
    }

    // Step 7: Fallback if no streamed tokens were received
    if (!streamedText.trim()) {
      const fallback = getInstantBotResponse(query);
      streamedText = fallback.reply;
      suggestions = fallback.suggestions;
      actionLink = fallback.actionLink;
    }

    // Auto-detect admission queries for helpful quick action button
    const lowerReply = streamedText.toLowerCase();
    if (lowerReply.includes('admission') || lowerQuery.includes('admission') || lowerQuery.includes('apply')) {
      if (!actionLink) {
        actionLink = { label: "Open Admission Portal 🚀", url: "https://admissions.ucpcolleges.pgc.edu/login?returnUrl=%2Flogin%3FreturnUrl%3D%252F" };
      }
    }

    // Cache completed result for 0ms repeat queries
    queryCache.set(lowerQuery, {
      reply: streamedText,
      suggestions,
      actionLink,
      isOfflineMatch: false
    });

    setMessages((prev) =>
      prev.map((m) =>
        m.id === botMsgId
          ? {
              ...m,
              text: streamedText,
              isStreaming: false,
              suggestions,
              actionLink
            }
          : m
      )
    );
    setIsLoading(false);
    setIsStreamingActive(false);

    // Check if query was unavailable or successfully delivered
    const hasErrorIndicator = !streamedText.trim() || streamedText.toLowerCase().includes("could not find") || streamedText.toLowerCase().includes("sorry, i couldn't");
    if (hasErrorIndicator) {
      setIsUnavailableState(true);
      setTimeout(() => {
        setIsUnavailableState(false);
      }, 2200);
    } else {
      // Robot success nod & friendly expression
      setIsSuccessState(true);
      setIsHappy(true);
      setIsBouncing(true);
      setTimeout(() => {
        setIsSuccessState(false);
        setIsHappy(false);
        setIsBouncing(false);
      }, 1600);
    }
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

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    if (!linkRegex.test(text)) {
      return text;
    }

    const parts: React.ReactNode[] = [];
    let lastIdx = 0;
    linkRegex.lastIndex = 0;
    let m: RegExpExecArray | null;

    while ((m = linkRegex.exec(text)) !== null) {
      const [full, label, url] = m;
      const idx = m.index;
      if (idx > lastIdx) {
        parts.push(text.slice(lastIdx, idx));
      }
      parts.push(
        <button
          key={`link-${idx}`}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleActionClick(url);
          }}
          className="inline-flex items-center gap-0.5 text-[#0A1931] font-semibold underline underline-offset-2 hover:text-[#1E3A66] cursor-pointer"
        >
          {label}
        </button>
      );
      lastIdx = idx + full.length;
    }

    if (lastIdx < text.length) {
      parts.push(text.slice(lastIdx));
    }

    return parts;
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
          <div className="bg-[#0A1931] text-white px-4 py-3 flex items-center justify-between border-b border-[#1E3A66] shadow-xs">
            <div className="flex items-center gap-3">
              {/* Animated Mini Mascot inside Header */}
              <div className="relative w-10 h-10 rounded-xl bg-[#071326] border border-[#1E3A66] flex items-center justify-center p-0.5 overflow-hidden shrink-0 shadow-inner">
                <UcpRobotMascot 
                  size={36} 
                  state={currentRobotState}
                  isWaving={isWaving}
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
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center my-auto animate-in fade-in duration-200 select-none max-w-lg mx-auto">
                {/* Minimal Waving Mascot */}
                <div className="relative w-14 h-14 rounded-full bg-slate-100/80 border border-slate-200/90 flex items-center justify-center mb-3 shadow-2xs">
                  <UcpRobotMascot 
                    size={46} 
                    state={currentRobotState}
                    isWaving={isWaving}
                    showTorso={false} 
                  />
                </div>

                {/* Professional Minimal Welcome */}
                <h2 className="font-sans text-lg sm:text-xl font-bold text-[#0A1931] tracking-tight leading-snug m-0">
                  Hi, how can I help you?
                </h2>
                <p className="font-sans text-xs text-slate-500 mt-1 max-w-[340px] leading-relaxed">
                  Ask about degree programmes, admissions, fee structures, scholarships, or the Fall 2026 academic calendar.
                </p>

                {/* Minimal, professional prompt pills (clean & restrained, not big boxes) */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5 max-w-md">
                  <button
                    type="button"
                    onClick={() => handleSendMessage("What degree programmes are offered at UCP Bahawalpur?")}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0A1931] rounded-lg text-xs font-medium text-slate-700 transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5 font-sans"
                  >
                    <span>🎓</span>
                    <span>Degree Programmes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage("What is the fee structure and installment breakdown?")}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0A1931] rounded-lg text-xs font-medium text-slate-700 transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5 font-sans"
                  >
                    <span>💰</span>
                    <span>Fee Breakdown</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage("What are the official dates for Fall 2026 academic calendar?")}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0A1931] rounded-lg text-xs font-medium text-slate-700 transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5 font-sans"
                  >
                    <span>📅</span>
                    <span>Academic Calendar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage("How can I apply for admission at UCP Bahawalpur?")}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0A1931] rounded-lg text-xs font-medium text-slate-700 transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5 font-sans"
                  >
                    <span>📝</span>
                    <span>Admissions Process</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage("What merit scholarships and fee concessions are available?")}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0A1931] rounded-lg text-xs font-medium text-slate-700 transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5 font-sans"
                  >
                    <span>🏆</span>
                    <span>Scholarships</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage("How can I get a library card and what are the borrowing rules?")}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0A1931] rounded-lg text-xs font-medium text-slate-700 transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5 font-sans"
                  >
                    <span>📚</span>
                    <span>Library Services</span>
                  </button>
                </div>
              </div>
            ) : (
              messages.map((msg) => {
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
                      className={`max-w-[95%] sm:max-w-[92%] rounded-xl px-4 py-3 leading-relaxed break-words text-[13.5px] sm:text-[14px] ${
                        msg.sender === 'user'
                          ? 'bg-[#0A1931] text-white font-sans shadow-xs whitespace-pre-wrap'
                          : 'bg-white text-slate-800 border border-slate-200 shadow-xs font-sans'
                      }`}
                    >
                      {msg.sender === 'bot' ? (
                        <ChatMessageMarkdown
                          content={msg.text}
                          isStreaming={msg.isStreaming}
                          onActionClick={handleActionClick}
                        />
                      ) : (
                        <span className="whitespace-pre-wrap">{msg.text}</span>
                      )}

                      {/* Action link button - Opens exact page and section */}
                      {msg.actionLink && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleActionClick(msg.actionLink!.url);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0A1931] hover:bg-[#1E3A66] text-white rounded-lg text-[12px] font-semibold tracking-tight shadow-2xs hover:shadow-xs transition-all active:scale-98 cursor-pointer group"
                            title={`Open ${msg.actionLink.label}`}
                          >
                            <span>{msg.actionLink.label}</span>
                            <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                          </button>
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
                            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 shadow-2xs hover:border-[#0A1931]"
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
                  <UcpRobotMascot size={22} state="thinking" showTorso={false} />
                </div>
                <div className="flex items-center gap-1.5 font-sans text-[11px] text-slate-500">
                  <span>UCP Assistant is thinking</span>
                  <span className="inline-flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#0A1931] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 rounded-full bg-[#38BDF8] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Horizontal Scrollable Strip */}
          <div className="bg-slate-50 border-t border-slate-200 px-3 py-2">
            <div className="flex items-center justify-between gap-1 mb-1.5 px-0.5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 select-none">
                <Sparkles size={11} className="text-amber-500 fill-amber-500 animate-pulse" />
                <span>Quick Actions</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleScrollQuickActions('left')}
                  className="w-5 h-5 rounded flex items-center justify-center bg-white hover:bg-slate-200 border border-slate-300 text-slate-600 cursor-pointer transition-colors"
                  aria-label="Scroll quick actions left"
                  title="Scroll left"
                >
                  <ChevronLeft size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollQuickActions('right')}
                  className="w-5 h-5 rounded flex items-center justify-center bg-white hover:bg-slate-200 border border-slate-300 text-slate-600 cursor-pointer transition-colors"
                  aria-label="Scroll quick actions right"
                  title="Scroll right"
                >
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>

            <div 
              ref={quickActionsRef}
              className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 scroll-smooth select-none -mx-1 px-1 touch-pan-x"
            >
              {QUICK_ACTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSendMessage(item.query, item.id)}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-[#0A1931] text-slate-700 hover:text-white border border-slate-200 hover:border-[#0A1931] rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer shrink-0 group disabled:opacity-50 disabled:pointer-events-none font-sans"
                  title={item.query}
                >
                  <span className="text-[12px] group-hover:scale-110 transition-transform leading-none">
                    {item.icon}
                  </span>
                  <span className="text-[11.5px] font-semibold leading-tight">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ChatGPT-style neat rectangular input bar with integrated voice & text */}
          <div className="p-3 bg-white border-t border-slate-200">
            {/* Voice Error Notification Banner */}
            {voiceError && (
              <div className="mb-2 px-3 py-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-start justify-between gap-2 font-sans animate-fadeIn">
                <div className="flex items-start gap-1.5">
                  <MicOff size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight font-medium">{voiceError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setVoiceError(null)}
                  className="text-red-400 hover:text-red-600 cursor-pointer shrink-0 p-0.5"
                  aria-label="Dismiss error"
                >
                  <X size={13} />
                </button>
              </div>
            )}

            {/* Active Voice Listening Banner with animated sound wave bars */}
            {isVoiceRecording && (
              <div className="mb-2 px-3 py-1.5 bg-[#0A1931]/5 border border-[#0A1931]/15 rounded-xl flex items-center justify-between gap-2 font-sans animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C8102E]"></span>
                  </span>
                  <span className="text-[11px] font-semibold text-[#0A1931] tracking-tight">
                    {voiceLang === 'ur-PK' ? 'سن رہے ہیں (اردو)... بولیں' : 'Listening... Speak clearly'}
                  </span>
                  {/* Animated sound wave frequency bars */}
                  <div className="flex items-center gap-0.5 h-4 px-1" aria-hidden="true">
                    <span className="w-0.5 h-2 bg-[#C8102E] rounded-full ucp-sound-wave-bar" style={{ animationDelay: '0ms' }} />
                    <span className="w-0.5 h-3.5 bg-[#0A1931] rounded-full ucp-sound-wave-bar" style={{ animationDelay: '150ms' }} />
                    <span className="w-0.5 h-5 bg-[#C5A059] rounded-full ucp-sound-wave-bar" style={{ animationDelay: '300ms' }} />
                    <span className="w-0.5 h-3 bg-[#0A1931] rounded-full ucp-sound-wave-bar" style={{ animationDelay: '450ms' }} />
                    <span className="w-0.5 h-1.5 bg-[#C8102E] rounded-full ucp-sound-wave-bar" style={{ animationDelay: '600ms' }} />
                  </div>
                </div>

                {/* Cancel & Done controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={cancelVoiceRecording}
                    className="px-2 py-0.5 text-[11px] text-slate-500 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-medium transition-colors cursor-pointer"
                    title="Cancel voice input and revert text"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={stopVoiceRecording}
                    className="px-2 py-0.5 text-[11px] text-white bg-[#0A1931] hover:bg-[#1A335E] rounded-md font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                    title="Finish voice recording & keep transcription"
                  >
                    <Square size={9} className="fill-current" />
                    <span>Done</span>
                  </button>
                </div>
              </div>
            )}

            {/* Input Row: Language Switcher + Text Input + Mic + Send */}
            <div className="flex items-center gap-1.5">
              {/* Language toggle pill: English or Urdu */}
              <div 
                className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-600 select-none shrink-0"
                title="Select Voice Language"
              >
                <button
                  type="button"
                  onClick={() => {
                    setVoiceLang('en-US');
                    if (isVoiceRecording) {
                      startVoiceRecording('en-US');
                    }
                  }}
                  className={`px-1.5 py-1 rounded transition-all cursor-pointer ${
                    voiceLang === 'en-US'
                      ? 'bg-white text-[#0A1931] shadow-2xs font-bold'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="Speech language: English (en-US)"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVoiceLang('ur-PK');
                    if (isVoiceRecording) {
                      startVoiceRecording('ur-PK');
                    }
                  }}
                  className={`px-1.5 py-1 rounded transition-all cursor-pointer font-serif ${
                    voiceLang === 'ur-PK'
                      ? 'bg-white text-[#0A1931] shadow-2xs font-bold'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="Speech language: Urdu / Roman Urdu (ur-PK)"
                >
                  اردو
                </button>
              </div>

              {/* Editable Input Field */}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => {
                  setIsInputFocused(false);
                  setIsUserTyping(false);
                }}
                onKeyDown={handleKeyDown}
                placeholder={
                  isVoiceRecording
                    ? (voiceLang === 'ur-PK' ? "بولیں... آواز سنی جا رہی ہے" : "Listening... Speak your question now")
                    : "Message UCP Assistant..."
                }
                disabled={isLoading}
                className={`flex-1 px-3 py-2 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:bg-white text-slate-800 placeholder-slate-400 font-sans transition-all ${
                  isVoiceRecording
                    ? 'border-[#C8102E] ring-1 ring-[#C8102E]/20 bg-red-50/20'
                    : 'border-slate-300 focus:border-[#0A1931]'
                }`}
              />

              {/* Microphone Voice Button */}
              <button
                type="button"
                onClick={() => {
                  if (isVoiceRecording) {
                    stopVoiceRecording();
                  } else {
                    startVoiceRecording();
                  }
                }}
                disabled={isLoading}
                className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95 ${
                  isVoiceRecording
                    ? 'bg-[#C8102E] text-white shadow-md ucp-mic-recording-pulse'
                    : 'bg-slate-100 hover:bg-[#0A1931] hover:text-white text-slate-600 border border-slate-200 hover:border-[#0A1931]'
                }`}
                aria-label={isVoiceRecording ? "Stop voice recording" : "Start voice recording"}
                title={isVoiceRecording ? "Stop recording (Keep text)" : `Voice input in ${voiceLang === 'ur-PK' ? 'Urdu' : 'English'} (Speak to UCP Assistant)`}
              >
                {isVoiceRecording ? (
                  <Square size={13} className="fill-current animate-pulse" />
                ) : (
                  <Mic size={15} />
                )}
              </button>

              {/* Send Button */}
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-[#0A1931] hover:bg-[#163566] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs disabled:cursor-not-allowed shrink-0 active:scale-95"
                aria-label="Send Message"
                title="Send message"
              >
                <Send size={15} />
              </button>
            </div>

            {/* Footer indicators */}
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-0.5 font-sans">
              <span className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${isVoiceRecording ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
                <span>{isVoiceRecording ? 'Recording active' : 'Voice & Text Ready'}</span>
              </span>
              <span>UCP Bahawalpur</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. FLOATING ROBOT LAUNCHER & SNAPCHAT-STYLE ANIMATED GREETING BUBBLE
          ========================================================================= */}
      <div 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-7 lg:right-7 z-40 flex items-center pointer-events-auto m-1 sm:m-0"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
        }}
      >
        {/* Formal, Simple & Unique Floating Greeting Card */}
        {!isOpen && !hasDismissedGreeting && (greetingState === 'entering' || greetingState === 'visible' || greetingState === 'exiting') && (
          <div
            onClick={handleToggleChat}
            className={`relative mr-2 sm:mr-3.5 cursor-pointer select-none ${
              greetingState === 'exiting' ? 'ucp-speech-bubble-exit' : 'ucp-speech-bubble-enter'
            }`}
            title="Click to chat with UCP Assistant"
            role="alert"
          >
            {/* Elegant Formal Card Container */}
            <div className="bg-white/95 dark:bg-[#071322]/95 backdrop-blur-md text-[#0A1931] dark:text-white px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-200/90 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/25 transition-all duration-200 max-w-[210px] sm:max-w-[250px] relative group font-sans">
              
              {/* Refined Tail pointing to Robot */}
              <div 
                className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-[#071322] border-t border-r border-slate-200/90 dark:border-white/10 rotate-45 group-hover:border-slate-400 transition-colors"
                aria-hidden="true"
              />

              {/* Minimal Dismiss Button */}
              <button
                type="button"
                onClick={handleDismissGreeting}
                className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 border border-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                title="Dismiss"
                aria-label="Dismiss greeting message"
              >
                <X size={9} />
              </button>

              {/* Minimal Professional Greeting Content */}
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium leading-none mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>UCP Assistant · Online</span>
                </div>
                <p className="text-xs sm:text-[13px] font-semibold text-[#0A1931] dark:text-white leading-snug">
                  Hi, how can I help you?
                </p>
                <p className="text-[10px] sm:text-[11px] font-normal text-slate-500 dark:text-slate-400 pt-0.5 leading-tight">
                  Admissions · Fees · Programmes
                </p>
              </div>

              {/* Subtle conversation prompt */}
              <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-white/10 text-[9.5px] font-normal text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Click to start conversation</span>
                <span className="text-slate-400">→</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            PROMINENT ENLARGED FLOATING ROBOT LAUNCHER BUTTON (NO RED ON MOBILE/DESKTOP)
            Desktop: ~84-88px diameter | Mobile: 40px diameter (w-10 h-10)
            ========================================================================= */}
        <button
          id="ucp-assistant-floating-launcher"
          onClick={handleToggleChat}
          className={`group relative rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#0A1931]/25 select-none ${
            isOpen
              ? 'w-10 h-10 sm:w-16 sm:h-16 bg-[#0A1931] hover:bg-[#12284C] text-white shadow-xl rotate-90 scale-95 border border-slate-500'
              : 'w-10 h-10 sm:w-[82px] sm:h-[82px] lg:w-[88px] lg:h-[88px] bg-gradient-to-b from-[#0F223F] via-[#0A1931] to-[#061121] text-white hover:scale-105 active:scale-95 border-2 border-slate-600/80 hover:border-slate-300 shadow-[0_12px_40px_rgba(10,25,49,0.5)] ucp-robot-halo'
          } ${!isOpen && !isWaving ? 'ucp-robot-float' : ''} ${isBouncing ? 'ucp-robot-bounce' : ''}`}
          aria-label={isOpen ? "Close UCP Assistant" : "Open UCP Assistant — Campus Assistant"}
          title={isOpen ? "Close UCP Assistant" : "Chat with UCP Assistant"}
        >
          {isOpen ? (
            /* Clean Close Cross */
            <X size={20} className="text-white drop-shadow-md" />
          ) : (
            /* Large Visible Cute Robot Mascot */
            <div className={`relative w-full h-full flex items-center justify-center p-1 sm:p-1.5 ${!isWaving && currentRobotState === 'idle' ? 'ucp-robot-tilt' : ''}`}>
              
              {/* Mascot Vector Illustration peeking inside circular badge */}
              <UcpRobotMascot 
                size={74}
                className="w-8 h-8 sm:w-[74px] sm:h-[74px] lg:w-[80px] lg:h-[80px] transition-transform duration-200 group-hover:scale-105"
                state={currentRobotState}
                isWaving={isWaving}
                showTorso={true}
                interactive={!isOpen}
              />
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default UcpChatbot;
