import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, type Store } from "@reduxjs/toolkit";

import authentificationReducer from "../../../../store/slices/AuthentificationSlice";
import bookReducer, { checkoutBook } from "../../../../store/slices/BookSlice";
import modalReducer from "../../../../store/slices/ModalSlice";

import type { RootState } from "../../../../store/ReduxStore";
import { BookCheckout } from "./BookCheckout";

// --------------------------------------------------
// TEST STORE
// --------------------------------------------------
const createTestStore = (preloaded = {}) =>
  configureStore({
    reducer: {
      authentification: authentificationReducer,
      book: bookReducer,
      modal: modalReducer,
    },
    preloadedState: preloaded,
    middleware: (getDefault) =>
      getDefault({
        serializableCheck: false,
      }),
  });

// --------------------------------------------------
// MOCK BOOK + USER
// --------------------------------------------------
const mockBook = {
  _id: "b1",
  title: "Mock Checkout Book",
};

const mockUser = {
  _id: "emp123",
  type: "EMPLOYEE",
};

// --------------------------------------------------
// WRAPPER
// --------------------------------------------------
const renderWithStore = (store: Store<RootState>) =>
  render(
    <Provider store={store}>
      <BookCheckout />
    </Provider>
  );

// --------------------------------------------------
// SPY / MOCK checkoutBook
// --------------------------------------------------
vi.mock("../../../../store/slices/BookSlice", async () => {
  const actual = await vi.importActual<
    typeof import("../../../../store/slices/BookSlice")
  >("../../../../store/slices/BookSlice");

  return {
    ...actual,
    checkoutBook: vi.fn((payload) => ({
      type: "book/checkoutBook",
      payload,
    })),
  };
});

// --------------------------------------------------
// TESTS
// --------------------------------------------------
describe("BookCheckout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --------------------------------------------------
  // RENDERING
  // --------------------------------------------------
  it("renders empty container if no user or no book", () => {
    const store = createTestStore({
      authentification: { loggedInUser: undefined },
      book: { currentBook: undefined },
      modal: { displayLoan: true },
    });

    renderWithStore(store);

    const container = document.querySelector(".book-checkout");
    expect(container).toBeInTheDocument();

    // No form
    expect(screen.queryByText("Loan Book:")).not.toBeInTheDocument();
  });

  it("renders form when user and book exist", () => {
    const store = createTestStore({
      authentification: { loggedInUser: mockUser },
      book: { currentBook: mockBook },
      modal: { displayLoan: true },
    });

    renderWithStore(store);

    expect(
      screen.getByText(`Loan Book: ${mockBook.title}`)
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Employee ID")).toHaveValue(mockUser._id);
  });

  // --------------------------------------------------
  // BUTTON LOGIC
  // --------------------------------------------------
  it("dispatches checkoutBook + clears book + closes modal", () => {
    const store = createTestStore({
      authentification: { loggedInUser: mockUser },
      book: { currentBook: mockBook },
      modal: { displayLoan: true },
    });

    renderWithStore(store);

    // Enter library card
    const input = screen.getByPlaceholderText("Library Card ID");
    fireEvent.change(input, { target: { value: "12345" } });

    fireEvent.click(screen.getByRole("button", { name: "Loan Book" }));

    // checkoutBook dispatched
    expect(checkoutBook).toHaveBeenCalledTimes(1);
    expect(checkoutBook).toHaveBeenCalledWith({
      book: mockBook,
      employee: mockUser,
      libraryCard: "12345",
    });

    const state = store.getState();

    expect(state.book.currentBook).toBe(undefined);
    expect(state.modal.displayLoan).toBe(false);
  });

  // --------------------------------------------------
  // MISSING DATA
  // --------------------------------------------------
  it("does NOT dispatch checkoutBook when user is missing", () => {
    const store = createTestStore({
      authentification: { loggedInUser: undefined },
      book: { currentBook: mockBook },
      modal: { displayLoan: true },
    });

    renderWithStore(store);

    // Form does not render → no button
    expect(
      screen.queryByRole("button", { name: "Loan Book" })
    ).not.toBeInTheDocument();

    expect(checkoutBook).not.toHaveBeenCalled();

    const state = store.getState();
    expect(state.book.currentBook).toBe(mockBook);
    expect(state.modal.displayLoan).toBe(true);
  });

  it("does NOT dispatch checkoutBook when book is missing", () => {
    const store = createTestStore({
      authentification: { loggedInUser: mockUser },
      book: { currentBook: undefined },
      modal: { displayLoan: true },
    });

    renderWithStore(store);

    expect(
      screen.queryByRole("button", { name: "Loan Book" })
    ).not.toBeInTheDocument();

    expect(checkoutBook).not.toHaveBeenCalled();
  });

  // --------------------------------------------------
  // EMPTY LIBRARY CARD INPUT
  // --------------------------------------------------
  it("shows alert if library card is empty", () => {
    const store = createTestStore({
      authentification: { loggedInUser: mockUser },
      book: { currentBook: mockBook },
      modal: { displayLoan: true },
    });

    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    renderWithStore(store);

    fireEvent.click(screen.getByRole("button", { name: "Loan Book" }));

    expect(alertSpy).toHaveBeenCalledWith(
      "Please enter a valid library card number."
    );
    expect(checkoutBook).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});
