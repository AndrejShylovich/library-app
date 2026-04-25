import { describe, it, expect, beforeEach, vi } from "vitest";
import type { MockedFunction } from "vitest";

import {
  loginUser,
  registerUser,
  fetchUser,
  updateUser,
  getLibraryCard,
} from "./AuthenticationSlice";

import * as api from "../../api/authApi";
import type {
  UserDto,
  LoginUserDto,
  RegisterUserDto,
} from "../../models/dto/UserDto";

vi.mock("../../api/authApi");

const mockedLoginUserApi = api.loginUserApi as MockedFunction<
  typeof api.loginUserApi
>;
const mockedRegisterUserApi = api.registerUserApi as MockedFunction<
  typeof api.registerUserApi
>;
const mockedFetchUserApi = api.fetchUserApi as MockedFunction<
  typeof api.fetchUserApi
>;
const mockedUpdateUserApi = api.updateUserApi as MockedFunction<
  typeof api.updateUserApi
>;
const mockedGetLibraryCardApi = api.getLibraryCardApi as MockedFunction<
  typeof api.getLibraryCardApi
>;

describe("authenticationSlice async thunks", () => {
  const fakeUser: UserDto = {
    _id: "1",
    type: "PATRON",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    password: "123",
  };

  const fakeLoginUser: LoginUserDto = {
    email: fakeUser.email,
    password: "123",
  };

  const fakeRegisterUser: RegisterUserDto = {
    type: fakeUser.type,
    firstName: fakeUser.firstName,
    lastName: fakeUser.lastName,
    email: fakeUser.email,
    password: "123",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loginUser → fulfilled", async () => {
    mockedLoginUserApi.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();
    const thunk = loginUser(fakeLoginUser);

    await thunk(dispatch, () => ({}), undefined);

    expect(mockedLoginUserApi).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/login/fulfilled",
        payload: fakeUser,
      }),
    );
  });

  it("loginUser → rejected", async () => {
    mockedLoginUserApi.mockRejectedValue(new Error("Login failed"));

    const dispatch = vi.fn();
    const thunk = loginUser(fakeLoginUser);

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "auth/login/rejected" }),
    );
  });

  it("updateUser → fulfilled", async () => {
    mockedUpdateUserApi.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();
    const thunk = updateUser(fakeUser);

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/update/fulfilled",
        payload: fakeUser,
      }),
    );
  });

  it("registerUser → rejected", async () => {
    mockedRegisterUserApi.mockRejectedValue(new Error("Register failed"));

    const dispatch = vi.fn();
    const thunk = registerUser(fakeRegisterUser);

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "auth/register/rejected" }),
    );
  });

  it("fetchUser → fulfilled", async () => {
    mockedFetchUserApi.mockResolvedValue({
      user: fakeUser,
      property: "profileUser",
    });

    const dispatch = vi.fn();
    const thunk = fetchUser({ userId: fakeUser._id, property: "profileUser" });

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/fetch/fulfilled",
        payload: { user: fakeUser, property: "profileUser" },
      }),
    );
  });

  it("fetchUser → rejected", async () => {
    mockedFetchUserApi.mockRejectedValue(new Error("Fetch failed"));

    const dispatch = vi.fn();
    const thunk = fetchUser({ userId: fakeUser._id, property: "profileUser" });

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "auth/fetch/rejected" }),
    );
  });

  it("updateUser → fulfilled", async () => {
    mockedUpdateUserApi.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();
    const thunk = updateUser(fakeUser);

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/update/fulfilled",
        payload: fakeUser,
      }),
    );
  });

  it("updateUser → rejected", async () => {
    mockedUpdateUserApi.mockRejectedValue(new Error("Update failed"));

    const dispatch = vi.fn();
    const thunk = updateUser(fakeUser);

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "auth/update/rejected" }),
    );
  });

  it("getLibraryCard → fulfilled", async () => {
    mockedGetLibraryCardApi.mockResolvedValue("CARD123");

    const dispatch = vi.fn();
    const thunk = getLibraryCard(fakeUser._id);

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/librarycard/fulfilled",
        payload: "CARD123",
      }),
    );
  });

  it("getLibraryCard → rejected", async () => {
    mockedGetLibraryCardApi.mockRejectedValue(new Error("Library card failed"));

    const dispatch = vi.fn();
    const thunk = getLibraryCard(fakeUser._id);

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "auth/librarycard/rejected" }),
    );
  });
});
