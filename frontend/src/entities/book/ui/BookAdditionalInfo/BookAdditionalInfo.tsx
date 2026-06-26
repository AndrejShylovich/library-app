import type React from "react";
import type { DomainBook } from "../../model/domain/Book";
import "./BookAdditionalInfo.css";
import { getBookAdditionalInfo } from "./getBookAdditionalInfo";

interface BookAdditionalInfoProps {
  book: DomainBook;
}

export const BookAdditionalInfo: React.FC<BookAdditionalInfoProps> = ({
  book,
}) => {
  const infoItems = getBookAdditionalInfo(book);

  return (
    <section className="additional-book-info">
      <h2>Additional Information about: {book.title}</h2>

      <div className="additional-book-info-container">
        {infoItems.map(({ label, value }) => (
          <div key={label} className="additional-book-info-group">
            <h4 className="additional-book-info-text">{label}</h4>
            <p className="additional-book-info-text">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
