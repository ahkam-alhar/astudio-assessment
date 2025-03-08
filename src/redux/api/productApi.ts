// api/userApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../utils/apiUtils';
import {
  IProductResponse,
  ProductFilterParams,
} from '../../types/product.types';

export const productApi = createApi({
  reducerPath: 'productApi', // Unique key for the reducer
  baseQuery: axiosBaseQuery(), // Use the custom Axios baseQuery
  endpoints: (builder) => ({
    // Define your endpoints here
    getProducts: builder.query<IProductResponse, ProductFilterParams>({
      query: (params) => {
        if (params.category && params.category !== 'All') {
          return {
            url: `/products/category/${params.category}`,
            method: 'GET',
            params: {
              limit: params.limit,
              select: params.select,
              skip: params.skip,
            },
          };
        }

        return {
          url: '/products',
          method: 'GET',
          params,
        };
      }, // API endpoint
    }),
    getGategories: builder.query<string[], void>({
      query: (params) => ({
        url: '/products/category-list',
        method: 'GET',
        params,
      }), // API endpoint
    }),
  }),
});

// Export auto-generated hooks for usage in components
export const { useGetProductsQuery, useGetGategoriesQuery } = productApi;
