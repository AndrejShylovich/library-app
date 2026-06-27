import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuthLogin } from "./useAuthLogin";

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useAuthLogin();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) return;

    login({ email: trimmedEmail, password });
  };

  return {
    email,
    password,
    loading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};