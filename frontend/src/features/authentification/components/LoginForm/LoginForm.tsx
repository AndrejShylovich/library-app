import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { loginUser } from "../../../../store/slices/AuthentificationSlice";

import "./LoginForm.css";

interface LoginFormProps {
  toggleRegister(): void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ toggleRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading } = useSelector(
    (state: RootState) => state.authentification
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleLoginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    dispatch(loginUser({ email, password }));
  };

  return (
    <form className="login-form" onSubmit={handleLoginUser}>
      <h2>Please Login</h2>
      {error && (
        <p className="login-form-error">Username or password incorrect</p>
      )}

      <div className="login-form-input-group">
        <h6>Email</h6>
        <input
          className="login-form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="login-form-input-group">
        <h6>Password</h6>
        <input
          className="login-form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className="login-form-submit" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p>
        Don't have an account?{" "}
        <span className="login-form-register" onClick={toggleRegister}>
          Create one here.
        </span>
      </p>
    </form>
  );
};
