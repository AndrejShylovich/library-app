import { beforeEach, describe, expect, it, vi } from "vitest";
import type { MockedFunction } from "vitest";

import * as userApi from "../api/authApi";

import {
  fetchUser,
  loginUser,
  registerUser,
  updateUser,
} from "./userSlice";

import type {
  LoginUserDto,
  RegisterUserDto,
  UserDto,
} from "./dto/UserDto";

vi.mock("../../../entities/user/api/authApi");

const mockedLoginUserApi = userApi.loginUserApi as MockedFunction<
  typeof userApi.loginUserApi
>;

const mockedRegisterUserApi = userApi.registerUserApi as MockedFunction<
  typeof userApi.registerUserApi
>;

const mockedFetchUserApi = userApi.fetchUserApi as MockedFunction<
  typeof userApi.fetchUserApi
>;

const mockedUpdateUserApi = userApi.updateUserApi as MockedFunction<
  typeof userApi.updateUserApi
>;

describe("userSlice async thunks", () => {
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

    await loginUser(fakeLoginUser)(dispatch, () => ({}), undefined);

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

    await loginUser(fakeLoginUser)(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/login/rejected",
      }),
    );
  });

  it("registerUser → fulfilled", async () => {
    mockedRegisterUserApi.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();

    await registerUser(fakeRegisterUser)(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/register/fulfilled",
      }),
    );
  });

  it("registerUser → rejected", async () => {
    mockedRegisterUserApi.mockRejectedValue(new Error("Register failed"));

    const dispatch = vi.fn();

    await registerUser(fakeRegisterUser)(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/register/rejected",
      }),
    );
  });

  it("fetchUser → fulfilled", async () => {
    mockedFetchUserApi.mockResolvedValue({
      user: fakeUser,
      property: "profileUser",
    });

    const dispatch = vi.fn();

    await fetchUser({
      userId: fakeUser._id,
      property: "profileUser",
    })(dispatch, () => ({}), undefined);

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

  it("fetchUser → rejected", async () => {
    mockedFetchUserApi.mockRejectedValue(new Error("Fetch failed"));

    const dispatch = vi.fn();

    await fetchUser({
      userId: fakeUser._id,
      property: "profileUser",
    })(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/fetch/rejected",
      }),
    );
  });

  it("updateUser → fulfilled", async () => {
    mockedUpdateUserApi.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();

    await updateUser(fakeUser)(dispatch, () => ({}), undefined);

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

    await updateUser(fakeUser)(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/update/rejected",
      }),
    );
  });
});