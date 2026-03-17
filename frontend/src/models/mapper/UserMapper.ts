import type { DomainUser } from "../domain/User";
import type { UserDto } from "../dto/UserDto";

export const UserMapper = {
  toDomain(dto: UserDto): DomainUser {
    return {
      id: dto._id,
      role: dto.type,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
    };
  },

  toDto(domain: DomainUser): UserDto {
    return {
      _id: domain.id,
      type: domain.role,
      firstName: domain.firstName,
      lastName: domain.lastName,
      email: domain.email,
    };
  },
};