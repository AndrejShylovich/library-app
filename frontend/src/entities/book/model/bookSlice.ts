import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  BookDto,
  BookPageResult,
  CheckinBookDto,
  CheckoutBookDto,
} from "./dto/BookDto";
import type { LoanRecordDto } from "../../loan-record/model/dto/LoanRecordDto";
import type { PageInfo } from "../../../shared/types/PageDto";
import {
  checkinBookApi,
  checkoutBookApi,
  fetchAllBooksApi,
  loadBookByBarcodeApi,
  queryBooksApi,
} from "../api/bookApi";

export interface BookSliceState {
  loading: boolean;
  error: string | null;
  books: BookDto[];
  currentBook?: BookDto;
  pagingInformation: PageInfo | null;
}

const initialState: BookSliceState = {
  loading: false,
  error: null,
  books: [],
  currentBook: undefined,
  pagingInformation: null,
};

const getItemId = (item: LoanRecordDto["item"]): string =>
  typeof item === "string" ? item : item._id;

const updateBook = (
  books: BookDto[],
  itemId: string,
  updater: (book: BookDto) => BookDto,
) => books.map((book) => (book._id === itemId ? updater(book) : book));

const handleThunkError = (e: unknown): string => {
  if (e instanceof Error) return e.message;
  return "Unknown error";
};

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  rejectValue: string;
}>();

export const fetchAllBooks = createAppAsyncThunk<BookDto[]>(
  "book/all",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllBooksApi();
    } catch (e) {
      return rejectWithValue(handleThunkError(e));
    }
  },
);

export const queryBooks = createAppAsyncThunk<BookPageResult, string>(
  "book/query",
  async (query, { rejectWithValue }) => {
    try {
      return await queryBooksApi(query);
    } catch (e) {
      return rejectWithValue(handleThunkError(e));
    }
  },
);

export const checkoutBook = createAppAsyncThunk<LoanRecordDto, CheckoutBookDto>(
  "book/checkout",
  async (payload, { rejectWithValue }) => {
    try {
      return await checkoutBookApi(payload);
    } catch (e) {
      return rejectWithValue(handleThunkError(e));
    }
  },
);

export const checkinBook = createAppAsyncThunk<LoanRecordDto, CheckinBookDto>(
  "book/checkin",
  async (payload, { rejectWithValue }) => {
    try {
      return await checkinBookApi(payload);
    } catch (e) {
      return rejectWithValue(handleThunkError(e));
    }
  },
);

export const loadBookByBarcode = createAppAsyncThunk<BookDto, string>(
  "book/barcode",
  async (barcode, { rejectWithValue }) => {
    try {
      return await loadBookByBarcodeApi(barcode);
    } catch (e) {
      return rejectWithValue(handleThunkError(e));
    }
  },
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setCurrentBook(state, action: PayloadAction<BookDto | undefined>) {
      state.currentBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    });

    builder.addCase(queryBooks.fulfilled, (state, action) => {
      const { items, ...pageInfo } = action.payload;

      state.books = items;
      state.pagingInformation = pageInfo;
      state.loading = false;
    });

    builder.addCase(checkoutBook.fulfilled, (state, action) => {
      const record = action.payload;
      const itemId = getItemId(record.item);

      state.books = updateBook(state.books, itemId, (book) => ({
        ...book,
        records: [record, ...book.records],
      }));

      state.loading = false;
    });

    builder.addCase(checkinBook.fulfilled, (state, action) => {
      const updatedRecord = action.payload;
      const itemId = getItemId(updatedRecord.item);

      state.books = updateBook(state.books, itemId, (book) => ({
        ...book,
        records: [
          updatedRecord,
          ...book.records.filter((r) => r._id !== updatedRecord._id),
        ],
      }));

      state.loading = false;
    });

    builder.addCase(loadBookByBarcode.fulfilled, (state, action) => {
      state.currentBook = action.payload;
      state.loading = false;
    });

    builder.addMatcher(
      isAnyOf(
        fetchAllBooks.pending,
        queryBooks.pending,
        checkoutBook.pending,
        checkinBook.pending,
        loadBookByBarcode.pending,
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      },
    );

    builder.addMatcher(
      isAnyOf(
        fetchAllBooks.rejected,
        queryBooks.rejected,
        checkoutBook.rejected,
        checkinBook.rejected,
        loadBookByBarcode.rejected,
      ),
      (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Request failed";
      },
    );
  },
});

export const { setCurrentBook } = bookSlice.actions;
export default bookSlice.reducer;
