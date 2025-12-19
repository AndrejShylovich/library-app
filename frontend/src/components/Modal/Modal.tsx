// Modal.tsx
import React from "react";
import "./Modal.css";

interface ModalProps {
  toggleModal: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ toggleModal, children }) => {
  // Закрытие при клике на фон
  const handleBackgroundClick = () => toggleModal();

  // Предотвращаем закрытие при клике внутри модалки
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

  return (
    <div className="modal-bg" onClick={handleBackgroundClick}>
      <div className="modal" role="dialog" aria-modal="true" onClick={handleModalClick}>
        <button
          className="modal-exit"
          onClick={toggleModal}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
