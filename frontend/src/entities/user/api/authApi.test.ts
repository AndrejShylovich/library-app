import type { MockedFunction } from "vitest";

import { api } from "../../../shared/api/axios";

import type { UserDto } from "../model/dto/UserDto";

import {
  fetchUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
} from "./authApi";

vi.mock("../../../shared/api/axios", () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
  },
  TOKEN_KEY: "token",
  USER_ID_KEY: "userId",
}));

const mockedPost = api.post as MockedFunction<typeof api.post>;
const mockedGet = api.get as MockedFunction<typeof api.get>;
const mockedPut = api.put as MockedFunction<typeof api.put>;

const mockUser: UserDto = {
  _id: "user-123",
  type: "PATRON",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
};

describe("authApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loginUserApi: returns user", async () => {
    mockedPost.mockResolvedValue({
      data: {
        user: mockUser,
        token: "jwt-token",
      },
    });

    const result = await loginUserApi({
      email: "john@example.com",
      password: "secret",
    });

    expect(mockedPost).toHaveBeenCalledWith("/auth/login", {
      email: "john@example.com",
      password: "secret",
    });

    expect(result).toEqual(mockUser);
  });

  it("registerUserApi: registers user", async () => {
    mockedPost.mockResolvedValue({
      data: {
        user: mockUser,
      },
    });

    const result = await registerUserApi({
      type: "PATRON",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "secret",
    });

    expect(mockedPost).toHaveBeenCalledWith("/auth/register", {
      type: "PATRON",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "secret",
    });

    expect(result).toEqual(mockUser);
  });

  it("fetchUserApi: fetches user and returns property", async () => {
    mockedGet.mockResolvedValue({
      data: {
        user: mockUser,
      },
    });

    const result = await fetchUserApi({
      userId: "user-123",
      property: "profileUser",
    });

    expect(mockedGet).toHaveBeenCalledWith("/users/user-123");

    expect(result).toEqual({
      user: mockUser,
      property: "profileUser",
    });
  });

  it("updateUserApi: updates user", async () => {
    mockedPut.mockResolvedValue({
      data: {
        user: mockUser,
      },
    });

    const result = await updateUserApi(mockUser);

    expect(mockedPut).toHaveBeenCalledWith("/users", mockUser);

    expect(result).toEqual(mockUser);
  });
});