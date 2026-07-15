"use client";

import { useAppState } from "@/context/AppStateContext";
import { artifacts } from "@/lib/content/artifacts";
import { RichHtml } from "./RichHtml";

export function ArtifactPanel() {
  const { openArtifactId, closeArtifactPanel, startResize, downloadCV, mobileView, backToChat } = useAppState();
  if (!openArtifactId) return null;
  const artifact = artifacts[openArtifactId];
  if (!artifact) return null;

  return (
    <section
      className={`app-right-pane${mobileView === "artifact" ? " is-active" : ""}`}
      style={{
        flexDirection: "column",
        minHeight: 0,
        background: "var(--panel)",
        borderLeft: "1px solid var(--border)",
        position: "relative",
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
        <button
          onClick={backToChat}
          title="Back to chat"
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
        </button>
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
          <button
            onClick={downloadCV}
            title="Download"
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
          </button>
          <button
            onClick={closeArtifactPanel}
            title="Close"
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
          </button>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "16px" }}>
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
    </section>
  );
}
