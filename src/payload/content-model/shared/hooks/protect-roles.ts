import type { FieldHook } from 'payload'

import type { User } from '@payload-types'

type Role = NonNullable<User['roles']>[number]
type MaybePartialUser = Partial<User> | null | undefined

const ensureRolesArray = (roles: User['roles']): Role[] => {
	if (!Array.isArray(roles)) return []
	return roles.filter((role): role is Role => typeof role === 'string')
}

const currentReqUser = (reqUser: unknown): MaybePartialUser => {
	if (reqUser && typeof reqUser === 'object') {
		return reqUser as MaybePartialUser
	}
	return undefined
}

// ensure there is always a `user` role
// do not let non-admins change roles
export const protectRoles: FieldHook<User, Role[]> = ({ data, req, value }) => {
	const reqUser = currentReqUser(req.user)
	const isAdmin =
		(reqUser?.roles?.includes('admin') ?? false) || data?.email === 'hurdi@gurdi.de' // seed account

	if (!isAdmin) {
		return ['user']
	}

	const sourceRoles: User['roles'] =
		Array.isArray(data?.roles) ? data.roles : (Array.isArray(value) ? value : [])

	const existingRoles = ensureRolesArray(sourceRoles)
	const userRoles = new Set<Role>(existingRoles)
	userRoles.add('user')
	return [...userRoles]
}
