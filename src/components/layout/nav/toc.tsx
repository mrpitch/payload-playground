'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { useMobile } from '@/lib/hooks/use-hook'
import { TTocItem } from '@/lib/utils/navigation/processToc'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Typography, typographyVariants } from '@/components/ui/custom/typography'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/custom/icons'

interface TableOfContentsProps {
	items?: TTocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
	const isMobile = useMobile()

	if (!items || items.length === 0) return null

	// Mobile: Show as sheet/drawer
	if (isMobile) {
		return (
			<div className="fixed right-4 bottom-4 z-50 md:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<Button
							size="icon"
							variant="outline"
							className="h-12 w-12 rounded-full bg-transparent shadow-lg"
						>
							<Icon iconName="menu" className="h-5 w-5" />
							<span className="sr-only">Table of contents</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-[280px] sm:w-[320px]">
						<div className="mt-6">
							<TableOfContentsComponent items={items} />
						</div>
					</SheetContent>
				</Sheet>
			</div>
		)
	}

	// Desktop: Show as sticky sidebar
	return (
		<aside className="hidden w-64 shrink-0 xl:block">
			<div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto py-8 pr-4">
				<TableOfContentsComponent items={items} />
			</div>
		</aside>
	)
}

export function TableOfContentsComponent({ items = [] }: TableOfContentsProps) {
	const [activeId, setActiveId] = useState<string>('')
	const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 })
	const itemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({})

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id)
					}
				})
			},
			{
				rootMargin: '-20% 0px -35% 0px',
				threshold: 0,
			},
		)

		items.forEach((item) => {
			const element = document.getElementById(item.id)
			if (element) {
				observer.observe(element)
			}
		})

		return () => observer.disconnect()
	}, [items])

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id)
					}
				})
			},
			{ rootMargin: '-80px 0px -80% 0px' },
		)

		const headings = document.querySelectorAll('h2, h3, h4')
		headings.forEach((heading) => observer.observe(heading))

		return () => {
			headings.forEach((heading) => observer.unobserve(heading))
		}
	}, [])

	if (items.length === 0) return null

	useEffect(() => {
		const activeElement = itemRefs.current[activeId]
		if (activeElement) {
			const { offsetTop, offsetHeight } = activeElement
			setIndicatorStyle({
				top: offsetTop,
				height: offsetHeight,
			})
		}
	}, [activeId])

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		e.preventDefault()
		const element = document.getElementById(id)
		if (element) {
			const offset = 80
			const elementPosition = element.getBoundingClientRect().top
			const offsetPosition = elementPosition + window.scrollY - offset

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			})
		}
	}

	return (
		<nav className="relative space-y-2">
			<Typography as="h3" size="xl" className="text-foreground mb-4 flex items-center gap-2">
				<Icon iconName="textAlignStart" className="h-4 w-4" /> On this page
			</Typography>

			<div className="relative">
				{/* Background track */}
				<div className="bg-border absolute top-0 left-0 h-full w-0.5 rounded-full" />

				{/* Animated indicator */}
				<div
					className="bg-secondary absolute left-0 w-0.5 rounded-full transition-all duration-300 ease-out"
					style={{
						top: `${indicatorStyle.top}px`,
						height: `${indicatorStyle.height}px`,
					}}
				/>

				{/* Navigation items */}
				<nav className="space-y-1">
					{items.map((item) => {
						return (
							<a
								key={item.id}
								ref={(el) => {
									itemRefs.current[item.id] = el
								}}
								href={`#${item.id}`}
								className={cn(
									'hover:text-secondary mt-2 block transition-colors',
									typographyVariants({ size: 'base' }),
									item.level === 2 && 'mt-6 pl-3',
									item.level === 3 && 'pl-6',
									item.level === 4 && 'pl-8',
									activeId === item.id ? 'text-secondary font-medium' : 'text-foreground',
								)}
								onClick={(e) => handleClick(e, item.id)}
							>
								{item.text}
							</a>
						)
					})}
				</nav>
			</div>
		</nav>
	)
}
// export function TableOfContentsComponent({ items = [] }: TableOfContentsProps) {
// 	const [activeId, setActiveId] = useState<string>('')

// useEffect(() => {
// 	const observer = new IntersectionObserver(
// 		(entries) => {
// 			entries.forEach((entry) => {
// 				if (entry.isIntersecting) {
// 					setActiveId(entry.target.id)
// 				}
// 			})
// 		},
// 		{ rootMargin: '-80px 0px -80% 0px' },
// 	)

// 	const headings = document.querySelectorAll('h2, h3, h4')
// 	headings.forEach((heading) => observer.observe(heading))

// 	return () => {
// 		headings.forEach((heading) => observer.unobserve(heading))
// 	}
// }, [])

// if (items.length === 0) return null

// 	return (
// 		<div className="space-y-2">
// <Typography as="h3" size="xl" className="text-foreground mb-4 flex items-center gap-2">
// 	<Icon iconName="textAlignStart" className="h-4 w-4" /> On this page
// </Typography>
// 			<nav className="space-y-1">
// {items.map((item) => (
// 	<a
// 		key={item.id}
// 		href={`#${item.id}`}
// 		className={cn(
// 			'hover:text-secondary mt-2 block transition-colors',
// 			typographyVariants({ size: 'base' }),
// 			item.level === 2 && 'mt-6',
// 			item.level === 3 && 'pl-4',
// 			item.level === 4 && 'pl-8',
// 			activeId === item.id ? 'text-secondary font-medium' : 'text-foreground',
// 		)}
// 		onClick={(e) => {
// 			e.preventDefault()
// 			document.getElementById(item.id)?.scrollIntoView({
// 				behavior: 'smooth',
// 				block: 'start',
// 				inline: 'nearest',
// 			})
// 		}}
// 	>
// 		{item.text}
// 	</a>
// ))}
// 			</nav>
// 		</div>
// 	)
// }
