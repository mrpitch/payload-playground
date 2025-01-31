import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export default async function Home() {
	//const contentData = await useContent({ lang: 'de' })

	return (
		<section>
			<Typography as="h1" size="4xl">
				Dashboard
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
				<pre>{JSON.stringify(contentData, null, 2)}</pre>
			</div> */}
		</section>
	)
}
