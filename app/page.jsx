"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BACKEND_URL,
  HOME_CERTIFICATIONS,
  PROJECTS,
  SOCIAL_LINKS,
  TECH_STACKS,
  FULL_EXPERIENCES
} from "@/lib/data";
import DynamicIcon from "@/components/common/DynamicIcon";
import GitHubContributions from "@/components/common/GitHubContributions";
import { playClickSound } from "@/lib/sound";

const EMAIL_COOLDOWN_MS = 10 * 60 * 1000;
const EMAIL_COOLDOWN_STORAGE_KEY = "email_form_cooldown_until";

function CertificateModal({ imageSrc, onClose }) {
  useEffect(() => {
    if (!imageSrc) return undefined;

    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [imageSrc, onClose]);

  return (
    <div className={`certificate-modal${imageSrc ? " show" : ""}`} id="certificateModal">
      <div className="certificate-modal-overlay" id="certificateModalOverlay" onClick={onClose}></div>
      <button className="certificate-modal-close" id="certificateModalClose" aria-label="Close modal" type="button" onClick={onClose}>
        &times;
      </button>
      <div className="certificate-modal-content">
        {imageSrc ? (
          <div className="certificate-modal-image-wrap">
            <img id="certificateModalImage" src={imageSrc} alt="Certificate Preview" decoding="async" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function IssuerBrandLogo({ issuer, iconName }) {
  const normalized = (issuer || "").toLowerCase();

  if (normalized.includes("google")) {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" width="20" height="20">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    );
  }

  if (normalized.includes("aws") || normalized.includes("amazon")) {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" width="22" height="22">
        <path fill="#FF9900" d="M18.8 15.6c-2.3 1.7-5.5 2.6-8.4 2.6-4.1 0-7.7-1.5-10.4-4-.2-.2 0-.5.2-.3 3.1 1.8 6.9 2.9 10.8 2.9 2.6 0 5.4-.6 8-1.7.4-.2.7.3.4.5z"/>
        <path fill="#FF9900" d="M19.6 14.4c-.3-.4-1.9-.2-2.6-.1-.2 0-.3-.2-.1-.3 1.2-.8 3.1-.6 3.4-.2.3.4-.1 2.3-1.2 3.2-.2.1-.3.1-.3-.1.2-.7.8-2.1.8-2.5z"/>
        <path fill="#FF9900" d="M6.9 7.6c0-1.1-.3-2-1-2.6-.7-.6-1.7-.9-3-.9-1.2 0-2.3.3-3.2.9-.2.1-.1.4.1.5l1.1.8c.2.1.3.1.5-.1.5-.4 1-.6 1.6-.6.8 0 1.2.4 1.2 1.1v.4c-.8.1-1.8.2-2.6.6-.9.4-1.4 1.1-1.4 2 0 .8.3 1.4.8 1.9.5.5 1.2.7 2 .7.9 0 1.6-.3 2.1-.8.2.4.6.8 1.1.8.3 0 .6-.1.8-.2.1-.1.2-.2.2-.4l-.4-1.2c0-.2-.2-.2-.3-.2-.2.1-.4.1-.5.1-.3 0-.5-.2-.5-.6V7.6zm-2.4 2.5c0 .6-.2 1.1-.5 1.4-.3.3-.8.5-1.3.5-.4 0-.7-.1-.9-.3-.2-.2-.3-.5-.3-.9 0-.5.2-.9.5-1.2.4-.3 1-.5 1.7-.6.5-.1.8-.1.8-.1v1.2zM12.9 5.2c-.3 0-.5.2-.6.4l-2.1 6.5c-.1.2 0 .4.2.4h1.4c.2 0 .4-.1.5-.4l.4-1.6h2.8l.4 1.6c.1.2.2.4.5.4h1.4c.2 0 .4-.2.2-.4l-2.1-6.5c-.1-.2-.3-.4-.6-.4h-2.2zm-.1 3.9l.8-3.1.8 3.1h-1.6zM24 5.2c-.2 0-.5.2-.6.4l-1.5 5.6-1.6-5.6c-.1-.2-.3-.4-.6-.4h-1.3c-.3 0-.5.2-.6.4l-1.6 5.6-1.5-5.6c-.1-.2-.3-.4-.6-.4h-1.5c-.2 0-.4.2-.3.4l2.4 7.6c.1.3.3.4.6.4h1.4c.3 0 .5-.2.6-.4l1.5-5.2 1.5 5.2c.1.3.3.4.6.4h1.4c.3 0 .5-.2.6-.4l2.4-7.6c.1-.2 0-.4-.3-.4H24z"/>
      </svg>
    );
  }

  if (normalized.includes("ibm")) {
    return (
      <svg className="w-6 h-5" viewBox="0 0 32 14" width="24" height="11" fill="#0F62FE">
        <path d="M0 0h6.4v1H0zm0 1.8h6.4v1H0zm0 1.8h6.4v1H0zm0 1.8h6.4v1H0zm0 1.8h6.4v1H0zm0 1.8h6.4v1H0zm0 1.8h6.4v1H0zm0 1.8h6.4v1H0z"/>
        <path d="M8.5 0h10.1c1.5 0 2.7 1 2.7 2.4 0 .8-.4 1.5-1 1.9.9.4 1.5 1.3 1.5 2.3 0 1.4-1.2 2.4-2.7 2.4H8.5zm2.1 1.8h7.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-7.5zm0 1.8h7.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-7.5zm0 2.6h8c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-8zm0 1.8h8c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-8z"/>
        <path d="M23.5 0h2.9l2.7 6.4 2.7-6.4H34v1.1h-2.1v1.1H34v1.1h-2.1v1.1H34v1.1h-2.1v1.1H34v1.1h-2.1v1.1H34v1.1h-3.5l-3-6.9-3 6.9H21v-1.1h2.1V7.5H21V6.4h2.1V5.3H21V4.2h2.1V3.1H21V2H23.1V.9H21V0z"/>
      </svg>
    );
  }

  if (normalized.includes("cisco")) {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" width="22" height="22" fill="#1BA0D7">
        <rect x="1.5" y="10" width="1.6" height="5" rx="0.8"/>
        <rect x="4.2" y="7" width="1.6" height="11" rx="0.8"/>
        <rect x="6.9" y="10" width="1.6" height="5" rx="0.8"/>
        <rect x="9.6" y="4" width="1.6" height="17" rx="0.8"/>
        <rect x="12.3" y="10" width="1.6" height="5" rx="0.8"/>
        <rect x="15" y="4" width="1.6" height="17" rx="0.8"/>
        <rect x="17.7" y="10" width="1.6" height="5" rx="0.8"/>
        <rect x="20.4" y="7" width="1.6" height="11" rx="0.8"/>
      </svg>
    );
  }

  if (normalized.includes("code.org")) {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" width="20" height="20">
        <rect width="24" height="24" rx="5" fill="#0094A8" />
        <path d="M15 8.5C14.2 7.6 13.1 7 11.8 7 9.4 7 7.5 8.9 7.5 11.3v1.4C7.5 15.1 9.4 17 11.8 17c1.3 0 2.4-.6 3.2-1.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  return (
    <DynamicIcon
      name={iconName || "Award"}
      className="w-4 h-4 text-blue-500"
    />
  );
}

export default function HomePage() {
  const [theme, setTheme] = useState("light");
  const [certificatePreview, setCertificatePreview] = useState("");
  // Slots: [leftIndex, centerIndex, rightIndex]
  const [projectSlots, setProjectSlots] = useState([1, 0, 2]);

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handleSwapToCenter = (position) => {
    playClickSound(750);
    if (position === "left") {
      // Left card becomes center, old center goes to left
      setProjectSlots(([left, center, right]) => [center, left, right]);
    } else if (position === "right") {
      // Right card becomes center, old center goes to right
      setProjectSlots(([left, center, right]) => [left, right, center]);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartXRef.current) return;
    const touchEndX = e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : 0;
    const touchEndY = e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientY : 0;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - touchStartYRef.current;

    // Minimum swipe threshold 35px, horizontal swipe intent
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // Swiped Left -> Bring right card to center
        handleSwapToCenter("right");
      } else {
        // Swiped Right -> Bring left card to center
        handleSwapToCenter("left");
      }
    }
    touchStartXRef.current = 0;
    touchStartYRef.current = 0;
  };

  useEffect(() => {
    const updateThemeState = () => {
      const isDark = document.body.classList.contains("dark-mode");
      setTheme(isDark ? "dark" : "light");
    };

    updateThemeState();
    document.title = "Gabriel Lazaro — Software Developer";
    document.body.classList.add("home-route");

    const handleThemeEvent = (e) => {
      if (e?.detail?.theme) {
        setTheme(e.detail.theme);
      } else {
        updateThemeState();
      }
    };

    window.addEventListener("theme-change", handleThemeEvent);
    window.addEventListener("storage", updateThemeState);

    const observer = new MutationObserver(() => {
      updateThemeState();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      document.body.classList.remove("home-route");
      window.removeEventListener("theme-change", handleThemeEvent);
      window.removeEventListener("storage", updateThemeState);
      observer.disconnect();
    };
  }, []);

  const isDark = theme === "dark";

  const allFlatSkills = [
    "JavaScript (ES6+)",
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "NestJS",
    "Flutter",
    "Dart",
    "PostgreSQL",
    "Tailwind CSS",
    "Python",
  ];

  function downloadCV() {
    const link = document.createElement("a");
    link.href = "/Files/Gabriel-Lazaro-CV.pdf";
    link.download = "Gabriel-Lazaro-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <main className="lz-main-container">
        {/* 1. Hero Section */}
        <section className="lz-hero">
          <div className="lz-hero-photo-wrap">
            <img
              src={isDark ? "/Images/dark.png" : "/Images/light.png"}
              alt="Gabriel Lazaro"
              className="lz-hero-photo"
              fetchPriority="high"
            />
          </div>

          <div className="lz-hero-info">
            <h1 className="lz-hero-name">Gabriel Lazaro</h1>
            <p className="lz-hero-bio">
              I'm a Software Developer building clean web applications, interactive user interfaces, and scalable full-stack systems.
            </p>
            <p className="lz-hero-bio">
              Right now, I'm developing practical software projects, exploring end-to-end full-stack systems, and building tools to solve real-world problems.
            </p>

            <div className="lz-social-links">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lz-social-link"
                >
                  {link.label.toLowerCase()} ↗
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Highlights & Credentials Bar */}
        <section className="lz-metrics-bar">
          <div className="lz-metrics-top">
            <div className="lz-metric-top-item">
              <DynamicIcon name="GraduationCap" className="lz-metric-icon" />
              <div className="lz-metric-top-text">
                <h4>PHINMA Saint Jude</h4>
                <span>BS Information Technology</span>
              </div>
            </div>

            <div className="lz-metric-top-item">
              <DynamicIcon name="Code2" className="lz-metric-icon" />
              <div className="lz-metric-top-text">
                <h4>Software Developer</h4>
                <span>Full-Stack & Systems</span>
              </div>
            </div>

            <div className="lz-metric-top-item">
              <DynamicIcon name="Bot" className="lz-metric-icon" />
              <div className="lz-metric-top-text">
                <h4>AI Integrations</h4>
                <span>GenAI & Web Apps</span>
              </div>
            </div>
          </div>

          <div className="lz-metrics-bottom">
            <Link href="/certifications" className="lz-metric-bottom-item lz-metric-bottom-link">
              <h3>12+ ↗</h3>
              <span>CERTIFICATIONS</span>
            </Link>

            <Link href="/projects" className="lz-metric-bottom-item lz-metric-bottom-link">
              <h3>6+ ↗</h3>
              <span>PROJECTS SHIPPED</span>
            </Link>

            <div className="lz-metric-bottom-item">
              <h3>100% ↗</h3>
              <span>COMMITTED TO CODE</span>
            </div>
          </div>
        </section>

        {/* 3. Section 01 — Projects */}
        <section>
          <div className="lz-section-header">
            <span className="lz-section-title">01 — projects</span>
            <Link href="/projects" className="lz-section-link">
              ALL PROJECTS ↗
            </Link>
          </div>

          <div
            className="lz-deck-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {PROJECTS.map((proj, idx) => {
              let slotClass = "slot-center";
              let slotPosition = "center";
              if (idx === projectSlots[0]) {
                slotClass = "slot-left";
                slotPosition = "left";
              } else if (idx === projectSlots[2]) {
                slotClass = "slot-right";
                slotPosition = "right";
              }

              const isCenter = slotPosition === "center";

              return (
                <div
                  key={proj.title}
                  className={`lz-deck-card ${slotClass}`}
                  onClick={() => {
                    if (!isCenter) {
                      handleSwapToCenter(slotPosition);
                    }
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "8px" }}>
                      <span className="lz-project-pill">
                        {proj.badge || proj.category}
                      </span>
                      {isCenter && (
                        <span style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", color: "var(--muted, #94a3b8)", letterSpacing: "0.04em", fontWeight: "600" }}>
                          FEATURED
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontFamily: "ui-monospace, monospace", fontSize: "16px", fontWeight: "700", margin: "4px 0 6px" }}>
                      {proj.title}
                    </h3>
                    
                    <p style={{ fontSize: "13px", lineHeight: "1.55", color: "var(--muted, #64748b)", margin: 0 }}>
                      {proj.description}
                    </p>

                    {proj.tags && proj.tags.length > 0 && (
                      <div className="project-list-tags" style={{ marginTop: "14px", gap: "6px" }}>
                        {proj.tags.map((tag) => (
                          <span key={tag} className="project-tag-chip" style={{ fontSize: "11px", padding: "3px 9px" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid var(--border, #f1f5f9)" }}>
                    <a
                      href={proj.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lz-project-domain"
                      style={{ textDecoration: "none", fontWeight: "600", fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>{proj.domain}</span>
                      <span>↗</span>
                    </a>

                    {!isCenter && (
                      <span style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", color: "var(--muted, #64748b)" }}>
                        Click to center
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Section 02 — Experience */}
        <section>
          <div className="lz-section-header">
            <span className="lz-section-title">02 — experience</span>
            <Link href="/experience" className="lz-section-link">
              FULL HISTORY ↗
            </Link>
          </div>

          <div className="lz-experience-table">
            {FULL_EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className="lz-exp-row"
              >
                <div className="lz-exp-main">
                  <span className="lz-exp-year">{exp.year || "2024"}</span>
                  <span className="lz-exp-role">{exp.role}</span>
                </div>
                <span className="lz-exp-company">{exp.company}</span>
              </div>
            ))}
          </div>

          {/* STACK Bar */}
          <div className="lz-stack-container">
            <div className="lz-section-header" style={{ marginBottom: "12px" }}>
              <span className="lz-section-title">STACK</span>
              <Link href="/tech-stack" className="lz-section-link">
                VIEW ALL ↗
              </Link>
            </div>

            <div className="lz-stack-pills">
              {allFlatSkills.map((skill) => (
                <span
                  key={skill}
                  className="lz-stack-pill"
                >
                  {skill}
                </span>
              ))}
              <Link href="/tech-stack" className="lz-stack-more">
                + more
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Section 03 — Certifications */}
        <section>
          <div className="lz-section-header">
            <span className="lz-section-title">03 — certifications</span>
            <Link href="/certifications" className="lz-section-link">
              ALL CERTIFICATIONS ↗
            </Link>
          </div>

          <div className="lz-certs-grid">
            {HOME_CERTIFICATIONS.slice(0, 3).map((cert, idx) => (
              <div
                key={cert.title}
                className="lz-cert-card"
                onClick={() => setCertificatePreview(cert.image)}
              >
                <div className="lz-cert-icon">
                  <IssuerBrandLogo issuer={cert.issuer} iconName={idx === 0 ? "Sparkles" : idx === 1 ? "Award" : "FileCode"} />
                </div>
                <h4 className="lz-cert-title">{cert.title}</h4>
                <span className="lz-cert-issuer">{cert.issuer}</span>
                <span className="lz-cert-verify">⟨ PREVIEW ⟩</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Section 04 — GitHub & Connect */}
        <section>
          <div className="lz-section-header">
            <span className="lz-section-title">04 — github</span>
            <a
              href="https://github.com/gabrielsantoslazaro"
              target="_blank"
              rel="noopener noreferrer"
              className="lz-section-link"
            >
              @GABRIELSANTOSLAZARO ↗
            </a>
          </div>

          <div className="lz-github-banner">
            <GitHubContributions username="gabrielsantoslazaro" theme={theme} />
          </div>
        </section>

        {/* Footer */}
        <footer className="lz-main-footer">
          <p>&copy; 2026 Gabriel Lazaro. All Rights Reserved.</p>
        </footer>
      </main>

      <CertificateModal imageSrc={certificatePreview} onClose={() => setCertificatePreview("")} />
    </>
  );
}
