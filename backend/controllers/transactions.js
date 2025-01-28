const transactionsRouter = require('express').Router()
const Transaction = require('../models/transaction')
const middleware = require('../utils/middleware')

transactionsRouter.get('/', middleware.userExtractor, async (request, response) => {
    const { _id } = request.user
    const transactions = await Transaction.find({ user: _id.toString() }).populate('user', { username: 1, email: 1, balance: 1 })
    response.json(transactions)
})

transactionsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const user = request.user
    const transaction = new Transaction({ ...request.body, user: user.id, date: new Date(request.body.date).toISOString() })

    const savedTransaction = await transaction.save()
    user.transactions = user.transactions.concat(savedTransaction._id)
    await user.save()

    response.status(201).json(savedTransaction)
})

transactionsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const { id } = request.params
    const user = request.user

    const transaction = await Transaction.findById(id)
    if (!transaction) return response.status(404).end()

    if (transaction.user.toString() === user.id.toString()) {
        const deletedTransaction = await Transaction.findByIdAndDelete(id)
        user.transactions = user.transactions.filter(id => !id.equals(deletedTransaction._id))
        await user.save()

        response.status(200).json(deletedTransaction)
    } else {
        return response.status(401).json({ error: 'User doesn\'t have permission to delete' })
    }
})

transactionsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    const { id } = request.params
    const user = request.user

    const transaction = await Transaction.findById(id)
    if (!transaction) return response.status(404).end()

    if (transaction.user.toString() === user.id.toString()) {
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, request.body, { new: true })
        response.status(200).json(updatedTransaction)

    } else {
        return response.status(401).json({ error: 'User doesn\'t have permission to update' })
    }
})

module.exports = transactionsRouter