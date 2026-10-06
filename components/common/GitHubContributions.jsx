"use client";

import { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";

export default function GitHubContributions({ username = "gabrielsantoslazaro", theme = "light" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const customTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  if (!mounted) {
    return (
      <div style={{ padding: "24px 16px", textAlign: "center", color: "var(--muted, #64748b)", fontFamily: "ui-monospace, monospace", fontSize: "12px" }}>
        Loading GitHub contributions...
      </div>
    );
  }

  return (
    <div className="github-calendar-scroll">
      <GitHubCalendar
        username={username}
        blockSize={11}
        blockMargin={3}
        fontSize={11}
        colorScheme={theme === "dark" ? "dark" : "light"}
        theme={customTheme}
        labels={{
          totalCount: "{{count}} contributions in the last year",
        }}
      />
    </div>
  );
}
