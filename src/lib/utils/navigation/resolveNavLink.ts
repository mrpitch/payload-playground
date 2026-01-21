import type { Page, Doc } from '@payload-types'
import type { NavLink } from '@/lib/types/navigation'
import type { IconType } from '@/components/ui/custom/icons'
import { toIcon, warnEmptyGroup, HOME_SLUG, DOCS_BASE_PATH } from './sharedUtils'

/**
 * Resolves a Page object to its href path
 * @param page - Page object to resolve
 * @returns Resolved path string or null if invalid
 * @example
 * resolvePageHref({ slug: 'home' }) // => '/'
 * resolvePageHref({ slug: 'about' }) // => '/about'
 * resolvePageHref(null) // => null
 */
export const resolvePageHref = (page: Page | null | undefined): string | null => {
	if (!page) return null

	const { slug } = page
	if (!slug || typeof slug !== 'string') return null

	return slug === HOME_SLUG ? '/' : `/${slug}`
}

/**
 * Resolves a Doc object to its href path
 * @param doc - Doc object to resolve
 * @returns Resolved path string or null if invalid
 * @example
 * resolveDocHref({ slug: 'getting-started' }) // => '/docs/getting-started'
 * resolveDocHref(null) // => null
 */
export const resolveDocHref = (doc: Doc | null | undefined): string | null => {
	if (!doc) return null

	const { slug } = doc
	if (!slug || typeof slug !== 'string') return null

	return `${DOCS_BASE_PATH}/${slug}`
}

/**
 * Extracts the actual value from a Payload relationship, filtering out numeric IDs
 * @param rel - Relationship object that may contain a value or numeric ID
 * @returns The actual Page or Doc object, or null if not found
 * @example
 * getRelationshipValue({ value: { slug: 'about' } }) // => { slug: 'about' }
 * getRelationshipValue({ value: 123 }) // => null
 */
export const getRelationshipValue = <T extends Page | Doc>(
	rel: { value: number | T } | null | undefined,
): T | null => {
	if (!rel) return null
	
	const { value } = rel
	if (typeof value === 'number') return null
	if (!value || typeof value !== 'object') return null
	
	return value as T
}

/**
 * Creates a navigation link from a Payload menu item
 * Supports three types: page links, doc links, and external URLs
 * @param item - Menu item to convert to navigation link
 * @returns NavLink object or null if invalid or incomplete
 * @example
 * createNavLink({ type: 'page', label: 'Home', page: { value: pageObject } })
 * // => { type: 'link', label: 'Home', href: '/', icon: undefined }
 */
export const createNavLink = (
	item:
		| {
				type?: string | null
				icon?: IconType | null
				label?: string | null
				page?: { relationTo: 'pages'; value: number | Page } | null
				doc?: { relationTo: 'docs'; value: number | Doc } | null
				url?: string | null
		  }
		| undefined,
): NavLink | null => {
	if (!item) return null

	try {
		let label = item.label ?? undefined
		let href: string | null = null
		let icon = toIcon(item.icon)

		if (item.type === 'page') {
			const page = getRelationshipValue<Page>(item.page)
			href = resolvePageHref(page)
			if (!label && page) {
				label = page.title
			}
		} else if (item.type === 'doc') {
			const doc = getRelationshipValue<Doc>(item.doc)
			href = resolveDocHref(doc)
			if (!label && doc) {
				label = doc.title
			}
			if (!icon && doc?.icon) {
				icon = toIcon(doc.icon)
			}
		} else if (item.type === 'url') {
			href = item.url ?? null
		} else {
			return null
		}

		if (!href || !label) return null

		return {
			type: 'link',
			label,
			href,
			icon,
		}
	} catch (error) {
		console.error('[Navigation] Error creating nav link:', error)
		return null
	}
}

// Re-export warnEmptyGroup for backward compatibility
export { warnEmptyGroup }
