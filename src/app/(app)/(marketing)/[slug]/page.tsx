import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { generateMeta } from '@/lib/utils/generateMeta'
import { queryPageBySlug } from '@/lib/utils/getCollections'
import { getSlugs } from '@/lib/utils/getCollections'

import type { Page } from '@payload-types'

import { buttonVariants } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { slug = 'home' } = await paramsPromise
	const page = await queryPageBySlug({
		slug,
	})

	return generateMeta({ doc: page })
}

export async function generateStaticParams() {
	const pages = await getSlugs('pages')

	return (
		pages.docs
			?.filter((doc) => {
				return doc && 'slug' in doc && typeof doc.slug === 'string' && doc.slug !== 'home'
			})
			.map((doc) => ({ slug: (doc as { slug: string }).slug })) || []
	)
}

type Args = {
	params: Promise<{
		slug?: string
	}>
}

export default async function Page({ params: paramsPromise }: Args) {
	const { slug = 'home' } = await paramsPromise

	const page = await queryPageBySlug({
		slug,
	})

	if (!page) {
		notFound()
	}

	const { title } = page

	return (
		<section>
			<Typography as="h1" size="4xl">
				{title}
			</Typography>
			<div className="mt-8 flex gap-4">
				<Link href="/dashboard" className={buttonVariants()}>
					Dashboard
				</Link>
				<Link href="/my-dashboard" className={buttonVariants({ variant: 'outline' })}>
					Example Page
				</Link>
			</div>
			{/* <div className="mt-8">
					<pre>{JSON.stringify(content, null, 2)}</pre>
				</div> */}
		</section>
	)
}
