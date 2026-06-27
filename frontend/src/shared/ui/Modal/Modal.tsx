import { useEffect } from "react";

import { Button } from "../Button/Button";

import "./Modal.css";

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
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [toggleModal]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="modal-bg"
      role="presentation"
      onClick={toggleModal}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-label={
          titleId ? undefined : "Modal window"
        }
        onClick={(event) =>
          event.stopPropagation()
        }
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