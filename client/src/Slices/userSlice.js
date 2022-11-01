import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
  
const initialState = {
    id: null,
    username: null,
    palettes: [],
    collections: [],
    errors: null,

}
export const fetchUser = createAsyncThunk('users/fetchUser', () => {
    return fetch('/me')
        .then((r) => r.json())
})

export const createNewUser = createAsyncThunk('users/createNewUser', (data) => {
    
    const { username, password, passwordConfirmation} = data
    return fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          password_confirmation: passwordConfirmation,
        }),
      })
      .then((r) => {
        if(r.ok){
            console.log('r okay')
        } else {
            return r.json().then((data) => {throw new Error(data.errors)})
        }
      })
})

export const createSession = createAsyncThunk('/users/createSession', (data) => {
    
    const {username, password} = data

    return  fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        })
      })
      .then((r) => {
        if(r.ok){
            return r.json()
        } else {
            return r.json().then((data) => {throw new Error(data.errors)})

        }
      })
})

export const deletePalette = createAsyncThunk('users/deletePalette', (data) => {
    
    

    return fetch(`/palettes/${data.id}`,{
        method: 'DELETE',
    })
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

export const saveUploadPalette = createAsyncThunk('/palettes/saveUploadPalette', (data) => {
    
    const { hexArray } = data

    return fetch('/palettes', {
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

    const {selection , palette } = data
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

export const createCollection = createAsyncThunk('users/createCollection', (newCollection) => {
    
    return fetch(`/collections`, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            title: newCollection,
        })
    })
    .then((r) => r.json())
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin(state,action){
            state.id = action.payload.id
            state.username = action.payload.username
            state.palettes = action.payload.palettes
            state.collections = action.payload.collections
        },
        userLogout(state, action) {
            state.id = null
            state.username = null
            state.palettes = null
            state.collections = null
        },
        resetUserErrors(state, action){
            state.errors = null
        }
    },
    extraReducers: {
        [fetchUser.fulfilled](state, action) {
            state.id = action.payload.id
            state.username = action.payload.username
            state.palettes = chunk(action.payload.palettes, 12)
            state.collections = chunk(action.payload.collections, 4)
        },
        [createNewUser.fulfilled](state, action){
            console.log(action)
        },
        [createNewUser.rejected](state, action){
            state.errors = action.error.message
        },
        [createSession.fulfilled](state, action) {
            console.log(action, 'fulfilled')
            state.id = action.payload.id
            state.username = action.payload.username
            state.palettes = chunk(action.payload.palettes, 12)
            state.collections = chunk(action.payload.collections, 4)
        },
        [createSession.rejected](state, action) {
            console.log(action, 'rejected')
            state.errors = action.error.message
        },
        [savePalette.fulfilled](state, action){
            state.palettes = chunk(action.payload, 12)
        },
        [saveUploadPalette.fulfilled](state, action){
            state.palettes = chunk(action.payload, 12)
        },
        [deletePalette.fulfilled](state, action){
            state.palettes = chunk(action.payload, 12)
        },
        [addPaletteToCollection.fulfilled](state, action){
            state.collections = chunk(action.payload, 4)
        },
        [createCollection.fulfilled](state, action){
            if(action.payload.error){
                state.errors = {collectionError : action.payload.error}
            } else {
                const newColl = [...current(state.collections).flat(), action.payload]
                state.collections = chunk(newColl,4)
            }
        }
    }
})

export const { userLogin, userLogout, updateCollection, resetUserErrors, updateUserCollections } = userSlice.actions
export default userSlice.reducer