import { api } from "../app/api";

export const projectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all projects with pagination and filters
    getAllProjects: builder.query({
      query: ({ limit = 20, offset = 0, sort = "ASC", sortBy = "id" } = {}) => ({
        url: "/api/v1/projects",
        params: { limit, offset, sort, sortBy },
      }),
      transformResponse: (response) => response.data || response,
      providesTags: (result) =>
        result  
          ? [
              ...result.map((item) => ({ type: "Project", id: item.id })),
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
