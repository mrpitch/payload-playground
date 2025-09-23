import { getNavData } from '@/lib/utils/getNavData'
import { NavigationProvider } from './nav-provider'

export async function NavProviderServer({ children }: { children: React.ReactNode }) {
	const navPromise = getNavData()
	return <NavigationProvider value={navPromise}>{children}</NavigationProvider>
}
