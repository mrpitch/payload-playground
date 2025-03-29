import { CopyBlock as TCopyBlock } from '@payload-types'

import { cn } from '@/lib/utils/cn'
import { RichText } from '@/components/utils/richtext'
import { Container } from '@/components/ui/custom/container'

import { proseTypography, Typography } from '@/components/ui/custom/typography'

const CopyBlock: React.FC<TCopyBlock> = ({ headline, copy }) => (
	<Container as="section">
		<Typography as="h2">{headline}</Typography>
		<div className={cn(proseTypography, 'mt-2')}>{copy ? <RichText data={copy} /> : null}</div>
	</Container>
)

export default CopyBlock
