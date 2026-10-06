"use client";

import { useEffect, useState } from "react";
import { ALL_PROJECTS } from "@/lib/data";

export default function ProjectsPage() {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  useEffect(() => {
    const updateThemeState = () => {
      const isDark = document.body.classList.contains("dark-mode");
      setTheme(isDark ? "dark" : "light");
    };

    updateThemeState();
    document.title = "Projects — Gabriel Lazaro";
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
    <div className="certifications-page projects-page" style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      <div className="container" style={{ maxWidth: "760px", position: "relative", zIndex: 1, paddingTop: "20px" }}>
        {/* Clean Monospace Title & Subtitle Header */}
        <div style={{ marginBottom: "44px" }}>
          <h1
            className="page-title"
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              textTransform: "lowercase",
              fontSize: "30px",
              fontWeight: "700",
              letterSpacing: "-0.03em",
              color: isDark ? "#ffffff" : "#0f172a",
              marginBottom: "14px"
            }}
          >
            projects
          </h1>
          <p
            style={{
              fontSize: "14.5px",
              lineHeight: "1.65",
              color: isDark ? "#94a3b8" : "#64748b",
              maxWidth: "680px",
              margin: 0
            }}
          >
            Products and platforms I've designed and shipped — spanning generative AI, full-stack systems, and modern web applications.
          </p>
        </div>

        {/* Minimalist Projects List / Table (Exact Bryl Lim Format) */}
        <div className="project-list-table">
          {ALL_PROJECTS.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-list-row"
            >
              <div className="project-list-header-mobile">
                <span className="project-list-title">{item.title}</span>
                <span className="project-list-arrow-mobile">↗</span>
              </div>

              <div className="project-list-desc-col">
                <span className="project-list-category">{item.category}</span>
                <p className="project-list-p">{item.description}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="project-list-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="project-tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <span className="project-list-arrow-desktop">↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer cert-footer">
        <p>&copy; 2026 Gabriel Lazaro. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
