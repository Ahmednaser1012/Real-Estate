import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDataItems: [],
  loading: true,
  totalCount: 0,
  currentPage: 1,
  searchFilters: {
    city: "",
    area: "",
    projectType: "",
    propertyType: "",
    priceMin: "",
    priceMax: "",
    areaMin: "",
    areaMax: "",
    noOfRooms: "",
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getCurrentItems: (state, action) => {
      state.currentDataItems = action.payload;
    },

    setIsLoading: (state, action) => {
      state.loading = action.payload;
    },

    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setSearchFilters: (state, action) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
      state.currentPage = 1; // Reset to first page when filters change
    },

    clearSearchFilters: (state) => {
      state.searchFilters = {
        city: "",
        area: "",
        projectType: "",
        propertyType: "",
        priceMin: "",
        priceMax: "",
        areaMin: "",
        areaMax: "",
        noOfRooms: "",
      };
      state.currentPage = 1;
    },
  },
});

export default dataSlice.reducer;

export const dataStore = (state) => state.data;

export const { 
  getCurrentItems, 
  setIsLoading, 
  setTotalCount, 
  setCurrentPage,
  setSearchFilters,
  clearSearchFilters 
} = dataSlice.actions;
