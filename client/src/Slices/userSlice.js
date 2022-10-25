import { createSlice, current } from "@reduxjs/toolkit";

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

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
            console.log(action.payload, 'userlogin')
            state.id = action.payload.id
            state.username = action.payload.username
            state.palettes = chunk(action.payload.palettes, 12)
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
            const result = current(state).collections.filter(collection => collection.title !== action.payload.title)
            result.push(action.payload)
            state.collections = result

        },
        createCollection(state, action) {
            state.collections.push(action.payload)
        }
    }
})

export const { userLogin, userLogout, updateUserPalettes, updateCollection, createCollection } = userSlice.actions
export default userSlice.reducer