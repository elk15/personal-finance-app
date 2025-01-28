const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcryptjs = require('bcryptjs')
const app = require('../app')
jest.setTimeout(30000)

const api = supertest(app)
const Budget = require('../models/budget')
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

    await Budget.deleteMany({})
    for (let i = 0; i < helper.initialBudgets.length; i++) {
        const savedBudget = await Budget.create({ ...helper.initialBudgets[i], user: user._id })

        user.budgets = user.budgets.concat(savedBudget._id)
        await user.save()
    }
})

test('all budgets are returned', async () => {
    const response = await api
        .get('/api/budgets')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBudgets.length)
}, 10000)

test('can create a budget', async () => {
    const newBudget = {
        category: 'Entertainment',
        theme: 'red',
        maxAmount: 500
    }

    const savedBudget = await api
        .post('/api/budgets')
        .set('Authorization', `Bearer ${token}`)
        .send(newBudget)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allBudgets = await api.get('/api/budgets').set('Authorization', `Bearer ${token}`)
    const allUsers = await api.get('/api/users')
    const budgetIds = allUsers.body[0].budgets.map(b => b.toString())

    expect(allBudgets.body).toHaveLength(helper.initialBudgets.length + 1)
    expect(savedBudget.body.category).toBe('Entertainment')
    expect(savedBudget.body.theme).toBe('red')
    expect(savedBudget.body.maxAmount).toBe(500)
    expect(budgetIds).toContain(savedBudget.body.id)
})

test('creating a budget without token results in 401', async () => {
    const newBudget = {
        category: 'Entertainment',
        theme: 'red',
        maxAmount: 500
    }

    await api
        .post('/api/budgets')
        .send(newBudget)
        .expect(401)
})

test('can delete a budget', async () => {
    const initialBudgets = await helper.budgetsInDb()
    const budgetToDelete = initialBudgets[0]

    const deletedBudget = await api
        .delete(`/api/budgets/${budgetToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const allBudgets = await helper.budgetsInDb()
    budgetToDelete.user = budgetToDelete.user.toString()
    const allUsers = await api.get('/api/users')
    const budgetIds = allUsers.body[0].budgets.map(b => b.toString())

    expect(deletedBudget.body).toEqual(budgetToDelete)
    expect(allBudgets).toHaveLength(initialBudgets.length - 1)
    expect(budgetIds.length).toBe(initialBudgets.length - 1)
})

test('delete a budget without token results in 401', async () => {
    const initialBudgets = await helper.budgetsInDb()
    const budgetToDelete = initialBudgets[0]

    await api
        .delete(`/api/budgets/${budgetToDelete.id}`)
        .expect(401)

})

test('a budget can be updated', async () => {
    const initialBudgets = await helper.budgetsInDb()
    const budgetToUpdate = initialBudgets[0]


    const updatedBudget = await api
        .put(`/api/budgets/${budgetToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ maxAmount: 600 })
        .expect(200)
        .expect('Content-Type', /application\/json/)


    expect(updatedBudget.body.maxAmount).toBe(600)
    expect(updatedBudget.body.id).toBe(budgetToUpdate.id)
})

test('updating a budget without token results in 401', async () => {
    const initialBudgets = await helper.budgetsInDb()
    const budgetToUpdate = initialBudgets[0]


    const updatedBudget = await api
        .put(`/api/budgets/${budgetToUpdate.id}`)
        .send({ maxAmount: 600 })
        .expect(401)
})

afterAll(async () => {
    await mongoose.connection.close()
})