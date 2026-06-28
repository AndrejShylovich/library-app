
import type { BookDto } from "@/entities/book/model/dto/BookDto";
import type { DomainLoanRecord } from "../domain/LoanRecord";
import type { LoanRecordDto, LoanRecordItemDto } from "../dto/LoanRecordDto";
import { BookMapper } from "@/entities/book/model/mapper/BookMapper";

function extractItemId(item: LoanRecordItemDto): string {
  if (typeof item === "string") return item;
  return item._id;
}

function isFullBookDto(item: LoanRecordItemDto): item is BookDto {
  return typeof item === "object" && "title" in item;
}

export const LoanRecordMapper = {
  toDomain(dto: LoanRecordDto): DomainLoanRecord {
    return {
      id: dto._id,
      status: dto.status,
      loanedDate: new Date(dto.loanedDate),
      dueDate: new Date(dto.dueDate),
      returnedDate: dto.returnedDate ? new Date(dto.returnedDate) : undefined,
      patronId: dto.patron,
      employeeOutId: dto.employeeOut,
      employeeInId: dto.employeeIn,
      itemId: extractItemId(dto.item),
      item: isFullBookDto(dto.item) ? BookMapper.toDomain(dto.item) : undefined,
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
