import type { AxiosErrorResponse } from "./baseApi";

export type QueryErrorResult = {
  error: AxiosErrorResponse;
};

export type QueryDataResult<T> = {
  data: T;
};

export const hasError = (result: unknown): result is QueryErrorResult => {
  return (
    typeof result === "object" &&
    result !== null &&
    "error" in result &&
    result.error !== undefined
  );
};

export const hasData = <T>(result: unknown): result is QueryDataResult<T> => {
  return typeof result === "object" && result !== null && "data" in result;
};

export const unwrapError = (result: unknown): QueryErrorResult | null => {
  if (hasError(result)) {
    return {
      error: result.error,
    };
  }

  return null;
};

export const invalidResponse = (message: string): QueryErrorResult => {
  return {
    error: {
      status: 500,
      data: message,
    },
  };
};
