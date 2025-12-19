import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

import BookSlice, {
  fetchAllBooks,
  queryBooks,
  checkoutBook,
  checkinBook,
  loadBookByBarcode,
  setCurrentBook,
} from './BookSlice';

import type { Book } from '../../models/Book';
import type { User } from '../../models/User';
import type { LoanRecord } from '../../models/LoanRecord';

// --------------------------------------------------------------------------
// MOCK AXIOS
// --------------------------------------------------------------------------
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

const mockedAxios = vi.mocked(axios, { deep: true });

// --------------------------------------------------------------------------
// STORE FACTORY
// --------------------------------------------------------------------------
const createTestStore = () =>
  configureStore({
    reducer: { book: BookSlice },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

type AppStore = ReturnType<typeof createTestStore>;
type AppDispatch = AppStore['dispatch'];

// --------------------------------------------------------------------------
// MOCK DATA
// --------------------------------------------------------------------------
const mockBook: Book = {
  _id: 'book123',
  barcode: '123456789',
  cover: 'cover.jpg',
  title: 'Test Book',
  authors: ['Test Author'],
  description: 'Test description',
  subjects: ['Testing'],
  publicationDate: new Date(),
  publisher: 'Test Publisher',
  pages: 321,
  genre: 'Fantasy',
  records: [],
};

const mockEmployee: User = {
  _id: 'emp123',
  type: 'EMPLOYEE',
  firstName: 'Test',
  lastName: 'Employee',
  email: 'testemployee@example.com',
  password: 'pass',
};

// --------------------------------------------------------------------------
// UTILITY TO CREATE MOCK LOAN RECORD
// --------------------------------------------------------------------------
const createMockLoanRecord = (overrides: Partial<LoanRecord> = {}): LoanRecord => ({
  _id: 'loan123',
  status: 'LOANED',
  loanedDate: new Date(),
  dueDate: new Date(),
  returnedDate: undefined,
  patron: 'patron123',
  employeeOut: 'emp123',
  employeeIn: undefined,
  item: mockBook,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

// Полная запись займа для checkin/checkout
const mockLoanRecord = createMockLoanRecord();

// Книга с одной записью займа
const bookWithRecord: Book = {
  ...mockBook,
  records: [mockLoanRecord],
};

// Обновлённый record после сдачи книги
const updatedLoanRecord = createMockLoanRecord({
  status: 'AVAILABLE',
  returnedDate: new Date(),
  employeeIn: 'emp123',
});

// --------------------------------------------------------------------------
// TEST SUITE
// --------------------------------------------------------------------------
describe('BookSlice', () => {
  let store: AppStore;
  let dispatch: AppDispatch;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createTestStore();
    dispatch = store.dispatch;
  });

  // ----------------------------------------------------------------------
  // Initial state
  // ----------------------------------------------------------------------
  describe('Initial State', () => {
    it('should match default state', () => {
      expect(store.getState().book).toEqual({
        loading: true,
        error: false,
        books: [],
        currentBook: undefined,
        pagingInformation: null,
      });
    });
  });

  // ----------------------------------------------------------------------
  // Reducers
  // ----------------------------------------------------------------------
  describe('Synchronous Reducers', () => {
    it('setCurrentBook should change currentBook', () => {
      dispatch(setCurrentBook(mockBook));
      expect(store.getState().book.currentBook).toEqual(mockBook);
    });

    it('setCurrentBook(undefined) should clear field', () => {
      dispatch(setCurrentBook(mockBook));
      dispatch(setCurrentBook(undefined));
      expect(store.getState().book.currentBook).toBeUndefined();
    });
  });

  // ----------------------------------------------------------------------
  // fetchAllBooks
  // ----------------------------------------------------------------------
  describe('fetchAllBooks Thunk', () => {
    it('pending state', () => {
      mockedAxios.get.mockImplementation(() => new Promise(() => {}));
      dispatch(fetchAllBooks());
      const state = store.getState().book;
      expect(state.loading).toBe(true);
      expect(state.error).toBe(false);
    });

    it('success', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { books: [mockBook] } });
      await dispatch(fetchAllBooks());
      const state = store.getState().book;
      expect(state.books).toEqual([mockBook]);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(false);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8000/book/');
    });

    it('failure', async () => {
      mockedAxios.get.mockRejectedValueOnce('Network error');
      await dispatch(fetchAllBooks());
      const state = store.getState().book;
      expect(state.error).toBe(true);
      expect(state.loading).toBe(false);
    });
  });

  // ----------------------------------------------------------------------
  // queryBooks
  // ----------------------------------------------------------------------
  describe('queryBooks Thunk', () => {
    it('success with pagination', async () => {
      const mockResponse = {
        page: {
          items: [mockBook],
          totalCount: 1,
          currentPage: 1,
          totalPages: 1,
          limit: 10,
          pageCount: 1,
        },
      };
      mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });
      await dispatch(queryBooks('?page=1&limit=10'));
      const state = store.getState().book;
      expect(state.books).toEqual([mockBook]);
      expect(state.pagingInformation).toEqual({
        totalCount: 1,
        currentPage: 1,
        totalPages: 1,
        limit: 10,
        pageCount: 1,
      });
      expect(state.loading).toBe(false);
    });

    it('failure', async () => {
      mockedAxios.get.mockRejectedValueOnce('Query failed');
      await dispatch(queryBooks('?page=1'));
      expect(store.getState().book.error).toBe(true);
    });
  });

  // ----------------------------------------------------------------------
  // checkoutBook
  // ----------------------------------------------------------------------
  describe('checkoutBook Thunk', () => {
    it('success', async () => {
      const mockPatronResponse = {
        data: { libraryCard: { user: { _id: 'patron123' } } },
      };
      const mockLoan = createMockLoanRecord();
      mockedAxios.get.mockResolvedValueOnce(mockPatronResponse);
      mockedAxios.post.mockResolvedValueOnce({ data: { record: mockLoan } });

      await dispatch(checkoutBook({ book: mockBook, libraryCard: 'card123', employee: mockEmployee }));
      const state = store.getState().book;

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8000/card/card123');
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:8000/loan',
        expect.objectContaining({
          status: 'LOANED',
          patron: 'patron123',
          employeeOut: 'emp123',
          item: 'book123',
        })
      );
      expect(state.error).toBe(false);
    });

    it('failure', async () => {
      mockedAxios.get.mockRejectedValueOnce('Card not found');
      await dispatch(checkoutBook({ book: mockBook, libraryCard: 'invalid', employee: mockEmployee }));
      expect(store.getState().book.error).toBe(true);
    });
  });

  // ----------------------------------------------------------------------
  // checkinBook
  // ----------------------------------------------------------------------
  describe('checkinBook Thunk', () => {
    it('success', async () => {
      mockedAxios.put.mockResolvedValueOnce({ data: { record: updatedLoanRecord } });
      await dispatch(checkinBook({ book: bookWithRecord, employee: mockEmployee }));
      expect(mockedAxios.put).toHaveBeenCalledWith(
        'http://localhost:8000/loan',
        expect.objectContaining({
          status: 'AVAILABLE',
          employeeIn: 'emp123',
        })
      );
    });

    it('failure', async () => {
      mockedAxios.put.mockRejectedValueOnce('Update failed');
      await dispatch(checkinBook({ book: bookWithRecord, employee: mockEmployee }));
      expect(store.getState().book.error).toBe(true);
    });
  });

  // ----------------------------------------------------------------------
  // loadBookByBarcode
  // ----------------------------------------------------------------------
  describe('loadBookByBarcode', () => {
    it('success', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { page: { items: [mockBook] } } });
      await dispatch(loadBookByBarcode('123456789'));
      expect(store.getState().book.currentBook).toEqual(mockBook);
      expect(store.getState().book.error).toBe(false);
    });

    it('book not found', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { page: { items: [] } } });
      await dispatch(loadBookByBarcode('invalid'));
      expect(store.getState().book.error).toBe(true);
    });

    it('barcode mismatch', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { page: { items: [{ ...mockBook, barcode: 'wrong' }] } } });
      await dispatch(loadBookByBarcode('123456789'));
      expect(store.getState().book.error).toBe(true);
    });

    it('network error', async () => {
      mockedAxios.get.mockRejectedValueOnce('error');
      await dispatch(loadBookByBarcode('123456789'));
      expect(store.getState().book.error).toBe(true);
    });
  });
});
