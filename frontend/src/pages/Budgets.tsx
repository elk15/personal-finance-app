import { useState } from "react";
import { Card, HeaderPreset1, HeaderPreset2, PrimaryButton } from "../styled-components";
import { useAppSelector } from "../components/hooks/hooks";
import BudgetCard from "../components/budgets/BudgetCard";
import { TransactionCategory } from "../types";
import BudgetChart from "../components/BudgetChart";
import COLORS from "../statics/colours";
import SpendingSummaryItem from "../components/budgets/SpendingSummaryItem";
import BudgetForm from "../components/budgets/BudgetForm";

const Budgets = () => {
    const { data, loadingStatus } = useAppSelector((state) => state.budgets)
    const { loadingStatus: transactionLoadingStatus, data: transactions } = useAppSelector((state) => state.transactions)
    const [showAddNew, setShowAddNew] = useState<boolean>(false);

    const categoryColors: string[] = []
    let totalLimit = 0
    let totalExpenses = 0
    let expensesPerCategory: {name: TransactionCategory, value: number}[] = []
    const limits: number[] = []

    if (loadingStatus.initializeBudgets == 'succeeded' && transactionLoadingStatus.initializeTransactions == 'succeeded') {
        const categoriesUsed = data.map(budget => budget.category)
        categoriesUsed.forEach(category => {
            const expenses = transactions.reduce((sum, curr) => {
                if (curr.category == category && curr.amount < 0) {
                    return sum + curr.amount
                }
                return sum
            }, 0)
            expensesPerCategory.push({
                name: category,
                value: Math.round(Math.abs(expenses))
            })
        })
    
        expensesPerCategory = expensesPerCategory.sort((a, b) => b.value - a.value).slice(0, 4)
        expensesPerCategory.forEach((item) => {
            const budget = data.find(d => d.category == item.name)
            if (budget?.theme) categoryColors.push(COLORS[budget.theme])
            totalExpenses += item.value
            totalLimit += budget?.maxAmount || 0
            limits.push(budget?.maxAmount || 0)
        })
    }

    return (
      <>
        <div className="flex justify-between items-center mb-4">
            <HeaderPreset1>Budgets</HeaderPreset1>
            <PrimaryButton onClick={() => setShowAddNew(true)}>+ Add New Budget</PrimaryButton>
        </div>
        {(loadingStatus.initializeBudgets == 'pending' && transactionLoadingStatus.initializeTransactions == 'pending') ?
            <div className="m-auto mt-10">
                <l-dot-wave
                size="47"
                speed="1"
                color="black"
                ></l-dot-wave>
            </div>
            :
            <div className="flex gap-5 lg:flex-row flex-col">
                <Card className="flex-1 lg:max-w-[450px] h-[580px] basis-auto" $gap="28px">
                    <BudgetChart 
                    data={expensesPerCategory} 
                    colors={categoryColors} 
                    limit={totalLimit}
                    totalExpenses={totalExpenses}
                    />
                    <div>
                        <HeaderPreset2>Spending Summary</HeaderPreset2>
                        <div className="flex flex-col mt-2">
                            {expensesPerCategory.map((item, index) => {
                                return <SpendingSummaryItem key={item.name} category={item.name} color={categoryColors[index]} max={limits[index]} spent={item.value} />
                            })}
                        </div>
                    </div>
                </Card>
                <div className="flex flex-1 flex-col gap-4 min-w-[360px]">
                    {data.map(budget => <BudgetCard key={budget.id} category={budget.category} maxAmount={budget.maxAmount} theme={budget.theme} id={budget.id}/>)}
                </div>
            </div>
        }
        {showAddNew &&
          <BudgetForm isAddNew={true} setShowModal={setShowAddNew}/>
        }
      </>
    )
  }
  
  export default Budgets