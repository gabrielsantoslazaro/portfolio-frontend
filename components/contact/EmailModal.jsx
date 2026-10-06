"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { BACKEND_URL } from "@/lib/data";
import DynamicIcon from "../common/DynamicIcon";
import { playClickSound } from "@/lib/sound";

const RECAPTCHA_SITE_KEY = "6LfZW5ssAAAAAP3lTFeOynMuHmXaEiHilinp4R5J";
const EMAIL_COOLDOWN_MS = 10 * 60 * 1000;
const EMAIL_COOLDOWN_STORAGE_KEY = "email_form_cooldown_until";

export default function EmailModal() {
  const [isOpen, setIsOpen] = useState(false);

  const formRef = useRef(null);
  const cardRef = useRef(null);
  const firstInputRef = useRef(null);
  const recaptchaContainerRef = useRef(null);
  const widgetIdRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [statusText, setStatusText] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" | "error"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const handleClose = useCallback(() => {
    playClickSound();
    setIsOpen(false);
  }, []);

  function getCooldownRemaining() {
    if (typeof window === "undefined") return 0;
    const storedValue = window.localStorage.getItem(EMAIL_COOLDOWN_STORAGE_KEY);
    if (!storedValue) return 0;

    const cooldownUntil = Number(storedValue);
    if (!Number.isFinite(cooldownUntil)) {
      window.localStorage.removeItem(EMAIL_COOLDOWN_STORAGE_KEY);
      return 0;
    }

    const remaining = cooldownUntil - Date.now();
    if (remaining <= 0) {
      window.localStorage.removeItem(EMAIL_COOLDOWN_STORAGE_KEY);
      return 0;
    }
    return remaining;
  }

  function formatCooldown(remainingMs) {
    const totalSeconds = Math.ceil(remainingMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  // Global event listeners for opening & closing modal
  useEffect(() => {
    const handleOpen = () => {
      playClickSound();
      setIsOpen(true);
    };
    const handleCloseEvent = () => {
      setIsOpen(false);
    };
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("open-email-modal", handleOpen);
    window.addEventListener("close-email-modal", handleCloseEvent);
    window.addEventListener("toggle-email-modal", handleToggle);

    return () => {
      window.removeEventListener("open-email-modal", handleOpen);
      window.removeEventListener("close-email-modal", handleCloseEvent);
      window.removeEventListener("toggle-email-modal", handleToggle);
    };
  }, []);

  // Cooldown interval
  useEffect(() => {
    if (!isOpen) return;
    setCooldownRemaining(getCooldownRemaining());

    const interval = window.setInterval(() => {
      setCooldownRemaining(getCooldownRemaining());
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isOpen]);

  // Focus, keyboard listeners, and total background scroll-lock
  useEffect(() => {
    if (!isOpen) return;

    // Lock body and html scroll
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const timeout = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 120);

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        handleClose();
      }
    }

    // Prevent mouse wheel and touch dragging from scrolling the background page
    function preventBackgroundScroll(e) {
      if (cardRef.current && cardRef.current.contains(e.target)) {
        // If wheel/touch is inside the modal card, allow internal scrolling
        return;
      }
      if (e.cancelable) {
        e.preventDefault();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", preventBackgroundScroll, { passive: false });
    window.addEventListener("touchmove", preventBackgroundScroll, { passive: false });

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.touchAction = prevBodyTouchAction;
      clearTimeout(timeout);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", preventBackgroundScroll);
      window.removeEventListener("touchmove", preventBackgroundScroll);
    };
  }, [isOpen, handleClose]);

  // Google reCAPTCHA loader & renderer
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    let pollInterval = null;

    const renderWidget = () => {
      if (!isMounted || !recaptchaContainerRef.current) return;

      if (typeof window !== "undefined" && window.grecaptcha && typeof window.grecaptcha.render === "function") {
        try {
          if (recaptchaContainerRef.current.childElementCount === 0) {
            const isDark = document.body.classList.contains("dark-mode");
            const widgetId = window.grecaptcha.render(recaptchaContainerRef.current, {
              sitekey: RECAPTCHA_SITE_KEY,
              theme: isDark ? "dark" : "light",
              callback: () => {
                setStatusText("");
              },
              "expired-callback": () => {
                setStatusText("Captcha expired. Please verify again.");
                setStatusType("error");
              },
            });
            widgetIdRef.current = widgetId;
            if (pollInterval) clearInterval(pollInterval);
          }
        } catch (e) {
          console.warn("reCAPTCHA notice:", e);
        }
      }
    };

    if (typeof window !== "undefined") {
      if (window.grecaptcha && typeof window.grecaptcha.ready === "function") {
        window.grecaptcha.ready(renderWidget);
      } else {
        pollInterval = setInterval(renderWidget, 200);
        renderWidget();
      }
    }

    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const currentCooldown = getCooldownRemaining();
    if (currentCooldown > 0) {
      setStatusText(`Please wait ${formatCooldown(currentCooldown)} before sending another message.`);
      setStatusType("error");
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatusText("Please fill out all required fields.");
      setStatusType("error");
      return;
    }

    let captchaResponse = "";
    if (window.grecaptcha) {
      try {
        if (widgetIdRef.current !== null) {
          captchaResponse = window.grecaptcha.getResponse(widgetIdRef.current);
        } else {
          captchaResponse = window.grecaptcha.getResponse();
        }
      } catch (err) {
        // noop
      }
    }

    if (!captchaResponse) {
      setStatusText("Please complete the reCAPTCHA verification below.");
      setStatusType("error");
      return;
    }

    setIsSubmitting(true);
    setStatusText("Sending your message...");
    setStatusType("");

    try {
      const response = await fetch(`${BACKEND_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject || "Portfolio Contact Form Inquiry",
          message: trimmedMessage,
          captchaResponse,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        const cooldownUntil = Date.now() + EMAIL_COOLDOWN_MS;
        localStorage.setItem(EMAIL_COOLDOWN_STORAGE_KEY, String(cooldownUntil));
        setCooldownRemaining(EMAIL_COOLDOWN_MS);
        setStatusText(data.message || "Message sent successfully! I'll get back to you soon.");
        setStatusType("success");

        setTimeout(() => {
          handleClose();
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
          setStatusText("");
        }, 1800);
      } else {
        const failureMessage = [data.message, data.debug].filter(Boolean).join(" ");
        setStatusText(failureMessage || "Failed to send message. Please try again or email directly.");
        setStatusType("error");
      }
    } catch (err) {
      setStatusText("Network error connecting to backend. Please try again later or reach out directly.");
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
      if (window.grecaptcha) {
        try {
          if (widgetIdRef.current !== null) {
            window.grecaptcha.reset(widgetIdRef.current);
          } else {
            window.grecaptcha.reset();
          }
        } catch (e) {}
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="contact-email-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Send Email Modal"
    >
      {/* Modal Dialog Card */}
      <div
        ref={cardRef}
        className="contact-email-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm flex-shrink-0">
              <DynamicIcon name="Mail" className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-tight leading-snug">
                Send a Message
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-tight">
                Fill out the form below to reach out directly
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 flex-shrink-0"
            aria-label="Close modal"
          >
            <DynamicIcon name="X" className="w-4 h-4" />
          </button>
        </div>

        {/* Cooldown notice if active */}
        {cooldownRemaining > 0 && (
          <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 font-medium">
            <DynamicIcon name="Clock" className="w-4 h-4 flex-shrink-0" />
            <span>Cooldown active: Please wait {formatCooldown(cooldownRemaining)} before sending another message.</span>
          </div>
        )}

        {/* Status Alerts */}
        {statusText && (
          <div
            className={`mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-xl flex items-center gap-2 text-xs font-medium ${
              statusType === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
                : "bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200"
            }`}
          >
            <DynamicIcon
              name={statusType === "success" ? "CheckCircle2" : "AlertCircle"}
              className="w-4 h-4 flex-shrink-0"
            />
            <span>{statusText}</span>
          </div>
        )}

        {/* Contact Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="mt-3 sm:mt-4 space-y-3 sm:space-y-3.5">
          <div>
            <label className="block text-[10.5px] sm:text-[11px] font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-1">
              NAME <span className="text-rose-500">*</span>
            </label>
            <input
              ref={firstInputRef}
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs sm:text-sm placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-white/20 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-[10.5px] sm:text-[11px] font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-1">
              EMAIL <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs sm:text-sm placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-white/20 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-[10.5px] sm:text-[11px] font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-1">
              SUBJECT
            </label>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Project Inquiry / Collaboration"
              className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs sm:text-sm placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-white/20 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-[10.5px] sm:text-[11px] font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-1">
              MESSAGE <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi Gabriel, I'd like to discuss a project..."
              className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs sm:text-sm placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-white/20 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all resize-none min-h-[90px] sm:min-h-[110px]"
            />
          </div>

          {/* Google reCAPTCHA Container */}
          <div className="flex justify-center items-center py-1.5 sm:py-2 min-h-[78px] overflow-hidden">
            <div ref={recaptchaContainerRef} className="recaptcha-widget-box" />
          </div>

          {/* Actions Row */}
          <div className="pt-1.5 sm:pt-2">
            <button
              type="submit"
              disabled={isSubmitting || cooldownRemaining > 0}
              className="w-full py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.98] group"
            >
              {isSubmitting ? (
                <>
                  <DynamicIcon name="Loader2" className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send</span>
                  <DynamicIcon name="ArrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
