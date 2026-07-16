// TODO: update once claude.whoisalextong.com's DNS is live — this must be
// whichever domain is the real canonical one, so metadata, robots.txt,
// sitemap.xml, and structured data all resolve to a URL that actually
// responds. Shared so there's exactly one place to change.
export const SITE_URL = "https://claude-whoisalextong.vercel.app";

// Bare host for display (chat header/footer, CV metadata) — derived so it
// can never drift from SITE_URL above.
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");
