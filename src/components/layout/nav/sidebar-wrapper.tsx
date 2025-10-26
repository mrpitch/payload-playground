'use client'

import { useSidebar } from '@/components/ui/sidebar'
import { SidebarInset } from '@/components/ui/sidebar'

interface ISidebarWrapperProps {
	children: React.ReactNode
}

export function SidebarWrapper({ children }: ISidebarWrapperProps) {
	const { state } = useSidebar()

	return (
		<SidebarInset
			className={`bg-background relative flex w-full flex-1 flex-col transition-all duration-300 ${
				state === 'collapsed' ? 'ml-16' : 'ml-64'
			}`}
		>
			{children}
		</SidebarInset>
	)
}
