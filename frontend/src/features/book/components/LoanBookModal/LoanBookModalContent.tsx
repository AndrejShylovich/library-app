import type { Book } from "../../../../models/Book";
import { BookCheckin } from "../BookCheckIn/BookCheckIn";
import { BookCheckout } from "../BookCheckout/BookCheckout";

type Props = {
  book: Book;
};

export const LoanBookModalContext: React.FC<Props> = ({ book }) => {
  const latestRecord = book.records[0];
  const isAvailable = !latestRecord || latestRecord.status === "AVAILABLE";

  return isAvailable ? <BookCheckout /> : <BookCheckin />;
};
