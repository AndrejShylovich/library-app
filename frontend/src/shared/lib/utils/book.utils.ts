import type { DomainBook } from "../../../entities/book/model/domain/Book";

export function mapAuthorsToString(book: DomainBook): string {
  return book.authors.join(", ");
}

