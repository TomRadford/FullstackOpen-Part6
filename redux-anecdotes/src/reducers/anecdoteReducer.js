import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anedcotes'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)


// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      const newAnecdotes = state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
      return [...newAnecdotes].sort((a, b) => {
        return b.votes - a.votes
      })
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a,b) => {
        return b.votes - a.votes
      })
    }
  }
})

export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const response = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(response))
  } 
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAndecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await anecdoteService.updateAnecdote(updatedAndecdote)
    dispatch(updateAnecdote(response))
  }
}


export default anecdoteSlice.reducer

//EXERCISE WITHOUT REDUX TOOLKIT:

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//       case 'VOTE': {
//           const id = action.data.id
//           const andecdoteToChange = state.find(anecdote => anecdote.id === id)
//           const newAnecdote = {
//               ...andecdoteToChange,
//               votes: andecdoteToChange.votes + 1
//           }
//           const newAnecdotes = state.map(andecdote => (andecdote.id !== id) ? andecdote : newAnecdote)
//           const sortedAndecdotes = [...newAnecdotes].sort((a, b) => {
//               return b.votes - a.votes
//           })
//           return sortedAndecdotes
//       }
//       case 'NEW_ANECDOTE': {
//           return [...state, action.data]
//       }
//       default:
//           return state
//   }
// }

// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id }
//   }
// }

// export const createAnecdote = (anecdote) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: {
//       content: anecdote,
//       id: getId(),
//       votes: 0
//     }
//   }
// }
