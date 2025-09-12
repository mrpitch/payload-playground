'use client'
import { useToc } from '@/lib/hooks/use-toc'
import { Typography } from '@/components/ui/custom/typography'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/ui/custom/icons'
import { cn } from '@/lib/utils/cn'

interface TocProps {
	contentId: string
	containerId: string
	type: 'desktop' | 'mobile'
}

interface TocComponentProps {
	headings: { id: string; text: string; level: number }[]
	activeId: string
}

export const Toc = ({ contentId, containerId, type = 'desktop' }: TocProps) => {
	const { headings, activeId } = useToc({ contentId, containerId })

	console.log('headings', headings)

	const TocComponent = type === 'desktop' ? DesktopToc : MobileToc

	return <TocComponent headings={headings} activeId={activeId} />
}

const DesktopToc = ({ headings, activeId }: TocComponentProps) => {
	return (
		<aside className="sticky top-[60px] mt-8 hidden w-64 self-start lg:block">
			<Typography as="h3" size="xl" className="mb-4">
				On this page
			</Typography>
			<ul>
				{headings.map((heading) => (
					<li key={heading.id} className={`pl-${(heading.level - 2) * 2} pb-2`}>
						<a
							href={`#${heading.id}`}
							className={cn(
								'cursor-pointer hover:underline',

								activeId === heading.id ? 'text-primary' : 'text-foreground hover:text-primary',
							)}
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</aside>
	)
}

const MobileToc = ({ headings, activeId }: TocComponentProps) => {
	return (
		<div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 border-b backdrop-blur lg:hidden">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="w-full justify-between px-4 py-3">
						<span className="-ml-1.5 text-sm font-normal">On this page</span>
						<Icon iconName="chevronDown" className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="bg-background w-[calc(100vw-2rem)] rounded-none border-none">
					{headings.map((heading) => (
						<DropdownMenuItem
							key={heading.id}
							asChild
							className={cn(
								'cursor-pointer hover:underline',
								activeId === heading.id ? 'text-primary' : 'text-foreground hover:text-primary',
							)}
						>
							<a href={`#${heading.id}`} className={`pl-${(heading.level - 2) * 2} pb-2`}>
								{heading.text}
							</a>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
