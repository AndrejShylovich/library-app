import type React from "react";
import type { Book } from "../../../../models/Book";
import { useBookAdditionalInfo } from "./useBookAdditionalInfo";
import "./BookAdditionalInfo.css";

interface BookAdditionalInfoProps {
  book: Book;
}

interface InfoItem {
  label: string;
  value: string | number;
}

const InfoGroup: React.FC<InfoItem> = ({ label, value }) => (
  <div className="additional-book-info-group">
    <h4 className="additional-book-info-text">{label}</h4>
    <p className="additional-book-info-text">{value}</p>
  </div>
);

export const BookAdditionalInfo: React.FC<BookAdditionalInfoProps> = ({
  book,
}) => {
  const infoItems = useBookAdditionalInfo(book);

  return (
    <div className="additional-book-info">
      <h2>Additional Information about: {book.title}</h2>
      <div className="additional-book-info-container">
        {infoItems.map((item) => (
          <InfoGroup key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
};
