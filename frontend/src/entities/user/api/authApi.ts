import { api } from "../../../shared/api/axios";

import type {
  FetchUserDto,
  LoginUserDto,
  RegisterUserDto,
  UserDto,
} from "../model/dto/UserDto";
import { saveAuthData } from "../../../shared/lib/auth/authStorage";

type LoginResponse = {
  user: UserDto;
  token: string;
};

type UserResponse = {
  user: UserDto;
};

const AUTH_ENDPOINT = "/auth";
const USERS_ENDPOINT = "/users";

export const loginUserApi = async (
  payload: LoginUserDto,
): Promise<UserDto> => {
  const { data } = await api.post<LoginResponse>(
    `${AUTH_ENDPOINT}/login`,
    payload,
  );

  saveAuthData(data.user._id, data.token);

  return data.user;
};

export const registerUserApi = async (
  payload: RegisterUserDto,
): Promise<UserDto> => {
  const { data } = await api.post<UserResponse>(
    `${AUTH_ENDPOINT}/register`,
    payload,
  );

  return data.user;
};

export const fetchUserApi = async ({
  userId,
  property,
}: FetchUserDto): Promise<{
  user: UserDto;
  property: FetchUserDto["property"];
}> => {
  const { data } = await api.get<UserResponse>(
    `${USERS_ENDPOINT}/${userId}`,
  );

  return {
    user: data.user,
    property,
  };
};

export const updateUserApi = async (
  user: UserDto,
): Promise<UserDto> => {
  const { data } = await api.put<UserResponse>(
    USERS_ENDPOINT,
    user,
  );

  return data.user;
};