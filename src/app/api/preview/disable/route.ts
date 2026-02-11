import { draftMode } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const { nextUrl } = request
	const searchParams = nextUrl.searchParams
	const redirectUrl = searchParams.get('redirect')

	const draft = await draftMode()
	draft.disable()

	// Validate redirect is a relative path (prevent open redirect)
	const safePath = redirectUrl?.startsWith('/') && !redirectUrl.startsWith('//') ? redirectUrl : '/'

	return NextResponse.redirect(new URL(safePath, nextUrl))
}
