import type { Book } from "../../../models/Book";
import { BookCheckout } from "../components/BookCheckout/BookCheckout";
import { BookCheckin } from "../components/BookCheckIn/BookCheckIn";

export function mapAuthorsToString(book: Book): string {
  return book.authors.join(", ");
}

export function determineLoanModalContent(book: Book): React.ReactElement {
  const latestRecord = book.records[0];
  const isAvailable = !latestRecord || latestRecord.status === "AVAILABLE";

  return isAvailable ? <BookCheckout /> : <BookCheckin />;
}
