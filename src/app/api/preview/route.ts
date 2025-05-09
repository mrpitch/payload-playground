import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { draftMode } from 'next/headers'

import crypto from 'crypto'

import { getSession } from '@/lib/actions/get-session'
import { baseUrl, previewSecret } from '@/lib/utils/constants'

export async function GET(request: NextRequest) {
	const { nextUrl } = request
	const searchParams = nextUrl.searchParams
	const slug = searchParams.get('slug')
	const path = searchParams.get('path')
	const expires = searchParams.get('expires')
	const signature = searchParams.get('signature')

	const user = await getSession()

	if (!user) {
		return new Response('Unauthorized', { status: 401 })
	}

	const roles = user?.roles
	if (!roles?.includes('admin') && !roles?.includes('editor')) {
		return new Response('Unauthorized', { status: 401 })
	}

	if (!expires || !signature) {
		return NextResponse.json({ message: 'Missing parameters' }, { status: 400 })
	}

	if (Date.now() > parseInt(expires)) {
		return NextResponse.json({ message: 'Link expired' }, { status: 401 })
	}

	const secret = previewSecret
	if (!secret) {
		return new Response('Preview secret not configured', { status: 500 })
	}
	const data = `${path}:${expires}`
	const expectedSignature = crypto.createHmac('sha256', secret).update(data).digest('hex')

	if (signature !== expectedSignature) {
		return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
	}

	// Enable Draft Mode by setting the cookie
	const draft = await draftMode()
	draft.enable()
	console.log('draft', draft)

	return NextResponse.redirect(new URL(`${baseUrl}/${path}/${slug}`, nextUrl))
}
