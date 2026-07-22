import type { ThemeName } from "./theme";

// The canonical path for each theme — used whenever the app itself changes
// the URL (switching themes via Settings or the shuffle button). One per
// theme; warm has none (it's the bare root, the site's default).
export const themeCanonicalPath: Record<ThemeName, string> = {
  warm: "/",
  terminal: "/terminal",
  cyberpunk: "/cyberpunk",
  medieval: "/medieval",
  thrones: "/asoiaf",
};

// Every URL slug — canonical name plus its joke alias — that resolves to a
// theme. Visiting either lands on that theme; the address bar keeps
// whichever one was visited (no redirect to the canonical form) until the
// theme changes again via Settings/shuffle.
export const themeSlugToName: Record<string, ThemeName> = {
  terminal: "terminal",
  beepboop: "terminal",
  cyberpunk: "cyberpunk",
  interlinked: "cyberpunk",
  medieval: "medieval",
  kingdomcome: "medieval",
  asoiaf: "thrones",
  dracarys: "thrones",
};
