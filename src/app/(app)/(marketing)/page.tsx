import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPayload } from 'payload'
import config from '@payload-config'

import { buttonVariants } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export default async function Home() {
	const payload = await getPayload({ config })
	const page = await payload.find({
		collection: 'pages',
		limit: 1,
		depth: 1,
		where: {
			slug: {
				equals: 'home',
			},
		},
	})
	if (page.docs.length) {
		notFound()
	}

	const { title } = page.docs[0]

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
