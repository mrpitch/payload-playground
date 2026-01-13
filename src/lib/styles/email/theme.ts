import { variables } from './variables-bubblegum'

export const theme = {
	screens: {
		sm: '640px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
		'2xl': '1536px',
	},
	extend: {
		colors: {
			border: variables['root']['--border'],
			input: variables['root']['--input'],
			ring: variables['root']['--ring'],
			background: variables['root']['--background'],
			foreground: variables['root']['--foreground'],
			primary: {
				DEFAULT: variables['root']['--primary'],
				foreground: variables['root']['--primary-foreground'],
			},
			secondary: {
				DEFAULT: variables['root']['--secondary'],
				foreground: variables['root']['--secondary-foreground'],
			},
			destructive: {
				DEFAULT: variables['root']['--destructive'],
				foreground: variables['root']['--destructive-foreground'],
			},
			muted: {
				DEFAULT: variables['root']['--muted'],
				foreground: variables['root']['--muted-foreground'],
			},
			accent: {
				DEFAULT: variables['root']['--accent'],
				foreground: variables['root']['--accent-foreground'],
			},
			popover: {
				DEFAULT: variables['root']['--popover'],
				foreground: variables['root']['--popover-foreground'],
			},
			card: {
				DEFAULT: variables['root']['--card'],
				foreground: variables['root']['--card-foreground'],
			},
			sidebar: {
				DEFAULT: variables['root']['--sidebar'],
				foreground: variables['root']['--sidebar-foreground'],
				primary: variables['root']['--sidebar-primary'],
				'primary-foreground': variables['root']['--sidebar-primary-foreground'],
				accent: variables['root']['--sidebar-accent'],
				'accent-foreground': variables['root']['--sidebar-accent-foreground'],
				border: variables['root']['--sidebar-border'],
				ring: variables['root']['--sidebar-ring'],
			},
			chart: {
				1: variables['root']['--chart-1'],
				2: variables['root']['--chart-2'],
				3: variables['root']['--chart-3'],
				4: variables['root']['--chart-4'],
				5: variables['root']['--chart-5'],
			},
		},
		borderRadius: {
			lg: variables['root']['--radius'],
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)',
		},
		fontFamily: {
			sans: [variables['root']['--font-sans']],
			serif: ['var(--font-serif)'],
			mono: ['var(--font-mono)'],
		},
	},
}
