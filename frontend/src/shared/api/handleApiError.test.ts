import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { AxiosError } from "axios";
import { handleApiError } from "./handleApiError";
describe("handleApiError", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    localStorage.setItem("token", "token");
    localStorage.setItem("userId", "user");
  });
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });
  it("clears auth data on 401", async () => {
    const error = {
      response: { status: 401, data: { message: "Unauthorized" } },
    } as AxiosError;
    await expect(handleApiError(error)).rejects.toBe(error);
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("userId")).toBeNull();
    expect(console.error).not.toHaveBeenCalled();
  });
  it("does not log client errors", async () => {
    const error = {
      response: { status: 400, data: { message: "Validation error" } },
    } as AxiosError;
    await expect(handleApiError(error)).rejects.toBe(error);
    expect(console.error).not.toHaveBeenCalled();
  });
  it("logs server errors", async () => {
    const error = {
      response: { status: 500, data: { message: "Server error" } },
    } as AxiosError;
    await expect(handleApiError(error)).rejects.toBe(error);
    expect(console.error).toHaveBeenCalledWith(
      "Server error:",
      error.response?.data,
    );
  });
  it("logs network errors", async () => {
    const error = { message: "Network error" } as AxiosError;
    await expect(handleApiError(error)).rejects.toBe(error);
    expect(console.error).toHaveBeenCalledWith(
      "Network error:",
      "Network error",
    );
  });
});
