import type { DomainBook } from "../../model/domain/Book";

import { Button } from "@/shared/ui/Button/Button";
import { BookCard } from "../BookCard/BookCard";

import { useBookCarousel } from "./useBookCarousel";

import "./BookCarousel.css";

interface BookCarouselProps {
  books: DomainBook[];
}

export const BookCarousel: React.FC<BookCarouselProps> = ({ books }) => {
  const {
    currentBook,
    hasBooks,
    showPrevious,
    showNext,
  } = useBookCarousel(books);

  if (!hasBooks) {
    return (
      <div className="book-carousel empty" aria-label="Book Carousel">
        <p>No available books</p>
      </div>
    );
  }

  return (
    <div
      className="book-carousel"
      role="region"
      aria-label="Book Carousel"
    >
      <Button
        className="book-carousel-button left"
        onClick={showPrevious}
        aria-label="Previous book"
      >
        &lt;
      </Button>

      <Button
        className="book-carousel-button right"
        onClick={showNext}
        aria-label="Next book"
      >
        &gt;
      </Button>

      <div className="book-carousel-track">
        <BookCard book={currentBook} />
      </div>
    </div>
  );
};