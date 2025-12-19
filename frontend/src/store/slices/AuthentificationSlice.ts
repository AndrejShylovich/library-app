import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FetchUserPayload, LoginUserPayload, RegisterUserPayload, User } from "../../models/User";
import axios from "axios";

interface AuthentificationSliceState {
  loggedInUser?: User;
  profileUser?: User;
  libraryCard: string;
  loading: boolean;
  error: boolean;
  registerSuccess: boolean;
}

const initialState: AuthentificationSliceState = {
  loggedInUser: undefined,
  profileUser: undefined,
  libraryCard: "",
  loading: false,
  error: false,
  registerSuccess: false,
};

// -------------------- Async Thunks --------------------

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user: LoginUserPayload, thunkAPI) => {
    try {
      const req = await axios.post("http://localhost:8000/auth/login", user);
      return req.data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: RegisterUserPayload, thunkAPI) => {
    try {
      const req = await axios.post("http://localhost:8000/auth/register", user);
      return req.data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetch",
  async (payload: FetchUserPayload, thunkAPI) => {
    try {
      const req = await axios.get(`http://localhost:8000/users/${payload.userId}`);
      return { user: req.data.user, property: payload.property };
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update",
  async (payload: User, thunkAPI) => {
    try {
      const req = await axios.put("http://localhost:8000/users/", payload);
      return req.data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getLibraryCard = createAsyncThunk(
  "auth/librarycard",
  async (userId: string, thunkAPI) => {
    try {
      const req = await axios.post("http://localhost:8000/card/", { user: userId });
      return req.data.libraryCard._id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// -------------------- Slice --------------------

type ResettableKeys = keyof AuthentificationSliceState;

export const AuthentificationSlice = createSlice({
  name: "authentification",
  initialState,
  reducers: {
    resetRegisterSuccess(state) {
      state.registerSuccess = false;
    },
    resetUser(state, action: PayloadAction<ResettableKeys>) {
      const key = action.payload;
      // Уточняем тип для безопасного присвоения undefined
      (state[key] as AuthentificationSliceState[typeof key] | undefined) = undefined;
    },
  },
  extraReducers: (builder) => {
    // Общие функции для pending/rejected
    const setPending = (state: AuthentificationSliceState) => {
      state.loading = true;
      state.error = false;
    };
    const setRejected = (state: AuthentificationSliceState) => {
      state.loading = false;
      state.error = true;
    };

    builder
      // -------------------- Pending --------------------
      .addCase(loginUser.pending, setPending)
      .addCase(registerUser.pending, setPending)
      .addCase(fetchUser.pending, setPending)
      .addCase(updateUser.pending, setPending)
      .addCase(getLibraryCard.pending, setPending)

      // -------------------- Fulfilled --------------------
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
        (state[key] as AuthentificationSliceState[typeof key]) = action.payload.user;
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

      // -------------------- Rejected --------------------
      .addCase(loginUser.rejected, setRejected)
      .addCase(registerUser.rejected, setRejected)
      .addCase(fetchUser.rejected, setRejected)
      .addCase(updateUser.rejected, setRejected)
      .addCase(getLibraryCard.rejected, setRejected);
  },
});

export const { resetRegisterSuccess, resetUser } = AuthentificationSlice.actions;

export default AuthentificationSlice.reducer;
