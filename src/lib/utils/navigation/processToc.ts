import { cache } from 'react'
import type { Doc } from '@payload-types'
import { generateSlug } from '@/lib/utils/generateSlug'
import { HEADING_TYPE } from './sharedUtils'

/**
 * Document copy type for TOC processing
 */
type TDocCopy = Pick<Doc, 'copy'>

/**
 * Lexical heading node structure
 */
interface LexicalHeadingNode {
	type: 'heading'
	tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	children: Array<{ text?: string }>
}

/**
 * Lexical root node structure
 */
interface LexicalRootNode {
	children: Array<LexicalHeadingNode | { type: string }>
}

/**
 * Table of contents item
 */
export type TTocItem = {
	id: string
	text: string
	level: number
}

/**
 * Type guard to check if a node is a heading node
 * @param node - Node to check
 * @returns True if node is a heading node
 */
const isHeadingNode = (node: { type: string }): node is LexicalHeadingNode => {
	return node.type === HEADING_TYPE && 'tag' in node && 'children' in node
}

/**
 * Extracts text content from a heading node
 * @param heading - Heading node to extract text from
 * @returns Extracted text or empty string
 */
const extractHeadingText = (heading: LexicalHeadingNode): string => {
	if (!Array.isArray(heading.children) || heading.children.length === 0) {
		return ''
	}

	const firstChild = heading.children[0]
	return firstChild?.text ?? ''
}

/**
 * Extracts heading level from tag (h1-h6)
 * @param tag - Heading tag (h1, h2, etc.)
 * @returns Numeric level (1-6)
 */
const extractHeadingLevel = (tag: string): number => {
	const level = parseInt(tag.replace('h', ''), 10)
	return isNaN(level) ? 1 : Math.max(1, Math.min(6, level))
}

/**
 * Processes document copy to extract table of contents
 * Uses Next.js request-level caching for performance optimization
 * @param data - Document with copy field containing Lexical content
 * @returns Array of table of contents items
 * @example
 * processToc({ copy: { root: { children: [...] } } })
 * // => [{ id: 'introduction', text: 'Introduction', level: 1 }, ...]
 */
const processTocInternal = (data: TDocCopy | null | undefined): TTocItem[] => {
	try {
		// Validate input
		if (!data?.copy?.root) {
			return []
		}

		const root = data.copy.root as LexicalRootNode
		if (!Array.isArray(root.children) || root.children.length === 0) {
			return []
		}

		// Filter and process headings
		const headings = root.children.filter(isHeadingNode)

		return headings.map((heading) => {
			const text = extractHeadingText(heading)
			const slug = generateSlug(text)
			const level = extractHeadingLevel(heading.tag)

			return {
				id: slug,
				text,
				level,
			}
		})
	} catch (error) {
		console.error('[Navigation] Error processing TOC:', error)
		return []
	}
}

/**
 * Cached version of processToc using Next.js request-level caching
 * This provides automatic memoization within a single request
 */
export const processToc = cache(processTocInternal)
