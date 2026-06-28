import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "@/shared/store/ReduxStore";
import { loginUser } from "@/entities/user/model/userSlice";

export const useAuthLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { error, loading, profileUser } = useSelector(
    (state: RootState) => state.user,
  );

  const login = (data: { email: string; password: string }) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error ?? "Failed to log in");
    }
  }, [error]);

  useEffect(() => {
    if (!profileUser) return;

    toast.success("You have successfully logged in");
    navigate("/");
  }, [profileUser, navigate]);

  return {
    login,
    loading,
    error,
  };
};