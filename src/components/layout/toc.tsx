'use client'
import { useToc } from '@/hooks/use-toc'
import { Typography } from '@/components/ui/custom/typography'
import { Button } from '@/components/ui/button'

export const Toc = ({ contentId, containerId }: { contentId: string; containerId: string }) => {
	const { headings, activeId } = useToc({ contentId, containerId })

	return (
		<div className="sticky top-15">
			<Typography as="h2" size="2xl" className="mb-4">
				Table of Contents
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
		</div>
	)
}
