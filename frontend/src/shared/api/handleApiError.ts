import { AxiosError } from "axios";
import { clearAuthData } from "../lib/auth/authStorage";


export const handleApiError = (
  error: AxiosError,
): Promise<never> => {
  if (error.response?.status === 401) {
    clearAuthData();
  }

  if (error.response) {
    console.error("API Error:", error.response.data);
  } else if (error.request) {
    console.error("No response from server:", error.request);
  } else {
    console.error("Axios error:", error.message);
  }

  return Promise.reject(error);
};