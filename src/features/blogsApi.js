import { api } from "../app/api";

export const blogsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all blogs
    getAllBlogs: builder.query({
      query: ({ limit = 20, offset = 0, sort = "ASC", sortBy = "id" } = {}) => ({
        url: "/api/v1/blogs",
        params: { limit, offset, sort, sortBy },
      }),
      transformResponse: (response) => response.data || response,
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "Blog", id: item.id })),
              { type: "Blog", id: "LIST" },
            ]
          : [{ type: "Blog", id: "LIST" }],
    }),

    // Get blog by ID
    getBlogById: builder.query({
      query: (id) => `/api/v1/blogs/${id}`,
      providesTags: (result, error, id) => [{ type: "Blog", id }],
    }),

    // Create new blog
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: "/api/v1/blogs",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: [{ type: "Blog", id: "LIST" }],
    }),

    // Update blog
    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/v1/blogs/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Blog", id },
        { type: "Blog", id: "LIST" },
      ],
    }),

    // Delete blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/api/v1/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Blog", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;
