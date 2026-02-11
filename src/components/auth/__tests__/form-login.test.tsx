import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock login action
vi.mock('@/lib/actions/login', () => ({
	login: vi.fn(),
}))

// Mock routes
vi.mock('@/lib/routes', () => ({
	DEFAULT_LOGIN_REDIRECT: '/dashboard',
}))

// Mock UI components to simplify rendering
vi.mock('@/components/ui/custom/icons', () => ({
	Icon: () => <span data-testid="icon" />,
}))

vi.mock('@/components/ui/custom/typography', () => ({
	typographyVariants: () => '',
}))

vi.mock('@/lib/utils/cn', () => ({
	cn: (...args: any[]) => args.filter(Boolean).join(' '),
}))

import { login } from '@/lib/actions/login'

import { FormLogin } from '../form-login'

describe('FormLogin', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders email and password fields', () => {
		render(<FormLogin />)
		expect(screen.getByPlaceholderText('E-Mail')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
	})

	it('renders login button', () => {
		render(<FormLogin />)
		expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
	})

	it('renders forgot password and register links', () => {
		render(<FormLogin />)
		expect(screen.getByText('Forgot password?')).toBeInTheDocument()
		expect(screen.getByText('Create new Account')).toBeInTheDocument()
	})

	it('shows server error on failed login', async () => {
		const user = userEvent.setup()
		vi.mocked(login).mockResolvedValue({ error: 'Invalid email or password.' })

		render(<FormLogin />)

		await user.type(screen.getByPlaceholderText('E-Mail'), 'user@example.com')
		await user.type(screen.getByPlaceholderText('Password'), 'wrongpassword')
		await user.click(screen.getByRole('button', { name: /login/i }))

		expect(await screen.findByText('Invalid email or password.')).toBeInTheDocument()
	})
})
