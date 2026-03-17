import type {
  BookDto,
  CheckoutBookDto,
  CheckinBookDto,
  BookPageResult,
} from "../models/dto/BookDto";
import type { LoanRecordDto } from "../models/dto/LoanRecordDto";
import { api } from "./axios";

const LOAN_PERIOD_DAYS = 14;

const normalizeLoanRecord = (record: LoanRecordDto): LoanRecordDto => {
  const itemId =
    typeof record.item === "string" ? record.item : record.item._id;

  return {
    ...record,
    item: { _id: itemId },
  };
};

export const fetchAllBooksApi = async (): Promise<BookDto[]> => {
  const { data } = await api.get<{ books: BookDto[] }>("/book/");
  return data.books;
};

export const queryBooksApi = async (query: string): Promise<BookPageResult> => {
  const { data } = await api.get<{ page: BookPageResult }>(
    `/book/query${query}`
  );
  return data.page;
};

export const checkoutBookApi = async (
  payload: CheckoutBookDto
): Promise<LoanRecordDto> => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + LOAN_PERIOD_DAYS);

  const { data: cardData } = await api.get<{
    libraryCard: { user: { _id: string } };
  }>(`/card/${payload.libraryCard}`);

  const recordDto: Partial<LoanRecordDto> = {
    status: "LOANED",
    loanedDate: new Date().toISOString(),
    dueDate: dueDate.toISOString(),
    patron: cardData.libraryCard.user._id,
    employeeOut: payload.employee._id,
    item: payload.book._id,
  };

  const { data } = await api.post<{ record: LoanRecordDto }>("/loan", recordDto);
  return normalizeLoanRecord(data.record);
};

export const checkinBookApi = async (
  payload: CheckinBookDto
): Promise<LoanRecordDto> => {
  const updatedRecord: LoanRecordDto = {
    ...payload.book.records[0],
    status: "AVAILABLE",
    returnedDate: new Date().toISOString(),
    employeeIn: payload.employee._id,
    item: payload.book._id,
  };

  const { data } = await api.put<{ record: LoanRecordDto }>("/loan", updatedRecord);
  return normalizeLoanRecord(data.record);
};

export const loadBookByBarcodeApi = async (barcode: string): Promise<BookDto> => {
  const { data } = await api.get<{ page: { items: BookDto[] } }>(
    `/book/query?barcode=${barcode}`
  );

  const book = data.page.items[0];

  if (!book || book.barcode !== barcode) {
    throw new Error(`Book not found: barcode=${barcode}`);
  }

  return book;
};