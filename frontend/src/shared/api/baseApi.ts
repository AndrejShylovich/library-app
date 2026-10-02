import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";

import { api } from "./axios";

type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: unknown;
  params?: unknown;
};

export type AxiosErrorResponse = {
  status?: number;
  data?: unknown;
};

const isAxiosError = (error: unknown): error is AxiosError => {
  return typeof error === "object" && error !== null && "response" in error;
};

const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosErrorResponse> =>
  async ({ url, method = "GET", data, params }) => {
    try {
      const result = await api({
        url,
        method,
        data,
        params,
      });

      return {
        data: result.data,
      };
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          error: {
            status: error.response?.status,
            data: error.response?.data,
          },
        };
      }

      return {
        error: {
          status: 500,
          data: "Unknown error",
        },
      };
    }
  };

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: axiosBaseQuery(),

  tagTypes: [
    "Book",
    "User",
    "LibraryCard",
    "LoanRecord",
  ],

  endpoints: () => ({}),
});