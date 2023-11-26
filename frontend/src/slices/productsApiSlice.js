import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// With help of injectEndpoints() method injected in apiSlice.js. (no need to import)
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetals: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});


export const { useGetProductsQuery, useGetProductDetalsQuery } =
  productsApiSlice;
