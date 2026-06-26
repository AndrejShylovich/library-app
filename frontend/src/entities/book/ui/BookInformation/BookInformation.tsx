import { mapAuthorsToString } from "../../../../shared/lib/utils/book.utils";
import type { DomainBook } from "../../model/domain/Book";

import "./BookInformation.css";

interface BookInformationProps {
  book: DomainBook;
}

export const BookInformation: React.FC<BookInformationProps> = ({
  book,
}) => {
  return (
    <section className="book-info">
      <div className="book-info-container">
        <img
          className="book-info-cover"
          src={book.cover}
          alt={`Cover of ${book.title}`}
        />

        <div className="book-info-details">
          <h2>{book.title}</h2>
          <h3>{mapAuthorsToString(book)}</h3>

          <p>
            {book.description?.trim() ||
              "No description available."}
          </p>
        </div>
      </div>
    </section>
  );
};