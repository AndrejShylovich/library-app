import { RegisterLibraryCardForm } from "../RegisterLibraryCardForm/RegisterLibraryCardForm";
import { useLibraryCardModal } from "./useLibraryCardModal";
import { Modal } from "../../../shared/ui/Modal/Modal";

export const LibraryCardModal: React.FC = () => {
  const { closeModal } = useLibraryCardModal();

  return (
    <Modal toggleModal={closeModal}>
      <RegisterLibraryCardForm />
    </Modal>
  );
};
