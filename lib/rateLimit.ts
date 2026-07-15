import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const WINDOW_SECONDS = 60;
const MAX_REQUESTS_PER_WINDOW = 8;

type RateLimitResult = { allowed: boolean; retryAfterSeconds: number };

// Fallback used whenever Upstash isn't configured: per-serverless-instance
// token bucket, resets on cold start. Fine for a personal portfolio's
// traffic, but not shared across instances — see checkRateLimit below for
// the distributed version.
const memoryBuckets = new Map<string, { count: number; windowStart: number }>();

function checkMemoryRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const windowMs = WINDOW_SECONDS * 1000;
  const bucket = memoryBuckets.get(key);

  if (!bucket || now - bucket.windowStart >= windowMs) {
    memoryBuckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count < MAX_REQUESTS_PER_WINDOW) {
    bucket.count += 1;
    return { allowed: true, retryAfterSeconds: 0 };
  }

  const retryAfterSeconds = Math.ceil((windowMs - (now - bucket.windowStart)) / 1000);
  return { allowed: false, retryAfterSeconds };
}

// Distributed limiter, shared across every serverless instance — only
// active once UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are set
// (e.g. via the Upstash integration on Vercel, or upstash.com directly).
// Without them, checkRateLimit transparently falls back to the in-memory
// version above, so this is safe to ship either way.
const upstashConfigured = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

const ratelimit = upstashConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS_PER_WINDOW, `${WINDOW_SECONDS} s`),
      prefix: "portfolio-chat",
    })
  : null;

export async function checkRateLimit(key: string): Promise<RateLimitResult> {
  if (!ratelimit) return checkMemoryRateLimit(key);

  try {
    const { success, reset } = await ratelimit.limit(key);
    return { allowed: success, retryAfterSeconds: success ? 0 : Math.max(0, Math.ceil((reset - Date.now()) / 1000)) };
  } catch (err) {
    console.error("[rateLimit] Upstash call failed, falling back to in-memory limiter:", err);
    return checkMemoryRateLimit(key);
  }
}
