import { useLoginUserMutation } from "../../api/userQueryApi";
import type { DomainUser } from "../domain/User";
import type { LoginUserDto } from "../dto/UserDto";
import { UserMapper } from "../mapper/UserMapper";

export const useLoginUser = () => {
  const [login, state] = useLoginUserMutation();

  const loginDomain = async (payload: LoginUserDto): Promise<DomainUser> => {
    const userDto = await login(payload).unwrap();

    return UserMapper.toDomain(userDto);
  };

  return [loginDomain, state] as const;
};
