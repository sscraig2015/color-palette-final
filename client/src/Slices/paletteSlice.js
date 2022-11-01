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

export const homePalette = createAsyncThunk('palettes/homePalette', () => {

    const options = {
        method: 'POST',
        body: JSON.stringify({ 	
          model : "default",
          input : ["N","N","N","N","N"]})
      }
      return fetch(`http://colormind.io/api/`, options)
        .then((r) => r.json())
        
})

export const newUserPalette = createAsyncThunk('palettes/newUserPalette', (savedColors) => {

    let userColors = [...savedColors]
      
    if(savedColors.length < 5){
      while ( userColors.length < 5) {
        userColors.push("N")
      }
    }
  
    const options = {
        method: 'POST',
        body: JSON.stringify({ 	
        model : "default",
        input : userColors})
    }
    
    return fetch(`http://colormind.io/api/`, options)
          .then((r) => r.json())

})

export const fetchLatestPalettes = createAsyncThunk('palettes/fetchLatestPalettes', () => {
    return fetch(`/api/palettes/latest`)
        .then((resp) => resp.json())
})

const paletteSlice = createSlice({
    name: 'palette',
    initialState,
    reducers: {
        paletteInfo(state, action) {
            state.paletteInfo = action.payload
        },
        currentPalettes(state,action) {
            state.currentPalettes = chunk(action.payload.flat(), 12)
        },
        uploadPalette(state, action){
            state.paletteUpload = action.payload
        }
    },
    extraReducers: {
        [addTag.fulfilled](state, action) {
            state.paletteInfo.tags = action.payload.tags
        },
        [homePalette.fulfilled](state, action){
            state.paletteHome = action.payload.result
        },
        [newUserPalette.fulfilled](state, action){
            state.paletteHome = action.payload.result
        },
        [fetchLatestPalettes.fulfilled](state, action){
            console.log(action)
            state.currentPalettes = chunk(action.payload.flat(), 12)
        },
        [fetchLatestPalettes.rejected](state, action){
            console.log(action)
        }

    }
})

export const { paletteInfo, uploadPalette, currentPalettes } = paletteSlice.actions
export default paletteSlice.reducer