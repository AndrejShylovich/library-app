import { describe, it, expect, vi, beforeEach } from "vitest";
import type {
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import {
  fetchAllBooksApi,
  queryBooksApi,
  checkoutBookApi,
  checkinBookApi,
  loadBookByBarcodeApi,
} from "./bookApi";

import { api } from "./axios";

import type {
  BookDto,
  CheckoutBookDto,
  CheckinBookDto,
} from "../models/dto/BookDto";
import type { LoanRecordDto } from "../models/dto/LoanRecordDto";
import type { UserDto } from "../models/dto/UserDto";

vi.mock("./axios", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

const mockAxiosResponse = <T,>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: "OK",
  headers: {},
  config: {
    headers: {},
  } as InternalAxiosRequestConfig,
});

beforeEach(() => {
  vi.clearAllMocks();
});

const mockEmployee: UserDto = {
  _id: "employee-1",
  type: "EMPLOYEE",
  firstName: "Test",
  lastName: "Employee",
  email: "employee@test.com",
};

const mockBook: BookDto = {
  _id: "book-1",
  barcode: "123456",
  cover: "",
  title: "Clean Code",
  authors: ["Robert C. Martin"],
  description: "Test book",
  subjects: [],
  publicationDate: "2008-01-01",
  publisher: "Prentice Hall",
  pages: 400,
  genre: "Non-Fiction",
  records: [],
};

const mockLoanRecord: LoanRecordDto = {
  _id: "loan-1",
  status: "LOANED",
  loanedDate: new Date().toISOString(),
  dueDate: new Date().toISOString(),
  patron: "user-1",
  employeeOut: "employee-1",
  item: "book-1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("fetchAllBooksApi", () => {
  it("returns list of books", async () => {
    vi.mocked(api.get).mockResolvedValueOnce(
      mockAxiosResponse({ books: [mockBook] })
    );

    const result = await fetchAllBooksApi();

    expect(api.get).toHaveBeenCalledWith("/book/");
    expect(result).toEqual([mockBook]);
  });
});

describe("queryBooksApi", () => {
  it("returns paginated books", async () => {
    vi.mocked(api.get).mockResolvedValueOnce(
      mockAxiosResponse({
        page: {
          page: 1,
          limit: 10,
          total: 1,
          items: [mockBook],
        },
      })
    );

    const result = await queryBooksApi("?title=clean");

    expect(api.get).toHaveBeenCalledWith("/book/query?title=clean");
    expect(result.items).toEqual([mockBook]);
    expect(result.total).toBe(1);
  });
});

describe("checkoutBookApi", () => {
  it("creates loan record", async () => {
    vi.mocked(api.get).mockResolvedValueOnce(
      mockAxiosResponse({
        libraryCard: {
          user: { _id: "user-1" },
        },
      })
    );

    vi.mocked(api.post).mockResolvedValueOnce(
      mockAxiosResponse({
        record: {
          ...mockLoanRecord,
          item: { _id: "book-1" },
        },
      })
    );

    const payload: CheckoutBookDto = {
      book: mockBook,
      libraryCard: "CARD-123",
      employee: mockEmployee,
    };

    const result = await checkoutBookApi(payload);

    expect(api.get).toHaveBeenCalledWith("/card/CARD-123");
    expect(api.post).toHaveBeenCalledWith(
      "/loan",
      expect.objectContaining({
        status: "LOANED",
        patron: "user-1",
        employeeOut: "employee-1",
        item: "book-1",
      })
    );

    expect(result.item).toEqual({ _id: "book-1" });
  });
});

describe("checkinBookApi", () => {
  it("updates loan record to AVAILABLE", async () => {
    const bookWithRecord: BookDto = {
      ...mockBook,
      records: [mockLoanRecord],
    };

    vi.mocked(api.put).mockResolvedValueOnce(
      mockAxiosResponse({
        record: {
          ...mockLoanRecord,
          status: "AVAILABLE",
          item: { _id: "book-1" },
        },
      })
    );

    const payload: CheckinBookDto = {
      book: bookWithRecord,
      employee: mockEmployee,
    };

    const result = await checkinBookApi(payload);

    expect(api.put).toHaveBeenCalledWith(
      "/loan",
      expect.objectContaining({
        status: "AVAILABLE",
        employeeIn: "employee-1",
      })
    );

    expect(result.status).toBe("AVAILABLE");
  });
});

describe("loadBookByBarcodeApi", () => {
  it("returns book when barcode matches", async () => {
    vi.mocked(api.get).mockResolvedValueOnce(
      mockAxiosResponse({
        page: {
          items: [mockBook],
        },
      })
    );

    const result = await loadBookByBarcodeApi("123456");

    expect(api.get).toHaveBeenCalledWith("/book/query?barcode=123456");
    expect(result).toEqual(mockBook);
  });

  it("throws error when book not found", async () => {
    vi.mocked(api.get).mockResolvedValueOnce(
      mockAxiosResponse({
        page: {
          items: [],
        },
      })
    );

    await expect(loadBookByBarcodeApi("404")).rejects.toThrow("Book not found");
  });
});
