import { Payload } from 'payload'
import type {
	Post,
	Page,
	Category,
	User,
	CopyBlock,
	QuoteBlock,
	ImageTextBlock,
	StageBlock,
	BlogTeaserBlock,
	Media,
	AppShell,
} from '@payload-types'

import { seedData } from './seed-data'

export type SeedUser = Omit<User, 'id' | 'updatedAt' | 'createdAt' | 'sizes'> & {
	roles: ('admin' | 'editor' | 'user')[]
	password: string
}

export type SeedMedia = Omit<Media, 'id' | 'updatedAt' | 'createdAt'> & {
	url: string
}

export type SeedCategory = Omit<Category, 'id' | 'updatedAt' | 'createdAt'> & {
	_status: 'published' | 'draft'
}

export type SeedPost = Omit<
	Post,
	'id' | 'updatedAt' | 'createdAt' | 'author' | 'categories' | 'thumbnail'
> & {
	_status: 'published' | 'draft'
	categorySlug: string
	thumbnailSlug: string
	layout: (CopyBlock | QuoteBlock)[]
}

export type SeedPage = Omit<Page, 'id' | 'updatedAt' | 'createdAt'> & {
	_status: 'published' | 'draft'
	layout: (
		| CopyBlock
		| QuoteBlock
		| ImageTextBlock
		| (Omit<StageBlock, 'backgroundImage'> & { backgroundImageSlug: string })
		| (Omit<BlogTeaserBlock, 'posts'> & { postSlugs: string[] })
	)[]
}

export type SeedAppShell = Omit<AppShell, 'id' | 'updatedAt' | 'createdAt'> & {
	_status: 'published' | 'draft'
	settings: {
		siteName: string
		siteDescription: string
	}
	mainNavigation: {
		navItems: Array<{
			link: {
				type: 'reference'
				reference: {
					value: string
					relationTo: 'posts' | 'pages'
				}
				label: string
			}
		}>
	}
	legalNavigation: {
		navItems: Array<{
			link: {
				type: 'reference'
				reference: {
					value: string
					relationTo: 'posts' | 'pages'
				}
				label: string
			}
		}>
	}
}

export interface SeedData {
	users: SeedUser[]
	media: SeedMedia[]
	categories: SeedCategory[]
	posts: SeedPost[]
	pages: SeedPage[]
	appShell: SeedAppShell
}

const imagePath =
	'https://raw.githubusercontent.com/mrpitch/payload-playground/refs/heads/feat/main/src/payload/utils/seed/'

