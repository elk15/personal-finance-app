const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

jest.setTimeout(30000)
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcryptjs.hash('secret', 10)
    const user = new User({ name: 'Tester', email: 'tester@mail.com', passwordHash })

    await user.save()
})

test('can create account', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        email: 'mary@mail.com',
        name: 'Mary',
        password: 'password123!',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const emails = usersAtEnd.map(u => u.email)
    expect(emails).toContain(newUser.email)
})

test('cant create an account if the email is taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        "email": "tester@mail.com",
        "name": "Smith",
        "password": "test1234!"
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(result.body.error).toBe('Email isn\'t unique')

    expect(usersAtEnd.length).toBe(usersAtStart.length)
})

test('can log in with correct credentials', async () => {
    const credentials = {
        email: 'tester@mail.com',
        password: 'secret',
    }

    const response = await api
        .post('/api/login')
        .send(credentials)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body.email).toBe('tester@mail.com')
    expect(response.body.name).toBe('Tester')
    expect(response.body.balance).toBe(0)
    expect(response.body.token).toBeDefined();
})

test('cant log in with incorrect credentials', async () => {
    const credentials = {
        email: 'tester@mail.com',
        password: 'password',
    }

    const response = await api
        .post('/api/login')
        .send(credentials)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('Invalid email or password')
})

afterAll(async () => {
    await mongoose.connection.close()
})