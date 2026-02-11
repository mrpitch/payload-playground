type TRateLimitEntry = {
	count: number
	resetAt: number
}

const store = new Map<string, TRateLimitEntry>()

// Cleanup stale entries every 10 minutes
const CLEANUP_INTERVAL = 10 * 60 * 1000
let lastCleanup = Date.now()

function cleanup() {
	const now = Date.now()
	if (now - lastCleanup < CLEANUP_INTERVAL) return
	lastCleanup = now
	for (const [key, entry] of store) {
		if (now > entry.resetAt) store.delete(key)
	}
}

interface TRateLimitOptions {
	/** Unique prefix to namespace different limiters */
	prefix: string
	/** Max attempts within the window */
	limit: number
	/** Window duration in seconds */
	windowSec: number
}

interface TRateLimitResult {
	isLimited: boolean
	remaining: number
	resetAt: number
}

export function rateLimit(key: string, options: TRateLimitOptions): TRateLimitResult {
	cleanup()

	const now = Date.now()
	const storeKey = `${options.prefix}:${key}`
	const entry = store.get(storeKey)

	// Window expired or first request
	if (!entry || now > entry.resetAt) {
		store.set(storeKey, { count: 1, resetAt: now + options.windowSec * 1000 })
		return {
			isLimited: false,
			remaining: options.limit - 1,
			resetAt: now + options.windowSec * 1000,
		}
	}

	entry.count++

	if (entry.count > options.limit) {
		return { isLimited: true, remaining: 0, resetAt: entry.resetAt }
	}

	return { isLimited: false, remaining: options.limit - entry.count, resetAt: entry.resetAt }
}
