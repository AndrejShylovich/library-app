import type { LoanRecordDto } from "@/entities/loan-record/model/dto/LoanRecordDto";
import type { CheckoutBookDto } from "../dto/BookDto";
import { createDueDate } from "./createDueDate";

export const createCheckoutRecord = (
  payload: CheckoutBookDto,
  patronId: string,
): Partial<LoanRecordDto> => ({
  status: "LOANED",
  loanedDate: new Date().toISOString(),
  dueDate: createDueDate(),
  patron: patronId,
  employeeOut: payload.employee._id,
  item: payload.book._id,
});