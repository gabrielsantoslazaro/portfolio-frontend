"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BACKEND_URL, FULL_EXPERIENCES } from "@/lib/data";
import DynamicIcon from "@/components/common/DynamicIcon";

export default function ExperiencePage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const updateThemeState = () => {
      const isDark = document.body.classList.contains("dark-mode");
      setTheme(isDark ? "dark" : "light");
    };

    updateThemeState();
    document.title = "Experience — Gabriel Lazaro";
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
      <div className="certifications-page experience-page" style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
        <div className="container" style={{ maxWidth: "760px", position: "relative", zIndex: 1, paddingTop: "20px" }}>

          {/* Clean Monospace Title & Intro Header */}
          <div style={{ marginBottom: "44px" }}>
            <h1
              className="page-title"
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                textTransform: "lowercase",
                fontSize: "30px",
                fontWeight: "700",
                letterSpacing: "-0.03em",
                color: theme === "dark" ? "#ffffff" : "#0f172a",
                marginBottom: "16px"
              }}
            >
              experience
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
              Building across AI engineering, full-stack systems, and modern web development — from enterprise front-end internship to custom GenAI chatbots, database architectures, and practical web tools.
            </p>
          </div>

          {/* Timeline List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {FULL_EXPERIENCES.map((exp, idx) => (
              <div key={idx} style={{ position: "relative", display: "flex", gap: "22px", alignItems: "flex-start" }}>
                {/* Monogram Badge */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    border: "1px solid var(--border, #e2e8f0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "var(--text, #0f172a)",
                    background: "var(--card-bg, #ffffff)",
                    flexShrink: 0,
                    marginTop: "0px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
                  }}
                >
                  {exp.monogram}
                </div>

                {/* Company Details & Role Branch */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "14px" }}>
                  {/* Company Header */}
                  <div>
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "var(--text, #0f172a)",
                        margin: "0 0 3px",
                        letterSpacing: "-0.01em"
                      }}
                    >
                      {exp.company}
                    </h3>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--muted, #64748b)",
                        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                      }}
                    >
                      {exp.employmentType}
                    </div>
                    {exp.location && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--muted, #64748b)",
                          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                          marginTop: "2px"
                        }}
                      >
                        {exp.location}
                      </div>
                    )}
                  </div>

                  {/* Vertical Timeline Branch */}
                  <div
                    style={{
                      position: "relative",
                      paddingLeft: "20px",
                      borderLeft: "1px solid var(--border, #e2e8f0)",
                      marginLeft: "6px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      paddingTop: "2px"
                    }}
                  >
                    {/* Ring Node Indicator */}
                    <div
                      style={{
                        position: "absolute",
                        left: "-5px",
                        top: "6px",
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        border: "1.5px solid var(--muted, #94a3b8)",
                        background: "var(--bg-main, #ffffff)"
                      }}
                    />

                    {/* Role Title & Date */}
                    <div>
                      <h4
                        style={{
                          fontSize: "14.5px",
                          fontWeight: "700",
                          color: "var(--text, #0f172a)",
                          margin: "0 0 4px"
                        }}
                      >
                        {exp.role}
                      </h4>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "var(--muted, #64748b)",
                          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em"
                        }}
                      >
                        {exp.period}
                      </div>
                    </div>

                    {/* Description Paragraphs */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "2px" }}>
                      {exp.paragraphs.map((para, pIdx) => (
                        <p
                          key={pIdx}
                          style={{
                            fontSize: "13.5px",
                            lineHeight: "1.65",
                            color: "var(--text, #334155)",
                            margin: 0
                          }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Skill Tags */}
                    {exp.skills && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginTop: "6px"
                        }}
                      >
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            style={{
                              fontSize: "11px",
                              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                              padding: "3px 10px",
                              borderRadius: "6px",
                              border: "1px solid var(--border, #e2e8f0)",
                              color: "var(--muted, #475569)",
                              background: "var(--card-bg, #ffffff)",
                              letterSpacing: "0.02em"
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
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
