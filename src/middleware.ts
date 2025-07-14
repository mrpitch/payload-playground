import { NextRequest, NextResponse } from 'next/server'
import { previewSecret, baseUrl } from '@/lib/utils/constants'

export function middleware(req: NextRequest) {
	const { pathname, searchParams } = req.nextUrl

	// Check for preview mode
	const isPreview = req.cookies.get('__next_preview_data') || req.cookies.get('__prerender_bypass')
	//console.log('isPreview', !isPreview)
	//console.log('pathname', pathname)
	// If not in preview mode and trying to access preview content
	if (!isPreview && pathname.startsWith('/preview')) {
		//console.log('isPreview', isPreview)
		const path = searchParams.get('path') || ''
		const slug = searchParams.get('slug') || ''
		const secret = previewSecret || ''

		// Redirect to preview API
		const apiUrl = new URL('/api/preview', baseUrl)
		apiUrl.searchParams.set('secret', secret)
		apiUrl.searchParams.set('path', path)
		apiUrl.searchParams.set('slug', slug)
		return NextResponse.redirect(new URL(apiUrl, req.url))
	}

	// If in preview mode, rewrite the URL to show the actual content
	if (isPreview && pathname.startsWith('/preview')) {
		const newPathname = pathname === '/preview' ? '/' : pathname.replace(/^\/preview/, '')
		const rewrittenUrl = req.nextUrl.clone()
		rewrittenUrl.pathname = newPathname
		//console.log('rewrittenUrl', rewrittenUrl)
		return NextResponse.rewrite(rewrittenUrl)
	}

	return NextResponse.next()
}

// don't invoke Middleware on some paths
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
	],
}
