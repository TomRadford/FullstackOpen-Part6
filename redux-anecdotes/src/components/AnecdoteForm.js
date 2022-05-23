import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const andecdote = event.target.anecdote.value
        dispatch(createAnecdote(andecdote))
        event.target.anecdote.value = ''
      }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}
export default AnecdoteForm