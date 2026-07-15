"use client";

import { useAppState } from "@/context/AppStateContext";
import { artifacts, railKeys } from "@/lib/content/artifacts";

export function ArtifactList() {
  const { openArtifactId, openArtifactById } = useAppState();
  if (openArtifactId) return null;

  return (
    <section style={{ display: "flex", flexDirection: "column", minHeight: 0, background: "var(--panel)", borderLeft: "1px solid var(--border)" }}>
      <div
        style={{
          padding: "16px 16px 12px",
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
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px", padding: "0 12px 16px" }}>
        {railKeys.map((key) => {
          const a = artifacts[key];
          if (!a) return null;
          return (
            <button
              key={key}
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
            </button>
          );
        })}
      </div>
    </section>
  );
}
