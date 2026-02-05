import type {
  BookDto,
  CheckoutBookDto,
  CheckinBookDto,
} from "../models/dto/BookDto";
import type { LoanRecordDto } from "../models/dto/LoanRecordDto";
import { api } from "./axios"; 


export const fetchAllBooksApi = async (): Promise<BookDto[]> => {
  const res = await api.get("/book/");
  return res.data.books as BookDto[];
};


export const queryBooksApi = async (query: string) => {
  const res = await api.get(`/book/query${query}`);
  return {
    ...res.data.page,
    items: res.data.page.items as BookDto[],
  };
};


export const checkoutBookApi = async (
  payload: CheckoutBookDto
): Promise<LoanRecordDto> => {
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 14);


  const patronRes = await api.get(`/card/${payload.libraryCard}`);
  const patronId = patronRes.data.libraryCard.user._id;

  const recordDto: Partial<LoanRecordDto> = {
    status: "LOANED",
    loanedDate: new Date().toISOString(),
    dueDate: returnDate.toISOString(),
    patron: patronId,
    employeeOut: payload.employee._id,
    item: payload.book._id,
  };

  const loanRes = await api.post("/loan", recordDto);

  return {
    ...loanRes.data.record,
    item: { _id: loanRes.data.record.item._id },
  } as LoanRecordDto;
};


export const checkinBookApi = async (
  payload: CheckinBookDto
): Promise<LoanRecordDto> => {
  const record = payload.book.records[0];

  const updatedRecordDto: LoanRecordDto = {
    ...record,
    status: "AVAILABLE",
    returnedDate: new Date().toISOString(),
    employeeIn: payload.employee._id,
    item: payload.book._id,
  };

  const res = await api.put("/loan", updatedRecordDto);

  return {
    ...res.data.record,
    item: { _id: res.data.record.item._id },
  } as LoanRecordDto;
};


export const loadBookByBarcodeApi = async (
  barcode: string
): Promise<BookDto> => {
  const res = await api.get(`/book/query?barcode=${barcode}`);
  const bookDto: BookDto | undefined = res.data.page.items[0];

  if (!bookDto || bookDto.barcode !== barcode) {
    throw new Error("Book not found");
  }

  return bookDto;
};