export const seed = async (payload: Payload): Promise<void> => {
	try {
		// Check if database is initialized
		try {
			await payload.count({
				collection: 'users',
			})
		} catch (error) {
			console.error('Database not initialized. Please run migrations first.')
			process.exit(1)
		}

		// Check if admin user exists
		const existingAdmin = await payload.find({
			collection: 'users',
			where: {
				email: {
					equals: seedData.users[0].email,
				},
			},
		})

		let authorId: number
		if (existingAdmin.totalDocs === 0) {
			// Create admin user
			const adminUser = await payload.create({
				collection: 'users',
				data: seedData.users[0],
			})
			// get uthor id for creating posts
			authorId = adminUser.id

			console.log('Created admin user:', adminUser.email)
		} else {
			console.log('Admin user already exists')
			authorId = existingAdmin.docs[0].id
		}

		// Create media
		for (const media of seedData.media) {
			const existingMedia = await payload.find({
				collection: 'media',
				where: {
					url: {
						equals: media.url,
					},
				},
			})

			if (existingMedia.totalDocs === 0) {
				const file = await getFileByURL(imagePath + media.url)
				const createdMedia = await payload.create({
					collection: 'media',
					data: {
						alt: media.alt,
					},
					file: file,
				})
				console.log('Created media:', createdMedia.filename)
			} else {
				console.log('Media already exists:', media.filename)
			}
		}

		// Create categories
		for (const category of seedData.categories) {
			const existingCategory = await payload.find({
				collection: 'categories',
				where: {
					slug: {
						equals: category.slug,
					},
				},
			})

			if (existingCategory.totalDocs === 0) {
				const createdCategory = await payload.create({
					collection: 'categories',
					data: category,
				})
				console.log('Created category:', createdCategory.title)
			} else {
				console.log('Category already exists:', category.title)
			}
		}

		// Create posts
		for (const post of seedData.posts) {
			const existingPost = await payload.find({
				collection: 'posts',
				where: {
					slug: {
						equals: post.slug,
					},
				},
			})

			if (existingPost.totalDocs === 0) {
				// Find category
				const category = await payload.find({
					collection: 'categories',
					where: {
						slug: {
							equals: post.categorySlug,
						},
					},
				})

				if (category.totalDocs === 0) {
					console.error(`Category not found for post: ${post.title}`)
					continue
				}

				// Find thumbnail
				const thumbnail = await payload.find({
					collection: 'media',
					where: {
						filename: {
							equals: post.thumbnailSlug,
						},
					},
				})

				if (thumbnail.totalDocs === 0) {
					console.error(`Thumbnail not found for post: ${post.title}`)
					continue
				}

				const createdPost = await payload.create({
					collection: 'posts',
					data: {
						...post,
						categories: [category.docs[0].id],
						author: authorId,
						thumbnail: thumbnail.docs[0].id,
					},
				})
				console.log('Created post:', createdPost.title)
			} else {
				console.log('Post already exists:', post.title)
			}
		}

		// Create pages
		for (const page of seedData.pages) {
			const existingPage = await payload.find({
				collection: 'pages',
				where: {
					slug: {
						equals: page.slug,
					},
				},
			})

			if (existingPage.totalDocs === 0) {
				const createdPage = await payload.create({
					collection: 'pages',
					data: {
						...page,
						layout: await Promise.all(
							page.layout.map(async (block) => {
								if (block.blockType === 'stage' && 'backgroundImageSlug' in block) {
									const backgroundImage = await payload.find({
										collection: 'media',
										where: {
											filename: {
												equals: block.backgroundImageSlug,
											},
										},
									})
									if (backgroundImage.totalDocs === 0) {
										console.error(`Background image not found for page: ${page.title}`)
										return block
									}
									return {
										...block,
										backgroundImage: backgroundImage.docs[0].id,
									}
								}
								if (block.blockType === 'image-text' && 'items' in block) {
									const imageTextBlock = block as Omit<ImageTextBlock, 'items'> & {
										items: Array<
											Omit<NonNullable<ImageTextBlock['items']>[number], 'Image'> & {
												imageSlug: string
											}
										>
									}
									const imageTextBlockItems = await Promise.all(
										imageTextBlock.items.map(async (item) => {
											const image = await payload.find({
												collection: 'media',
												where: {
													filename: {
														equals: item.imageSlug,
													},
												},
											})
											if (image.totalDocs === 0) {
												console.error(`Image not found: ${item.imageSlug}`)
												return null
											}
											return {
												...item,
												image: image.docs[0].id,
											}
										}),
									)
									return {
										...block,
										items: imageTextBlockItems.filter(
											(item): item is NonNullable<typeof item> => item !== null,
										),
									}
								}
								if (block.blockType === 'blog-teaser' && 'postSlugs' in block) {
									const blogTeaserBlock = block as Omit<BlogTeaserBlock, 'posts'> & {
										postSlugs: string[]
									}
									const posts = await Promise.all(
										blogTeaserBlock.postSlugs.map(async (slug: string) => {
											const post = await payload.find({
												collection: 'posts',
												where: {
													slug: {
														equals: slug,
													},
												},
											})
											if (post.totalDocs === 0) {
												console.error(`Post not found: ${slug}`)
												return null
											}
											return post.docs[0].id
										}),
									)
									return {
										...block,
										posts: posts.filter((id): id is number => id !== null),
									}
								}
								return block
							}),
						),
					},
				})
				console.log('Created page:', createdPage.title)
			} else {
				console.log('Page already exists:', page.title)
			}
		}

		console.log('Seed completed successfully')
	} catch (error) {
		console.error('Error during seed:', error)
		process.exit(1)
	}

	// Create app shell
	const existingAppShell = await payload.findGlobal({
		slug: 'app-shell',
	})
	if (!existingAppShell.settings.siteName) {
		const createdAppShell = await payload.updateGlobal({
			slug: 'app-shell',
			data: seedData.appShell,
		})
		console.log('Created app shell:', createdAppShell.settings.siteName)
	} else {
		console.log('App shell already exists')
	}
}

interface CustomFile {
	name: string
	data: Buffer
	mimetype: string
	size: number
}

async function getFileByURL(url: string): Promise<CustomFile> {
	const res = await fetch(url, {
		credentials: 'include',
		method: 'GET',
	})

	if (!res.ok) {
		throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
	}

	const data = await res.arrayBuffer()

	return {
		name: url.split('/').pop() || `file-${Date.now()}`,
		data: Buffer.from(data),
		mimetype: `image/${url.split('.').pop()}`,
		size: data.byteLength,
	}
}
