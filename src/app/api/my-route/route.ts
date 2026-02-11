import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getSession } from '@/lib/actions/get-session'

export const GET = async () => {
	const user = await getSession()
	if (!user) {
		return new Response('Unauthorized', { status: 401 })
	}

	const payload = await getPayload({
		config: configPromise,
	})

	const data = await payload.find({
		collection: 'payload-folders',
	})

	return Response.json(data)
}
