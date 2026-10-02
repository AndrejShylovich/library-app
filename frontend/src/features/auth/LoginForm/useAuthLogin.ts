import { useLoginUser } from "@/entities/user/model/hooks/useLoginUser";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { LoginUserDto } from "@/entities/user/model/dto/UserDto";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/shared/store/ReduxStore";
import { setDisplayLogin } from "@/shared/store/slices/ModalSlice";

export const useAuthLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [loginUser, { isLoading, isError }] = useLoginUser();

  const login = useCallback(
    async (data: LoginUserDto) => {
      try {
        await loginUser(data);

        toast.success("You have successfully logged in");
        dispatch(setDisplayLogin(false));

        navigate("/");
      } catch (e) {
        console.error(e);
      }
    },
    [loginUser, navigate, dispatch],
  );

  useEffect(() => {
    if (isError) {
      toast.error("Failed to log in");
    }
  }, [isError]);

  return {
    login,
    loading: isLoading,
    isError,
  };
};
