'use client'
import React from 'react'
import { Reorder } from 'framer-motion'

import { TItem, useDraggableStore } from '@/lib/store/draggable-store'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icons'
import { Typography } from '@/components/ui/typography'

interface IDraggableProps {
	initialItems: TItem[]
	elem: React.ReactNode
}

const Draggable: React.FC<IDraggableProps> = ({ initialItems, elem }) => {
	const { items, setItems, addItem, deleteItem } = useDraggableStore()
	React.useEffect(() => {
		setItems(initialItems)
	}, [setItems, initialItems])

	return (
		<>
			<div className="flex justify-between">
				<Button
					size="icon"
					variant="ghost"
					onClick={() => addItem(new Date().getTime())}
				>
					<Icon iconName="plus" />
				</Button>
			</div>
			<Reorder.Group axis="y" values={items} onReorder={setItems} as="div">
				{items.map((item) => (
					<Reorder.Item key={item.id} value={item} as="div">
						<div className="flex items-center justify-between">
							<Typography
								as="h4"
								size="lg"
							>{`Id: ${item.id}, body: ${item.body}`}</Typography>
							{elem}
							<Button
								size="icon"
								variant="ghost"
								onClick={() => deleteItem(item.id)}
							>
								<Icon iconName="trash" />
							</Button>
						</div>
					</Reorder.Item>
				))}
			</Reorder.Group>
		</>
	)
}

export { Draggable }
