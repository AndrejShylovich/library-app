import type { DomainBook } from "../../../entities/book/model/domain/Book";
import { BookCheckin } from "../BookCheckIn/BookCheckIn";
import { BookCheckout } from "../BookCheckout/BookCheckout";

type Props = {
  book: DomainBook;
};

export const LoanBookModalContext: React.FC<Props> = ({ book }) => {
  const latestRecord = book.records[0];
  const isAvailable = !latestRecord || latestRecord.status === "AVAILABLE";

  return isAvailable ? <BookCheckout /> : <BookCheckin />;
};
