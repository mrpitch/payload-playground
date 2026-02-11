import type { Post } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Container } from '@/components/ui/custom/container'
import { Icon } from '@/components/ui/custom/icons'
import { Typography } from '@/components/ui/custom/typography'

export async function BlogTeaser({
	headline,
	subline,
	readMoreText,
	posts,
}: {
	headline: string
	subline: string
	readMoreText?: string
	posts: Post[]
}) {
	const overlayOpacity = 0.2
	return (
		<Container className="mt-12">
			<Typography as="h2" className="mb-8">
				{headline}
			</Typography>
			<Typography as="p" className="mb-8 text-muted-foreground">
				{subline}
			</Typography>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
				{posts?.map((post: Post) => (
					<Link
						key={post.id}
						href={`/blog/${post.slug}`}
						className="block transition-transform hover:scale-[1.02]"
					>
						<Card className="h-full overflow-hidden bg-background pt-0">
							<div className="relative aspect-[16/9] w-full overflow-hidden">
								{post.thumbnail && typeof post.thumbnail !== 'number' && (
									<>
										<div
											className="absolute inset-0 z-10 bg-secondary"
											style={{ opacity: overlayOpacity }}
										/>
										<Image
											src={post.thumbnail.url || '/placeholder.png'}
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
								<Typography as="h3" className="mb-2 line-clamp-2">
									{post.title}
								</Typography>
								<Typography as="p" className="line-clamp-2 text-sm text-muted-foreground">
									{post.excerpt}
								</Typography>
								{readMoreText && <Button className="mt-4">{readMoreText}</Button>}
							</CardContent>
							<CardFooter className="flex items-center gap-2 border-t p-4 pt-3">
								{typeof post.author !== 'number' &&
								post.author?.avatar &&
								typeof post.author.avatar !== 'number' ? (
									<Image
										src={post.author.avatar.url ?? '/placeholder.png'}
										alt={post.author.firstName}
										width={24}
										height={24}
										className="rounded-full"
									/>
								) : (
									<Icon
										iconName="user"
										className="h-6 w-6 rounded-full border border-muted-foreground"
									/>
								)}
								<span className="text-sm font-medium text-foreground">
									{typeof post.author !== 'number'
										? `${post.author?.firstName} ${post.author?.lastName}`
										: ''}
								</span>
								<span className="text-xs text-muted-foreground"> • </span>
								{post.publishedAt && (
									<time dateTime={post.publishedAt} className="text-xs text-muted-foreground">
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
