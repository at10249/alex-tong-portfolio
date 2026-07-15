// Tracks whether the DeepSeek account has been confirmed out of balance so
// we stop hammering a dead key on every visitor message. This is
// per-serverless-instance state (resets on cold start) which is fine here —
// worst case is a handful of wasted requests before it re-trips.

const COOLDOWN_MS = 15 * 60_000;

let exhaustedAt: number | null = null;

export function isDeepseekExhausted(): boolean {
  if (exhaustedAt === null) return false;
  if (Date.now() - exhaustedAt > COOLDOWN_MS) {
    exhaustedAt = null;
    return false;
  }
  return true;
}

export function markDeepseekExhausted(): void {
  exhaustedAt = Date.now();
}

// DeepSeek is OpenAI-compatible: insufficient balance comes back as
// HTTP 402, sometimes 401 if the key itself has been deactivated for
// non-payment. Transient 5xx/network errors are NOT treated as exhaustion.
export function isBalanceError(status: number): boolean {
  return status === 402 || status === 401;
}
