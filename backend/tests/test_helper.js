const Pot = require('../models/pot')
const Bill = require('../models/bill')
const Transaction = require('../models/transaction')
const Budget = require('../models/budget')
const User = require('../models/user')

const initialPots = [
    {
        name: 'Savings',
        theme: 'orange',
        target: 1200,
    },
    {
        name: 'New Guitar',
        theme: 'blue',
        target: 430,
        totalSaved: 20,
    },
]

const initialBills = [
    {
        title: 'Netflix',
        dueDate: 'Monthly-12',
        amount: 9,
    },
    {
        title: 'Gym',
        dueDate: 'Yearly-12-02',
        amount: 220,
    },
]

const initialTransactions = [
    {
        recipient: 'Grocery Store',
        category: 'Essentials',
        date: '2024-09-23',
        amount: 63
    },
    {
        recipient: 'Lottery Inc',
        category: 'Entertainment',
        date: '2024-10-03',
        amount: 1000,
        isIncome: true,
    },
]

const initialBudgets = [
    {
        category: 'Entertainment',
        theme: 'red',
        maxAmount: 500
    },
    {
        category: 'Personal Care',
        theme: 'blue',
        maxAmount: 200
    },
]

const potsInDb = async () => {
    const pots = await Pot.find({})
    return pots.map(pot => pot.toJSON())
}

const billsInDb = async () => {
    const bills = await Bill.find({})
    return bills.map(bill => bill.toJSON())
}

const transactionsInDb = async () => {
    const transactions = await Transaction.find({})
    return transactions.map(transaction => transaction.toJSON())
}

const budgetsInDb = async () => {
    const budgets = await Budget.find({})
    return budgets.map(budget => budget.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const nonExistingPotId = async () => {
    const pot = new Pot({
        name: 'todelete',
        theme: 'orange',
        target: 1200,
    })
    await pot.save()
    await pot.deleteOne()

    return pot.id.toString()
}

const nonExistingBillId = async () => {
    const bill = new Bill({
        title: 'toremove',
        dueDate: 'Monthly-12',
        amount: 9,
    })
    await bill.save()
    await bill.deleteOne()

    return bill.id.toString()
}

const nonExistingTransactionId = async () => {
    const transaction = new Transaction({
        title: 'toremove',
        dueDate: 'Monthly-12',
        amount: 9,
    })
    await transaction.save()
    await transaction.deleteOne()

    return transaction.id.toString()
}

const nonExistingBudgetId = async () => {
    const budget = new Budget({
        category: 'toremove',
        theme: 'red',
        maxAmount: 500
    })
    await budget.save()
    await budget.deleteOne()

    return budget.id.toString()
}

module.exports = {
    initialPots,
    initialBills,
    initialTransactions,
    initialBudgets,
    potsInDb,
    billsInDb,
    transactionsInDb,
    budgetsInDb,
    usersInDb,
    nonExistingPotId,
    nonExistingBillId,
    nonExistingTransactionId,
    nonExistingBudgetId
}