import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    paletteHome : null,
    paletteInfo : null,
}

const paletteSlice = createSlice({
    name: 'palette',
    initialState,
    reducers: {
        currentPalette(state, action) {
            state.paletteHome = action.payload.result
        },
        paletteInfo(state, action) {
            state.paletteInfo = action.payload
        }

    }
})

export const { currentPalette, paletteInfo } = paletteSlice.actions
export default paletteSlice.reducer