import { Access, FieldAccess } from 'payload'
import { User } from '@payload-types'

export const isAdmin: Access = ({ req }) => {
  const user = req.user as User | null
  return Boolean(user?.roles?.includes('admin'))
}

export const isAdminFieldLevel: FieldAccess = ({ req }) => {
  const user = req.user as User | null
  return Boolean(user?.roles?.includes('admin'))
}
