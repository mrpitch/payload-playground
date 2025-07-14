interface TOrderCellProps {
	cellData?: number | null
}
const OrderCell = ({ cellData }: TOrderCellProps) => {
	return <div className="text-center font-mono text-sm">{cellData ?? '–'}</div>
}

export default OrderCell
