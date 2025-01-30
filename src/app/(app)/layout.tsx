import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { cn } from '@/lib/utils/cn'

import {
  typeNextRegular,
  typeNextLight,
  typeNextSemiBold,
  typeNextBold,
} from '@/lib/styles/fonts/index'
import '@/lib/styles/globals.css'

import { siteConfig } from '@/lib/config'

import { ThemeProvider } from '@/components/utils/theme-provider'
import { Toaster } from '@/components/ui/toast'
import { useThemeStore } from '@/lib/store/theme-store'
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
            'font-sans h-full min-h-screen antialiased',
            typeNextRegular.variable,
            typeNextLight.variable,
            typeNextSemiBold.variable,
            typeNextBold.variable,
          )}
        >
          {children}
          <Toaster position="bottom-right" />
        </body>
      </ThemeProvider>
    </html>
  )
}
