import { describe, it, expect, beforeEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  loginUserApi,
  registerUserApi,
  fetchUserApi,
  updateUserApi,
  getLibraryCardApi,
} from "./authApi";

import type {
  User,
  LoginUserPayload,
  RegisterUserPayload,
  FetchUserPayload,
} from "../models/User";

const VITE_API_URL = "http://localhost:8000";

describe("Auth API", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    localStorage.clear();
  });

  it("loginUserApi should store token and userId and return user", async () => {
    const fakeUser: User = {
      _id: "123",
      type: "PATRON",
      firstName: "John",
      lastName: "Doe",
      email: "john@test.com",
      password: "123",
    };

    const fakeToken = "token123";

    mock.onPost(`${VITE_API_URL}/auth/login`).reply(200, {
      user: fakeUser,
      token: fakeToken,
    });

    const payload: LoginUserPayload = {
      email: fakeUser.email,
      password: fakeUser.password,
    };

    const user = await loginUserApi(payload);

    expect(user).toEqual(fakeUser);
    expect(localStorage.getItem("token")).toBe(fakeToken);
    expect(localStorage.getItem("userId")).toBe(fakeUser._id);
  });

  it("registerUserApi should return user", async () => {
    const fakeUser: User = {
      _id: "456",
      type: "EMPLOYEE",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@test.com",
      password: "123",
    };

    mock.onPost(`${VITE_API_URL}/auth/register`).reply(200, {
      user: fakeUser,
    });

    const payload: RegisterUserPayload = {
      type: fakeUser.type,
      firstName: fakeUser.firstName,
      lastName: fakeUser.lastName,
      email: fakeUser.email,
      password: fakeUser.password,
    };

    const user = await registerUserApi(payload);
    expect(user).toEqual(fakeUser);
  });

  it("fetchUserApi should return user and property", async () => {
    const fakeUser: User = {
      _id: "789",
      type: "ADMIN",
      firstName: "Bob",
      lastName: "Builder",
      email: "bob@test.com",
      password: "123",
    };

    localStorage.setItem("token", "token123");

    mock.onGet(`${VITE_API_URL}/users/789`).reply(200, {
      user: fakeUser,
    });

    const payload: FetchUserPayload = {
      userId: "789",
      property: "profileUser",
    };
    const result = await fetchUserApi(payload);

    expect(result).toEqual({ user: fakeUser, property: "profileUser" });
  });

  it("updateUserApi should return updated user", async () => {
    const updatedUser: User = {
      _id: "123",
      type: "PATRON",
      firstName: "John",
      lastName: "Doe Updated",
      email: "john@test.com",
      password: "123",
    };

    localStorage.setItem("token", "token123");

    mock.onPut(`${VITE_API_URL}/users/`).reply(200, {
      user: updatedUser,
    });

    const result = await updateUserApi(updatedUser);
    expect(result).toEqual(updatedUser);
  });

  it("getLibraryCardApi should return libraryCard id", async () => {
    localStorage.setItem("token", "token123");
    const fakeCardId = "card123";

    mock.onPost(`${VITE_API_URL}/card/`).reply(200, {
      libraryCard: { _id: fakeCardId },
    });

    const result = await getLibraryCardApi("user123");
    expect(result).toBe(fakeCardId);
  });
});
