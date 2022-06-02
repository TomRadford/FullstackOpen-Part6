import { connect } from "react-redux"
import { createAnecdote  } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"


const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const newAnecdote = event.target.anecdote.value
        props.createAnecdote(newAnecdote)
        props.setNotification(`'${newAnecdote}' was added`, 5)
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
export default connect(null, { 
    setNotification,
    createAnecdote
})(AnecdoteForm)
