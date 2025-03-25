import { variables } from './variables'
export const theme = {
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
		// fontFamily: {
		// 	regular: ['hsl(var(----font-typeNextRegular))'],
		// 	light: ['hsl(var(----font-typeNextLight))'],
		// 	semibold: ['hsl(var(----font-typeNextBold))'],
		// 	bold: ['hsl(var(----font-typeNextBold))'],
		// },
		colors: {
			primary: {
				DEFAULT: variables['root']['--primary'],
				foreground: variables['root']['--primary-foreground'],
				light: variables['root']['--primary-light'],
				dark: variables['root']['--primary-dark'],
			},
			secondary: {
				DEFAULT: variables['root']['--secondary'],
				foreground: variables['root']['--secondary-foreground'],
				light: variables['root']['--secondary-light'],
				dark: variables['root']['--secondary-dark'],
			},
			foreground: {
				DEFAULT: variables['root']['--foreground'],
				light: variables['root']['--foreground-light'],
				dark: variables['root']['--foreground-dark'],
			},
			background: {
				DEFAULT: variables['root']['--background'],
				light: variables['root']['--background-light'],
				dark: variables['root']['--background-dark'],
			},
			card: {
				DEFAULT: variables['root']['--card'],
				primary: variables['root']['--card-primary'],
				secondary: variables['root']['--card-secondary'],
				foreground: variables['root']['--card-foreground'],
				foregroundprimary: variables['root']['--card-foreground-primary'],
				foregroundsecondary: variables['root']['--card-foreground-secondary'],
			},
			popover: {
				DEFAULT: variables['root']['--popover'],
				primary: variables['root']['--popover-primary'],
				secondary: variables['root']['--popover-secondary'],
				foreground: variables['root']['--popover-foreground'],
				foregroundprimary: variables['root']['--popover-foreground-primary'],
				foregroundsecondary: variables['root']['--popover-foreground-secondary'],
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
			info: {
				DEFAULT: variables['root']['--info'],
				background: variables['root']['--info-background'],
				foreground: variables['root']['--info-foreground'],
				border: variables['root']['--info-border'],
			},
			warning: {
				DEFAULT: variables['root']['--warning'],
				background: variables['root']['--warning-background'],
				foreground: variables['root']['--warning-foreground'],
				border: variables['root']['--warning-border'],
			},
			success: {
				DEFAULT: variables['root']['--success'],
				background: variables['root']['--success-background'],
				foreground: variables['root']['--success-foreground'],
				border: variables['root']['--success-border'],
			},
			error: {
				DEFAULT: variables['root']['--error'],
				background: variables['root']['--error-background'],
				foreground: variables['root']['--error-foreground'],
				border: variables['root']['--error-border'],
			},
			border: {
				DEFAULT: variables['root']['--border'],
				primary: variables['root']['--border-primary'],
				secondary: variables['root']['--border-secondary'],
			},
			input: {
				DEFAULT: variables['root']['--border'],
				primary: variables['root']['--border-primary'],
				secondary: variables['root']['--border-secondary'],
			},
			ring: {
				DEFAULT: variables['root']['--border'],
				primary: variables['root']['--border-primary'],
				secondary: variables['root']['--border-secondary'],
			},
		},
		extend: {
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
}

export const themeDark = {
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
		// fontFamily: {
		// 	regular: ['hsl(var(----font-typeNextRegular))'],
		// 	light: ['hsl(var(----font-typeNextLight))'],
		// 	semibold: ['hsl(var(----font-typeNextBold))'],
		// 	bold: ['hsl(var(----font-typeNextBold))'],
		// },
		colors: {
			primary: {
				DEFAULT: variables['dark']['--primary'],
				foreground: variables['dark']['--primary-foreground'],
				light: variables['dark']['--primary-light'],
				dark: variables['dark']['--primary-dark'],
			},
			secondary: {
				DEFAULT: variables['dark']['--secondary'],
				foreground: variables['dark']['--secondary-foreground'],
				light: variables['dark']['--secondary-light'],
				dark: variables['dark']['--secondary-dark'],
			},
			foreground: {
				DEFAULT: variables['dark']['--foreground'],
				light: variables['dark']['--foreground-light'],
				dark: variables['dark']['--foreground-dark'],
			},
			background: {
				DEFAULT: variables['dark']['--background'],
				light: variables['dark']['--background-light'],
				dark: variables['dark']['--background-dark'],
			},
			card: {
				DEFAULT: variables['dark']['--card'],
				primary: variables['dark']['--card-primary'],
				secondary: variables['dark']['--card-secondary'],
				foreground: variables['dark']['--card-foreground'],
				foregroundprimary: variables['dark']['--card-foreground-primary'],
				foregroundsecondary: variables['dark']['--card-foreground-secondary'],
			},
			popover: {
				DEFAULT: variables['root']['--popover'],
				primary: variables['dark']['--popover-primary'],
				secondary: variables['dark']['--popover-secondary'],
				foreground: variables['dark']['--popover-foreground'],
				foregroundprimary: variables['dark']['--popover-foreground-primary'],
				foregroundsecondary: variables['dark']['--popover-foreground-secondary'],
			},
			destructive: {
				DEFAULT: variables['dark']['--destructive'],
				foreground: variables['dark']['--destructive-foreground'],
			},
			muted: {
				DEFAULT: variables['dark']['--muted'],
				foreground: variables['dark']['--muted-foreground'],
			},
			accent: {
				DEFAULT: variables['dark']['--accent'],
				foreground: variables['dark']['--accent-foreground'],
			},
			info: {
				DEFAULT: variables['dark']['--info'],
				background: variables['dark']['--info-background'],
				foreground: variables['dark']['--info-foreground'],
				border: variables['dark']['--info-border'],
			},
			warning: {
				DEFAULT: variables['dark']['--warning'],
				background: variables['dark']['--warning-background'],
				foreground: variables['dark']['--warning-foreground'],
				border: variables['dark']['--warning-border'],
			},
			success: {
				DEFAULT: variables['dark']['--success'],
				background: variables['dark']['--success-background'],
				foreground: variables['dark']['--success-foreground'],
				border: variables['dark']['--success-border'],
			},
			error: {
				DEFAULT: variables['dark']['--error'],
				background: variables['dark']['--error-background'],
				foreground: variables['dark']['--error-foreground'],
				border: variables['dark']['--error-border'],
			},
			border: {
				DEFAULT: variables['dark']['--border'],
				primary: variables['dark']['--border-primary'],
				secondary: variables['dark']['--border-secondary'],
			},
			input: {
				DEFAULT: variables['dark']['--border'],
				primary: variables['dark']['--border-primary'],
				secondary: variables['dark']['--border-secondary'],
			},
			ring: {
				DEFAULT: variables['dark']['--border'],
				primary: variables['dark']['--border-primary'],
				secondary: variables['dark']['--border-secondary'],
			},
		},
		extend: {
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
}
