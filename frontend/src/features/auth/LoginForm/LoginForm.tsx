import { useLoginForm } from "./useLoginForm";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import "./LoginForm.css";

interface LoginFormProps {
  toggleRegister(): void;
}

const FIELD_LABELS = {
  email: "Email",
  password: "Password",
} as const;

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
        <h6>{FIELD_LABELS.email}</h6>
        <Input
          className="login-form-input"
          type="email"
          placeholder={FIELD_LABELS.email}
          value={email}
          onChange={handleEmailChange}
          required // Возвращаем нативную валидацию браузера
          aria-label={FIELD_LABELS.email}
        />
      </div>

      <div className="login-form-input-group">
        <h6>{FIELD_LABELS.password}</h6>
        <Input
          className="login-form-input"
          type="password"
          placeholder={FIELD_LABELS.password}
          value={password}
          onChange={handlePasswordChange}
          required
          aria-label={FIELD_LABELS.password}
        />
      </div>

      <Button className="login-form-submit" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      <p className="login-form-switch">
        Don't have an account?{" "}
        <button
          type="button"
          className="login-form-register"
          onClick={toggleRegister}
        >
          Create one here
        </button>
      </p>
    </form>
  );
};
