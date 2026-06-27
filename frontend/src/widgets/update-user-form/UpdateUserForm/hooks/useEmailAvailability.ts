import axios from "axios";
import { useCallback, useState } from "react";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const useEmailAvailability = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const checkEmail = useCallback(async (email: string, originalEmail?: string) => {
    if (!email || email === originalEmail) {
      setEmailError(null);
      return true;
    }

    setChecking(true);

    try {
      const { data } = await axios.post(`${VITE_API_URL}/auth/check-email`, {
        email,
      });

      setEmailError(data.available ? null : "Email is already taken");
      return data.available;
    } catch {
      setEmailError("Failed to check email");
      return false;
    } finally {
      setChecking(false);
    }
  }, []);

  return { emailError, checking, checkEmail };
};