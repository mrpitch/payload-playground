import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { rateLimit } from '../rate-limit'

describe('rateLimit', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('allows requests under limit', () => {
		const result = rateLimit('test-under-1', { prefix: 'rl-1', limit: 5, windowSec: 60 })
		expect(result.isLimited).toBe(false)
		expect(result.remaining).toBe(4)
	})

	it('decrements remaining on each call', () => {
		const opts = { prefix: 'rl-2', limit: 3, windowSec: 60 }
		rateLimit('test-dec-1', opts)
		const r2 = rateLimit('test-dec-1', opts)
		expect(r2.remaining).toBe(1)
		const r3 = rateLimit('test-dec-1', opts)
		expect(r3.remaining).toBe(0)
		expect(r3.isLimited).toBe(false)
	})

	it('blocks after limit exceeded', () => {
		const opts = { prefix: 'rl-3', limit: 2, windowSec: 60 }
		rateLimit('test-block-1', opts)
		rateLimit('test-block-1', opts)
		const r3 = rateLimit('test-block-1', opts)
		expect(r3.isLimited).toBe(true)
		expect(r3.remaining).toBe(0)
	})

	it('resets after window expires', () => {
		const opts = { prefix: 'rl-4', limit: 1, windowSec: 60 }
		rateLimit('test-reset-1', opts)
		rateLimit('test-reset-1', opts) // now limited

		vi.advanceTimersByTime(61_000)

		const result = rateLimit('test-reset-1', opts)
		expect(result.isLimited).toBe(false)
		expect(result.remaining).toBe(0)
	})

	it('namespaces by prefix', () => {
		const r1 = rateLimit('same-key-1', { prefix: 'ns-a', limit: 1, windowSec: 60 })
		const r2 = rateLimit('same-key-1', { prefix: 'ns-b', limit: 1, windowSec: 60 })
		expect(r1.isLimited).toBe(false)
		expect(r2.isLimited).toBe(false)
	})
})
