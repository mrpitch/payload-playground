import * as React from 'react'
import { Button, Hr, Html, Text } from '@react-email/components'

import { render } from '@react-email/render'

export function MyTemplate() {
  return (
    <Html lang="en">
      <Text>Some title</Text>
      <Hr />
      <Button href="https://example.com">Click me</Button>
    </Html>
  )
}

export default MyTemplate

const html = render(<MyTemplate />, {
  pretty: true,
})

console.log(html)
