import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = {
        content, 
        votes: 0
    }
    const response = await axios.post('http://localhost:3001/anecdotes', object)
    return response.data
}

const updateAnecdote = async (andecdote) => {
    const response = await axios.put(`${baseUrl}/${andecdote.id}`, andecdote)
    return response.data
}

export default { getAll, createNew, updateAnecdote } 