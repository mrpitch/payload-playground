// providers/navigation-provider.tsx
'use client'
import { createContext, useContext, use } from 'react'
import type { Usable } from 'react'
import type { TNavData } from '@/lib/utils/getNavData'

const NavigationContext = createContext<TNavData | null>(null)

export function NavigationProviderClient({
	value,
	children,
}: {
	value: Usable<TNavData>
	children: React.ReactNode
}) {
	const data = use(value)
	return <NavigationContext.Provider value={data}>{children}</NavigationContext.Provider>
}

export function useNavigation() {
	const ctx = useContext(NavigationContext)
	if (!ctx) throw new Error('useNavigation must be used within NavigationProvider')
	return ctx
}
