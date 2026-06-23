import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../../entities/user/model/userSlice";
import modalReducer from "./slices/ModalSlice";
import bookReducer from "../../entities/book/model/bookSlice";
import libraryCardReducer from "../../entities/library-card/model/libraryCardSlice";


export const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalReducer,
    book: bookReducer,
    libraryCard: libraryCardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
