import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { setDisplayLogin } from "@/shared/store/slices/ModalSlice";

export const useLoginRegisterModal = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const closeModal = useCallback(() => {
    dispatch(setDisplayLogin(false));
  }, [dispatch]);

  const toggleForm = useCallback(() => {
    setIsLogin((prev) => !prev);
  }, []);

  return {
    isLogin,
    closeModal,
    toggleForm,
  };
};
