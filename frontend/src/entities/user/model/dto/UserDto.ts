import type { UserProperty, UserRole } from "@/shared/types/types";

export interface UserDto {
  _id: string;
  type: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface RegisterUserDto {
  type: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface FetchUserDto {
  userId: string;
  property: UserProperty;
}
