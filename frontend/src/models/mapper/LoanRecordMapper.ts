import type { DomainLoanRecord } from "../domain/LoanRecord";
import type { BookDto } from "../dto/BookDto";
import type { LoanRecordDto } from "../dto/LoanRecordDto";
import { BookMapper } from "./BookMapper";

function isBookDto(item: unknown): item is BookDto {
  return (
    typeof item === "object" &&
    item !== null &&
    "_id" in item &&
    "title" in item
  );
}

export const LoanRecordMapper = {
  toDomain(dto: LoanRecordDto): DomainLoanRecord {
    const itemId =
      typeof dto.item === "string" ? dto.item : (dto.item as BookDto)._id;

    const item = isBookDto(dto.item)
      ? BookMapper.toDomain(dto.item)
      : undefined;

    return {
      id: dto._id,
      status: dto.status,
      loanedDate: new Date(dto.loanedDate),
      dueDate: new Date(dto.dueDate),
      returnedDate: dto.returnedDate ? new Date(dto.returnedDate) : undefined,
      patronId: dto.patron,
      employeeOutId: dto.employeeOut,
      employeeInId: dto.employeeIn,
      itemId,
      item,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  },

  toDto(domain: DomainLoanRecord): LoanRecordDto {
    return {
      _id: domain.id,
      status: domain.status,
      loanedDate: domain.loanedDate.toISOString(),
      dueDate: domain.dueDate.toISOString(),
      returnedDate: domain.returnedDate?.toISOString(),
      patron: domain.patronId,
      employeeOut: domain.employeeOutId,
      employeeIn: domain.employeeInId,
      item: domain.itemId,
      createdAt: domain.createdAt.toISOString(),
      updatedAt: domain.updatedAt.toISOString(),
    };
  },
};
