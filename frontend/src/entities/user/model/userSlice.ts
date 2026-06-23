import {
  fetchUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
} from "../api/authApi";

import type {
  FetchUserDto,
  LoginUserDto,
  RegisterUserDto,
  UserDto,
} from "./dto/UserDto";

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
  isAnyOf,
} from "@reduxjs/toolkit";

interface AuthenticationSliceState {
  loggedInUser?: UserDto;
  profileUser?: UserDto;
  loading: boolean;
  error: string | null;
  registerSuccess: boolean;
  updateSuccess: boolean;
}

const initialState: AuthenticationSliceState = {
  loggedInUser: undefined,
  profileUser: undefined,
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

export const userSlice = createSlice({
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

    
    builder.addMatcher(
      isAnyOf(
        loginUser.pending,
        registerUser.pending,
        fetchUser.pending,
        updateUser.pending,
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
      ),
      (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Request failed";
      },
    );
  },
});

export const { resetRegisterSuccess, resetUser, resetUpdateSuccess } =
  userSlice.actions;

export default userSlice.reducer;
