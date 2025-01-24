const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcryptjs = require('bcryptjs')
const app = require('../app')
jest.setTimeout(30000)

const api = supertest(app)
const Bill = require('../models/bill')
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

    await Bill.deleteMany({})
    for (let i = 0; i < helper.initialBills.length; i++) {
        const savedBill = await Bill.create({ ...helper.initialBills[i], user: user._id })

        user.bills = user.bills.concat(savedBill._id)
        await user.save()
    }
})

test('all bills are returned', async () => {
    const response = await api
        .get('/api/bills')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBills.length)
}, 10000)

test('can create a bill', async () => {
    const newBill = {
        title: 'Netflix',
        dueDate: 'Monthly-12',
        amount: 9,
    }

    const savedBill = await api
        .post('/api/bills')
        .set('Authorization', `Bearer ${token}`)
        .send(newBill)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allBills = await api.get('/api/bills')
    const allUsers = await api.get('/api/users')
    const billIds = allUsers.body[0].bills.map(b => b.toString())

    expect(allBills.body).toHaveLength(helper.initialBills.length + 1)
    expect(savedBill.body.title).toBe('Netflix')
    expect(savedBill.body.dueDate).toBe('Monthly-12')
    expect(savedBill.body.amount).toBe(9)
    expect(billIds).toContain(savedBill.body.id)
})

test('creating a bill without token results in 401', async () => {
    const newBill = {
        title: 'Netflix',
        dueDate: 'Monthly-12',
        amount: 9,
    }

    await api
        .post('/api/bills')
        .send(newBill)
        .expect(401)
})

test('can delete a bill', async () => {
    const initialBills = await helper.billsInDb()
    const billToDelete = initialBills[0]

    const deletedBill = await api
        .delete(`/api/bills/${billToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const allBills = await helper.billsInDb()
    billToDelete.user = billToDelete.user.toString()
    const allUsers = await api.get('/api/users')
    const billIds = allUsers.body[0].bills.map(b => b.toString())

    expect(deletedBill.body).toEqual(billToDelete)
    expect(allBills).toHaveLength(initialBills.length - 1)
    expect(billIds.length).toBe(initialBills.length - 1)
})

test('delete a bill without token results in 401', async () => {
    const initialBills = await helper.billsInDb()
    const billToDelete = initialBills[0]

    await api
        .delete(`/api/bills/${billToDelete.id}`)
        .expect(401)

})

test('a bill can be updated', async () => {
    const initialBills = await helper.billsInDb()
    const billToUpdate = initialBills[0]


    const updatedBill = await api
        .put(`/api/bills/${billToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 12 })
        .expect(200)
        .expect('Content-Type', /application\/json/)


    expect(updatedBill.body.amount).toBe(12)
    expect(updatedBill.body.id).toBe(billToUpdate.id)
})

test('updating a bill without token results in 401', async () => {
    const initialBills = await helper.billsInDb()
    const billToUpdate = initialBills[0]


    const updatedBill = await api
        .put(`/api/bills/${billToUpdate.id}`)
        .send({ amount: 12 })
        .expect(401)
})

afterAll(async () => {
    await mongoose.connection.close()
})