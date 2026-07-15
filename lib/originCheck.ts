import { NextRequest } from "next/server";

// Cheap deterrent against scripts hitting the API directly from another
// origin to spend the DeepSeek budget without ever visiting the site. Not
// a strong security boundary (a determined caller can fake headers) — just
// enough to block the naive cases the rate limiter alone doesn't catch.
// Compares Origin against the request's own Host, so it works unchanged
// across localhost, every Vercel preview URL, and the custom domain.
export function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // no Origin header — can't verify; don't block legitimate same-origin requests that omit it

  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}
