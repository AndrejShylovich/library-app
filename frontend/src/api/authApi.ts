import type {
  LoginUserDto,
  RegisterUserDto,
  FetchUserDto,
  UserDto,
} from "../models/dto/UserDto";
import { api } from "./axios"; 

export const loginUserApi = async (payload: LoginUserDto): Promise<UserDto> => {
  const res = await api.post("/auth/login", payload);
  const { user, token }: { user: UserDto; token: string } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("userId", user._id);

  return user;
};

export const registerUserApi = async (
  payload: RegisterUserDto
): Promise<UserDto> => {
  const res = await api.post("/auth/register", payload);
  return res.data.user;
};

export const fetchUserApi = async (
  payload: FetchUserDto
): Promise<{ user: UserDto; property: FetchUserDto["property"] }> => {
  const res = await api.get(`/users/${payload.userId}`);

  return {
    user: res.data.user as UserDto,
    property: payload.property,
  };
};

export const updateUserApi = async (user: UserDto): Promise<UserDto> => {
  const res = await api.put("/users/", user);
  return res.data.user as UserDto;
};

export const getLibraryCardApi = async (userId: string): Promise<string> => {
  const res = await api.post("/card/", { user: userId });
  return res.data.libraryCard._id;
};
