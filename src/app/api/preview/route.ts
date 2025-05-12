import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { draftMode } from 'next/headers'

import { getSession } from '@/lib/actions/get-session'
import { baseUrl, previewSecret } from '@/lib/utils/constants'

export async function GET(request: NextRequest) {
	const { nextUrl } = request
	const searchParams = nextUrl.searchParams
	const slug = searchParams.get('slug')
	const path = searchParams.get('path')
	const secret = searchParams.get('secret')
	const user = await getSession()

	if (!user) {
		return new Response('Unauthorized', { status: 401 })
	}

	const roles = user?.roles
	if (!roles?.includes('admin') && !roles?.includes('editor')) {
		return new Response('Unauthorized', { status: 401 })
	}

	if (secret !== previewSecret) {
		return new Response('Unauthorized', { status: 401 })
	}

	// Enable Draft Mode by setting the cookie
	const draft = await draftMode()
	draft.enable()
	console.log('draft', draft)

	return NextResponse.redirect(new URL(`${baseUrl}/${path}/${slug}`, nextUrl))
}
