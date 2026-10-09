"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { playClickSound, playKeyClackSound, playTypingErrorSound } from "@/lib/sound";

const WORD_POOL = [
  "many", "over", "even", "would", "eye", "lead", "run", "against", "or", "real",
  "during", "number", "we", "about", "move", "if", "so", "you", "new", "child",
  "course", "few", "seem", "system", "code", "light", "world", "state", "place",
  "time", "year", "people", "way", "day", "man", "thing", "woman", "life", "hand",
  "part", "case", "point", "week", "group", "problem", "fact", "feel", "great",
  "small", "large", "high", "every", "near", "school", "build", "learn", "react",
  "next", "cloud", "stack", "server", "data", "logic", "flow", "speed", "test"
];

const KEYBOARD_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

function generateWords(count = 22) {
  const shuffled = [...WORD_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).join(" ");
}

export default function TypingTestModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [targetText, setTargetText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize new test
  const startNewTest = useCallback(() => {
    playClickSound();
    const text = generateWords(22);
    setTargetText(text);
    setUserInput("");
    setStartTime(null);
    setElapsedSeconds(0);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    setActiveKey("");
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 50);
  }, []);

  // Listen for open events & global keyboard shortcuts (Alt+T / Option+T / Alt+J)
  useEffect(() => {
    window.__openTyping = () => {
      setIsOpen(true);
      startNewTest();
    };
    window.__toggleTyping = () => {
      setIsOpen((open) => {
        if (!open) {
          setTimeout(startNewTest, 10);
          return true;
        }
        return false;
      });
    };

    const handleOpen = () => {
      setIsOpen(true);
      startNewTest();
    };

    const handleGlobalKeyDown = (e) => {
      const targetTag = e.target?.tagName?.toLowerCase();
      const isInputFocused =
        targetTag === "input" ||
        targetTag === "textarea" ||
        e.target?.isContentEditable;

      // Check for Alt+T or Alt+J (Option+T/Option+J on macOS)
      const isT =
        e.key?.toLowerCase() === "t" ||
        e.code === "KeyT" ||
        e.keyCode === 84 ||
        e.key === "†";

      const isJ =
        e.key?.toLowerCase() === "j" ||
        e.code === "KeyJ" ||
        e.keyCode === 74 ||
        e.key === "∆";

      if (e.altKey && (isT || isJ)) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((open) => {
          if (!open) {
            setTimeout(startNewTest, 10);
            return true;
          }
          return false;
        });
        return;
      }

      if (e.key === "Escape") {
        setIsOpen((open) => {
          if (open) {
            e.preventDefault();
            return false;
          }
          return open;
        });
      }
    };

    window.addEventListener("open-typing-modal", handleOpen);
    window.addEventListener("keydown", handleGlobalKeyDown, true);

    return () => {
      delete window.__openTyping;
      delete window.__toggleTyping;
      window.removeEventListener("open-typing-modal", handleOpen);
      window.removeEventListener("keydown", handleGlobalKeyDown, true);
    };
  }, [startNewTest]);

  // Timer loop
  useEffect(() => {
    if (startTime && !isFinished) {
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setElapsedSeconds(Math.floor(elapsed));

        // Calculate real-time WPM
        if (elapsed > 0) {
          const wordsTyped = userInput.length / 5;
          const currentWpm = Math.round((wordsTyped / elapsed) * 60);
          setWpm(currentWpm);
        }
      }, 200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, isFinished, userInput]);

  // Handle typing input
  const handleInputChange = (e) => {
    if (isFinished) return;
    const value = e.target.value;

    // Start timer on first keystroke
    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }

    setUserInput(value);

    // Calculate accuracy & detect error
    let correctCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === targetText[i]) {
        correctCount++;
      }
    }
    const acc = value.length > 0 ? Math.round((correctCount / value.length) * 100) : 100;
    setAccuracy(acc);

    // Audio feedback: clack on correct, distinct error sound on wrong keystroke
    if (value.length > userInput.length) {
      const charIndex = value.length - 1;
      const typedChar = value[charIndex];
      const isCorrectChar = typedChar === targetText[charIndex];

      if (isCorrectChar) {
        playKeyClackSound(typedChar);
      } else {
        playTypingErrorSound();
      }

      // Flash virtual keyboard key
      setActiveKey(typedChar.toLowerCase());
      setTimeout(() => setActiveKey(""), 120);
    } else if (value.length < userInput.length) {
      // Backspace audio feedback
      playKeyClackSound("backspace");
    }

    // Check completion
    if (value.length >= targetText.length) {
      setIsFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);
      const totalElapsed = Math.max(1, (Date.now() - (startTime || Date.now())) / 1000);
      const finalWpm = Math.round((correctCount / 5) / (totalElapsed / 60));
      setWpm(finalWpm);
    }
  };

  // Global keybindings (Tab = restart, Escape = close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === "Tab") {
        e.preventDefault();
        startNewTest();
      } else {
        // Keep focus on hidden input if not finished
        if (!isFinished && inputRef.current && document.activeElement !== inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isFinished, startNewTest]);

  if (!isOpen) return null;

  const totalTimeFormatted = startTime ? ((Date.now() - startTime) / 1000).toFixed(1) : elapsedSeconds.toFixed(1);
  const rawWpm = startTime && elapsedSeconds > 0 ? Math.round((userInput.length / 5) / (elapsedSeconds / 60)) : wpm;

  return (
    <div className="typing-modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="typing-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="typing-close-btn"
          aria-label="Close typing test"
        >
          &times;
        </button>

        {isFinished ? (
          /* ==========================================================================
             FINISHED RESULTS SCREEN (Matching Screenshot)
             ========================================================================== */
          <div className="typing-results-container">
            {/* Top Shortcuts */}
            <div className="typing-results-top-shortcuts">
              <span className="typing-kbd-tag">tab</span>
              <span style={{ color: "#94a3b8", fontSize: "11px", marginRight: "12px" }}>restart</span>
              <span className="typing-kbd-tag">esc</span>
              <span style={{ color: "#94a3b8", fontSize: "11px" }}>close</span>
            </div>

            {/* Giant Hero WPM */}
            <div className="typing-results-hero">
              <span className="typing-results-huge-wpm">{wpm}</span>
              <span className="typing-results-wpm-label">WORDS PER MINUTE</span>
            </div>

            {/* 3 Secondary Metrics: ACCURACY, RAW, TIME */}
            <div className="typing-results-subgrid">
              <div className="typing-results-subitem">
                <span className="typing-results-subval">
                  {accuracy}<span style={{ fontSize: "14px", fontWeight: "600", color: "#94a3b8" }}>%</span>
                </span>
                <span className="typing-results-sublbl">ACCURACY</span>
              </div>

              <div className="typing-results-subitem">
                <span className="typing-results-subval">{rawWpm}</span>
                <span className="typing-results-sublbl">RAW</span>
              </div>

              <div className="typing-results-subitem">
                <span className="typing-results-subval">
                  {totalTimeFormatted}<span style={{ fontSize: "14px", fontWeight: "600", color: "#94a3b8" }}>s</span>
                </span>
                <span className="typing-results-sublbl">TIME</span>
              </div>
            </div>

            {/* Bottom Action: Try Again Button */}
            <button
              type="button"
              onClick={startNewTest}
              className="typing-try-again-btn"
              autoFocus
            >
              <span style={{ fontSize: "14px" }}>↻</span>
              <span>try again</span>
            </button>
          </div>
        ) : (
          /* ==========================================================================
             ACTIVE TYPING TEST SCREEN
             ========================================================================== */
          <>
            {/* Top Metrics (WPM, ACC, TIME) */}
            <div className="typing-metrics-row">
              <div className="typing-metric-item">
                <span className="typing-metric-val">{wpm}</span>
                <span className="typing-metric-lbl">WPM</span>
              </div>
              <div className="typing-metric-item">
                <span className="typing-metric-val">{accuracy}<span style={{ fontSize: "16px", fontWeight: "600" }}>%</span></span>
                <span className="typing-metric-lbl">ACC</span>
              </div>
              <div className="typing-metric-item">
                <span className="typing-metric-val">{elapsedSeconds}<span style={{ fontSize: "16px", fontWeight: "600" }}>s</span></span>
                <span className="typing-metric-lbl">TIME</span>
              </div>
            </div>

            {/* Text Typing Area */}
            <div className="typing-words-container" onClick={() => inputRef.current?.focus()}>
              {targetText.split("").map((char, index) => {
                const isTyped = index < userInput.length;
                const isCurrent = index === userInput.length;
                const isCorrect = isTyped && userInput[index] === char;
                const isWrong = isTyped && userInput[index] !== char;

                let charClass = "typing-char-untyped";
                if (isCorrect) charClass = "typing-char-correct";
                if (isWrong) charClass = "typing-char-wrong";

                return (
                  <span key={index} className={`typing-char ${charClass}`}>
                    {isCurrent && <span className="typing-cursor">|</span>}
                    {char}
                  </span>
                );
              })}
            </div>

            {/* Hidden Input For Capture */}
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="typing-hidden-input"
              autoFocus
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck="false"
            />

            {/* Virtual Keyboard */}
            <div className="typing-virtual-keyboard">
              {KEYBOARD_ROWS.map((row, rIdx) => (
                <div key={rIdx} className="typing-keyboard-row">
                  {row.map((k) => (
                    <div
                      key={k}
                      className={`typing-key${activeKey === k ? " pressed" : ""}`}
                    >
                      {k}
                    </div>
                  ))}
                </div>
              ))}
              {/* Spacebar */}
              <div className="typing-keyboard-row">
                <div className={`typing-key typing-key-space${activeKey === " " ? " pressed" : ""}`}>
                  SPACE
                </div>
              </div>
            </div>

            {/* Footer Shortcut Instructions */}
            <div className="typing-footer-shortcuts">
              <button type="button" onClick={startNewTest} className="typing-action-shortcut">
                <span className="typing-kbd-tag">tab</span>
                <span>restart</span>
              </button>
              <button type="button" onClick={() => setIsOpen(false)} className="typing-action-shortcut">
                <span className="typing-kbd-tag">esc</span>
                <span>close</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
