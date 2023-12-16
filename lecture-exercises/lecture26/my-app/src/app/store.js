// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
const store = configureStore({
    reducer: {
        user: userReducer,
        // Add more slices as needed
    },
});
export default store;
