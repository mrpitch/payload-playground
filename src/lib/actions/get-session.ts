'use server'
import configPromise from '@payload-config'
import type { User } from '@payload-types'
import { headers as getHeaders } from 'next/headers'
import { getPayload, Payload } from 'payload'

export async function getSession(): Promise<User | null> {
	const headers = await getHeaders()
	const payload: Payload = await getPayload({ config: await configPromise })
	const { user } = await payload.auth({ headers })
	return user || null
}
