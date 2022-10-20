import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    paletteHome : null,
    paletteInfo : null,
    paletteCommunity : null,
    paletteUpload: null,
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
        },
        uploadPalette(state, action){
            console.log('palette upload')
            state.paletteUpload = action.payload
        }

    }
})

export const { currentPalette, paletteInfo, addTag, communityPalettes, uploadPalette } = paletteSlice.actions
export default paletteSlice.reducer