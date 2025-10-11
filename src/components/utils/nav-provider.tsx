// providers/navigation-provider.tsx
'use client'
import { createContext, useContext, use } from 'react'
import type { Usable } from 'react'
import type { TNavData } from '@/lib/utils/getNavData'

export const NavigationContext = createContext<TNavData | null>(null)

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
