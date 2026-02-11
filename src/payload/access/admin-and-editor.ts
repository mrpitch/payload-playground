import type { User } from '@payload-types'
import type { Access } from 'payload'

import { checkRole } from '@/payload/content-model/shared/hooks/check-role'

export const adminAndEditor: Access = ({ req: { user } }) => {
	if (user) {
		if (checkRole(['admin', 'editor'], user as User)) {
			return true
		}

		return {
			id: {
				equals: user.id,
			},
		}
	}

	return false
}
