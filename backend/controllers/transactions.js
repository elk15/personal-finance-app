const transactionsRouter = require('express').Router()
const Transaction = require('../models/transaction')
const middleware = require('../utils/middleware')

transactionsRouter.get('/', async (request, response) => {
    const transactions = await Transaction.find({}).populate('user', { username: 1, email: 1, balance: 1 })
    response.json(transactions)
})

transactionsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const user = request.user
    const transaction = new Transaction({ ...request.body, user: user.id })

    const savedTransaction = await transaction.save()
    user.transactions = user.transactions.concat(savedTransaction._id)
    await user.save()

    response.status(201).json(savedTransaction)
})

transactionsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const { id } = request.params

    const transaction = await Transaction.findById(id)
    if (!transaction) return response.status(404).end()

    if (transaction.user.toString() === request.user.id.toString()) {
        const deletedTransaction = await Transaction.findByIdAndDelete(id)
        response.status(200).json(deletedTransaction)
    } else {
        return response.status(401).json({ error: 'User doesn\'t have permission to delete' })
    }
})

transactionsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    const updatedTransaction = await Transaction.findByIdAndUpdate(request.params.id, request.body, { new: true })
    if (updatedTransaction) {
        response.status(200).json(updatedTransaction)
    } else {
        response.status(404).end()
    }
})

module.exports = transactionsRouter