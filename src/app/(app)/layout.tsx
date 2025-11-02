import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { cn } from '@/lib/utils/cn'

// import {
// 	typeNextRegular,
// 	typeNextLight,
// 	typeNextSemiBold,
// 	typeNextBold,
// } from '@/lib/styles/fonts/index'

import { sans, serif, mono } from '@/lib/styles/fonts'
import '@/lib/styles/globals.css'

import { ThemeProvider } from '@/components/utils/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { CookieConsent } from '@/components/layout/cookie-consent'

import { useThemeStore } from '@/lib/store/theme-store'
// Navigation provider is scoped closer to consumers to enable Suspense fallbacks

export const metadata: Metadata = {
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
}

export const viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const cookieStore = await cookies()
	const currentTheme = cookieStore.get('theme')
	const hasConsent = cookieStore.get('cookie_consent')?.value

	return (
		<html
			lang="en"
			data-mode={currentTheme?.value || useThemeStore.getState().theme}
			className={cn(currentTheme?.value || useThemeStore.getState().theme, 'h-full')}
		>
			<head />
			<ThemeProvider>
				<body
					className={cn(
						'bg-background h-full min-h-screen font-sans antialiased',
						sans.variable,
						serif.variable,
						mono.variable,
					)}
				>
					{children}
					<Toaster position="bottom-right" />

					{!hasConsent && <CookieConsent variant="default" />}
				</body>
			</ThemeProvider>
		</html>
	)
}
