import type { BookDto } from "@/entities/book/model/dto/BookDto";
import type { LoanStatus } from "@/shared/types/types";

export type LoanRecordItemDto = string | { _id: string } | BookDto;

export interface LoanRecordDto {
  _id: string;
  status: LoanStatus;
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
