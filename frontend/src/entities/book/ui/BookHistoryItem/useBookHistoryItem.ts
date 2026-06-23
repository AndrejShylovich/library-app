import { useNavigate } from "react-router-dom";
import type { DomainLoanRecord } from "../../../loan-record/model/domain/LoanRecord";

export const useBookHistoryItem = (record: DomainLoanRecord) => {
  const navigate = useNavigate();

  const visitProfile = () => navigate(`/profile/${record.patronId}`);

  const loanDate = new Date(record.loanedDate).toDateString();
  const returnedDate = record.returnedDate
    ? new Date(record.returnedDate).toDateString()
    : null;
  const dueDate = new Date(record.dueDate).toDateString();

  const isAvailable = record.status === "AVAILABLE";

  return {
    loanDate,
    returnedDate,
    dueDate,
    isAvailable,
    visitProfile,
  };
};
