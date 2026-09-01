import { baseApi } from '../../api/baseApi';

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, value);
          }
        });
        const queryString = queryParams.toString();
        return {
          url: `/events${queryString ? `?${queryString}` : ''}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id, _id }) => ({ type: 'Events', id: id || _id })),
              { type: 'Events', id: 'LIST' },
            ]
          : [{ type: 'Events', id: 'LIST' }],
    }),

    getSingleEvent: builder.query({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Event', id }],
    }),

    getFeaturedEvents: builder.query({
      query: () => ({
        url: '/events/featured',
        method: 'GET',
      }),
      providesTags: [{ type: 'Events', id: 'FEATURED' }],
    }),

    getEventCategories: builder.query({
      query: () => ({
        url: '/events/categories',
        method: 'GET',
      }),
      providesTags: [{ type: 'Events', id: 'CATEGORIES' }],
    }),

    getEventDepartments: builder.query({
      query: () => ({
        url: '/events/departments',
        method: 'GET',
      }),
      providesTags: [{ type: 'Events', id: 'DEPARTMENTS' }],
    }),

    getEventStats: builder.query({
      query: () => ({
        url: '/events/stats',
        method: 'GET',
      }),
      providesTags: ['EventStats'],
    }),

    createEvent: builder.mutation({
      query: (eventData) => ({
        url: '/events',
        method: 'POST',
        body: eventData,
      }),
      invalidatesTags: [
        { type: 'Events', id: 'LIST' },
        { type: 'Events', id: 'FEATURED' },
        'EventStats',
      ],
    }),

    updateEvent: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/events/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Event', id },
        { type: 'Events', id: 'LIST' },
        { type: 'Events', id: 'FEATURED' },
        'EventStats',
      ],
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'Events', id: 'LIST' },
        { type: 'Events', id: 'FEATURED' },
        'EventStats',
      ],
    }),

    registerForEvent: builder.mutation({
      query: ({ id, ...participantData }) => ({
        url: `/events/${id}/register`,
        method: 'POST',
        body: participantData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Event', id },
        { type: 'Events', id: 'LIST' },
        'EventStats',
      ],
    }),

    seedEvents: builder.mutation({
      query: (overwrite = false) => ({
        url: `/events/seed${overwrite ? '?overwrite=true' : ''}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Events', id: 'LIST' }, 'EventStats'],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetSingleEventQuery,
  useGetFeaturedEventsQuery,
  useGetEventCategoriesQuery,
  useGetEventDepartmentsQuery,
  useGetEventStatsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useRegisterForEventMutation,
  useSeedEventsMutation,
} = eventsApi;
