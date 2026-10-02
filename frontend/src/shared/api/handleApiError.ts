import { AxiosError } from "axios";

import { clearAuthData } from "../lib/auth/authStorage";

export const handleApiError = (
  error: AxiosError
): Promise<never> => {
  const status = error.response?.status;

  if (status === 401) {
    clearAuthData();
  }

  if (!status) {
    console.error("Network error:", error.message);
  }

  if (status && status >= 500) {
    console.error(
      "Server error:",
      error.response?.data
    );
  }

  return Promise.reject(error);
};