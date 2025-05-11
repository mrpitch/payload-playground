'use client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation.js'

import { baseUrl } from '@/payload/utils/constants'

export const RefreshRouteOnSave: React.FC = () => {
	const router = useRouter()

	return <PayloadLivePreview refresh={() => router.refresh()} serverURL={baseUrl} />
}
