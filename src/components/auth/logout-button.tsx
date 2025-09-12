import { redirect } from 'next/navigation'

import { DEFAULT_LOGOUT_REDIRECT } from '@/lib/routes'
import { logout } from '@/lib/actions/logout'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

export interface ILogoutButtonProps {
	className?: string
	children: React.ReactNode
}

export const LogoutButton: React.FC<ILogoutButtonProps> = ({ className, children }) => {
	const handleLogout = async () => {
		const res = await logout()
		if (res.success) {
			redirect(DEFAULT_LOGOUT_REDIRECT)
		}
	}
	return (
		<Button onClick={handleLogout} className={cn('justify-start', className)} variant="ghost">
			{children}
		</Button>
	)
}
