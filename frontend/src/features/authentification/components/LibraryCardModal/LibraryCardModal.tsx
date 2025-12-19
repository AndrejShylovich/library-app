import React from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store/ReduxStore";
import { setDisplayLibraryCard } from "../../../../store/slices/ModalSlice";
import { Modal } from "../../../../components";
import { RegisterLibraryCardForm } from "../RegisterLibraryCardForm/RegisterLibraryCardForm";

export const LibraryCardModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(setDisplayLibraryCard(false));
  };

  return (
    <Modal toggleModal={handleClose}>
      <RegisterLibraryCardForm />
    </Modal>
  );
};