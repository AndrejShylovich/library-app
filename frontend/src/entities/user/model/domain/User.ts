import type { UserProperty, UserRole } from "../../../../shared/types/types";

export interface DomainUser {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
}

export interface DomainLoginUserPayload {
  email: string;
  password: string;
}

export interface DomainRegisterUserPayload {
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface DomainFetchUserPayload {
  userId: string;
  property: UserProperty;
}
