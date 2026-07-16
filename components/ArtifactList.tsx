"use client";

import { motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";
import { artifacts, railKeys } from "@/lib/content/artifacts";
import { useIsMobile } from "@/lib/useIsMobile";

export function ArtifactList() {
  const { openArtifactId, openArtifactById, mobileView, backToChat } = useAppState();
  const isMobile = useIsMobile();
  if (openArtifactId) return null;

  // Same reactive-slide reasoning as ArtifactPanel — this stays mounted
  // whenever no artifact is open, so the mobile slide has to key off
  // mobileView on every render, not just mount/unmount.
  const activeOnMobile = mobileView === "artifact-list";

  return (
    <motion.section
      className="app-right-pane"
      initial={isMobile ? { x: "100%" } : { opacity: 0 }}
      animate={isMobile ? { x: activeOnMobile ? 0 : "100%" } : { opacity: 1 }}
      exit={isMobile ? { x: "100%" } : { opacity: 0 }}
      transition={{ duration: isMobile ? 0.28 : 0.18, ease: "easeOut" }}
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
          Artifacts
        </div>
      </div>
      <div
        tabIndex={0}
        aria-label="Artifact list"
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
