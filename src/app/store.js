import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import dataReducer from "../features/dataSlice";
import uiReducer from "../features/uiSlice";
import { api } from "./api";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    data: dataReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
