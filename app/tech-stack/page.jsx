"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BACKEND_URL, TECH_STACKS } from "@/lib/data";
import DynamicIcon from "@/components/common/DynamicIcon";

export default function TechStackPage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const updateThemeState = () => {
      const isDark = document.body.classList.contains("dark-mode");
      setTheme(isDark ? "dark" : "light");
    };

    updateThemeState();
    document.title = "Tech Stack — Gabriel Lazaro";
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

  return (
    <>
      <div className="certifications-page tech-stack-page" style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
        <div className="container" style={{ maxWidth: "760px", position: "relative", zIndex: 1, paddingTop: "20px" }}>

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
              tech stack
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
              The tools, frameworks, and platforms I reach for — across the front end, back end, infrastructure, and AI.
            </p>
          </div>

          {/* Categorized Stack Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            {TECH_STACKS.map((section) => (
              <div key={section.category} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <span
                  style={{
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    color: "var(--muted, #64748b)",
                    textTransform: "uppercase"
                  }}
                >
                  {section.category}
                </span>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {section.items.map((item) => (
                    <span
                      key={`${section.category}-${item}`}
                      style={{
                        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                        fontSize: "12px",
                        padding: "5px 12px",
                        borderRadius: "8px",
                        border: "1px solid var(--border, #e2e8f0)",
                        color: "var(--text, #334155)",
                        background: "var(--card-bg, #ffffff)",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                        letterSpacing: "0.01em",
                        cursor: "default"
                      }}
                    >
                      {item}
                    </span>
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
    </>
  );
}
