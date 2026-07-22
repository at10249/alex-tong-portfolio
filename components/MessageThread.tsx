"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";
import { ArtifactChip } from "./ArtifactChip";
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

const avatarButtonStyle = {
  border: "none",
  background: "transparent",
  padding: 0,
  cursor: "pointer",
  flex: "none" as const,
  lineHeight: 0,
};

export function MessageThread() {
  const { content, messages, loading, openArtifactById, openPhotoLightbox } = useAppState();

  if (messages.length === 0) return null;

  return (
    <div
      className="chat-thread-pad"
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
        const msgArtifacts = isBot
          ? (m.artifacts ?? []).map((id) => ({ id, artifact: content.artifacts[id] })).filter((a) => a.artifact)
          : [];
        // Scripted answers re-derive their HTML live from the current
        // theme's content on every render, so switching themes mid-
        // conversation re-voices replies already on screen. Live
        // LLM-generated replies (no conversationId) just use what's stored.
        const displayHtml = m.conversationId
          ? (content.conversations.find((c) => c.id === m.conversationId)?.a ?? m.html)
          : m.html;
        return (
          <motion.div
            key={i}
            data-role={m.role}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={isBot ? { display: "flex", gap: "10px", maxWidth: "100%" } : { display: "flex", justifyContent: "flex-end" }}
          >
            {isBot && (
              <button
                onClick={openPhotoLightbox}
                aria-label={`View larger photo of ${content.displayName}`}
                style={avatarButtonStyle}
              >
                <Image src={content.photoSrc} alt={content.displayName} width={26} height={26} style={avatarStyle} />
              </button>
            )}
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
              {isBot ? <RichHtml html={displayHtml ?? ""} /> : m.text}
              {msgArtifacts.length > 0 && (
                <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {msgArtifacts.map(({ id, artifact }) => (
                    <ArtifactChip key={id} title={artifact!.title} onClick={() => openArtifactById(id)} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}

      {loading && (
        <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
          <button onClick={openPhotoLightbox} aria-label={`View larger photo of ${content.displayName}`} style={avatarButtonStyle}>
            <Image src={content.photoSrc} alt={content.displayName} width={26} height={26} style={avatarStyle} />
          </button>
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
