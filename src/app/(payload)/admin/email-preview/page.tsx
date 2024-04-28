import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { render } from '@react-email/render'
import { Button, Hr, Html, Text } from '@react-email/components'

import { Button as UIButton } from '@/components/ui/button'

const MyTemplate = async () => {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.findByID({
    collection: 'newsletter',
    id: '4',
  })
  console.log(data)
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* <Html lang="en"> */}
      <div>
        <Text>{data?.title}</Text>
        <Hr />
        <Button href="https://example.com">Click me</Button>
      </div>
      {/* </Html> */}
    </>
  )
}

// const html = render(<MyTemplate />, {
//   pretty: true,
// })

const EmailPreview = () => {
  return (
    <>
      <div>
        <MyTemplate />
      </div>
      <div>
        <h1>Preview Email</h1>
        <UIButton>Click me now</UIButton>
      </div>
    </>
  )
}

export default EmailPreview
