import { Modal } from "../../../../shared/ui/Modal/Modal";
import { RegisterLibraryCardForm } from "../RegisterLibraryCardForm/RegisterLibraryCardForm";
import { useLibraryCardModal } from "./useLibraryCardModal";
import type React from "react";

export const LibraryCardModal: React.FC = () => {
  const { closeModal } = useLibraryCardModal();

  return (
    <Modal toggleModal={closeModal}>
      <RegisterLibraryCardForm />
    </Modal>
  );
};
