import Link from 'next/link'

import { cn } from '@/lib/utils/cn'
import { siteConfig } from '@/lib/config'

import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'

export const SiteFooter = async () => {
	return (
		<footer className="py-4">
			<Container as="div" className="flex w-full">
				<Typography as="p" size="xs">
					&copy; {new Date().getFullYear()} {siteConfig.name}
				</Typography>
			</Container>
		</footer>
	)
}
