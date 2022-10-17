import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk('user/fetchUser', () => {
    return fetch('backend')
        .then((r) => r.json())
        .then((data) => data.user)
})

const initialState = {
    id: null,
    username: null,

}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin(state, action) {
            state.id = action.payload.id
            state.username = action.payload.username
        },
        userLogout(state, action) {
            state.id = null
            state.username = null
        }
    }
})

export const { userLogin, userLogout } = userSlice.actions
export default userSlice.reducer