import { Payload } from 'payload'
export const seed = async (payload: Payload): Promise<void> => {
  // Create sites
  const site1 = await payload.create({
    collection: 'sites',
    data: {
      name: 'Hurdi Site',
      domain: 'hurdigurdi.com',
    },
  })

  const site2 = await payload.create({
    collection: 'sites',
    data: {
      name: 'Site1',
      domain: 'site1.hurdigurdi.com',
    },
  })

  // Create admin user
  await payload.create({
    collection: 'users',
    data: {
      email: 'hurdi@gurdi.de',
      password: 'Test1234',
      firstName: 'Hurid',
      lastName: 'Gurdi',
      roles: ['admin'],
    },
  })

  // Create editor user with access to site1 only
  await payload.create({
    collection: 'users',
    data: {
      email: 'site1@hurdi.de',
      password: 'Test1234',
      firstName: 'Site1',
      lastName: 'Hurdi',
      roles: ['editor'],
      sites: [site1.id],
    },
  })

  // Create pages for each site
  await payload.create({
    collection: 'pages',
    data: {
      _status: 'published',
      title: 'Welcome to Hurdi',
      slug: 'welcome-hurdi',
      layout: [
        {
          blockType: 'Quote',
          quoteHeader: 'Welcome to Hurdi Site',
          quoteText:
            'This is the main page of Hurdi site. Only Site1 editor and admin can access this.',
        },
      ],
      site: site1.id,
    },
  })

  await payload.create({
    collection: 'pages',
    data: {
      _status: 'published',
      title: 'Welcome to Gurdi',
      slug: 'welcome-gurdi',
      layout: [
        {
          blockType: 'Quote',
          quoteHeader: 'Welcome to Gurdi Site',
          quoteText: 'This is the main page of Gurdi site. Only admin can access this.',
        },
      ],
      site: site2.id,
    },
  })

  // Create posts for each site
  await payload.create({
    collection: 'posts',
    data: {
      _status: 'published',
      title: 'First Hurdi Post',
      slug: 'first-hurdi-post',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'p',
              children: [
                {
                  text: 'This is the first post on Hurdi site. Only Site1 editor and admin can access this.',
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          version: 1,
        },
      },
      site: site1.id,
    },
  })

  await payload.create({
    collection: 'posts',
    data: {
      _status: 'published',
      title: 'First Gurdi Post',
      slug: 'first-gurdi-post',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'p',
              children: [
                {
                  text: 'This is the first post on Gurdi site. Only admin can access this.',
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          version: 1,
        },
      },
      site: site2.id,
    },
  })

  console.log('Seed completed! 🌱')
}
