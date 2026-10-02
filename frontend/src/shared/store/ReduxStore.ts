import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/ModalSlice";
import { baseApi } from "../api/baseApi";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
