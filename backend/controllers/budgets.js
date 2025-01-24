const budgetsRouter = require('express').Router()
const Budget = require('../models/budget')
const middleware = require('../utils/middleware')

budgetsRouter.get('/', async (request, response) => {
    const budgets = await Budget.find({}).populate('user', { username: 1, email: 1, balance: 1 })
    response.json(budgets)
})

budgetsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const user = request.user
    const budget = new Budget({ ...request.body, user: user.id })

    const savedBudget = await budget.save()
    user.budgets = user.budgets.concat(savedBudget._id)
    await user.save()

    response.status(201).json(savedBudget)
})

budgetsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const { id } = request.params
    const user = request.user

    const budget = await Budget.findById(id)
    if (!budget) return response.status(404).end()

    if (budget.user.toString() === request.user.id.toString()) {
        const deletedBudget = await Budget.findByIdAndDelete(id)
        user.budgets = user.budgets.filter(id => !id.equals(deletedBudget._id))
        await user.save()

        response.status(200).json(deletedBudget)
    } else {
        return response.status(401).json({ error: 'User doesn\'t have permission to delete' })
    }
})

budgetsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    const updatedBudget = await Budget.findByIdAndUpdate(request.params.id, request.body, { new: true })
    if (updatedBudget) {
        response.status(200).json(updatedBudget)
    } else {
        response.status(404).end()
    }
})

module.exports = budgetsRouter