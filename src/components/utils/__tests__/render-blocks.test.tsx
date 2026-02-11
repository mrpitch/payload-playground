import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

// Mock all block components
vi.mock('@/components/layout/blog-teaser-block', () => ({
	default: () => <div data-testid="blog-teaser">BlogTeaser</div>,
}))
vi.mock('@/components/layout/copy-block', () => ({
	default: () => <div data-testid="copy-block">CopyBlock</div>,
}))
vi.mock('@/components/layout/docs-teaser-block', () => ({
	default: () => <div data-testid="docs-teaser">DocsTeaser</div>,
}))
vi.mock('@/components/layout/image-text', () => ({
	default: () => <div data-testid="image-text">ImageText</div>,
}))
vi.mock('@/components/layout/quote-block', () => ({
	default: () => <div data-testid="quote-block">QuoteBlock</div>,
}))
vi.mock('@/components/layout/stage', () => ({
	default: () => <div data-testid="stage">Stage</div>,
}))

import { RenderBlocks } from '../render-blocks'

describe('RenderBlocks', () => {
	it('returns null for empty blocks', () => {
		const { container } = render(<RenderBlocks blocks={[]} />)
		expect(container.innerHTML).toBe('')
	})

	it('returns null for undefined blocks', () => {
		const { container } = render(<RenderBlocks blocks={undefined as any} />)
		expect(container.innerHTML).toBe('')
	})

	it('renders correct block type', () => {
		render(<RenderBlocks blocks={[{ blockType: 'copy' } as any]} />)
		expect(screen.getByTestId('copy-block')).toBeInTheDocument()
	})

	it('renders stage block', () => {
		render(<RenderBlocks blocks={[{ blockType: 'stage' } as any]} />)
		expect(screen.getByTestId('stage')).toBeInTheDocument()
	})

	it('handles unknown block types gracefully', () => {
		const { container } = render(<RenderBlocks blocks={[{ blockType: 'nonexistent' } as any]} />)
		expect(container.querySelectorAll('[data-testid]')).toHaveLength(0)
	})

	it('renders multiple blocks', () => {
		render(<RenderBlocks blocks={[{ blockType: 'copy' } as any, { blockType: 'quote' } as any]} />)
		expect(screen.getByTestId('copy-block')).toBeInTheDocument()
		expect(screen.getByTestId('quote-block')).toBeInTheDocument()
	})
})
