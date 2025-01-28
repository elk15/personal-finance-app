const potsRouter = require('express').Router()
const Pot = require('../models/pot')
const middleware = require('../utils/middleware')

potsRouter.get('/', middleware.userExtractor, async (request, response) => {
    const { _id } = request.user
    const pots = await Pot.find({ user: _id.toString() }).populate('user', { username: 1, email: 1, balance: 1 })
    response.json(pots)
})

potsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const user = request.user
    const pot = new Pot({ ...request.body, user: user.id })

    const savedPot = await pot.save()
    user.pots = user.pots.concat(savedPot._id)
    await user.save()

    response.status(201).json(savedPot)
})

potsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const { id } = request.params
    const user = request.user

    const pot = await Pot.findById(id)
    if (!pot) return response.status(404).end()

    if (pot.user.toString() === user.id.toString()) {
        const deletedPot = await Pot.findByIdAndDelete(id)
        user.pots = user.pots.filter(id => !id.equals(deletedPot._id))
        await user.save()

        response.status(200).json(deletedPot)
    } else {
        return response.status(401).json({ error: 'User doesn\'t have permission to delete' })
    }
})

potsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    const { id } = request.params
    const user = request.user

    const pot = await Pot.findById(id)
    if (!pot) return response.status(404).end()

    if (pot.user.toString() === user.id.toString()) {
        const updatedPot = await Pot.findByIdAndUpdate(id, request.body, { new: true })
        response.status(200).json(updatedPot)

    } else {
        return response.status(401).json({ error: 'User doesn\'t have permission to update' })
    }
})

module.exports = potsRouter