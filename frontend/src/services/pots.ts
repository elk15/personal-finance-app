import axios from 'axios'
import { Config, Pot, PotWithoutId } from '../types'
import { getBaseUrl } from '../utils'

const baseUrl = `${getBaseUrl()}/api/pots`

const getAll = async (config: Config) => {
    const response = await axios.get<Pot[]>(baseUrl, config)
    return response.data
}

const create = async (
    content: PotWithoutId, 
    config: Config
) => {
    const response = await axios.post(baseUrl, content, config)
    return response.data
}

const update = async (
    id: string,
    content: Pot, 
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