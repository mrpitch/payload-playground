import { cookies, draftMode } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getSession } from '@/lib/actions/get-session'
import { baseUrl, previewSecret } from '@/lib/utils/constants'

export async function GET(request: NextRequest) {
	const { nextUrl } = request
	const searchParams = nextUrl.searchParams
	const slug = searchParams.get('slug')
	const path = searchParams.get('path')
	const user = await getSession()

	if (!user) {
		return new Response('Unauthorized', { status: 401 })
	}

	const roles = user?.roles
	if (!roles?.includes('admin') && !roles?.includes('editor')) {
		return new Response('Unauthorized', { status: 401 })
	}

	const cookieStore = await cookies()
	const secret = cookieStore.get('__preview_secret')?.value
	cookieStore.delete('__preview_secret')

	if (!secret || secret !== previewSecret) {
		return new Response('Unauthorized', { status: 401 })
	}

	const allowedPaths = ['posts', 'pages', 'docs']
	if (!path || !allowedPaths.includes(path)) {
		return new Response('Invalid path', { status: 400 })
	}

	if (!slug || !/^[\w-]+$/.test(slug)) {
		return new Response('Invalid slug', { status: 400 })
	}

	// Enable Draft Mode by setting the cookie
	const draft = await draftMode()
	draft.enable()

	return NextResponse.redirect(new URL(`${baseUrl}/${path}/${slug}`, nextUrl))
}
