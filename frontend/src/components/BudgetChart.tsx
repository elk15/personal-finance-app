import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

interface BudgetChartProps {
    totalExpenses: number;
    limit: number;
    colors: string[];
    data: {
        name: string;
        value: number;
    }[]
    height?: string;
}

const BudgetChart = ({totalExpenses, limit, colors, data, height="99%"} : BudgetChartProps) => {
  return (
    <ResponsiveContainer width="99%" height={height}>
        <PieChart>
        <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius="70%" outerRadius="100%"
            dataKey="value"
        >
            {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} style={{outline: 'none'}}/>
                ))}
                <Label position="centerBottom" className="total-expenses" value={`$${totalExpenses}`} fontSize="32px"/>
                <Label position="centerTop" className="expenses-limit" value={`of $${limit} limit`}/>
        </Pie>
        </PieChart>
    </ResponsiveContainer>
  )
}

export default BudgetChart;