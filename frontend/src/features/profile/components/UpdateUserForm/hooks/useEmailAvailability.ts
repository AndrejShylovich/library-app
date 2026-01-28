import { useState, useCallback } from "react";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const useEmailAvailability = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const checkEmail = useCallback(
    async (email: string, originalEmail?: string) => {
      if (!email || email === originalEmail) {
        setEmailError(null);
        return true;
      }

      try {
        setChecking(true);
        const res = await axios.post(`${VITE_API_URL}/auth/check-email`, {
          email,
        });
        const available = res.data.available;
        setEmailError(available ? null : "Email is already taken");
        return available;
      } catch {
        setEmailError("Failed to check email");
        return false;
      } finally {
        setChecking(false);
      }
    },
    [],
  );

  return { emailError, checking, checkEmail };
};
