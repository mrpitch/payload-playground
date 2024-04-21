'use client'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'

import { useNavStore } from '@/lib/store/navStore'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Typography, typographyVariants } from '@/components/ui/typography'

export interface IDrawerNavProps {
	items?: INavItem[]
	children?: React.ReactNode
	className?: string
}
interface INavItem {
	label: string
	href?: string
	children?: INavChildItem[]
}

interface INavChildItem {
	label: string
	href: string
	description: string
}

export const DrawerNav: React.FC<IDrawerNavProps> = ({
	items,
	className,
	children,
	...props
}) => {
	const { navOpen, setNavOpen } = useNavStore()

	const handleDrawer = () => {
		setNavOpen(navOpen)

		setTimeout(
			() => (document.body.style.setProperty('pointer-events', 'auto'), 0)
		)
	}
	return (
		<>
			<Dialog.Root open={navOpen} onOpenChange={handleDrawer}>
				<div className="block md:hidden">
					<Dialog.Trigger asChild>
						<Button
							variant="neutral"
							size="icon"
							className={`${!navOpen ? '' : 'hidden'}`}
						>
							<Icons.menu className="z-100 fill-current h-5 w-5" />
							<span className="sr-only">Menu</span>
						</Button>
					</Dialog.Trigger>
					<Dialog.Close asChild>
						<Button
							variant="neutral"
							size="icon"
							className={`${!navOpen ? 'hidden' : ''}`}
						>
							<Icons.x className="fill-current h-5 w-5" />
							<span className="sr-only">Close</span>
						</Button>
					</Dialog.Close>
				</div>
				<Dialog.Content className="data-[state=open]:duration-500', mt fixed inset-y-0 right-0 top-16 z-50 h-full w-full gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
					{items?.map((item, index) =>
						item.children ? (
							<Accordion
								key={index}
								type="single"
								collapsible
								className="w-full"
							>
								<AccordionItem value="item-1">
									<AccordionTrigger className={typographyVariants({ as: 'p' })}>
										{item.label}
									</AccordionTrigger>
									<AccordionContent>
										{item.children.map((child) => (
											<Link
												key={child.label}
												href={child.href}
												className="block rounded-md p-1 hover:text-foreground-dark dark:hover:text-foreground-light"
												onClick={() => setNavOpen(navOpen)}
											>
												<Typography as="p" size="sm" className="font-semibold">
													{child.label}
												</Typography>
												<Typography
													as="p"
													size="sm"
													className="mb-2 from-foreground-light"
												>
													{child.description}
												</Typography>
											</Link>
										))}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						) : (
							<Link
								key={index}
								href={item.href as string}
								className="flex flex-1 items-center justify-between border-b py-4 font-medium transition-all hover:underline"
								onClick={() => setNavOpen(navOpen)}
							>
								<Typography as="p">{item.label}</Typography>
								<Icons.chevronRight className="h-4 w-4 shrink-0 transition-transform duration-200" />
							</Link>
						)
					)}
				</Dialog.Content>
			</Dialog.Root>
		</>
	)
}
