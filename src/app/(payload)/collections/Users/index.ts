import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import adminsAndUser from './access/admins-and-users'
import { checkRole } from './check-roles'
import { ensureFirstUserIsAdmin } from './hooks/ensure-first-user-is-admin'

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  auth: true,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'roles',
          type: 'select',
          hasMany: true,
          defaultValue: ['user'],
          options: [
            {
              label: 'admin',
              value: 'admin',
            },
            {
              label: 'user',
              value: 'user',
            },
          ],
          hooks: {
            beforeChange: [ensureFirstUserIsAdmin],
          },
          access: {
            read: admins,
            create: admins,
            update: admins,
          },
        },
      ],
    },
  ],
  timestamps: true,
}

export default Users
