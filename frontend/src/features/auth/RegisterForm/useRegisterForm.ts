import {
  useEffect,
  useState,
  useCallback,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import type {
  AppDispatch,
  RootState,
} from "../../../shared/store/ReduxStore";

import {
  registerUser,
  resetRegisterSuccess,
} from "../../../entities/user/model/userSlice";

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
  const dispatch = useDispatch<AppDispatch>();

  const { error, loading, registerSuccess } = useSelector(
    (state: RootState) => state.user,
  );

  const [formData, setFormData] =
    useState<RegisterFormData>(initialFormData);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (registerSuccess) {
      toast.success("Registration was successful");
      dispatch(resetRegisterSuccess());
    }
  }, [registerSuccess, dispatch]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(
        registerUser({
          type: "PATRON",
          ...formData,
        }),
      );
    },
    [dispatch, formData],
  );

  return {
    formData,
    error,
    loading,
    registerSuccess,
    handleChange,
    handleSubmit,
  };
};