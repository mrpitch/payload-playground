import { Plugin } from 'payload'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'

import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { Page } from '@payload-types'
import { getServerSideURL } from '@/payload/utils/get-url'

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
	return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}
const generateURL: GenerateURL<Page> = ({ doc }) => {
	const url = getServerSideURL()

	return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
	seoPlugin({
		generateTitle,
		generateURL,
	}),
	payloadCloudPlugin(),
	s3Storage({
		collections: {
			media: {
				prefix: process.env.AWS_S3_BUCKET_PREFIX || '',
			},
		},
		disableLocalStorage: process.env.AWS_S3_BUCKET_NAME ? false : true,
		bucket: process.env.AWS_S3_BUCKET_NAME || '',
		config: {
			credentials: {
				accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || '',
				secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || '',
			},
			region: process.env.AWS_S3_REGION || '',
		},
	}),
]
