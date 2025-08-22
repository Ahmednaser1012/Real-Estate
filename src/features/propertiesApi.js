import { api } from "../app/api";

export const propertiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: (params) => ({ url: "/api/properties", params }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "Property", id: item.id })),
              { type: "Property", id: "LIST" },
            ]
          : [{ type: "Property", id: "LIST" }],
    }),
    getPropertyById: builder.query({
      query: (id) => `/api/properties/${id}`,
      providesTags: (result, error, id) => [{ type: "Property", id }],
    }),
    createProperty: builder.mutation({
      query: (body) => ({
        url: "/api/properties",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Property", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPropertiesQuery,
  useGetPropertyByIdQuery,
  useCreatePropertyMutation,
} = propertiesApi;
