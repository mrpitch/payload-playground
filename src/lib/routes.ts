/**
 * An array of routes that are public.
 * These routs do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ['/', '/new-verification']

/**
 * An array of routes that are used for authentication.
 * These routes will redirect the user to /my-profile.
 * @type {string[]}
 */
export const authRoutes = [
	'/login',
	'/register',
	'/login-error',
	'/password-reset',
	'/new-password',
]

/**
 * The prefix for the API authentication routes.
 * Routes that start with this prefix are used for API authetication purposes.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'
