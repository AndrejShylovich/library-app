import { useRegisterUser } from "@/entities/user/model/hooks/useRegisterUser";

import {
  useEffect,
  useState,
  useCallback,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { toast } from "react-toastify";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialFormData: RegisterFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const useRegisterForm = () => {
  const { registerUser, isLoading, isSuccess, isError, error } =
    useRegisterUser();

  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);

  useEffect(() => {
    if (isError && error) {
      toast.error("Registration failed");
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration was successful");
    }
  }, [isSuccess]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await registerUser({
          type: "PATRON",
          ...formData,
        });

        setFormData(initialFormData);
      } catch (e) {
        console.error(e);
      }
    },
    [registerUser, formData],
  );

  return {
    formData,

    loading: isLoading,
    registerSuccess: isSuccess,
    isError,

    handleChange,
    handleSubmit,
  };
};
