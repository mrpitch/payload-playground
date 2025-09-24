import { cache } from 'react'
import { getNavData } from '@/lib/utils/getNavData'
import { NavigationProviderClient } from './nav-provider'

const getNavDataCached = cache(getNavData)

export async function NavigationProvider({ children }: { children: React.ReactNode }) {
	const navPromise = getNavDataCached()
	return <NavigationProviderClient value={navPromise}>{children}</NavigationProviderClient>
}
