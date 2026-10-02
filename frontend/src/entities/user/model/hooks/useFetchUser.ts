import { useFetchUserQuery } from "../../api/userQueryApi";
import { UserMapper } from "../mapper/UserMapper";

import type { FetchUserDto } from "../dto/UserDto";

import { getToken } from "@/shared/lib/auth/authStorage";

export const useFetchUser = (
  payload: FetchUserDto,
  options?: {
    skip?: boolean;
  },
) => {
  const token = getToken();

  const query = useFetchUserQuery(payload, {
    skip: !token || options?.skip,
  });

  return {
    ...query,

    user: query.data?.user
      ? UserMapper.toDomain(query.data.user)
      : undefined,

    property: query.data?.property,
  };
};