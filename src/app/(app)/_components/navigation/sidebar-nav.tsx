import Link from 'next/link'
import { Icon, IconType } from '@/components/ui/icons'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

export interface ISideBarNavProps {
	items?: INavItem[]
	children?: React.ReactNode
	className?: string
}

interface INavItem {
	label: string
	href?: string
	icon: IconType
}

export const SideBarNav: React.FC<ISideBarNavProps> = ({
	items,
	className,
	children,
}) => {
	return (
		<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
			<TooltipProvider>
				{items?.map((item, index) => {
					return (
						<Tooltip key={item.label}>
							<TooltipTrigger>
								<Link
									href={item.href as string}
									className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:text-foreground-dark "
								>
									{item.icon ? (
										<Icon
											iconName={item.icon}
											className="h-5 w-5"
											aria-hidden="true"
										/>
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
