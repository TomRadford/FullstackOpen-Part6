import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        
        if (!filter) {
            return anecdotes
        } else {
            return anecdotes.filter(anecdote => 
                anecdote.content
                .toLowerCase()
                .includes(filter.toLowerCase())
            )
        }
    })
    const dispatch = useDispatch()
    const handleVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`You voted '${anecdote.content}'`))
        setTimeout(() => {dispatch(removeNotification())}, 5000)
    }
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>)}
          </div>
    )}

export default AnecdoteList
