import type { LoanStatus } from "../../../../shared/types/types";
import type { BookDto } from "../../../book/model/dto/BookDto";

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
