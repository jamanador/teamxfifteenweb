import { baseApi } from '../../api/baseApi';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, value);
          }
        });
        const queryString = queryParams.toString();
        return {
          url: `/users${queryString ? `?${queryString}` : ''}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Users', id: _id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),

    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),

    getUserStats: builder.query({
      query: () => ({
        url: '/users/stats',
        method: 'GET',
      }),
      providesTags: ['UserStats'],
    }),

    createAdmin: builder.mutation({
      query: (adminData) => ({
        url: '/users/admin',
        method: 'POST',
        body: adminData,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }, 'UserStats'],
    }),

    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Users', id },
        { type: 'Users', id: 'LIST' },
        'UserStats',
      ],
    }),

    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Users', id },
        { type: 'Users', id: 'LIST' },
        'UserStats',
      ],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Users', id },
        { type: 'Users', id: 'LIST' },
      ],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }, 'UserStats'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGetUserStatsQuery,
  useCreateAdminMutation,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
