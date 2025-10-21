import { api } from "../app/api";

export const projectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all projects with pagination and filters
    getAllProjects: builder.query({
      query: ({
        limit = 20,
        offset = 0,
        sort = "ASC",
        sortBy = "id",
        city = "",
        area = "",
        projectType = "",
        propertyType = "",
        priceMin = "",
        priceMax = "",
        areaMin = "",
        areaMax = "",
        noOfRooms = "",
      } = {}) => {
        const params = { limit, offset, sort, sortBy };

        // Send filter parameters directly as query parameters
        // Backend's BaseGetRequestValidator.validated() will automatically
        // extract all non-base parameters into a 'filters' array
        if (city) params.city = city;
        if (area) params.area = area;
        if (projectType) params.projectType = projectType;
        if (propertyType) params.propertyType = propertyType;
        if (priceMin) params.priceMin = priceMin;
        if (priceMax) params.priceMax = priceMax;
        if (areaMin) params.areaMin = areaMin;
        if (areaMax) params.areaMax = areaMax;
        if (noOfRooms) params.noOfRooms = noOfRooms;

        return {
          url: "/api/v1/projects",
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
              ...result.data.map((item) => ({ type: "Project", id: item.id })),
              { type: "Project", id: "LIST" },
            ]
          : [{ type: "Project", id: "LIST" }],
    }),

    // Get project by ID
    getProjectById: builder.query({
      query: (id) => `/api/v1/projects/${id}`,
      transformResponse: (response) => response.data || response,
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),

    // Create new project
    createProject: builder.mutation({
      query: (projectData) => ({
        url: "/api/v1/projects",
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),

    // Update project
    updateProject: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/v1/projects/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Project", id },
        { type: "Project", id: "LIST" },
      ],
    }),

    // Delete project
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/api/v1/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
