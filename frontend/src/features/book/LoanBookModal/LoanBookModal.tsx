import { LoanBookModalContext } from "./LoanBookModalContent";
import { useLoanBookModal } from "./useLoanBookModal";
import { Modal } from "../../../shared/ui/Modal/Modal";

export const LoanBookModal: React.FC = () => {
  const { closeModal, currentBook } = useLoanBookModal();

  return (
    <Modal toggleModal={closeModal}>
      {currentBook && <LoanBookModalContext book={currentBook} />}
    </Modal>
  );
};
