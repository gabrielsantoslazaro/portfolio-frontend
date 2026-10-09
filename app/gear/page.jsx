"use client";

import { useEffect, useState } from "react";
import { GEAR_CATEGORIES } from "@/lib/gear-data";

export default function GearPage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const updateThemeState = () => {
      const isDark = document.body.classList.contains("dark-mode");
      setTheme(isDark ? "dark" : "light");
    };

    updateThemeState();
    document.title = "Gear — Gabriel Lazaro";
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

  const isDark = theme === "dark";

  return (
    <div className="certifications-page gear-page" style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      <div className="container" style={{ maxWidth: "860px", position: "relative", zIndex: 1, paddingTop: "20px", paddingBottom: "60px" }}>
        {/* Header Monospace Title & Intro */}
        <div style={{ marginBottom: "40px" }}>
          <h1
            className="page-title"
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              textTransform: "lowercase",
              fontSize: "30px",
              fontWeight: "700",
              letterSpacing: "-0.03em",
              color: isDark ? "#ffffff" : "#0f172a",
              marginBottom: "14px",
            }}
          >
            gear
          </h1>
          <p
            style={{
              fontSize: "14.5px",
              lineHeight: "1.65",
              color: isDark ? "#a1a1aa" : "#64748b",
              maxWidth: "680px",
              margin: 0,
            }}
          >
            The hardware, tools, and setup I use to code, build full-stack systems, and stay productive — my daily desk setup and everyday carry.
          </p>
        </div>

        {/* Categorized Gear Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
          {GEAR_CATEGORIES.map((group) => (
            <div key={group.category} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Category Title */}
              <span
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "0.06em",
                  color: "var(--muted, #a1a1aa)",
                  textTransform: "uppercase",
                  paddingLeft: "2px",
                }}
              >
                {group.category}
              </span>

              {/* 3-Column / 2-Column Responsive Gear Grid */}
              <div className="gear-grid">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="gear-card"
                  >
                    {/* Inner Square Image Box */}
                    <div className="gear-thumb-wrap">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="gear-img"
                      />
                    </div>

                    {/* Card Content & Details */}
                    <div className="gear-info">
                      <div className="gear-header-row">
                        <h4 className="gear-title">{item.title}</h4>
                      </div>
                      <div className="gear-card-divider" />
                      <p className="gear-specs">{item.specs}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Footer */}
      <footer className="site-footer cert-footer">
        <p>&copy; 2026 Gabriel Lazaro. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
