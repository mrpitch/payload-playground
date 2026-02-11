import '@testing-library/jest-dom/vitest'

import { createElement } from 'react'
import { vi } from 'vitest'

// --- next/navigation ---
vi.mock('next/navigation', () => ({
	redirect: vi.fn(),
	useRouter: vi.fn(() => ({
		push: vi.fn(),
		replace: vi.fn(),
		back: vi.fn(),
		prefetch: vi.fn(),
		refresh: vi.fn(),
	})),
	usePathname: vi.fn(() => '/'),
	useSearchParams: vi.fn(() => new URLSearchParams()),
}))

// --- next/headers ---
const mockCookieStore = {
	get: vi.fn(),
	set: vi.fn(),
	delete: vi.fn(),
	has: vi.fn(),
	getAll: vi.fn(() => []),
}

const mockHeadersInstance = {
	get: vi.fn(),
	has: vi.fn(),
	entries: vi.fn(() => []),
	forEach: vi.fn(),
}

vi.mock('next/headers', () => ({
	cookies: vi.fn(() => Promise.resolve(mockCookieStore)),
	headers: vi.fn(() => Promise.resolve(mockHeadersInstance)),
	draftMode: vi.fn(() => Promise.resolve({ isEnabled: false })),
}))

// --- next/image ---
vi.mock('next/image', () => ({
	default: vi.fn((props) => createElement('img', props)),
}))

// --- next/link ---
vi.mock('next/link', () => ({
	default: vi.fn(({ children, ...props }) => createElement('a', props, children)),
}))

// --- @payload-config ---
vi.mock('@payload-config', () => ({
	default: {},
}))

// --- payload ---
vi.mock('payload', () => ({
	getPayload: vi.fn(() =>
		Promise.resolve({
			find: vi.fn(),
			create: vi.fn(),
			login: vi.fn(),
			auth: vi.fn(),
			verifyEmail: vi.fn(),
			resetPassword: vi.fn(),
			forgotPassword: vi.fn(),
		}),
	),
}))

// --- window.matchMedia polyfill ---
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
})
