"use client";

import { motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";

export function ArtifactList() {
  const { content, openArtifactById, mobileView, backToChat } = useAppState();
  const { uiCopy, artifacts, railKeys } = content;

  // No `if (openArtifactId) return null` guard here — the parent's
  // AnimatePresence ternary (PortfolioApp.tsx) already only renders this
  // component when there's no open artifact. Adding a second, reactive
  // check on the same value used to be redundant *and* actively broke the
  // transition: while this component plays its exit animation (selecting
  // an artifact swaps it for ArtifactPanel), it's still mounted and still
  // subscribed to context — so the instant openArtifactId flipped truthy,
  // this would re-render to null and the whole pane would vanish before
  // its fade-out ever got to play, instead of fading smoothly. See the
  // identical note in ArtifactPanel.tsx.

  // See ArtifactPanel's identical comment — the mobile slide is pure CSS
  // (`.app-right-pane.is-active`), not JS/Framer, so there's no
  // useIsMobile() lag that could show/hide it in the wrong place for a
  // frame on first render.
  const activeOnMobile = mobileView === "artifact-list";

  return (
    <motion.section
      className={`app-right-pane${activeOnMobile ? " is-active" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{ flexDirection: "column", minHeight: 0, background: "var(--panel)", borderLeft: "1px solid var(--border)" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "16px 16px 12px",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={backToChat}
          title={uiCopy.artifactListBackTitle}
          aria-label={uiCopy.artifactListBackTitle}
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
        <div
          style={{
            fontFamily: "var(--mono)",
            fontWeight: 600,
            fontSize: "9.5px",
            letterSpacing: "1.2px",
            color: "var(--faint)",
            textTransform: "uppercase",
          }}
        >
          {uiCopy.artifactListHeader}
        </div>
      </div>
      <div
        tabIndex={0}
        aria-label={uiCopy.artifactListHeader}
        style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px", padding: "0 12px 16px" }}
      >
        {railKeys.map((key) => {
          const a = artifacts[key];
          if (!a) return null;
          return (
            <motion.button
              key={key}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
              onClick={() => openArtifactById(key)}
              style={{
                textAlign: "left",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-md)",
                background: "var(--panel2)",
                padding: "12px",
                cursor: "pointer",
                display: "flex",
                gap: "11px",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  flex: "none",
                  borderRadius: "var(--r-sm)",
                  background: "var(--chip)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--accent)",
                  fontSize: "15px",
                }}
              >
                ▤
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: "var(--font)", fontWeight: 600, fontSize: "12.5px", color: "var(--text)" }}>
                  {a.title}
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--mono)",
                    fontSize: "9.5px",
                    color: "var(--faint)",
                    marginTop: "4px",
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                  }}
                >
                  {a.meta}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
}
