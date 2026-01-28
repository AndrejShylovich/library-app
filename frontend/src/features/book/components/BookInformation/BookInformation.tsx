import type React from "react";
import type { Book } from "../../../../models/Book";
import { mapAuthorsToString } from "../../utils/book.utils";
import "./BookInformation.css";

interface BookInfoProps {
  book: Book;
}

export const BookInformation: React.FC<BookInfoProps> = ({ book }) => {
  const { title, cover, description } = book;

  return (
    <section className="book-info">
      <div className="book-info-container">
        <img className="book-info-cover" src={cover} alt={title} />

        <div className="book-info-details">
          <h2>{title}</h2>
          <h3>{mapAuthorsToString(book)}</h3>
          <p>{description || "No description available."}</p>
        </div>
      </div>
    </section>
  );
};
