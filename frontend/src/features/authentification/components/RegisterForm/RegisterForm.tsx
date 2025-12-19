import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { useEffect, useState } from "react";
import {
  registerUser,
  resetRegisterSuccess,
} from "../../../../store/slices/AuthentificationSlice";
import "./RegisterForm.css";

interface RegisterFormProps {
  toggleLogin(): void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ toggleLogin }) => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.authentification);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      registerUser({
        type: "PATRON",
        ...formData,
      })
    );
  };

  useEffect(() => {
    dispatch(resetRegisterSuccess());
  }, [dispatch]);

  return (
    <form className="register-form" onSubmit={handleRegisterUser}>
      <h2>Enter your information</h2>

      {authState.error && (
        <p className="register-form-error">There was an error</p>
      )}

      <div className="register-form-name-group">
        <div className="register-form-name-input-group">
          <h6>First Name</h6>
          <input
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
          <input
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
        <input
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
        <input
          className="register-form-input"
          placeholder="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button className="register-form-submit" type="submit" disabled={authState.loading}>
        Register
      </button>

      {authState.registerSuccess && (
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
