import { useAppSelector } from "./hooks";
import { TransactionCategory } from "../../types";
import COLORS from "../../statics/colours";

const useBudgetStats = () => {
    const { data: transactions, loadingStatus: transactionLoadingStatus } = useAppSelector((state) => state.transactions)
    const { data, loadingStatus } = useAppSelector((state) => state.budgets)

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
            totalLimit += budget?.max_amount || 0
            limits.push(budget?.max_amount || 0)
        })
    }

  return {categoryColors, totalLimit, totalExpenses, expensesPerCategory, limits};
};

export default useBudgetStats;