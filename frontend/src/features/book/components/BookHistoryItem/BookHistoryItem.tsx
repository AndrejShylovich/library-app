import type React from "react";
import type { LoanRecord } from "../../../../models/LoanRecord";
import { useBookHistoryItem } from "./useBookHistoryItem";
import "./BookHistoryItem.css";

interface BookHistoryItemProps {
  record: LoanRecord;
}

export const BookHistoryItem: React.FC<BookHistoryItemProps> = ({ record }) => {
  const { loanDate, returnedDate, dueDate, isAvailable, visitProfile } =
    useBookHistoryItem(record);

  return (
    <div className="book-history-item">
      <h4>
        Status:{" "}
        <span className={isAvailable ? "green" : "red"}>{record.status}</span>
      </h4>

      <div className="book-history-item-group">
        <p
          className="book-history-link"
          onClick={visitProfile}
          role="button"
          tabIndex={0}
        >
          Patron: {record.patron}
        </p>

        <p>Loan Date: {loanDate}</p>
        {isAvailable && returnedDate && <p>Return Date: {returnedDate}</p>}
      </div>

      <div className="book-history-item-group">
        <p>Loaner: {record.employeeOut}</p>
        <p>Return By Date: {dueDate}</p>
        {isAvailable && record.employeeIn && (
          <p>Returner: {record.employeeIn}</p>
        )}
      </div>
    </div>
  );
};
