"use client";

import { motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";
import { useCurrentHost } from "@/lib/useCurrentHost";

export function ChatHeader() {
  const { content, downloadCV, toggleMobileSidebar, showArtifactList, newChat } = useAppState();
  const { uiCopy } = content;
  const host = useCurrentHost();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "13px 20px",
        borderBottom: "1px solid var(--border)",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleMobileSidebar}
        title={uiCopy.chatHeaderMenuTitle}
        aria-label={uiCopy.chatHeaderMenuAria}
        className="mobile-menu-btn"
        style={{
          width: 30,
          height: 30,
          flex: "none",
          borderRadius: "var(--r-sm)",
          border: "1px solid var(--border)",
          background: "transparent",
          color: "var(--muted)",
          cursor: "pointer",
          fontSize: "14px",
          placeItems: "center",
        }}
      >
        ☰
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={showArtifactList}
        title={uiCopy.chatHeaderArtifactsTitle}
        aria-label={uiCopy.chatHeaderArtifactsAria}
        className="mobile-artifacts-nav"
        style={{
          width: 30,
          height: 30,
          flex: "none",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "var(--r-sm)",
          border: "1px solid var(--border)",
          background: "transparent",
          color: "var(--muted)",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        ▤
      </motion.button>
      <button
        onClick={newChat}
        aria-label="Go to home"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          minWidth: 0,
          border: "none",
          background: "transparent",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3f9d6b", flex: "none" }} />
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "11.5px",
            color: "var(--muted)",
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {host}
        </span>
      </button>
      <div style={{ marginLeft: "auto", display: "flex", gap: "8px", flex: "none" }}>
        <motion.a
          whileTap={{ scale: 0.95 }}
          href="https://www.linkedin.com/in/alexkevintong"
          target="_blank"
          rel="noopener"
          style={{
            fontFamily: "var(--font)",
            fontWeight: 500,
            fontSize: "11.5px",
            padding: "7px 13px",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-sm)",
            color: "var(--text)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            flex: "none",
          }}
        >
          LinkedIn
        </motion.a>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={downloadCV}
          style={{
            fontFamily: "var(--font)",
            fontWeight: 500,
            fontSize: "11.5px",
            padding: "7px 13px",
            borderRadius: "var(--r-sm)",
            background: "var(--accent)",
            color: "var(--accent-ink)",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            flex: "none",
          }}
        >
          {uiCopy.chatHeaderDownloadCV}
        </motion.button>
      </div>
    </header>
  );
}
