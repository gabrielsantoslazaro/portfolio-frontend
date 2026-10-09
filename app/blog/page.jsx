"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DynamicIcon from "@/components/common/DynamicIcon";
import BlogCoverThumbnail from "@/components/blog/BlogCoverThumbnail";
import { BLOG_POSTS } from "@/lib/blog-data";
import { playClickSound } from "@/lib/sound";

export default function BlogPage() {
  const [theme, setTheme] = useState("light");
  const [viewMode, setViewMode] = useState("list"); // "list" | "grid"

  useEffect(() => {
    const updateThemeState = () => {
      const isDark = document.body.classList.contains("dark-mode");
      setTheme(isDark ? "dark" : "light");
    };

    updateThemeState();
    document.title = "Blog — Gabriel Lazaro";
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

  const toggleViewMode = (mode) => {
    if (mode === viewMode) return;
    playClickSound(950);
    setViewMode(mode);
  };

  const isDark = theme === "dark";

  return (
    <div className="certifications-page blog-page" style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      <div className="container" style={{ maxWidth: "780px", position: "relative", zIndex: 1, paddingTop: "20px" }}>
        {/* Header row with Title and List/Grid View Switcher */}
        <div style={{ marginBottom: "44px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
            <div>
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
                blog
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
                Thoughts, tutorials, and notes on software engineering, system architecture, and tech.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="blog-view-toggle" role="group" aria-label="View mode">
              <button
                type="button"
                onClick={() => toggleViewMode("list")}
                className={`blog-toggle-btn${viewMode === "list" ? " active" : ""}`}
                title="List View"
                aria-label="Switch to List View"
              >
                <DynamicIcon name="List" className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => toggleViewMode("grid")}
                className={`blog-toggle-btn${viewMode === "grid" ? " active" : ""}`}
                title="Grid View"
                aria-label="Switch to Grid View"
              >
                <DynamicIcon name="LayoutGrid" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* LIST VIEW */}
        {viewMode === "list" && (
          <div className="blog-list-container">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                onClick={playClickSound}
                className="blog-list-item"
              >
                {/* Thumbnail Cover */}
                <div className="blog-thumb-box">
                  <BlogCoverThumbnail post={post} />
                </div>

                {/* Info Column */}
                <div className="blog-list-info">
                  <span className="blog-item-date">{post.date}</span>
                  <h2 className="blog-item-title">{post.title}</h2>
                  <p className="blog-item-excerpt">{post.excerpt}</p>
                  <div className="blog-item-footer">
                    <span className="blog-read-label">Read</span>
                    <span className="blog-dot">·</span>
                    <span className="blog-read-time">{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* GRID VIEW (2 columns on tablet/desktop, 1 column on mobile) */}
        {viewMode === "grid" && (
          <div className="blog-grid-container">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                onClick={playClickSound}
                className="blog-grid-item"
              >
                {/* Card Thumbnail */}
                <div className="blog-grid-thumb-box">
                  <BlogCoverThumbnail post={post} />
                </div>

                {/* Card Info */}
                <div className="blog-grid-info">
                  <span className="blog-item-date">{post.date}</span>
                  <h2 className="blog-grid-title">{post.title}</h2>
                  <p className="blog-grid-excerpt">{post.excerpt}</p>
                  <div className="blog-item-footer">
                    <span className="blog-read-label">Read</span>
                    <span className="blog-dot">·</span>
                    <span className="blog-read-time">{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="site-footer cert-footer">
        <p>&copy; 2026 Gabriel Lazaro. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
