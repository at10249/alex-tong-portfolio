export type ThemeName = "warm" | "terminal";

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
};

export type CSSVarStyle = React.CSSProperties & Record<string, string | number>;
