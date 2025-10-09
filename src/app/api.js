import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base API slice using RTK Query
// - baseUrl: set via REACT_APP_API_URL or fallback to localhost
// - credentials: include (send cookies) — adjust if not needed
// - prepareHeaders: attach Authorization header if a token exists
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:8000",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["Property", "Feed", "User"],
  endpoints: () => ({}),
});
