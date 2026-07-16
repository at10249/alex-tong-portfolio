"use client";

import { motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";
import { artifacts } from "@/lib/content/artifacts";
import { RichHtml } from "./RichHtml";

export function ArtifactPanel() {
  const { openArtifactId, closeArtifactPanel, startResize, downloadCV, mobileView, backToChat } = useAppState();
  if (!openArtifactId) return null;
  const artifact = artifacts[openArtifactId];
  if (!artifact) return null;

  // The mobile slide (and the `position: fixed` full-screen overlay it
  // needs) is handled entirely by CSS (`.app-right-pane.is-active` in
  // globals.css), not Framer/JS — a JS "is this mobile" check needs an
  // effect to confirm via matchMedia, so it's briefly wrong on the very
  // first render on an actual mobile device. That previously either fought
  // this element's `position` (when set inline) or left an in-flight
  // Framer transition stranded at the wrong value — including a visible
  // flash of the panel at its "active" position before snapping away.
  // CSS media queries have no such lag. Framer here only does the
  // (breakpoint-independent) opacity crossfade on mount/unmount.
  const activeOnMobile = mobileView === "artifact";

  return (
    <motion.section
      className={`app-right-pane${activeOnMobile ? " is-active" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{
        flexDirection: "column",
        minHeight: 0,
        background: "var(--panel)",
        borderLeft: "1px solid var(--border)",
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
          {openArtifactId === "bio" && (
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
          )}
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
