'use server'
import { getPayload, Payload } from 'payload'
import configPromise from '@payload-config'
import type { User } from '@payload-types'
import { TCreateUser } from '@/lib/types'

export async function getUser(email: string): Promise<User | null> {
	const payload: Payload = await getPayload({ config: await configPromise })
	const user = await payload.find({
		collection: 'users',
		where: {
			email: {
				equals: email,
			},
		},
	})
	return user.docs[0] || null
}

export async function createUser(data: TCreateUser) {
	const payload: Payload = await getPayload({ config: await configPromise })
	const user = await payload.create({
		collection: 'users',
		data: {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
			roles: ['user'],
		},
	})
	return user
}
