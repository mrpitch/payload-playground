export type SiteConfig = typeof siteConfig

export const siteConfig = {
	name: 'Golf Training',
	description:
		'Beautifully designed components built with Radix UI and Tailwind CSS.',
	mainNav: [
		{
			label: 'Exercises',
			href: '/exercises',
		},
		{
			label: 'Categories',
			href: '/categories',
		},
		{
			label: 'Golf Courses',
			href: '/golf-courses',
		},
	],
	profileNav: [
		{
			label: 'My Profile',
			href: '/my-profile',
		},
		{
			label: 'Admin',
			href: '/admin',
		},
	],
}
