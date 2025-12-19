import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import {
  useEffect,
  useState,
  useCallback,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  resetUser,
  updateUser,
} from "../../../../store/slices/AuthentificationSlice";
import type { User } from "../../../../models/User";
import axios from "axios";
import "./UpdateUserForm.css";

// -------------------- InputField --------------------
const InputField: React.FC<{
  label: string;
  name: keyof User;
  value?: string;
  canEdit: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}> = ({ label, name, value, canEdit, onChange, error }) => (
  <div className="update-user-input-group" style={{ position: "relative" }}>
    <h4>{label}</h4>
    <input
      className="update-user-input"
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={!canEdit}
    />

    {error && <p className="error-message">{error}</p>}
  </div>
);

// -------------------- UpdateUserForm --------------------
export const UpdateUserForm: React.FC = () => {
  const { loggedInUser, profileUser } = useSelector(
    (state: RootState) => state.authentification
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const canEdit = loggedInUser?._id === profileUser?._id;

  useEffect(() => {
    if (profileUser) {
      setUser({ ...profileUser });
    }
  }, [profileUser]);

  // -------------------- Проверка доступности email --------------------
  const checkEmailAvailability = useCallback(
    async (email: string) => {
      if (!email || email === profileUser?.email) return true; // если email пустой или не изменился
      try {
        setCheckingEmail(true);
        const res = await axios.post("http://localhost:8000/auth/check-email", {
          email,
        });
        setCheckingEmail(false);
        return res.data.available; // true если свободен
      } catch (error) {
        console.error(error);
        setCheckingEmail(false);
        return false;
      }
    },
    [profileUser]
  );

  // -------------------- Изменение полей --------------------
  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setIsEditing(true);
      if (user && e.target.name) {
        const updatedUser = { ...user, [e.target.name]: e.target.value };
        setUser(updatedUser);

        if (e.target.name === "email") {
          const available = await checkEmailAvailability(e.target.value);
          setEmailError(available ? null : "Email уже занят, вы не сможете его обновить");
        }
      }
    },
    [user, checkEmailAvailability]
  );

  // -------------------- Сохранение профиля --------------------
  const handleSubmit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (user && !emailError) {
        dispatch(updateUser(user));
        setIsEditing(false);
      }
    },
    [user, emailError, dispatch]
  );

  // -------------------- Логаут --------------------
  const handleLogout = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      localStorage.removeItem("userId");
      dispatch(resetUser("loggedInUser"));
      dispatch(resetUser("profileUser"));
      navigate("/");
    },
    [dispatch, navigate]
  );

  return (
    <form className="update-user-form">
      <InputField
        label="First Name:"
        name="firstName"
        value={user?.firstName}
        canEdit={canEdit}
        onChange={handleChange}
      />
      <InputField
        label="Last Name:"
        name="lastName"
        value={user?.lastName}
        canEdit={canEdit}
        onChange={handleChange}
      />
      <InputField
        label="Email:"
        name="email"
        value={user?.email}
        canEdit={canEdit}
        onChange={handleChange}
        error={emailError}
      />

      {isEditing && (
        <button
          className="profile-button"
          onClick={handleSubmit}
          disabled={!!emailError || checkingEmail} // блокировка если email занят или идет проверка
        >
          {checkingEmail ? "Проверка email..." : "Update Profile"}
        </button>
      )}

      {canEdit && (
        <button className="profile-button" onClick={handleLogout}>
          Log Out
        </button>
      )}
    </form>
  );
};
