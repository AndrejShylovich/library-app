import { describe, it, expect, vi, beforeEach } from "vitest";
import type { MockedFunction } from "vitest";

import * as api from "../api/bookApi";

import reducer, {
  fetchAllBooks,
  queryBooks,
  checkoutBook,
  checkinBook,
  loadBookByBarcode,
  setCurrentBook,
  type BookSliceState,
} from "./bookSlice";
import type { UserDto } from "../../user/model/dto/UserDto";
import type { BookDto } from "./dto/BookDto";
import type { LoanRecordDto } from "../../loan-record/model/dto/LoanRecordDto";

vi.mock("../../../entities/book/api/bookApi");

const mockedFetchAllBooksApi = api.fetchAllBooksApi as MockedFunction<
  typeof api.fetchAllBooksApi
>;

const mockedQueryBooksApi = api.queryBooksApi as MockedFunction<
  typeof api.queryBooksApi
>;

const mockedCheckoutBookApi = api.checkoutBookApi as MockedFunction<
  typeof api.checkoutBookApi
>;

const mockedCheckinBookApi = api.checkinBookApi as MockedFunction<
  typeof api.checkinBookApi
>;

const mockedLoadBookByBarcodeApi = api.loadBookByBarcodeApi as MockedFunction<
  typeof api.loadBookByBarcodeApi
>;

const fakeEmployee: UserDto = {
  _id: "emp-1",
  type: "EMPLOYEE",
  firstName: "John",
  lastName: "Smith",
  email: "john@test.com",
};

const fakeBook: BookDto = {
  _id: "book-1",
  barcode: "BC123",
  cover: "cover.jpg",
  title: "Test Book",
  authors: ["Author One"],
  description: "Description",
  subjects: ["IT"],
  publicationDate: "2024-01-01",
  publisher: "Publisher",
  pages: 300,
  genre: "Tech",
  records: [],
};

const fakeLoanRecord: LoanRecordDto = {
  _id: "loan-1",
  status: "LOANED",
  loanedDate: "2024-01-01",
  dueDate: "2024-01-10",
  patron: "patron-1",
  employeeOut: "emp-1",
  item: "book-1",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
};

const initialState: BookSliceState = {
  loading: true,
  error: "",
  books: [fakeBook],
  currentBook: undefined,
  pagingInformation: null,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("bookSlice async thunks", () => {
  it("fetchAllBooks → fulfilled", async () => {
    mockedFetchAllBooksApi.mockResolvedValue([fakeBook]);

    const dispatch = vi.fn();
    await fetchAllBooks()(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "book/all/fulfilled",
        payload: [fakeBook],
      }),
    );
  });

  it("fetchAllBooks → rejected", async () => {
    mockedFetchAllBooksApi.mockRejectedValue(new Error("fail"));

    const dispatch = vi.fn();
    await fetchAllBooks()(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "book/all/rejected",
      }),
    );
  });

  it("queryBooks → fulfilled", async () => {
    mockedQueryBooksApi.mockResolvedValue({
      items: [fakeBook],
      totalCount: 1,
      currentPage: 1,
      totalPages: 1,
      limit: 10,
      pageCount: 1,
    });

    const dispatch = vi.fn();
    await queryBooks("test")(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "book/query/fulfilled",
      }),
    );
  });

  it("checkoutBook → fulfilled", async () => {
    mockedCheckoutBookApi.mockResolvedValue(fakeLoanRecord);

    const dispatch = vi.fn();
    await checkoutBook({
      book: fakeBook,
      libraryCard: "CARD-123",
      employee: fakeEmployee,
    })(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "book/checkout/fulfilled",
        payload: fakeLoanRecord,
      }),
    );
  });

  it("checkinBook → fulfilled", async () => {
    const returnedRecord: LoanRecordDto = {
      ...fakeLoanRecord,
      status: "AVAILABLE",
    };

    mockedCheckinBookApi.mockResolvedValue(returnedRecord);

    const dispatch = vi.fn();
    await checkinBook({
      book: fakeBook,
      employee: fakeEmployee,
    })(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "book/checkin/fulfilled",
        payload: returnedRecord,
      }),
    );
  });

  it("loadBookByBarcode → fulfilled", async () => {
    mockedLoadBookByBarcodeApi.mockResolvedValue(fakeBook);

    const dispatch = vi.fn();
    await loadBookByBarcode("BC123")(dispatch, () => ({}), undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "book/barcode/fulfilled",
        payload: fakeBook,
      }),
    );
  });
});

describe("bookSlice reducer", () => {
  it("setCurrentBook", () => {
    const next = reducer(initialState, setCurrentBook(fakeBook));
    expect(next.currentBook).toEqual(fakeBook);
  });

  it("checkoutBook.fulfilled adds record to book", () => {
    const next = reducer(
      initialState,
      checkoutBook.fulfilled(fakeLoanRecord, "", {
        book: fakeBook,
        libraryCard: "CARD",
        employee: fakeEmployee,
      }),
    );

    expect(next.books[0].records[0]).toEqual(fakeLoanRecord);
  });

  it("checkinBook.fulfilled updates first record", () => {
    const stateWithLoan: BookSliceState = {
      ...initialState,
      books: [{ ...fakeBook, records: [fakeLoanRecord] }],
    };

    const returnedRecord: LoanRecordDto = {
      ...fakeLoanRecord,
      status: "AVAILABLE",
    };

    const next = reducer(
      stateWithLoan,
      checkinBook.fulfilled(returnedRecord, "", {
        book: fakeBook,
        employee: fakeEmployee,
      }),
    );

    expect(next.books[0].records[0].status).toBe("AVAILABLE");
  });

  it("pending matcher", () => {
    const next = reducer(initialState, fetchAllBooks.pending("", undefined));

    expect(next.loading).toBe(true);
    expect(next.error).toBe(null);
  });

  it("rejected matcher", () => {
    const next = reducer(
      initialState,
      fetchAllBooks.rejected(null, "", undefined),
    );

    expect(next.loading).toBe(false);
    expect(next.error).toBe("Request failed");
  });
});
