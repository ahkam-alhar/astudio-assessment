// api/userApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../utils/apiUtils';
import { IUserResponse, UserFilterParams } from '../../types/user.types';

export const userApi = createApi({
  reducerPath: 'userApi', // Unique key for the reducer
  baseQuery: axiosBaseQuery(), // Use the custom Axios baseQuery
  endpoints: (builder) => ({
    // Define your endpoints here
    getUsers: builder.query<IUserResponse, UserFilterParams>({
      query: (params) => {
        if (params.key !== '') {
          return {
            url: '/users/filter',
            method: 'GET',
            params,
          };
        }

        return { url: '/users', method: 'GET', params };
      }, // API endpoint
    }),
  }),
});

// Export auto-generated hooks for usage in components
export const { useGetUsersQuery } = userApi;
