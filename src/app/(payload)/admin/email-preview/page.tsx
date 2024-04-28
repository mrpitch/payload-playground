import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { GetEmailSourceCode } from '@/payload/_components/email-preview'
import { Button, Hr, Html, Text } from '@react-email/components'

export const EmailTemplate = async ({ data, preview }: any) => {
  return (
    <>
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

const EmailPreview = async () => {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.findByID({
    collection: 'newsletter',
    id: '4',
  })
  console.log(<EmailTemplate data={data} />)
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <EmailTemplate data={data} />
      <GetEmailSourceCode emailSrc={<EmailTemplate data={data} />} />
    </>
  )
}

export default EmailPreview
