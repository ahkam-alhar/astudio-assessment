// api/userApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../utils/apiUtils';
import { IResponse } from '../../types/common.types';
import { IProduct } from '../../types/product.types';

export const productApi = createApi({
  reducerPath: 'productApi', // Unique key for the reducer
  baseQuery: axiosBaseQuery(), // Use the custom Axios baseQuery
  endpoints: (builder) => ({
    // Define your endpoints here
    getProducts: builder.query<IResponse<IProduct>, void>({
      query: () => ({ url: '/products', method: 'GET' }), // API endpoint
    }),
  }),
});

// Export auto-generated hooks for usage in components
export const { useGetProductsQuery } = productApi;
