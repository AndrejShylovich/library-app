import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
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
  error: boolean;
  registerSuccess: boolean;
  updateSuccess: boolean;
}

const initialState: AuthenticationSliceState = {
  loggedInUser: undefined,
  profileUser: undefined,
  libraryCard: "",
  loading: false,
  error: false,
  registerSuccess: false,
  updateSuccess: false,
};

type ResettableKeys = keyof AuthenticationSliceState;

export const loginUser = createAsyncThunk<UserDto, LoginUserDto>(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      return await loginUserApi(payload); 
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const registerUser = createAsyncThunk<void, RegisterUserDto>(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      await registerUserApi(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const fetchUser = createAsyncThunk<
  { user: UserDto; property: FetchUserDto["property"] },
  FetchUserDto
>("auth/fetch", async (payload, thunkAPI) => {
  try {
    return await fetchUserApi(payload); 
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const updateUser = createAsyncThunk<UserDto, UserDto>(
  "auth/update",
  async (payload, thunkAPI) => {
    try {
      return await updateUserApi(payload); 
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const getLibraryCard = createAsyncThunk<string, string>(
  "auth/librarycard",
  async (userId, thunkAPI) => {
    try {
      return await getLibraryCardApi(userId);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
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
    resetUser(state, action: PayloadAction<ResettableKeys>) {
      const key = action.payload;
      (state[key] as AuthenticationSliceState[typeof key] | undefined) =
        undefined;
    },
    resetUpdateSuccess(state) {
      state.updateSuccess = false;
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
        state.profileUser = action.payload; 
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
        state.updateSuccess = true;
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

export const { resetRegisterSuccess, resetUser, resetUpdateSuccess } = authenticationSlice.actions;

export default authenticationSlice.reducer;
