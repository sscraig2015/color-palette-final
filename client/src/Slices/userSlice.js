import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk('user/fetchUser', () => {
    return fetch('backend')
        .then((r) => r.json())
        .then((data) => data.user)
})

const initialState = {
    id: null,
    username: null,
    userPalettes: null,

}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin(state, action) {
            state.id = action.payload.id
            state.username = action.payload.username
            state.userPalettes = action.payload.palettes
        },
        userLogout(state, action) {
            state.id = null
            state.username = null
            state.userPalettes = null
        },
        updateUserPalettes(state, action) {
            state.userPalettes.push(action.payload)    
        }
    }
})

export const { userLogin, userLogout, updateUserPalettes } = userSlice.actions
export default userSlice.reducer