import { IconType } from '@/components/ui/custom/icons'

export const siteConfig = {
	name: 'Payload Playground',
	description: 'Beautifully designed components built with Radix UI and Tailwind CSS.',
	mainNav: [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'My Route',
			href: '/my-route',
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
