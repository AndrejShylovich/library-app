import { useLoginForm } from "./useLoginForm";
import type React from "react";

import "./LoginForm.css";
import { Input } from "../../../../shared/ui/Input/Input";
import { Button } from "../../../../shared/ui/Button/Button";

interface LoginFormProps {
  toggleRegister(): void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ toggleRegister }) => {
  const {
    email,
    password,
    error,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Please Login</h2>
      {error && (
        <p className="login-form-error">Username or password incorrect</p>
      )}

      <div className="login-form-input-group">
        <h6>Email</h6>
        <Input
          className="login-form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="login-form-input-group">
        <h6>Password</h6>
        <Input
          className="login-form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>

      <Button className="login-form-submit" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      <p>
        Don't have an account?{" "}
        <span className="login-form-register" onClick={toggleRegister}>
          Create one here.
        </span>
      </p>
    </form>
  );
};
