import type { BookDto } from "./BookDto";

export interface LoanRecordDto {
  _id: string;
  status: "LOANED" | "AVAILABLE";
  loanedDate: string;
  dueDate: string;
  returnedDate?: string;
  patron: string;
  employeeOut: string;
  employeeIn?: string;
  item: LoanRecordItemDto;
  createdAt: string;
  updatedAt: string;
}

export type LoanRecordItemDto =
  | string
  | { _id: string }
  | BookDto;