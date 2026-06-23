import type { DomainBook } from "../../model/domain/Book";
import { BookHistoryItem } from "../BookHistoryItem/BookHistoryItem";
import "./BookHistory.css";

interface BookHistoryProps {
  book: DomainBook;
}

export const BookHistory: React.FC<BookHistoryProps> = ({ book }) => {
  const { records } = book;

  return (
    <div className="book-history">
      <h2>Loan History</h2>

      <div className="book-history-box">
        {records.length > 0 ? (
          records.map((record) => (
            <BookHistoryItem key={record.id} record={record} />
          ))
        ) : (
          <p className="book-history-empty">No loan history available</p>
        )}
      </div>
    </div>
  );
};
