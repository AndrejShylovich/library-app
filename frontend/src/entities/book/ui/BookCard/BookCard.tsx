import { mapAuthorsToString } from "../../../../shared/lib/utils/book.utils";
import { Button } from "../../../../shared/ui/Button/Button";
import "./BookCard.css";
import type { DomainBook } from "../../model/domain/Book";
import { useBookCard } from "./useBookCard";

interface BookCardProps {
  book: DomainBook;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { available, buttonClass, handleLoan, displayBook } = useBookCard(book);

  return (
    <div id="book-card" className="book-card" onClick={displayBook}>
      <img className="book-card-cover" src={book.cover} alt={book.title} />
      <div className="book-card-info">
        <h1 className="book-card-title">{book.title}</h1>
        <h3 className="book-card-author">{mapAuthorsToString(book)}</h3>
      </div>
      <Button className={buttonClass} onClick={handleLoan}>
        Status: {available ? "AVAILABLE" : "UNAVAILABLE"}
      </Button>
    </div>
  );
};
