import React from "react";
import "./Modal.css";
import { Button } from "../Button/Button";

interface ModalProps {
  toggleModal: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ toggleModal, children }) => {
  const handleBackgroundClick = () => toggleModal();

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

  return (
    <div className="modal-bg" onClick={handleBackgroundClick}>
      <div className="modal" role="dialog" aria-modal="true" onClick={handleModalClick}>
        <Button
          className="modal-exit"
          onClick={toggleModal}
          aria-label="Close modal"
        >
          ×
        </Button>
        {children}
      </div>
    </div>
  );
};
