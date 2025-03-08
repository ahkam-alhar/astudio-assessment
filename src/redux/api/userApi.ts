// api/userApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../utils/apiUtils';
import { IUserResponse } from '../../types/user.types';
import { FilterParams } from '../../types/common.types';

export const userApi = createApi({
  reducerPath: 'userApi', // Unique key for the reducer
  baseQuery: axiosBaseQuery(), // Use the custom Axios baseQuery
  endpoints: (builder) => ({
    // Define your endpoints here
    getUsers: builder.query<IUserResponse, FilterParams>({
      query: (params) => ({ url: '/users', method: 'GET', params }), // API endpoint
    }),
  }),
});

// Export auto-generated hooks for usage in components
export const { useGetUsersQuery } = userApi;
