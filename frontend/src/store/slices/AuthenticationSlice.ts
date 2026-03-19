import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
  isAnyOf,
} from "@reduxjs/toolkit";

import type {
  UserDto,
  LoginUserDto,
  RegisterUserDto,
  FetchUserDto,
} from "../../models/dto/UserDto";

import {
  loginUserApi,
  registerUserApi,
  fetchUserApi,
  updateUserApi,
  getLibraryCardApi,
} from "../../api/authApi";

interface AuthenticationSliceState {
  loggedInUser?: UserDto;
  profileUser?: UserDto;
  libraryCard: string;
  loading: boolean;
  error: string | null;
  registerSuccess: boolean;
  updateSuccess: boolean;
}

const initialState: AuthenticationSliceState = {
  loggedInUser: undefined,
  profileUser: undefined,
  libraryCard: "",
  loading: false,
  error: null,
  registerSuccess: false,
  updateSuccess: false,
};

const handleThunkError = (e: unknown): string => {
  if (e instanceof Error) return e.message;
  return "Unknown error";
};

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  rejectValue: string;
}>();

export const loginUser = createAppAsyncThunk<UserDto, LoginUserDto>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      return await loginUserApi(payload);
    } catch (e) {
      return rejectWithValue(handleThunkError(e));
    }
  },
);

export const registerUser = createAppAsyncThunk<void, RegisterUserDto>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      await registerUserApi(payload);
    } catch (e) {
      return rejectWithValue(handleThunkError(e));
    }
  },
);

export const fetchUser = createAppAsyncThunk<
  { user: UserDto; property: FetchUserDto["property"] },
  FetchUserDto
>("auth/fetch", async (payload, { rejectWithValue }) => {
  try {
    return await fetchUserApi(payload);
  } catch (e) {
    return rejectWithValue(handleThunkError(e));
  }
});

export const updateUser = createAppAsyncThunk<UserDto, UserDto>(
  "auth/update",
  async (payload, { rejectWithValue }) => {
    try {
      return await updateUserApi(payload);
    } catch (e) {
      return rejectWithValue(handleThunkError(e));
    }
  },
);

export const getLibraryCard = createAppAsyncThunk<string, string>(
  "auth/librarycard",
  async (userId, { rejectWithValue }) => {
    try {
      return await getLibraryCardApi(userId);
    } catch (e) {
      return rejectWithValue(handleThunkError(e));
    }
  },
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetRegisterSuccess(state) {
      state.registerSuccess = false;
    },
    resetUpdateSuccess(state) {
      state.updateSuccess = false;
    },
    resetUser(state, action: PayloadAction<"loggedInUser" | "profileUser">) {
      state[action.payload] = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
      state.profileUser = action.payload;
    });

    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.registerSuccess = true;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state[action.payload.property] = action.payload.user;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
      state.profileUser = action.payload;
      state.updateSuccess = true;
    });

    builder.addCase(getLibraryCard.fulfilled, (state, action) => {
      state.loading = false;
      state.libraryCard = action.payload;
    });

    builder.addMatcher(
      isAnyOf(
        loginUser.pending,
        registerUser.pending,
        fetchUser.pending,
        updateUser.pending,
        getLibraryCard.pending,
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      },
    );

    builder.addMatcher(
      isAnyOf(
        loginUser.rejected,
        registerUser.rejected,
        fetchUser.rejected,
        updateUser.rejected,
        getLibraryCard.rejected,
      ),
      (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Request failed";
      },
    );
  },
});

export const { resetRegisterSuccess, resetUser, resetUpdateSuccess } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
