'use client'

import { useSidebar } from '@/components/ui/sidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils/cn'

interface ISidebarWrapperProps {
	children: React.ReactNode
}

export function SidebarWrapper({ children }: ISidebarWrapperProps) {
	const { state, isMobile } = useSidebar()

	return (
		<SidebarInset
			className={cn(
				'bg-background relative flex w-full flex-1 flex-col transition-all duration-300',
				isMobile ? 'ml-0' : state === 'collapsed' ? 'md:ml-16' : 'md:ml-64',
			)}
		>
			{children}
		</SidebarInset>
	)
}
