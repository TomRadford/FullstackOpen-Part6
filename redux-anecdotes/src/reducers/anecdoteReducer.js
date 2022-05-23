import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
          content,
          id: getId(),
          votes: 0
      })
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
      const newAnecdotes = state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)
      return [...newAnecdotes].sort((a, b) => {
        return b.votes - a.votes
      })
    }

  }
})

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions
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
