import type { DomainBook } from "../domain/Book";

export const isBookAvailable = (book: DomainBook) =>
  !book.records.length ||
  book.records[0].status === "AVAILABLE";