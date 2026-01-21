import { baseUrl } from '@/lib/utils/constants'

export function generatePreviewPath(path: string, slug: string) {
	const url = new URL(`/preview/${path}/${slug}`, baseUrl)
	return url.toString()
}
