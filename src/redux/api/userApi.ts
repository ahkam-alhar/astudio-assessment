// api/userApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../utils/apiUtils';
import { IResponse } from '../../types/common.types';
import { IUser } from '../../types/user.types';

export const userApi = createApi({
  reducerPath: 'userApi', // Unique key for the reducer
  baseQuery: axiosBaseQuery(), // Use the custom Axios baseQuery
  endpoints: (builder) => ({
    // Define your endpoints here
    getUsers: builder.query<IResponse<IUser>, void>({
      query: () => ({ url: '/users', method: 'GET' }), // API endpoint
    }),
  }),
});

// Export auto-generated hooks for usage in components
export const { useGetUsersQuery } = userApi;
