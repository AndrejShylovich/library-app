import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../../../store/ReduxStore";
import { useEditableUser } from "./useEditableUser";
import { useEmailAvailability } from "./useEmailAvailability";
import { resetUser, updateUser } from "../../../../../store/slices/AuthenticationSlice";

export const useUpdateUserForm = () => {
  const { loggedInUser, profileUser } = useSelector(
    (state: RootState) => state.authentication
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const disabled = loggedInUser?._id !== profileUser?._id;
 

  const { user, isEditing, updateField, setIsEditing } = useEditableUser(profileUser);
  const { emailError, checking, checkEmail } = useEmailAvailability();
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof typeof user;
    const value = e.target.value;

    updateField(name, value);
    const originalEmail = profileUser?.email;

    if (name === "email") await checkEmail(value, originalEmail);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user && !emailError) await dispatch(updateUser(user));
    setIsEditing(false);
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    dispatch(resetUser("loggedInUser"));
    dispatch(resetUser("profileUser"));
    navigate("/");
  };

  return { user, isEditing, disabled, emailError, checking, handleChange, handleSubmit, handleLogout };
};
