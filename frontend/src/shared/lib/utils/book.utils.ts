import type { DomainBook } from "../../../entities/book/model/domain/Book";

export function mapAuthorsToString(book: DomainBook): string {
  return book.authors.join(", ");
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

export const formatDate = (date: Date) =>
  dateFormatter.format(new Date(date));