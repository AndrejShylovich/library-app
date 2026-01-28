import axios from "axios";
import type {
  Book,
  CheckinBookPayload,
  CheckoutBookPayload,
} from "../models/Book";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchAllBooksApi = async (): Promise<Book[]> => {
  const res = await axios.get(`${VITE_API_URL}/book/`);
  return res.data.books;
};

export const queryBooksApi = async (query: string) => {
  const res = await axios.get(`${VITE_API_URL}/book/query${query}`);
  return res.data.page;
};

export const checkoutBookApi = async (payload: CheckoutBookPayload) => {
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 14);

  const patronRes = await axios.get(
    `${VITE_API_URL}/card/${payload.libraryCard}`,
  );
  const patronId = patronRes.data.libraryCard.user._id;

  const record = {
    status: "LOANED",
    loanedDate: new Date(),
    dueDate: returnDate,
    patron: patronId,
    employeeOut: payload.employee._id,
    item: payload.book._id,
  };

  const loanRes = await axios.post(`${VITE_API_URL}/loan`, record);
  return loanRes.data.record;
};

export const checkinBookApi = async (payload: CheckinBookPayload) => {
  const record = payload.book.records[0];

  const updatedRecord = {
    ...record,
    status: "AVAILABLE",
    returnedDate: new Date(),
    employeeIn: payload.employee._id,
  };

  const res = await axios.put(`${VITE_API_URL}/loan`, updatedRecord);
  return res.data.record;
};

export const loadBookByBarcodeApi = async (barcode: string): Promise<Book> => {
  const res = await axios.get(
    `${VITE_API_URL}/book/query?barcode=${barcode}`,
  );

  const book = res.data.page.items[0];
  if (!book || book.barcode !== barcode) {
    throw new Error("Book not found");
  }

  return book;
};
