import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		turbo: {
			resolveAlias: {
				'@/*': './src/*',
			},
		},
	},
	images: {
		dangerouslyAllowSVG: true,
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
		],
		formats: ['image/avif', 'image/webp'],
	},
}

export default withPayload(nextConfig)
