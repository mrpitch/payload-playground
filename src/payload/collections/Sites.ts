import { CollectionConfig } from 'payload'
import { isAdmin } from '@/payload/access/isAdmin'
import { isAdminOrHasSiteAccess } from '@/payload/access/isAdminOrHasSiteAccess'

export const Sites: CollectionConfig = {
  slug: 'sites',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'domain'],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  access: {
    // Only admins can create
    create: isAdmin,
    // Only admins or editors with site access can read
    read: isAdminOrHasSiteAccess('id'),
    // Only admins can update
    update: isAdmin,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      required: true,
    },
  ],
  hooks: {},
}
