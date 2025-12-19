import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { BookCard } from "./BookCard";
import type { Book } from "../../../../models/Book";
import type { LoanRecord } from "../../../../models/LoanRecord";
import authentificationReducer from "../../../../store/slices/AuthentificationSlice";
import bookReducer from "../../../../store/slices/BookSlice";
import modalReducer from "../../../../store/slices/ModalSlice";

// ----------------------
// MOCK NAVIGATE
// ----------------------
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// ----------------------
// STORE HELPER
// ----------------------
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      authentification: authentificationReducer,
      book: bookReducer,
      modal: modalReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// ----------------------
// RENDER HELPER
// ----------------------
const renderWithProviders = (
  component: React.ReactElement,
  { store = createTestStore(), ...renderOptions } = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
  return {
    store,
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
  };
};

// ----------------------
// MOCK BOOK
// ----------------------
const createMockBook = (overrides?: Partial<Book>): Book => ({
  _id: "1",
  barcode: "12345",
  title: "Test Book",
  authors: ["Author One", "Author Two"],
  description: "Test description",
  cover: "https://example.com/cover.jpg",

  // Every required Book field must exist:
  subjects: [],
  publicationDate: new Date("2023-08-01T00:00:00.000Z"),
  publisher: "Publisher",
  pages: 100,
  genre: "Fiction",

  records: [],
  ...overrides,
});

