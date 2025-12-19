import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/ReduxStore";
import { useEffect, useState, useCallback } from "react";
import { setDisplayLogin } from "../../../../store/slices/ModalSlice";
import { Modal } from "../../../../components";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";

export const LoginRegisterModal: React.FC = () => {
  const { loggedInUser } = useSelector((state: RootState) => state.authentification);
  const dispatch = useDispatch<AppDispatch>();

  const [isLogin, setIsLogin] = useState(true);

  const closeModal = useCallback(() => {
    dispatch(setDisplayLogin(false));
  }, [dispatch]);

  const toggleForm = useCallback(() => {
    setIsLogin(prev => !prev);
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("userId", loggedInUser._id);
      dispatch(setDisplayLogin(false));
    }
  }, [loggedInUser, dispatch]);

  return (
    <Modal toggleModal={closeModal}>
      {isLogin ? (
        <LoginForm toggleRegister={toggleForm} />
      ) : (
        <RegisterForm toggleLogin={toggleForm} />
      )}
    </Modal>
  );
};
