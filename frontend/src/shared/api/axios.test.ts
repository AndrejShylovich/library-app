import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";
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
    default: { ...actual.default, create: vi.fn(() => mockApiInstance) },
  };
});
describe("api axios instance", () => {
  let requestInterceptor: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig;
  let responseSuccess: (response: AxiosResponse) => AxiosResponse;
  let responseErrorHandler: unknown;
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
    await import("./axios");
    requestInterceptor = requestUseMock.mock.calls[0][0];
    responseSuccess = responseUseMock.mock.calls[0][0];
    responseErrorHandler = responseUseMock.mock.calls[0][1];
  });
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });
  it("creates axios instance with correct config", async () => {
    const axios = await import("axios");
    expect(axios.default.create).toHaveBeenCalledWith({
      baseURL: import.meta.env.VITE_API_URL,
      headers: { "Content-Type": "application/json" },
    });
  });
  it("registers request interceptor", () => {
    expect(requestUseMock).toHaveBeenCalledTimes(1);
  });
  it("registers response interceptor with error handler", () => {
    expect(responseUseMock).toHaveBeenCalledTimes(1);
    expect(responseErrorHandler).toBeInstanceOf(Function);
  });
  it("adds Authorization header if token exists", () => {
    localStorage.setItem("token", "test-token");
    const config = { headers: {} } as InternalAxiosRequestConfig;
    const result = requestInterceptor(config);
    expect(result.headers.Authorization).toBe("Bearer test-token");
  });
  it("does not add Authorization header without token", () => {
    const config = { headers: {} } as InternalAxiosRequestConfig;
    const result = requestInterceptor(config);
    expect(result.headers.Authorization).toBeUndefined();
  });
  it("returns response unchanged", () => {
    const response = {
      data: { ok: true },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    } as AxiosResponse;
    expect(responseSuccess(response)).toBe(response);
  });
});
