import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../shared/store/ReduxStore";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "react-toastify";
import {
  registerUser,
  resetRegisterSuccess,
} from "../../../entities/user/model/userSlice";

export const useRegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { error, loading, registerSuccess } = useSelector(
    (state: RootState) => state.user,
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser({ type: "PATRON", ...formData }));
  };

  return {
    formData,
    error,
    loading,
    registerSuccess,
    handleChange,
    handleSubmit,
  };
};
