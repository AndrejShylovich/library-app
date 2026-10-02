import { baseApi } from "@/shared/api/baseApi";

import {
  hasData,
  invalidResponse,
  unwrapError,
} from "@/shared/api/queryHelpers";

import type {
  FetchUserDto,
  LoginUserDto,
  RegisterUserDto,
  UserDto,
} from "../model/dto/UserDto";

import { clearAuthData, saveAuthData } from "@/shared/lib/auth/authStorage";

type LoginResponse = {
  user: UserDto;
  token: string;
};

type UserResponse = {
  user: UserDto;
};

type EmailAvailabilityResponse = {
  available: boolean;
};

const isLoginResponse = (data: unknown): data is LoginResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "user" in data &&
    "token" in data &&
    typeof data.token === "string"
  );
};

const isUserResponse = (data: unknown): data is UserResponse => {
  return typeof data === "object" && data !== null && "user" in data;
};

const AUTH_ENDPOINT = "/auth";
const USERS_ENDPOINT = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<UserDto, LoginUserDto>({
      async queryFn(payload, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `${AUTH_ENDPOINT}/login`,
          method: "POST",
          data: payload,
        });

        const error = unwrapError(result);

        if (error) {
          return error;
        }

        if (!hasData<LoginResponse>(result) || !isLoginResponse(result.data)) {
          return invalidResponse("Invalid login response");
        }

        saveAuthData(result.data.user._id, result.data.token);

        return {
          data: result.data.user,
        };
      },

      invalidatesTags: ["User"],
    }),

    logoutUser: builder.mutation<void, void>({
      queryFn: async () => {
        clearAuthData();

        return {
          data: undefined,
        };
      },

      invalidatesTags: ["User"],
    }),

    registerUser: builder.mutation<void, RegisterUserDto>({
      async queryFn(payload, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `${AUTH_ENDPOINT}/register`,
          method: "POST",
          data: payload,
        });

        const error = unwrapError(result);

        if (error) {
          return error;
        }

        return {
          data: undefined,
        };
      },

      invalidatesTags: ["User"],
    }),

    fetchUser: builder.query<
      {
        user: UserDto;
        property: FetchUserDto["property"];
      },
      FetchUserDto
    >({
      async queryFn(payload, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `${USERS_ENDPOINT}/${payload.userId}`,
        });

        const error = unwrapError(result);

        if (error) {
          return error;
        }

        if (!hasData<UserResponse>(result) || !isUserResponse(result.data)) {
          return invalidResponse("Invalid user response");
        }

        return {
          data: {
            user: result.data.user,
            property: payload.property,
          },
        };
      },

      providesTags: ["User"],
    }),

    updateUser: builder.mutation<UserDto, UserDto>({
      async queryFn(user, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: USERS_ENDPOINT,
          method: "PUT",
          data: user,
        });

        const error = unwrapError(result);

        if (error) {
          return error;
        }

        if (!hasData<UserResponse>(result) || !isUserResponse(result.data)) {
          return invalidResponse("Invalid user response");
        }

        return {
          data: result.data.user,
        };
      },

      invalidatesTags: ["User"],
    }),

    getMe: builder.query<UserDto, void>({
      query: () => ({
        url: `${AUTH_ENDPOINT}/me`,
      }),

      transformResponse: (response: UserResponse) => response.user,

      providesTags: ["User"],
    }),
    checkEmail: builder.mutation<boolean, string>({
      async queryFn(email, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `${AUTH_ENDPOINT}/check-email`,
          method: "POST",
          data: {
            email,
          },
        });

        const error = unwrapError(result);

        if (error) {
          return error;
        }

        if (!hasData<EmailAvailabilityResponse>(result)) {
          return invalidResponse("Invalid email availability response");
        }

        return {
          data: result.data.available,
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useFetchUserQuery,
  useLazyFetchUserQuery,
  useUpdateUserMutation,
  useGetMeQuery,
  useLogoutUserMutation,
  useCheckEmailMutation,
} = userApi;
