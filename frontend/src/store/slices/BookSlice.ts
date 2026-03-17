import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  fetchAllBooksApi,
  queryBooksApi,
  checkoutBookApi,
  checkinBookApi,
  loadBookByBarcodeApi,
} from "../../api/bookApi";

import type {
  BookDto,
  CheckoutBookDto,
  CheckinBookDto,
  BookPageResult,
} from "../../models/dto/BookDto";
import type { LoanRecordDto } from "../../models/dto/LoanRecordDto";
import type { PageInfo } from "../../models/dto/PageDto";

export interface BookSliceState {
  loading: boolean;
  error: boolean;
  books: BookDto[];
  currentBook?: BookDto;
  pagingInformation: PageInfo | null;
}

const initialState: BookSliceState = {
  loading: true,
  error: false,
  books: [],
  currentBook: undefined,
  pagingInformation: null,
};

export const fetchAllBooks = createAsyncThunk<BookDto[]>(
  "book/all",
  async (_, thunkAPI) => {
    try {
      return await fetchAllBooksApi();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const queryBooks = createAsyncThunk<BookPageResult, string>(
  "book/query",
  async (query, thunkAPI) => {
    try {
      return await queryBooksApi(query);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const checkoutBook = createAsyncThunk<LoanRecordDto, CheckoutBookDto>(
  "book/checkout",
  async (payload, thunkAPI) => {
    try {
      return await checkoutBookApi(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const checkinBook = createAsyncThunk<LoanRecordDto, CheckinBookDto>(
  "book/checkin",
  async (payload, thunkAPI) => {
    try {
      return await checkinBookApi(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const loadBookByBarcode = createAsyncThunk<BookDto, string>(
  "book/barcode",
  async (barcode, thunkAPI) => {
    try {
      return await loadBookByBarcodeApi(barcode);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
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
    builder

      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(queryBooks.fulfilled, (state, action) => {
        state.books = action.payload.items;
        state.pagingInformation = {
          totalCount: action.payload.totalCount,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          limit: action.payload.limit,
          pageCount: action.payload.pageCount,
        };
        state.loading = false;
      })
      .addCase(checkoutBook.fulfilled, (state, action) => {
        const record = action.payload;
        const itemId = record.item;

        state.books = state.books.map((book) =>
          book._id === itemId
            ? { ...book, records: [record, ...book.records] }
            : book,
        );

        state.loading = false;
      })
      .addCase(checkinBook.fulfilled, (state, action) => {
        const updatedRecord = action.payload;
        const itemId = updatedRecord.item;

        state.books = state.books.map((book) =>
          book._id === itemId
            ? { ...book, records: [updatedRecord, ...book.records.slice(1)] }
            : book,
        );

        state.loading = false;
      })
      .addCase(loadBookByBarcode.fulfilled, (state, action) => {
        state.currentBook = action.payload;
        state.loading = false;
      });

    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = false;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
          state.error = true;
        },
      );
  },
});

export const { setCurrentBook } = bookSlice.actions;
export default bookSlice.reducer;
