import { QuoteBlock as TQuoteBlock } from '@/payload/payload-types'

import { Container } from '@/components/ui/custom/container'

const QuoteBlock: React.FC<TQuoteBlock> = ({ quoteHeader, quoteText }) => (
	<Container as="section">
		<blockquote className="my-8 border-l-4 border-primary pl-4">
			<h3 className="text-xl font-bold">{quoteHeader}</h3>
			{quoteText && <p className="mt-2 text-gray-600">{quoteText}</p>}
		</blockquote>
	</Container>
)

export default QuoteBlock
