"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";

const optionBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  width: "100%",
  textAlign: "left",
  padding: "11px 12px",
  borderRadius: "11px",
  cursor: "pointer",
  background: "var(--panel2)",
};

export function SettingsModal() {
  const { settingsOpen, closeSettings, theme, setTheme } = useAppState();
  const isTerminal = theme === "terminal";

  return (
    <AnimatePresence>
      {settingsOpen && (
        <motion.div
          key="settings-backdrop"
          onClick={closeSettings}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.42)", display: "grid", placeItems: "center", zIndex: 50 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              width: "400px",
              maxWidth: "92vw",
              background: "var(--panel)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              boxShadow: "0 24px 60px -20px rgba(0,0,0,.5)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "16px", color: "var(--text)" }}>Settings</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={closeSettings}
                aria-label="Close settings"
                style={{
                  marginLeft: "auto",
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
            </div>
            <div style={{ padding: "18px 20px" }}>
              <div style={{ fontFamily: "var(--font)", fontWeight: 600, fontSize: "12.5px", color: "var(--text)", marginBottom: "3px" }}>
                Appearance
              </div>
              <div style={{ fontFamily: "var(--font)", fontSize: "11.5px", color: "var(--muted)", marginBottom: "14px" }}>
                Switch the whole interface between two personalities.
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTheme("warm")}
                  style={{ ...optionBase, border: `2px solid ${isTerminal ? "var(--border)" : "var(--accent)"}` }}
                >
                  <span style={{ width: 34, height: 34, borderRadius: "9px", background: "#c0673c", flex: "none" }} />
                  <span style={{ textAlign: "left" }}>
                    <span style={{ display: "block", fontFamily: "var(--font)", fontWeight: 600, fontSize: "12.5px", color: "var(--text)" }}>
                      Warm Studio
                    </span>
                    <span style={{ display: "block", fontFamily: "var(--font)", fontSize: "11px", color: "var(--muted)" }}>
                      Paper &amp; clay, assistant-app feel
                    </span>
                  </span>
                  <span style={{ marginLeft: "auto", color: "var(--accent)", fontSize: "14px", opacity: isTerminal ? 0 : 1 }}>✓</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTheme("terminal")}
                  style={{ ...optionBase, border: `2px solid ${isTerminal ? "var(--accent)" : "var(--border)"}` }}
                >
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "9px",
                      background: "#14130f",
                      border: "1px solid #3a382f",
                      flex: "none",
                      display: "grid",
                      placeItems: "center",
                      color: "#f0d9a0",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "13px",
                    }}
                  >
                    &gt;_
                  </span>
                  <span style={{ textAlign: "left" }}>
                    <span style={{ display: "block", fontFamily: "var(--font)", fontWeight: 600, fontSize: "12.5px", color: "var(--text)" }}>
                      Terminal
                    </span>
                    <span style={{ display: "block", fontFamily: "var(--font)", fontSize: "11px", color: "var(--muted)" }}>
                      Dark, monospace, command-line
                    </span>
                  </span>
                  <span style={{ marginLeft: "auto", color: "var(--accent)", fontSize: "14px", opacity: isTerminal ? 1 : 0 }}>✓</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
