import { redirect } from 'next/navigation'

import { DEFAULT_LOGOUT_REDIRECT } from '@/lib/routes'
import { logout } from '@/lib/actions/logout'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { Icon } from '@/components/ui/custom/icons'

export interface ILogoutButtonProps {
	className?: string
	icon?: boolean
	children: React.ReactNode
}

export const LogoutButton: React.FC<ILogoutButtonProps> = ({
	className,
	children,
	icon = false,
}) => {
	const handleLogout = async () => {
		const res = await logout()
		if (res.success) {
			redirect(DEFAULT_LOGOUT_REDIRECT)
		}
	}
	return (
		<Button
			onClick={handleLogout}
			className={cn('w-full justify-start has-[>svg]:px-2', className)}
			variant="ghost"
		>
			{icon ? <Icon iconName="logOut" /> : null}
			{children}
		</Button>
	)
}
