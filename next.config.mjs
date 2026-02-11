import withBundleAnalyzer from '@next/bundle-analyzer'
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
turbopack: {
		resolveAlias: {
			'@/*': './src/*',
		},
	},
	images: {
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'assets.mrpitch.rocks',
				pathname: '/payloadcms-playground/**',
			},
			{
				protocol: 'https',
				hostname: 'img.youtube.com',
				pathname: '/**',
			},
		],
		formats: ['image/avif', 'image/webp'],
	},
	webpack: (config) => {
		process.setMaxListeners(20)
		return config
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{ key: 'X-Frame-Options', value: 'DENY' },
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=31536000; includeSubDomains',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
					{
						key: 'Content-Security-Policy',
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com",
							"style-src 'self' 'unsafe-inline'",
							"img-src 'self' data: blob: https://assets.mrpitch.rocks https://img.youtube.com",
							"font-src 'self'",
							"frame-src 'self' https://www.youtube.com",
							"connect-src 'self'",
							"object-src 'none'",
							"base-uri 'self'",
							"form-action 'self'",
						].join('; '),
					},
				],
			},
		]
	},
}

const withBundleAnalyzerConfig = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzerConfig(withPayload(nextConfig, { devBundleServerPackages: false }))
