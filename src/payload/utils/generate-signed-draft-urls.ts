// utils/signDraftUrl.ts
import crypto from 'crypto'
import { previewSecret, baseUrl } from '@/lib/utils/constants'

export function generateSignedDraftUrl(path: string, slug: string) {
	const secret = previewSecret
	if (!secret) throw new Error('Preview secret is not configured')

	const expires = Date.now() + 5 * 60 * 1000 // expires in 5 min
	const data = `${path}:${expires}`
	const signature = crypto.createHmac('sha256', secret).update(data).digest('hex')

	const url = new URL('/api/preview', baseUrl)
	url.searchParams.set('expires', expires.toString())
	url.searchParams.set('signature', signature)
	url.searchParams.set('path', path)
	url.searchParams.set('slug', slug)
	console.log('url', url.toString())
	return url.toString()
}
