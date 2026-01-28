import type React from "react";
import type { Book } from "../../../../models/Book";
import { mapAuthorsToString } from "../../utils/book.utils";
import { useBookCard } from "./useBookCard";
import "./BookCard.css";
import { Button } from "../../../../shared/ui/Button/Button";

interface BookCardProps {
  book: Book;
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
