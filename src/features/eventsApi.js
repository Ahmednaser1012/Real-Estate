import { api } from "../app/api";

export const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all events
    getAllEvents: builder.query({
      query: ({ limit = 20, offset = 0, sort = "ASC", sortBy = "id" } = {}) => ({
        url: "/api/v1/events",
        params: { limit, offset, sort, sortBy },
      }),
      transformResponse: (response) => response.data || response,
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "Event", id: item.id })),
              { type: "Event", id: "LIST" },
            ]
          : [{ type: "Event", id: "LIST" }],
    }),

    // Get event by ID
    getEventById: builder.query({
      query: (id) => `/api/v1/events/${id}`,
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),

    // Create new event
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: "/api/v1/events",
        method: "POST",
        body: eventData,
      }),
      invalidatesTags: [{ type: "Event", id: "LIST" }],
    }),

    // Update event
    updateEvent: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/v1/events/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Event", id },
        { type: "Event", id: "LIST" },
      ],
    }),

    // Delete event
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/api/v1/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Event", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
