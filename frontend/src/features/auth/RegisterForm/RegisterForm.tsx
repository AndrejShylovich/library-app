import { useRegisterForm } from "./useRegisterForm";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import "./RegisterForm.css";

interface RegisterFormProps {
  toggleLogin(): void;
}

const fields = [
  { name: "firstName", label: "First Name", placeholder: "first", type: "text" },
  { name: "lastName", label: "Last Name", placeholder: "last", type: "text" },
  { name: "email", label: "Email", placeholder: "email", type: "email" },
  { name: "password", label: "Password", placeholder: "password", type: "password" },
] as const;

export const RegisterForm: React.FC<RegisterFormProps> = ({
  toggleLogin,
}) => {
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
        {fields.map((field) => (
          <div
            key={field.name}
            className="register-form-input-group"
          >
            <h6>{field.label}</h6>
            <Input
              className="register-form-input-name"
              placeholder={field.placeholder}
              name={field.name}
              type={field.type}
              required
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <Button
        className="register-form-submit"
        type="submit"
        disabled={loading}
      >
        Register
      </Button>

      {registerSuccess && (
        <p className="register-form-success">
          Registered successfully.{" "}
          <button
            type="button"
            className="register-form-login"
            onClick={toggleLogin}
          >
            Login here
          </button>
        </p>
      )}
    </form>
  );
};