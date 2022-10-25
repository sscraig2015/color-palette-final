import { configureStore } from "@reduxjs/toolkit";
import userReducer  from './Slices/userSlice'
import paletteReducer from './Slices/paletteSlice'
import pageReducer from './Slices/pageSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        palette: paletteReducer,
        page: pageReducer,
    }
})

export default store