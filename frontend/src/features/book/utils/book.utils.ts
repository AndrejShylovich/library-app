import type { DomainBook as Book } from "../../../models/domain/Book";

export function mapAuthorsToString(book: Book): string {
  return book.authors.join(", ");
}

