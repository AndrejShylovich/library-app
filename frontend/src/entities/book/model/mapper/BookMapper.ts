import { LoanRecordMapper } from "@/entities/loan-record/model/mapper/LoanRecordMapper";
import type { DomainBook, DomainCheckinBookPayload } from "../domain/Book";
import type { BookDto, CheckinBookDto } from "../dto/BookDto";
import { UserMapper } from "@/entities/user/model/mapper/UserMapper";
import { parseDate } from "@/shared/lib/utils/date.utils";

export const BookMapper = {
  toDomain(dto: BookDto): DomainBook {
    return {
      id: dto._id,
      barcode: dto.barcode,
      cover: dto.cover,
      title: dto.title,
      authors: dto.authors,
      description: dto.description,
      subjects: dto.subjects,
      publicationDate: parseDate(dto.publicationDate),
      publisher: dto.publisher,
      pages: dto.pages,
      genre: dto.genre,
      records: dto.records.map(LoanRecordMapper.toDomain),
    };
  },

  toDto(domain: DomainBook): BookDto {
    return {
      _id: domain.id,
      barcode: domain.barcode,
      cover: domain.cover,
      title: domain.title,
      authors: domain.authors,
      description: domain.description,
      subjects: domain.subjects,
      publicationDate: domain.publicationDate.toISOString(),
      publisher: domain.publisher,
      pages: domain.pages,
      genre: domain.genre,
      records: domain.records.map(LoanRecordMapper.toDto),
    };
  },
};

export const CheckinBookMapper = {
  toDto(domain: DomainCheckinBookPayload): CheckinBookDto {
    return {
      book: BookMapper.toDto(domain.book),
      employee: UserMapper.toDto(domain.employee),
    };
  },
};
