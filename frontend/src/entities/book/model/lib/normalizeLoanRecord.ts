import type { LoanRecordDto } from "../../../loan-record/model/dto/LoanRecordDto";

export const normalizeLoanRecord = (
  record: LoanRecordDto,
): LoanRecordDto => ({
  ...record,
  item: {
    _id: typeof record.item === "string"
      ? record.item
      : record.item._id,
  },
});