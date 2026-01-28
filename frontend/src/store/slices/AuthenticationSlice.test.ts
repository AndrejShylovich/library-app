import { describe, it, expect, beforeEach, vi } from "vitest";
import type { MockedFunction } from "vitest";

import {
  loginUser,
  registerUser,
  fetchUser,
  updateUser,
  getLibraryCard,
} from "./AuthenticationSlice";

import type { User } from "../../models/User";
import * as api from "../../api/authApi";

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
  const fakeUser: User = {
    _id: "1",
    type: "PATRON",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    password: "123",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loginUser → fulfilled", async () => {
    mockedLoginUserApi.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();
    const thunk = loginUser({
      email: fakeUser.email,
      password: fakeUser.password,
    });

    await thunk(dispatch, () => ({}), undefined);

    expect(mockedLoginUserApi).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/login/fulfilled",
        payload: fakeUser,
      }),
    );
  });

  it("registerUser → fulfilled", async () => {
    mockedRegisterUserApi.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();
    const thunk = registerUser(fakeUser);

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/register/fulfilled",
      }),
    );
  });

  it("fetchUser → fulfilled", async () => {
    mockedFetchUserApi.mockResolvedValue({
      user: fakeUser,
      property: "profileUser",
    });

    const dispatch = vi.fn();
    const thunk = fetchUser({
      userId: fakeUser._id,
      property: "profileUser",
    });

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/fetch/fulfilled",
        payload: {
          user: fakeUser,
          property: "profileUser",
        },
      }),
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

  it("loginUser → rejected", async () => {
    mockedLoginUserApi.mockRejectedValue(new Error("Login failed"));

    const dispatch = vi.fn();
    const thunk = loginUser({
      email: fakeUser.email,
      password: fakeUser.password,
    });

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/login/rejected",
      }),
    );
  });

  it("registerUser → rejected", async () => {
    mockedRegisterUserApi.mockRejectedValue(new Error("Register failed"));

    const dispatch = vi.fn();
    const thunk = registerUser(fakeUser);

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/register/rejected",
      }),
    );
  });

  it("fetchUser → rejected", async () => {
    mockedFetchUserApi.mockRejectedValue(new Error("Fetch failed"));

    const dispatch = vi.fn();
    const thunk = fetchUser({
      userId: fakeUser._id,
      property: "profileUser",
    });

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/fetch/rejected",
      }),
    );
  });

  it("updateUser → rejected", async () => {
    mockedUpdateUserApi.mockRejectedValue(new Error("Update failed"));

    const dispatch = vi.fn();
    const thunk = updateUser(fakeUser);

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/update/rejected",
      }),
    );
  });

  it("getLibraryCard → rejected", async () => {
    mockedGetLibraryCardApi.mockRejectedValue(new Error("Library card failed"));

    const dispatch = vi.fn();
    const thunk = getLibraryCard(fakeUser._id);

    await thunk(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/librarycard/rejected",
      }),
    );
  });
});
