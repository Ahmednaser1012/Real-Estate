import { api } from "../app/api";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Admin Authentication
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // Admin Dashboard Stats
    getDashboardStats: builder.query({
      query: () => "/admin/dashboard/stats",
      providesTags: ["Admin"],
    }),

    // Clients Management
    getAdminClients: builder.query({
      query: ({ page = 1, limit = 10, search } = {}) => ({
        url: "/admin/clients",
        params: { page, limit, search },
      }),
      providesTags: ["User"],
    }),

    // Reports
    getReports: builder.query({
      query: ({ type, startDate, endDate } = {}) => ({
        url: "/admin/reports",
        params: { type, startDate, endDate },
      }),
      providesTags: ["Admin"],
    }),

    // Settings
    getAdminSettings: builder.query({
      query: () => "/admin/settings",
      providesTags: ["Admin"],
    }),

    updateAdminSettings: builder.mutation({
      query: (settings) => ({
        url: "/admin/settings",
        method: "PUT",
        body: settings,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetDashboardStatsQuery,
  useGetAdminClientsQuery,
  useGetReportsQuery,
  useGetAdminSettingsQuery,
  useUpdateAdminSettingsMutation,
} = adminApi;