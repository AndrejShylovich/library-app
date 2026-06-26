import { useCallback, useEffect, useState } from "react";

import type { DomainBook } from "../../model/domain/Book";

export const useBookCarousel = (books: DomainBook[]) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [books]);

  const currentBook = books[index];

  const showPrevious = useCallback(() => {
    if (!books.length) return;

    setIndex((prev) => (prev + 1) % books.length);
  }, [books.length]);

  const showNext = useCallback(() => {
    if (!books.length) return;

    setIndex((prev) => (prev - 1 + books.length) % books.length);
  }, [books.length]);

  return {
    currentBook,
    hasBooks: books.length > 0,
    showPrevious,
    showNext,
  };
};