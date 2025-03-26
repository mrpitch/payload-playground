import { CopyBlock as TCopyBlock } from '@payload-types'

import { cn } from '@/lib/utils/cn'
import { RichText } from '@/components/utils/richtext'

import { proseTypography, Typography } from '@/components/ui/custom/typography'

export const CopyBlock: React.FC<TCopyBlock> = ({ headline, copy }) => (
	<div className="my-8">
		<Typography as="h2">{headline}</Typography>
		<div className={cn(proseTypography, 'mt-2')}>{copy ? <RichText data={copy} /> : null}</div>
	</div>
)
