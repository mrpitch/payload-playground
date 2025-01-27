import { Access } from 'payload'
import { User } from '@payload-types'

export const isAdminOrHasSiteAccess =
  (siteIDFieldName: string = 'site'): Access =>
  ({ req: { user } }) => {
    // Need to be logged in
    const typedUser = user as User | null
    if (typedUser?.roles) {
      // If user has role of 'admin'
      if (typedUser.roles.includes('admin')) return true

      // If user has role of 'editor' and has access to a site
      // return a query constraint to restrict the documents this user can edit
      const userSites = typedUser.sites || []
      if (typedUser.roles.includes('editor') && userSites.length > 0) {
        console.log('userSites', userSites)
        console.log('siteIDFieldName', siteIDFieldName)
        return {
          or: [
            {
              [siteIDFieldName]: {
                in: userSites,
              },
            },
            {
              [siteIDFieldName]: {
                exists: false,
              },
            },
          ],
        }
      }
    }

    // Reject everyone else
    return false
  }
