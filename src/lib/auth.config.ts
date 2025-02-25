import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { loginFormSchema } from '@/lib/actions/login'

export const authConfig: NextAuthConfig = {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFields = loginFormSchema.safeParse(credentials)

				if (validatedFields.success) {
					const { email, password } = validatedFields.data
				}

				return null
			},
		}),
	],
	callbacks: {
		authorized: ({ auth }) => !!auth,
	},
}
