import React from "react";
import { useLoanBookModal } from "./useLoanBookModal";
import { LoanBookModalContext } from "./LoanBookModalContent";
import { Modal } from "../../../../shared/ui/Modal/Modal";

export const LoanBookModal: React.FC = () => {
  const { closeModal, currentBook } = useLoanBookModal();

  return (
    <Modal toggleModal={closeModal}>
      {currentBook && <LoanBookModalContext book={currentBook} />}
    </Modal>
  );
};
