const testingRouter = require('express').Router()
const Pot = require('../models/pot')
const Budget = require('../models/budget')
const Transaction = require('../models/transaction')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
    await Pot.deleteMany({})
    await Budget.deleteMany({})
    await Transaction.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = testingRouter