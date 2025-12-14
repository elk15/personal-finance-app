interface OverviewCategoryTagProps {
  name: string;
  amount: number;
  color: string;
}

const OverviewCategoryTag = ({name, amount, color} : OverviewCategoryTagProps) => {
  const themeStyle = {borderColor: color}
  return (
    <div style={themeStyle} className={`border-l-4 rounded-sm pl-4 h-[49px] max-w-[120px] w-full`}>
      <p className="mb-1">{name}</p>
      <span className="font-bold">${amount}</span>
    </div>
  )
}

export default OverviewCategoryTag;