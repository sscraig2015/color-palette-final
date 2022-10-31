import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const fetchUser = createAsyncThunk('users/fetchUser', () => {

    return fetch('/me')
        .then((r) => r.json())

})

export const savePalette = createAsyncThunk('users/savePalette', (hexArray) => {

    return  fetch('/palettes', {
        method: "POST",
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({
          hexValues: hexArray,
          tags: [],
  
        })
      })
      .then((r) => r.json())
})

export const addPaletteToCollection = createAsyncThunk('users/addPaletteToCollection', (data) => {
    
    const {selection, palette } = data
    return fetch(`/collections/${selection}`, {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            palette_id: palette.id,
        })
    })
    .then((r) => r.json())

})

export const createCollection = createAsyncThunk('users/createCollection', (data) => {
    
    return fetch(`/collections`, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            title: data,
        })
    })
    .then((r) => console.log(r))
})

const initialState = {
    id: null,
    username: null,
    palettes: null,
    collections: null,
    status: 'idle',

}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout(state, action) {
            state.id = null
            state.username = null
            state.palettes = null
            state.collections = null
        },
        updateCollection(state, action){
            const result = current(state).collections.flat().filter(collection => collection.title !== action.payload.title)
            console.log(result)

        }
    },
    extraReducers: {
        [fetchUser.pending](state) {

            state.status = 'loading'
        },
        [fetchUser.fulfilled](state, action) {
            state.id = action.payload.id
            state.username = action.payload.username
            state.palettes = chunk(action.payload.palettes, 12)
            state.collections = chunk(action.payload.collections, 5)
        },
        [savePalette.fulfilled](state, action){
            state.palettes.push(action.payload) 
        },
        [addPaletteToCollection.fulfilled](state, action){
            //recieves a palette, need to add to appropriate collection
            console.log(current(state).collections.flat())
        }
    }
})

export const { userLogin, userLogout, updateCollection } = userSlice.actions
export default userSlice.reducer