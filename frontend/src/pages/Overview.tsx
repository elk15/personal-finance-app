import SeeMoreButton from "../components/SeeMoreButton"
import { Card, HeaderPreset1, HeaderPreset2 } from "../styled-components"
import TipJar from '../assets/images/ph_tip-jar-light.svg?react'
import OverviewCategoryTag from "../components/overview/OverviewCategoryTag"
import OverviewBillsItem from "../components/overview/OverviewBillsItem"
import OverviewTransactionItem from "../components/overview/OverviewTransactionItem"
import useBudgetStats from "../components/hooks/useBudgetStats"
import BudgetChart from "../components/BudgetChart"
import { useAppSelector } from "../components/hooks/hooks"
import COLORS from "../statics/colours"
import { Pot, Transaction } from "../types"
import { sortTransactions } from "../utils"
import FeatherIcon from '../assets/images/feather-pointed-solid.svg?react'
import { useState } from "react"
import UpdateBalaceForm from "../components/overview/UpdateBalanceForm"
import useBillStats from "../components/hooks/useBillStats"

const Overview = () => {
    const {categoryColors, totalLimit, totalExpenses, expensesPerCategory} = useBudgetStats()
    const {totalPaidBills, totalUpcomingBills, totalDueSoonBills} = useBillStats()
    const { loadingStatus: budgetStatus } = useAppSelector((state) => state.budgets)
    const { loadingStatus: potStatus, data: pots } = useAppSelector((state) => state.pots)
    const { loadingStatus: transactionStatus, data: transactions } = useAppSelector((state) => state.transactions)
    const { balance } = useAppSelector((state) => state.user)
    const [showUpdateBalanceModal, setShowUpdateBalanceModal] = useState<boolean>(false)

    let totalSaved = 0
    let sortedPots: Pot[] = []
    let sortedTransactions: Transaction[] = []
    let expenses = 0
    let income = 0

    if (potStatus.initializePots == 'succeeded') {
        sortedPots = [...pots].sort((a, b) => b.totalSaved - a.totalSaved).slice(0, 4)
        totalSaved = sortedPots.reduce((sum, curr) => sum + curr.totalSaved, 0)
    }
    if (transactionStatus.initializeTransactions == 'succeeded') {
        sortedTransactions = sortTransactions([...transactions])
        expenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, curr) => sum + curr.amount, 0))
        income = transactions.filter(t => t.amount > 0).reduce((sum, curr) => sum + curr.amount, 0)
    }

    return (
        <>
        <HeaderPreset1 className="mb-4">Overview</HeaderPreset1>
        <section className="flex w-full gap-6 md:flex-row flex-col">
            <Card $secondary className="relative">
                <h3 className="text-[14px]">Current Balance</h3>
                <HeaderPreset1>${balance.toFixed(2)}</HeaderPreset1>
                <button className="absolute right-6 bottom-9" title="Update Balance" onClick={() => setShowUpdateBalanceModal(true)}>
                    <FeatherIcon className="fill-white w-7 h-7 hover:w-8 hover:h-8"/>
                </button>
            </Card>
            <Card>
                <h3 className="text">Income</h3>
                <HeaderPreset1>${income.toFixed(2)}</HeaderPreset1>
            </Card>
            <Card>
                <h3 className="text">Expenses</h3>
                <HeaderPreset1>${expenses.toFixed(2)}</HeaderPreset1>
            </Card>
        </section>
        <section className="flex gap-5 lg:flex-row flex-col">
            <div className="flex flex-col flex-1 gap-5">
            <Card>
                <div className="flex justify-between items-center mb-2">
                    <HeaderPreset2>Pots</HeaderPreset2>
                    <SeeMoreButton toPage={"/pots"}/>
                </div>
                {potStatus.initializePots == 'pending' ?
                    <div className="m-auto mt-2">
                        <l-dot-wave
                        size="47"
                        speed="1"
                        color="black"
                        ></l-dot-wave>
                    </div>
                    :
                    <div className="flex md:flex-row flex-col items-center gap-6">
                        <div className="bg-beige-100 p-4 rounded-lg flex items-center gap-4 md:w-[350px] w-full">
                            <TipJar />
                            <div>
                            <p className="mb-2">Total Saved</p>
                            <HeaderPreset1>${totalSaved}</HeaderPreset1>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-5 w-full h-full items-center justify-center">
                            {sortedPots.map(pot => <OverviewCategoryTag key={pot.id} color={COLORS[pot.theme]} name={pot.name} amount={pot.totalSaved}/>)}
                        </div>
                    </div>
                }
            </Card>
            <Card>
                <div className="flex justify-between items-center mb-2">
                    <HeaderPreset2>Transactions</HeaderPreset2>
                    <SeeMoreButton text="View All" toPage={"/transactions"}/>
                </div>
                {transactionStatus.initializeTransactions == 'pending' ? 
                    <div className="m-auto mt-2">
                        <l-dot-wave
                        size="47"
                        speed="1"
                        color="black"
                        ></l-dot-wave>
                    </div>
                :
                    <div>
                        {sortedTransactions.slice(0, 5).map(t => <OverviewTransactionItem key={t.id} name={t.name} amount={t.amount} date={t.date}/>)}
                    </div>
                }
            </Card>
            </div>
            <div className="flex flex-col flex-1 gap-5">
            <Card>
                <div className="flex justify-between items-center mb-2">
                <HeaderPreset2>Budgets</HeaderPreset2>
                <SeeMoreButton toPage={"/budgets"}/>
                </div>
                {(budgetStatus.initializeBudgets == 'pending') ?
                <div className="m-auto mt-2">
                    <l-dot-wave
                    size="47"
                    speed="1"
                    color="black"
                    ></l-dot-wave>
                </div>
                :
                <div className="h-[250px] flex">
                    <BudgetChart 
                    data={expensesPerCategory} 
                    colors={categoryColors} 
                    limit={totalLimit}
                    totalExpenses={totalExpenses}
                    />
                    <div className="flex flex-col flex-1 gap-4  h-full">
                        {expensesPerCategory.map((item, index) => {
                            const theme = categoryColors[index]
                            return <OverviewCategoryTag key={item.name} color={theme} name={item.name} amount={item.value}/>
                        })}
                    </div>
                </div>
                }
            </Card>
            <Card>
                <div className="flex justify-between items-center mb-2">
                <HeaderPreset2>Recurring Bills</HeaderPreset2>
                <SeeMoreButton toPage={"/bills"}/>
                </div>
                {transactionStatus.initializeTransactions == 'pending' ? 
                    <div className="m-auto mt-2">
                        <l-dot-wave
                        size="47"
                        speed="1"
                        color="black"
                        ></l-dot-wave>
                    </div>
                : 
                    <div className="flex flex-col gap-3">
                        <OverviewBillsItem text="Paid Bills" amount={`$${Math.abs(totalPaidBills).toFixed(2)}`} color="border-green"/>
                        <OverviewBillsItem text="Total Upcoming" amount={`$${Math.abs(totalUpcomingBills).toFixed(2)}`} color="border-yellow"/>
                        <OverviewBillsItem text="Due Soon" amount={`$${Math.abs(totalDueSoonBills).toFixed(2)}`} color="border-cyan"/>
                    </div>
                }
            </Card>
            </div>
        </section>
        {showUpdateBalanceModal && <UpdateBalaceForm setShowModal={setShowUpdateBalanceModal}/>}
        </>
    )
  }
  
  export default Overview;