export type ThemeName = "warm" | "terminal" | "cyberpunk" | "medieval" | "thrones";

export type ThemeTokens = {
  "--bg": string;
  "--panel": string;
  "--panel2": string;
  "--doc-bg": string;
  "--text": string;
  "--muted": string;
  "--faint": string;
  "--accent": string;
  "--accent-ink": string;
  "--border": string;
  "--chip": string;
  "--chip-text": string;
  "--active-bg": string;
  "--active-text": string;
  "--photo-filter": string;
  "--font": string;
  "--display": string;
  "--mono": string;
  "--r-sm": string;
  "--r-md": string;
  "--r-lg": string;
};

export const THEME_STORAGE_KEY = "at-theme";

export const themes: Record<ThemeName, ThemeTokens> = {
  warm: {
    "--bg": "#f4f0e8",
    "--panel": "#efe9dd",
    "--panel2": "#fbf9f4",
    "--doc-bg": "#ffffff",
    "--text": "#2b2823",
    "--muted": "#8a8378",
    "--faint": "#a49b8b",
    "--accent": "#c0673c",
    "--accent-ink": "#ffffff",
    "--border": "rgba(0,0,0,.09)",
    "--chip": "#f0eadd",
    "--chip-text": "#5c554c",
    "--active-bg": "#fbf9f4",
    "--active-text": "#2b2823",
    "--photo-filter": "none",
    "--font": "var(--font-plex-sans), system-ui, sans-serif",
    "--display": "var(--font-spectral), Georgia, serif",
    "--mono": "var(--font-plex-mono), monospace",
    "--r-sm": "8px",
    "--r-md": "11px",
    "--r-lg": "14px",
  },
  terminal: {
    "--bg": "#14130f",
    "--panel": "#1a1915",
    "--panel2": "#100f0c",
    "--doc-bg": "#1c1b16",
    "--text": "#e8e4d8",
    "--muted": "#9a9486",
    "--faint": "#6f6a5c",
    "--accent": "#f0d9a0",
    "--accent-ink": "#14130f",
    "--border": "rgba(255,255,255,.08)",
    "--chip": "#26241d",
    "--chip-text": "#c9c3b5",
    "--active-bg": "#26241d",
    "--active-text": "#f0d9a0",
    "--photo-filter":
      "grayscale(1) sepia(.4) saturate(1.5) brightness(.92) contrast(1.05)",
    "--font": "var(--font-plex-mono), monospace",
    "--display": "var(--font-plex-mono), monospace",
    "--mono": "var(--font-plex-mono), monospace",
    "--r-sm": "6px",
    "--r-md": "8px",
    "--r-lg": "10px",
  },
  cyberpunk: {
    "--bg": "#0a0014",
    "--panel": "#120022",
    "--panel2": "#1a0630",
    "--doc-bg": "#160529",
    "--text": "#f1e8ff",
    "--muted": "#af92d6",
    "--faint": "#9476bb",
    "--accent": "#ff2ec4",
    "--accent-ink": "#0a0014",
    "--border": "rgba(0,240,255,.28)",
    "--chip": "#230a3f",
    "--chip-text": "#dcb8ff",
    "--active-bg": "#2a0a44",
    "--active-text": "#00f0ff",
    "--photo-filter": "none",
    "--font": "var(--font-rajdhani), system-ui, sans-serif",
    "--display": "var(--font-orbitron), system-ui, sans-serif",
    "--mono": "var(--font-share-tech-mono), monospace",
    "--r-sm": "3px",
    "--r-md": "4px",
    "--r-lg": "6px",
  },
  medieval: {
    "--bg": "#e4d3ab",
    "--panel": "#d9c496",
    "--panel2": "#ecdfc0",
    "--doc-bg": "#f3e9d0",
    "--text": "#2e2013",
    "--muted": "#6b5638",
    "--faint": "#5c4e39",
    "--accent": "#7d1f1f",
    "--accent-ink": "#f3e9d0",
    "--border": "rgba(46,32,19,.2)",
    "--chip": "#cbb27e",
    "--chip-text": "#3c2c16",
    "--active-bg": "#ecdfc0",
    "--active-text": "#7d1f1f",
    "--photo-filter": "none",
    "--font": "var(--font-eb-garamond), Georgia, serif",
    "--display": "var(--font-cinzel), Georgia, serif",
    "--mono": "var(--font-cutive-mono), monospace",
    "--r-sm": "4px",
    "--r-md": "7px",
    "--r-lg": "10px",
  },
  thrones: {
    "--bg": "#0d0907",
    "--panel": "#171009",
    "--panel2": "#221609",
    "--doc-bg": "#1c130b",
    "--text": "#e8ddd0",
    "--muted": "#a89484",
    "--faint": "#9c8676",
    "--accent": "#e8524d",
    "--accent-ink": "#1a0805",
    "--border": "rgba(232,82,77,.22)",
    "--chip": "#2a1c14",
    "--chip-text": "#d9c4b0",
    "--active-bg": "#2e1c14",
    "--active-text": "#e8524d",
    "--photo-filter": "none",
    "--font": "var(--font-crimson-text), Georgia, serif",
    "--display": "var(--font-pirata-one), Georgia, serif",
    "--mono": "var(--font-plex-mono), monospace",
    "--r-sm": "4px",
    "--r-md": "7px",
    "--r-lg": "10px",
  },
};

export type CSSVarStyle = React.CSSProperties & Record<string, string | number>;
