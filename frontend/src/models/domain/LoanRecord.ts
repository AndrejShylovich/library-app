import type { DomainBook } from "./Book";

export interface DomainLoanRecord {
  id: string;
  status: "LOANED" | "AVAILABLE";
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