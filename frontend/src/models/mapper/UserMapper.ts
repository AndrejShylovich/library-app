import type { DomainFetchUserPayload, DomainLoginUserPayload, DomainRegisterUserPayload, DomainUser } from "../domain/User";
import type { FetchUserDto, LoginUserDto, RegisterUserDto, UserDto } from "../dto/UserDto";

export const UserMapper = {
  toDomain(dto: UserDto): DomainUser {
    return {
      id: dto._id,
      type: dto.type,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
    };
  },

  toDto(domain: DomainUser): UserDto {
    return {
      _id: domain.id,
      type: domain.type,
      firstName: domain.firstName,
      lastName: domain.lastName,
      email: domain.email,
    };
  },
};

export const AuthMapper = {
  loginToDto(domain: DomainLoginUserPayload): LoginUserDto {
    return {
      email: domain.email,
      password: domain.password,
    };
  },

  registerToDto(domain: DomainRegisterUserPayload): RegisterUserDto {
    return {
      type: domain.type,
      firstName: domain.firstName,
      lastName: domain.lastName,
      email: domain.email,
      password: domain.password,
    };
  },

  fetchUserToDto(domain: DomainFetchUserPayload): FetchUserDto {
    return {
      userId: domain.userId,
      property: domain.property,
    };
  },
};