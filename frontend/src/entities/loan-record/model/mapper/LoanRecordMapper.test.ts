
import type { BookDto } from "@/entities/book/model/dto/BookDto";
import type { DomainLoanRecord } from "../domain/LoanRecord";
import type { LoanRecordDto } from "../dto/LoanRecordDto";
import { LoanRecordMapper } from "./LoanRecordMapper";
import type { DomainBook } from "@/entities/book/model/domain/Book";
import { BookMapper } from "@/entities/book/model/mapper/BookMapper";

vi.mock("@/entities/book/model/mapper/BookMapper", () => ({
  BookMapper: {
    toDomain: vi.fn(),
  },
}));

const bookDto: BookDto = {
  _id: "book-1",
  barcode: "123",
  cover: "cover.jpg",
  title: "Clean Code",
  authors: ["Robert C. Martin"],
  description: "desc",
  subjects: ["programming"],
  publicationDate: "2020-01-01T00:00:00.000Z",
  publisher: "Prentice Hall",
  pages: 500,
  genre: "IT",
  records: [],
};

const domainBook: DomainBook = {
  id: "book-1",
  barcode: "123",
  cover: "cover.jpg",
  title: "Clean Code",
  authors: ["Robert C. Martin"],
  description: "desc",
  subjects: ["programming"],
  publicationDate: new Date("2020-01-01T00:00:00.000Z"),
  publisher: "Prentice Hall",
  pages: 500,
  genre: "IT",
  records: [],
};

const baseDto: LoanRecordDto = {
  _id: "lr-1",
  status: "LOANED",
  loanedDate: "2024-01-01T00:00:00.000Z",
  dueDate: "2024-01-10T00:00:00.000Z",
  patron: "patron-1",
  employeeOut: "emp-1",
  item: "book-1",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-02T00:00:00.000Z",
};

describe("LoanRecordMapper.toDomain", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("maps dto to domain (item is a string)", () => {
    const result = LoanRecordMapper.toDomain(baseDto);

    expect(result).toEqual<DomainLoanRecord>({
      id: "lr-1",
      status: "LOANED",
      loanedDate: new Date("2024-01-01T00:00:00.000Z"),
      dueDate: new Date("2024-01-10T00:00:00.000Z"),
      returnedDate: undefined,
      patronId: "patron-1",
      employeeOutId: "emp-1",
      employeeInId: undefined,
      itemId: "book-1",
      item: undefined,
      createdAt: new Date("2024-01-01T00:00:00.000Z"),
      updatedAt: new Date("2024-01-02T00:00:00.000Z"),
    });

    expect(BookMapper.toDomain).not.toHaveBeenCalled();
  });

  it("maps dto to domain (item is a BookDto)", () => {
    const toDomainMock = vi.mocked(BookMapper.toDomain);

    toDomainMock.mockReturnValue(domainBook);

    const dto: LoanRecordDto = {
      ...baseDto,
      item: bookDto,
    };

    const result = LoanRecordMapper.toDomain(dto);

    expect(BookMapper.toDomain).toHaveBeenCalledWith(bookDto);
    expect(result.itemId).toBe("book-1");
    expect(result.item).toBe(domainBook);
  });
});

describe("LoanRecordMapper.toDto", () => {
  it("maps domain to dto", () => {
    const domain: DomainLoanRecord = {
      id: "lr-1",
      status: "AVAILABLE",
      loanedDate: new Date("2024-01-01T00:00:00.000Z"),
      dueDate: new Date("2024-01-10T00:00:00.000Z"),
      returnedDate: new Date("2024-01-05T00:00:00.000Z"),
      patronId: "patron-1",
      employeeOutId: "emp-1",
      employeeInId: "emp-2",
      itemId: "book-1",
      item: undefined,
      createdAt: new Date("2024-01-01T00:00:00.000Z"),
      updatedAt: new Date("2024-01-02T00:00:00.000Z"),
    };

    const dto = LoanRecordMapper.toDto(domain);

    expect(dto).toEqual({
      _id: "lr-1",
      status: "AVAILABLE",
      loanedDate: "2024-01-01T00:00:00.000Z",
      dueDate: "2024-01-10T00:00:00.000Z",
      returnedDate: "2024-01-05T00:00:00.000Z",
      patron: "patron-1",
      employeeOut: "emp-1",
      employeeIn: "emp-2",
      item: "book-1",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-02T00:00:00.000Z",
    });
  });
});
