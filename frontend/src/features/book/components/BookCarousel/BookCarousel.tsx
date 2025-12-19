import { useEffect, useState, useCallback, useMemo } from "react";
import type { Book } from "../../../../models/Book";
import { BookCard } from "../BookCard/BookCard";

import "./BookCarousel.css";

interface BookCarouselProps {
  books: Book[];
}

export const BookCarousel: React.FC<BookCarouselProps> = ({ books }) => {
  const [index, setIndex] = useState(0);

  // Сбрасываем индекс при обновлении массива книг
  useEffect(() => {
    setIndex(0);
  }, [books]);

  const hasBooks = books.length > 0;

  // Универсальное смещение карусели
  const shift = useCallback(
    (delta: number) => {
      if (!hasBooks) return;
      setIndex(prev => (prev + delta + books.length) % books.length);
    },
    [books, hasBooks]
  );

  const currentBook = useMemo(
    () => (hasBooks ? books[index] : null),
    [books, index, hasBooks]
  );

  if (!hasBooks) {
    return (
      <div className="book-carousel empty" aria-label="Карусель книг">
        <p>Нет доступных книг</p>
      </div>
    );
  }

  return (
    <div className="book-carousel" role="region" aria-label="Карусель книг">

      <button
        className="book-carousel-button left"
        onClick={() => shift(1)}
        aria-label="Листать влево"
      >
        &lt;
      </button>

      <button
        className="book-carousel-button right"
        onClick={() => shift(-1)}
        aria-label="Листать вправо"
      >
        &gt;
      </button>

      <div className="book-carousel-track">
        {currentBook && (
          <BookCard key={currentBook.barcode} book={currentBook} />
        )}
      </div>

    </div>
  );
};
