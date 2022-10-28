import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );



const initialState = {
    paletteHome : null,
    paletteInfo : null,
    currentPalettes: null,
    paletteUpload: null,
}

const paletteSlice = createSlice({
    name: 'palette',
    initialState,
    reducers: {
        homePalette(state, action) {
            state.paletteHome = action.payload.result
        },
        paletteInfo(state, action) {
            
            state.paletteInfo = action.payload
        },
        addTag(state,action) {
  
           state.paletteInfo.tags = action.payload
        },

        currentPalettes(state,action) {
           
            const flatArray = action.payload.flat()
            state.currentPalettes = chunk(flatArray, 12)
        },
        uploadPalette(state, action){
            state.paletteUpload = action.payload
        }

    }
})

export const { homePalette, paletteInfo, addTag, uploadPalette, currentPalettes } = paletteSlice.actions
export default paletteSlice.reducer