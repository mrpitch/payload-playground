// providers/navigation-provider.tsx
'use client'
import { createContext, useContext } from 'react'
import type { AppShell } from '@payload-types'

type NavigationData = {
	mainNav?: AppShell['mainNavigation']
	appNav?: AppShell['sideBarNavigation']
	userNav?: AppShell['profileNavigation']
}

const NavigationContext = createContext<NavigationData | null>(null)

export function NavigationProvider({
	data,
	children,
}: {
	data: NavigationData
	children: React.ReactNode
}) {
	return <NavigationContext.Provider value={data}>{children}</NavigationContext.Provider>
}

export function useNavigation() {
	const ctx = useContext(NavigationContext)
	if (!ctx) throw new Error('useNavigation must be used within NavigationProvider')
	return ctx
}
