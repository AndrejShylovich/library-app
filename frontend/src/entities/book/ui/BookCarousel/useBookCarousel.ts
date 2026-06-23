import { useEffect, useState } from "react";
import type { DomainBook } from "../../model/domain/Book";

export const useBookCarousel = (books: DomainBook[]) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [books]);

  const hasBooks = books.length > 0;

  const shift = (delta: number) => {
    if (!hasBooks) return;
    setIndex((prev) => (prev + delta + books.length) % books.length);
  };

  const currentBook = hasBooks ? books[index] : null;

  return {
    index,
    currentBook,
    shift,
    hasBooks,
  };
};
