interface OverviewBillsItemProps {
    text: string;
    amount: string;
    color: string;
}

const OverviewBillsItem = ({text, amount, color} : OverviewBillsItemProps) => {
  return (
    <div className={`bg-beige-100 border-l-4 rounded-lg ${color} flex justify-between p-4`}>
        <p>{text}</p>
        <span className="font-bold">{amount}</span>
    </div>
  )
}

export default OverviewBillsItem;