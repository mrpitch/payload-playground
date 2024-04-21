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
				inverse: 'hsl(var(--primary-inverse))',
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary-default))',
				light: 'hsl(var(--secondary-light))',
				dark: 'hsl(var(--secondary-dark))',
				inverse: 'hsl(var(--secondary-inverse))',
			},
			foreground: {
				DEFAULT: 'hsl(var(--foreground-default))',
				light: 'hsl(var(--foreground-light))',
				dark: 'hsl(var(--foreground-dark))',
				inverse: 'hsl(var(--foreground-inverse))',
			},
			background: {
				DEFAULT: 'hsl(var(--background-default))',
				light: 'hsl(var(--background-light))',
				dark: 'hsl(var(--background-dark))',
				inverse: 'hsl(var(--background-inverse))',
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
			input: {
				DEFAULT: 'hsl(var(--input-default))',
				placeholder: 'hsl(var(--input-placeholder))',
				hover: 'hsl(var(--input-hover))',
				focus: 'hsl(var(--input-focus))',
				muted: 'hsl(var(--input-muted))',
				border: 'hsl(var(--input-border))',
				borderMuted: 'hsl(var(--input-border-muted))',
				background: 'hsl(var(--input-background))',
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
