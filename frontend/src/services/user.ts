import axios from 'axios'
import { Config, Credentials } from '../types'

const baseUrl = 'http://localhost:3000/api'

const register = async (content: {
    email: string
    name: string
    password: string
}) => {
    const response = await axios.post(`${baseUrl}/users`, content)
    return response.data
}

const updateUser = async (
    updatedContent: {
    email: string
    balance: number
    },
    config : Config
) => {
    const response = await axios.patch(`${baseUrl}/users`, updatedContent, config)
    return response.data
}

const login = async (credentials: Credentials) => {
    const response = await axios.post(`${baseUrl}/login`, credentials)
    return response.data
}


export default {register, updateUser, login}