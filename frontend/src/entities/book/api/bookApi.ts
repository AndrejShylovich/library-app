import { api } from "../../../shared/api/axios";
import type { LoanRecordDto } from "../../loan-record/model/dto/LoanRecordDto";

import type {
  BookDto,
  BookPageResult,
  CheckinBookDto,
  CheckoutBookDto,
} from "../model/dto/BookDto";

import { createCheckinRecord } from "../model/lib/createCheckingRecord";
import { createCheckoutRecord } from "../model/lib/createCheckoutRecord";
import { normalizeLoanRecord } from "../model/lib/normalizeLoanRecord";

const BOOK_ENDPOINT = "/book";
const LOAN_ENDPOINT = "/loan";

const fetchPatronIdByCard = async (cardId: string): Promise<string> => {
  const { data } = await api.get<{
    libraryCard: {
      user: {
        _id: string;
      };
    };
  }>(`/card/${cardId}`);

  return data.libraryCard.user._id;
};

export const fetchAllBooksApi = async (): Promise<BookDto[]> => {
  const { data } = await api.get<{ books: BookDto[] }>(`${BOOK_ENDPOINT}/`);

  return data.books;
};

export const queryBooksApi = async (query: string): Promise<BookPageResult> => {
  const { data } = await api.get<{ page: BookPageResult }>(
    `${BOOK_ENDPOINT}/query${query}`,
  );

  return data.page;
};

export const checkoutBookApi = async (
  payload: CheckoutBookDto,
): Promise<LoanRecordDto> => {
  const patronId = await fetchPatronIdByCard(payload.libraryCard);

  const { data } = await api.post<{ record: LoanRecordDto }>(
    `${LOAN_ENDPOINT}`,
    createCheckoutRecord(payload, patronId),
  );

  return normalizeLoanRecord(data.record);
};

export const checkinBookApi = async (
  payload: CheckinBookDto,
): Promise<LoanRecordDto> => {
  const { data } = await api.put<{ record: LoanRecordDto }>(
    `${LOAN_ENDPOINT}`,
    createCheckinRecord(payload),
  );

  return normalizeLoanRecord(data.record);
};

export const loadBookByBarcodeApi = async (
  barcode: string,
): Promise<BookDto> => {
  const {
    data: {
      page: { items },
    },
  } = await api.get<{ page: { items: BookDto[] } }>(
    `${BOOK_ENDPOINT}/query?barcode=${barcode}`,
  );

  const [book] = items;

  if (!book || book.barcode !== barcode) {
    throw new Error(`Book not found: barcode=${barcode}`);
  }

  return book;
};
