import type {
  LoginUserDto,
  RegisterUserDto,
  FetchUserDto,
  UserDto,
} from "../models/dto/UserDto";
import { api, TOKEN_KEY, USER_ID_KEY } from "./axios";

export const loginUserApi = async (payload: LoginUserDto): Promise<UserDto> => {
  const { data } = await api.post<{ user: UserDto; token: string }>(
    "/auth/login",
    payload,
  );

  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_ID_KEY, data.user._id);

  return data.user;
};

export const registerUserApi = async (
  payload: RegisterUserDto,
): Promise<UserDto> => {
  const { data } = await api.post<{ user: UserDto }>("/auth/register", payload);
  return data.user;
};

export const fetchUserApi = async (
  payload: FetchUserDto,
): Promise<{ user: UserDto; property: FetchUserDto["property"] }> => {
  const { data } = await api.get<{ user: UserDto }>(`/users/${payload.userId}`);
  return { user: data.user, property: payload.property };
};

export const updateUserApi = async (user: UserDto): Promise<UserDto> => {
  const { data } = await api.put<{ user: UserDto }>("/users/", user);
  return data.user;
};

export const getLibraryCardApi = async (userId: string): Promise<string> => {
  const { data } = await api.post<{ libraryCard: { _id: string } }>("/card/", {
    user: userId,
  });
  return data.libraryCard._id;
};
