import type React from "react";
import "./RegisterForm.css";
import { useRegisterForm } from "./useRegisterForm";
import { Input } from "../../../../shared/ui/Input/Input";
import { Button } from "../../../../shared/ui/Button/Button";

interface RegisterFormProps {
  toggleLogin(): void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ toggleLogin }) => {
  const {
    formData,
    error,
    loading,
    registerSuccess,
    handleChange,
    handleSubmit,
  } = useRegisterForm();

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Enter your information</h2>

      {error && <p className="register-form-error">There was an error</p>}

      <div className="register-form-name-group">
        <div className="register-form-name-input-group">
          <h6>First Name</h6>
          <Input
            className="register-form-input-name"
            placeholder="first"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="register-form-name-input-group">
          <h6>Last Name</h6>
          <Input
            className="register-form-input-name"
            placeholder="last"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="register-form-input-group">
        <h6>Email</h6>
        <Input
          className="register-form-input"
          placeholder="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="register-form-input-group">
        <h6>Password</h6>
        <Input
          className="register-form-input"
          placeholder="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <Button className="register-form-submit" type="submit" disabled={loading}>
        Register
      </Button>

      {registerSuccess && (
        <p>
          Registered Successfully.
          <span className="register-form-login" onClick={toggleLogin}>
            Login here.
          </span>
        </p>
      )}
    </form>
  );
};
