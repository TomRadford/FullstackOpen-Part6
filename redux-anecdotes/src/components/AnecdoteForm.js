import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"
import andecdoteService from "../services/anedcotes" 


const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        const newAnecdote = await andecdoteService.createNew(content) 
        dispatch(createAnecdote(newAnecdote))
        dispatch(setNotification(`'${newAnecdote.content}' was added`))
        setTimeout(() => {dispatch(removeNotification())}, 5000)
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
