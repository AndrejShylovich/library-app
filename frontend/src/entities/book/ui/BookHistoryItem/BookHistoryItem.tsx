import { Link } from "react-router-dom";

import type { DomainLoanRecord } from "../../../loan-record/model/domain/LoanRecord";

import "./BookHistoryItem.css";
import { formatDate } from "../../../../shared/lib/utils/date.utils";

interface BookHistoryItemProps {
  record: DomainLoanRecord;
}

export const BookHistoryItem: React.FC<BookHistoryItemProps> = ({ record }) => {
  const isReturned = record.status === "AVAILABLE";

  return (
    <div className="book-history-item">
      <h4>
        Status:{" "}
        <span className={isReturned ? "green" : "red"}>{record.status}</span>
      </h4>

      <div className="book-history-item-group">
        <Link to={`/profile/${record.patronId}`} className="book-history-link">
          Patron: {record.patronId}
        </Link>

        <p>Loan Date: {formatDate(record.loanedDate)}</p>

        {isReturned && record.returnedDate && (
          <p>Return Date: {formatDate(record.returnedDate)}</p>
        )}
      </div>

      <div className="book-history-item-group">
        <p>Loaner: {record.employeeOutId}</p>

        <p>Return By Date: {formatDate(record.dueDate)}</p>

        {isReturned && record.employeeInId && (
          <p>Returner: {record.employeeInId}</p>
        )}
      </div>
    </div>
  );
};
