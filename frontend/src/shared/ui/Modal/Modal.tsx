import React, { useEffect } from "react";
import "./Modal.css";
import { Button } from "../Button/Button";

interface ModalProps {
  toggleModal: () => void;
  children: React.ReactNode;
  titleId?: string;
}

export const Modal: React.FC<ModalProps> = ({
  toggleModal,
  children,
  titleId,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleModal]);

  return (
    <div className="modal-bg" role="presentation" onClick={toggleModal}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
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
