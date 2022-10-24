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
            console.log(action.payload.collections)
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
        }
    }
})

export const { userLogin, userLogout, updateUserPalettes } = userSlice.actions
export default userSlice.reducer