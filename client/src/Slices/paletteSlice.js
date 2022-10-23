import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    paletteHome : null,
    paletteInfo : null,
    currentPalettes: {
        currentPage: null,
        palettes: null,
        totalPages: null,
    },
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

        currentPalettes(state,action) {
            state.currentPalettes.currentPage = action.payload.currentPage
            state.currentPalettes.palettes = action.payload.palettes
            state.currentPalettes.totalPages = action.payload.totalPages
        },
        uploadPalette(state, action){
            console.log('palette upload')
            state.paletteUpload = action.payload
        }

    }
})

export const { currentPalette, paletteInfo, addTag, uploadPalette, currentPalettes } = paletteSlice.actions
export default paletteSlice.reducer