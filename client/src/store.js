import { configureStore } from "@reduxjs/toolkit";
import userReducer  from './Slices/userSlice'
import paletteReducer from './Slices/paletteSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        palette: paletteReducer,
    }
})

export default store