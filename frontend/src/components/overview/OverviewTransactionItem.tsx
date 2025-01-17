interface OverviewTransactionItemProps {
    name: string;
    amount: string;
    date: string;
    isIncome?: boolean;
}

const OverviewTransactionItem = ({name, amount, date, isIncome} : OverviewTransactionItemProps) => {
  return (
    <div className="flex justify-between p-4 items-center border-b-2 border-grey-100 overviewTransactionItem">
        <span className="font-bold">{name}</span>
        <div className="flex flex-col gap-2 items-end">
        <span className={`font-bold ${isIncome && 'text-green'}`}>{isIncome ? '+' : '-'}${amount}</span>
        <p>{date}</p>
        </div>
    </div>
  )
}

export default OverviewTransactionItem;