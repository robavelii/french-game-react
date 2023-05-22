import { configureStore } from '@reduxjs/toolkit';
import wordReducer from '../src/slices/wordSlice';
import userReducer from './slices/usersApiSlice';

export default configureStore({
  reducer: {
    words: wordReducer,
    users: userReducer,
  },
});
