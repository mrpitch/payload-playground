import type { SeedData } from './seed'

export const seedData: SeedData = {
	users: [
		{
			email: 'hurdi@gurdi.de',
			password: 'Test1234',
			firstName: 'Hurdi',
			lastName: 'Gurdi',
			_verified: true,
			roles: ['admin'],
		},
	],
	media: [
		{
			url: 'placeholder_1x.png',
			alt: 'Placeholder 1x',
		},
		{
			url: 'placeholder_2x.png',
			alt: 'Placeholder 2x',
		},
		{
			url: 'placeholder_16-6_1x.png',
			alt: 'Placeholder 16:6 1x',
		},
		{
			url: 'placeholder_16-6_2x.png',
			alt: 'Placeholder 16:6 2x',
		},

		{
			url: 'placeholder_16-9_1x.png',
			alt: 'Placeholder 16:9 1x',
		},
		{
			url: 'placeholder_16-9_2x.png',
			alt: 'Placeholder 16:9 2x',
		},
	],
	categories: [
		{
			title: 'Championship Courses',
			slug: 'championship-courses',
			_status: 'published',
			publishedAt: '2024-03-20T00:00:00.000Z',
		},
		{
			title: 'Resort Courses',
			slug: 'resort-courses',
			_status: 'published',
			publishedAt: '2024-03-20T00:00:00.000Z',
		},
		{
			title: 'Links Courses',
			slug: 'links-courses',
			_status: 'published',
			publishedAt: '2024-03-20T00:00:00.000Z',
		},
	],
	posts: [
		{
			title: 'St. Andrews Links - The Home of Golf',
			slug: 'st-andrews-links',
			thumbnailSlug: 'placeholder_16-9_1x.png',
			excerpt:
				'Explore the historic St. Andrews Links, the birthplace of golf and one of the most iconic courses in the world.',
			_status: 'published',
			publishedAt: '2024-03-20T00:00:00.000Z',
			categorySlug: 'links-courses',
			layout: [
				{
					blockType: 'copy',
					headline: 'The Old Course',
					showHeadline: true,
					copy: {
						root: {
							type: 'root',
							children: [
								{
									type: 'paragraph',
									children: [
										{
											type: 'text',
											text: 'St. Andrews Links is the oldest golf course in the world, dating back to the 15th century. The Old Course is the most famous of the seven courses at St. Andrews, known for its iconic features like the Swilcan Bridge and Hell Bunker.',
											version: 1,
										},
									],
									direction: 'ltr',
									format: '',
									indent: 0,
									version: 1,
								},
							],
							direction: 'ltr',
							format: '',
							indent: 0,
							version: 1,
						},
					},
				},
			],
		},
		{
			title: "Pebble Beach Golf Links - California's Crown Jewel",
			slug: 'pebble-beach-golf-links',
			thumbnailSlug: 'placeholder_16-9_1x.png',
			excerpt:
				"Discover the stunning coastal beauty and challenging layout of Pebble Beach Golf Links, one of America's most prestigious courses.",
			_status: 'published',
			publishedAt: '2024-03-20T00:00:00.000Z',
			categorySlug: 'championship-courses',
			layout: [
				{
					blockType: 'copy',
					headline: 'Ocean Views and Championship History',
					showHeadline: true,
					copy: {
						root: {
							type: 'root',
							children: [
								{
									type: 'paragraph',
									children: [
										{
											type: 'text',
											text: 'Pebble Beach Golf Links is renowned for its breathtaking ocean views and challenging layout. Hosting multiple U.S. Opens and the annual AT&T Pebble Beach Pro-Am, this course offers a true test of golfing skill.',
											version: 1,
										},
									],
									direction: 'ltr',
									format: '',
									indent: 0,
									version: 1,
								},
							],
							direction: 'ltr',
							format: '',
							indent: 0,
							version: 1,
						},
					},
				},
			],
		},
		{
			title: "Pinehurst Resort - America's Golf Capital",
			slug: 'pinehurst-resort',
			thumbnailSlug: 'placeholder_16-9_1x.png',
			excerpt:
				'Experience the rich history and world-class golf at Pinehurst Resort, featuring nine championship courses.',
			_status: 'published',
			publishedAt: '2024-03-20T00:00:00.000Z',
			categorySlug: 'resort-courses',
			layout: [
				{
					blockType: 'copy',
					headline: 'A Golfing Paradise',
					showHeadline: true,
					copy: {
						root: {
							type: 'root',
							children: [
								{
									type: 'paragraph',
									children: [
										{
											type: 'text',
											text: "Pinehurst Resort in North Carolina is a golfer's paradise, featuring nine championship courses including the famous No. 2 course designed by Donald Ross. The resort has hosted multiple major championships and offers a complete golf experience.",
											version: 1,
										},
									],
									direction: 'ltr',
									format: '',
									indent: 0,
									version: 1,
								},
							],
							direction: 'ltr',
							format: '',
							indent: 0,
							version: 1,
						},
					},
				},
			],
		},
	],
	pages: [
		{
			title: 'Home',
			slug: 'home',
			_status: 'published',
			publishedAt: '2024-03-20T00:00:00.000Z',
			showPageTitle: false,
			layout: [
				{
					tagline: 'Welcome to Golf Course Reviews',
					blockType: 'stage',
					headline: 'Welcome to Golf Course Reviews',
					subline: "Discover the world's most prestigious golf courses",
					copy: 'Welcome to Golf Course Reviews, your ultimate guide to the best golf courses around the world. From championship courses to hidden gems, we cover it all.',
					ctaLink: '/blog',
					ctaText: 'Read More',
					backgroundImageSlug: 'placeholder_16-9_1x.png',
				},
				{
					blockType: 'image-text',
					imageLeftOnOdd: true,
					items: [
						{
							tagline: 'tagline',
							headline: 'headline',
							copy: 'copy',
							ctaText: 'ctatext',
							ctaLink: 'ctalink',
							imageSlug: 'placeholder_1x.png',
						},
						{
							tagline: 'tagline',
							headline: 'headline',
							copy: 'copy',
							ctaText: 'ctatext',
							ctaLink: 'ctalink',
							imageSlug: 'placeholder_1x.png',
						},
					],
					headline: 'Featured Courses',
					copy: 'Welcome to Golf Course Reviews, your ultimate guide to the best golf courses around the world. From championship courses to hidden gems, we cover it all.',
					imageSlug: 'placeholder_16-9_1x.png',
				},
				{
					blockType: 'blog-teaser',
					headline: 'Featured Courses',
					readMoreText: 'Read More',
					postSlugs: ['st-andrews-links', 'pebble-beach-golf-links', 'pinehurst-resort'],
				},
			],
		},
		{
			title: 'Blog',
			slug: 'blog',
			_status: 'published',
			publishedAt: '2024-03-20T00:00:00.000Z',
			showPageTitle: true,
			layout: [
				{
					blockType: 'blog-teaser',
					headline: 'All Course Reviews',
					readMoreText: 'Read More',
					postSlugs: ['st-andrews-links', 'pebble-beach-golf-links', 'pinehurst-resort'],
				},
			],
		},
		{
			title: 'Imprint',
			slug: 'imprint',
			_status: 'published',
			publishedAt: '2024-03-20T00:00:00.000Z',
			showPageTitle: true,
			layout: [
				{
					blockType: 'copy',
					headline: 'Legal Information',
					showHeadline: true,
					copy: {
						root: {
							type: 'root',
							children: [
								{
									type: 'paragraph',
									children: [
										{
											type: 'text',
											text: 'Golf Course Reviews is operated by Golf Media Ltd. For any inquiries, please contact us at info@golfblog.com.',
											version: 1,
										},
									],
									direction: 'ltr',
									format: '',
									indent: 0,
									version: 1,
								},
							],
							direction: 'ltr',
							format: '',
							indent: 0,
							version: 1,
						},
					},
				},
			],
		},
		{
			title: 'Data Privacy',
			slug: 'data-privacy',
			_status: 'published',
			publishedAt: '2024-03-20T00:00:00.000Z',
			showPageTitle: true,
			layout: [
				{
					blockType: 'copy',
					headline: 'Privacy Policy',
					showHeadline: true,
					copy: {
						root: {
							type: 'root',
							children: [
								{
									type: 'paragraph',
									children: [
										{
											type: 'text',
											text: 'We take your privacy seriously. This page outlines how we collect, use, and protect your personal information.',
											version: 1,
										},
									],
									direction: 'ltr',
									format: '',
									indent: 0,
									version: 1,
								},
							],
							direction: 'ltr',
							format: '',
							indent: 0,
							version: 1,
						},
					},
				},
			],
		},
	],
	appShell: {
		_status: 'published',
		settings: {
			siteName: 'Golf Course Reviews',
			siteDescription: 'Your ultimate guide to the best golf courses around the world.',
		},
		mainNavigation: {
			navItems: [
				{
					label: 'Home',
					href: '/',
					link: {
						type: 'reference',
						reference: {
							value: 'home',
							relationTo: 'pages',
						},
						label: 'Home',
					},
				},
				{
					label: 'Blog',
					href: '/blog',
					link: {
						type: 'reference',
						reference: {
							value: 'blog',
							relationTo: 'pages',
						},
						label: 'Blog',
					},
				},
			],
		},
		profileNavigation: {
			navItems: [
				{
					label: 'Account',
					href: '/account-settings',
				},
				{
					label: 'Dashboard',
					href: '/dashboard',
				},
				{
					label: 'Admin',
					href: '/admin',
				},
				{
					label: 'Home',
					href: '/',
				},
			],
		},
		legalNavigation: {
			navItems: [
				{
					label: 'Imprint',
					href: '/imprint',
					link: {
						type: 'reference',
						reference: {
							value: 'imprint',
							relationTo: 'pages',
						},
						label: 'Imprint',
					},
				},
				{
					label: 'Data Privacy',
					href: '/data-privacy',
					link: {
						type: 'reference',
						reference: {
							value: 'data-privacy',
							relationTo: 'pages',
						},
						label: 'Data Privacy',
					},
				},
			],
		},

		sideBarNavigation: {
			navItems: [
				{
					label: 'Home',
					href: '/',
					icon: 'layoutDashboard',
				},
				{
					label: 'Exercise',
					href: '/exercise',
					icon: 'dumbbell',
				},
				{
					label: 'Workout',
					href: '/workout',
					icon: 'rocket',
				},
			],
		},
	},
}
