import { useUpdateUserMutation } from "../../api/userQueryApi";
import type { DomainUser } from "../domain/User";
import { UserMapper } from "../mapper/UserMapper";

export const useUpdateUser = () => {
  const [update, state] = useUpdateUserMutation();

  const updateDomain = async (domainUser: DomainUser) => {
    const dto = UserMapper.toDto(domainUser);
    const result = await update(dto).unwrap();

    return UserMapper.toDomain(result);
  };

  return [updateDomain, state] as const;
};
