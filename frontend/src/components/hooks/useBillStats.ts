import { Transaction, TransactionCategory } from "../../types";
import { sortTransactions } from "../../utils";
import { DateTime } from "luxon";
import { useAppSelector } from "./hooks";
const useBillStats = () => {
    const { data: transactions, loadingStatus: transactionStatus } = useAppSelector((state) => state.transactions)

    const paidBills: Transaction[] = []
    const upcomingBills: Transaction[] = []
    const dueSoonBills: Transaction[] = []
    let billNames: string[] = []
    const bills: Transaction[] = []
    let sortedTransactions: Transaction[] = []
    let totalPaidBills = 0
    let totalUpcomingBills = 0
    let totalDueSoonBills = 0
    sortedTransactions = sortTransactions([...transactions])
    billNames = [...new Set(transactions.filter(t => t.category == TransactionCategory.Bills && t.recurring).map(t => t.name))]

    if (transactionStatus.initializeTransactions == 'succeeded') {
        billNames.forEach(bill => {
            const lastPaidTransaction = sortedTransactions.find(t => t.name == bill)
            const originalTransaction = transactions.find(t => t.name == bill)

            if (originalTransaction) {
                bills.push(originalTransaction)
            }

            if (lastPaidTransaction) {
                const lastDate = DateTime.fromISO(lastPaidTransaction.date)

                if (lastDate.hasSame(DateTime.now(), 'month')) {
                    paidBills.push(lastPaidTransaction)
                } else {
                    upcomingBills.push(lastPaidTransaction)
                    const dueDate = DateTime.now().set({ day: lastDate.day })
                    if (Math.abs(dueDate.diff(DateTime.now(), 'days').days) <= 7){
                        dueSoonBills.push(lastPaidTransaction)
                    }
                }
            }
        })
    }

    totalPaidBills = paidBills.reduce((sum, curr) => sum + curr.amount , 0)
    totalUpcomingBills = upcomingBills.reduce((sum, curr) => sum + curr.amount , 0)
    totalDueSoonBills = dueSoonBills.reduce((sum, curr) => sum + curr.amount , 0)
    
    return {
        paidBills,
        upcomingBills,
        dueSoonBills,
        bills,
        totalPaidBills,
        totalUpcomingBills,
        totalDueSoonBills,
    };
};
export default useBillStats;