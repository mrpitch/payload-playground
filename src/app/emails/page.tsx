import { render } from '@react-email/render'
import { Button, Hr, Html, Text } from '@react-email/components'

function MyTemplate() {
  return (
    <Html lang="en">
      <Text>Some title</Text>
      <Hr />
      <Button href="https://example.com">Click me</Button>
    </Html>
  )
}

const html = render(<MyTemplate />, {
  pretty: true,
})

const EmailPreview = () => {
  return (
    <>
      <div>
        <MyTemplate />
      </div>
      <div>
        <h1>Preview Email</h1>
        <pre>{html}</pre>
      </div>
    </>
  )
}

export default EmailPreview
