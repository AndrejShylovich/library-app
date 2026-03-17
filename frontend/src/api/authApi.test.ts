import { describe, it, expect, vi, beforeEach } from "vitest";
import type { MockedFunction } from "vitest";

import {
  loginUserApi,
  registerUserApi,
  fetchUserApi,
  updateUserApi,
  getLibraryCardApi,
} from "./authApi";

import { api, TOKEN_KEY, USER_ID_KEY } from "./axios";

import type { UserDto } from "../models/dto/UserDto";

vi.mock("./axios", () => ({
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

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key]),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

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
    localStorage.clear();
  });

  it("loginUserApi: logs in user and stores token & userId", async () => {
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

    expect(localStorage.setItem).toHaveBeenCalledWith(
      TOKEN_KEY,
      "jwt-token"
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      USER_ID_KEY,
      mockUser._id
    );

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

  it("fetchUserApi: fetches user and returns with property", async () => {
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

    expect(mockedPut).toHaveBeenCalledWith("/users/", mockUser);
    expect(result).toEqual(mockUser);
  });

  it("getLibraryCardApi: returns library card id", async () => {
    mockedPost.mockResolvedValue({
      data: {
        libraryCard: {
          _id: "card-456",
        },
      },
    });

    const result = await getLibraryCardApi("user-123");

    expect(mockedPost).toHaveBeenCalledWith("/card/", {
      user: "user-123",
    });

    expect(result).toBe("card-456");
  });
});