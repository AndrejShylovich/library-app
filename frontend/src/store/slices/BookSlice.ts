import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  Book,
  CheckinBookPayload,
  CheckoutBookPayload,
} from "../../models/Book";
import type { PageInfo } from "../../models/Page";
import {
  fetchAllBooksApi,
  queryBooksApi,
  checkoutBookApi,
  checkinBookApi,
  loadBookByBarcodeApi,
} from "../../api/bookApi";

export interface BookSliceState {
  loading: boolean;
  error: boolean;
  books: Book[];
  currentBook?: Book;
  pagingInformation: PageInfo | null;
}

const initialState: BookSliceState = {
  loading: true,
  error: false,
  books: [],
  currentBook: undefined,
  pagingInformation: null,
};

export const fetchAllBooks = createAsyncThunk<Book[]>(
  "book/all",
  async (_, thunkAPI) => {
    try {
      return await fetchAllBooksApi();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const queryBooks = createAsyncThunk<
  {
    items: Book[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    pageCount: number;
  },
  string
>("book/query", async (query, thunkAPI) => {
  try {
    return await queryBooksApi(query);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const checkoutBook = createAsyncThunk(
  "book/checkout",
  async (payload: CheckoutBookPayload, thunkAPI) => {
    try {
      return await checkoutBookApi(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const checkinBook = createAsyncThunk(
  "book/checkin",
  async (payload: CheckinBookPayload, thunkAPI) => {
    try {
      return await checkinBookApi(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const loadBookByBarcode = createAsyncThunk<Book, string>(
  "book/id",
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
    setCurrentBook(state, action: PayloadAction<Book | undefined>) {
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
        state.books = state.books.map((book) => {
          if (book._id === action.payload.item._id) {
            book.records = [action.payload, ...book.records];
          }
          return book;
        });
      })
      .addCase(checkinBook.fulfilled, (state, action) => {
        state.books = state.books.map((book) => {
          if (book._id === action.payload.item._id) {
            book.records[0] = action.payload;
          }
          return book;
        });
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
