import { describe, it, expect } from "vitest";
import { UserMapper, AuthMapper } from "./UserMapper";
import type {
  DomainUser,
  DomainLoginUserPayload,
  DomainRegisterUserPayload,
  DomainFetchUserPayload,
} from "../domain/User";
import type { UserDto, LoginUserDto, RegisterUserDto, FetchUserDto } from "../dto/UserDto";

describe("UserMapper", () => {
  it("should map UserDto to DomainUser", () => {
    const dto: UserDto = {
      _id: "123",
      type: "EMPLOYEE",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    };

    const domain: DomainUser = UserMapper.toDomain(dto);

    expect(domain).toEqual({
      id: "123",
      type: "EMPLOYEE",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    });
  });

  it("should map DomainUser to UserDto", () => {
    const domain: DomainUser = {
      id: "123",
      type: "EMPLOYEE",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    };

    const dto: UserDto = UserMapper.toDto(domain);

    expect(dto).toEqual({
      _id: "123",
      type: "EMPLOYEE",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    });
  });
});

describe("AuthMapper", () => {
  it("should map DomainLoginUserPayload to LoginUserDto", () => {
    const domain: DomainLoginUserPayload = {
      email: "test@example.com",
      password: "secret",
    };

    const dto: LoginUserDto = AuthMapper.loginToDto(domain);

    expect(dto).toEqual({
      email: "test@example.com",
      password: "secret",
    });
  });

  it("should map DomainRegisterUserPayload to RegisterUserDto", () => {
    const domain: DomainRegisterUserPayload = {
      type: "PATRON",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      password: "pass123",
    };

    const dto: RegisterUserDto = AuthMapper.registerToDto(domain);

    expect(dto).toEqual({
      type: "PATRON",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      password: "pass123",
    });
  });

  it("should map DomainFetchUserPayload to FetchUserDto", () => {
    const domain: DomainFetchUserPayload = {
      userId: "u123",
      property: "profileUser",
    };

    const dto: FetchUserDto = AuthMapper.fetchUserToDto(domain);

    expect(dto).toEqual({
      userId: "u123",
      property: "profileUser",
    });
  });
});
