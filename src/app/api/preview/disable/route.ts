import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { draftMode } from 'next/headers'

export async function GET(request: NextRequest) {
	const { nextUrl } = request
	const searchParams = nextUrl.searchParams
	const redirectUrl = searchParams.get('redirect')

	const draft = await draftMode()
	draft.disable()

	console.log(redirectUrl)
	return NextResponse.redirect(new URL(redirectUrl || '/', nextUrl))
}
