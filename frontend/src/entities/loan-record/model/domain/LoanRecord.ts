import type { DomainBook } from "@/entities/book/model/domain/Book";
import type { LoanStatus } from "@/shared/types/types";

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
