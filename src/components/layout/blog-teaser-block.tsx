import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/custom/container'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Icon } from '@/components/ui/custom/icons'
import { Typography } from '@/components/ui/custom/typography'

import type { Post } from '@payload-types'

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
			<Typography as="p" className="text-muted-foreground mb-8">
				{subline}
			</Typography>
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
								<Typography as="p" className="text-muted-foreground line-clamp-2 text-sm">
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
										className="border-muted-foreground h-6 w-6 rounded-full border"
									/>
								)}
								<span className="text-sm font-medium">
									{typeof post.author !== 'number'
										? `${post.author?.firstName} ${post.author?.lastName}`
										: ''}
								</span>
								<span className="text-muted-foreground text-xs"> • </span>
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
