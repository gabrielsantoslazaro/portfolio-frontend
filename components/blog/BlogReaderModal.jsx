"use client";

import { useEffect, useState } from "react";
import DynamicIcon from "@/components/common/DynamicIcon";
import BlogCoverThumbnail from "@/components/blog/BlogCoverThumbnail";
import { playClickSound } from "@/lib/sound";

export default function BlogReaderModal({ post, onClose }) {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.body.classList.contains("dark-mode"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!post) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        playClickSound();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [post, onClose]);

  if (!post) return null;

  const handleCopyLink = () => {
    playClickSound();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/blog#${post.slug}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="blog-modal-backdrop" onClick={onClose}>
      <div
        className="blog-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-modal-title"
      >
        {/* Header Bar */}
        <div className="blog-modal-header">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="blog-modal-back-btn"
            aria-label="Go back to articles"
          >
            <DynamicIcon name="ArrowLeft" className="w-4 h-4" />
            <span>back to all posts</span>
          </button>

          <div className="blog-modal-header-actions">
            <button
              type="button"
              onClick={handleCopyLink}
              className="blog-modal-action-btn"
              title="Copy link to post"
              aria-label="Copy link"
            >
              <DynamicIcon name={copied ? "Check" : "Share2"} className="w-4 h-4" />
              <span>{copied ? "copied!" : "share"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="blog-modal-close-btn"
              aria-label="Close post reader"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Scrollable Reader Content */}
        <article className="blog-modal-body">
          {/* Meta header */}
          <div className="blog-modal-meta">
            <span className="blog-modal-category">{post.category}</span>
            <span className="blog-modal-dot">•</span>
            <span className="blog-modal-date">{post.date}</span>
            <span className="blog-modal-dot">•</span>
            <span className="blog-modal-readtime">{post.readTime}</span>
          </div>

          <h1 id="blog-modal-title" className="blog-modal-title">
            {post.title}
          </h1>

          {/* Cover Image / Artistic Banner */}
          <div className="blog-modal-cover-wrap">
            <BlogCoverThumbnail post={post} />
          </div>

          {/* Post Paragraphs */}
          <div className="blog-modal-prose">
            {post.paragraphs.map((para, idx) => (
              <p key={idx} className="blog-modal-paragraph">
                {para}
              </p>
            ))}
          </div>

          {/* Author Footer Card */}
          <div className="blog-modal-author-card">
            <div className="blog-author-avatar-wrap">
              <img
                src={isDark ? "/Images/dark.png" : "/Images/light.png"}
                alt="Gabriel Lazaro"
                className="blog-author-avatar"
              />
            </div>
            <div className="blog-author-info">
              <h4 className="blog-author-name">Gabriel Lazaro</h4>
              <p className="blog-author-desc">
                Software Developer based in Manila, Philippines. Building web applications, dual-screen POS systems, and AI-driven platforms.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
