const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcryptjs = require('bcryptjs')
const app = require('../app')
jest.setTimeout(30000)

const api = supertest(app)
const Transaction = require('../models/transaction')
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

    await Transaction.deleteMany({})
    for (let i = 0; i < helper.initialTransactions.length; i++) {
        const savedTransaction = await Transaction.create({ ...helper.initialTransactions[i], user: user._id })

        user.transactions = user.transactions.concat(savedTransaction._id)
        await user.save()
    }
})

test('all transactions are returned', async () => {
    const response = await api
        .get('/api/transactions')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialTransactions.length)
}, 10000)

test('can create a transaction', async () => {
    const newTransaction = {
        name: 'Grocery Store',
        category: 'Essentials',
        date: '2024-09-23',
        amount: 63
    }

    const savedTransaction = await api
        .post('/api/transactions')
        .set('Authorization', `Bearer ${token}`)
        .send(newTransaction)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allTransactions = await api.get('/api/transactions').set('Authorization', `Bearer ${token}`)
    const allUsers = await api.get('/api/users')
    const transactionIds = allUsers.body[0].transactions.map(b => b.toString())

    expect(allTransactions.body).toHaveLength(helper.initialTransactions.length + 1)
    expect(savedTransaction.body.name).toBe('Grocery Store')
    expect(savedTransaction.body.category).toBe('Essentials')
    expect(savedTransaction.body.date).toBe(new Date('2024-09-23').toISOString())
    expect(savedTransaction.body.amount).toBe(63)
    expect(transactionIds).toContain(savedTransaction.body.id)
})

test('creating a transaction without token results in 401', async () => {
    const newTransaction = {
        name: 'Grocery Store',
        category: 'Essentials',
        date: '2024-9-23',
        amount: 63
    }

    await api
        .post('/api/transactions')
        .send(newTransaction)
        .expect(401)
})

test('can delete a transaction', async () => {
    const initialTransactions = await helper.transactionsInDb()
    const transactionToDelete = initialTransactions[0]

    const deletedTransaction = await api
        .delete(`/api/transactions/${transactionToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const allTransactions = await helper.transactionsInDb()
    transactionToDelete.user = transactionToDelete.user.toString()
    const allUsers = await api.get('/api/users')
    const transactionIds = allUsers.body[0].transactions.map(b => b.toString())

    expect(deletedTransaction.body).toEqual(transactionToDelete)
    expect(allTransactions).toHaveLength(initialTransactions.length - 1)
    expect(transactionIds.length).toBe(initialTransactions.length - 1)
})

test('delete a transaction without token results in 401', async () => {
    const initialTransactions = await helper.transactionsInDb()
    const transactionToDelete = initialTransactions[0]

    await api
        .delete(`/api/transactions/${transactionToDelete.id}`)
        .expect(401)

})

test('a transaction can be updated', async () => {
    const initialTransactions = await helper.transactionsInDb()
    const transactionToUpdate = initialTransactions[0]


    const updatedTransaction = await api
        .put(`/api/transactions/${transactionToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ category: "Food" })
        .expect(200)
        .expect('Content-Type', /application\/json/)


    expect(updatedTransaction.body.category).toBe("Food")
    expect(updatedTransaction.body.id).toBe(transactionToUpdate.id)
})

test('updating a transaction without token results in 401', async () => {
    const initialTransactions = await helper.transactionsInDb()
    const transactionToUpdate = initialTransactions[0]


    const updatedTransaction = await api
        .put(`/api/transactions/${transactionToUpdate.id}`)
        .send({ category: "Food" })
        .expect(401)
})

afterAll(async () => {
    await mongoose.connection.close()
})