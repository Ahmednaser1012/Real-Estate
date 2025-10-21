import { api } from "../app/api";

export const propertiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProperties: builder.query({
      query: ({
        limit = 20,
        offset = 0,
        sort = "ASC",
        sortBy = "id",
        areaMin = "",
        areaMax = "",
        priceMin = "",
        priceMax = "",
        noOfRooms = "",
        noOfBathroomsMin = "",
        noOfBathroomsMax = "",
      } = {}) => {
        const params = { limit, offset, sort, sortBy };

        // Add property filters if provided
        if (areaMin) params.areaMin = areaMin;
        if (areaMax) params.areaMax = areaMax;
        if (priceMin) params.priceMin = priceMin;
        if (priceMax) params.priceMax = priceMax;
        if (noOfRooms) params.noOfRooms = noOfRooms;
        if (noOfBathroomsMin) params.noOfBathroomsMin = noOfBathroomsMin;
        if (noOfBathroomsMax) params.noOfBathroomsMax = noOfBathroomsMax;

        return {
          url: "/api/v1/properties",
          params,
        };
      },
      transformResponse: (response) => {
        // Return both data and count
        return {
          data: response.data || response,
          count: response.count || 0,
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((item) => ({ type: "Property", id: item.id })),
              { type: "Property", id: "LIST" },
            ]
          : [{ type: "Property", id: "LIST" }],
    }),
    getPropertyById: builder.query({
      query: (id) => `/api/v1/properties/${id}`,
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "Property", id }],
    }),
    createProperty: builder.mutation({
      query: (body) => ({
        url: "/api/v1/properties",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: [{ type: "Property", id: "LIST" }],
    }),
    updateProperty: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/v1/properties/${id}`,
        method: "POST",
        body: formData,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: "Property", id },
        { type: "Property", id: "LIST" },
      ],
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/api/v1/properties/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: [{ type: "Property", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllPropertiesQuery,
  useGetPropertyByIdQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertiesApi;
