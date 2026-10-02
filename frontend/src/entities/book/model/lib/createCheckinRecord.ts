import type { LoanRecordDto } from "@/entities/loan-record/model/dto/LoanRecordDto";
import type { CheckinBookDto } from "../dto/BookDto";

export const createCheckinRecord = (
  payload: CheckinBookDto,
): LoanRecordDto => {
  const activeRecord = payload.book.records.find(
    ({ status }) => status === "LOANED",
  );

  if (!activeRecord) {
    throw new Error(
      `Cannot check in book ${payload.book._id}: active loan not found`,
    );
  }

  return {
    ...activeRecord,
    status: "AVAILABLE",
    returnedDate: new Date().toISOString(),
    employeeIn: payload.employee._id,
    item: payload.book._id,
  };
};