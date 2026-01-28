import { Button } from "../../../../shared/ui/Button/Button";
import { Input } from "../../../../shared/ui/Input/Input";
import { useUpdateUserForm } from "./hooks/useUpdateUserForm";
import "./UpdateUserForm.css";

export const UpdateUserForm: React.FC = () => {
  const {
    user,
    isEditing,
    disabled,
    emailError,
    checking,
    handleChange,
    handleSubmit,
    handleLogout,
  } = useUpdateUserForm();

  return (
    <form className="update-user-form">
      <Input
        label="First Name:"
        name="firstName"
        value={user?.firstName}
        disabled={disabled}
        onChange={handleChange}
        className="update-user-input"
      />
      <Input
        label="Last Name:"
        name="lastName"
        value={user?.lastName}
        disabled={disabled}
        onChange={handleChange}
        className="update-user-input"
      />
      <Input
        label="Email:"
        name="email"
        value={user?.email}
        disabled={disabled}
        onChange={handleChange}
        error={emailError}
        className="update-user-input"
      />

      {isEditing && (
        <Button
          className="profile-button"
          onClick={handleSubmit}
          disabled={!!emailError || checking}
        >
          {checking ? "Checking email..." : "Update Profile"}
        </Button>
      )}

      {!disabled && (
        <Button className="profile-button" onClick={handleLogout}>
          Log Out
        </Button>
      )}
    </form>
  );
};
