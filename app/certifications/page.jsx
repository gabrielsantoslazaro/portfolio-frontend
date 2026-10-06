"use client";

import { useEffect, useState } from "react";
import { CATEGORIZED_CERTIFICATIONS } from "@/lib/data";
import DynamicIcon from "@/components/common/DynamicIcon";

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

export default function CertificationsPage() {
  const [theme, setTheme] = useState("light");
  const [certificatePreview, setCertificatePreview] = useState("");

  useEffect(() => {
    const updateThemeState = () => {
      const isDark = document.body.classList.contains("dark-mode");
      setTheme(isDark ? "dark" : "light");
    };

    updateThemeState();
    document.title = "Certifications — Gabriel Lazaro";
    document.body.classList.add("cert-route");

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
      document.body.classList.remove("cert-route");
      window.removeEventListener("theme-change", handleThemeEvent);
      window.removeEventListener("storage", updateThemeState);
      observer.disconnect();
    };
  }, []);

  const handleCertClick = (cert) => {
    if (cert.image) {
      setCertificatePreview(cert.image);
    } else if (cert.href) {
      window.open(cert.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <div className="certifications-page" style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
        <div className="container" style={{ maxWidth: "860px", position: "relative", zIndex: 1, paddingTop: "20px", paddingBottom: "60px" }}>
          {/* Clean Monospace Title & Subtitle */}
          <div style={{ marginBottom: "40px" }}>
            <h1
              className="page-title"
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                textTransform: "lowercase",
                fontSize: "30px",
                fontWeight: "700",
                letterSpacing: "-0.03em",
                color: theme === "dark" ? "#ffffff" : "#0f172a",
                marginBottom: "14px"
              }}
            >
              certifications
            </h1>
            <p
              style={{
                fontSize: "14.5px",
                lineHeight: "1.65",
                color: theme === "dark" ? "#94a3b8" : "#64748b",
                maxWidth: "680px",
                margin: 0
              }}
            >
              Credentials across AI, cloud, engineering, and web development — each verifiable at its source.
            </p>
          </div>

          {/* Categorized Certifications Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {CATEGORIZED_CERTIFICATIONS.map((group) => (
              <div key={group.category} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Category Header */}
                <span
                  style={{
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "12px",
                    fontWeight: "700",
                    letterSpacing: "0.06em",
                    color: "var(--muted, #94a3b8)",
                    textTransform: "uppercase",
                    paddingLeft: "2px"
                  }}
                >
                  {group.category}
                </span>

                {/* Clean Straight Grid */}
                <div className="cert-clean-grid">
                  {group.items.map((cert, cIdx) => (
                    <div
                      key={`${cert.title}-${cIdx}`}
                      onClick={() => handleCertClick(cert)}
                      className="cert-clean-card"
                    >
                      {/* Crisp Brand Logo in Squircle Box */}
                      <div className="cert-clean-icon">
                        <IssuerBrandLogo issuer={cert.issuer} iconName={cert.icon} />
                      </div>

                      {/* Title & Issuer */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <h4 className="cert-clean-title">
                          {cert.title}
                        </h4>
                        <span className="cert-clean-issuer">
                          {cert.issuer}
                        </span>
                      </div>

                      {/* Action Tag */}
                      <span className="cert-clean-verify">
                        {cert.href ? "Verify ↗" : "Preview ↗"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="site-footer cert-footer">
          <p>&copy; 2026 Gabriel Lazaro. All Rights Reserved.</p>
        </footer>
      </div>

      <CertificateModal imageSrc={certificatePreview} onClose={() => setCertificatePreview("")} />
    </>
  );
}
