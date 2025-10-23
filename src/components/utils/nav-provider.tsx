/**
 * Navigation Provider - Context-Level Caching Implementation
 *
 * This provider implements a high-performance navigation system using context-level caching.
 * All navigation data processing happens once per request and is cached for the entire
 * component tree, eliminating redundant processing on every render.
 *
 * ## Architecture:
 * 1. Raw navigation data fetched server-side (cached with React's cache())
 * 2. NavigationProvider processes all data once using useMemo
 * 3. useNavigation hook simply returns pre-processed data
 * 4. Components receive instant, processed navigation data
 */

'use client'
import { createContext, use, useMemo } from 'react'
import type { Usable } from 'react'

import type { TNavData, TProcessedNavData } from '@/lib/types/navigation'
import { processNavData } from '@/lib/utils/processNavData'
export const NavigationContext = createContext<TProcessedNavData | null>(null)

export function NavigationProviderClient({
	value,
	children,
}: {
	value: Usable<TNavData>
	children: React.ReactNode
}) {
	const rawData = use(value)

	const processedData: TProcessedNavData = useMemo(() => {
		return processNavData(rawData)
	}, [rawData])

	return <NavigationContext.Provider value={processedData}>{children}</NavigationContext.Provider>
}
