import { createSlice } from '@reduxjs/toolkit'

const notficationSlide = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        addNotification(state, action) {
            const message = action.payload
            return message
        },
        removeNotification(state, action) {
           return null
        }
    }
})

export const {addNotification, removeNotification} = notficationSlide.actions
export const setNotification = (message, seconds) => {
    return dispatch => {
        dispatch(addNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        } , seconds * 1000)
    }
}
export default notficationSlide.reducer