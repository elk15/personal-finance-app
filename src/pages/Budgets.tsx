import { useState } from "react";
import { Card, HeaderPreset1, HeaderPreset2, PrimaryButton } from "../styled-components";
import { useAppSelector } from "../components/hooks/hooks";
import BudgetCard from "../components/budgets/BudgetCard";
import BudgetChart from "../components/BudgetChart";
import SpendingSummaryItem from "../components/budgets/SpendingSummaryItem";
import BudgetForm from "../components/budgets/BudgetForm";
import useBudgetStats from "../components/hooks/useBudgetStats";

const Budgets = () => {
    const { data, loadingStatus } = useAppSelector((state) => state.budgets)
    const { loadingStatus: transactionLoadingStatus } = useAppSelector((state) => state.transactions)
    const [showAddNew, setShowAddNew] = useState<boolean>(false)
    const {categoryColors, totalLimit, totalExpenses, expensesPerCategory, limits} = useBudgetStats()

    return (
      <>
        <div className="flex justify-between items-center mb-4">
            <HeaderPreset1>Budgets</HeaderPreset1>
            <PrimaryButton onClick={() => setShowAddNew(true)}>Add Budget</PrimaryButton>
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
                {totalExpenses > 0 &&
                <Card className="flex-1 lg:max-w-[450px] h-[580px] basis-auto" $gap="28px">
                    <BudgetChart 
                    data={expensesPerCategory} 
                    colors={categoryColors} 
                    limit={totalLimit}
                    totalExpenses={totalExpenses}
                    height="50%"
                    />
                    <div>
                        <HeaderPreset2>Spending Summary</HeaderPreset2>
                        <div className="flex flex-col mt-2">
                            {expensesPerCategory.map((item, index) => {
                                return <SpendingSummaryItem key={item.name} category={item.name} color={categoryColors[index]} max={limits[index]} spent={item.value} />
                            })}
                        </div>
                    </div>
                </Card>}
                <div className="flex flex-1 flex-col gap-4">
                    {data.map(budget => <BudgetCard key={budget.id} category={budget.category} max_amount={budget.max_amount} theme={budget.theme} id={budget.id}/>)}
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