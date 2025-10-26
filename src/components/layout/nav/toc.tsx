'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { TTocItem } from '@/lib/utils/navigation/processToc'

import { Typography, typographyVariants } from '@/components/ui/custom/typography'
import { Icon } from '@/components/ui/custom/icons'

interface TableOfContentsProps {
	items?: TTocItem[]
	type?: 'desktop' | 'mobile'
}

type TocVariant = 'dropdown' | 'sidebar'

export function TableOfContents({ items, type = 'desktop' }: TableOfContentsProps) {
	if (!items || items.length === 0) return null

	return (
		<>
			{type === 'mobile' && (
				<div className="bg-background sticky top-16 z-40 border-b @5xl/docs:hidden">
					<TableOfContentsDropdown items={items} />
				</div>
			)}

			{type === 'desktop' && (
				<aside className="hidden w-64 shrink-0 @5xl/docs:block">
					<div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto py-8 pr-4">
						<TableOfContentsSidebar items={items} />
					</div>
				</aside>
			)}
		</>
	)
}

function TableOfContentsDropdown({ items = [] }: TableOfContentsProps) {
	const [isOpen, setIsOpen] = useState(false)
	const activeId = useActiveTocId(items)
	const activeTitle = items.find((item) => item.id === activeId)?.text || 'On this page'

	const handleItemClick = (id: string) => {
		setIsOpen(false)
	}

	return (
		<div className="px-4 py-3">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="bg-background flex w-full items-center justify-between rounded-lg border p-3 text-sm font-medium shadow-sm"
			>
				<span className="flex items-center gap-2">
					<Icon iconName="textAlignStart" className="h-4 w-4" />
					{activeTitle}
				</span>
				<Icon
					iconName="chevronDown"
					className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
				/>
			</button>

			{isOpen && (
				<div className="bg-background mt-2 max-h-64 overflow-y-auto rounded-lg border p-3 shadow-sm">
					<TocNavList
						items={items}
						activeId={activeId}
						variant="dropdown"
						onItemClick={handleItemClick}
					/>
				</div>
			)}
		</div>
	)
}

function TableOfContentsSidebar({ items = [] }: TableOfContentsProps) {
	const activeId = useActiveTocId(items)
	const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 })
	const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

	useEffect(() => {
		itemRefs.current = {}
	}, [items])

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

	return (
		<nav className="relative space-y-2">
			<Typography as="h3" size="xl" className="text-foreground mb-4 flex items-center gap-2">
				<Icon iconName="textAlignStart" className="h-4 w-4" /> On this page
			</Typography>

			<div className="relative">
				<div className="bg-secondary absolute top-0 left-0 h-full w-0.5 rounded-full" />

				<div
					className="bg-primary absolute left-0 w-0.5 rounded-full transition-all duration-300 ease-out"
					style={{
						top: `${indicatorStyle.top}px`,
						height: `${indicatorStyle.height}px`,
					}}
				/>

				<TocNavList items={items} activeId={activeId} variant="sidebar" itemRefs={itemRefs} />
			</div>
		</nav>
	)
}

function TocNavList({
	items,
	activeId,
	variant,
	onItemClick,
	itemRefs,
}: {
	items: TTocItem[]
	activeId: string
	variant: TocVariant
	onItemClick?: (id: string) => void
	itemRefs?: React.MutableRefObject<Record<string, HTMLAnchorElement | null>>
}) {
	return (
		<ul className="space-y-1">
			{items.map((item) => (
				<li key={item.id}>
					<a
						ref={
							itemRefs
								? (element) => {
										itemRefs.current[item.id] = element
									}
								: undefined
						}
						href={`#${item.id}`}
						className={getItemClasses(item, activeId, variant)}
						onClick={() => {
							onItemClick?.(item.id)
						}}
					>
						{item.text}
					</a>
				</li>
			))}
		</ul>
	)
}

function getItemClasses(item: TTocItem, activeId: string, variant: TocVariant) {
	const isActive = activeId === item.id

	if (variant === 'sidebar') {
		return cn(
			'hover:text-primary mt-2 block transition-colors',
			typographyVariants({ size: 'base' }),
			item.level === 2 && 'mt-6 pl-3',
			item.level === 3 && 'pl-6',
			item.level === 4 && 'pl-8',
			isActive ? 'text-primary font-medium' : 'text-foreground',
		)
	}

	return cn(
		'hover:bg-muted block rounded px-2 py-1 text-sm transition-colors',
		item.level === 2 && 'font-medium',
		item.level === 3 && 'pl-4 text-sm',
		item.level === 4 && 'pl-6 text-xs',
		isActive ? 'bg-primary text-primary-foreground' : 'text-foreground',
	)
}

function useActiveTocId(items: TTocItem[] = []) {
	const [activeId, setActiveId] = useState(items[0]?.id ?? '')

	useEffect(() => {
		setActiveId(items[0]?.id ?? '')
	}, [items])

	useEffect(() => {
		if (!items.length) return

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

	return activeId
}

// Rely on default anchor navigation with CSS scroll-margin on headings
