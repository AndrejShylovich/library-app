import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { createLibraryCardApi } from "../api/libraryCardApi";

interface LibraryCardState {
  libraryCard: string;
  loading: boolean;
  error: string | null;
}

const initialState: LibraryCardState = {
  libraryCard: "",
  loading: false,
  error: null,
};

const handleThunkError = (e: unknown): string => {
  if (e instanceof Error) return e.message;
  return "Unknown error";
};

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  rejectValue: string;
}>();

export const getLibraryCard = createAppAsyncThunk<string, string>(
  "libraryCard/get",
  async (userId, { rejectWithValue }) => {
    try {
      return await createLibraryCardApi(userId);
    } catch (e) {
      return rejectWithValue(handleThunkError(e));
    }
  },
);

export const libraryCardSlice = createSlice({
  name: "libraryCard",
  initialState,
  reducers: {
    resetLibraryCard(state) {
      state.libraryCard = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLibraryCard.fulfilled, (state, action) => {
      state.loading = false;
      state.libraryCard = action.payload;
    });

    builder.addMatcher(isAnyOf(getLibraryCard.pending), (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addMatcher(isAnyOf(getLibraryCard.rejected), (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Request failed";
    });
  },
});

export const { resetLibraryCard } = libraryCardSlice.actions;

export default libraryCardSlice.reducer;