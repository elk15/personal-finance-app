import axios from 'axios'
import { Config, Budget, BudgetWithoutId } from '../types'

const baseUrl = 'http://localhost:3000/api/budgets'

const getAll = async (config: Config) => {
    const response = await axios.get<Budget[]>(baseUrl, config)
    return response.data
}

const create = async (
    content: BudgetWithoutId, 
    config: Config
) => {
    const response = await axios.post(baseUrl, content, config)
    return response.data
}

const update = async (
    id: string,
    content: Budget, 
    config: Config
) => {
    const response = await axios.put(`${baseUrl}/${id}`, content, config)
    return response.data
}

const remove = async (
    id: string,
    config: Config
) => {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default {getAll, create, update, remove}