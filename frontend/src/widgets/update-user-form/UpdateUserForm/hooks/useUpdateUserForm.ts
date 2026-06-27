import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../shared/store/ReduxStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useCallback } from "react";
import { UserMapper } from "../../../../entities/user/model/mapper/UserMapper";
import { useEditableUser } from "./useEditableUser";
import { useEmailAvailability } from "./useEmailAvailability";
import { toast } from "react-toastify";
import {
  resetUpdateSuccess,
  resetUser,
  updateUser,
} from "../../../../entities/user/model/userSlice";
import { clearAuthData } from "../../../../shared/lib/auth/authStorage";

export const useUpdateUserForm = () => {
  const { loggedInUser, profileUser, updateSuccess, error } = useSelector(
    (state: RootState) => state.user,
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isDisabled = loggedInUser?._id !== profileUser?._id;

  const domainUser = useMemo(() => {
    return profileUser ? UserMapper.toDomain(profileUser) : undefined;
  }, [profileUser]);

  const { user, isEditing, updateField, setIsEditing } =
    useEditableUser(domainUser);

  const { emailError, checking, checkEmail } = useEmailAvailability();

  useEffect(() => {
    if (!updateSuccess) return;

    toast.success("Profile updated successfully");
    dispatch(resetUpdateSuccess());
  }, [updateSuccess, dispatch]);

  useEffect(() => {
    if (!error) return;

    toast.error("Failed to update profile");
  }, [error]);

  useEffect(() => {
    const email = user?.email;
    const originalEmail = profileUser?.email;

    if (!email) return;

    const timer = setTimeout(() => {
      checkEmail(email, originalEmail);
    }, 400);

    return () => clearTimeout(timer);
  }, [user?.email, profileUser?.email, checkEmail]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      updateField(name as keyof typeof user, value);
    },
    [updateField],
  );

  const handleSubmit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!user || emailError) return;

      const dto = UserMapper.toDto(user);

      await dispatch(updateUser(dto));
      setIsEditing(false);
    },
    [user, emailError, dispatch, setIsEditing],
  );

  const handleLogout = useCallback(() => {
    clearAuthData();

    dispatch(resetUser("loggedInUser"));
    dispatch(resetUser("profileUser"));

    navigate("/");
  }, [dispatch, navigate]);

  return {
    user,
    isEditing,
    disabled: isDisabled,
    emailError,
    checking,
    handleChange,
    handleSubmit,
    handleLogout,
  };
};
