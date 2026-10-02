import { LoanBookModalContext } from "./LoanBookModalContent";
import { Modal } from "@/shared/ui/Modal/Modal";
import type { DomainBook } from "@/entities/book/model/domain/Book";

type Props = {
  book: DomainBook;
  onClose: () => void;
};

export const LoanBookModal = ({ book, onClose }: Props) => {
  return (
    <Modal toggleModal={onClose}>
      <LoanBookModalContext book={book} />
    </Modal>
  );
};
