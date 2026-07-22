"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";
import { useIsMobile } from "@/lib/useIsMobile";
import { ArtifactChip } from "./ArtifactChip";
import { RichHtml } from "./RichHtml";

export function ArtifactPanel() {
  const {
    content,
    openArtifactId,
    openArtifactById,
    closeArtifactPanel,
    startResize,
    downloadCV,
    mobileView,
    showArtifactList,
    rightPaneCollapsed,
    toggleRightPaneCollapsed,
  } = useAppState();
  const { uiCopy } = content;
  const isMobile = useIsMobile();

  // Frozen copy of the last non-null id, not the live `openArtifactId`
  // straight from context. The parent's AnimatePresence ternary
  // (PortfolioApp.tsx) keeps this component mounted for its exit
  // animation after openArtifactId has already gone back to null (e.g.
  // closeArtifactPanel/backToChat) — reading it live here would render
  // the artifact's content as gone immediately, snapping the pane to
  // blank instead of fading out with its last content still showing.
  // Still updates instantly for a genuine id change (e.g. clicking a
  // related-artifact chip below), since that's a truthy value coming in.
  // (State, not a ref — adjusting state during render like this, guarded
  // by a comparison, is React's own sanctioned pattern for "derive from a
  // prop but keep the last value once it disappears"; it resolves within
  // the same render pass, so there's no stale-frame flash.)
  const [activeArtifactId, setActiveArtifactId] = useState<string | null>(openArtifactId);
  if (openArtifactId && openArtifactId !== activeArtifactId) {
    setActiveArtifactId(openArtifactId);
  }

  const artifact = activeArtifactId ? content.artifacts[activeArtifactId] : undefined;
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
      className={`app-right-pane${activeOnMobile ? " is-active" : ""}${rightPaneCollapsed ? " is-collapsed" : ""}`}
      // Same reasoning as Sidebar's `inert` — a 0-width collapsed column is
      // this component's own equivalent of mobile's off-canvas hidden state.
      inert={isMobile ? !activeOnMobile : rightPaneCollapsed}
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
      {!rightPaneCollapsed && (
        <div
          onMouseDown={startResize}
          className="resize-handle"
          style={{ position: "absolute", left: "-3px", top: 0, bottom: 0, width: "8px", cursor: "ew-resize", zIndex: 5 }}
        />
      )}
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
          onClick={showArtifactList}
          title={uiCopy.artifactPanelBackTitle}
          aria-label={uiCopy.artifactPanelBackTitle}
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
          {activeArtifactId === "bio" && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={downloadCV}
              title={uiCopy.artifactPanelDownloadTitle}
              aria-label={uiCopy.artifactPanelDownloadAria}
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
            title={uiCopy.artifactPanelCloseTitle}
            aria-label={uiCopy.artifactPanelCloseAria}
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
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleRightPaneCollapsed}
            title={uiCopy.rightPaneCollapseTitle}
            aria-label={uiCopy.rightPaneCollapseAria}
            className="desktop-panel-toggle"
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
            »
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
        {!!artifact.related?.length && (
          <div style={{ marginTop: "14px" }}>
            <div
              style={{
                fontFamily: "var(--font)",
                fontWeight: 600,
                fontSize: "9.5px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "var(--faint)",
                marginBottom: "8px",
              }}
            >
              {uiCopy.artifactPanelRelatedLabel}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {artifact.related.map((id) => {
                const related = content.artifacts[id];
                if (!related) return null;
                return <ArtifactChip key={id} title={related.title} onClick={() => openArtifactById(id)} />;
              })}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
