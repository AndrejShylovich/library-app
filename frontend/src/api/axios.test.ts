import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const requestUseMock = vi.fn();
const responseUseMock = vi.fn();

const mockApiInstance = {
  interceptors: {
    request: { use: requestUseMock },
    response: { use: responseUseMock },
  },
};

vi.mock("axios", async () => {
  const actual = await vi.importActual<typeof import("axios")>("axios");

  return {
    ...actual,
    default: {
      ...actual.default,
      create: vi.fn(() => mockApiInstance),
    },
  };
});

describe("api axios instance", () => {
  beforeEach(() => {
    vi.resetModules();          
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });


  it("creates axios instance with base config", async () => {
    const axios = await import("axios");

    await import("./axios");

    expect(axios.default.create).toHaveBeenCalledWith({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  it("adds Authorization header if token exists", async () => {
    localStorage.setItem("token", "test-token");

    await import("./axios");

    const onFulfilled = requestUseMock.mock.calls[0][0] as (
      config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig;

    const result = onFulfilled({ headers: {} } as InternalAxiosRequestConfig);

    expect(result.headers.Authorization).toBe("Bearer test-token");
  });

  it("does not add Authorization header if token missing", async () => {
    await import("./axios");

    const onFulfilled = requestUseMock.mock.calls[0][0] as (
      config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig;

    const result = onFulfilled({ headers: {} } as InternalAxiosRequestConfig);

    expect(result.headers.Authorization).toBeUndefined();
  });

  it("passes response through on success", async () => {
    await import("./axios");

    const onFulfilled = responseUseMock.mock.calls[0][0] as (
      response: AxiosResponse
    ) => AxiosResponse;

    const response = {
      data: { ok: true },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    } as AxiosResponse;

    expect(onFulfilled(response)).toBe(response);
  });

  it("clears localStorage on 401 error", async () => {
    localStorage.setItem("token", "test-token");
    localStorage.setItem("userId", "user-1");

    await import("./axios");

    const onRejected = responseUseMock.mock.calls[0][1] as (
      error: AxiosError
    ) => Promise<never>;

    const error = {
      response: {
        status: 401,
        data: {},
      },
    } as AxiosError;

    await expect(onRejected(error)).rejects.toBe(error);

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("userId")).toBeNull();
  });

  it("handles request error without response", async () => {
    await import("./axios");

    const onRejected = responseUseMock.mock.calls[0][1] as (
      error: AxiosError
    ) => Promise<never>;

    const error = {
      request: {},
      message: "Network error",
    } as AxiosError;

    await expect(onRejected(error)).rejects.toBe(error);
  });
});
