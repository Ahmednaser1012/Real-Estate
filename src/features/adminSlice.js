import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem('adminLoggedIn') === 'true',
  adminEmail: localStorage.getItem('adminEmail') || '',
  activeTab: 'properties',
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.adminEmail = action.payload.email;
      state.error = null;
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminEmail', action.payload.email);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.adminEmail = '';
      state.activeTab = 'properties';
      state.error = null;
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminEmail');
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export default adminSlice.reducer;

export const adminStore = (state) => state.admin;

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setActiveTab,
  clearError,
} = adminSlice.actions;