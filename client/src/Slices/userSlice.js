import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk('user/fetchUser', () => {
    return fetch('backend')
        .then((r) => r.json())
        .then((data) => data.user)
})

const initialState = {
    id: null,
    username: null,
    palettes: null,
    collections: null,

}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin(state, action) {
            
            state.id = action.payload.id
            state.username = action.payload.username
            state.palettes = action.payload.palettes
            state.collections = action.payload.collections
        },
        userLogout(state, action) {
            state.id = null
            state.username = null
            state.palettes = null
        },
        updateUserPalettes(state, action) {
            state.palettes.push(action.payload)    
        },
        updateCollection(state, action){
            console.log(state)
            const result = state.collections.filter(collection => collection.title !== action.payload.title)
            
            console.log(result)
            state.collections = result << action.payload
        }
    }
})

export const { userLogin, userLogout, updateUserPalettes, updateCollection } = userSlice.actions
export default userSlice.reducer