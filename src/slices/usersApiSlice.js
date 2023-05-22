/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../api/api';

const USERS_URL = '/auth/email';

export const login = createAsyncThunk('user/login', async (data) => {
  const response = await axios.post(`${USERS_URL}/login`, data);
  return response.data;
});

export const register = createAsyncThunk('user/register', async (data) => {
  const response = await axios.post(`${USERS_URL}/register`, data);
  return response.data;
});

export const updateUser = createAsyncThunk('user/update', async (data) => {
  const response = await axios.put('auth/me', data);
  return response.data;
});

export const logout = createAsyncThunk('user/logout', async () => {
  localStorage.removeItem('userInfo');
});

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
      });
  },
});

export default userSlice.reducer;

// import { apiSlice } from './apiSlice';
// const USERS_URL = '/auth/email';

// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/login`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     register: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/register`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     updateUser: builder.mutation({
//       query: (data) => ({
//         url: 'auth/me',
//         method: 'PUT',
//         body: data,
//       }),
//     }),
//   }),
// });

// export const { useLoginMutation, useRegisterMutation, useUpdateUserMutation } =
//   userApiSlice;
