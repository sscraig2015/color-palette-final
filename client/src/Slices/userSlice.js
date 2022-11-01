import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";



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
            throw new Error("Invalid username or password.")
        }
      })
})
export const signUp = createAsyncThunk('users/signUp', () => {
    
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
        updateCollection(state, action){
            const result = current(state).collections.flat().filter(collection => collection.title !== action.payload.title)
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
            state.collections = chunk(action.payload.collections, 5)
        },
        [createSession.fulfilled](state, action) {
            state.id = action.payload.id
            state.username = action.payload.username
            state.palettes = action.payload.palettes
            state.collections = action.payload.collections
        },
        [createSession.rejected](state, action) {
            state.errors = action.error.message
        },
        [savePalette.fulfilled](state, action){
            const newPalette = [...current(state.palettes).flat(), action.payload]
            state.palettes = chunk(newPalette, 5)
        },
        [addPaletteToCollection.fulfilled](state, action){
            //recieves a palette, need to add to appropriate collection
           console.log( action.payload.palettes[0])
           const updatedCollections = current(state.collections).flat().map((collection) => {
 
            if(collection.title === action.payload.title){
                    const newCollection = collection
                    return newCollection
                } else {
                    return collection
                }
            })
        },
        [createCollection.fulfilled](state, action){
            if(action.payload.error){
                state.errors = action.payload.error
            } else {
                const newColl = [...current(state.collections).flat(), action.payload]
                state.collections = chunk(newColl,5)
            }
        }
    }
})

export const { userLogin, userLogout, updateCollection,resetUserErrors } = userSlice.actions
export default userSlice.reducer