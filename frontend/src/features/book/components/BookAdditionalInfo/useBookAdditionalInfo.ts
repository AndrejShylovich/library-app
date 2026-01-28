import type { Book } from "../../../../models/Book";

export const useBookAdditionalInfo = (book: Book) => {
  return [
    { label: "Published By:", value: book.publisher },
    {
      label: "Published On:",
      value: new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        new Date(book.publicationDate),
      ),
    },
    { label: "ISBN:", value: book.barcode },
    { label: "Number of Pages:", value: book.pages },
  ];
};
