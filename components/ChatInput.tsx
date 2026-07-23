"use client";

import { motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";
import { useCurrentHost } from "@/lib/useCurrentHost";

export function ChatInput() {
  const { content, messages, draft, setDraft, onInputKeyDown, sendDraft, sendSuggestion, theme, llmAvailable, shuffleTheme } =
    useAppState();
  const { uiCopy } = content;
  const host = useCurrentHost();
  const isEmpty = messages.length === 0;
  const isTerminal = theme === "terminal";

  const placeholder = !llmAvailable
    ? uiCopy.chatInputPlaceholderPaused
    : isEmpty
      ? uiCopy.chatInputPlaceholderEmpty
      : uiCopy.chatInputPlaceholderFollowUp;

  return (
    <div className="chat-input-pad" style={{ padding: "12px 28px 22px", flexShrink: 0 }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {isEmpty && (
          <div
            className="suggestion-chip-row"
            style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "12px", justifyContent: "center" }}
          >
            {/* Longest-first, not conversation order — order doesn't matter
                here, and packing the widest chips while a full row's width
                is still available lets flex-wrap fit more per row than
                DOM order does, which is what keeps this to 2 rows on
                narrow phones instead of 3. */}
            {[...content.conversations]
              .sort((a, b) => b.title.length - a.title.length)
              .map((c) => (
                <motion.button
                  key={c.id}
                  className="suggestion-chip"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ y: -1 }}
                  onClick={() => sendSuggestion(c)}
                  style={{
                    fontFamily: "var(--font)",
                    fontSize: "11.5px",
                    fontWeight: 500,
                    padding: "7px 12px",
                    borderRadius: "999px",
                    border: "1px solid var(--border)",
                    background: "var(--panel2)",
                    color: "var(--muted)",
                    cursor: "pointer",
                  }}
                >
                  {c.title}
                </motion.button>
              ))}
          </div>
        )}

        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--r-lg)",
            background: "var(--panel2)",
            padding: "12px 14px",
            boxShadow: "0 4px 18px -10px rgba(0,0,0,.22)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
            {isTerminal && (
              <span style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--accent)", paddingBottom: "2px" }}>$</span>
            )}
            <textarea
              className="at-input"
              rows={1}
              value={draft}
              disabled={!llmAvailable}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder={placeholder}
              style={{ flex: 1, fontSize: "13.5px", lineHeight: 1.45, maxHeight: "120px", padding: "2px 0" }}
            />
            <motion.button
              whileTap={llmAvailable ? { scale: 0.88 } : undefined}
              onClick={sendDraft}
              disabled={!llmAvailable}
              title={uiCopy.chatInputSendTitle}
              style={{
                width: 32,
                height: 32,
                flex: "none",
                borderRadius: "var(--r-sm)",
                background: "var(--accent)",
                color: "var(--accent-ink)",
                border: "none",
                cursor: llmAvailable ? "pointer" : "not-allowed",
                opacity: llmAvailable ? 1 : 0.5,
                fontSize: "15px",
                display: "grid",
                placeItems: "center",
              }}
            >
              ↑
            </motion.button>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "9px",
            fontFamily: "var(--mono)",
            fontSize: "9.5px",
            color: "var(--faint)",
          }}
        >
          {uiCopy.chatInputDisclaimer.replace("{host}", host)}{" "}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={shuffleTheme}
            title={uiCopy.shuffleThemeLabel}
            aria-label={uiCopy.shuffleThemeLabel}
            style={{
              font: "inherit",
              color: "var(--accent)",
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            🎲🎲
          </motion.button>
        </div>
      </div>
    </div>
  );
}
