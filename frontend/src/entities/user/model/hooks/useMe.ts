import { useAuthToken } from "@/shared/lib/auth/useAuthToken";
import { useGetMeQuery } from "../../api/userQueryApi";
import { UserMapper } from "../mapper/UserMapper";

export const useMe = () => {
  const token = useAuthToken();

  const query = useGetMeQuery(undefined, {
    skip: !token,
  });

  return {
    ...query,

    user: token && query.data
      ? UserMapper.toDomain(query.data)
      : undefined,
  };
};