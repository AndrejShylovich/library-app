import { useState, useEffect } from "react";
import type { Book } from "../../../../models/Book";

export const useBookCarousel = (books: Book[]) => {
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
