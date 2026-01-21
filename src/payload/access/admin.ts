import type { Access } from 'payload'

import type { User } from '@payload-types'
import { checkRole } from '@/payload/content-model/shared/hooks/check-role'

export const admin: Access = ({ req: { user } }) => checkRole(['admin'], user as User)
