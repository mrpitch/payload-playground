import Link from 'next/link'

import { AppShell } from '@/payload/payload-types'

import { Icon, IconType } from '@/components/ui/custom/icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export interface ISideBarNavProps {
	items?: INavItem[]
	children?: React.ReactNode
	className?: string
}

interface INavItem {
	label: string
	href?: string
	icon: NonNullable<NonNullable<AppShell['sideBarNavigation']>['navItems']>[number]['icon']
}

export const SideBarNav: React.FC<ISideBarNavProps> = ({ items }) => {
	return (
		<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
			<TooltipProvider>
				{items?.map((item) => {
					return (
						<Tooltip key={item.label}>
							<TooltipTrigger>
								<Link
									href={item.href as string}
									className="text-foreground hover:text-foreground-dark flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
								>
									{item.icon ? (
										<Icon iconName={item.icon as IconType} className="h-5 w-5" aria-hidden="true" />
									) : null}
									<span className="sr-only">{item.label}</span>
								</Link>
								<TooltipContent side="right">{item.label}</TooltipContent>
							</TooltipTrigger>
						</Tooltip>
					)
				})}
			</TooltipProvider>
		</nav>
	)
}
