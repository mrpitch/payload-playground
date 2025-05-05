import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { draftMode } from 'next/headers'

import { baseUrl, previewSecret } from '@/lib/utils/constants'

export async function GET(request: NextRequest) {
	const { nextUrl } = request
	const searchParams = nextUrl.searchParams
	const secret = searchParams.get('secret')
	const slug = searchParams.get('slug')
	const path = searchParams.get('path')

	// Check the secret and next parameters
	// This secret should only be known to this route handler and the CMS
	if (secret !== previewSecret || !slug) {
		return new Response('Invalid token', { status: 401 })
	}

	// If the slug doesn't exist prevent draft mode from being enabled
	if (!slug) {
		return new Response('Invalid slug', { status: 401 })
	}

	// Enable Draft Mode by setting the cookie
	const draft = await draftMode()
	draft.enable()
	console.log('draft', draft)

	return NextResponse.redirect(new URL(`${baseUrl}/${path}/${slug}`, nextUrl))
}
