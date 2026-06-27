import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../shared/store/ReduxStore";
import { useCallback, useEffect, useState } from "react";
import { setDisplayLogin } from "../../../shared/store/slices/ModalSlice";

export const useLoginRegisterModal = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { loggedInUser } = useSelector((state: RootState) => state.user);
  const [isLogin, setIsLogin] = useState(true);

  const closeModal = useCallback(() => {
    dispatch(setDisplayLogin(false));
  }, [dispatch]);

  const toggleForm = useCallback(() => {
    setIsLogin((prev) => !prev);
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("userId", loggedInUser._id);
      dispatch(setDisplayLogin(false));
    }
  }, [loggedInUser, dispatch]);
  
  return { isLogin, closeModal, toggleForm };
};
