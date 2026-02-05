import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { loginUser } from "../../../../store/slices/AuthenticationSlice";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading, profileUser } = useSelector(
    (state: RootState) => state.authentication,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (error) {
      toast.error("Failed to log in");
    }
  }, [error]);

  useEffect(() => {
    if (profileUser) {
      navigate(`/`);
      toast.success("You have successfully logged in");
    }
  }, [profileUser, navigate]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    dispatch(loginUser({ email, password }));
  };

  return {
    email,
    password,
    error,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};
