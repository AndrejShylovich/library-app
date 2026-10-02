import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { DomainUser } from "@/entities/user/model/domain/User";

import { useMe } from "@/entities/user/model/hooks/useMe";
import { useUpdateUser } from "@/entities/user/model/hooks/useUpdateUser";

import { useEditableUser } from "./useEditableUser";
import { useEmailAvailability } from "./useEmailAvailability";

import { useLogoutUserMutation } from "@/entities/user/api/userQueryApi";

export const useUpdateUserForm = (profileUser?: DomainUser) => {
  const navigate = useNavigate();

  const { user: loggedInUser } = useMe();

  const [updateUser, updateState] = useUpdateUser();
  const [logout] = useLogoutUserMutation();

  const { isLoading, isSuccess, isError } = updateState;

  const disabled = loggedInUser?.id !== profileUser?.id;

  const domainUser = useMemo(() => profileUser, [profileUser]);

  const { user, isEditing, updateField, setIsEditing } =
    useEditableUser(domainUser);

  const { emailError, checking, emailChecked, checkEmail, resetEmailCheck } =
    useEmailAvailability();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to update profile");
    }
  }, [isError]);

  useEffect(() => {
    if (!user?.email) return;

    const timer = setTimeout(() => {
      checkEmail(user.email, profileUser?.email);
    }, 400);

    return () => clearTimeout(timer);
  }, [user?.email, profileUser?.email, checkEmail]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (name === "email") {
        resetEmailCheck();
      }

      updateField(name as keyof typeof user, value);
    },
    [updateField, resetEmailCheck],
  );

  const handleSubmit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!user || emailError || !emailChecked) return;

      try {
        await updateUser(user);

        setIsEditing(false);
      } catch (error) {
        console.error(error);
      }
    },
    [user, emailError, updateUser, setIsEditing, emailChecked],
  );

  const handleLogout = useCallback(async () => {
    await logout();
    navigate("/");
  }, [logout, navigate]);

  return {
    user,
    isEditing,
    disabled,

    emailError,
    checking,
    emailChecked,

    isLoading,
    isSuccess,
    isError,

    handleChange,
    handleSubmit,
    handleLogout,
  };
};
