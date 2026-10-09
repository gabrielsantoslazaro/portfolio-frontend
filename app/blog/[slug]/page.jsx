"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import BlogCoverThumbnail from "@/components/blog/BlogCoverThumbnail";
import DynamicIcon from "@/components/common/DynamicIcon";
import { playClickSound } from "@/lib/sound";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug;
  const [theme, setTheme] = useState("light");
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);

  useEffect(() => {
    const updateThemeState = () => {
      const isDark = document.body.classList.contains("dark-mode");
      setTheme(isDark ? "dark" : "light");
    };

    updateThemeState();
    document.body.classList.add("cert-route");

    if (post) {
      document.title = `${post.title} — Gabriel Lazaro`;
    }

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
  }, [post]);

  if (!post) {
    notFound();
  }

  const handleCopyLink = () => {
    playClickSound();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleShareLinkedIn = () => {
    playClickSound();
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(post.title);
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const scrollToTop = () => {
    playClickSound();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isDark = theme === "dark";

  return (
    <div className="certifications-page blog-post-page" style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      <div className="container" style={{ maxWidth: "720px", position: "relative", zIndex: 1, paddingTop: "20px" }}>
        {/* Top Back Link */}
        <div style={{ marginBottom: "24px" }}>
          <Link
            href="/blog"
            onClick={playClickSound}
            className="post-back-link"
          >
            &lt; all posts
          </Link>
        </div>

        {/* Article Header */}
        <header className="post-header">
          <div className="post-meta-line">
            <span>{post.date?.toUpperCase()}</span>
            <span className="post-meta-dot">·</span>
            <span>{post.readTime?.toUpperCase()} READ</span>
          </div>

          <h1 className="post-title">{post.title}</h1>

          <p className="post-excerpt-sub">{post.excerpt}</p>

          {/* Author Row */}
          <div className="post-author-row">
            <img
              src={isDark ? "/Images/dark.png" : "/Images/light.png"}
              alt="Gabriel Lazaro"
              className="post-author-avatar"
            />
            <span className="post-author-name">Gabriel Lazaro</span>
          </div>
        </header>

        {/* Cover Graphic Banner */}
        <div className="post-cover-banner">
          <BlogCoverThumbnail post={post} />
        </div>

        {/* Main Article Content */}
        <article className="post-body-prose">
          {post.paragraphs.map((para, index) => (
            <p key={index} className="post-paragraph">
              {para}
            </p>
          ))}
        </article>

        {/* Bottom Navigation & Share Controls Bar */}
        <div className="post-bottom-nav">
          <Link
            href="/blog"
            onClick={playClickSound}
            className="post-back-link"
          >
            &lt; all posts
          </Link>

          <div className="post-share-group">
            {/* LinkedIn Share */}
            <button
              type="button"
              onClick={handleShareLinkedIn}
              className="post-share-btn"
              title="Share on LinkedIn"
              aria-label="Share on LinkedIn"
            >
              <DynamicIcon name="Linkedin" className="w-4 h-4" />
            </button>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="post-share-btn"
              title="Copy Link"
              aria-label="Copy Link"
            >
              <DynamicIcon name={copied ? "Check" : "Link2"} className="w-4 h-4" />
              {copied && <span className="post-copied-tip">Copied!</span>}
            </button>
          </div>
        </div>

        {/* Post Footer */}
        <footer className="post-site-footer">
          <span className="post-footer-copy">&copy; 2026 Gabriel Lazaro</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="post-footer-top-btn"
          >
            &uarr; back to top
          </button>
        </footer>
      </div>
    </div>
  );
}
