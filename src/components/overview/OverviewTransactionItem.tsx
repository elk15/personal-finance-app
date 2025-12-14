import { formatDate } from "../../utils";

interface OverviewTransactionItemProps {
    name: string;
    amount: number;
    date: string;
}

const OverviewTransactionItem = ({name, amount, date} : OverviewTransactionItemProps) => {
  const isIncome = amount > 0
  return (
    <div className="flex justify-between p-4 items-center border-b-2 border-grey-100 overviewTransactionItem">
        <span className="font-bold max-w-[130px] sm:max-w-none">{name}</span>
        <div className="flex flex-col gap-2 items-end">
        <span className={`font-bold ${isIncome && 'text-green'}`}>{isIncome ? '+' : '-'}${Math.abs(amount)}</span>
        <p>{formatDate(date)}</p>
        </div>
    </div>
  )
}

export default OverviewTransactionItem;