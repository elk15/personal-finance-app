import { TransactionCategory } from "../../types";

interface SpendingSummaryItemProps {
    category: TransactionCategory;
    color: string;
    max: number;
    spent: number;
}

const SpendingSummaryItem = ({category, color, max, spent} : SpendingSummaryItemProps) => {
    const borderColor = {
        borderLeftColor: color
    }
  return (
    <div className="w-full flex justify-between items-center p-2 border-b border-beige-100 py-4 last:border-b-0">
        <p className="border-l-4 px-3" style={borderColor}>{category}</p>
        <div className="gap-2 flex">
            <span className="font-bold">${Math.abs(spent).toFixed(2)}</span>
            <p>of ${max.toFixed(2)}</p>
        </div>
    </div>
  )
}

export default SpendingSummaryItem;