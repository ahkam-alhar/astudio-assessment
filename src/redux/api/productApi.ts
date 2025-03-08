// api/userApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../utils/apiUtils';
import { IProductResponse } from '../../types/product.types';
import { FilterParams } from '../../types/common.types';

export const productApi = createApi({
  reducerPath: 'productApi', // Unique key for the reducer
  baseQuery: axiosBaseQuery(), // Use the custom Axios baseQuery
  endpoints: (builder) => ({
    // Define your endpoints here
    getProducts: builder.query<IProductResponse, FilterParams>({
      query: (params) => ({ url: '/products', method: 'GET', params }), // API endpoint
    }),
  }),
});

// Export auto-generated hooks for usage in components
export const { useGetProductsQuery } = productApi;
