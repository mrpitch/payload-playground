import { QuoteBlock as TQuoteBlock } from '@/payload/payload-types'

export const QuoteBlock: React.FC<TQuoteBlock> = ({ quoteHeader, quoteText }) => (
	<blockquote className="border-primary my-8 border-l-4 pl-4">
		<h3 className="text-xl font-bold">{quoteHeader}</h3>
		{quoteText && <p className="mt-2 text-gray-600">{quoteText}</p>}
	</blockquote>
)
