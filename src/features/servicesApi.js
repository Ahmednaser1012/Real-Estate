import { api } from "../app/api";

export const servicesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all services with pagination and filters
    getAllServices: builder.query({
      query: ({
        limit = 20,
        offset = 0,
        sort = "ASC",
        sortBy = "id",
      } = {}) => ({
        url: "/api/v1/services",
        params: { limit, offset, sort, sortBy },
      }),
      transformResponse: (response) => response.data || response,
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "Service", id: item.id })),
              { type: "Service", id: "LIST" },
            ]
          : [{ type: "Service", id: "LIST" }],
    }),

    // Get service by ID
    getServiceById: builder.query({
      query: (id) => `/api/v1/services/${id}`,
      providesTags: (result, error, id) => [{ type: "Service", id }],
    }),

    // Create new service
    createService: builder.mutation({
      query: (serviceData) => {
        // If serviceData is FormData, send it directly
        if (serviceData instanceof FormData) {
          return {
            url: "/api/v1/services",
            method: "POST",
            body: serviceData,
            formData: true,
          };
        }
        // Otherwise, send as JSON
        return {
          url: "/api/v1/services",
          method: "POST",
          body: serviceData,
        };
      },
      invalidatesTags: [{ type: "Service", id: "LIST" }],
    }),

    // Update service
    updateService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/v1/services/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Service", id },
        { type: "Service", id: "LIST" },
      ],
    }),

    // Delete service
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/api/v1/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Service", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
