import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// import { apiSlice } from './slices/apiSlice';

import wordReducer from '../src/slices/wordSlice';
import userReducer from './slices/usersApiSlice';
const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    words: wordReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
