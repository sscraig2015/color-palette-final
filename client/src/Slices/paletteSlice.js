import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    paletteHome : null,
    paletteInfo : null,
    paletteCommunity : null,
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
        },
        addTag(state,action) {
            state.paletteInfo.tags = action.payload
        },
        communityPalettes(state, action) {
            state.paletteCommunity = action.payload
        }

    }
})

export const { currentPalette, paletteInfo, addTag, communityPalettes } = paletteSlice.actions
export default paletteSlice.reducer