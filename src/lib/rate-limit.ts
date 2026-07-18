type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 10;
const MAX_ENTRIES = 2_000;

const globalRateLimit = globalThis as typeof globalThis & {
  registrationRateLimits?: Map<string, RateLimitEntry>;
};

const entries = globalRateLimit.registrationRateLimits ?? new Map<string, RateLimitEntry>();
globalRateLimit.registrationRateLimits = entries;

export function checkRegistrationRateLimit(key: string, now = Date.now()) {
  if (entries.size > MAX_ENTRIES) {
    for (const [entryKey, entry] of entries) {
      if (entry.resetAt <= now) entries.delete(entryKey);
    }
  }

  const existing = entries.get(key);
  if (!existing || existing.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  if (existing.count <= MAX_REQUESTS) {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  return {
    allowed: false,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}