// ----------------------
// MOCK LOAN RECORD
// ----------------------
const mockLoanRecord = (overrides?: Partial<LoanRecord>): LoanRecord => ({
  _id: "rec1",
  status: "AVAILABLE",
  loanedDate: new Date("2023-08-01T00:00:00.000Z"),
  dueDate: new Date("2023-08-01T00:00:00.000Z"),
  patron: "patron1",
  employeeOut: "emp1",
  item: createMockBook({ _id: "1" }),
  createdAt: new Date(), // <--- default value
  updatedAt: new Date(), // <--- default value
  ...overrides,
});
// ----------------------
// TESTS
// ----------------------
describe("BookCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  // ----------------------
  // RENDERING
  // ----------------------
  describe("Rendering", () => {
    it("renders book info correctly", () => {
      const book = createMockBook();
      renderWithProviders(<BookCard book={book} />);

      expect(screen.getByText("Test Book")).toBeInTheDocument();
      expect(screen.getByText("Author One, Author Two")).toBeInTheDocument();
      expect(screen.getByAltText("Test Book")).toHaveAttribute(
        "src",
        book.cover
      );
    });

    it("displays AVAILABLE when records empty", () => {
      const book = createMockBook({ records: [] });
      renderWithProviders(<BookCard book={book} />);

      expect(screen.getByText("Status: AVAILABLE")).toBeInTheDocument();
    });

    it("displays AVAILABLE when last record AVAILABLE", () => {
      const book = createMockBook({
        records: [mockLoanRecord({ status: "AVAILABLE" })],
      });
      renderWithProviders(<BookCard book={book} />);

      expect(screen.getByText("Status: AVAILABLE")).toBeInTheDocument();
    });

    it("displays UNAVAILABLE when loaned", () => {
      const book = createMockBook({
        records: [mockLoanRecord({ status: "LOANED" })],
      });
      renderWithProviders(<BookCard book={book} />);

      expect(screen.getByText("Status: UNAVAILABLE")).toBeInTheDocument();
    });
  });

  // ----------------------
  // BUTTON STYLING
  // ----------------------
  describe("Button styling", () => {
    it('has "available" class when book available', () => {
      const book = createMockBook({ records: [] });
      renderWithProviders(<BookCard book={book} />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("available");
      expect(button).not.toHaveClass("unavailable");
    });

    it('has "unavailable" class when loaned', () => {
      const book = createMockBook({
        records: [mockLoanRecord({ status: "LOANED" })],
      });
      renderWithProviders(<BookCard book={book} />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("unavailable");
    });

    it('employee sees "checkout" on available', () => {
      const store = createTestStore({
        authentification: {
          loggedInUser: { _id: "1", type: "EMPLOYEE" },
          loading: false,
          error: false,
          registerSuccess: false,
          libraryCard: "",
        },
      });

      const book = createMockBook({ records: [] });
      renderWithProviders(<BookCard book={book} />, { store });

      expect(screen.getByRole("button")).toHaveClass("checkout");
    });

    it('employee sees "checkin" on loaned', () => {
      const store = createTestStore({
        authentification: {
          loggedInUser: { _id: "1", type: "EMPLOYEE" },
          loading: false,
          error: false,
          registerSuccess: false,
          libraryCard: "",
        },
      });

      const book = createMockBook({
        records: [mockLoanRecord({ status: "LOANED" })],
      });
      renderWithProviders(<BookCard book={book} />, { store });

      expect(screen.getByRole("button")).toHaveClass("checkin");
    });
  });

  // ----------------------
  // NAVIGATION
  // ----------------------
  describe("Navigation", () => {
    it("navigates on card click", () => {
      const book = createMockBook({ barcode: "99999" });
      renderWithProviders(<BookCard book={book} />);

      fireEvent.click(screen.getByText("Test Book"));

      expect(mockNavigate).toHaveBeenCalledWith("/resource/99999");
    });
  });

  // ----------------------
  // EMPLOYEE LOAN ACTIONS
  // ----------------------
  describe("Employee actions", () => {
    const employeeStore = () =>
      createTestStore({
        authentification: {
          loggedInUser: { _id: "1", type: "EMPLOYEE" },
          loading: false,
          error: false,
          registerSuccess: false,
          libraryCard: "",
        },
      });

    it("dispatches loan modal open", () => {
      const store = employeeStore();
      const book = createMockBook();

      renderWithProviders(<BookCard book={book} />, { store });
      fireEvent.click(screen.getByRole("button"));

      const state = store.getState();
      expect(state.book.currentBook).toEqual(book);
      expect(state.modal.displayLoan).toBe(true);
    });

    it("does not navigate when employee clicks button", () => {
      const store = employeeStore();
      const book = createMockBook();

      renderWithProviders(<BookCard book={book} />, { store });
      fireEvent.click(screen.getByRole("button"));

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  // ----------------------
  // PATRON BEHAVIOR
  // ----------------------
  describe("Patron behavior", () => {
    const patronStore = () =>
      createTestStore({
        authentification: {
          loggedInUser: { _id: "1", type: "PATRON" },
          loading: false,
          error: false,
          registerSuccess: false,
          libraryCard: "",
        },
      });

    it("patron cannot open modal", () => {
      const store = patronStore();
      const book = createMockBook();

      renderWithProviders(<BookCard book={book} />, { store });

      fireEvent.click(screen.getByRole("button"));

      expect(store.getState().modal.displayLoan).toBe(false);
    });
  });

  // ----------------------
  // NO USER LOGGED IN
  // ----------------------
  describe("No user logged in", () => {
    const emptyStore = () =>
      createTestStore({
        authentification: {
          loggedInUser: undefined,
          loading: false,
          error: false,
          registerSuccess: false,
          libraryCard: "",
        },
      });

    it("does nothing when clicking loan", () => {
      const store = emptyStore();
      const book = createMockBook();

      renderWithProviders(<BookCard book={book} />, { store });

      fireEvent.click(screen.getByRole("button"));

      expect(store.getState().modal.displayLoan).toBe(false);
    });
  });

  // ----------------------
  // PROPAGATION
  // ----------------------
  describe("Event propagation", () => {
    it("stops propagation on button", () => {
      const store = createTestStore({
        authentification: {
          loggedInUser: { _id: "1", type: "EMPLOYEE" },
          loading: false,
          error: false,
          registerSuccess: false,
          libraryCard: "",
        },
      });

      const book = createMockBook();
      renderWithProviders(<BookCard book={book} />, { store });

      fireEvent.click(screen.getByRole("button"));
      expect(mockNavigate).not.toHaveBeenCalled();

      fireEvent.click(screen.getByText("Test Book"));
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  // ----------------------
  // USEMEMO
  // ----------------------
  describe("useMemo optimization", () => {
    it("memoizes available status", () => {
      const book = createMockBook({ records: [] });
      const { rerender } = renderWithProviders(<BookCard book={book} />);

      expect(screen.getByText("Status: AVAILABLE")).toBeInTheDocument();

      // Just rerender the component, no extra wrapper
      rerender(<BookCard book={book} />);

      expect(screen.getByText("Status: AVAILABLE")).toBeInTheDocument();
    });

    it("updates when records change", () => {
      const availableBook = createMockBook({ records: [] });
      const { rerender } = renderWithProviders(
        <BookCard book={availableBook} />
      );

      expect(screen.getByText("Status: AVAILABLE")).toBeInTheDocument();

      const loanedBook = createMockBook({
        records: [mockLoanRecord({ status: "LOANED" })],
      });

      // Just rerender the component
      rerender(<BookCard book={loanedBook} />);

      expect(screen.getByText("Status: UNAVAILABLE")).toBeInTheDocument();
    });
  });
});
