import { CopyBlock as TCopyBlock } from '@payload-types'

import { RichText } from '@/components/utils/richtext'
import { Container } from '@/components/ui/custom/container'

import { Typography } from '@/components/ui/custom/typography'

const CopyBlock: React.FC<TCopyBlock> = ({ headline, copy, showHeadline }) => (
	<Container as="section" className="max-w-5xl 2xl:max-w-5xl">
		{showHeadline ? <Typography as="h2">{headline}</Typography> : null}
		{copy ? <RichText data={copy} /> : null}
	</Container>
)

export default CopyBlock
