"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DynamicIcon from "./DynamicIcon";
import { playHoverSound, playClickSound, playUnmuteSound, playMuteSound } from "@/lib/sound";

export default function Sidebar() {
  const pathname = usePathname();
  const [themeMode, setThemeMode] = useState("light");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  const openChat = () => {
    playClickSound();
    if (typeof window !== "undefined") {
      if (window.__openChat) {
        window.__openChat();
      } else {
        window.dispatchEvent(new CustomEvent("open-ask-anything-modal"));
      }
    }
  };

  const openTypingTest = () => {
    playClickSound();
    if (typeof window !== "undefined") {
      if (window.__openTyping) {
        window.__openTyping();
      } else {
        window.dispatchEvent(new CustomEvent("open-typing-modal"));
      }
    }
  };

  const openEmail = () => {
    playClickSound();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-email-modal"));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isApple = /(Mac|iPhone|iPod|iPad)/i.test(
        navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || ""
      );
      setIsMac(isApple);
    }

    const savedMode = localStorage.getItem("theme_mode") || localStorage.getItem("theme") || "light";
    setThemeMode(savedMode);
    applyThemeMode(savedMode, false);

    const savedSound = localStorage.getItem("sound_muted");
    if (savedSound !== null) {
      setSoundEnabled(savedSound !== "true");
    }

    const handleKeyDown = (e) => {
      const targetTag = e.target?.tagName?.toLowerCase();
      const isInputFocused =
        targetTag === "input" ||
        targetTag === "textarea" ||
        e.target?.isContentEditable;

      if (isInputFocused) return;

      const isK =
        e.key === "k" ||
        e.key === "K" ||
        e.key === "˚" ||
        e.code === "KeyK";

      if (e.altKey && isK) {
        e.preventDefault();
        openChat();
        return;
      }

      const isT =
        e.key === "t" ||
        e.key === "T" ||
        e.key === "†" ||
        e.code === "KeyT";

      const isJ =
        e.key === "j" ||
        e.key === "J" ||
        e.key === "∆" ||
        e.code === "KeyJ";

      if (e.altKey && (isT || isJ)) {
        e.preventDefault();
        openTypingTest();
        return;
      }
    };

    // Global cursor hover sound effect for interactive elements (triggers once per element entry)
    let currentHoveredTarget = null;
    const handleMouseOver = (e) => {
      const target = e.target.closest(
        "a, button, .cert-clean-card, .lz-project-card, .lz-exp-row, .lz-stack-more, .lz-metric-top-item, .lz-metric-bottom-item, .project-list-row, .timeline-item, .sidebar-pill-btn, .sidebar-sound-btn, .sidebar-link, .sidebar-action-btn, .typing-action-shortcut, .typing-close-btn, .ask-suggestion-chip, .ask-action-btn, .ask-close-btn"
      );

      if (!target) {
        currentHoveredTarget = null;
        return;
      }

      if (target === currentHoveredTarget) {
        return;
      }

      currentHoveredTarget = target;
      playHoverSound();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    const handleMediaChange = (e) => {
      const currentMode = localStorage.getItem("theme_mode");
      if (currentMode === "system") {
        applyThemeMode("system", false);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mouseover", handleMouseOver);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const applyThemeMode = (mode, playSound = true) => {
    setThemeMode(mode);
    localStorage.setItem("theme_mode", mode);

    let isDark = false;
    if (mode === "dark") {
      isDark = true;
    } else if (mode === "system") {
      isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
      isDark = false;
    }

    document.documentElement.classList.toggle("dark", isDark);
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");

    window.dispatchEvent(new CustomEvent("theme-change", { detail: { theme: isDark ? "dark" : "light" } }));

    if (playSound) playClickSound(850);
  };

  const applyThemeWithTransition = (mode, e = null) => {
    playClickSound(850);

    const updateDOM = () => {
      applyThemeMode(mode, false);
    };

    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      updateDOM();
      return;
    }

    const x = e?.clientX ?? (e?.currentTarget ? e.currentTarget.getBoundingClientRect().left + 14 : 100);
    const y = e?.clientY ?? (e?.currentTarget ? e.currentTarget.getBoundingClientRect().top + 14 : window.innerHeight - 80);

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      updateDOM();
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 480,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
          pseudoElement: "::view-transition-new(root)"
        }
      );
    });
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    if (next) {
      playUnmuteSound();
    } else {
      playMuteSound();
    }
    setSoundEnabled(next);
    localStorage.setItem("sound_muted", String(!next));
  };

  const navLinks = [
    { label: "Projects", href: "/projects", icon: "FolderGit2" },
    { label: "Experience", href: "/experience", icon: "Milestone" },
    { label: "Stack", href: "/tech-stack", icon: "Layers" },
    { label: "Certifications", href: "/certifications", icon: "Award" },
  ];

  const shortcutActions = [
    {
      id: "chat",
      label: "Ask anything",
      shortcut: isMac ? "⌥K" : "Alt + K",
      action: openChat,
    },
    {
      id: "typing",
      label: "Typing test",
      shortcut: isMac ? "⌥T" : "Alt + T",
      action: openTypingTest,
      desktopOnly: true,
    },
  ];

  return (
    <>
      {/* Mobile Sticky Top Header */}
      <header className="mobile-top-bar">
        <Link
          href="/"
          onClick={() => {
            playClickSound();
            setIsMobileOpen(false);
          }}
          className="mobile-top-brand"
        >
          Gabriel Lazaro
        </Link>
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setIsMobileOpen(true);
          }}
          className="mobile-top-menu-btn"
          aria-label="Open Navigation Menu"
        >
          <DynamicIcon name="Menu" className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Backdrop */}
      <div
        className={`mobile-drawer-backdrop${isMobileOpen ? " open" : ""}`}
        onClick={() => {
          playClickSound();
          setIsMobileOpen(false);
        }}
      />

      {/* Sidebar / Mobile Slide-over Drawer */}
      <aside className={`portfolio-sidebar${isMobileOpen ? " open" : ""}`}>
        {/* Mobile-only Drawer Header */}
        <div className="mobile-drawer-header">
          <Link
            href="/"
            onClick={() => {
              playClickSound();
              setIsMobileOpen(false);
            }}
            className="mobile-drawer-brand"
          >
            Gabriel Lazaro
          </Link>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setIsMobileOpen(false);
            }}
            className="mobile-drawer-close"
            aria-label="Close Navigation Menu"
          >
            <DynamicIcon name="X" className="w-5 h-5" />
          </button>
        </div>

        {/* Top Section */}
        <div className="sidebar-top">
          {/* Desktop-only Brand Name */}
          <Link
            href="/"
            onClick={() => {
              playClickSound();
              setIsMobileOpen(false);
            }}
            className="sidebar-brand"
          >
            <DynamicIcon name="Terminal" className="w-4 h-4" />
            <span>Gabriel Lazaro</span>
          </Link>

          {/* Navigation Links */}
          <nav className="sidebar-nav">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    playClickSound();
                    setIsMobileOpen(false);
                  }}
                  className={`sidebar-link${isActive ? " active" : ""}`}
                >
                  {isActive && <span className="sidebar-arrow">→</span>}
                  <DynamicIcon name={item.icon} className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <hr className="sidebar-divider" />

          {/* Action Links (Send Email, Schedule a Call, Download CV) */}
          <div className="sidebar-top-actions">
            {/* Clickable Send Email Button */}
            <button
              type="button"
              onClick={() => {
                openEmail();
                setIsMobileOpen(false);
              }}
              className="sidebar-action-btn sidebar-email-btn"
              aria-label="Send email"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <DynamicIcon name="Mail" className="w-4 h-4" />
                <span>Send email</span>
              </div>
            </button>

            {/* Clickable Schedule a Call Link */}
            <a
              href="https://calendly.com/gabriellazaro0808/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playClickSound();
                setIsMobileOpen(false);
              }}
              className="sidebar-action-btn sidebar-schedule-btn"
              aria-label="Schedule a call"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <DynamicIcon name="Calendar" className="w-4 h-4" />
                <span>Schedule a call</span>
              </div>
              <span style={{ fontSize: "12px", opacity: 0.7 }}>↗</span>
            </a>

            {/* Clickable Download CV Link */}
            <a
              href="/Files/Gabriel-Lazaro-CV.pdf"
              download="Gabriel-Lazaro-CV.pdf"
              onClick={() => {
                playClickSound();
                setIsMobileOpen(false);
              }}
              className="sidebar-action-btn sidebar-cv-btn"
              aria-label="Download CV"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <DynamicIcon name="Download" className="w-4 h-4" />
                <span>Download CV</span>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="sidebar-bottom-group">
          {/* Interactive Keyboard Shortcuts (Ask Anything, Typing Test) */}
          <div className="sidebar-shortcuts">
            {shortcutActions.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  item.action();
                  setIsMobileOpen(false);
                }}
                className={`sidebar-action-btn${item.desktopOnly ? " sidebar-desktop-only" : ""}`}
              >
                <span>{item.label}</span>
                <span className="sidebar-kbd">{item.shortcut}</span>
              </button>
            ))}
          </div>

          <div className="sidebar-bottom">
            {/* Controls: Theme Pill + Sound Button */}
            <div className="sidebar-controls-row">
              {/* Theme Pill (System, Light, Dark) */}
              <div className="sidebar-theme-pill" role="group" aria-label="Theme mode selector">
                <button
                  type="button"
                  onClick={(e) => applyThemeWithTransition("system", e)}
                  title="System Theme"
                  className={`sidebar-pill-btn${themeMode === "system" ? " active" : ""}`}
                >
                  <DynamicIcon name="Monitor" className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => applyThemeWithTransition("light", e)}
                  title="Light Mode"
                  className={`sidebar-pill-btn${themeMode === "light" ? " active" : ""}`}
                >
                  <DynamicIcon name="Sun" className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => applyThemeWithTransition("dark", e)}
                  title="Dark Mode"
                  className={`sidebar-pill-btn${themeMode === "dark" ? " active" : ""}`}
                >
                  <DynamicIcon name="Moon" className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Sound / Haptic Feedback Toggle */}
              <button
                type="button"
                onClick={toggleSound}
                title={soundEnabled ? "Mute sounds" : "Enable sounds"}
                className={`sidebar-sound-btn${soundEnabled ? " active" : ""}`}
                aria-label="Toggle sound effects"
              >
                <DynamicIcon name={soundEnabled ? "Volume2" : "VolumeX"} className="w-4 h-4" />
              </button>
            </div>

            {/* Contact Callout */}
            <div className="sidebar-contact">
              <p>For work, collabs & everything else, reach me at</p>
              <a href="mailto:gabriellazaro0808@gmail.com" className="sidebar-email-link">
                <DynamicIcon name="Mail" className="w-3.5 h-3.5" />
                <span>gabriellazaro0808@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
