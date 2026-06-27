import { useDispatch } from "react-redux";
import { RegisterLibraryCardForm } from "../RegisterLibraryCardForm/RegisterLibraryCardForm";
import { Modal } from "../../../shared/ui/Modal/Modal";
import type { AppDispatch } from "../../../shared/store/ReduxStore";
import { setDisplayLibraryCard } from "../../../shared/store/slices/ModalSlice";

export const LibraryCardModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const closeModal = () => {
    dispatch(setDisplayLibraryCard(false));
  };

  return (
    <Modal toggleModal={closeModal}>
      <RegisterLibraryCardForm />
    </Modal>
  );
};