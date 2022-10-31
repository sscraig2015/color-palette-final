import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const addTag = createAsyncThunk('palettes/addTag', (data) => {
    
    const {id, tag} = data
    return fetch(`/palettes/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            tag: tag,
        })
    })
    .then((r) => r.json())

})

const initialState = {
    paletteHome : null,
    paletteInfo : null,
    currentPalettes: null,
    paletteUpload: null,
    status: 'idle',
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
        currentPalettes(state,action) {
           
            const flatArray = action.payload.flat()
            state.currentPalettes = chunk(flatArray, 12)
        },
        uploadPalette(state, action){
            state.paletteUpload = action.payload
        }
    },
    extraReducers: {
        [addTag.fulfilled](state, action) {
            
            state.paletteInfo.tags = action.payload.tags
        }
    }
})

export const { homePalette, paletteInfo, uploadPalette, currentPalettes } = paletteSlice.actions
export default paletteSlice.reducer