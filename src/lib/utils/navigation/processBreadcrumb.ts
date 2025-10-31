import { cache } from 'react'
import type { DocsNavEntry, DocsNavMenu, NavFolder } from '@/lib/types/navigation'

/**
 * Resolved breadcrumb structure containing navigation hierarchy labels
 */
export type ResolvedBreadcrumb = {
	groupLabel?: string
	folderLabel?: string
	itemLabel?: string
}

// Constants
const DOCS_BASE_PATH = '/docs'
const ROOT_PATH = '/'

/**
 * Normalizes a URL path by removing query params, fragments, and trailing slashes
 * @param path - The path to normalize
 * @returns Normalized path with leading slash
 * @example
 * normalizePath('/docs/guide/') // => '/docs/guide'
 * normalizePath('docs#section') // => '/docs'
 * normalizePath('') // => '/'
 */
const normalizePath = (path: string): string => {
	if (!path || typeof path !== 'string') return ROOT_PATH

	// Remove query params and fragments
	const clean = path.split(/[#?]/)[0]

	// Ensure leading slash
	const withLeadingSlash = clean.startsWith('/') ? clean : `/${clean}`

	// Return root or remove trailing slashes
	return withLeadingSlash === ROOT_PATH ? ROOT_PATH : withLeadingSlash.replace(/\/+$/, '')
}

/**
 * Resolves the group label from menu or group data
 * @param menu - The navigation menu
 * @param groupLabel - The group label to resolve
 * @returns Resolved group label or undefined
 */
const resolveGroupLabel = (menu: DocsNavMenu, groupLabel: string): string | undefined => {
	return groupLabel || menu.name || undefined
}

/**
 * Type guard to check if a navigation entry is a folder
 * @param entry - Navigation entry to check
 * @returns True if entry is a folder
 */
const isFolder = (entry: DocsNavEntry): entry is NavFolder => {
	return entry.type === 'folder'
}

/**
 * Matches a navigation entry against a target path
 * @param entry - Navigation entry to match
 * @param targetPath - Target path to match against
 * @returns Match result with labels or null
 */
const matchNavEntry = (
	entry: DocsNavEntry,
	targetPath: string,
): { folderLabel?: string; itemLabel: string } | null => {
	if (isFolder(entry)) {
		return matchFolder(entry, targetPath)
	}

	if (normalizePath(entry.href) === targetPath) {
		return { itemLabel: entry.label }
	}

	return null
}

/**
 * Matches a folder's children against a target path
 * @param folder - Folder to search within
 * @param targetPath - Target path to match against
 * @returns Match result with folder and item labels or null
 */
const matchFolder = (
	folder: NavFolder,
	targetPath: string,
): { folderLabel: string; itemLabel: string } | null => {
	const matchedChild = folder.items.find((child) => normalizePath(child.href) === targetPath)

	return matchedChild ? { folderLabel: folder.label, itemLabel: matchedChild.label } : null
}

/**
 * Generator function to flatten navigation entries for efficient traversal
 * @param docsNav - Array of documentation navigation menus
 * @yields Navigation context with menu, group, and entry
 */
function* flattenNavEntries(docsNav: DocsNavMenu[]) {
	for (const menu of docsNav) {
		if (!menu.navGroups) continue

		for (const group of menu.navGroups) {
			if (!group.items) continue

			for (const entry of group.items) {
				yield { menu, group, entry }
			}
		}
	}
}

/**
 * Resolves breadcrumb navigation from docs navigation structure
 * Uses Next.js request-level caching for performance optimization
 * @param docsNav - Array of documentation navigation menus
 * @param slug - Page slug to resolve breadcrumb for
 * @returns Resolved breadcrumb or null if not found
 * @example
 * resolveBreadcrumbFromDocsNav(docsNav, 'getting-started')
 * // => { groupLabel: 'Introduction', itemLabel: 'Getting Started' }
 */
const resolveBreadcrumbFromDocsNavInternal = (
	docsNav: DocsNavMenu[],
	slug: string,
): ResolvedBreadcrumb | null => {
	try {
		// Validate inputs
		if (!Array.isArray(docsNav) || docsNav.length === 0) {
			return null
		}

		if (typeof slug !== 'string') {
			return null
		}

		// Normalize target path
		const targetPath = normalizePath(slug ? `${DOCS_BASE_PATH}/${slug}` : DOCS_BASE_PATH)
		if (!targetPath) return null

		// Traverse navigation structure
		for (const { menu, group, entry } of flattenNavEntries(docsNav)) {
			const match = matchNavEntry(entry, targetPath)
			if (match) {
				return {
					groupLabel: resolveGroupLabel(menu, group.label),
					...match,
				}
			}
		}

		return null
	} catch (error) {
		console.error('Error resolving breadcrumb:', error)
		return null
	}
}

/**
 * Cached version of resolveBreadcrumbFromDocsNav using Next.js request-level caching
 * This provides automatic memoization within a single request
 */
export const resolveBreadcrumbFromDocsNav = cache(resolveBreadcrumbFromDocsNavInternal)
