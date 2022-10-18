import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    palette : null,
}

const paletteSlice = createSlice({
    name: 'palette',
    initialState,
    reducers: {
        currentPalette(state, action) {
            state.palette = action.payload.result
        }
    }
})

export const { currentPalette } = paletteSlice.actions
export default paletteSlice.reducer