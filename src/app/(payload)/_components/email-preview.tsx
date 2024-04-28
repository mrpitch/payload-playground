'use client'
import { render } from '@react-email/render'

import { Button } from '@/components/ui/button'

export const GetEmailSourceCode = ({ emailSrc }: any) => {
  const html = render(emailSrc, {
    pretty: true,
  })
  //console.log(html)
  //return <div>Hello world</div>
  return <Button onClick={() => console.log(html)}>Get Email Source Code</Button>
}
