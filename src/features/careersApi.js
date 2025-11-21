import { api } from "../app/api";

export const careersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all careers
    getAllCareers: builder.query({
      query: ({ limit = 20, offset = 0, sort = "ASC", sortBy = "id" } = {}) => ({
        url: "/api/v1/careers",
        params: { limit, offset, sort, sortBy },
      }),
      transformResponse: (response) => response.data || response,
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "Career", id: item.id })),
              { type: "Career", id: "LIST" },
            ]
          : [{ type: "Career", id: "LIST" }],
    }),

    // Get career by ID
    getCareerById: builder.query({
      query: (id) => `/api/v1/careers/${id}`,
      providesTags: (result, error, id) => [{ type: "Career", id }],
    }),

    // Create new career
    createCareer: builder.mutation({
      query: (careerData) => ({
        url: "/api/v1/careers",
        method: "POST",
        body: careerData,
      }),
      invalidatesTags: [{ type: "Career", id: "LIST" }],
    }),

    // Update career
    updateCareer: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/v1/careers/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Career", id },
        { type: "Career", id: "LIST" },
      ],
    }),

    // Delete career
    deleteCareer: builder.mutation({
      query: (id) => ({
        url: `/api/v1/careers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Career", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCareersQuery,
  useGetCareerByIdQuery,
  useCreateCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation,
} = careersApi;
