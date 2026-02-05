import { describe, it, expect } from "vitest";
import { BookMapper, CheckoutBookMapper, CheckinBookMapper } from "./BookMapper";
import { LoanRecordMapper } from "./LoanRecordMapper";
import { UserMapper } from "./UserMapper";
import type { LoanRecordDto } from "../dto/LoanRecordDto";

const mockLoanRecordDto: LoanRecordDto = {
  _id: "record1",
  status: "LOANED", 
  loanedDate: "2026-02-05T12:00:00.000Z",
  dueDate: "2026-02-15T12:00:00.000Z",
  returnedDate: undefined,
  patron: "patron1",
  employeeOut: "employee1",
  employeeIn: undefined,
  item: "book1",
  createdAt: "2026-02-05T12:00:00.000Z",
  updatedAt: "2026-02-05T12:00:00.000Z",
};

const mockLoanRecordDomain = LoanRecordMapper.toDomain(mockLoanRecordDto);

const mockUserDto = {
  _id: "user1",
  type: "EMPLOYEE" as const,
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
};

const mockUserDomain = UserMapper.toDomain(mockUserDto);

const mockBookDto = {
  _id: "book1",
  barcode: "123456",
  cover: "cover.jpg",
  title: "Test Book",
  authors: ["Author 1"],
  description: "Description",
  subjects: ["Subject 1"],
  publicationDate: "2026-01-01T00:00:00.000Z",
  publisher: "Publisher",
  pages: 100,
  genre: "Fiction",
  records: [mockLoanRecordDto],
};

const mockBookDomain = BookMapper.toDomain(mockBookDto);

describe("BookMapper", () => {
  it("should map BookDto to DomainBook correctly", () => {
    const domain = BookMapper.toDomain(mockBookDto);

    expect(domain.id).toBe(mockBookDto._id);
    expect(domain.title).toBe(mockBookDto.title);
    expect(domain.records.length).toBe(1);
    expect(domain.records[0].id).toBe(mockLoanRecordDto._id);
    expect(domain.publicationDate).toBeInstanceOf(Date);
  });

  it("should map DomainBook to BookDto correctly", () => {
    const dto = BookMapper.toDto(mockBookDomain);

    expect(dto._id).toBe(mockBookDomain.id);
    expect(dto.records[0]._id).toBe(mockLoanRecordDomain.id);
    expect(typeof dto.publicationDate).toBe("string");
  });
});

describe("CheckoutBookMapper", () => {
  it("should map DomainCheckoutBookPayload to CheckoutBookDto", () => {
    const payload = {
      book: mockBookDomain,
      libraryCard: "LC123",
      employee: mockUserDomain,
    };

    const dto = CheckoutBookMapper.toDto(payload);

    expect(dto.book._id).toBe(payload.book.id);
    expect(dto.libraryCard).toBe("LC123");
    expect(dto.employee._id).toBe(mockUserDto._id);
  });
});

describe("CheckinBookMapper", () => {
  it("should map DomainCheckinBookPayload to CheckinBookDto", () => {
    const payload = {
      book: mockBookDomain,
      employee: mockUserDomain,
    };

    const dto = CheckinBookMapper.toDto(payload);

    expect(dto.book._id).toBe(payload.book.id);
    expect(dto.employee._id).toBe(mockUserDto._id);
  });
});
