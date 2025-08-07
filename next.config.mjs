import { withPayload } from '@payloadcms/next/withPayload'
import withBundleAnalyzer from '@next/bundle-analyzer'

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
	webpack: (config) => {
		process.setMaxListeners(20)
		return config
	},
}

const withBundleAnalyzerConfig = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzerConfig(withPayload(nextConfig, { devBundleServerPackages: false }))
