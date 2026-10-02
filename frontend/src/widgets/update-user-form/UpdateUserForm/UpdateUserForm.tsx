import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { useUpdateUserForm } from "./hooks/useUpdateUserForm";
import "./UpdateUserForm.css";
import type { DomainUser } from "@/entities/user/model/domain/User";

type Props = {
  profileUser?: DomainUser;
};

export const UpdateUserForm: React.FC<Props> = ({ profileUser }) => {
  const {
    user,
    isEditing,
    disabled,
    emailError,
    emailChecked,
    checking,
    handleChange,
    handleSubmit,
    handleLogout,
  } = useUpdateUserForm(profileUser);

  return (
    <form className="update-user-form">
      <Input
        label="First Name:"
        name="firstName"
        value={user?.firstName || ""}
        disabled={disabled}
        onChange={handleChange}
        className="update-user-input"
        autoComplete="given-name"
      />
      <Input
        label="Last Name:"
        name="lastName"
        value={user?.lastName || ""}
        disabled={disabled}
        onChange={handleChange}
        className="update-user-input"
        autoComplete="family-name"
      />
      <Input
        label="Email:"
        name="email"
        value={user?.email || ""}
        disabled={disabled}
        onChange={handleChange}
        error={emailError}
        className="update-user-input"
        autoComplete="email"
      />

      {isEditing && (
        <Button
          className="profile-button"
          onClick={handleSubmit}
          disabled={!!emailError || checking || !emailChecked}
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
