"use client";

import Image from "next/image";
import { useAppState } from "@/context/AppStateContext";
import { artifacts } from "@/lib/content/artifacts";
import { RichHtml } from "./RichHtml";

const avatarStyle = {
  width: 26,
  height: 26,
  flex: "none" as const,
  borderRadius: "var(--r-sm)",
  objectFit: "cover" as const,
  objectPosition: "50% 12%",
  filter: "var(--photo-filter)",
};

export function MessageThread() {
  const { messages, loading, openArtifactById } = useAppState();

  if (messages.length === 0) return null;

  return (
    <div
      style={{
        maxWidth: "760px",
        width: "100%",
        margin: "0 auto",
        padding: "26px 28px 8px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {messages.map((m, i) => {
        const isBot = m.role === "bot";
        const artifact = isBot && m.artifact ? artifacts[m.artifact] : null;
        return (
          <div
            key={i}
            className="at-msg"
            style={isBot ? { display: "flex", gap: "10px", maxWidth: "100%" } : { display: "flex", justifyContent: "flex-end" }}
          >
            {isBot && <Image src="/assets/alex.jpeg" alt="Alex Tong" width={26} height={26} style={avatarStyle} />}
            <div
              style={
                isBot
                  ? { fontFamily: "var(--font)", fontSize: "13px", lineHeight: "1.65", color: "var(--text)", maxWidth: "640px" }
                  : {
                      background: "var(--accent)",
                      color: "var(--accent-ink)",
                      borderRadius: "var(--r-lg) var(--r-lg) 4px var(--r-lg)",
                      padding: "10px 14px",
                      fontFamily: "var(--font)",
                      fontSize: "13px",
                      lineHeight: "1.5",
                      maxWidth: "80%",
                    }
              }
            >
              {isBot ? <RichHtml html={m.html ?? ""} /> : m.text}
              {artifact && m.artifact && (
                <button
                  onClick={() => openArtifactById(m.artifact as string)}
                  style={{
                    marginTop: "12px",
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
                      {artifact.title}
                    </span>
                    <span style={{ display: "block", fontFamily: "var(--font)", fontSize: "10px", color: "var(--faint)" }}>
                      Click to open →
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
        );
      })}

      {loading && (
        <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
          <Image src="/assets/alex.jpeg" alt="Alex Tong" width={26} height={26} style={avatarStyle} />
          <div style={{ display: "flex", gap: "5px", color: "var(--muted)", padding: "8px 2px" }}>
            <span className="at-dot" />
            <span className="at-dot" style={{ animationDelay: ".2s" }} />
            <span className="at-dot" style={{ animationDelay: ".4s" }} />
          </div>
        </div>
      )}
    </div>
  );
}
