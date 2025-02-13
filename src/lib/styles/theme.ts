export const theme = {
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
		fontFamily: {
			regular: ['hsl(var(----font-typeNextRegular))'],
			light: ['hsl(var(----font-typeNextLight))'],
			semibold: ['hsl(var(----font-typeNextBold))'],
			bold: ['hsl(var(----font-typeNextBold))'],
		},
		colors: {
			primary: {
				DEFAULT: 'hsl(var(--primary-default))',
				light: 'hsl(var(--primary-light))',
				dark: 'hsl(var(--primary-dark))',
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary-default))',
				light: 'hsl(var(--secondary-light))',
				dark: 'hsl(var(--secondary-dark))',
			},
			foreground: {
				DEFAULT: 'hsl(var(--foreground-default))',
				light: 'hsl(var(--foreground-light))',
				dark: 'hsl(var(--foreground-dark))',
			},
			background: {
				DEFAULT: 'hsl(var(--background-default))',
				light: 'hsl(var(--background-light))',
				dark: 'hsl(var(--background-dark))',
			},
			card: {
				DEFAULT: 'hsl(var(--card-default))',
				primary: 'hsl(var(--card-primary))',
				secondary: 'hsl(var(--card-secondary))',
				foreground: 'hsl(var(--card-foreground-default))',
				foregroundprimary: 'hsl(var(--card-foreground-primary))',
				foregroundsecondary: 'hsl(var(--card-foreground-secondary))',
			},
			popover: {
				DEFAULT: 'hsl(var(--popover-default))',
				primary: 'hsl(var(--popover-primary))',
				secondary: 'hsl(var(--popover-secondary))',
				foreground: 'hsl(var(--popover-foreground-default))',
				foregroundprimary: 'hsl(var(--popover-foreground-primary))',
				foregroundsecondary: 'hsl(var(--popover-foreground-secondary))',
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive-default))',
				foreground: 'hsl(var(--destructive-foreground))',
			},
			muted: {
				DEFAULT: 'hsl(var(--muted-default))',
				foreground: 'hsl(var(--muted-foreground))',
			},
			accent: {
				DEFAULT: 'hsl(var(--accent-default))',
				foreground: 'hsl(var(--accent-foreground))',
			},
			info: {
				DEFAULT: 'hsl(var(--info-default))',
				background: 'hsl(var(--info-background))',
				foreground: 'hsl(var(--info-foreground))',
				border: 'hsl(var(--info-border))',
			},
			warning: {
				DEFAULT: 'hsl(var(--warning-default))',
				background: 'hsl(var(--warning-background))',
				foreground: 'hsl(var(--warning-foreground))',
				border: 'hsl(var(--warning-border))',
			},
			success: {
				DEFAULT: 'hsl(var(--success-default))',
				background: 'hsl(var(--success-background))',
				foreground: 'hsl(var(--success-foreground))',
				border: 'hsl(var(--success-border))',
			},
			error: {
				DEFAULT: 'hsl(var(--error-default))',
				background: 'hsl(var(--error-background))',
				foreground: 'hsl(var(--error-foreground))',
				border: 'hsl(var(--error-border))',
			},
			border: {
				DEFAULT: 'hsl(var(--border-default))',
				primary: 'hsl(var(--border-primary))',
				secondary: 'hsl(var(--border-secondary))',
			},
			input: {
				DEFAULT: 'hsl(var(--border-default))',
				primary: 'hsl(var(--border-primary))',
				secondary: 'hsl(var(--border-secondary))',
			},
			ring: {
				DEFAULT: 'hsl(var(--border-default))',
				primary: 'hsl(var(--border-primary))',
				secondary: 'hsl(var(--border-secondary))',
			},
			white: '#ffffff',
			black: '#000000',
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
