interface OverviewCategoryTagProps {
  name: string;
  amount: string;
  color: string;
}

const OverviewCategoryTag = ({name, amount, color} : OverviewCategoryTagProps) => {
  return (
    <div className={`${color} border-l-4 rounded-sm pl-4 h-[49px]`}>
      <p className="mb-1">{name}</p>
      <span className="font-bold">{amount}</span>
    </div>
  )
}

export default OverviewCategoryTag;