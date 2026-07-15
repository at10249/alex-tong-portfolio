"use client";

import { useAppState } from "@/context/AppStateContext";
import { conversations } from "@/lib/content/conversations";

export function ChatInput() {
  const { messages, draft, setDraft, onInputKeyDown, sendDraft, sendSuggestion, theme, llmAvailable } = useAppState();
  const isEmpty = messages.length === 0;
  const isTerminal = theme === "terminal";

  const placeholder = !llmAvailable
    ? "Live chat is paused — pick a conversation on the left, or ask via LinkedIn."
    : isEmpty
      ? "Give me a summary of Alex Tong. Make it as braggadocious as possible."
      : "Ask anything about Alex…";

  return (
    <div className="chat-input-pad" style={{ padding: "12px 28px 22px", flexShrink: 0 }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {isEmpty && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "12px", justifyContent: "center" }}>
            {conversations.map((c) => (
              <button
                key={c.id}
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
              </button>
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
            <button
              onClick={sendDraft}
              disabled={!llmAvailable}
              title="Send"
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
            </button>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "9px", fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--faint)" }}>
          claude.whoisalextong.com &middot; responses are AI-generated from Alex Tong&rsquo;s professional profile
        </div>
      </div>
    </div>
  );
}
