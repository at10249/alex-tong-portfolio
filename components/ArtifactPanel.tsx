"use client";

import { motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";
import { artifacts } from "@/lib/content/artifacts";
import { useIsMobile } from "@/lib/useIsMobile";
import { RichHtml } from "./RichHtml";

export function ArtifactPanel() {
  const { openArtifactId, closeArtifactPanel, startResize, downloadCV, mobileView, backToChat } = useAppState();
  const isMobile = useIsMobile();
  if (!openArtifactId) return null;
  const artifact = artifacts[openArtifactId];
  if (!artifact) return null;

  // On mobile this is a full-screen overlay that stays mounted across a
  // "back to chat" (openArtifactId persists so re-opening doesn't lose
  // state) — only mobileView flips. So the slide has to react to that
  // flip on every render, not just on mount/unmount like the desktop fade.
  const activeOnMobile = mobileView === "artifact";

  return (
    <motion.section
      className="app-right-pane"
      // Every variant always states `opacity` explicitly (even where it's
      // just 1, unchanging) — useIsMobile() defaults to false on first
      // render and flips shortly after mount, so a render can briefly take
      // the desktop branch before switching to mobile. If mobile's animate
      // target omitted opacity entirely, Framer would abandon that fade
      // mid-flight and leave it stranded wherever it happened to be
      // (observed stuck at 0 — a fully invisible "blank page" panel).
      initial={isMobile ? { x: "100%", opacity: 1 } : { opacity: 0, x: 0 }}
      animate={isMobile ? { x: activeOnMobile ? 0 : "100%", opacity: 1 } : { opacity: 1, x: 0 }}
      exit={isMobile ? { x: "100%", opacity: 1 } : { opacity: 0, x: 0 }}
      transition={{ duration: isMobile ? 0.28 : 0.18, ease: "easeOut" }}
      style={{
        flexDirection: "column",
        minHeight: 0,
        background: "var(--panel)",
        borderLeft: "1px solid var(--border)",
        // Desktop needs `relative` so the resize handle can anchor against
        // it. Mobile needs the CSS class's `fixed` (full-screen overlay,
        // out of .app-root's flex flow) — an inline style here would beat
        // that class rule and silently break it, which is exactly what
        // squeezed the chat's scroll area to 0 height whenever an artifact
        // auto-opened alongside a scripted answer on mobile.
        position: isMobile ? "fixed" : "relative",
      }}
    >
      <div
        onMouseDown={startResize}
        className="resize-handle"
        style={{ position: "absolute", left: "-3px", top: 0, bottom: 0, width: "8px", cursor: "ew-resize", zIndex: 5 }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 16px",
          borderBottom: "1px solid var(--border)",
          background: "var(--panel2)",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={backToChat}
          title="Back to chat"
          aria-label="Back to chat"
          className="back-to-chat-btn"
          style={{
            width: 26,
            height: 26,
            flex: "none",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--r-sm)",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--muted)",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          ‹
        </motion.button>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font)",
              fontWeight: 600,
              fontSize: "12.5px",
              color: "var(--text)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {artifact.title}
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--faint)", marginTop: "2px" }}>
            {artifact.meta}
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={downloadCV}
            title="Download"
            aria-label="Download CV"
            style={{
              width: 26,
              height: 26,
              borderRadius: "var(--r-sm)",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--muted)",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            ↓
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={closeArtifactPanel}
            title="Close"
            aria-label="Close artifact"
            style={{
              width: 26,
              height: 26,
              borderRadius: "var(--r-sm)",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--muted)",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            ×
          </motion.button>
        </div>
      </div>
      <div tabIndex={0} aria-label="Artifact content" style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "16px" }}>
        <div
          className="doc-card-pad"
          style={{
            background: "var(--doc-bg)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-md)",
            padding: "26px 28px",
            boxShadow: "0 1px 3px rgba(0,0,0,.05)",
          }}
        >
          <RichHtml html={artifact.html} />
        </div>
      </div>
    </motion.section>
  );
}
