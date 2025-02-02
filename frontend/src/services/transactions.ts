import axios from 'axios'
import { Config, Transaction, TransactionWithoutId } from '../types'

const baseUrl = 'http://localhost:3000/api/transactions'

const getAll = async (config: Config) => {
    const response = await axios.get<Transaction[]>(baseUrl, config)
    return response.data
}

const create = async (
    content: TransactionWithoutId, 
    config: Config
) => {
    const response = await axios.post(baseUrl, content, config)
    return response.data
}

const update = async (
    id: string,
    content: Transaction, 
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