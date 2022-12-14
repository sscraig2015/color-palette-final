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
    errors: null,
}

export const addTag = createAsyncThunk('palettes/addTag', (data) => {
    
    const {id, tag, palette} = data
    
    if(tag.trim().length === 0){
        throw new Error('Tag can not be blank.')
    }
    
    for (const oldTag of palette.tags) {
        if(oldTag.name.trim() === tag.trim()) {

            throw new Error('Palette already has this tag.')
        }         
    }

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
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            mode: "diffusion", 
            num_colors: 5, 
            temperature: "1.4", 
            num_results: 1, 
            adjacency: [
                "0",
                "18",
                "40",
                "67",
                "100",
                "18",
                "0",
                "23",
                "0",
                "0",
                "40",
                "23",
                "0",
                "19",
                "0",
                "67",
                "0",
                "19",
                "0",
                "14",
                "100",
                "0",
                "0",
                "14",
                "0"
                
            ],
            palette: [
                "-",
                "-",
                "-",
                "-",
                "-"
            ] 
        })
    }

    return fetch(`https://api.huemint.com/color`, options)
        .then((r) => r.json())

        
})

export const newUserPalette = createAsyncThunk('palettes/newUserPalette', (savedColors) => {

    let userColors = [...savedColors]
      
    if(savedColors.length < 5){
      while ( userColors.length < 5) {
        userColors.push("-")
      }
    }

    const options = {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            mode: "diffusion", 
            num_colors: 5, 
            temperature: "1.4", 
            num_results: 1, 
            adjacency: [
                "0",
                "18",
                "40",
                "67",
                "100",
                "18",
                "0",
                "23",
                "0",
                "0",
                "40",
                "23",
                "0",
                "19",
                "0",
                "67",
                "0",
                "19",
                "0",
                "14",
                "100",
                "0",
                "0",
                "14",
                "0"
                
            ],
            palette: userColors
        })
    }

    return fetch(`https://api.huemint.com/color`, options)
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
        },
        resetPaletteErrors(state, action){
            state.errors = null
        }
    },
    extraReducers: {
        [addTag.fulfilled](state, action) {
            action.payload.palettes.forEach((palette) => {
                if(palette.id === action.meta.arg.id) {
                    state.paletteInfo.tags = palette.tags
                }
            })
            state.currentPalettes = chunk(action.payload.palettes, 12)
        },
        [addTag.rejected](state, action) {
            state.errors = action.error.message
        },
        [homePalette.fulfilled](state, action){
            state.paletteHome = action.payload.results[0].palette
        },
        [homePalette.pending](state, action){
            console.log(action, 'pending')
        },
        [newUserPalette.fulfilled](state, action){
            state.paletteHome = action.payload.results[0].palette
        },
        [newUserPalette.pending](state, action){
            console.log(action, 'pending')
        },
        [fetchLatestPalettes.fulfilled](state, action){
            
            state.currentPalettes = chunk(action.payload.flat(), 12)
        },
        [fetchLatestPalettes.rejected](state, action){
            console.log(action)
        }

    }
})

export const { paletteInfo, uploadPalette, currentPalettes, resetPaletteErrors } = paletteSlice.actions
export default paletteSlice.reducer