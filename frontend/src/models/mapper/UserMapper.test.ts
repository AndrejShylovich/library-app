import { describe, it, expect } from "vitest";
import { UserMapper } from "./UserMapper";
import type { UserDto } from "../dto/UserDto";
import type { DomainUser } from "../domain/User";

describe("UserMapper", () => {
  const dto: UserDto = {
    _id: "123",
    type: "EMPLOYEE",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  };

  const domain: DomainUser = {
    id: "123",
    role: "EMPLOYEE",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  };

  it("should correctly map dto -> domain -> dto (round-trip)", () => {
    const result = UserMapper.toDto(UserMapper.toDomain(dto));
    expect(result).toEqual(dto);
  });

  it("should not mutate input dto", () => {
    const copy = structuredClone(dto);
    UserMapper.toDomain(dto);
    expect(dto).toEqual(copy);
  });

  it("should not mutate input domain", () => {
    const copy = structuredClone(domain);
    UserMapper.toDto(domain);
    expect(domain).toEqual(copy);
  });
});
