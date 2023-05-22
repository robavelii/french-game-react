/* eslint-disable no-unused-vars */
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
