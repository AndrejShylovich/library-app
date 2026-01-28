import axios from "axios";
import type {
  FetchUserPayload,
  LoginUserPayload,
  RegisterUserPayload,
  User,
} from "../models/User";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const loginUserApi = async (
  payload: LoginUserPayload,
): Promise<User> => {
  const res = await axios.post(`${VITE_API_URL}/auth/login`, payload);
  const { user, token } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("userId", user._id);
  return user;
};

export const registerUserApi = async (
  payload: RegisterUserPayload,
): Promise<User> => {
  const res = await axios.post(`${VITE_API_URL}/auth/register`, payload);
  return res.data.user;
};

export const fetchUserApi = async (payload: FetchUserPayload) => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${VITE_API_URL}/users/${payload.userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    user: res.data.user as User,
    property: payload.property,
  };
};

export const updateUserApi = async (payload: User): Promise<User> => {
  const token = localStorage.getItem("token");

  const res = await axios.put(`${VITE_API_URL}/users/`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.user;
};

export const getLibraryCardApi = async (userId: string): Promise<string> => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${VITE_API_URL}/card/`,
    { user: userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data.libraryCard._id;
};
