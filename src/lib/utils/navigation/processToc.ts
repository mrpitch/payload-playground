import { Doc } from '@payload-types'
import { generateSlug } from '../generateSlug'

type TDocCopy = Pick<Doc, 'copy'>

export type TTocItem = {
	id: string
	text: string
	level: number
}
export const processToc = (data: TDocCopy | null | undefined) => {
	if (!data?.copy?.root) return []

	const { children } = data?.copy?.root ?? []
	const headings = children.filter((child) => child.type === 'heading')

	return headings.map((heading) => {
		const text = Array.isArray((heading as any).children) ? (heading as any).children[0]?.text : ''
		const slug = generateSlug(text)

		return {
			id: slug,
			text: text,
			level: parseInt((heading as any).tag.replace('h', '')),
		}
	}) as TTocItem[]
}
