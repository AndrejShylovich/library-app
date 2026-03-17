import type { LoanStatus } from "../../shared/types";
import type { DomainBook } from "./Book";

export interface DomainLoanRecord {
  id: string;
  status: LoanStatus;
  loanedDate: Date;
  dueDate: Date;
  returnedDate?: Date;
  patronId: string;
  employeeOutId: string;
  employeeInId?: string;
  itemId: string;
  item?: DomainBook;
  createdAt: Date;
  updatedAt: Date;
}