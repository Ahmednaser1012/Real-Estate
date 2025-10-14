import { api } from "../app/api";

export const clientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all blogs
    getAllClients: builder.query({
      query: ({ limit = 20, offset = 0, sort = "ASC", sortBy = "id" } = {}) => ({
        url: "/api/v1/clients",
        params: { limit, offset, sort, sortBy },
      }),
      transformResponse: (response) => response.data || response,
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "Client", id: item.id })),
              { type: "Client", id: "LIST" },
            ]
          : [{ type: "Client", id: "LIST" }],
    }),

    // Get blog by ID
    getClientById: builder.query({
      query: (id) => `/api/v1/clients/${id}`,
      providesTags: (result, error, id) => [{ type: "Client", id }],
    }),

    // Create new blog
    createClient: builder.mutation({
      query: (clientData) => ({
        url: "/api/v1/clients",
        method: "POST",
        body: clientData,
      }),
      invalidatesTags: [{ type: "Client", id: "LIST" }],
    }),

    // Update blog
    updateClient: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/v1/clients/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Client", id },
        { type: "Client", id: "LIST" },
      ],
    }),

    // Delete blog
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/api/v1/clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Client", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi;
