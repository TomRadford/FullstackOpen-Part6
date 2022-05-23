import { createSlice } from '@reduxjs/toolkit'

const notficationSlide = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            const message = action.payload
            return message
        },
        removeNotification(state, action) {
           return null
        }
    }

})

export const {setNotification, removeNotification} = notficationSlide.actions
export default notficationSlide.reducer