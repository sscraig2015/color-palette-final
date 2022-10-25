import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    number: 1,
}

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        nextPage(state,action){
            state += action.payload
        },
        previousPage(state,action){
        state -= action.payload
        },
    }
})

export const { nextPage, previousPage } = pageSlice.actions
export default pageSlice.reducer