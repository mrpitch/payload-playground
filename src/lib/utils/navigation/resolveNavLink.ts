import type { Page, Doc } from '@payload-types'
import type { NavLink } from '@/lib/types/navigation'
import type { IconType } from '@/components/ui/custom/icons'

const HOME_SLUG = 'home'

export const resolvePageHref = (page: Page | null | undefined): string | null => {
	if (!page) return null
	const { slug } = page
	if (!slug) return null
	return slug === HOME_SLUG ? '/' : `/${slug}`
}

export const resolveDocHref = (doc: Doc | null | undefined): string | null => {
	if (!doc) return null
	const { slug } = doc
	if (!slug) return null
	return `/docs/${slug}`
}

export const getRelationshipValue = <T extends Page | Doc>(
	rel: { value: number | T } | null | undefined,
): T | null => {
	if (!rel) return null
	const { value } = rel
	return typeof value === 'number' ? null : (value as T)
}

const toIcon = (icon: unknown): IconType | undefined => {
	return typeof icon === 'string' ? (icon as IconType) : undefined
}

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
}

export const warnEmptyGroup = (context: string, label: string, detail?: string) => {
	if (process.env.NODE_ENV === 'development') {
		const extra = detail ? ` (${detail})` : ''
		console.warn(
			`[Navigation] Empty ${context}${extra} detected: "${label || '<unnamed>'}". Check CMS configuration.`,
		)
	}
}
