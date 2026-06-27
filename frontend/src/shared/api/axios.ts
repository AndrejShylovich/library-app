import axios from "axios";

import { handleApiError } from "./handleApiError";
import { getToken } from "../lib/auth/authStorage";

const BASE_URL = import.meta.env.VITE_API_URL;
export const TOKEN_KEY = "token";
export const USER_ID_KEY = "userId";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  handleApiError,
);