"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAppState } from "@/context/AppStateContext";
import type { ThemeName } from "@/lib/theme";

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

type ThemeOption = {
  id: ThemeName;
  name: string;
  description: string;
  swatchBg: string;
  swatchBorder?: string;
  glyph?: string;
  glyphColor?: string;
  glyphFont?: string;
};

const themeOptions: ThemeOption[] = [
  { id: "warm", name: "Warm Studio", description: "Paper & clay, assistant-app feel", swatchBg: "#c0673c" },
  {
    id: "terminal",
    name: "Terminal",
    description: "Dark, monospace, command-line",
    swatchBg: "#14130f",
    swatchBorder: "#3a382f",
    glyph: ">_",
    glyphColor: "#f0d9a0",
    glyphFont: "'IBM Plex Mono', monospace",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Neon night-city, flashy & loud",
    swatchBg: "linear-gradient(135deg, #ff2ec4, #00f0ff)",
  },
  {
    id: "medieval",
    name: "Medieval",
    description: "Parchment & steel, gritty & grounded",
    swatchBg: "#7d1f1f",
    swatchBorder: "#4a1414",
    glyph: "⚜",
    glyphColor: "#d9b25a",
    glyphFont: "serif",
  },
  {
    id: "thrones",
    name: "A Song of Ice and Fire",
    description: "Dragonfire & dark halls, Westerosi voice",
    swatchBg: "#0d0907",
    swatchBorder: "#3a1210",
    glyph: "⚔",
    glyphColor: "#e8524d",
    glyphFont: "serif",
  },
];

export function SettingsModal() {
  const { content, settingsOpen, closeSettings, theme, setTheme } = useAppState();
  const { uiCopy } = content;

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
              <span style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "16px", color: "var(--text)" }}>
                {uiCopy.settingsTitle}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={closeSettings}
                aria-label={uiCopy.settingsCloseAria}
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
                {uiCopy.settingsAppearanceHeading}
              </div>
              <div style={{ fontFamily: "var(--font)", fontSize: "11.5px", color: "var(--muted)", marginBottom: "14px" }}>
                {uiCopy.settingsAppearanceDescTemplate.replace("{n}", String(themeOptions.length))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {themeOptions.map((opt) => {
                  const active = theme === opt.id;
                  return (
                    <motion.button
                      key={opt.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setTheme(opt.id)}
                      style={{ ...optionBase, border: `2px solid ${active ? "var(--accent)" : "var(--border)"}` }}
                    >
                      <span
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: "9px",
                          background: opt.swatchBg,
                          border: opt.swatchBorder ? `1px solid ${opt.swatchBorder}` : undefined,
                          flex: "none",
                          display: "grid",
                          placeItems: "center",
                          color: opt.glyphColor,
                          fontFamily: opt.glyphFont,
                          fontSize: "13px",
                        }}
                      >
                        {opt.glyph}
                      </span>
                      <span style={{ textAlign: "left" }}>
                        <span
                          style={{ display: "block", fontFamily: "var(--font)", fontWeight: 600, fontSize: "12.5px", color: "var(--text)" }}
                        >
                          {opt.name}
                        </span>
                        <span style={{ display: "block", fontFamily: "var(--font)", fontSize: "11px", color: "var(--muted)" }}>
                          {opt.description}
                        </span>
                      </span>
                      <span style={{ marginLeft: "auto", color: "var(--accent)", fontSize: "14px", opacity: active ? 1 : 0 }}>✓</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
