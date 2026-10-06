"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: "80px 20px", textAlign: "center", fontFamily: "ui-monospace, monospace" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>Something went wrong</h2>
      <button
        type="button"
        onClick={() => reset()}
        style={{
          padding: "8px 16px",
          background: "#0f172a",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "13px"
        }}
      >
        Try again
      </button>
    </div>
  );
}
