import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { registerUser, resetRegisterSuccess } from "../../../../store/slices/AuthenticationSlice";

export const useRegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, registerSuccess } = useSelector(
    (state: RootState) => state.authentication
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(resetRegisterSuccess());
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
