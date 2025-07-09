'use client'
import { useToc } from '@/hooks/use-toc'
import { Typography } from '@/components/ui/custom/typography'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/ui/custom/icons'

interface TocProps {
	contentId: string
	containerId: string
	type: 'desktop' | 'mobile'
}

interface TocComponentProps {
	headings: { id: string; text: string }[]
	activeId: string
}

export const Toc = ({ contentId, containerId, type = 'desktop' }: TocProps) => {
	const { headings, activeId } = useToc({ contentId, containerId })

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
					<li key={heading.id}>
						<Button
							className="w-full justify-start"
							variant={activeId === heading.id ? 'link' : 'neutral'}
							asChild
						>
							<a href={`#${heading.id}`}>{heading.text}</a>
						</Button>
					</li>
				))}
			</ul>
		</aside>
	)
}

const MobileToc = ({ headings, activeId }: TocComponentProps) => {
	return (
		<>
			<div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 border-b backdrop-blur md:hidden">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="w-full justify-between px-4 py-3">
							<span className="text-sm font-medium">On this page</span>
							<Icon iconName="arrowDown" className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[calc(100vw-2rem)] max-w-sm">
						{headings.map((heading) => (
							<DropdownMenuItem
								key={heading.id}
								asChild
								variant={activeId === heading.id ? 'default' : 'destructive'}
							>
								<a href={`#${heading.id}`}>{heading.text}</a>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</>
	)
}
