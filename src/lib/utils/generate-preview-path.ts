import { previewSecret } from './constants'

type PreviewPathParams = {
	path: string
	slug: string
}

export function generatePreviewPath({ path, slug }: PreviewPathParams): string {
	const searchParams = new URLSearchParams({
		path,
		slug,
		secret: previewSecret || '',
	})

	return `/preview?${searchParams.toString()}`
}

// Example usage:
// generatePreviewPath({ path: 'blog', slug: 'my-post' })
// Returns: /preview?path=blog&slug=my-post&secret=your-secret
