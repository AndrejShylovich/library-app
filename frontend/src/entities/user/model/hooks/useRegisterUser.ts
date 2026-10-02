import { useRegisterUserMutation } from "../../api/userQueryApi";
import type { RegisterUserDto } from "../dto/UserDto";

export const useRegisterUser = () => {
  const [register, state] = useRegisterUserMutation();

  const registerUser = async (payload: RegisterUserDto) => {
    return register(payload).unwrap();
  };

  return {
    registerUser,
    ...state,
  };
};
