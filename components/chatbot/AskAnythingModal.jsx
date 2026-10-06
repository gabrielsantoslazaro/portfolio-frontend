"use client";

import { useEffect, useRef, useState } from "react";
import { BACKEND_URL, CHAT_SUGGESTIONS } from "@/lib/data";
import { playClickSound, playKeyClackSound } from "@/lib/sound";
import DynamicIcon from "../common/DynamicIcon";

export default function AskAnythingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // [{ role: "user" | "bot", text: string, id: number }]
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const [streamingText, setStreamingText] = useState("");

  const inputRef = useRef(null);
  const threadScrollRef = useRef(null);
  const typewriterTimeoutRef = useRef(null);

  // Listen for open events (Alt + K / Option + K, Sidebar click, custom events)
  useEffect(() => {
    window.__openChat = () => {
      playClickSound();
      setIsOpen(true);
    };
    window.__toggleChat = () => {
      setIsOpen((prev) => {
        if (!prev) playClickSound();
        return !prev;
      });
    };

    const handleOpen = () => {
      playClickSound();
      setIsOpen(true);
    };

    const handleToggle = () => {
      setIsOpen((prev) => {
        if (!prev) playClickSound();
        return !prev;
      });
    };

    const handleKeyDown = (e) => {
      const targetTag = e.target?.tagName?.toLowerCase();
      const isInputFocused =
        targetTag === "input" ||
        targetTag === "textarea" ||
        e.target?.isContentEditable;

      const isK =
        e.key?.toLowerCase() === "k" ||
        e.code === "KeyK" ||
        e.keyCode === 75 ||
        e.key === "˚";

      // Support Alt+K (and Ctrl/Cmd+K as universal shortcut)
      if ((e.altKey || ((e.ctrlKey || e.metaKey) && !isInputFocused)) && isK) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => {
          if (!prev) playClickSound();
          return !prev;
        });
        return;
      }

      if (e.key === "Escape") {
        setIsOpen((open) => {
          if (open) {
            e.preventDefault();
            playClickSound(650);
            return false;
          }
          return open;
        });
      }
    };

    window.addEventListener("open-ask-anything-modal", handleOpen);
    window.addEventListener("toggle-chat-modal", handleToggle);
    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      delete window.__openChat;
      delete window.__toggleChat;
      window.removeEventListener("open-ask-anything-modal", handleOpen);
      window.removeEventListener("toggle-chat-modal", handleToggle);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.touchAction = prevTouchAction;
    };
  }, [isOpen]);

  // Auto-focus input when modal is opened or loading finishes
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, isLoading]);

  // Auto-scroll to bottom of dialogue thread on update
  useEffect(() => {
    if (!threadScrollRef.current) return;
    threadScrollRef.current.scrollTop = threadScrollRef.current.scrollHeight;
  }, [messages, streamingText, isLoading]);

  const handleClose = () => {
    playClickSound(650);
    setIsOpen(false);
    if (typewriterTimeoutRef.current) clearTimeout(typewriterTimeoutRef.current);
  };

  const handleClearChat = () => {
    playClickSound(800);
    setMessages([]);
    setInput("");
    setStreamingMessageId(null);
    setStreamingText("");
    setIsLoading(false);
    if (typewriterTimeoutRef.current) clearTimeout(typewriterTimeoutRef.current);
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const handleCopyText = (text, index) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    playClickSound(950);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getSmartFallback = (query, prevMessages = []) => {
    const q = query.toLowerCase();

    if (
      q.includes("sino ka") ||
      q.includes("who are you") ||
      q.includes("si gab ka ba") ||
      q.includes("gabriel")
    ) {
      return "Oo, ako si Gabriel Lazaro. Welcome sa website ko! Isa akong Software Developer mula sa Maynila na gumagawa ng mga modernong web application, full-stack systems, at intelligent API integrations.";
    }

    if (
      q.includes("project") ||
      q.includes("built") ||
      q.includes("gawa") ||
      q.includes("portfolio") ||
      q.includes("app")
    ) {
      return `Narito ang ilan sa mga pangunahing projects ni Gabriel:

1. StudyMate AI — AI study assistant para sa note summarization at instant quiz generation gamit ang Google GenAI.
2. SchedulePro — Minimalist productivity at task tracking application na may local storage management.
3. Nocturne — Wellness studio web app para sa mindfulness, breathing rhythm timers, at ambient audio.`;
    }

    if (
      q.includes("stack") ||
      q.includes("tech") ||
      q.includes("skills") ||
      q.includes("gamit") ||
      q.includes("language")
    ) {
      return `Ang core tech stack at tools na ginagamit ni Gabriel:

• Frontend: JavaScript (ES6+), React.js, Next.js, Tailwind CSS, HTML5, CSS3
• Backend & DB: Node.js, Express.js, PostgreSQL, Supabase, MySQL, Firebase, PHP, Python
• AI & DevOps: Google GenAI, OpenAI API, REST APIs, Git/GitHub, Docker, VS Code`;
    }

    if (
      q.includes("school") ||
      q.includes("aral") ||
      q.includes("college") ||
      q.includes("education") ||
      q.includes("phinma")
    ) {
      return "Kasalukuyang nag-aaral si Gabriel ng Bachelor of Science in Information Technology (BSIT) sa PHINMA Saint Jude College - Manila (2023 - Present).";
    }

    if (
      q.includes("intern") ||
      q.includes("xurpas") ||
      q.includes("experience") ||
      q.includes("work") ||
      q.includes("trabaho")
    ) {
      return "Nag-intern si Gabriel bilang Front-End Developer Intern sa Xurpas Enterprise Inc. (Makati), kung saan gumawa siya ng mga reusable UI components, nag-optimize ng responsiveness, at nakipagtulungan sa senior engineers at UI/UX designers.";
    }

    if (
      q.includes("cert") ||
      q.includes("google") ||
      q.includes("aws") ||
      q.includes("cisco") ||
      q.includes("ibm")
    ) {
      return "Mayroong 12+ verifiable industry certifications si Gabriel mula sa Google (AI for Planning, AI Writing, AI Data Analysis), AWS (Generative AI for Developers), IBM (AI Fundamentals), at Cisco (JavaScript Essentials 1 & 2, CSS Essentials).";
    }

    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("reach") ||
      q.includes("hire") ||
      q.includes("usap")
    ) {
      return "Maaari mong maabot si Gabriel sa email: gabriellazaro0808@gmail.com, o sa LinkedIn (linkedin.com/in/gabrielsantoslazaro) at GitHub (github.com/gabrielsantoslazaro).";
    }

    return "Ako ang AI assistant ni Gabriel Lazaro. Pwede mo akong tanungin tungkol sa kanyang mga projects, skills, internship experience sa Xurpas, education sa PHINMA Saint Jude, o kung paano makipag-ugnayan sa kanya!";
  };

  const startTypewriterStream = (fullText, msgId) => {
    let currentIndex = 0;
    setStreamingMessageId(msgId);
    setStreamingText("");

    const typeNext = () => {
      if (currentIndex < fullText.length) {
        const chunkSize = Math.min(3, fullText.length - currentIndex);
        const currentSlice = fullText.slice(0, currentIndex + chunkSize);
        setStreamingText(currentSlice);
        currentIndex += chunkSize;
        typewriterTimeoutRef.current = setTimeout(typeNext, 16);
      } else {
        setStreamingMessageId(null);
        setStreamingText("");
        setMessages((prev) =>
          prev.map((m) => (m.id === msgId ? { ...m, text: fullText } : m))
        );
      }
    };

    typewriterTimeoutRef.current = setTimeout(typeNext, 35);
  };

  const handleSend = async (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    playClickSound(850);
    const userMsgId = Date.now();
    const botMsgId = userMsgId + 1;

    const newHistory = [...messages, { role: "user", text, id: userMsgId }];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);

      const payloadHistory = newHistory.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: payloadHistory }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.reply) {
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            { role: "bot", text: data.reply, id: botMsgId },
          ]);
          startTypewriterStream(data.reply, botMsgId);
          return;
        }
      }
      throw new Error("No response");
    } catch (err) {
      // Smart contextual offline fallback
      setTimeout(() => {
        const fallback = getSmartFallback(text, newHistory);
        setIsLoading(false);
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: fallback, id: botMsgId },
        ]);
        startTypewriterStream(fallback, botMsgId);
      }, 350);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    playKeyClackSound(e.target.value.slice(-1));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  const hasMessages = messages.length > 0;
  const lastBotMessage = [...messages].reverse().find((m) => m.role === "bot");

  return (
    <div
      className="ask-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Ask Anything AI Dialogue"
    >
      {/* Top Right Close Button */}
      <button
        type="button"
        onClick={handleClose}
        className="ask-close-btn"
        aria-label="Close dialog"
      >
        ✕
      </button>

      {/* Main Centered Container */}
      <div className="ask-modal-center">
        {/* Header Heading */}
        {!hasMessages && (
          <h2 className="ask-hero-heading">ask me anything</h2>
        )}

        {/* ====================================================================
            Continuous Dialogue Thread Area (Dugtong-Dugtong Multi-Turn Flow)
            ==================================================================== */}
        <div className="ask-dialogue-body">
          {/* Scrollable Dialogue History Container */}
          {hasMessages && (
            <div ref={threadScrollRef} className="ask-messages-thread">
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                const isStreaming = streamingMessageId === msg.id;
                const textToShow = isStreaming ? streamingText : msg.text;

                if (isUser) {
                  return (
                    <div key={msg.id || index} className="ask-entry-user">
                      <span className="ask-echo-arrow">&gt;</span>
                      <span className="ask-echo-text">{msg.text}</span>
                    </div>
                  );
                }

                return (
                  <div key={msg.id || index} className="ask-entry-bot-wrap">
                    <div className="ask-entry-bot">
                      {textToShow}
                      {isStreaming && (
                        <span className="ask-stream-caret">_</span>
                      )}
                    </div>

                    {!isStreaming && (
                      <div className="ask-entry-actions">
                        <button
                          type="button"
                          onClick={() => handleCopyText(msg.text, index)}
                          className="ask-mini-copy-btn"
                          title="Copy response"
                        >
                          <DynamicIcon
                            name={copiedIndex === index ? "Check" : "Copy"}
                            className="w-3 h-3"
                          />
                          <span>{copiedIndex === index ? "copied" : "copy"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Thinking / Typing indicator */}
              {isLoading && (
                <div className="ask-thinking-indicator">
                  <span className="ask-pulse-dot" />
                  <span>thinking...</span>
                </div>
              )}
            </div>
          )}

          {/* ====================================================================
              Continuous Input Prompt Row (Always ready to chat another question)
              ==================================================================== */}
          <div className="ask-input-prompt-line">
            <span className="ask-echo-arrow">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder={
                isLoading
                  ? "generating answer..."
                  : hasMessages
                  ? "ask a follow-up question..."
                  : "type a question..."
              }
              disabled={isLoading}
              className="ask-frameless-input"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {/* Quick Suggestion Chips (Shown initially) */}
          {!hasMessages && (
            <div className="ask-suggestions-row">
              {CHAT_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSend(suggestion)}
                  className="ask-suggestion-chip"
                >
                  {suggestion.toLowerCase()}
                </button>
              ))}
            </div>
          )}

          {/* ====================================================================
              Action Footer Controls (Ask another question)
              ==================================================================== */}
          {hasMessages && (
            <div className="ask-footer-actions-row">
              <div className="ask-footer-btn-group">
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="ask-pill-action-btn ask-primary-pill"
                >
                  <DynamicIcon name="RotateCcw" className="w-3.5 h-3.5" />
                  <span>ask another question</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
