import type { DomainBook } from "../../model/domain/Book";
import { Button } from "../../../../shared/ui/Button/Button";
import { useBookCarousel } from "./useBookCarousel";
import { BookCard } from "../BookCard/BookCard";
import "./BookCarousel.css";
interface BookCarouselProps {
  books: DomainBook[];
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
        {currentBook && (
          <BookCard key={currentBook.barcode} book={currentBook} />
        )}
      </div>
    </div>
  );
};
