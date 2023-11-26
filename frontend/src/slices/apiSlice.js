import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// For use in store.js
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  // Endpoints are defined in child files and and with help of injectEndpoints() method injected here.  
  endpoints: (builder) => ({}),
});
