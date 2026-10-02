import { useCheckEmail } from "@/entities/user/model/hooks/useCheckEmail";
import { useCallback, useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useEmailAvailability = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailChecked, setEmailChecked] = useState(false);

  const [checkEmail, { isLoading: checking }] = useCheckEmail();

  const resetEmailCheck = useCallback(() => {
    setEmailChecked(false);
    setEmailError(null);
  }, []);

  const validateEmail = useCallback(
    async (email: string, originalEmail?: string) => {
      if (!email || email === originalEmail) {
        setEmailError(null);
        setEmailChecked(true);

        return true;
      }
      if (!EMAIL_REGEX.test(email)) {
        setEmailError("Invalid email format");
        return false;
      }

      setEmailChecked(false);

      try {
        const available = await checkEmail(email);

        setEmailError(available ? null : "Email is already taken");

        setEmailChecked(true);

        return available;
      } catch {
        setEmailError("Failed to check email");

        setEmailChecked(true);

        return false;
      }
    },
    [checkEmail],
  );

  return {
    emailError,
    checking,
    emailChecked,
    checkEmail: validateEmail,
    resetEmailCheck,
  };
};
