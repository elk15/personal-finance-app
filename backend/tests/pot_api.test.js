const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcryptjs = require('bcryptjs')
const app = require('../app')
jest.setTimeout(30000)

const api = supertest(app)
const Pot = require('../models/pot')
const User = require('../models/user')

let token
let user

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcryptjs.hash('password123', 10)
    const newUser = new User({ name: 'root', email: 'root@mail.com', passwordHash })
    user = await newUser.save()

    const loginResponse = await api
        .post('/api/login')
        .send({ email: 'root@mail.com', password: 'password123' })

    token = loginResponse.body.token

    await Pot.deleteMany({})
    for (let i = 0; i < helper.initialPots.length; i++) {
        const savedPot = await Pot.create({ ...helper.initialPots[i], user: user._id })

        user.pots = user.pots.concat(savedPot._id)
        await user.save()
    }
})

test('all pots are returned', async () => {
    const response = await api
        .get('/api/pots')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialPots.length)
}, 10000)

test('can create a pot', async () => {
    const newPot = {
        name: 'Travel Abroad',
        theme: 'navy-blue',
        target: 3400,
    }

    const savedPot = await api
        .post('/api/pots')
        .set('Authorization', `Bearer ${token}`)
        .send(newPot)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allPots = await api.get('/api/pots').set('Authorization', `Bearer ${token}`)
    const allUsers = await api.get('/api/users')
    const potIds = allUsers.body[0].pots.map(b => b.toString())

    expect(allPots.body).toHaveLength(helper.initialPots.length + 1)
    expect(savedPot.body.name).toBe('Travel Abroad')
    expect(savedPot.body.theme).toBe('navy-blue')
    expect(savedPot.body.target).toBe(3400)
    expect(savedPot.body.totalSaved).toBe(0)
    expect(potIds).toContain(savedPot.body.id)
})

test('creating a pot without token results in 401', async () => {
    const newPot = {
        name: 'Travel Abroad',
        theme: 'navy-blue',
        target: 3400,
    }

    await api
        .post('/api/pots')
        .send(newPot)
        .expect(401)
})

test('can delete a pot', async () => {
    const initialPots = await helper.potsInDb()
    const potToDelete = initialPots[0]

    const deletedPot = await api
        .delete(`/api/pots/${potToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const allPots = await helper.potsInDb()
    potToDelete.user = potToDelete.user.toString()
    const allUsers = await api.get('/api/users')
    const potIds = allUsers.body[0].pots.map(b => b.toString())

    expect(deletedPot.body).toEqual(potToDelete)
    expect(allPots).toHaveLength(initialPots.length - 1)
    expect(potIds.length).toBe(initialPots.length - 1)
})

test('delete a pot without token results in 401', async () => {
    const initialPots = await helper.potsInDb()
    const potToDelete = initialPots[0]

    await api
        .delete(`/api/pots/${potToDelete.id}`)
        .expect(401)

})

test('a pot can be updated', async () => {
    const initialPots = await helper.potsInDb()
    const potToUpdate = initialPots[0]


    const updatedPot = await api
        .put(`/api/pots/${potToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ totalSaved: 300 })
        .expect(200)
        .expect('Content-Type', /application\/json/)


    expect(updatedPot.body.totalSaved).toBe(300)
    expect(updatedPot.body.id).toBe(potToUpdate.id)
})

test('updating a pot without token results in 401', async () => {
    const initialPots = await helper.potsInDb()
    const potToUpdate = initialPots[0]


    const updatedPot = await api
        .put(`/api/pots/${potToUpdate.id}`)
        .send({ totalSaved: 300 })
        .expect(401)
})

afterAll(async () => {
    await mongoose.connection.close()
})