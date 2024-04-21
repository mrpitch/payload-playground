import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'

export interface IAuthProviderProps {
	children: React.ReactNode
}
export const AuthProvider: React.FC<IAuthProviderProps> = async ({
	children,
}) => {
	const session = await auth()

	return <SessionProvider session={session}>{children}</SessionProvider>
}
