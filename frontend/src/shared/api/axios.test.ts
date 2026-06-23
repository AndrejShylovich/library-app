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
  let requestInterceptor: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig;

  let responseSuccess: (response: AxiosResponse) => AxiosResponse;
  let responseError: (error: AxiosError) => Promise<never>;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    vi.spyOn(console, "error").mockImplementation(() => {});

    await import("./axios");

    requestInterceptor = requestUseMock.mock.calls[0][0];
    responseSuccess = responseUseMock.mock.calls[0][0];
    responseError = responseUseMock.mock.calls[0][1];
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("creates axios instance with correct config", async () => {
    const axios = await import("axios");

    expect(axios.default.create).toHaveBeenCalledWith({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  it("adds Authorization header if token exists", () => {
    localStorage.setItem("token", "test-token");

    const result = requestInterceptor({
      headers: {},
    } as InternalAxiosRequestConfig);

    expect(result.headers.Authorization).toBe("Bearer test-token");
  });

  it("does not add Authorization header if token is missing", () => {
    const result = requestInterceptor({
      headers: {},
    } as InternalAxiosRequestConfig);

    expect(result.headers.Authorization).toBeUndefined();
  });

  it("returns response as is on success", () => {
    const response = {
      data: { ok: true },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    } as AxiosResponse;

    expect(responseSuccess(response)).toBe(response);
  });

  it("clears localStorage on 401 error", async () => {
    localStorage.setItem("token", "test-token");
    localStorage.setItem("userId", "user-1");

    const error = {
      response: {
        status: 401,
        data: {},
      },
    } as AxiosError;

    await expect(responseError(error)).rejects.toBe(error);

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("userId")).toBeNull();
    expect(console.error).toHaveBeenCalledWith("API Error:", {});
  });

  it("logs error when no response received", async () => {
    const error = {
      request: {},
      message: "Network error",
    } as AxiosError;

    await expect(responseError(error)).rejects.toBe(error);

    expect(console.error).toHaveBeenCalledWith(
      "No response from server:",
      error.request,
    );
  });

  it("logs generic axios error", async () => {
    const error = {
      message: "Something went wrong",
    } as AxiosError;

    await expect(responseError(error)).rejects.toBe(error);

    expect(console.error).toHaveBeenCalledWith(
      "Axios error:",
      "Something went wrong",
    );
  });
});
