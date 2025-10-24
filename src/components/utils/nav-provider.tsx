'use client'
import { createContext, use } from 'react'
import type { Usable } from 'react'

import type { TProcessedNavData } from '@/lib/types/navigation'
export const NavigationContext = createContext<TProcessedNavData | null>(null)

/**
 * NavigationProviderClient consumes the server-processed navigation data (see getNavData)
 * and exposes it via React context for client components.
 */
export function NavigationProviderClient({
	value,
	children,
}: {
	value: Usable<TProcessedNavData>
	children: React.ReactNode
}) {
	const processedData = use(value)
	return <NavigationContext.Provider value={processedData}>{children}</NavigationContext.Provider>
}
