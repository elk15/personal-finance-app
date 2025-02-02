import { DateTime } from "luxon";

interface LatestSpendingItemProps {
    name: string;
    date: string;
    cost: number
}

const LatestSpendingItem = ({name, date, cost} : LatestSpendingItemProps) => {
  return (
    <div className="w-full flex justify-between items-center py-3 border-b last:border-b-0">
        <span className="font-bold text-sm">{name}</span>
        <div className="flex flex-col gap-1">
            <span className="font-bold text-sm text-right">-${Math.abs(cost)}</span>
            <p>{DateTime.fromISO(date).toFormat('dd LLL yyyy')}</p>
        </div>
    </div>
  )
}

export default LatestSpendingItem;