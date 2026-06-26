import type { DomainBook } from "../../model/domain/Book";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

export const getBookAdditionalInfo = (book: DomainBook) => [
  {
    label: "Published By:",
    value: book.publisher,
  },
  {
    label: "Published On:",
    value: dateFormatter.format(new Date(book.publicationDate)),
  },
  {
    label: "ISBN:",
    value: book.barcode,
  },
  {
    label: "Number of Pages:",
    value: book.pages,
  },
];