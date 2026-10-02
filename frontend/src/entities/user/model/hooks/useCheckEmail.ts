import { useCheckEmailMutation } from "../../api/userQueryApi";

export const useCheckEmail = () => {
  const [checkEmail, state] = useCheckEmailMutation();

  const checkEmailAvailability = async (
    email: string,
  ): Promise<boolean> => {
    return checkEmail(email).unwrap();
  };

  return [
    checkEmailAvailability,
    state,
  ] as const;
};