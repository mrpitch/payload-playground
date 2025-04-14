import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/custom/container'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Typography } from '@/components/ui/custom/typography'

import { getPosts } from '@/lib/utils/getCollections'

import type { Post } from '@payload-types'

export async function BlogTeaser() {
	const { docs: posts } = await getPosts()
	const overlayOpacity = 0.2
	return (
		<Container className="mt-12">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
				{posts?.map((post: Post) => (
					<Link
						key={post.id}
						href={`/blog/${post.slug}`}
						className="block transition-transform hover:scale-[1.02]"
					>
						<Card className="bg-background h-full overflow-hidden pt-0">
							<div className="relative aspect-[16/9] w-full overflow-hidden">
								{post.thumbnail && typeof post.thumbnail !== 'number' && (
									<>
										<div
											className="bg-secondary absolute inset-0 z-10"
											style={{ opacity: overlayOpacity }}
										/>
										<Image
											src={post.thumbnail.url || '/placeholder.svg'}
											alt={post.title}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									</>
								)}
							</div>
							<CardContent className="p-4">
								<div className="mb-2">
									{post.categories?.map(
										(category) =>
											typeof category !== 'number' && (
												<Badge key={category.id} variant="secondary" className="mr-2">
													{category.title}
												</Badge>
											),
									)}
								</div>
								<Typography as="h2" className="mb-2 line-clamp-2">
									{post.title}
								</Typography>
								<Typography as="p" className="text-muted-foreground line-clamp-2 text-sm">
									{post.excerpt}
								</Typography>
							</CardContent>
							<CardFooter className="flex items-center gap-2 border-t p-4 pt-3">
								{post.publishedAt && (
									<time dateTime={post.publishedAt} className="text-muted-foreground text-xs">
										{new Date(post.publishedAt).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'short',
											day: 'numeric',
										})}
									</time>
								)}
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>
		</Container>
	)
}

export default BlogTeaser
