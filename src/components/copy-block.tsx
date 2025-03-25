import { CopyBlock as TCopyBlock } from '@/payload/payload-types'

import { RichText } from '@/components/utils/richtext'

import { Typography } from '@/components/ui/custom/typography'

export const CopyBlock: React.FC<TCopyBlock> = ({ headline, copy }) => (
	<div className="my-8">
		<Typography as="h2" size="3xl">
			{headline}
		</Typography>
		<div className="mt-2">{copy ? <RichText data={copy} /> : null}</div>
	</div>
)
