import type { Book } from "../../../models/Book";

export function mapAuthorsToString(book: Book): string {
  return book.authors.join(", ");
}

