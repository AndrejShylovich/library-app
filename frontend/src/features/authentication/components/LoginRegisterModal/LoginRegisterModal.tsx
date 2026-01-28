import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import type React from "react";
import { useLoginRegisterModal } from "./useLoginRegisterModal";
import { Modal } from "../../../../shared/ui/Modal/Modal";

export const LoginRegisterModal: React.FC = () => {
  const { isLogin, closeModal, toggleForm } = useLoginRegisterModal();

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
