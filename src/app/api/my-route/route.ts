import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {
	const payload = await getPayload({
		config: configPromise,
	})

	// const data = await payload.find({
	// 	collection: 'users',
	// }
	const data = await payload.find({
		collection: 'payload-folders',
	})

	return Response.json(data)
}
