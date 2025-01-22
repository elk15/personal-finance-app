const billsRouter = require('express').Router()
const Bill = require('../models/bill')
const middleware = require('../utils/middleware')

billsRouter.get('/', async (request, response) => {
    const bills = await Bill.find({}).populate('user', { username: 1, email: 1, balance: 1 })
    response.json(bills)
})

billsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const user = request.user
    const bill = new Bill({ ...request.body, user: user.id })

    const savedBill = await bill.save()
    user.bills = user.bills.concat(savedBill._id)
    await user.save()

    response.status(201).json(savedBill)
})

billsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const { id } = request.params

    const bill = await Bill.findById(id)
    if (!bill) return response.status(404).end()

    if (bill.user.toString() === request.user.id.toString()) {
        const deletedBill = await Bill.findByIdAndDelete(id)
        response.status(200).json(deletedBill)
    } else {
        return response.status(401).json({ error: 'User doesn\'t have permission to delete' })
    }
})

billsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    const updatedBill = await Bill.findByIdAndUpdate(request.params.id, request.body, { new: true })
    if (updatedBill) {
        response.status(200).json(updatedBill)
    } else {
        response.status(404).end()
    }
})

module.exports = billsRouter