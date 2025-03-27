import { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
	// Create categories
	const category1 = await payload.create({
		collection: 'categories',
		data: {
			_status: 'published',
			title: 'Category 1',
			slug: 'category-1',
			publishedAt: new Date().toISOString(),
		},
	})

	const category2 = await payload.create({
		collection: 'categories',
		data: {
			_status: 'published',
			title: 'Category 2',
			slug: 'category-2',
			publishedAt: new Date().toISOString(),
		},
	})

	const category3 = await payload.create({
		collection: 'categories',
		data: {
			_status: 'published',
			title: 'Category 3',
			slug: 'category-3',
			publishedAt: new Date().toISOString(),
		},
	})

	// Create users with different roles
	await payload.create({
		collection: 'users',
		data: {
			email: 'hurdi@gurdi.de',
			password: 'abc',
			firstName: 'Admin',
			lastName: 'User',
			roles: ['admin'],
		},
	})

	await payload.create({
		collection: 'users',
		data: {
			email: 'editor@hurdi.de',
			password: 'abc',
			firstName: 'Editor',
			lastName: 'User',
			roles: ['editor'],
		},
	})

	await payload.create({
		collection: 'users',
		data: {
			email: 'user@hurdi.de',
			password: 'abc',
			firstName: 'Regular',
			lastName: 'User',
			roles: ['user'],
		},
	})

	// Create pages
	await payload.create({
		collection: 'pages',
		data: {
			_status: 'published',
			title: 'Home',
			slug: 'home',
			layout: [
				{
					blockType: 'quote',
					quoteHeader: 'Welcome to Our Site',
					quoteText: 'This is the home page of our website.',
				},
			],
			publishedAt: new Date().toISOString(),
		},
	})

	await payload.create({
		collection: 'pages',
		data: {
			_status: 'published',
			title: 'Imprint',
			slug: 'imprint',
			layout: [
				{
					blockType: 'quote',
					quoteHeader: 'Legal Information',
					quoteText: 'This is our imprint page containing legal information.',
				},
			],
			publishedAt: new Date().toISOString(),
		},
	})

	// Create posts with category relationships
	await payload.create({
		collection: 'posts',
		data: {
			_status: 'published',
			title: 'Post 1',
			slug: 'post-1',
			categories: [category1.id],
			publishedAt: new Date().toISOString(),
			layout: [
				{
					blockType: 'quote',
					quoteHeader: 'Post 1',
					quoteText: 'This is a featured quote from post 1.',
				},
			],
		},
	})

	await payload.create({
		collection: 'posts',
		data: {
			_status: 'published',
			title: 'Post 2',
			slug: 'post-2',
			categories: [category2.id, category3.id],
			publishedAt: new Date().toISOString(),
			layout: [
				{
					blockType: 'quote',
					quoteHeader: 'Post 2',
					quoteText: 'This is a featured quote from post 2.',
				},
			],
		},
	})

	console.log('Seed completed! 🌱')
}
