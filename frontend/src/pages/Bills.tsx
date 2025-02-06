import { Card, HeaderPreset1 } from "../styled-components";
import { useAppDispatch, useAppSelector } from "../components/hooks/hooks";
import useBillStats from "../components/hooks/useBillStats";
import BillsIcon from '../assets/images/icon-recurring-bills.svg?react'
import BillItem from "../components/bills/BillItem";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { createTransaction } from "../reducers/transactionReducer";
import { SortBy, TransactionWithoutId } from "../types";
import Dropdown from "../components/Dropdown";
import SearchBox from "../components/SearchBox";
import { getAuthHeader } from "../utils";

const Bills = () => {
    const { loadingStatus } = useAppSelector((state) => state.transactions)
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Oldest)
    const [query, setQuery] = useState<string>('')
    const { userToken } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const {
        paidBills, 
        upcomingBills, 
        dueSoonBills, 
        bills, 
        totalPaidBills, 
        totalUpcomingBills, 
        totalDueSoonBills, 
    } = useBillStats()

    const sortedBills = useMemo(() => 
        [...bills].sort((a, b) => {
            let result
            const firstDate = DateTime.fromISO(a.date)
            const secondDate = DateTime.fromISO(b.date)

            switch(sortBy) {
                case SortBy.Oldest:
                    result = firstDate.get('day') - secondDate.get('day')
                    break
                case SortBy.Latest:
                    result =  secondDate.get('day') - firstDate.get('day')
                    break
                case SortBy.AtoZ:
                    result = a.name.localeCompare(b.name)
                    break
                case SortBy.ZtoA:
                    result = b.name.localeCompare(a.name)
                    break
                case SortBy.Highest:
                    result = a.amount - b.amount
                    break
                case SortBy.Lowest:
                    result = b.amount - a.amount
                    break
            }
            return result;
        }).filter(bill => {
            if (query.length > 2) {
                return bill.name.toLowerCase().includes(query.toLocaleLowerCase())
            }
            return true
        })
    , [bills, query, sortBy]);

    const handlePayBill = (name: string) => {
        const billToPay = bills.find(b => b.name == name)
        if (billToPay && userToken) {
            const config = getAuthHeader(userToken)
            const newTransaction: TransactionWithoutId = {
                name: billToPay.name,
                recurring: billToPay.recurring,
                category: billToPay.category,
                amount: billToPay.amount,
                date: DateTime.now().toISO()
            }

            dispatch(createTransaction({
                newTransaction,
                config
            }))
        }
    }

    return (
      <>
        <div className="flex justify-between items-center mb-4">
            <HeaderPreset1>Recurring Bills</HeaderPreset1>
        </div>
        {loadingStatus.initializeTransactions == 'pending' ?
            <div className="m-auto mt-10">
                <l-dot-wave
                size="47"
                speed="1"
                color="black"
                ></l-dot-wave>
            </div>
        :
        <div className="flex gap-6 lg:flex-row flex-col">
            <div className="flex-1 flex flex-col lg:max-w-[400px] gap-6">
                <Card $secondary>
                    <BillsIcon className="mb-7"/>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[14px]">Total Bills</h3>
                        <HeaderPreset1>${Math.abs(bills.reduce((sum, curr) => sum + curr.amount, 0)).toFixed(2)}</HeaderPreset1>
                    </div>
                </Card>
                <Card>
                    <h3 className="font-bold">Summary</h3>
                    <div>
                        <div className="p-2 py-4 flex justify-between border-b">
                            <p>Paid Bills</p>
                            <span className="font-bold text-sm">{paidBills.length} (${Math.abs(totalPaidBills).toFixed(2)})</span>
                        </div>
                        <div className="p-2 py-4 flex justify-between border-b">
                            <p>Total Upcoming</p>
                            <span className="font-bold text-sm">{upcomingBills.length} (${Math.abs(totalUpcomingBills).toFixed(2)})</span>
                        </div>
                        <div className="p-2 py-4 pb-2 flex justify-between text-red">
                            <p className="text-red">Due Soon</p>
                            <span className="font-bold text-sm">{dueSoonBills.length} (${Math.abs(totalDueSoonBills).toFixed(2)})</span>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="flex-1">
                <Card>
                    <div className="mb-4 flex justify-between items-center gap-4">
                        <SearchBox value={query} setValue={(e) => setQuery(e.currentTarget.value)}/>
                        <Dropdown options={Object.values(SortBy)} value={sortBy} setValue={(value) => setSortBy(value as SortBy)} />
                    </div>
                    <div className="flex p-2">
                        <p className="flex-[3] max-w-[420px]">Bill Title</p>
                        <p className="flex-1">Due Date</p>
                        <p className="flex-1 text-right">Amount</p>
                    </div>
                    <div>
                        {sortedBills.map(bill => <BillItem
                            key={bill.id}
                            name={bill.name}
                            amount={bill.amount}
                            dueDate={DateTime.fromISO(bill.date).get('day')}
                            isPaid={paidBills.map(b => b.name).includes(bill.name)}
                            isDueSoon={dueSoonBills.map(b => b.name).includes(bill.name)}
                            handlePayBill={handlePayBill}
                            />
                        )}
                    </div>
                </Card>
            </div>
        </div>
        }
        
      </>
    )
  }
  
  export default Bills