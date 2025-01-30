import { IconType } from '@/components/ui/icons'

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
	],
	sideBarNav: [
		{
			icon: 'layoutDashboard' as IconType,
			label: 'Dashboard',
			href: '/dashboard',
		},
		{
			icon: 'rocket' as IconType,
			label: 'Workouts',
			href: '/workouts',
		},
		{
			icon: 'dumbbell' as IconType,
			label: 'Exercises',
			href: '/exercises',
		},
		{
			icon: 'tag' as IconType,
			label: 'Categories',
			href: '/categories',
		},
		{
			icon: 'image' as IconType,
			label: 'Media Library',
			href: '/media-library',
		},
	],
	profileNav: [
		{
			label: 'My Profile',
			href: '/my-profile',
		},
		{
			label: 'Change Password',
			href: '/my-profile/change-password',
		},
		{
			label: 'Admin',
			href: '/admin',
		},
	],
}
