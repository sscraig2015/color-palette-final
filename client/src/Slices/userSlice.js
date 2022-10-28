import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const fetchUser = createAsyncThunk('users/fetchUser', () => {

    return fetch('/me')
        .then((r) => r.json())
        .then((data) => data)
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
        },
        updateUserPalettes(state, action) {
            state.palettes.push(action.payload)    
        },
        updateCollection(state, action){
            const result = current(state).collections.filter(collection => collection.title !== action.payload.title)
            result.push(action.payload)
            state.collections = result

        },
        createCollection(state, action) {
            state.collections.push(action.payload)
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
            state.collections = chunk(action.payload.collections, 4)
        }
    }
})

export const { userLogin, userLogout, updateUserPalettes, updateCollection, createCollection } = userSlice.actions
export default userSlice.reducer