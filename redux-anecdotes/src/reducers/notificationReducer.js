import { createSlice } from '@reduxjs/toolkit'

const notficationSlice = createSlice({
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

const notificationTimeout = { 
    cancel: () => {
        console.log(notificationTimeout.timeoutId)
        clearTimeout(notificationTimeout.timeoutId)
    },
    runTimeout: (dispatch, seconds) => {
        notificationTimeout.timeoutId = 
            setTimeout(() => {
                dispatch(removeNotification())
            } , seconds * 1000)
    }
}

export const {addNotification, removeNotification} = notficationSlice.actions
export const setNotification = (message, seconds) => {
    return dispatch => {
        notificationTimeout.cancel()
        dispatch(addNotification(message))
        notificationTimeout.runTimeout(dispatch, seconds)
    }
}
export default notficationSlice.reducer