import type { LoanRecordDto } from "@/entities/loan-record/model/dto/LoanRecordDto";
import type { CheckinBookDto } from "../dto/BookDto";

export const createCheckinRecord = (
  payload: CheckinBookDto,
): LoanRecordDto => ({
  ...payload.book.records[0],
  status: "AVAILABLE",
  returnedDate: new Date().toISOString(),
  employeeIn: payload.employee._id,
  item: payload.book._id,
});
