import { useNavigate } from "react-router-dom";
import type { LoanRecord } from "../../../../models/LoanRecord";
import { useMemo } from "react";

interface BookHistoryItemProps {
  record: LoanRecord;
}

export const BookHistoryItem: React.FC<BookHistoryItemProps> = ({ record }) => {
  const navigate = useNavigate();

  const visitProfile = () => navigate(`/profile/${record.patron}`);

  // Мемоизация дат
  const loanDate = useMemo(
    () => new Date(record.loanedDate).toDateString(),
    [record.loanedDate]
  );

  const returnedDate = useMemo(
    () => (record.returnedDate ? new Date(record.returnedDate).toDateString() : null),
    [record.returnedDate]
  );

  const dueDate = useMemo(
    () => new Date(record.dueDate).toDateString(),
    [record.dueDate]
  );

  const isAvailable = record.status === "AVAILABLE";

  return (
    <div className="book-history-item">
      <h4>
        Status:{" "}
        <span className={isAvailable ? "green" : "red"}>
          {record.status}
        </span>
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

        {isAvailable && returnedDate && (
          <p>Return Date: {returnedDate}</p>
        )}
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
