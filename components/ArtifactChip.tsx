"use client";

import { motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";

// Shared chip UI for "here's a related artifact" — used both under a chat
// message that discusses one, and inside an artifact document that
// references others (its own `related` list).
export function ArtifactChip({ title, onClick }: { title: string; onClick: () => void }) {
  const { content } = useAppState();
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-md)",
        padding: "9px 11px",
        background: "var(--panel2)",
        cursor: "pointer",
        textAlign: "left",
        maxWidth: "280px",
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
        <span
          style={{
            display: "block",
            fontFamily: "var(--font)",
            fontWeight: 600,
            fontSize: "11.5px",
            color: "var(--text)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
        <span style={{ display: "block", fontFamily: "var(--font)", fontSize: "10px", color: "var(--faint)" }}>
          {content.uiCopy.artifactChipCta}
        </span>
      </span>
    </motion.button>
  );
}
