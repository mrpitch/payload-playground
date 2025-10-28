import type { DocsNavEntry, DocsNavMenu, NavFolder } from '@/lib/types/navigation'

export type ResolvedBreadcrumb = {
	groupLabel?: string
	folderLabel?: string
	itemLabel?: string
}

const normalizePath = (path: string) => {
	if (!path) return ''
	const [clean] = path.split(/[#?]/)
	const withLeadingSlash = clean.startsWith('/') ? clean : `/${clean}`
	if (withLeadingSlash.length === 1) return '/'
	return withLeadingSlash.replace(/\/+$/, '')
}

const resolveGroupLabel = (menu: DocsNavMenu, groupLabel: string): string | undefined => {
	if (groupLabel) return groupLabel
	if (menu.name) return menu.name
	return undefined
}

const matchNavEntry = (
	entry: DocsNavEntry,
	targetPath: string,
): { folderLabel?: string; itemLabel: string } | null => {
	if (entry.type === 'folder') {
		return matchFolder(entry, targetPath)
	}

	if (normalizePath(entry.href) === targetPath) {
		return { itemLabel: entry.label }
	}

	return null
}

const matchFolder = (folder: NavFolder, targetPath: string) => {
	for (const child of folder.items) {
		if (normalizePath(child.href) === targetPath) {
			return {
				folderLabel: folder.label,
				itemLabel: child.label,
			}
		}
	}
	return null
}

export const resolveBreadcrumbFromDocsNav = (docsNav: DocsNavMenu[], slug: string): ResolvedBreadcrumb | null => {
	const targetPath = normalizePath(slug ? `/docs/${slug}` : '/docs')
	if (!targetPath) return null

	for (const menu of docsNav) {
		for (const group of menu.navGroups) {
			for (const entry of group.items) {
				const match = matchNavEntry(entry, targetPath)
				if (match) {
					return {
						groupLabel: resolveGroupLabel(menu, group.label),
						...match,
					}
				}
			}
		}
	}

	return null
}
