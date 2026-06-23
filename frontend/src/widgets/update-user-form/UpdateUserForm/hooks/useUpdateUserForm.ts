import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../shared/store/ReduxStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { UserMapper } from "../../../../entities/user/model/mapper/UserMapper";
import { useEditableUser } from "./useEditableUser";
import { useEmailAvailability } from "./useEmailAvailability";
import { toast } from "react-toastify";
import {
  resetUpdateSuccess,
  resetUser,
  updateUser,
} from "../../../../entities/user/model/userSlice";

export const useUpdateUserForm = () => {
  const { loggedInUser, profileUser, updateSuccess, error } = useSelector(
    (state: RootState) => state.user,
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const disabled = loggedInUser?._id !== profileUser?._id;

  const domainProfileUser = useMemo(
    () => (profileUser ? UserMapper.toDomain(profileUser) : undefined),
    [profileUser],
  );

  const { user, isEditing, updateField, setIsEditing } =
    useEditableUser(domainProfileUser);

  const { emailError, checking, checkEmail } = useEmailAvailability();

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Profile updated successfully");
      dispatch(resetUpdateSuccess());
    }
  }, [updateSuccess, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to update profile");
    }
  }, [error]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof typeof user;
    const value = e.target.value;

    updateField(name, value);
    const originalEmail = profileUser?.email;

    if (name === "email") {
      await checkEmail(value, originalEmail);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user && !emailError) {
      const dto = UserMapper.toDto(user);
      await dispatch(updateUser(dto));
      setIsEditing(false);
    }
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    dispatch(resetUser("loggedInUser"));
    dispatch(resetUser("profileUser"));
    navigate("/");
  };

  return {
    user,
    isEditing,
    disabled,
    emailError,
    checking,
    handleChange,
    handleSubmit,
    handleLogout,
  };
};
