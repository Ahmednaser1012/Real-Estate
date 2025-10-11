import { api } from "../app/api";

export const locationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ============ CITIES ============

    // Get all cities with pagination and filters
    getAllCities: builder.query({
      query: ({
        limit = 20,
        offset = 0,
        sort = "ASC",
        sortBy = "id",
      } = {}) => ({
        url: "/api/v1/locations/cities",
        params: { limit, offset, sort, sortBy },
      }),
      transformResponse: (response) => response.data || response,
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "City", id: item.id })),
              { type: "City", id: "LIST" },
            ]
          : [{ type: "City", id: "LIST" }],
    }),

    // Get city by ID
    getCityById: builder.query({
      query: (id) => `/api/v1/locations/cities/${id}`,
      providesTags: (result, error, id) => [{ type: "City", id }],
    }),

    // Create new city
    createCity: builder.mutation({
      query: (cityData) => ({
        url: "/api/v1/locations/cities",
        method: "POST",
        body: cityData,
      }),
      invalidatesTags: [{ type: "City", id: "LIST" }],
    }),

    // Update city
    updateCity: builder.mutation({
      query: ({ id, ...cityData }) => ({
        url: `/api/v1/locations/cities/${id}`,
        method: "POST",
        body: cityData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "City", id },
        { type: "City", id: "LIST" },
      ],
    }),

    // Delete city
    deleteCity: builder.mutation({
      query: (id) => ({
        url: `/api/v1/locations/cities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "City", id: "LIST" }],
    }),

    // ============ AREAS ============

    // Get all areas with pagination and filters
    getAllAreas: builder.query({
      query: ({
        cityId,
        limit = 100,
        offset = 0,
        sort = "ASC",
        sortBy = "id",
      } = {}) => ({
        url: "/api/v1/locations/areas",
        params: {
          ...(cityId && { city_id: cityId }),
          limit,
          offset,
          sort,
          sortBy,
        },
      }),
      transformResponse: (response) => response.data || response,
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "Area", id: item.id })),
              { type: "Area", id: "LIST" },
            ]
          : [{ type: "Area", id: "LIST" }],
    }),

    // Get areas by city ID
    getAreasByCity: builder.query({
      query: ({
        cityId,
        limit = 100,
        offset = 0,
        sort = "ASC",
        sortBy = "id",
      }) => ({
        url: "/api/v1/locations/areas",
        params: { city_id: cityId, limit, offset, sort, sortBy },
      }),
      transformResponse: (response) => response.data || response,
      providesTags: (result, error, { cityId }) => [
        { type: "Area", id: `CITY-${cityId}` },
      ],
    }),

    // Get area by ID
    getAreaById: builder.query({
      query: (id) => `/api/v1/locations/areas/${id}`,
      providesTags: (result, error, id) => [{ type: "Area", id }],
    }),

    // Create new area
    createArea: builder.mutation({
      query: (areaData) => ({
        url: "/api/v1/locations/areas",
        method: "POST",
        body: areaData,
      }),
      invalidatesTags: [{ type: "Area", id: "LIST" }],
    }),

    // Update area
    updateArea: builder.mutation({
      query: ({ id, ...areaData }) => ({
        url: `/api/v1/locations/areas/${id}`,
        method: "POST",
        body: areaData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Area", id },
        { type: "Area", id: "LIST" },
      ],
    }),

    // Delete area
    deleteArea: builder.mutation({
      query: (id) => ({
        url: `/api/v1/locations/areas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Area", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  // Cities
  useGetAllCitiesQuery,
  useGetCityByIdQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,

  // Areas
  useGetAllAreasQuery,
  useGetAreasByCityQuery,
  useGetAreaByIdQuery,
  useCreateAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} = locationsApi;
