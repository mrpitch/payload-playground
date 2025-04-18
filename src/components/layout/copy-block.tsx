import { CopyBlock as TCopyBlock } from '@payload-types'

import { cn } from '@/lib/utils/cn'
import { RichText } from '@/components/utils/richtext'
import { Container } from '@/components/ui/custom/container'

import { proseTypography, Typography } from '@/components/ui/custom/typography'

const CopyBlock: React.FC<TCopyBlock> = ({ headline, copy, showHeadline }) => (
	<Container as="section" className="max-w-5xl 2xl:max-w-5xl">
		{showHeadline ? <Typography as="h2">{headline}</Typography> : null}
		<div className={cn(proseTypography, 'mt-2')}>{copy ? <RichText data={copy} /> : null}</div>
	</Container>
)

export default CopyBlock
