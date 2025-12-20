import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book, CheckinBookPayload, CheckoutBookPayload } from "../../models/Book";
import axios from "axios";
import type { PageInfo } from "../../models/Page";
const apiUrl = import.meta.env.VITE_API_URL_PRODUCTION

interface BookSliceState {
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
  pagingInformation: null
};

// ------------------------ Thunks ------------------------

export const fetchAllBooks = createAsyncThunk<Book[]>(
  'book/all',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${apiUrl}/book/`);
      return res.data.books;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

/*export const queryBooks = createAsyncThunk(
    'book/query',
    async (payload:string, thunkAPI) => {
        try {
            const req = await axios.get(`http://localhost:8000/book/query${payload}`);
            return req.data.page;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)*/

export const queryBooks = createAsyncThunk<{
  items: Book[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  limit: number;
  pageCount: number;
}, string>(
  'book/query',
  async (query, thunkAPI) => {
    try {
      const res = await axios.get(`${apiUrl}/book/query${query}`);
      return res.data.page;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const checkoutBook = createAsyncThunk(
  'book/checkout',
  async (payload: CheckoutBookPayload, thunkAPI) => {
    try {
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 14);

      const patronRes = await axios.get(`${apiUrl}/card/${payload.libraryCard}`);
      const patronId = patronRes.data.libraryCard.user._id;

      const record = {
        status: "LOANED",
        loanedDate: new Date(),
        dueDate: returnDate,
        patron: patronId,
        employeeOut: payload.employee._id,
        item: payload.book._id
      };

      const loanRes = await axios.post(`${apiUrl}/loan`, record);
      return loanRes.data.record;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const checkinBook = createAsyncThunk(
  'book/checkin',
  async (payload: CheckinBookPayload, thunkAPI) => {
    try {
      const record = payload.book.records[0];
      const updatedRecord = {
        ...record,
        status: "AVAILABLE",
        returnedDate: new Date(),
        employeeIn: payload.employee._id
      };
      const res = await axios.put(`${apiUrl}/loan`, updatedRecord);
      return res.data.record;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const loadBookByBarcode = createAsyncThunk<Book, string>(
  'book/id',
  async (barcode, thunkAPI) => {
    try {
      const res = await axios.get(`${apiUrl}/book/query?barcode=${barcode}`);
      const book = res.data.page.items[0];
      if (!book || book.barcode !== barcode) throw new Error('Book not found');
      return book;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// ------------------------ Slice ------------------------

export const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setCurrentBook(state, action: PayloadAction<Book | undefined>) {
      state.currentBook = action.payload;
    }
  },
  extraReducers: (builder) => {
    // ------------------------ Fulfilled ------------------------
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
          pageCount: action.payload.pageCount
        };
        state.loading = false;
      })
      .addCase(checkoutBook.fulfilled, (state, action) => {
        state.books = state.books.map(book => {
          if (book._id === action.payload.item) {
            book.records = [action.payload, ...book.records];
          }
          return book;
        });
        state.loading = false;
      })
      .addCase(checkinBook.fulfilled, (state, action) => {
        state.books = state.books.map(book => {
          if (book._id === action.payload.item) {
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

    // ------------------------ Pending & Rejected (matcher) ------------------------
    builder
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        state => {
          state.loading = false;
          state.error = true;
        }
      );
  }
});

export const { setCurrentBook } = BookSlice.actions;
export default BookSlice.reducer;
