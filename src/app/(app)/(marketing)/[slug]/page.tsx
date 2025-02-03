import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { generateMeta } from '@/lib/utils/generateMeta'

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
	const payload = await getPayload({ config: configPromise })
	const pages = await payload.find({
		collection: 'pages',
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true,
		},
	})

	const params = pages.docs
		?.filter((doc) => {
			return doc.slug !== 'home'
		})
		.map(({ slug }) => {
			return { slug }
		})

	return params
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

const queryPageBySlug = async ({ slug }: { slug: string }) => {
	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: 'pages',
		draft: true,
		limit: 1,
		pagination: false,
		where: {
			slug: {
				equals: slug,
			},
		},
	})

	return result.docs?.[0] || null
}
