import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  FetchUserPayload,
  LoginUserPayload,
  RegisterUserPayload,
  User,
} from "../../models/User";
import {
  fetchUserApi,
  getLibraryCardApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
} from "../../api/authApi";

interface AuthenticationSliceState {
  loggedInUser?: User;
  profileUser?: User;
  libraryCard: string;
  loading: boolean;
  error: boolean;
  registerSuccess: boolean;
}

const initialState: AuthenticationSliceState = {
  loggedInUser: undefined,
  profileUser: undefined,
  libraryCard: "",
  loading: false,
  error: false,
  registerSuccess: false,
};

type ResettableKeys = keyof AuthenticationSliceState;

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginUserPayload, thunkAPI) => {
    try {
      return await loginUserApi(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: RegisterUserPayload, thunkAPI) => {
    try {
      await registerUserApi(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetch",
  async (payload: FetchUserPayload, thunkAPI) => {
    try {
      return await fetchUserApi(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update",
  async (payload: User, thunkAPI) => {
    try {
      return await updateUserApi(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getLibraryCard = createAsyncThunk(
  "auth/librarycard",
  async (userId: string, thunkAPI) => {
    try {
      return await getLibraryCardApi(userId);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetRegisterSuccess(state) {
      state.registerSuccess = false;
    },
    resetUser(state, action: PayloadAction<ResettableKeys>) {
      const key = action.payload;
      (state[key] as AuthenticationSliceState[typeof key] | undefined) =
        undefined;
    },
  },
  extraReducers: (builder) => {
    const setPending = (state: AuthenticationSliceState) => {
      state.loading = true;
      state.error = false;
    };

    const setRejected = (state: AuthenticationSliceState) => {
      state.loading = false;
      state.error = true;
    };

    builder
      .addCase(loginUser.pending, setPending)
      .addCase(registerUser.pending, setPending)
      .addCase(fetchUser.pending, setPending)
      .addCase(updateUser.pending, setPending)
      .addCase(getLibraryCard.pending, setPending)

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registerSuccess = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        const key = action.payload.property as ResettableKeys;
        (state[key] as AuthenticationSliceState[typeof key]) =
          action.payload.user;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
        state.profileUser = action.payload;
      })
      .addCase(getLibraryCard.fulfilled, (state, action) => {
        state.loading = false;
        state.libraryCard = action.payload;
      })

      .addCase(loginUser.rejected, setRejected)
      .addCase(registerUser.rejected, setRejected)
      .addCase(fetchUser.rejected, setRejected)
      .addCase(updateUser.rejected, setRejected)
      .addCase(getLibraryCard.rejected, setRejected);
  },
});

export const { resetRegisterSuccess, resetUser } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
