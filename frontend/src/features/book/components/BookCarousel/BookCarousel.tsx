import type React from "react";
import type { Book } from "../../../../models/Book";
import { BookCard } from "../BookCard/BookCard";
import { useBookCarousel } from "./useBookCarousel";
import "./BookCarousel.css";
import { Button } from "../../../../shared/ui/Button/Button";

interface BookCarouselProps {
  books: Book[];
}

export const BookCarousel: React.FC<BookCarouselProps> = ({ books }) => {
  const { currentBook, shift, hasBooks } = useBookCarousel(books);

  if (!hasBooks) {
    return (
      <div className="book-carousel empty" aria-label="Book Carousel">
        <p>No available books</p>
      </div>
    );
  }

  return (
    <div className="book-carousel" role="region" aria-label="Book Carousel">
      <Button
        className="book-carousel-button left"
        onClick={() => shift(1)}
        aria-label="Scroll Left"
      >
        &lt;
      </Button>

      <Button
        className="book-carousel-button right"
        onClick={() => shift(-1)}
        aria-label="Scroll Right"
      >
        &gt;
      </Button>

      <div className="book-carousel-track">
        {currentBook && <BookCard key={currentBook.barcode} book={currentBook} />}
      </div>
    </div>
  );
};
