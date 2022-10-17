import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk('user/fetchUser', () => {
    return fetch('backend')
        .then((r) => r.json())
        .then((data) => data.user)
})

const initialState = {
    id: '',
    username: '',

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
            state.id = ''
            state.username = ''
        }
    }
})

export const { userLogin, userLogout } = userSlice.actions
export default userSlice.reducer