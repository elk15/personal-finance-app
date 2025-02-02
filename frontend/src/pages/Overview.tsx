import SeeMoreButton from "../components/SeeMoreButton"
import { Card, HeaderPreset1, HeaderPreset2 } from "../styled-components"
import TipJar from '../assets/images/ph_tip-jar-light.svg?react'
import OverviewCategoryTag from "../components/overview/OverviewCategoryTag"
import { ResponsiveContainer, PieChart, Pie, Cell, Label} from "recharts"
import COLORS from "../statics/colours"
import OverviewBillsItem from "../components/overview/OverviewBillsItem"
import OverviewTransactionItem from "../components/overview/OverviewTransactionItem"

const Overview = () => {
    const data = [
        { name: 'Entertainment', value: 50 },
        { name: 'Bills', value: 750 },
        { name: 'Dining Out', value: 75 },
        { name: 'Personal Care', value: 100 },
    ].sort((a, b) => b.value - a.value);
    
    const pieColors = [COLORS.red, COLORS["army-green"], COLORS.orange, COLORS.blue];  

    return (
        <>
        <HeaderPreset1 className="mb-4">Overview</HeaderPreset1>
        <section className="flex w-full gap-6 md:flex-row flex-col">
            <Card $secondary>
            <h3 className="text-[14px]">Current Balance</h3>
            <HeaderPreset1>$4,836.00</HeaderPreset1>
            </Card>
            <Card>
            <h3 className="text">Income</h3>
            <HeaderPreset1>$3,814.25</HeaderPreset1>
            </Card>
            <Card>
            <h3 className="text">Expenses</h3>
            <HeaderPreset1>$1,700.50</HeaderPreset1>
            </Card>
        </section>
        <section className="flex gap-5 lg:flex-row flex-col">
            <div className="flex flex-col flex-1 gap-5">
            <Card>
                <div className="flex justify-between items-center mb-2">
                <HeaderPreset2>Pots</HeaderPreset2>
                <SeeMoreButton toPage={""}/>
                </div>
                <div className="flex items-center gap-5">
                <div className="bg-beige-100 p-4 rounded-lg flex items-center gap-4 w-full max-w-[250px]">
                    <TipJar />
                    <div>
                    <p className="mb-2">Total Saved</p>
                    <HeaderPreset1>$850</HeaderPreset1>
                    </div>
                </div>
                <div className="flex flex-wrap gap-6 w-full h-full">
                    <OverviewCategoryTag color="border-green" name="Savings" amount="$159"/>
                    <OverviewCategoryTag color="border-red" name="Concert Ticket" amount="$101"/>
                    <OverviewCategoryTag color="border-purple" name="Laptop" amount="$939"/>
                    <OverviewCategoryTag color="border-army-green" name="Trip" amount="$2439"/>
                </div>
                </div>
            </Card>
            <Card>
                <div className="flex justify-between items-center mb-2">
                <HeaderPreset2>Transactions</HeaderPreset2>
                <SeeMoreButton text="View All" toPage={""}/>
                </div>
                <div >
                <OverviewTransactionItem name="Emma Richardson" amount="75.50" date="19 Aug 2024" isIncome={true}/>
                <OverviewTransactionItem name="Lunch" amount="12.30" date="15 Aug 2024"/>
                </div>
            </Card>
            </div>
            <div className="flex flex-col flex-1 gap-5">
            <Card>
                <div className="flex justify-between items-center mb-2">
                <HeaderPreset2>Budgets</HeaderPreset2>
                <SeeMoreButton toPage={""}/>
                </div>
                <div className="h-[250px] flex">
                    <ResponsiveContainer className={'flex-[2_2_0%]'} width="99%" height="99%">
                        <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            innerRadius="70%" outerRadius="100%"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} style={{outline: 'none'}}/>
                            ))}
                            <Label position="centerBottom" className="total-expenses" value="$338" fontSize="32px"/>
                            <Label position="centerTop" className="expenses-limit" value="of $975 limit"/>
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col flex-1 gap-4  h-full">
                        <OverviewCategoryTag color="border-green" name="Entertainment" amount="$50"/>
                        <OverviewCategoryTag color="border-red" name="Bills" amount="$750"/>
                        <OverviewCategoryTag color="border-purple" name="Dining Out" amount="$75"/>
                        <OverviewCategoryTag color="border-army-green" name="Personal Care" amount="$100"/>
                    </div>
                </div>
            </Card>
            <Card>
                <div className="flex justify-between items-center mb-2">
                <HeaderPreset2>Recurring Bills</HeaderPreset2>
                <SeeMoreButton toPage={""}/>
                </div>
                <div className="flex flex-col gap-3">
                <OverviewBillsItem text="Paid Bills" amount="$190.00" color="border-green"/>
                <OverviewBillsItem text="Total Upcoming" amount="$194.98" color="border-yellow"/>
                <OverviewBillsItem text="Due Soon" amount="$59.98" color="border-cyan"/>
                </div>
            </Card>
            </div>
        </section>
        </>
    )
  }
  
  export default Overview;